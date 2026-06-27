import React from 'react';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

const UIOverlay = () => {
  return (
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
          <button className="btn btn-primary">
            Start a Project <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary">
            View Our Work <PlayCircle size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UIOverlay;
