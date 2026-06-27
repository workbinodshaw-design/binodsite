import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo-container">
        <img src={import.meta.env.BASE_URL + 'logo.png'} alt="CastFlow Logo" className="logo-img" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="logo-text">CASTFLOW</span>
      </Link>
      
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
        <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
        <Link to="/portfolio" className={`nav-link ${location.pathname === '/portfolio' ? 'active' : ''}`}>Portfolio</Link>
        <button 
          onClick={() => window.dispatchEvent(new Event('open-ai-agent'))}
          className="nav-link btn btn-primary small" 
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Bot size={16} /> Ask AI Agent
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
