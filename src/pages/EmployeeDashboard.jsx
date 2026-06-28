import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { db, auth } from '../firebase';
import { RefreshCw, LogOut, CheckCircle2, Clock, AlertCircle, Briefcase, Activity } from 'lucide-react';

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
        fetchTasks(user.email);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchTasks = async (email) => {
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      const q = query(
        collection(db, "leads"),
        where("assignedTo", "==", email)
      );
      const querySnapshot = await getDocs(q);
      
      const fetchedTasks = [];
      querySnapshot.forEach((document) => {
        fetchedTasks.push({ id: document.id, ...document.data() });
      });
      
      // Sort client-side
      fetchedTasks.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });

      setTasks(fetchedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      setError("Failed to load your tasks.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      const taskRef = doc(db, 'leads', taskId);
      await updateDoc(taskRef, { status: newStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };

  const handleUpdateProgress = async (taskId, newProgress) => {
    try {
      const taskRef = doc(db, 'leads', taskId);
      
      let newStatus = undefined;
      if (newProgress === 100) newStatus = 'completed';
      else if (newProgress > 0 && newProgress < 100) newStatus = 'building';
      else if (newProgress === 0) newStatus = 'new';
      
      const updateData = { 
        progress: newProgress,
        progressUpdatedAt: new Date()
      };
      if (newStatus) updateData.status = newStatus;

      await updateDoc(taskRef, updateData);
      setTasks(tasks.map(t => t.id === taskId ? { ...t, ...updateData } : t));
    } catch (error) {
      console.error("Error updating progress:", error);
      alert("Failed to update progress.");
    }
  };

  const handleUpdateLink = async (taskId, newLink) => {
    try {
      const taskRef = doc(db, 'leads', taskId);
      await updateDoc(taskRef, { projectLink: newLink });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, projectLink: newLink } : t));
    } catch (error) {
      console.error("Error updating link:", error);
      alert("Failed to attach link.");
    }
  };

  const progressPhases = [
    { value: 0, label: 'Reqs' },
    { value: 25, label: 'Design' },
    { value: 50, label: 'Core Build' },
    { value: 75, label: 'QA / Testing' },
    { value: 100, label: 'Delivery' }
  ];

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Briefcase color="#a388ff" /> Task Workspace
          </h1>
          <p className="text-secondary">Welcome back, {userEmail || 'Team Member'}. Here are your assigned projects.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => fetchTasks(userEmail)} className="btn btn-secondary" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} className={loading ? 'spin' : ''} /> Refresh
          </button>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', padding: '0.8rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {error && <div style={{ color: '#FF6B6B', padding: '1rem', background: 'rgba(255,107,107,0.1)', borderRadius: '8px', marginBottom: '2rem' }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#aaa' }}>
          <p>Loading your assigned tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="glass text-center" style={{ padding: '4rem 2rem', borderRadius: '24px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(163, 136, 255, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
            <CheckCircle2 size={40} color="#a388ff" />
          </div>
          <h2 className="h3" style={{ marginBottom: '1rem' }}>Inbox Zero!</h2>
          <p className="text-secondary" style={{ lineHeight: '1.6' }}>
            You currently have no active tasks assigned to you. Enjoy the downtime or check with the admin for new assignments.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '2rem' }}>
          {tasks.map((task) => {
            const currentProgress = task.progress || 0;
            return (
              <div key={task.id} className="glass" style={{ padding: '2.5rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', gap: '1.5rem', border: task.status === 'completed' ? '1px solid rgba(46, 204, 113, 0.2)' : '1px solid rgba(255,255,255,0.1)' }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.8rem' }}>{task.service_requested || task.source || 'General Project'}</h3>
                      <span className="badge" style={{ background: 'rgba(163, 136, 255, 0.2)', color: '#a388ff' }}>{task.budget || 'Custom Budget'}</span>
                    </div>
                    <p className="text-secondary">Assigned on: {task.createdAt?.toDate ? task.createdAt.toDate().toLocaleDateString() : 'Unknown'}</p>
                  </div>
                  
                  {/* Status Override (Optional fallback) */}
                  <div style={{ background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ fontSize: '0.9rem', color: '#aaa', fontWeight: 'bold' }}>Status Override:</span>
                    <select 
                      value={task.status || 'new'} 
                      onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                      style={{ 
                        padding: '0.6rem 1rem', 
                        borderRadius: '8px', 
                        background: 'rgba(255,255,255,0.1)', 
                        color: task.status === 'completed' ? '#2ecc71' : (task.status === 'building' ? '#38bdf8' : '#fff'), 
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                      }}
                    >
                      <option value="new">Pending Review</option>
                      <option value="contacted">Client Contacted</option>
                      <option value="building">Building / Working</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>

                {/* Progress Tracker (Pizza Tracker UI) */}
                <div style={{ background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <h4 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                    <Activity size={20} /> Development Phase Tracker
                  </h4>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem', position: 'relative' }}>
                    {/* Background track line */}
                    <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '4px', background: 'rgba(255,255,255,0.1)', zIndex: 0, borderRadius: '4px' }}></div>
                    
                    {/* Active track line */}
                    <div style={{ position: 'absolute', top: '24px', left: '10%', width: `${currentProgress * 0.8}%`, height: '4px', background: '#38bdf8', zIndex: 0, borderRadius: '4px', transition: 'width 0.5s ease-in-out', boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)' }}></div>

                    {progressPhases.map((phase) => {
                      const isCompleted = currentProgress >= phase.value;
                      const isCurrent = currentProgress === phase.value;
                      
                      return (
                        <div 
                          key={phase.value} 
                          onClick={() => handleUpdateProgress(task.id, phase.value)}
                          style={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            gap: '0.8rem', 
                            zIndex: 1, 
                            cursor: 'pointer',
                            flex: 1
                          }}
                        >
                          <div style={{ 
                            width: '48px', 
                            height: '48px', 
                            borderRadius: '50%', 
                            background: isCompleted ? '#38bdf8' : '#222', 
                            border: isCurrent ? '4px solid #fff' : (isCompleted ? '4px solid #38bdf8' : '4px solid #444'),
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: isCompleted ? '#000' : '#888',
                            fontWeight: 'bold',
                            transition: 'all 0.3s ease',
                            boxShadow: isCompleted ? '0 0 15px rgba(56, 189, 248, 0.4)' : 'none'
                          }}>
                            {isCompleted ? <CheckCircle2 size={24} /> : phase.value + '%'}
                          </div>
                          <span style={{ 
                            fontSize: '0.85rem', 
                            fontWeight: isCurrent ? 'bold' : 'normal',
                            color: isCompleted ? '#fff' : '#888',
                            textAlign: 'center'
                          }}>
                            {phase.label}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                  <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.85rem', color: '#aaa' }}>
                    Click a phase above to instantly update the Client Dashboard. 100% automatically marks the project as completed.
                  </p>
                </div>

                {/* Client Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '16px' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Name</span>
                    <p style={{ margin: '0.2rem 0 0 0', fontWeight: 'bold', fontSize: '1.1rem' }}>{task.name}</p>
                  </div>
                  {task.company && (
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Company</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: '#ccc' }}>{task.company}</p>
                    </div>
                  )}
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Client Email</span>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#a388ff' }}>{task.email}</p>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>WhatsApp</span>
                    <p style={{ margin: '0.2rem 0 0 0', color: '#25D366', fontWeight: 'bold' }}>{task.whatsapp || task.phone || 'Not provided'}</p>
                  </div>
                  {task.phone && task.whatsapp && (
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Alt Phone</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: '#ccc' }}>{task.phone}</p>
                    </div>
                  )}
                  {task.address && (
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Location</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: '#ccc' }}>{task.address}</p>
                    </div>
                  )}
                  {task.deadline && (
                    <div>
                      <span style={{ fontSize: '0.8rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Deadline</span>
                      <p style={{ margin: '0.2rem 0 0 0', color: '#ef4444', fontWeight: 'bold' }}>{task.deadline}</p>
                    </div>
                  )}
                </div>

                {/* Project Requirements */}
                <div>
                  <h4 style={{ marginBottom: '0.8rem', color: '#ccc' }}>Project Requirements</h4>
                  <p style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: '12px', lineHeight: '1.6', color: '#eee', whiteSpace: 'pre-wrap' }}>
                    {task.details}
                  </p>
                </div>

                {/* Delivery Section */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', marginTop: '0.5rem' }}>
                  <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 color={task.projectLink ? '#2ecc71' : '#888'} size={20} /> 
                    Deliverable Link
                  </h4>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      placeholder="Attach Final Live URL (e.g. https://site.com) to deliver to client" 
                      defaultValue={task.projectLink || ''}
                      onBlur={(e) => {
                        let link = e.target.value.trim();
                        if (link && !link.startsWith('http://') && !link.startsWith('https://')) {
                          link = 'https://' + link;
                          e.target.value = link;
                        }
                        if (link !== (task.projectLink || '')) {
                          handleUpdateLink(task.id, link);
                        }
                      }}
                      style={{ flex: 1, padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.5)', color: '#fff', border: task.projectLink ? '1px solid rgba(46, 204, 113, 0.5)' : '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', fontSize: '1rem', outline: 'none', transition: 'border 0.3s ease' }}
                    />
                    {task.projectLink && (
                      <span style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '0.9rem' }}>Attached ✓</span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;
