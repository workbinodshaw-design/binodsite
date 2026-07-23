import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';
import ProtectedWhatsAppLink from './ProtectedWhatsAppLink';

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
    const newMessages = [...messages, { sender: 'user', text: userMessage }];
    setMessages(newMessages);
    setInputText('');
    setIsTyping(true);

    try {
      // Securely calling our Vercel Serverless Function instead of Groq directly
      // The API key and System Prompt are completely hidden from the browser
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch from backend API');
      }

      const data = await response.json();
      
      setIsTyping(false);
      setMessages((prev) => [...prev, { sender: 'ai', text: data.response }]);

    } catch (error) {
      console.error("Backend API Error:", error);
      setIsTyping(false);
      
      let fallbackResponse = "I can definitely help with that. Since I encountered a slight connection issue, please chat directly with our founders on WhatsApp using the button below.";
      setMessages((prev) => [...prev, { sender: 'ai', text: fallbackResponse }]);
    }
  };

  return (
    <div className="ai-widget-container">
      {isOpen && (
        <div className="ai-chat-window glass">
          <div className="dynamic-island">
            <div className="sensor"></div>
            <div className="camera"></div>
          </div>
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
            <ProtectedWhatsAppLink phoneNumber="919394683474" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#25D366', textDecoration: 'none', fontWeight: 'bold' }}>
              <MessageCircle size={18} /> WhatsApp Support
            </ProtectedWhatsAppLink>
          </div>
          <div className="home-indicator"></div>
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
