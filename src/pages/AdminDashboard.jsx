import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, Shield, Users } from 'lucide-react';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' or 'team'

  useEffect(() => {
    fetchLeads();
  }, []);

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
          <button onClick={fetchLeads} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          <Users size={18} /> Team Access (RBAC)
        </button>
      </div>

      {activeTab === 'team' && (
        <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
          <h2 className="h3">Team Role Management</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem' }}>To add an employee and grant them limited dashboard access:</p>
          <ol style={{ lineHeight: '1.8', color: '#ccc', marginBottom: '2rem' }}>
            <li>Go to your <strong>Firebase Console</strong> &gt; Authentication.</li>
            <li>Click <strong>Add User</strong> and create an email/password for your employee.</li>
            <li>Copy the new user's <strong>UID</strong>.</li>
            <li>Go to <strong>Firestore Database</strong>.</li>
            <li>Create a new collection called <strong>users</strong> (if it doesn't exist).</li>
            <li>Create a new document. Set the Document ID to the employee's exact UID.</li>
            <li>Add a string field: <code>role</code> = <code>employee</code>.</li>
          </ol>
          <div style={{ padding: '1rem', background: 'rgba(46, 204, 113, 0.1)', border: '1px solid #2ecc71', borderRadius: '8px', color: '#2ecc71' }}>
            When that user logs in at <strong>/login</strong>, the system will automatically route them to the restricted Employee Dashboard instead of this Master Admin panel.
          </div>
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
