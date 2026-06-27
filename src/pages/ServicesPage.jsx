import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot, CheckCircle, ArrowRight, Zap, Clock, TrendingUp, Users } from 'lucide-react';
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
          We provide end-to-end digital solutions combining powerful AI automation pipelines with state-of-the-art web architectures.
        </p>
      </div>

      {/* AI Automation Section (NOW FIRST) */}
      <div className="service-detail-section">
        <div className="service-detail-content">
          <div className="service-icon lavender" style={{ marginBottom: '1.5rem' }}>
            <Bot size={32} />
          </div>
          <h2>AI & Automation</h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Imagine having an employee who works 24/7, never sleeps, and never makes a mistake. Instead of manually copying data from emails to spreadsheets, our AI does it instantly while you focus on growing the business.
          </p>
          
          <div className="service-features-list" style={{ marginTop: '2rem' }}>
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>Customer Support AI Agents</strong>
                <p>24/7 chatbots that actually know your business and solve customer problems instantly.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>Workflow Automation</strong>
                <p>Connect your tools (like Gmail, HubSpot, and Slack) so they talk to each other automatically.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-lavender" />
              <div>
                <strong>Automated Lead Generation</strong>
                <p>Find clients, qualify them, and send customized outreach emails on complete autopilot.</p>
              </div>
            </div>
          </div>

          <Link to="/services/ai-automation" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#5D3FD3' }}>
            Explore AI Automation Options <ArrowRight size={18} />
          </Link>
        </div>
        
        {/* Custom Visual: Manual vs AI */}
        <div className="service-detail-visual glass flex-center" style={{ flexDirection: 'column', gap: '2rem', padding: '3rem' }}>
           <div className="comparison-card manual">
              <div className="comp-header">
                 <Clock size={20} /> <span>Manual Way (Slow & Expensive)</span>
              </div>
              <div className="comp-body">
                 You read an email ➔ Copy data to CRM ➔ Draft a reply ➔ <strong>Takes 15 mins</strong>
              </div>
           </div>
           
           <div className="comparison-divider">VS</div>

           <div className="comparison-card ai">
              <div className="comp-header">
                 <Zap size={20} /> <span>AI Automation (Instant)</span>
              </div>
              <div className="comp-body">
                 AI reads email ➔ CRM auto-updates ➔ Reply sent ➔ <strong>Takes 2 seconds</strong>
              </div>
           </div>
        </div>
      </div>

      {/* Web Development Section (NOW SECOND) */}
      <div className="service-detail-section reverse">
        <div className="service-detail-content">
          <div className="service-icon coral" style={{ marginBottom: '1.5rem' }}>
            <Code size={32} />
          </div>
          <h2>Web Development</h2>
          <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Your website shouldn't just be a digital brochure; it should be your absolute best salesperson. We build platforms that load instantly and are designed specifically to turn casual visitors into paying clients.
          </p>
          
          <div className="service-features-list" style={{ marginTop: '2rem' }}>
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>High-Converting Landing Pages</strong>
                <p>Beautiful, fast, and optimized strictly to generate leads and sales.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>E-Commerce & SaaS Platforms</strong>
                <p>Robust online stores and custom software built to handle thousands of users effortlessly.</p>
              </div>
            </div>
            <div className="feature-item">
              <CheckCircle size={20} className="text-coral" />
              <div>
                <strong>3D WebGL Experiences</strong>
                <p>Stand out from competitors with jaw-dropping 3D interactive experiences directly in the browser.</p>
              </div>
            </div>
          </div>

          <Link to="/services/web-development" className="btn btn-primary" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            Explore Web Development Options <ArrowRight size={18} />
          </Link>
        </div>
        
        {/* Custom Visual: Visitors to Revenue */}
        <div className="service-detail-visual glass flex-center" style={{ flexDirection: 'column', gap: '1.5rem', padding: '3rem' }}>
           <div className="funnel-visual-step">
              <Users size={24} className="text-coral" />
              <span>Traffic & Visitors</span>
           </div>
           <div className="funnel-visual-arrow">↓</div>
           <div className="funnel-visual-step highlight">
              <Globe size={24} />
              <span>High-Converting Website</span>
           </div>
           <div className="funnel-visual-arrow">↓</div>
           <div className="funnel-visual-step success">
              <TrendingUp size={24} />
              <span>Revenue & Leads</span>
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
