import React from 'react';

// Generates CSS-based holographic/glassmorphic shapes to simulate 3D renders
const HolographicAsset = ({ variant = 1, width = '100%', height = '100%', style = {} }) => {
  const getVariantStyles = () => {
    switch(variant) {
      case 1: // Hero shape (gold/peach abstract)
        return {
          background: 'linear-gradient(135deg, #FFB88C 0%, #DE6262 100%)',
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          filter: 'blur(20px) drop-shadow(0 20px 30px rgba(222,98,98,0.3))',
          transform: 'rotate(-15deg)',
          opacity: 0.85
        };
      case 2: // Blue/Purple ribbon (Track time)
        return {
          background: 'linear-gradient(45deg, #00C9FF 0%, #92FE9D 100%)',
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          filter: 'blur(15px)',
          opacity: 0.9
        };
      case 3: // Purple/Pink ribbon (Performance)
        return {
          background: 'linear-gradient(45deg, #F3A183 0%, #EC6F66 100%)',
          borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%',
          filter: 'blur(15px)',
          opacity: 0.9
        };
      case 4: // Blue/Teal ribbon (Reports)
        return {
          background: 'linear-gradient(45deg, #89F7FE 0%, #66A6FF 100%)',
          borderRadius: '70% 30% 50% 50% / 40% 60% 40% 60%',
          filter: 'blur(15px)',
          opacity: 0.9
        };
      case 5: // Large Pink Cloud (Bottom section)
        return {
          background: 'radial-gradient(circle at 30% 30%, #F6D365 0%, #FDA085 100%)',
          borderRadius: '45% 55% 40% 60% / 55% 45% 60% 40%',
          filter: 'blur(25px) drop-shadow(0 30px 40px rgba(253,160,133,0.4))',
          opacity: 0.85
        };
      default:
        return {
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
          borderRadius: '50%',
          filter: 'blur(10px)',
          opacity: 0.8
        };
    }
  };

  return (
    <div style={{ position: 'relative', width, height, ...style }}>
      {/* Base blurred colored shape */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        right: '10%',
        bottom: '10%',
        transition: 'all 0.5s ease-in-out',
        ...getVariantStyles()
      }}></div>
      
      {/* Overlay glass element for shine */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.4)',
        borderRadius: getVariantStyles().borderRadius,
        boxShadow: 'inset 0 0 20px rgba(255,255,255,0.5)',
        mixBlendMode: 'overlay',
      }}></div>
    </div>
  );
};

export default HolographicAsset;
