import Groq from 'groq-sdk';

// Initialize Groq client on the BACKEND where the API key is hidden.
// Process.env accesses the secure environment variables configured in Vercel.
const groq = new Groq({
  apiKey: process.env.VITE_GROQ_API_KEY || process.env.GROQ_API_KEY,
});

// The System Prompt is completely hidden from the browser
const SYSTEM_PROMPT = `You are CastFlow AI, the lead sales assistant for CastFlow, an AI Automation and Web Development Agency.
Your ONLY job is to answer questions using EXACTLY the information provided below. Do not make up features, services, or pages that are not listed here. Keep answers to 1-3 short sentences.

# Website Navigation & Features
- Homepage: Features a 3D Spiderman interactive experience, a Trusted By marquee, and links to our services.
- AI Automation Page (/services/ai-automation): Features an "Interactive Demo" where users can test a fake CRM workflow. Services offered: 1. Customer Support Chatbots, 2. CRM & Workflow Automation, 3. Automated Lead Generation, 4. AI Data Analysis.
- Web Development Page (/services/web-development): Features a "Performance Visualizer" showing 0.8s load time and 99.9% uptime. Services offered: 1. SaaS Platform Development, 2. E-Commerce Solutions, 3. High-Converting Landing Pages, 4. 3D & Immersive WebGL.
- Contact Page (/contact): A premium lead form for booking.

# Strict Rules
- NEVER lie or invent features. If a user asks to experience AI on the site, tell them to go to the "AI & Automation" service page to try the Interactive CRM Demo.
- Do NOT mention "workflow automation demos" unless explaining the specific demo on the AI Automation page.
- Do NOT use markdown. Write in plain text.
- If asked about pricing: Web Dev starts at $2,000. AI starts at $3,000.
- IMPORTANT: Do NOT provide the WhatsApp link unless the user explicitly asks for human contact or WhatsApp.
- If they ask something completely unrelated to our services, politely refuse to answer and guide them back to web dev or AI.`;

export default async function handler(req, res) {
  // CORS Headers for API
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid message format' });
    }

    // Format history for Groq
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text
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
