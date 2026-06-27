import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

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

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = inputText;
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = "I can definitely help with that. Our team specializes in custom AI agents and full-stack web development. Would you like to schedule a call?";
      
      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes('price') || lowerInput.includes('cost')) {
        aiResponse = "Our projects are custom-tailored to your exact needs, typically starting around $2,000 for web dev and $3,000 for AI automation systems. Should I connect you with a founder for a quote?";
      } else if (lowerInput.includes('whatsapp') || lowerInput.includes('human')) {
        aiResponse = "Sure! You can chat directly with our founders on WhatsApp right here: https://wa.me/919394683474";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1500);
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
