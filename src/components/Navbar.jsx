import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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
        
        {user ? (
          <Link 
            to="/client-login" 
            className="nav-link btn btn-primary small" 
            style={{ 
              color: '#fff', 
              background: '#000', 
              padding: '0.6rem', 
              borderRadius: '50%', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: '1rem',
              textDecoration: 'none'
            }}
            title="My Account"
          >
            <User size={20} />
          </Link>
        ) : (
          <Link 
            to="/client-login" 
            className="nav-link btn btn-primary small" 
            style={{ 
              color: '#fff', 
              background: '#000', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '30px', 
              fontWeight: '600', 
              marginLeft: '1rem',
              textDecoration: 'none'
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
