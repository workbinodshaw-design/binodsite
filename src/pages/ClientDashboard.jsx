import React, { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { LogOut, User, FolderClock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';

const ClientDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const user = auth.currentUser;
      if (!user || !user.email) {
        setLoading(false);
        return;
      }

      try {
        const q = query(
          collection(db, 'leads'),
          where('email', '==', user.email)
        );
        
        const querySnapshot = await getDocs(q);
        const projectsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Sort client-side to avoid needing a Firestore composite index
        projectsData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'new':
        return <span className="status-badge new"><AlertCircle size={14} /> Pending Review</span>;
      case 'contacted':
      case 'building':
        return <span className="status-badge progress" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.4rem 1rem', borderRadius: '30px' }}><Clock size={14} /> Building...</span>;
      case 'completed':
        return <span className="status-badge completed" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '0.4rem 1rem', borderRadius: '30px' }}><CheckCircle2 size={14} /> Completed</span>;
      default:
        return <span className="status-badge progress"><Clock size={14} /> Pending</span>;
    }
  };

  return (
    <div className="page-container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <User color="#a388ff" /> Client Portal
          </h1>
          <p className="text-secondary">Welcome back. View your active projects and communications here.</p>
        </div>
        <div>
          <button onClick={handleLogout} className="btn" style={{ background: 'rgba(255,107,107,0.2)', color: '#FF6B6B', padding: '0.8rem 1.5rem', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem' }}>
          <p>Loading your projects...</p>
        </div>
      ) : projects.length > 0 ? (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {projects.map((project) => (
            <div key={project.id} className="glass" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ marginBottom: '0.5rem' }}>{project.service || 'General Project Inquiry'}</h3>
                  <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                    Submitted on: {project.createdAt?.toDate ? project.createdAt.toDate().toLocaleDateString() : 'Unknown Date'}
                  </p>
                </div>
                {getStatusBadge(project.status || 'new')}
              </div>
              
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#a388ff' }}>Project Details</h4>
                <p style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {project.details || 'No details provided.'}
                </p>
                
                {project.projectLink && (
                  <div style={{ marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
                    <p style={{ marginBottom: '1rem', color: '#fff', fontWeight: 'bold' }}>Delivery Ready:</p>
                    <a href={project.projectLink} target="_blank" rel="noreferrer" className="btn" style={{ display: 'inline-block', padding: '1rem 3rem', textDecoration: 'none', background: '#38bdf8', color: '#000', fontWeight: 'bold', borderRadius: '50px' }}>
                      View Final Project
                    </a>
                  </div>
                )}
              </div>
              
              {project.budget && (
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <div>
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Budget</span>
                    <p style={{ fontWeight: '600' }}>{project.budget}</p>
                  </div>
                  <div>
                    <span style={{ color: '#aaa', fontSize: '0.85rem' }}>Source</span>
                    <p style={{ fontWeight: '600', textTransform: 'capitalize' }}>{project.source}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="glass text-center" style={{ padding: '4rem 2rem', borderRadius: '24px', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ background: 'rgba(163, 136, 255, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
            <FolderClock size={40} color="#a388ff" />
          </div>
          <h2 className="h3" style={{ marginBottom: '1rem' }}>No Active Projects Yet</h2>
          <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            Your account has been securely created. Once our team assigns a project to your account, you will be able to track its progress, view invoices, and communicate directly with us from this dashboard.
          </p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/contact'}>
            Request a New Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
