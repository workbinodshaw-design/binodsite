import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Lock, Search, RefreshCw, LogOut } from 'lucide-react';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        fetchLeads();
      } else {
        setIsAuthenticated(false);
      }
      setAuthChecking(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // fetchLeads is called in onAuthStateChanged
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or Firebase Auth is not enabled in the console.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!db) {
        throw new Error("Database connection not established.");
      }
      const leadsRef = collection(db, "leads");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const fetchedLeads = [];
      querySnapshot.forEach((doc) => {
        fetchedLeads.push({ id: doc.id, ...doc.data() });
      });
      
      setLeads(fetchedLeads);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads. Ensure your Firebase Security Rules allow authenticated reads.");
    } finally {
      setLoading(false);
    }
  };

  if (authChecking) {
    return <div className="page-container text-center" style={{ paddingTop: '8rem' }}>Verifying Security Protocol...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', paddingTop: '8rem' }}>
        <div className="glass text-center" style={{ padding: '4rem', borderRadius: '24px', maxWidth: '400px', width: '100%' }}>
          <div style={{ background: 'rgba(163, 136, 255, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
            <Lock size={32} color="#a388ff" />
          </div>
          <h2 style={{ marginBottom: '2rem' }}>Secure Admin Portal</h2>
          {error && <div style={{ color: '#FF6B6B', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
          <form onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder="Admin Email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '1rem' }}
            />
            <input 
              type="password" 
              placeholder="Admin Password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', marginBottom: '1rem' }}
            />
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%' }}>
              {loading ? 'Authenticating...' : 'Secure Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ paddingTop: '8rem' }}>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Lead Dashboard</h1>
          <p className="text-secondary">Manage your inbound inquiries and project requests.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchLeads} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', padding: '0.8rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      <div className="glass" style={{ padding: '2rem', borderRadius: '24px', overflowX: 'auto' }}>
        {error ? (
          <div style={{ color: '#FF6B6B', textAlign: 'center', padding: '2rem' }}>{error}</div>
        ) : loading && leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading your leads...</div>
        ) : leads.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>No leads found. When clients submit the form, they will appear here.</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Source</th>
                <th>Client Details</th>
                <th>Budget</th>
                <th>Project Requirements</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={{ whiteSpace: 'nowrap' }}>
                    {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </td>
                  <td>
                    <span className="badge" style={{ display: 'inline-block', padding: '4px 8px', fontSize: '0.8rem', margin: 0 }}>
                      {lead.service_requested || lead.source || 'General Contact'}
                    </span>
                  </td>
                  <td>
                    <strong>{lead.name}</strong><br/>
                    <a href={`mailto:${lead.email}`} style={{ color: '#a388ff', fontSize: '0.9rem' }}>{lead.email}</a><br/>
                    {lead.phone && <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{lead.phone}</span>}
                  </td>
                  <td style={{ color: '#25D366', fontWeight: 'bold' }}>{lead.budget || 'Not specified'}</td>
                  <td style={{ maxWidth: '300px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>{lead.details}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
