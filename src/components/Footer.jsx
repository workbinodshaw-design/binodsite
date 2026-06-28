import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ background: '#050505', color: '#fff', paddingTop: '6rem', paddingBottom: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Top CTA Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Ready to <span style={{ color: '#b673f8' }}>Scale?</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px' }}>
            Stop wasting time on manual tasks and outdated software. Let us architect the future of your business.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Your Project
          </Link>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {/* Abstract Logo */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#111" />
                <path d="M12 28V12C12 12 18 12 22 12C26 12 28 14 28 18C28 22 26 24 22 24H12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>CASTFLOW</span>
            </div>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Architecting high-performance web applications and autonomous AI systems.
            </p>
          </div>

          {/* Services Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/services/web-development" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Web Development</Link>
              <Link to="/services/ai-automation" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>AI Automation</Link>
              <Link to="/portfolio" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Our Portfolio</Link>
            </div>
          </div>

          {/* Company Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/pricing" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Pricing</Link>
              <Link to="/contact" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Contact Us</Link>
            </div>
          </div>

          {/* Portals Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Portals</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Link to="/client-login" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Client Login</Link>
              <Link to="/employee" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Team</Link>
              <Link to="/admin" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Admin</Link>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#555', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} Castflow. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#555'}>Twitter</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#555'}>LinkedIn</span>
            <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#555'}>GitHub</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
