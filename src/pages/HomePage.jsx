import React, { useState, useEffect, useRef } from 'react';
import UIOverlay from '../components/UIOverlay';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import SceneContainer from '../components/SceneContainer';
import ActiveCardOverlay from '../components/ActiveCardOverlay';
import ErrorBoundary from '../components/ErrorBoundary';
import FloatingBubbles from '../components/FloatingBubbles';
import { Layers, Box, Cpu, HardDrive, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const heroWrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroWrapperRef.current) return;
      
      const rect = heroWrapperRef.current.getBoundingClientRect();
      const wrapperTop = rect.top; 
      const wrapperHeight = rect.height; 
      const viewportHeight = window.innerHeight;
      
      const maxScroll = wrapperHeight - viewportHeight;
      const currentScroll = -wrapperTop; 
      
      let progress = currentScroll / maxScroll;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-page">
      <ActiveCardOverlay activeCard={activeCard} onClose={() => setActiveCard(null)} />

      {/* MOBILE ONLY: Normal scrolling UI text */}
      {isMobile && (
        <div style={{ paddingTop: '100px', background: 'var(--bg-color)', position: 'relative', zIndex: 20 }}>
          <UIOverlay />
        </div>
      )}

      {/* 1. PINNED HERO WRAPPER */}
      <div className="hero-pin-wrapper" ref={heroWrapperRef}>
        <div className="hero-sticky-container" style={{ filter: activeCard ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }}>
          
          <FloatingBubbles />
          {!isMobile && <UIOverlay />}

          <ErrorBoundary>
            <div className="canvas-container">
              <SceneContainer scrollProgress={scrollProgress} setActiveCard={setActiveCard} />
            </div>
          </ErrorBoundary>
          
        </div>
      </div>
      
      {/* 2. NORMAL SCROLLING CONTENT */}
      <div className="normal-content">
        


        <div className="content-section" style={{ justifyContent: 'center' }}>
          <ServicesSection />
        </div>

        <div className="content-section" style={{ justifyContent: 'center' }}>
          <ProcessSection />
        </div>

        {/* CASTFLOW ADVANTAGE BANNER */}
        <div style={{ padding: '6rem 2rem', background: '#0a0a0a', borderTop: '1px solid rgba(138,43,226,0.2)', borderBottom: '1px solid rgba(138,43,226,0.2)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at center, rgba(138,43,226,0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
          <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '4rem', color: '#fff' }}>The Castflow Advantage</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#b673f8', marginBottom: '1rem', fontWeight: 700 }}>100% Transparent Pricing</h3>
                <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>We mathematically calculate the exact scope of your project. No hidden fees, no agency bloat. You pay for pure development.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '1rem', fontWeight: 700 }}>Lightning Fast Delivery</h3>
                <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>Because we utilize our own AI automation pipelines internally, we ship enterprise-grade software 3x faster than traditional agencies.</p>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '3rem 2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#ec4899', marginBottom: '1rem', fontWeight: 700 }}>Built to Scale</h3>
                <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: '1.1rem' }}>We don't build temporary solutions. Every platform is architected to handle millions of users from day one with flawless security.</p>
              </div>
            </div>
          </div>
        </div>

        {/* JOIN OUR TEAM BANNER */}
        <div style={{ padding: '4rem 2rem', background: 'var(--bg-color)' }}>
          <div className="glass reveal-up" style={{ maxWidth: '1000px', margin: '0 auto', padding: '3rem', borderRadius: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', border: '1px solid rgba(163, 136, 255, 0.2)' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(163, 136, 255, 0.1)', color: '#a388ff', padding: '0.4rem 1rem', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                <Users size={16} /> We are Hiring!
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff' }}>Join the CastFlow Team</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>We are looking for passionate developers, AI specialists, and communicators to build the future of automation with us.</p>
            </div>
            <div>
              <Link to="/join-team" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '1rem 2rem', fontSize: '1.1rem', textDecoration: 'none' }}>
                View Open Positions <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="content-section" style={{ justifyContent: 'center', minHeight: '50vh', alignItems: 'flex-end', paddingBottom: '2rem' }}>
          <ContactSection />
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
