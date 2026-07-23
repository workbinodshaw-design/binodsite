import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate jump to top, overriding CSS smooth scroll
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    
    // Restore smooth scrolling after a tiny delay
    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = '';
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
