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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 2 / auto', maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
              {/* Abstract Logo */}
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="8" fill="#111" />
                <path d="M12 28V12C12 12 18 12 22 12C26 12 28 14 28 18C28 22 26 24 22 24H12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 20H28" stroke="white" strokeWidth="3" strokeLinecap="round" />
              </svg>
              <span style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '1px' }}>CASTFLOW</span>
            </div>
            <p style={{ color: '#888', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '2rem' }}>
              Architecting high-performance web applications, automating business workflows, and building autonomous AI systems that drive growth.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', textDecoration: 'none', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'} onMouseOut={e=>e.currentTarget.style.background='rgba(255,255,255,0.05)'}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
            </div>
          </div>

          {/* Quick Links Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Company</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomLink to="/" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Home</CustomLink>
              <CustomLink to="/services" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Services</CustomLink>
              <CustomLink to="/portfolio" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Portfolio</CustomLink>
              <CustomLink to="/pricing" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Pricing</CustomLink>
              <CustomLink to="/join-team" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Careers / Join Us</CustomLink>
            </div>
          </div>

          {/* Services Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Services</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomLink to="/services/ai-automation" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>AI Automation</CustomLink>
              <CustomLink to="/services/web-development" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Web Development</CustomLink>
              <CustomLink to="/services" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>MVP Development</CustomLink>
            </div>
          </div>

          {/* Support Col */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', color: '#fff' }}>Legal & Support</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <CustomLink to="/contact" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Contact Us</CustomLink>
              <a href="https://privacypolicy.castflow.in" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Privacy Policy</a>
              <CustomLink to="/terms" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Terms of Service</CustomLink>
              <CustomLink to="/refund-policy" style={{ color: '#888', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#fff'} onMouseOut={e=>e.target.style.color='#888'}>Refund Policy</CustomLink>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: '#555', fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} CastFlow. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
             {user ? (
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', padding: 0, color: '#ff6b6b', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold' }}>
                  Log Out
                </button>
             ) : (
                <CustomLink to="/client-login" style={{ color: '#555', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#888'} onMouseOut={e=>e.target.style.color='#555'}>
                  Client Portal
                </CustomLink>
             )}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
