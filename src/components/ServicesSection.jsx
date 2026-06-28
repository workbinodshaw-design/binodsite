import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot } from 'lucide-react';

const TiltCard = ({ children, to, className }) => {
  const [style, setStyle] = useState({});
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'none'
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease'
    });
  };

  return (
    <Link 
      to={to} 
      className={className} 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...style, display: 'block', textDecoration: 'none' }}
    >
      {children}
    </Link>
  );
};

const ServicesSection = () => {
  return (
    <div className="services-container">
      <div className="section-header text-center" style={{ marginBottom: '1rem' }}>
        <h2 className="section-title">How can we scale your business?</h2>
        <p className="section-subtitle">
          Choose a path below to see exactly how we leverage cutting-edge technology to drive revenue and eliminate manual work.
        </p>
      </div>

      <div className="funnel-tiles-grid">
        {/* AI Automation Tile */}
        <TiltCard to="/services/ai-automation" className="funnel-tile glass">
          <div className="funnel-icon lavender">
            <Bot size={48} />
          </div>
          <h3>AI & Automation</h3>
          <p>Stop doing manual work. We build custom AI agents and workflow pipelines that integrate seamlessly into your tools.</p>
          <div className="funnel-arrow">Explore Solutions →</div>
        </TiltCard>

        {/* Web Dev Tile */}
        <TiltCard to="/services/web-development" className="funnel-tile glass">
          <div className="funnel-icon coral">
            <Code size={48} />
          </div>
          <h3>Web Design & Development</h3>
          <p>We build ultra-fast, high-converting platforms, immersive 3D experiences, and scalable SaaS architectures.</p>
          <div className="funnel-arrow">Explore Solutions →</div>
        </TiltCard>
      </div>
    </div>
  );
};

export default ServicesSection;
