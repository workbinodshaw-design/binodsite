import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollReveal = () => {
  const location = useLocation();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    const observeElements = () => {
      const revealElements = document.querySelectorAll('.reveal-up:not(.observed), .reveal-fade:not(.observed), .reveal-scale:not(.observed)');
      revealElements.forEach(el => {
        el.classList.add('observed');
        observer.observe(el);
      });
    };

    // Initial check
    observeElements();

    // Watch for lazy-loaded elements being added to the DOM
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [location.pathname]);

  return null; // This component doesn't render anything
};

export default ScrollReveal;
