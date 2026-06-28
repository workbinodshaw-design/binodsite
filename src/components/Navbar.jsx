import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Shield, Briefcase } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Navbar = () => {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        if (currentUser.email && currentUser.email.toLowerCase() === 'work.binodshaw@gmail.com') {
          setUserRole('admin');
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
            if (userDoc.exists()) {
              setUserRole(userDoc.data().role || 'client');
            } else {
              setUserRole('client');
            }
          } catch (e) {
            setUserRole('client');
          }
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const getDashboardRoute = () => {
    if (userRole === 'admin') return '/admin';
    if (userRole === 'employee') return '/employee';
    return '/client';
  };

  const getRoleBadgeColor = () => {
    if (userRole === 'admin') return { bg: 'rgba(163, 136, 255, 0.2)', text: '#a388ff', icon: <Shield size={14} /> };
    if (userRole === 'employee') return { bg: 'rgba(56, 189, 248, 0.2)', text: '#38bdf8', icon: <Briefcase size={14} /> };
    return { bg: 'rgba(255, 255, 255, 0.1)', text: '#fff', icon: <User size={14} /> };
  };

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
        <Link to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>Pricing</Link>
        
        {user ? (
          <Link 
            to={getDashboardRoute()} 
            className="nav-link btn btn-primary small" 
            style={{ 
              color: '#fff', 
              background: 'rgba(0,0,0,0.5)', 
              padding: '0.4rem 1rem', 
              borderRadius: '30px', 
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginLeft: '1rem',
              textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(0,0,0,0.5)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            title="Go to Dashboard"
          >
            <span style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: userRole === 'admin' || userRole === 'employee' ? 'uppercase' : 'none', letterSpacing: userRole === 'admin' || userRole === 'employee' ? '1px' : 'normal' }}>
              {userRole === 'admin' ? 'Admin' : 
               userRole === 'employee' ? 'Team' : 
               (user.displayName || user.email?.split('@')[0])}
            </span>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: userRole ? getRoleBadgeColor().text : '#fff'
            }}>
              {userRole ? getRoleBadgeColor().icon : <User size={16} />}
            </div>
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
