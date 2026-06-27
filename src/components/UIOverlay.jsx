import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PlayCircle, Bot, Zap } from 'lucide-react';

const UIOverlay = () => {
  return (
    <>
      <div className="ui-overlay">
        <div className="ui-content">
          <div className="badge">
            <div className="badge-dot"></div>
            AI AUTOMATION • WEB DEVELOPMENT
          </div>
          
          <h1 className="headline">
            Build <span>Smarter.</span><br />
            Automate <span>Faster.</span>
          </h1>
          
          <p className="description">
            We combine AI automation and modern web development to build scalable digital solutions that drive real business growth.
          </p>
          
          <div className="button-group">
            <Link to="/contact" className="btn btn-primary">
              Book Discovery Call <ArrowRight size={18} />
            </Link>
            <button 
              className="btn btn-secondary" 
              onClick={() => window.dispatchEvent(new Event('open-ai-agent'))}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Ask AI Agent <Bot size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UIOverlay;
