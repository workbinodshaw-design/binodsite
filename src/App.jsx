import React, { useState, useEffect } from 'react';
import UIOverlay from './components/UIOverlay';
import SceneContainer from './components/SceneContainer';
import ActiveCardOverlay from './components/ActiveCardOverlay';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress from 0 to 1 based on body height
      const totalScroll = document.body.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = currentScroll / totalScroll;
      
      // Clamp between 0 and 1
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div id="app-container" style={{ filter: activeCard ? 'blur(8px)' : 'none', transition: 'filter 0.3s ease' }}>
        <UIOverlay />
        {/* 3D Scene Layer wrapped in Error Boundary so the site doesn't blank out if WebGL/Model fails */}
        <ErrorBoundary>
          <div className="canvas-container">
            <SceneContainer scrollProgress={scrollProgress} setActiveCard={setActiveCard} />
          </div>
        </ErrorBoundary>
      </div>
      <ActiveCardOverlay activeCard={activeCard} onClose={() => setActiveCard(null)} />
      
      {/* Scroll Snapping Sections */}
      <div className="scroll-sections">
        {/* Empty tall container for smooth native scrolling */}
      </div>
    </>
  );
}

export default App;
