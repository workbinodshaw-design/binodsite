import React, { useState, useRef, useEffect } from 'react';
import { Send, Heart, MessageCircle, Bookmark, ChevronLeft, Bot, Zap, User } from 'lucide-react';

const InteractiveDemo = () => {
  const [view, setView] = useState('post'); // 'post' or 'dm'
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([
    { username: 'tech_founder', text: 'This looks amazing! 🔥' }
  ]);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showTrigger, setShowTrigger] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll DMs
  useEffect(() => {
    if (view === 'dm' && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, view]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    // 1. Add comment
    const newComment = commentText;
    setComments([...comments, { username: 'you', text: newComment }]);
    setCommentText('');

    // 2. Show Trigger Overlay
    setTimeout(() => {
      setShowTrigger(true);
    }, 500);

    // 3. Switch to DM View
    setTimeout(() => {
      setShowTrigger(false);
      setView('dm');
      setIsTyping(true);
      
      // 4. Send AI DM
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { 
            sender: 'ai', 
            text: `Hey there! 👋 I saw you commented "${newComment}". I'm the AI Assistant for the agency. Are you looking to automate your workflow or build a custom web app?` 
          }
        ]);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="interactive-demo-container" style={{ margin: '4rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div className="demo-header-text text-center" style={{ marginBottom: '3rem' }}>
        <div className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          <Zap size={14} className="text-coral" style={{ marginRight: '4px' }} /> LIVE SANDBOX
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Experience It Yourself</h2>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Type a comment on the mock Instagram post below and watch how our AI agents instantly trigger and engage your prospects in the DMs.
        </p>
      </div>

      <div className="phone-mockup">
        {/* Dynamic Screen Container */}
        <div className="phone-screen">
          
          {/* POST VIEW */}
          <div className={`screen-view post-view ${view === 'post' ? 'active' : ''}`}>
            <div className="ig-header">
              <div className="ig-profile-pic">
                <Bot size={16} color="#fff" />
              </div>
              <div className="ig-username">binodshaw_agency</div>
            </div>
            
            <div className="ig-post-image flex-center">
              <div className="post-text-overlay">
                <h3 style={{ margin: 0, fontSize: '1.4rem' }}>Want our AI blueprint?</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.9rem' }}>Comment <strong>"AI"</strong> below to get it sent instantly to your DMs! 🚀</p>
              </div>
            </div>
            
            <div className="ig-actions">
              <Heart size={24} />
              <MessageCircle size={24} />
              <Send size={24} />
              <Bookmark size={24} style={{ marginLeft: 'auto' }} />
            </div>

            <div className="ig-comments-section">
              <div className="ig-caption">
                <strong>binodshaw_agency</strong> We just unlocked a massive new AI automation strategy. Drop a comment to get it!
              </div>
              {comments.map((c, i) => (
                <div key={i} className="ig-comment">
                  <strong>{c.username}</strong> {c.text}
                </div>
              ))}
            </div>

            <form className="ig-comment-input-area" onSubmit={handleCommentSubmit}>
              <div className="ig-profile-pic small">
                <User size={14} />
              </div>
              <input 
                type="text" 
                placeholder="Add a comment..." 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <button type="submit" disabled={!commentText.trim()} className={commentText.trim() ? 'active' : ''}>Post</button>
            </form>

            {/* Trigger Overlay */}
            {showTrigger && (
              <div className="automation-trigger-overlay">
                <div className="trigger-box">
                  <Zap size={32} className="pulse" color="#25D366" />
                  <h4>Automation Triggered!</h4>
                  <p>Moving to DMs...</p>
                </div>
              </div>
            )}
          </div>

          {/* DM VIEW */}
          <div className={`screen-view dm-view ${view === 'dm' ? 'active' : ''}`}>
            <div className="dm-header">
              <ChevronLeft size={24} style={{ cursor: 'pointer' }} onClick={() => {setView('post'); setMessages([]); setComments([{ username: 'tech_founder', text: 'This looks amazing! 🔥' }]);}} />
              <div className="ig-profile-pic small" style={{ marginLeft: '10px' }}>
                <Bot size={14} color="#fff" />
              </div>
              <div className="ig-username" style={{ marginLeft: '10px' }}>binodshaw_agency</div>
            </div>

            <div className="dm-chat-area">
              <div className="chat-timestamp">Today 2:45 PM</div>
              
              {messages.map((m, i) => (
                <div key={i} className={`chat-bubble ${m.sender === 'ai' ? 'received' : 'sent'}`}>
                  {m.text}
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble received typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="dm-input-area">
              <div className="dm-input-pill">
                Message...
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
