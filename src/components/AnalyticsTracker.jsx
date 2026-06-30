import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { recordPageView } from '../firebase';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Record page view on route change
    recordPageView(location.pathname);
  }, [location.pathname]);

  return null; // Headless component, renders nothing
};

export default AnalyticsTracker;
