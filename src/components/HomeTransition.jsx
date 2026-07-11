import React from 'react';
import { motion } from 'framer-motion';

const homeVariants = {
  initial: {
    opacity: 0,
    scale: 0.92,
    y: 40,
    rotateX: 10,
    filter: 'blur(10px)'
  },
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)'
  },
  out: {
    opacity: 0,
    scale: 1.05,
    y: -30,
    filter: 'blur(10px)'
  }
};

const homeTransition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 1,
  duration: 0.8
};

const HomeTransition = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={homeVariants}
      transition={homeTransition}
      style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
};

export default HomeTransition;
