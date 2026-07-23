import Groq from 'groq-sdk';
import { knowledgeData } from '../knowledge/data.js';

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// Convert the entire knowledge base to a structured string
const fullKnowledgeContext = JSON.stringify(knowledgeData, null, 2);

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

const SYSTEM_PROMPT_TEMPLATE = `You are CastFlow AI, a highly intelligent, comprehensive, and friendly Website Assistant for CastFlow.
You must act as a premium, incredibly smart assistant (like Gemini) that knows absolutely everything about the company.

# Core Instructions
1. You have been provided with the COMPLETE knowledge base of CastFlow below in JSON format. You MUST use this data to answer ANY question the user asks.
2. Provide comprehensive, helpful, and highly detailed answers. Do not be overly brief if the user asks for details (you can give small to small details).
3. If the user asks for pricing, services, RunFest, policies, or contact details, give them the exact information from the knowledge base.
4. If a user is just saying hello or greeting you, be very warm, friendly, and ask how you can help them today.
5. NEVER hallucinate or invent features. If the answer is truly not in the knowledge base, politely state that you do not have verified information on that specific topic.
6. Write in plain text, do NOT use markdown (no asterisks, bolding, or lists).
7. Speak naturally and conversationally. Do not sound like a robot.

# CastFlow Knowledge Base
${fullKnowledgeContext}
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

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT_TEMPLATE },
      ...messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: String(m.text || '').substring(0, 500)
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.3, // Slightly higher for more conversational tone
      max_tokens: 300,  // Allow longer answers
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
