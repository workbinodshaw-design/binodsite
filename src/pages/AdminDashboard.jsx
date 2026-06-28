import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, Shield, Users, Lock, Trash2, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [whitelistedEmails, setWhitelistedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('leads');
  const [newTeamEmail, setNewTeamEmail] = useState('');

  useEffect(() => {
    if (activeTab === 'leads') {
      fetchLeads();
      fetchWhitelisted();
    }
    if (activeTab === 'team') {
      fetchUsers();
      fetchWhitelisted();
    }
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
    } finally {
      setLoading(false);
    }
  };

  const fetchWhitelisted = async () => {
    try {
      const whitelistRef = collection(db, "whitelisted_employees");
      const querySnapshot = await getDocs(whitelistRef);
      const emails = [];
      querySnapshot.forEach((doc) => {
        emails.push({ id: doc.id, ...doc.data() });
      });
      setWhitelistedEmails(emails);
    } catch (err) {
      console.error("Error fetching whitelist:", err);
    }
  };

  const handleWhitelistEmail = async (e) => {
    e.preventDefault();
    if (!newTeamEmail) return;
    
    const formattedEmail = newTeamEmail.toLowerCase().trim();
    try {
      await setDoc(doc(db, 'whitelisted_employees', formattedEmail), {
        email: formattedEmail,
        role: 'employee',
        addedAt: new Date(),
        addedBy: 'Admin'
      });
      setNewTeamEmail('');
      fetchWhitelisted();
    } catch (error) {
      console.error("Error adding to whitelist:", error);
      alert("Failed to authorize email.");
    }
  };

  const handleRemoveWhitelist = async (emailId) => {
    try {
      await deleteDoc(doc(db, 'whitelisted_employees', emailId));
      fetchWhitelisted();
    } catch (error) {
      console.error("Error removing from whitelist:", error);
      alert("Failed to revoke access.");
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { role: newRole });
      
      setSystemUsers(systemUsers.map(u => u.id === userId ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update user role.");
    }
  };

  const handleUpdateLeadStatus = async (leadId, newStatus) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { status: newStatus });
      setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleUpdateLeadLink = async (leadId, newLink) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { projectLink: newLink });
      setLeads(leads.map(l => l.id === leadId ? { ...l, projectLink: newLink } : l));
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Failed to attach link.");
    }
  };

  const handleAssignLead = async (leadId, employeeEmail) => {
    try {
      const leadRef = doc(db, 'leads', leadId);
      await updateDoc(leadRef, { assignedTo: employeeEmail });
      setLeads(leads.map(l => l.id === leadId ? { ...l, assignedTo: employeeEmail } : l));
    } catch (error) {
      console.error("Error assigning lead:", error);
      alert("Failed to assign lead.");
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
          style={{ 
            background: activeTab === 'leads' ? '#a388ff' : 'rgba(0,0,0,0.05)', 
            color: activeTab === 'leads' ? '#fff' : '#333', 
            border: 'none', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '30px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
          }}
        >
          All Leads Database
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          style={{ 
            background: activeTab === 'team' ? '#a388ff' : 'rgba(0,0,0,0.05)', 
            color: activeTab === 'team' ? '#fff' : '#333', 
            border: 'none', 
            padding: '0.8rem 1.5rem', 
            borderRadius: '30px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            display: 'flex', 
            gap: '8px', 
            alignItems: 'center',
            transition: 'all 0.3s ease'
          }}
        >
          <Lock size={18} /> Access & Team Management
        </button>
      </div>

      {activeTab === 'team' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          {/* WHITELIST MANAGEMENT */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
            <h2 className="h3" style={{ margin: '0 0 0.5rem 0', color: '#38bdf8' }}>Team Whitelist (Strict Access Control)</h2>
            <p className="text-secondary" style={{ margin: '0 0 2rem 0' }}>Only emails listed here can access the Team Portal.</p>
            
            <form onSubmit={handleWhitelistEmail} style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <input 
                type="email" 
                required 
                placeholder="employee@castflow.in"
                value={newTeamEmail}
                onChange={(e) => setNewTeamEmail(e.target.value)}
                style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '0 2rem', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} /> Authorize Email
              </button>
            </form>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '1rem' }}>
              {whitelistedEmails.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center', margin: 0, padding: '1rem' }}>No team members authorized yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {whitelistedEmails.map(item => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontWeight: 'bold' }}>{item.email}</span>
                      <button onClick={() => handleRemoveWhitelist(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Trash2 size={16} /> Revoke Access
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* GENERAL USERS MANAGEMENT */}
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', overflowX: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <div>
                <h2 className="h3" style={{ margin: 0 }}>Registered Users Database</h2>
                <p className="text-secondary" style={{ margin: 0 }}>View all registered accounts and force role updates if necessary.</p>
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
                    <th>Force Access Role</th>
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
                  <th>Assigned To</th>
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
                      <select 
                        value={lead.assignedTo || ''} 
                        onChange={(e) => handleAssignLead(lead.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem', 
                          borderRadius: '8px', 
                          background: 'rgba(0,0,0,0.5)', 
                          color: lead.assignedTo ? '#38bdf8' : '#888', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="">Unassigned</option>
                        {whitelistedEmails.map(emp => (
                          <option key={emp.id} value={emp.email}>{emp.email}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select 
                        value={lead.status || 'new'} 
                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                        style={{ 
                          padding: '0.4rem', 
                          borderRadius: '8px', 
                          background: 'rgba(0,0,0,0.5)', 
                          color: lead.status === 'completed' ? '#2ecc71' : (lead.status === 'building' ? '#38bdf8' : '#a388ff'), 
                          border: '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer'
                        }}
                      >
                        <option value="new">Pending Review</option>
                        <option value="contacted">Contacted</option>
                        <option value="building">Building / Working</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                    <td style={{ color: '#25D366', fontWeight: 'bold' }}>{lead.budget || 'N/A'}</td>
                    <td style={{ maxWidth: '250px' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4', color: '#ccc' }}>{lead.details}</p>
                      <div style={{ marginTop: '0.8rem' }}>
                        <input 
                          type="text" 
                          placeholder="Attach Live URL (e.g. https://site.com)" 
                          defaultValue={lead.projectLink || ''}
                          onBlur={(e) => {
                            let link = e.target.value.trim();
                            if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
                              link = 'https://' + link;
                              e.target.value = link;
                            }
                            if (link !== (lead.projectLink || '')) {
                              handleUpdateLeadLink(lead.id, link);
                            }
                          }}
                          style={{ width: '100%', padding: '0.5rem', background: '#000', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '4px', fontSize: '0.8rem' }}
                        />
                      </div>
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
