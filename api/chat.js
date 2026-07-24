import Groq from 'groq-sdk';
import { knowledgeData } from '../knowledge/data.js';

const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// 1. Separate Semantic Data from Core Context
const synonymsMap = knowledgeData.synonyms?.synonyms || {};
const intentsMap = knowledgeData.intent_dictionary?.intents || {};
const conversationRules = knowledgeData.conversation_rules?.rules || [];
const securityRules = knowledgeData.security_rules?.rules || [];

// 2. Core context that ALWAYS gets injected (pricing, services, etc.)
const coreKnowledge = { ...knowledgeData };
// Remove massive sets or metadata from core context sent to LLM
delete coreKnowledge.faq;
delete coreKnowledge.synonyms;
delete coreKnowledge.intent_dictionary;
delete coreKnowledge.conversation_rules;
delete coreKnowledge.security_rules;
delete coreKnowledge.knowledge_index;

const coreContextText = JSON.stringify(coreKnowledge, null, 2);

// 3. FAQ chunks for dynamic retrieval
const faqChunks = [];
if (Array.isArray(knowledgeData.faq)) {
  knowledgeData.faq.forEach(item => faqChunks.push(JSON.stringify(item)));
}

const stopWords = new Set(["a", "an", "the", "and", "or", "but", "is", "are", "am", "to", "for", "of", "in", "on", "what", "how", "why", "where", "when", "i", "want", "tell", "me", "about", "please", "can", "you", "do", "have", "hi", "hello", "hey"]);

function extractKeywords(query) {
  const baseWords = query.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 1 && !stopWords.has(w));
  const expandedSet = new Set(baseWords);

  // Intent Expansion
  Object.keys(intentsMap).forEach(intent => {
    intentsMap[intent].forEach(keyword => {
      if (query.toLowerCase().includes(keyword)) {
        expandedSet.add(intent);
      }
    });
  });

  // Synonym Expansion
  Object.keys(synonymsMap).forEach(key => {
    synonymsMap[key].forEach(syn => {
      if (query.toLowerCase().includes(syn)) {
        expandedSet.add(key);
      }
    });
  });

  return Array.from(expandedSet);
}

function retrieveFaqContext(query) {
  const keywords = extractKeywords(query);
  
  if (keywords.length === 0) {
    return ""; // No specific keywords
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
  
  // Take top 3 most relevant FAQs as requested
  const topChunks = scoredChunks.slice(0, 3).filter(c => c.score > 0).map(c => c.chunk);
  return topChunks.length > 0 ? "\n\n# Relevant FAQs:\n" + topChunks.join('\n\n') : "";
}

// 4. Injection Protection (Hardcoded + Dynamic)
const INJECTION_PATTERNS = [
  /ignore previous/i,
  /system prompt/i,
  /api key/i,
  /backend/i,
  /database/i,
  /hidden route/i,
  /firebase/i,
  /show code/i,
  /developer/i,
  /admin/i,
  /secrets/i
];

const SYSTEM_PROMPT_TEMPLATE = `You are CastFlow AI, a highly intelligent and friendly Website Assistant for CastFlow.

# Conversation Rules
${conversationRules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}

# Security Rules
${securityRules.map((rule, i) => `${i + 1}. ${rule}`).join('\n')}

# Core Context Information
${coreContextText}
{dynamic_faqs}
`;

export default async function handler(req, res) {
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

    // Keep last 10 messages for memory as requested
    const recentMessages = messages.slice(-10);
    const latestUserMessage = recentMessages[recentMessages.length - 1].text || '';
    
    // Combine recent user messages to extract better context for retrieval (Conversation Memory)
    const recentUserContext = recentMessages.filter(m => m.sender !== 'ai').map(m => m.text).join(' ');

    for (const pattern of INJECTION_PATTERNS) {
      if (pattern.test(latestUserMessage)) {
        return res.status(200).json({ response: "I'm sorry, but I cannot assist with that request." });
      }
    }

    const dynamicFaqs = retrieveFaqContext(recentUserContext);
    const finalSystemPrompt = SYSTEM_PROMPT_TEMPLATE.replace('{dynamic_faqs}', dynamicFaqs);

    const apiMessages = [
      { role: 'system', content: finalSystemPrompt },
      ...recentMessages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: String(m.text || '').substring(0, 500)
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.1, // Even stricter for avoiding hallucinations
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
