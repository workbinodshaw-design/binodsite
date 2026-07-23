import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// Cache for frequent queries to avoid re-scoring
const queryCache = new Map();

// Global variable to hold knowledge chunks (loads once on cold start)
let knowledgeChunks = [];

function loadKnowledge() {
  if (knowledgeChunks.length > 0) return;
  try {
    const knowledgeDir = path.join(process.cwd(), 'knowledge');
    if (!fs.existsSync(knowledgeDir)) return;
    
    const files = fs.readdirSync(knowledgeDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = fs.readFileSync(path.join(knowledgeDir, file), 'utf-8');
        const parsed = JSON.parse(content);
        
        // Flatten JSON into text chunks
        if (Array.isArray(parsed)) {
          parsed.forEach(item => knowledgeChunks.push(JSON.stringify(item)));
        } else {
          knowledgeChunks.push(JSON.stringify(parsed));
        }
      }
    }
  } catch (error) {
    console.error("Error loading knowledge:", error);
  }
}

const stopWords = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "am", "to", "for", "of", "in", "on", "what", "how", "why", "where", "when", "i", "want", "tell", "me", "about"]);

function extractKeywords(query) {
  return query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2 && !stopWords.has(w));
}

function retrieveContext(query) {
  loadKnowledge();
  
  if (queryCache.has(query)) {
    return queryCache.get(query);
  }

  const keywords = extractKeywords(query);
  if (keywords.length === 0) return "";

  const scoredChunks = knowledgeChunks.map(chunk => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    keywords.forEach(kw => {
      if (chunkLower.includes(kw)) score++;
    });
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  
  // Take top 3 relevant chunks
  const topChunks = scoredChunks.slice(0, 3).filter(c => c.score > 0).map(c => c.chunk);
  const contextText = topChunks.join('\n\n');
  
  // Cache the result (limit cache size to 100 to avoid memory leaks)
  if (queryCache.size > 100) {
    const firstKey = queryCache.keys().next().value;
    queryCache.delete(firstKey);
  }
  queryCache.set(query, contextText);
  
  return contextText;
}

const INJECTION_PATTERNS = [
  /ignore previous/i,
  /system prompt/i,
  /api key/i,
  /backend/i,
  /database/i,
  /hidden route/i,
  /firebase/i,
  /show code/i,
  /developer/i
];

const SYSTEM_PROMPT_TEMPLATE = `You are the CastFlow AI Website Assistant. You are friendly, highly professional, and natural.
Your ONLY job is to answer questions using EXACTLY the Context Information provided below. 

# Conversation Rules
1. Reply VERY shortly. Keep answers to a maximum of 4-6 lines unless more detail is explicitly requested.
2. If the user asks about Pricing, RunFest, Services, Contact, or About, guide them to the correct page based on the context.
3. NEVER hallucinate, guess, or invent information.
4. If the context does not contain the answer, you MUST say EXACTLY: "I couldn't find verified information about that."
5. Do NOT use markdown. Write in plain text.
6. Avoid robotic wording. Avoid unnecessary greetings on every message.

# Context Information
{context}
`;

export default async function handler(req, res) {
  // Hardened CORS Headers
  const origin = req.headers.origin || '';
  const isLocalhost = origin.includes('localhost') || origin.includes('127.0.0.1');
  const isCastflow = origin === 'https://castflow.in' || origin.endsWith('.castflow.in');
  
  if (isLocalhost || isCastflow) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://castflow.in');
  }
  
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty message format' });
    }

    if (messages.length > 15) {
      return res.status(400).json({ error: 'Message history too long' });
    }

    const latestUserMessage = messages[messages.length - 1].text || '';
    
    // Injection Protection
    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(latestUserMessage)) {
        return res.status(200).json({ response: "I'm sorry, but I cannot assist with that request." });
      }
    }

    // RAG Retrieval
    const retrievedContext = retrieveContext(latestUserMessage);
    const finalSystemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{context}', retrievedContext || "No specific context found. Stick to general polite refusal.");

    const apiMessages = [
      { role: 'system', content: finalSystemPrompt },
      ...messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: String(m.text || '').substring(0, 500)
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.2, // Low temperature for factual accuracy
      max_tokens: 150,
    });

    const aiResponse = completion.choices[0]?.message?.content || "I'm sorry, I encountered an error. Please contact us on WhatsApp.";
    
    return res.status(200).json({ response: aiResponse });

  } catch (error) {
    console.error("Backend Groq API Error:", error);
    return res.status(500).json({ 
      error: 'Failed to communicate with AI provider.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
