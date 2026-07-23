import Groq from 'groq-sdk';
import fs from 'fs';
import path from 'path';

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

const queryCache = new Map();
let knowledgeChunks = [];
let fallbackContext = "";

function loadKnowledge() {
  if (knowledgeChunks.length > 0) return;
  try {
    const knowledgeDir = path.join(process.cwd(), 'knowledge');
    
    // Explicitly listing files helps Vercel's bundler include them
    const files = [
      'company.json', 'services.json', 'pricing.json', 'portfolio.json', 
      'runfest.json', 'about.json', 'team.json', 'contact.json', 
      'policies.json', 'website_navigation.json', 'faq.json'
    ];
    
    for (const file of files) {
      const filePath = path.join(knowledgeDir, file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const parsed = JSON.parse(content);
        
        if (file === 'company.json') {
          fallbackContext = JSON.stringify(parsed);
        }
        
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

const stopWords = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "am", "to", "for", "of", "in", "on", "what", "how", "why", "where", "when", "i", "want", "tell", "me", "about", "please", "can", "you", "do", "have"]);

function extractKeywords(query) {
  return query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}

function retrieveContext(query) {
  loadKnowledge();
  
  if (queryCache.has(query)) {
    return queryCache.get(query);
  }

  const keywords = extractKeywords(query);
  
  if (keywords.length === 0) return fallbackContext;

  const scoredChunks = knowledgeChunks.map(chunk => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    keywords.forEach(kw => {
      if (chunkLower.includes(kw)) score++;
    });
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  
  const topChunks = scoredChunks.slice(0, 5).filter(c => c.score > 0).map(c => c.chunk);
  const contextText = topChunks.length > 0 ? topChunks.join('\n\n') : fallbackContext;
  
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
2. If the user is just saying hello or greeting you, greet them kindly and ask how you can help. Do NOT say you can't find information just for a greeting.
3. If the user asks about Pricing, RunFest, Services, Contact, or About, guide them to the correct page based on the context.
4. NEVER hallucinate, guess, or invent information.
5. If they ask a specific question and the context does not contain the answer, you MUST say EXACTLY: "I couldn't find verified information about that."
6. Do NOT use markdown. Write in plain text.
7. Avoid robotic wording. Avoid unnecessary greetings on every message.

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
    const finalSystemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{context}', retrievedContext || "No specific context found. Please politely state you cannot find verified information.");

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
      temperature: 0.2, 
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
