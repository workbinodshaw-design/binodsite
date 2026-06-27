import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot, CheckCircle, ArrowRight } from 'lucide-react';
import ContactSection from '../components/ContactSection';

const ServicesPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          OUR SERVICES
        </div>
        <h1 className="headline">Scale With Confidence</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '600px' }}>
          We provide end-to-end digital solutions combining state-of-the-art web architectures with powerful AI automation pipelines.
        </p>
      </div>

      {/* Web Development Section */}
      <div className="service-detail-section">
        <div className="service-detail-content">
          <div className="service-icon coral" style={{ marginBottom: '1.5rem' }}>
            <Code size={32} />
          </div>
          <h2>Web Development</h2>
          <p className="text-secondary">
            Your website is your best salesperson. We build ultra-fast, high-converting platforms that don't just look stunning—they drive revenue.
          </p>
          
          <div className="service-features-list">
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>SaaS Applications</strong>
                <p>Scalable, secure, and intuitive web apps built on React and Node.js.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>3D WebGL Experiences</strong>
                <p>Immersive, interactive 3D websites that wow your customers and destroy the competition.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>E-Commerce & High-Converting Landing Pages</strong>
                <p>Optimized for speed and conversion rates.</p>
              </div>
            </div>
          </div>

          <Link to="/services/web-development" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            Explore Web Development Options <ArrowRight size={18} />
          </Link>
        </div>
        
        {/* Placeholder for an image or graphic */}
        <div className="service-detail-visual glass">
          <div className="mockup-window">
             <div className="mockup-header">
                <span className="dot bg-red"></span>
                <span className="dot bg-yellow"></span>
                <span className="dot bg-green"></span>
             </div>
             <div className="mockup-body">
                <div className="skeleton-line w-3/4"></div>
                <div className="skeleton-line w-1/2"></div>
                <div className="skeleton-box"></div>
             </div>
          </div>
        </div>
      </div>

      {/* AI Automation Section */}
      <div className="service-detail-section reverse">
        <div className="service-detail-content">
          <div className="service-icon lavender" style={{ marginBottom: '1.5rem' }}>
            <Bot size={32} />
          </div>
          <h2>AI & Automation</h2>
          <p className="text-secondary">
            Stop doing manual work. We build custom AI agents and workflow pipelines that integrate directly into your existing tools, saving you hundreds of hours.
          </p>
          
          <div className="service-features-list">
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>Customer Support AI Agents</strong>
                <p>24/7 intelligent chatbots trained on your company data that actually solve problems.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>CRM & Workflow Automation</strong>
                <p>Seamlessly connect tools (HubSpot, Slack, Stripe) via Make/Zapier to eliminate manual data entry.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>Automated Lead Generation</strong>
                <p>Scrape, qualify, and outreach to leads on autopilot.</p>
              </div>
            </div>
          </div>

          <Link to="/services/ai-automation" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#5D3FD3' }}>
            Explore AI Automation Options <ArrowRight size={18} />
          </Link>
        </div>
        
        <div className="service-detail-visual glass flex-center">
           <div className="automation-flow">
              <div className="node">Email Received</div>
              <div className="arrow">↓</div>
              <div className="node highlight">AI Analyzes Intent</div>
              <div className="arrow">↓</div>
              <div className="node">CRM Updated & Reply Sent</div>
           </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="content-section" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <ContactSection />
      </div>
    </div>
  );
};

export default ServicesPage;
