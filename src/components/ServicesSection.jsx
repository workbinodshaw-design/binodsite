import React from 'react';
import { Code, Bot, Zap, Database, ArrowRight } from 'lucide-react';

const ServicesSection = () => {
  return (
    <div className="services-container">
      <div className="section-header">
        <div className="badge">
          <div className="badge-dot"></div>
          OUR EXPERTISE
        </div>
        <h2 className="section-title">What We Do</h2>
        <p className="section-subtitle">We build scalable digital solutions that drive real business growth.</p>
      </div>

      <div className="services-grid">
        {/* Web Development Card */}
        <div className="service-card glass">
          <div className="service-icon coral">
            <Code size={32} />
          </div>
          <h3>Modern Web Development</h3>
          <p>We build lightning-fast, high-converting websites and scalable SaaS applications using cutting-edge technologies.</p>
          
          <ul className="service-features">
            <li><ArrowRight size={16} /> Custom Web Applications</li>
            <li><ArrowRight size={16} /> High-Performance Landing Pages</li>
            <li><ArrowRight size={16} /> E-Commerce Solutions</li>
            <li><ArrowRight size={16} /> 3D WebGL Experiences</li>
          </ul>
        </div>

        {/* AI Automation Card */}
        <div className="service-card glass">
          <div className="service-icon lavender">
            <Bot size={32} />
          </div>
          <h3>AI & Automation</h3>
          <p>Eliminate manual data entry and scale your operations effortlessly with custom AI agents and workflow automations.</p>
          
          <ul className="service-features">
            <li><ArrowRight size={16} /> Custom AI Chatbots & Agents</li>
            <li><ArrowRight size={16} /> CRM Integrations</li>
            <li><ArrowRight size={16} /> Automated Data Processing</li>
            <li><ArrowRight size={16} /> Workflow Automation (Make/Zapier)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
