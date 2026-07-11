import React from 'react';
import { motion } from 'framer-motion';

const transitionSettings = { duration: 1.0, ease: [0.87, 0, 0.13, 1] };

// Foreground Shutter (Black)
const shutter1Variants = {
  initial: { scaleY: 1, transformOrigin: 'top' },
  in: { scaleY: 0, transformOrigin: 'top', transition: { ...transitionSettings, delay: 0 } },
  out: { scaleY: 1, transformOrigin: 'bottom', transition: { ...transitionSettings, delay: 0.15 } }
};

// Background Shutter (Brand Blue)
const shutter2Variants = {
  initial: { scaleY: 1, transformOrigin: 'top' },
  in: { scaleY: 0, transformOrigin: 'top', transition: { ...transitionSettings, delay: 0.15 } },
  out: { scaleY: 1, transformOrigin: 'bottom', transition: { ...transitionSettings, delay: 0 } }
};

// The actual page content
const contentVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.5, ease: 'easeOut' } },
  out: { opacity: 0, y: -50, transition: { duration: 0.4 } }
};

const HomeTransition = ({ children }) => {
  return (
    <>
      {/* Background Shutter (Blue) */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={shutter2Variants}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#1A73E8',
          zIndex: 999998,
          pointerEvents: 'none'
        }}
      />
      
      {/* Foreground Shutter (Black) */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={shutter1Variants}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: '#050505', // Very dark color to match site theme
          zIndex: 999999,
          pointerEvents: 'none'
        }}
      />
      
      {/* Page Content */}
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={contentVariants}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default HomeTransition;
