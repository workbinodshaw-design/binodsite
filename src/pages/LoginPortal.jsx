import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Lock, User, UserPlus } from 'lucide-react';

const LoginPortal = () => {
  const [isLogin, setIsLogin] = useState(true);
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
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Determine role (Founder gets instant admin, everyone else is client)
        const role = email.toLowerCase() === 'work.binodshaw@gmail.com' ? 'admin' : 'client';
        
        // Create their role document in the database
        await setDoc(doc(db, 'users', user.uid), {
          email: email,
          role: role,
          createdAt: new Date()
        });
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please click "Log In" instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/invalid-credential') {
         setError('Invalid password. Please try again.');
      } else {
        setError(`Database Error: ${err.message}`);
      }
      setLoading(false);
    }
  };

  return (
    <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', paddingTop: '8rem' }}>
      <div className="glass text-center" style={{ padding: '4rem', borderRadius: '24px', maxWidth: '400px', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setIsLogin(true)} 
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: isLogin ? 'bold' : 'normal', color: isLogin ? '#fff' : '#888', cursor: 'pointer', paddingBottom: '0.5rem', borderBottom: isLogin ? '2px solid #a388ff' : '2px solid transparent' }}
          >
            Log In
          </button>
          <button 
            onClick={() => setIsLogin(false)} 
            style={{ background: 'none', border: 'none', fontSize: '1.2rem', fontWeight: !isLogin ? 'bold' : 'normal', color: !isLogin ? '#fff' : '#888', cursor: 'pointer', paddingBottom: '0.5rem', borderBottom: !isLogin ? '2px solid #a388ff' : '2px solid transparent' }}
          >
            Sign Up
          </button>
        </div>

        <div style={{ background: 'rgba(163, 136, 255, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          {isLogin ? <User size={32} color="#a388ff" /> : <UserPlus size={32} color="#a388ff" />}
        </div>
        
        <h2 style={{ marginBottom: '0.5rem' }}>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p style={{ color: '#aaa', marginBottom: '2rem' }}>
          {isLogin ? 'Sign in to access your dashboard' : 'Join to access your client portal'}
        </p>
        
        {error && <div style={{ color: '#FF6B6B', background: 'rgba(255,107,107,0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            placeholder="Email Address" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Password (min 6 chars)" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '1.5rem' }}
          />
          <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            <Lock size={18} /> {loading ? 'Processing...' : (isLogin ? 'Secure Login' : 'Create Account')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPortal;
