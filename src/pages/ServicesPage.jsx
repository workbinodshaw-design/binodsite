import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot, CheckCircle, ArrowRight, Zap, Clock, TrendingUp, Users, Globe, Mail, Database, Server, Workflow } from 'lucide-react';
import ContactSection from '../components/ContactSection';

const ServicesPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header responsive-text-center" style={{ marginBottom: '4rem' }}>
        <div className="badge">
          <div className="badge-dot"></div>
          OUR EXPERTISE
        </div>
        <h1 className="headline" style={{ fontSize: 'clamp(2rem, 8vw, 3.5rem)', marginBottom: '1.5rem' }}>Scale With Certainty</h1>
        <p className="description responsive-text-center" style={{ margin: '0 auto', maxWidth: '750px', fontSize: 'clamp(1rem, 3vw, 1.2rem)', lineHeight: '1.8' }}>
          We provide end-to-end digital solutions combining powerful AI automation pipelines with state-of-the-art web architectures. We don't just build software; we build robust business systems designed to save you time and exponentially increase your revenue.
        </p>
      </div>

      {/* AI Automation Section (Expanded) */}
      <div className="service-detail-section" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
        <div className="service-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
          <div className="service-icon lavender" style={{ margin: 0 }}>
            <Bot size={48} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)' }}>AI & Automation</h2>
            <p className="text-secondary" style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>Fire your manual tasks. Hire code.</p>
          </div>
        </div>

        <div className="service-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Content Side */}
          <div className="service-detail-content">
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Stop wasting time on tasks a robot can do.</h3>
            
            <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Imagine having an employee who works 24/7, never sleeps, never takes a vacation, and absolutely never makes a mistake. That is what custom AI automation brings to your business. Most companies leak thousands of dollars every month by paying humans to do repetitive, manual data entry.
            </p>

            <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              We build intelligent pipelines that connect your entire business. When an email comes in, our AI reads the intent, extracts the important information, updates your CRM (like HubSpot or Salesforce), drafts a highly personalized reply, and notifies your team in Slack—all in exactly 2 seconds.
            </p>
            
            <div className="service-features-list" style={{ marginTop: '2rem' }}>
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <CheckCircle size={24} className="text-lavender" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '0.5rem', display: 'block' }}>Customer Support AI Agents</strong>
                  <p style={{ lineHeight: '1.6' }}>We train AI models directly on your company's knowledge base. When customers ask complex questions at 3 AM, our agents resolve them instantly, completely eliminating support tickets.</p>
                </div>
              </div>
              
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Workflow size={24} className="text-lavender" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '0.5rem', display: 'block' }}>Complete Workflow Automation</strong>
                  <p style={{ lineHeight: '1.6' }}>We seamlessly bridge the gap between tools like Gmail, Stripe, Slack, and your CRM. Invoicing, onboarding, and data syncing happen entirely in the background.</p>
                </div>
              </div>
            </div>

            <Link to="/services/ai-automation" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#5D3FD3', padding: '1.2rem 2.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              Explore AI Automation Options <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Visual Side */}
          <div className="service-visual-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="premium-animated-visual ai-pipeline-visual">
               <div className="pipeline-track">
                  <div className="data-packet"></div>
               </div>
               
               <div className="pipeline-node node-input">
                  <div className="node-icon"><Mail size={24} /></div>
                  <span className="node-label">Email Received</span>
               </div>
               
               <div className="pipeline-node node-ai">
                  <div className="node-icon pulse"><Bot size={32} color="#fff" /></div>
                  <span className="node-label">AI Agent Processing</span>
               </div>
               
               <div className="pipeline-node node-output">
                  <div className="node-icon"><Database size={24} /></div>
                  <span className="node-label">CRM Updated</span>
               </div>
            </div>

            {/* Custom Visual: Manual vs AI */}
            <div className="service-detail-visual glass flex-center" style={{ flexDirection: 'column', gap: '1.5rem', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
               <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)' }}>The Speed Difference</h4>
               <div className="comparison-card manual mobile-small-card">
                  <div className="comp-header">
                     <Clock size={18} /> <span>Manual Human Process</span>
                  </div>
                  <div className="comp-body">
                     Read Email ➔ Copy to CRM ➔ Draft Reply ➔ <strong>Takes 15+ mins</strong>
                  </div>
               </div>
               
               <div className="comparison-card ai mobile-small-card">
                  <div className="comp-header">
                     <Zap size={18} /> <span>Custom AI Automation</span>
                  </div>
                  <div className="comp-body">
                     AI Extracts Data ➔ CRM Auto-Updates ➔ Reply Sent ➔ <strong>Takes 2 Seconds</strong>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>

      <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '8rem' }}></div>

      {/* Web Design & Development Section (Expanded) */}
      <div className="service-detail-section" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
        <div className="service-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
          <div className="service-icon coral" style={{ margin: 0 }}>
            <Code size={48} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: 'clamp(1.8rem, 6vw, 2.5rem)' }}>High-End Web Design & Development</h2>
            <p className="text-secondary" style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>We don't build brochures. We build digital salespeople.</p>
          </div>
        </div>

        <div className="service-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Visual Side (Left for Web Dev to alternate layout) */}
          <div className="service-visual-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="premium-animated-visual web-visual" style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <div className="browser-mockup" style={{ width: '80%', height: '80%', background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', position: 'relative' }}>
                 {/* Browser Header */}
                 <div style={{ height: '30px', background: '#1a1a1a', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                 </div>
                 {/* Browser Body - Animated elements */}
                 <div className="browser-body" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                    <div className="skeleton-pulse" style={{ height: '30px', width: '40%', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
                    <div className="skeleton-pulse" style={{ height: '15px', width: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', animationDelay: '0.2s' }}></div>
                    <div className="skeleton-pulse" style={{ height: '15px', width: '80%', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', animationDelay: '0.4s' }}></div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                      <div className="skeleton-pulse" style={{ height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', animationDelay: '0.6s' }}></div>
                      <div className="skeleton-pulse" style={{ height: '60px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', animationDelay: '0.8s' }}></div>
                    </div>
                 </div>
               </div>
               
               {/* Floating elements popping out of browser */}
               <div className="floating-badge text-coral pulse" style={{ position: 'absolute', right: '5%', top: '15%', background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(255,107,107,0.3)', backdropFilter: 'blur(10px)', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                  <TrendingUp size={16} /> +320% Conversion
               </div>
               <div className="floating-badge text-lavender pulse" style={{ position: 'absolute', left: '0%', bottom: '20%', background: 'rgba(0,0,0,0.8)', padding: '0.5rem 1rem', borderRadius: '20px', border: '1px solid rgba(138,43,226,0.3)', backdropFilter: 'blur(10px)', fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2, animationDelay: '1s' }}>
                  <Clock size={16} /> 0.8s Load Time
               </div>
            </div>

            {/* Custom Visual: Visitors to Revenue */}
            <div className="service-detail-visual glass flex-center" style={{ flexDirection: 'column', gap: '1rem', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
               <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)' }}>The Conversion Funnel</h4>
               <div className="funnel-visual-step" style={{ padding: '0.75rem 1.5rem' }}>
                  <Users size={20} className="text-coral" />
                  <span>Traffic & Visitors Arrive</span>
               </div>
               <div className="funnel-visual-arrow" style={{ padding: '0.25rem 0' }}>↓</div>
               <div className="funnel-visual-step highlight" style={{ padding: '0.75rem 1.5rem' }}>
                  <Globe size={20} />
                  <span>Sub-Second Load Times & Premium UI</span>
               </div>
               <div className="funnel-visual-arrow" style={{ padding: '0.25rem 0' }}>↓</div>
               <div className="funnel-visual-step success" style={{ padding: '0.75rem 1.5rem' }}>
                  <TrendingUp size={20} />
                  <span>Massive Increase in Leads & Revenue</span>
               </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="service-detail-content">
            <h3 style={{ fontSize: 'clamp(1.4rem, 5vw, 1.8rem)', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Your website is your ultimate first impression.</h3>
            
            <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              In today's digital landscape, attention spans are practically zero. If your website takes more than 3 seconds to load, or if it looks like a cheap template, your potential clients will instantly bounce to a competitor. A bad website doesn't just cost you the design fee; it costs you millions in lost revenue.
            </p>

            <p className="text-secondary" style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              We specialize in custom-coded, ultra-premium web architectures built on Next.js and React. These aren't WordPress templates. These are high-performance software applications designed with psychological precision to guide visitors directly into your sales funnel. 
            </p>
            
            <div className="service-features-list" style={{ marginTop: '2rem' }}>
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <CheckCircle size={24} className="text-coral" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '0.5rem', display: 'block' }}>Conversion-Optimized Landing Pages</strong>
                  <p style={{ lineHeight: '1.6' }}>We map out the perfect user journey, utilizing elite copywriting and jaw-dropping design to ensure maximum conversion rates.</p>
                </div>
              </div>
              
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Server size={24} className="text-coral" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '0.5rem', display: 'block' }}>SaaS & Complex Architectures</strong>
                  <p style={{ lineHeight: '1.6' }}>Need a complete custom web app? We build secure, scalable backend systems and gorgeous frontend dashboards for complex software products.</p>
                </div>
              </div>
            </div>

            <Link to="/services/web-development" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '1.2rem 2.5rem', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}>
              Explore Web Design & Development Options <ArrowRight size={20} />
            </Link>
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
