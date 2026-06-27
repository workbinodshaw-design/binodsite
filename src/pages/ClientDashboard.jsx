import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { LogOut, User, FolderClock } from 'lucide-react';

const ClientDashboard = () => {

  const handleLogout = async () => {
    await signOut(auth);
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
    </div>
  );
};

export default ClientDashboard;
