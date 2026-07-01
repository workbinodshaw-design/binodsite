import React from 'react';

const FloatingBubbles = () => {
  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 60 + 20; // 20px to 80px
    const left = Math.random() * 100; // 0% to 100%
    const animationDuration = Math.random() * 15 + 15; // 15s to 30s
    const delay = Math.random() * 10; // 0s to 10s
    
    // Choose between Spiderman Red, Electric Blue, and Lavender tones
    const colors = [
      'rgba(79, 70, 229, 0.15)',  // Indigo
      'rgba(147, 51, 234, 0.15)', // Violet
      'rgba(138, 43, 226, 0.1)'   // Lavender
    ];
    const bg = colors[Math.floor(Math.random() * colors.length)];

    return (
      <div
        key={i}
        className="floating-bubble"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${delay}s`,
          background: bg,
          boxShadow: `0 0 ${size/2}px ${bg}, inset 0 0 ${size/4}px rgba(255,255,255,0.5)`
        }}
      />
    );
  });

  return (
    <div className="bubbles-container">
      {bubbles}
    </div>
  );
};

export default FloatingBubbles;
