import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import Groq from 'groq-sdk';

// Initialize Groq client (Note: dangerouslyAllowBrowser is set to true for frontend demo purposes. 
// In a real production app, this should be routed through a backend to protect the API key).
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true 
});

const SYSTEM_PROMPT = `You are CastFlow AI, the lead sales architect for CastFlow, a premium AI Automation and Web Development Agency.
Your ultimate goal is to convert website visitors into highly qualified leads by getting them to book a discovery call or message the founders on WhatsApp.

# Your Knowledge Base
1. AI & Automation Services: We build custom AI agents (like yourself!), internal workflow automations, AI customer support chatbots, and integrate AI directly into business processes to eliminate manual work and scale revenue. Projects start at $3,000.
2. Web Development Services: We build ultra-fast, high-converting platforms, immersive 3D web experiences (like the Spiderman on our homepage), and scalable SaaS architectures. Projects start at $2,000.
3. Our Value Proposition: We don't just build software; we build revenue-generating assets. We save businesses hundreds of hours and thousands of dollars by automating their operations.

# Your Personality & Rules
- Tone: Premium, highly professional, confident, energetic, and slightly tech-forward. 
- You do NOT write long essays. Keep every single response to 1-3 short, punchy sentences. People do not like reading long text in chat widgets.
- Never use markdown formatting (no asterisks, no bolding). Just write in plain text.
- If a user asks a complex technical question, impress them briefly, then immediately pivot to asking if they'd like to book a strategy call to dive deeper.
- If they ask for human contact or pricing, tell them the starting prices and push them to our WhatsApp: https://wa.me/919394683474
- Always end your responses with a subtle call-to-action or an engaging question (e.g., "What kind of manual tasks are slowing down your team today?").`;

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
