import Groq from 'groq-sdk';
import { knowledgeData } from '../knowledge/data.js';

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// 1. Core context that ALWAYS gets injected (pricing, services, about, etc.)
const coreKnowledge = { ...knowledgeData };
delete coreKnowledge.faq; // Remove the massive FAQ array
const coreContextText = JSON.stringify(coreKnowledge, null, 2);

// 2. FAQ chunks for dynamic retrieval
const faqChunks = [];
if (Array.isArray(knowledgeData.faq)) {
  knowledgeData.faq.forEach(item => faqChunks.push(JSON.stringify(item)));
}

const stopWords = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "am", "to", "for", "of", "in", "on", "what", "how", "why", "where", "when", "i", "want", "tell", "me", "about", "please", "can", "you", "do", "have", "hi", "hello", "hey"]);

function extractKeywords(query) {
  return query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
}

function retrieveFaqContext(query) {
  const keywords = extractKeywords(query);
  
  if (keywords.length === 0) {
    return ""; // No specific keywords, don't inject extra FAQs
  }

  const scoredChunks = faqChunks.map(chunk => {
    const chunkLower = chunk.toLowerCase();
    let score = 0;
    keywords.forEach(kw => {
      if (chunkLower.includes(kw)) score++;
    });
    return { chunk, score };
  });

  scoredChunks.sort((a, b) => b.score - a.score);
  
  // Take top 2 most relevant FAQs
  const topChunks = scoredChunks.slice(0, 2).filter(c => c.score > 0).map(c => c.chunk);
  return topChunks.length > 0 ? "\\n\\n# Relevant FAQs:\\n" + topChunks.join('\\n\\n') : "";
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

const SYSTEM_PROMPT_TEMPLATE = `You are CastFlow AI, a highly intelligent and friendly Website Assistant for CastFlow.

# Core Instructions
1. Reply VERY shortly and exactly to the point (1-3 sentences maximum). Do not write long paragraphs.
2. Use the Context Information provided below to answer. It contains all pricing, services, and company details.
3. If the user is just saying hello, greet them kindly and ask how you can help them.
4. If you don't know the answer based on the context, politely say you don't have that specific information.
5. Write in plain text without formatting (no markdown).
6. Be highly professional and concise like a true human assistant.

# Context Information
${coreContextText}
{dynamic_faqs}
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

    const dynamicFaqs = retrieveFaqContext(latestUserMessage);
    const finalSystemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{dynamic_faqs}', dynamicFaqs);

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
      max_tokens: 100, 
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
