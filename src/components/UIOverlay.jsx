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
            <button className="btn btn-primary">
              Start a Project <ArrowRight size={18} />
            </button>
            <button className="btn btn-secondary">
              View Our Work <PlayCircle size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Tile over the 3D Spiderman Model */}
      <Link to="/services/ai-automation" className="floating-demo-tile glass">
        <div className="tile-icon">
          <Bot size={24} color="#a388ff" />
        </div>
        <div className="tile-content">
          <strong>Experience Automation</strong>
          <span>Try the live sandbox</span>
        </div>
        <Zap size={20} className="text-coral tile-zap" />
      </Link>
    </>
  );
};

export default UIOverlay;
