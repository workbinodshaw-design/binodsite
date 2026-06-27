import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, Shield, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('leads');

  useEffect(() => {
    if (activeTab === 'leads') fetchLeads();
    if (activeTab === 'team') fetchUsers();
  }, [activeTab]);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
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
      setError("Failed to load leads. Check Firestore permissions.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const fetchedUsers = [];
      querySnapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() });
      });
      
      setSystemUsers(fetchedUsers);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Check Firestore permissions.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      // Update local state to reflect change immediately
      setSystemUsers(systemUsers.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield color="#a388ff" /> Master Admin
          </h1>
          <p className="text-secondary">Full control over agency operations, leads, and team access.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => activeTab === 'leads' ? fetchLeads() : fetchUsers()} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', padding: '0.8rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('leads')}
          style={{ background: activeTab === 'leads' ? '#fff' : 'rgba(255,255,255,0.1)', color: activeTab === 'leads' ? '#000' : '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          All Leads Database
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          style={{ background: activeTab === 'team' ? '#fff' : 'rgba(255,255,255,0.1)', color: activeTab === 'team' ? '#000' : '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', gap: '8px', alignItems: 'center' }}
        >
          <Users size={18} /> User Management
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="glass" style={{ padding: '2rem', borderRadius: '24px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h2 className="h3" style={{ margin: 0 }}>Registered Users</h2>
              <p className="text-secondary" style={{ margin: 0 }}>Manage access roles for your clients and employees.</p>
            </div>
          </div>

          {error ? (
            <div style={{ color: '#FF6B6B', textAlign: 'center', padding: '2rem' }}>{error}</div>
          ) : loading && systemUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading users...</div>
          ) : systemUsers.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>No registered users found.</div>
          ) : (
            <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem 0' }}>Join Date</th>
                  <th>Email</th>
                  <th>User ID</th>
                  <th>Access Role</th>
                </tr>
              </thead>
              <tbody>
                {systemUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0', whiteSpace: 'nowrap', color: '#aaa' }}>
                      {user.createdAt?.toDate ? user.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td>
                      <strong>{user.email}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#666', fontFamily: 'monospace' }}>{user.id}</span>
                    </td>
                    <td>
                      <select 
                        value={user.role || 'client'} 
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem 0.8rem', 
                          borderRadius: '8px', 
                          background: 'rgba(0,0,0,0.5)', 
                          color: '#fff', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="client">Client (Restricted)</option>
                        <option value="employee">Employee (Staff Panel)</option>
                        <option value="admin">Admin (Master Panel)</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {activeTab === 'leads' && (
        <div className="glass" style={{ padding: '2rem', borderRadius: '24px', overflowX: 'auto' }}>
          {error ? (
            <div style={{ color: '#FF6B6B', textAlign: 'center', padding: '2rem' }}>{error}</div>
          ) : loading && leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading your leads...</div>
          ) : leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>No leads found in the database.</div>
          ) : (
            <table className="admin-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem 0' }}>Date</th>
                  <th>Source</th>
                  <th>Client Info</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Project Request</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0', whiteSpace: 'nowrap', color: '#aaa' }}>
                      {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td>
                      <span className="badge">
                        {lead.service_requested || lead.source || 'General Contact'}
                      </span>
                    </td>
                    <td>
                      <strong>{lead.name}</strong><br/>
                      <span style={{ color: '#a388ff', fontSize: '0.9rem' }}>{lead.email}</span><br/>
                      {lead.phone && <span style={{ color: '#aaa', fontSize: '0.85rem' }}>{lead.phone}</span>}
                    </td>
                    <td>
                      <span className="badge" style={{ 
                        background: lead.status === 'contacted' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(163, 136, 255, 0.2)',
                        color: lead.status === 'contacted' ? '#2ecc71' : '#a388ff'
                      }}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td style={{ color: '#25D366', fontWeight: 'bold' }}>{lead.budget || 'N/A'}</td>
                    <td style={{ maxWidth: '250px' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: '#ccc' }}>{lead.details}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
