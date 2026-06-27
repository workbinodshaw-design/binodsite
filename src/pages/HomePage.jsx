import React, { useState, useEffect, useRef } from 'react';
import UIOverlay from '../components/UIOverlay';
import ServicesSection from '../components/ServicesSection';
import ProcessSection from '../components/ProcessSection';
import ContactSection from '../components/ContactSection';
import SceneContainer from '../components/SceneContainer';
import ActiveCardOverlay from '../components/ActiveCardOverlay';
import ErrorBoundary from '../components/ErrorBoundary';
import { Layers, Box, Cpu, HardDrive } from 'lucide-react';

function HomePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(null);
  const heroWrapperRef = useRef(null);

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

      {/* 1. PINNED HERO WRAPPER */}
      <div className="hero-pin-wrapper" ref={heroWrapperRef}>
        <div className="hero-sticky-container" style={{ filter: activeCard ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }}>
          
          <UIOverlay />

          <ErrorBoundary>
            <div className="canvas-container">
              <SceneContainer scrollProgress={scrollProgress} setActiveCard={setActiveCard} />
            </div>
          </ErrorBoundary>
          
        </div>
      </div>
      
      {/* 2. NORMAL SCROLLING CONTENT */}
      <div className="normal-content">
        
        {/* Social Proof Marquee */}
        <div style={{ padding: '3rem 0', background: 'rgba(20,20,25,0.8)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', marginBottom: '4rem' }}>
          <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}>Trusted by innovative companies</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '3rem', maxWidth: '1200px', margin: '0 auto', opacity: 0.6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}><Layers /> SynergyTech</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}><Box /> BlockScale</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}><Cpu /> NexusAI</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: '#fff' }}><HardDrive /> DataFlow</div>
          </div>
        </div>

        <div className="content-section" style={{ justifyContent: 'center' }}>
          <ServicesSection />
        </div>

        <div className="content-section" style={{ justifyContent: 'center' }}>
          <ProcessSection />
        </div>

        <div className="content-section" style={{ justifyContent: 'center', minHeight: '50vh', alignItems: 'flex-end', paddingBottom: '2rem' }}>
          <ContactSection />
        </div>
        
      </div>
    </div>
  );
}

export default HomePage;
