import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Fingerprint } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (user.email && user.email.toLowerCase() === 'work.binodshaw@gmail.com') {
          navigate('/admin');
        } else {
          try {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists() && userDoc.data().role === 'admin') {
              navigate('/admin');
            } else {
              // Kick them out if not admin
              auth.signOut();
              setError("UNAUTHORIZED: This terminal is restricted to Admins only.");
            }
          } catch (error) {
            console.error("Error fetching admin role:", error);
            auth.signOut();
            setError("Authentication error.");
          }
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err.code === 'auth/invalid-credential') {
         setError('ACCESS DENIED. INVALID CREDENTIALS.');
      } else {
        setError(`System Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#050505', color: '#00ff00', fontFamily: 'monospace' }}>
      <div style={{ padding: '3rem', border: '1px solid rgba(0,255,0,0.3)', borderRadius: '8px', maxWidth: '450px', width: '100%', background: 'rgba(0,255,0,0.02)', boxShadow: '0 0 30px rgba(0,255,0,0.05)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <ShieldAlert size={48} color="#00ff00" />
        </div>
        
        <h2 style={{ textAlign: 'center', letterSpacing: '4px', marginBottom: '0.5rem', textTransform: 'uppercase' }}>System Admin</h2>
        <p style={{ textAlign: 'center', color: '#00cc00', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
          UNAUTHORIZED ACCESS IS STRICTLY PROHIBITED.
        </p>
        
        {error && <div style={{ color: '#ff0000', background: 'rgba(255,0,0,0.1)', border: '1px solid #ff0000', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#00cc00' }}>ADMIN_EMAIL</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: '#000', border: '1px solid rgba(0,255,0,0.5)', color: '#00ff00', outline: 'none', fontFamily: 'monospace' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#00cc00' }}>SECURITY_KEY</label>
            <input 
              type="password" 
              maxLength="16"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', background: '#000', border: '1px solid rgba(0,255,0,0.5)', color: '#00ff00', outline: 'none', fontFamily: 'monospace', letterSpacing: '4px' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', background: '#00ff00', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '1rem', fontFamily: 'monospace', fontSize: '1.1rem' }}>
            <Fingerprint size={20} /> {loading ? 'AUTHENTICATING...' : 'INITIALIZE UPLINK'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
