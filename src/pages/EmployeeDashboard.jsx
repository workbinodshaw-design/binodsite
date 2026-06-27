import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, CheckCircle } from 'lucide-react';

const EmployeeDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const leadsRef = collection(db, "leads");
      const q = query(leadsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const fetchedLeads = [];
      querySnapshot.forEach((document) => {
        fetchedLeads.push({ id: document.id, ...document.data() });
      });
      
      setLeads(fetchedLeads);
    } catch (err) {
      console.error("Error fetching leads:", err);
      setError("Failed to load leads.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const markAsContacted = async (leadId) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, {
        status: 'contacted',
        updatedAt: new Date()
      });
      fetchLeads();
    } catch (error) {
      console.error("Error updating lead:", error);
      alert("Failed to update lead status.");
    }
  };

  return (
    <div className="page-container" style={{ padding: '6rem 2rem 2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="h2" style={{ margin: 0 }}>Employee Dashboard</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchLeads} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', padding: '0.8rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {error && <div style={{ color: '#FF6B6B', padding: '1rem', background: 'rgba(255,107,107,0.1)', borderRadius: '8px', marginBottom: '2rem' }}>{error}</div>}

      <div className="glass" style={{ padding: '2rem', borderRadius: '24px' }}>
        <h2 className="h4" style={{ marginBottom: '1.5rem' }}>Active Leads</h2>
        
        {loading ? (
          <p>Loading leads...</p>
        ) : leads.length === 0 ? (
          <p style={{ color: '#aaa' }}>No leads found.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '1rem 0' }}>Date</th>
                  <th>Name</th>
                  <th>Email / Phone</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1rem 0', color: '#aaa' }}>
                      {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Just now'}
                    </td>
                    <td style={{ fontWeight: '500' }}>{lead.name}</td>
                    <td>
                      <div>{lead.email}</div>
                      <div style={{ fontSize: '0.85rem', color: '#aaa' }}>{lead.phone}</div>
                    </td>
                    <td><span className="badge">{lead.source}</span></td>
                    <td>
                      <span className="badge" style={{ 
                        background: lead.status === 'contacted' ? 'rgba(46, 204, 113, 0.2)' : 'rgba(163, 136, 255, 0.2)',
                        color: lead.status === 'contacted' ? '#2ecc71' : '#a388ff'
                      }}>
                        {lead.status || 'new'}
                      </span>
                    </td>
                    <td>
                      {lead.status !== 'contacted' && (
                        <button 
                          onClick={() => markAsContacted(lead.id)}
                          style={{ background: 'transparent', border: '1px solid #2ecc71', color: '#2ecc71', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <CheckCircle size={14} /> Contacted
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
