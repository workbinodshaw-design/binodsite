import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import Groq from 'groq-sdk';

// Initialize Groq client (Note: dangerouslyAllowBrowser is set to true for frontend demo purposes. 
// In a real production app, this should be routed through a backend to protect the API key).
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

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

const AiAgentWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm CastFlow's AI Assistant. How can I help you automate your business today?" }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-ai-agent', handleOpen);
    return () => window.removeEventListener('open-ai-agent', handleOpen);
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    // Add user message to UI
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      if (!import.meta.env.VITE_GROQ_API_KEY) {
        throw new Error("Missing Groq API Key");
      }

      // Format history for Groq
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...newMessages.map(m => ({
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
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);

    } catch (error) {
      console.error("Groq API Error:", error);
      setIsTyping(false);
      
      // Fallback response if API key is missing or fails
      let fallbackResponse = "I can definitely help with that. Since I encountered a slight connection issue, please chat directly with our founders on WhatsApp right here: https://wa.me/919394683474";
      setMessages((prev) => [...prev, { sender: 'ai', text: fallbackResponse }]);
    }
  };

  return (
    <div className="ai-widget-container">
      {isOpen && (
        <div className="ai-chat-window glass">
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar">
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <strong>CastFlow AI</strong>
                <span className="online-status">Online</span>
              </div>
            </div>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="ai-chat-body">
            {messages.map((m, i) => (
              <div key={i} className={`ai-bubble ${m.sender}`}>
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div className="ai-bubble ai typing">
                <span></span><span></span><span></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="ai-chat-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit" disabled={!inputText.trim()}>
              <Send size={18} />
            </button>
          </form>
          <div className="ai-chat-footer">
            <a href="https://wa.me/919394683474" target="_blank" rel="noreferrer">
              <MessageCircle size={12} /> Talk to a human
            </a>
          </div>
        </div>
      )}

      <button className={`ai-widget-toggle ${isOpen ? 'hidden' : ''}`} onClick={() => setIsOpen(true)}>
        <Bot size={28} />
        <span className="notification-dot"></span>
      </button>
    </div>
  );
};

export default AiAgentWidget;
