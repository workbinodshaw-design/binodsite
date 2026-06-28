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
            Turn Your Bottlenecks Into <br />
            <span>Automated Revenue.</span>
          </h1>
          
          <p className="description" style={{ fontSize: '1.2rem', marginBottom: '2.5rem' }}>
            We build custom AI agents, automated workflows, and high-performance web apps that save you 40+ hours a week and scale your business effortlessly.
          </p>
          
          <div className="button-group">
            <Link to="/contact" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              Get Free Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/portfolio" className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              View Portfolio
            </Link>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} width="20" height="20" viewBox="0 0 24 24" fill={star <= 4 ? "#F59E0B" : "#4B5563"} xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <strong>3.8/5</strong> rating from innovative founders
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UIOverlay;
