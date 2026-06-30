import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    // Wait a brief moment for DOM to paint
    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');
      
      if (revealElements.length === 0) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated if we only want it to happen once
            // observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1, // Trigger when 10% visible
        rootMargin: '0px 0px -50px 0px' // Slightly before it fully comes into view
      });

      revealElements.forEach(el => observer.observe(el));

      return () => {
        revealElements.forEach(el => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]); // Re-run when route changes

  return null; // This component doesn't render anything
};

export default ScrollReveal;
