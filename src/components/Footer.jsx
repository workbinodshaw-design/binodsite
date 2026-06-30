import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Footer = () => {

  const currentHost = window.location.hostname;
  const isSubdomain = currentHost.split('.').length > 2 && !currentHost.includes('localhost') && currentHost !== 'www.castflow.in';
  
  const CustomLink = ({ to, children, ...props }) => {
    if (isSubdomain && to.startsWith('/')) {
      return <a href={`https://castflow.in${to}`} {...props}>{children}</a>;
    }
    return <Link to={to} {...props}>{children}</Link>;
  };
  
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (currentUser.email && currentUser.email.toLowerCase() === 'work.binodshaw@gmail.com') {
             setUserRole('admin');
          } else if (userDoc.exists()) {
             setUserRole(userDoc.data().role);
          } else {
             setUserRole('client');
          }
        } catch(e) {
          console.error("Error fetching role for footer:", e);
        }
      } else {
        setUserRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <footer style={{ background: '#050505', color: '#fff', paddingTop: '6rem', paddingBottom: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Top CTA Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '6rem' }}>
          <h2 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Ready to <span style={{ color: '#b673f8' }}>Scale?</span>
          </h2>
          <p style={{ color: '#888', fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '500px' }}>
            Stop wasting time on manual tasks and outdated software. Let us architect the future of your business.
          </p>
          <CustomLink to="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', padding: '1rem 2rem', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', transition: 'transform 0.2s', boxShadow: '0 10px 30px rgba(255,255,255,0.1)' }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Your Project
          </CustomLink>
        </div>

        {/* Links Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
          
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {/* Abstract Logo */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#111" />
                <path d="M12 28V12C12 12 18 12 22 12C26 12 28 14 28 18C28 22 26 24 22 24H12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>CASTFLOW</span>
            </div>
            <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem' }}>
              Architecting high-performance web applications and autonomous AI systems.
            </p>
          </div>

          {/* Services Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomLink to="/services/ai-automation" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Automation</CustomLink>
              <CustomLink to="/services/web-development" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Web Development</CustomLink>
            </div>
          </div>

          {/* Company Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomLink to="/join-team" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Join Our Team</CustomLink>
            </div>
          </div>

          {/* Support Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://privacypolicy.castflow.in" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Privacy Policy</a>
              <CustomLink to="/terms" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Terms of Service</CustomLink>
              <CustomLink to="/refund-policy" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Refund Policy</CustomLink>
              <CustomLink to="/contact" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Contact Us</CustomLink>
            </div>
          </div>

          {/* Socials Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Socials</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Instagram</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>GitHub</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#555', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} Castflow. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             {user && (
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0, color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Log Out
                </button>
             )}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
