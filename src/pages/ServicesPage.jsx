import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot, CheckCircle, ArrowRight, Zap, Clock, TrendingUp, Users, Globe, Play, Server, Workflow } from 'lucide-react';
import ContactSection from '../components/ContactSection';

const ServicesPage = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header text-center" style={{ marginBottom: '4rem' }}>
        <div className="badge">
          <div className="badge-dot"></div>
          OUR EXPERTISE
        </div>
        <h1 className="headline" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Scale With Certainty</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '750px', fontSize: '1.2rem', lineHeight: '1.8' }}>
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
            <h2 style={{ margin: 0, fontSize: '2.5rem' }}>AI & Automation</h2>
            <p className="text-secondary" style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>Fire your manual tasks. Hire code.</p>
          </div>
        </div>

        <div className="service-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Content Side */}
          <div className="service-detail-content">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Stop wasting time on tasks a robot can do.</h3>
            
            <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              Imagine having an employee who works 24/7, never sleeps, never takes a vacation, and absolutely never makes a mistake. That is what custom AI automation brings to your business. Most companies leak thousands of dollars every month by paying humans to do repetitive, manual data entry.
            </p>

            <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              We build intelligent pipelines that connect your entire business. When an email comes in, our AI reads the intent, extracts the important information, updates your CRM (like HubSpot or Salesforce), drafts a highly personalized reply, and notifies your team in Slack—all in exactly 2 seconds.
            </p>
            
            <div className="service-features-list" style={{ marginTop: '2rem' }}>
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <CheckCircle size={24} className="text-lavender" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>Customer Support AI Agents</strong>
                  <p style={{ lineHeight: '1.6' }}>We train AI models directly on your company's knowledge base. When customers ask complex questions at 3 AM, our agents resolve them instantly, completely eliminating support tickets.</p>
                </div>
              </div>
              
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Workflow size={24} className="text-lavender" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>Complete Workflow Automation</strong>
                  <p style={{ lineHeight: '1.6' }}>We seamlessly bridge the gap between tools like Gmail, Stripe, Slack, and your CRM. Invoicing, onboarding, and data syncing happen entirely in the background.</p>
                </div>
              </div>
            </div>

            <Link to="/services/ai-automation" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#5D3FD3', padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Explore AI Automation Options <ArrowRight size={20} />
            </Link>
          </div>
          
          {/* Visual Side */}
          <div className="service-visual-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="premium-animated-visual ai-visual">
               <div className="ai-core"></div>
               <div className="ai-ring ring-1"></div>
               <div className="ai-ring ring-2"></div>
               <div className="ai-ring ring-3"></div>
               <div className="ai-node node-1"></div>
               <div className="ai-node node-2"></div>
               <div className="ai-node node-3"></div>
            </div>

            {/* Custom Visual: Manual vs AI */}
            <div className="service-detail-visual glass flex-center" style={{ flexDirection: 'column', gap: '1.5rem', padding: '2rem', background: 'rgba(255,255,255,0.02)' }}>
               <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)' }}>The Speed Difference</h4>
               <div className="comparison-card manual">
                  <div className="comp-header">
                     <Clock size={18} /> <span>Manual Human Process</span>
                  </div>
                  <div className="comp-body">
                     Read Email ➔ Copy to CRM ➔ Draft Reply ➔ <strong>Takes 15+ mins</strong>
                  </div>
               </div>
               
               <div className="comparison-card ai">
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

      {/* Web Development Section (Expanded) */}
      <div className="service-detail-section" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
        <div className="service-header-row" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '2rem' }}>
          <div className="service-icon coral" style={{ margin: 0 }}>
            <Code size={48} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '2.5rem' }}>High-End Web Development</h2>
            <p className="text-secondary" style={{ margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>We don't build brochures. We build digital salespeople.</p>
          </div>
        </div>

        <div className="service-grid-2-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Visual Side (Left for Web Dev to alternate layout) */}
          <div className="service-visual-column" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="premium-animated-visual web-visual">
               <div className="floating-layer layer-back"></div>
               <div className="floating-layer layer-mid">
                  <div className="skeleton-line" style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px', borderRadius: '4px' }}></div>
                  <div className="skeleton-line" style={{ width: '75%', height: '8px', background: 'rgba(255,255,255,0.1)', marginBottom: '10px', borderRadius: '4px' }}></div>
                  <div className="skeleton-line" style={{ width: '50%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px' }}></div>
               </div>
               <div className="floating-layer layer-front">
                  <div className="code-snippet" style={{ fontFamily: 'monospace', color: '#25D366', fontSize: '1.2rem' }}>
                    <span style={{ color: '#ff4757' }}>const</span> build = <span style={{ color: '#feca57' }}>'perfect'</span>;
                  </div>
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
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Your website is your ultimate first impression.</h3>
            
            <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              In today's digital landscape, attention spans are practically zero. If your website takes more than 3 seconds to load, or if it looks like a cheap template, your potential clients will instantly bounce to a competitor. A bad website doesn't just cost you the design fee; it costs you millions in lost revenue.
            </p>

            <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              We specialize in custom-coded, ultra-premium web architectures built on Next.js and React. These aren't WordPress templates. These are high-performance software applications designed with psychological precision to guide visitors directly into your sales funnel. 
            </p>
            
            <div className="service-features-list" style={{ marginTop: '2rem' }}>
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <CheckCircle size={24} className="text-coral" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>Conversion-Optimized Landing Pages</strong>
                  <p style={{ lineHeight: '1.6' }}>We map out the perfect user journey, utilizing elite copywriting and jaw-dropping design to ensure maximum conversion rates.</p>
                </div>
              </div>
              
              <div className="feature-item" style={{ alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <Server size={24} className="text-coral" style={{ marginTop: '4px' }} />
                <div>
                  <strong style={{ fontSize: '1.2rem', marginBottom: '0.5rem', display: 'block' }}>SaaS & Complex Architectures</strong>
                  <p style={{ lineHeight: '1.6' }}>Need a complete custom web app? We build secure, scalable backend systems and gorgeous frontend dashboards for complex software products.</p>
                </div>
              </div>
            </div>

            <Link to="/services/web-development" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '1.2rem 2.5rem', fontSize: '1.1rem' }}>
              Explore Web Development Options <ArrowRight size={20} />
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
