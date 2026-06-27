import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot } from 'lucide-react';

const ServicesSection = () => {
  return (
    <div className="services-container">
      <div className="section-header text-center" style={{ marginBottom: '2rem' }}>
        <h2 className="section-title">How can we scale your business?</h2>
        <p className="section-subtitle">
          Choose a path below to see exactly how we leverage cutting-edge technology to drive revenue and eliminate manual work.
        </p>
      </div>

      <div className="funnel-tiles-grid">
        {/* Web Dev Tile */}
        <Link to="/services/web-development" className="funnel-tile glass">
          <div className="funnel-icon coral">
            <Code size={48} />
          </div>
          <h3>Web Development</h3>
          <p>We build ultra-fast, high-converting platforms, immersive 3D experiences, and scalable SaaS architectures.</p>
          <div className="funnel-arrow">Explore Solutions →</div>
        </Link>

        {/* AI Automation Tile */}
        <Link to="/services/ai-automation" className="funnel-tile glass">
          <div className="funnel-icon lavender">
            <Bot size={48} />
          </div>
          <h3>AI & Automation</h3>
          <p>Stop doing manual work. We build custom AI agents and workflow pipelines that integrate seamlessly into your tools.</p>
          <div className="funnel-arrow">Explore Solutions →</div>
        </Link>
      </div>
    </div>
  );
};

export default ServicesSection;
