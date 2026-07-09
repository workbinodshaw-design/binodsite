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
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px', margin: 0 }}>CastFlow.</h1>
        <div onClick={() => navigate('/contact')} style={{ background: '#E8E8ED', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, color: '#1D1D1F' }}>
          Contact Us
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: '1rem 1.5rem 2rem 1.5rem' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: '1.1', letterSpacing: '-1px', marginBottom: '1rem' }}>
          Build<br/>
          <span style={{ background: 'linear-gradient(90deg, #2F95F4, #A388FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Brilliant</span><br/>
          Products.
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#86868B', lineHeight: '1.5', marginBottom: '2rem' }}>
          We design and engineer premium web applications and AI automations.
        </p>
        <button 
          onClick={() => navigate('/portfolio')}
          style={{ 
            background: '#1D1D1F', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '24px', 
            padding: '1rem 2rem', 
            fontSize: '1rem', 
            fontWeight: 600, 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }}
        >
          View Portfolio <ArrowRight size={18} />
        </button>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '0 1.5rem 2rem 1.5rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#1D1D1F' }}>Our Services</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
          
          {/* Card 1 */}
          <div onClick={() => navigate('/services/web-development')} style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(47, 149, 244, 0.1)', padding: '1rem', borderRadius: '16px', color: '#2F95F4' }}>
              <Code size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 600 }}>Web Development</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#86868B' }}>React, Next.js, Premium UI</p>
            </div>
          </div>

          {/* Card 2 */}
          <div onClick={() => navigate('/services/ai-automation')} style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(163, 136, 255, 0.1)', padding: '1rem', borderRadius: '16px', color: '#A388FF' }}>
              <Cpu size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 600 }}>AI Automation</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#86868B' }}>Smart agents & workflows</p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'rgba(244, 179, 156, 0.2)', padding: '1rem', borderRadius: '16px', color: '#F4B39C' }}>
              <Smartphone size={24} />
            </div>
            <div>
              <h4 style={{ margin: '0 0 0.2rem 0', fontSize: '1.1rem', fontWeight: 600 }}>App Design</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: '#86868B' }}>Apple-inspired UX/UI</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default MobileHomePage;
