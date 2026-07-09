import React from 'react';
import { ArrowRight, Code, Cpu, Rocket, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#FAFAFA',
      color: '#1A1A1A',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflowX: 'hidden'
    }}>
      <SEO 
        title="CastFlow | AI Automation & Web Development Agency"
        description="CastFlow engineers intelligent n8n workflows, custom AI agents, and high-performance React/Next.js applications that save you time and drive revenue."
        keywords="AI Agency, Web Development, Automation, n8n, Next.js, React, MVP Development"
        url="/"
      />

      <style>{`
        .bento-card {
          background: #FFFFFF;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          padding: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .bento-card:hover {
          border-color: rgba(0, 0, 0, 0.2);
          box-shadow: 0 10px 40px rgba(0,0,0,0.05);
          transform: translateY(-2px);
        }
        .glow-button {
          background: #1A1A1A;
          color: #FFFFFF;
          font-weight: 600;
          border: none;
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .glow-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .ghost-button {
          background: transparent;
          color: #1A1A1A;
          font-weight: 600;
          border: 1px solid rgba(0,0,0,0.15);
          padding: 0.8rem 1.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ghost-button:hover {
          background: rgba(0,0,0,0.05);
        }
        .gradient-text {
          background: linear-gradient(180deg, #1A1A1A 0%, #666666 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        /* Mobile overrides */
        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-title {
            font-size: 2.5rem !important;
          }
          .bento-card {
            padding: 1.5rem;
          }
        }
      `}</style>

      {/* HERO SECTION */}
      <section style={{ 
        padding: '8rem 1.5rem 6rem 1.5rem', 
        maxWidth: '1200px', 
        margin: '0 auto', 
        textAlign: 'center',
        position: 'relative'
      }}>
        {/* Subtle grid background for hero */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '6px 12px', 
            background: 'rgba(0,0,0,0.03)', 
            border: '1px solid rgba(0,0,0,0.08)', 
            borderRadius: '20px',
            fontSize: '0.85rem',
            marginBottom: '2rem',
            color: '#666',
            fontWeight: 500
          }}>
            CastFlow Agency v2.0
          </div>
          <h1 className="hero-title" style={{ 
            fontSize: '4.5rem', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: '-1.5px',
            marginBottom: '1.5rem'
          }}>
            Scale Your Business with <br/>
            <span className="gradient-text">AI & Premium Web Apps.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6, marginBottom: '3rem' }}>
            We engineer intelligent n8n workflows, custom AI agents, and high-performance React applications that save you time and drive revenue.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="glow-button" onClick={() => navigate('/portfolio')}>
              Book Discovery Call <ArrowRight size={18} />
            </button>
            <button className="ghost-button" onClick={() => navigate('/services')}>
              View Services
            </button>
          </div>
        </div>
      </section>

      {/* LOGOS MARQUEE */}
      <section style={{ padding: '3rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', overflow: 'hidden', background: '#FFFFFF' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', margin: '0 auto', maxWidth: '1200px', width: '100%', flexWrap: 'wrap', justifyContent: 'center', opacity: 0.4 }}>
          {['Airbnb', 'Fivetran', 'Pendo', 'Airtable', 'Framer', 'Linear'].map(company => (
            <div key={company} style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* BENTO BOX SERVICES */}
      <section style={{ padding: '8rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1rem', textAlign: 'center' }}>Our Core Architecture</h2>
        <p style={{ color: '#666', fontSize: '1.1rem', textAlign: 'center', marginBottom: '4rem' }}>Engineered for scale, built for performance.</p>
        
        <div className="bento-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
          
          {/* Main Large Card */}
          <div className="bento-card" onClick={() => navigate('/services/ai-automation')} style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '300px', cursor: 'pointer' }}>
            <div style={{ maxWidth: '600px' }}>
              <div style={{ background: 'rgba(0,0,0,0.05)', width: '48px', height: '48px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Cpu size={24} color="#1A1A1A" />
              </div>
              <h3 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.5px' }}>AI Automation & Agents</h3>
              <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Stop doing manual work. We build custom n8n workflows and AI agents that run your operations on autopilot. Connect your CRM, email, and databases seamlessly.
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1A1A', fontWeight: 600 }}>
              Explore AI Solutions <ChevronRight size={18} />
            </div>
          </div>

          {/* Half Card 1 */}
          <div className="bento-card" onClick={() => navigate('/services/web-development')} style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ background: 'rgba(0,0,0,0.05)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Code size={20} color="#1A1A1A" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.8rem', letterSpacing: '-0.5px' }}>Web Development</h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.5 }}>
                Pixel-perfect, lightning-fast web applications built with modern architectures like React and Next.js.
              </p>
            </div>
          </div>

          {/* Half Card 2 */}
          <div className="bento-card" onClick={() => navigate('/services')} style={{ minHeight: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', cursor: 'pointer' }}>
            <div>
              <div style={{ background: 'rgba(0,0,0,0.05)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Rocket size={20} color="#1A1A1A" />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.8rem', letterSpacing: '-0.5px' }}>MVP Development</h3>
              <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.5 }}>
                Turn your idea into a launch-ready product in weeks. We focus on rapid prototyping and robust foundations.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* THE PROCESS */}
      <section style={{ padding: '6rem 1.5rem', background: '#FFFFFF', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '4rem', textAlign: 'center' }}>How We Ship</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {[
              { title: '1. Discover & Audit', desc: 'We analyze your bottlenecks, technical requirements, and business goals.' },
              { title: '2. Engineer & Automate', desc: 'We build your custom web application or configure your AI workflows.' },
              { title: '3. Deploy & Scale', desc: 'We launch the product and provide ongoing support as your business scales.' }
            ].map((step, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: '#1A1A1A', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.2rem', marginBottom: '1.5rem' }}>
                  {idx + 1}
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.8rem' }}>{step.title}</h4>
                <p style={{ color: '#666', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '8rem 1.5rem', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1.5rem' }}>
          Ready to Automate?
        </h2>
        <p style={{ fontSize: '1.2rem', color: '#666', lineHeight: 1.6, marginBottom: '3rem' }}>
          Let's discuss how CastFlow can save you 40+ hours a week and build the digital infrastructure your business deserves.
        </p>
        <button className="glow-button" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Book Your Free Audit <ArrowRight size={20} />
        </button>
      </section>

    </div>
  );
};

export default HomePage;
