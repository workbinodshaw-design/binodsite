import React from 'react';
import { Activity, Code, Database, Zap, Layout, Server, Bot, X } from 'lucide-react';

const ActiveCardOverlay = ({ activeCard, onClose }) => {
  if (!activeCard) return null;

  return (
    <div className="active-card-overlay" onClick={onClose}>
      <div className="active-card-container" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="card-header large">
          {activeCard.icon}
          {activeCard.title}
        </div>
        
        {activeCard.content}
      </div>
    </div>
  );
};

export default ActiveCardOverlay;
