import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, User } from 'lucide-react';

const LoginPortal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // If already logged in, redirect them based on their role
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (user.email && user.email.toLowerCase() === 'work.binodshaw@gmail.com') {
            navigate('/admin');
          } else if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === 'admin') navigate('/admin');
            else if (role === 'employee') navigate('/employee');
            else navigate('/client');
          } else {
            navigate('/client');
          }
        } catch (e) {
          navigate('/client');
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
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
         setError('Invalid email or password.');
      } else {
        setError(`Database Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', paddingTop: '8rem' }}>
      <div className="glass text-center" style={{ padding: '4rem', borderRadius: '24px', maxWidth: '400px', width: '100%' }}>

        <div style={{ background: 'rgba(163, 136, 255, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <User size={32} color="#a388ff" />
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>Team Login</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          Sign in to access the internal dashboard
        </p>
        
        {error && <div style={{ color: '#FF6B6B', background: 'rgba(255,107,107,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfdfd', color: '#1a1a1a', marginBottom: '1rem', fontSize: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)', background: '#fdfdfd', color: '#1a1a1a', marginBottom: '1.5rem', fontSize: '1rem' }}
          />
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} /> {loading ? 'Processing...' : 'Secure Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPortal;
