import React, { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query, doc, updateDoc, setDoc, deleteDoc, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, Shield, Users, Lock, Trash2, Plus, Briefcase, Activity, CheckCircle2, Inbox, Zap, Archive } from 'lucide-react';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [systemUsers, setSystemUsers] = useState([]);
  const [whitelistedEmails, setWhitelistedEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('leads');
  const [pipelineStage, setPipelineStage] = useState('inbox');
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
      
      try {
        // Check if user already exists as a client and upgrade them automatically
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", formattedEmail));
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach(async (userDoc) => {
          if (userDoc.data().role !== 'admin') {
            await updateDoc(doc(db, "users", userDoc.id), { role: 'employee' });
          }
        });
      } catch (upgradeError) {
        console.warn("Could not auto-upgrade existing user (likely due to Firestore permissions).", upgradeError);
      }

      setNewTeamEmail('');
      fetchWhitelisted();
      fetchUsers(); // Refresh users table to show updated role
    } catch (error) {
      console.error("Error adding to whitelist:", error);
      alert("Failed to authorize email. Error: " + error.message);
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
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
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

      {/* Modern Tabs */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '16px', display: 'inline-flex' }}>
        <button 
          onClick={() => setActiveTab('leads')}
          style={{ 
            background: activeTab === 'leads' ? '#a388ff' : 'transparent', 
            color: activeTab === 'leads' ? '#fff' : '#888', 
            border: 'none', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
          }}
        >
          <Briefcase size={20} /> All Leads Database
        </button>
        <button 
          onClick={() => setActiveTab('team')}
          style={{ 
            background: activeTab === 'team' ? '#a388ff' : 'transparent', 
            color: activeTab === 'team' ? '#fff' : '#888', 
            border: 'none', 
            padding: '1rem 2rem', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontWeight: 'bold', 
            display: 'flex', 
            gap: '8px', 
            alignItems: 'center',
            transition: 'all 0.3s ease',
            fontSize: '1rem'
          }}
        >
          <Lock size={20} /> Access & Team Management
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
                style={{ flex: 1, padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', outline: 'none' }}
              />
              <button type="submit" style={{ padding: '0 2rem', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus size={18} /> Authorize Email
              </button>
            </form>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '16px', padding: '1rem' }}>
              {whitelistedEmails.length === 0 ? (
                <p style={{ color: '#888', textAlign: 'center', margin: 0, padding: '1rem' }}>No team members authorized yet.</p>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {whitelistedEmails.map(item => (
                    <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ fontWeight: 'bold' }}>{item.email}</span>
                      <button onClick={() => handleRemoveWhitelist(item.id)} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                            padding: '0.6rem 1rem', 
                            borderRadius: '8px', 
                            background: 'rgba(0,0,0,0.5)', 
                            color: '#fff', 
                            border: '1px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            outline: 'none'
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
        <div>
          {/* Pipeline Sub-Navigation */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <button 
              onClick={() => setPipelineStage('inbox')}
              style={{ 
                background: 'transparent',
                color: pipelineStage === 'inbox' ? '#38bdf8' : '#888',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: pipelineStage === 'inbox' ? '2px solid #38bdf8' : '2px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1.1rem'
              }}
            >
              <Inbox size={20} /> Inbox (New)
            </button>
            <button 
              onClick={() => setPipelineStage('active')}
              style={{ 
                background: 'transparent',
                color: pipelineStage === 'active' ? '#a388ff' : '#888',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: pipelineStage === 'active' ? '2px solid #a388ff' : '2px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1.1rem'
              }}
            >
              <Zap size={20} /> Active Projects
            </button>
            <button 
              onClick={() => setPipelineStage('completed')}
              style={{ 
                background: 'transparent',
                color: pipelineStage === 'completed' ? '#2ecc71' : '#888',
                border: 'none',
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                borderBottom: pipelineStage === 'completed' ? '2px solid #2ecc71' : '2px solid transparent',
                transition: 'all 0.3s ease',
                fontSize: '1.1rem'
              }}
            >
              <Archive size={20} /> Completed & Delivered
            </button>
          </div>

          {error && <div style={{ color: '#FF6B6B', padding: '1rem', background: 'rgba(255,107,107,0.1)', borderRadius: '8px', marginBottom: '2rem' }}>{error}</div>}

          {loading && leads.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading your leads...</div>
          ) : leads.filter(lead => {
              if (pipelineStage === 'inbox') return (lead.status || 'new') === 'new';
              if (pipelineStage === 'active') return lead.status === 'contacted' || lead.status === 'building';
              if (pipelineStage === 'completed') return lead.status === 'completed';
              return true;
            }).length === 0 ? (
            <div className="glass text-center" style={{ padding: '4rem 2rem', borderRadius: '24px', maxWidth: '600px', margin: '0 auto' }}>
              <h2 className="h3" style={{ marginBottom: '1rem' }}>No Projects Here</h2>
              <p className="text-secondary">
                {pipelineStage === 'inbox' && "You don't have any pending new leads to review."}
                {pipelineStage === 'active' && "No projects are currently being built."}
                {pipelineStage === 'completed' && "You haven't completed any projects yet."}
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '2rem' }}>
              {leads.filter(lead => {
                if (pipelineStage === 'inbox') return (lead.status || 'new') === 'new';
                if (pipelineStage === 'active') return lead.status === 'contacted' || lead.status === 'building';
                if (pipelineStage === 'completed') return lead.status === 'completed';
                return true;
              }).map((lead) => (
                <div key={lead.id} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                  
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.8rem' }}>{lead.service_requested || lead.source || 'General Project'}</h3>
                        <span className="badge" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', fontWeight: 'bold' }}>{lead.budget || 'Custom Budget'}</span>
                      </div>
                      <p className="text-secondary">Received on: {lead.createdAt?.toDate ? lead.createdAt.toDate().toLocaleDateString() : 'Unknown Date'}</p>
                    </div>
                    {pipelineStage === 'inbox' && (
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button 
                          onClick={() => handleUpdateLeadStatus(lead.id, 'rejected')}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          <Trash2 size={18} /> Reject
                        </button>
                        <button 
                          onClick={() => handleUpdateLeadStatus(lead.id, 'contacted')}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.8rem 1.5rem', background: '#38bdf8', color: '#000', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold' }}
                        >
                          <CheckCircle2 size={18} /> Accept Project
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Top Level Grid: Client Info + Control Panel */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    
                    {/* Client Info */}
                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                      <h4 style={{ marginBottom: '1rem', color: '#a388ff', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Information</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#888' }}>Name</span>
                          <span style={{ fontWeight: 'bold' }}>{lead.name}</span>
                        </div>
                        {lead.company && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Company</span>
                            <span>{lead.company}</span>
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#888' }}>Email</span>
                          <span style={{ color: '#fff' }}>{lead.email}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ color: '#888' }}>WhatsApp</span>
                          <span style={{ color: '#25D366' }}>{lead.whatsapp || lead.phone || 'N/A'}</span>
                        </div>
                        {lead.phone && lead.whatsapp && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Alt Phone</span>
                            <span>{lead.phone}</span>
                          </div>
                        )}
                        {lead.address && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Location</span>
                            <span>{lead.address}</span>
                          </div>
                        )}
                        {lead.deadline && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Deadline</span>
                            <span style={{ color: '#ef4444' }}>{lead.deadline}</span>
                          </div>
                        )}
                        {lead.source && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#888' }}>Source</span>
                            <span style={{ fontStyle: 'italic' }}>{lead.source}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Admin Control Panel */}
                    <div style={{ background: 'rgba(56, 189, 248, 0.05)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(56, 189, 248, 0.1)' }}>
                      <h4 style={{ marginBottom: '1rem', color: '#38bdf8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Activity size={16} /> Admin Controls
                      </h4>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Assignment */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Assign To:</span>
                          <select 
                            value={lead.assignedTo || ''} 
                            onChange={(e) => handleAssignLead(lead.id, e.target.value)}
                            style={{ 
                              padding: '0.6rem 1rem', 
                              borderRadius: '8px', 
                              background: 'rgba(0,0,0,0.5)', 
                              color: lead.assignedTo ? '#38bdf8' : '#888', 
                              border: '1px solid rgba(255,255,255,0.2)',
                              cursor: 'pointer',
                              outline: 'none',
                              minWidth: '200px'
                            }}
                          >
                            <option value="">Unassigned</option>
                            {whitelistedEmails.map(emp => (
                              <option key={emp.id} value={emp.email}>{emp.email}</option>
                            ))}
                          </select>
                        </div>

                        {/* Progress */}
                        {lead.assignedTo && (
                          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                              <span style={{ fontSize: '0.85rem', color: '#aaa' }}>Employee Progress</span>
                              <span style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '0.85rem' }}>{lead.progress || 0}%</span>
                            </div>
                            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden', marginBottom: '8px' }}>
                              <div style={{ width: `${lead.progress || 0}%`, height: '100%', background: '#38bdf8', transition: 'width 0.5s ease' }}></div>
                            </div>
                            {lead.progressUpdatedAt && (
                              <div style={{ color: '#888', fontSize: '0.75rem', textAlign: 'right' }}>
                                Last Updated: {lead.progressUpdatedAt?.toDate ? lead.progressUpdatedAt.toDate().toLocaleString() : 'recently'}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Status Override */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: lead.assignedTo ? '0' : '1rem' }}>
                          <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Project Status:</span>
                          <select 
                            value={lead.status || 'new'} 
                            onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                            style={{ 
                              padding: '0.6rem 1rem', 
                              borderRadius: '8px', 
                              background: 'rgba(0,0,0,0.5)', 
                              color: lead.status === 'completed' ? '#2ecc71' : (lead.status === 'building' ? '#38bdf8' : '#a388ff'), 
                              border: '1px solid rgba(255,255,255,0.2)',
                              cursor: 'pointer',
                              outline: 'none'
                            }}
                          >
                            <option value="new">Pending Review</option>
                            <option value="contacted">Client Contacted</option>
                            <option value="building">Building / Working</option>
                            <option value="completed">Completed</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Requirements */}
                  <div>
                    <h4 style={{ marginBottom: '0.8rem', color: '#ccc' }}>Project Requirements & Notes</h4>
                    <p style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', lineHeight: '1.6', color: '#eee', whiteSpace: 'pre-wrap', margin: 0 }}>
                      {lead.details}
                    </p>
                  </div>

                  {/* Delivery Link Overrride */}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <span style={{ color: '#aaa', whiteSpace: 'nowrap' }}>Delivery URL:</span>
                      <input 
                        type="text" 
                        placeholder="Attach Final Live URL (e.g. https://site.com) to deliver to client" 
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
                        style={{ flex: 1, padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.5)', color: '#fff', border: lead.projectLink ? '1px solid rgba(46, 204, 113, 0.5)' : '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border 0.3s ease' }}
                      />
                      {lead.projectLink && (
                        <span style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '0.9rem' }}><CheckCircle2 size={20} /></span>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
