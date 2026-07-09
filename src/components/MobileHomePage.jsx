import React from 'react';
import { Home, Layers, Zap, User, ArrowRight, Code, Cpu, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileHomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ 
      background: '#F5F5F7', // Apple's signature light grey background
      minHeight: '100vh', 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      color: '#1D1D1F'
    }}>
      
      {/* HEADER */}
      <header style={{ padding: '2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>CastFlow.</h1>
        <div onClick={() => navigate('/contact')} style={{ background: '#1D1D1F', padding: '0.6rem 1.2rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
          Contact Us
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '2rem 1.5rem 3rem 1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', color: '#86868B', marginBottom: '1.5rem' }}>
          AI AUTOMATION • Web Design & Development
        </div>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-1px', marginBottom: '1.5rem' }}>
          Turn Your Bottlenecks Into <br/>
          <span style={{ color: '#2F95F4' }}>Automated Revenue.</span>
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: '1.6', marginBottom: '2.5rem' }}>
          We build custom AI agents, automated workflows, and high-performance web apps that save you 40+ hours a week and scale your business effortlessly.
        </p>
        <button 
          onClick={() => navigate('/contact')}
          style={{ 
            background: '#1D1D1F', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            padding: '1.2rem 2rem', 
            fontSize: '1rem', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%',
            gap: '0.5rem'
          }}
        >
          Get Free Consultation <ArrowRight size={18} />
        </button>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1D1D1F', letterSpacing: '-0.5px' }}>Our Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          
          {/* Card 1 */}
          <div onClick={() => navigate('/services/web-development')} style={{ background: '#fff', padding: '1.5rem', border: '1px solid #E8E8ED', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', cursor: 'pointer' }}>
            <div style={{ color: '#1D1D1F', marginTop: '0.2rem' }}>
              <Code size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Web Development</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }}>High-performance web apps built with React, Next.js, and modern architecture.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div onClick={() => navigate('/services/ai-automation')} style={{ background: '#fff', padding: '1.5rem', border: '1px solid #E8E8ED', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', cursor: 'pointer' }}>
            <div style={{ color: '#1D1D1F', marginTop: '0.2rem' }}>
              <Cpu size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>AI Automation</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }}>Custom intelligent agents and workflows to completely automate repetitive tasks.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div onClick={() => navigate('/portfolio')} style={{ background: '#fff', padding: '1.5rem', border: '1px solid #E8E8ED', borderRadius: '4px', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', cursor: 'pointer' }}>
            <div style={{ color: '#1D1D1F', marginTop: '0.2rem' }}>
              <Layers size={24} strokeWidth={1.5} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 700, letterSpacing: '-0.5px' }}>App Design</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#666', lineHeight: '1.5' }}>Premium UX/UI design focusing on clean aesthetics and seamless user journeys.</p>
            </div>
          </div>

    </div>
  );
};

export default MobileHomePage;
