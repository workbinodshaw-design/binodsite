import React from 'react';
import { Sparkles, ArrowRight, PlayCircle } from 'lucide-react';

const UIOverlay = () => {
  return (
    <div className="ui-overlay">
      <div className="logo-container">
        {/* The user will place their logo.png in the public folder */}
        <img src={import.meta.env.BASE_URL + 'logo.png'} alt="CastFlow Logo" className="logo-img" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="logo-text">CASTFLOW</span>
      </div>
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
