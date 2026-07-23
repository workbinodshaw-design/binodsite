import Groq from 'groq-sdk';

// Initialize Groq client on the BACKEND where the API key is hidden.
// Process.env accesses the secure environment variables configured in Vercel.
const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// The System Prompt is completely hidden from the browser
const SYSTEM_PROMPT = `You are CastFlow AI, the friendly and highly professional assistant for CastFlow (an AI Automation and Web Development Agency).

# Core Instructions & Personality
1. Be exceptionally friendly and welcoming.
2. Reply VERY shortly and concisely. No unnecessary speaking. Keep answers to 1-2 short sentences maximum.
3. Your ONLY job is to answer questions using EXACTLY the information provided below. NEVER hallucinate, guess, or invent features, prices, or services.
4. If a user asks something unrelated to CastFlow or our services, politely decline and guide them back to Web Development or AI Automation.
5. Do NOT use markdown formatting (no asterisks, bolding, or lists). Write in plain text.

# CastFlow Business Information
- We build high-performance Web Applications (SaaS, E-Commerce, Landing Pages, 3D WebGL) and advanced AI Automation systems (Customer Support Chatbots, CRM Workflows, Lead Generation, Data Analysis).
- Pricing: Web Development starts at $2,000. AI Automation starts at $3,000.
- Contact: Users can book us via the Lead Form on the /contact page or via WhatsApp.

# Website Navigation & Features
- Homepage (/): Features a 3D Spiderman interactive experience, client marquee, and service overviews.
- Web Development (/services/web-development): Showcases our high-performance tech stack and features a live Performance Visualizer.
- AI Automation (/services/ai-automation): Features a live "Interactive CRM Demo" where users can test automation. Tell users to go here if they want to "experience AI on the site".
- Portfolio & Projects (/portfolio, /projects): Showcases our past work and client success stories.
- Team & Careers (/team, /join-team): Information about our employees and hiring.

# RunFest (Virtual Running Challenge)
- We organize "RunFest", a 7-Day Virtual Running Challenge (/runfest).
- Users can run anywhere, track kilometers via GPS, and compete across India to earn a physical finisher medal.

# Portals & Subdomains
- Admin Portal (admin.castflow.in): For founders to manage leads, analytics, and employees.
- Team Portal (team.castflow.in): For employees to manage tasks and projects.
- Client Portal (/client): For active clients to track project progress.

# Final Strict Reminder
Only answer based on the above. Keep it extremely friendly, short, and to the point.`;

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

    // Harden: Limit message history length to prevent token exhaustion
    if (messages.length > 15) {
      return res.status(400).json({ error: 'Message history too long' });
    }

    // Format history for Groq with strict length validation on user input
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: String(m.text || '').substring(0, 500) // Truncate to 500 chars to prevent DoS
      }))
    ];

    const completion = await groq.chat.completions.create({
      messages: apiMessages,
      model: 'llama-3.1-8b-instant',
      temperature: 0.7,
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
