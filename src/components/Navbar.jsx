import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Shield, Briefcase, Menu, X } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Navbar = () => {

  const currentHost = window.location.hostname;
  const isSubdomain = currentHost.split('.').length > 2 && !currentHost.includes('localhost') && currentHost !== 'www.castflow.in';
  
  const CustomLink = ({ to, children, ...props }) => {
    if (isSubdomain && to.startsWith('/')) {
      return <a href={`https://castflow.in${to}`} {...props}>{children}</a>;
    }
    return <Link to={to} {...props}>{children}</Link>;
  };
  
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          } catch (error) {
            console.error("Error fetching user role for Navbar:", error);
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

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`navbar ${isHomePage && !scrolled ? 'navbar-transparent' : 'navbar-glass'} ${scrolled ? 'scrolled' : ''}`}>
      <CustomLink to="/" className="logo-container">
        <img src={import.meta.env.BASE_URL + 'logo.png'} alt="CastFlow Logo" className="logo-img" onError={(e) => { e.target.style.display = 'none' }} />
        <span className="logo-text">CASTFLOW</span>
      </CustomLink>
      
      <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
        {isMenuOpen ? <X size={28} color="#000" /> : <Menu size={28} color="#000" />}
      </button>

      <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <CustomLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</CustomLink>
        <CustomLink to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</CustomLink>
        <a href="https://portfolio.castflow.in" className="nav-link">Portfolio</a>
        <CustomLink to="/projects" className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}>Projects</CustomLink>
        <CustomLink to="/pricing" className={`nav-link ${location.pathname === '/pricing' ? 'active' : ''}`}>Pricing</CustomLink>
        <CustomLink to="/join-team" className={`nav-link ${location.pathname === '/join-team' ? 'active' : ''}`}>Careers</CustomLink>

        
        {user ? (
          <CustomLink 
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
          </CustomLink>
        ) : (
          <CustomLink 
            to="/client-login" 
            className="nav-link btn btn-primary small" 
            style={{ 
              color: '#1A1A1A', 
              background: '#C4F042', 
              padding: '0.6rem 1.5rem', 
              borderRadius: '30px', 
              fontWeight: '700', 
              marginLeft: '1rem',
              textDecoration: 'none',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 4px 15px rgba(196, 240, 66, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(196, 240, 66, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(196, 240, 66, 0.2)';
            }}
          >
            Login
          </CustomLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
