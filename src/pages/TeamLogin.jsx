import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { Server, Lock } from 'lucide-react';

const TeamLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isFirstTime, setIsFirstTime] = useState(false); // Toggle between Login and Create
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Redirect if already logged in as employee
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            if (role === 'employee') {
              navigate('/employee');
            } else if (role === 'admin') {
              await signOut(auth);
              setError('ACCESS DENIED: Admins must use the Admin Portal.');
            } else {
              await signOut(auth);
              setError('ACCESS DENIED: Clients must use the Client Portal.');
            }
          }
        } catch (e) {
          console.error("Session check error", e);
        }
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const formattedEmail = email.toLowerCase().trim();

    try {
      // 1. STRICT WHITELIST CHECK
      const whitelistDoc = await getDoc(doc(db, 'whitelisted_employees', formattedEmail));
      
      if (!whitelistDoc.exists()) {
        setError('ACCESS DENIED: Your email is not authorized by the System Administrator.');
        setLoading(false);
        return; // STOP EXECUTION HERE
      }

      // 2. IF AUTHORIZED, PROCEED TO AUTHENTICATE
      if (isFirstTime) {
        // Create new account
        const userCredential = await createUserWithEmailAndPassword(auth, formattedEmail, password);
        // Write their role to the 'users' collection so ProtectedRoute knows who they are
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: formattedEmail,
          role: 'employee',
          createdAt: new Date()
        });
      } else {
        // Login existing account
        await signInWithEmailAndPassword(auth, formattedEmail, password);
      }
      
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
         setError('Invalid password.');
      } else if (err.code === 'auth/email-already-in-use') {
         setError('Account already exists. Please switch to Login.');
      } else {
        setError(`Database Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#0a0b10', color: '#fff', fontFamily: '"Inter", sans-serif' }}>
      <div style={{ padding: '3rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', maxWidth: '400px', width: '100%', background: '#11131a', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Server size={32} color="#38bdf8" />
          </div>
        </div>
        
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontWeight: 700 }}>Team Portal</h2>
        <p style={{ textAlign: 'center', color: '#888', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Restricted access. Employees only.
        </p>
        
        {error && <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>Work Email</label>
            <input 
              type="email" 
              required
              placeholder="name@castflow.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem', background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#a1a1aa', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              maxLength="16"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.8rem 1rem', background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', outline: 'none' }}
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '1rem' }}>
            <Lock size={18} /> {loading ? 'Verifying...' : (isFirstTime ? 'Set up account' : 'Authenticate')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button 
            type="button" 
            onClick={() => setIsFirstTime(!isFirstTime)}
            style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', fontSize: '0.9rem' }}
          >
            {isFirstTime ? "Already set up your account? Login" : "First time logging in? Set password"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamLogin;
