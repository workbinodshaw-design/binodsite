const fs = require('fs');

let code = fs.readFileSync('src/pages/AdminDashboard.jsx', 'utf8');

// Add states
if (!code.includes('teamApps')) {
    code = code.replace(
        "const [newTeamEmail, setNewTeamEmail] = useState('');",
        "const [newTeamEmail, setNewTeamEmail] = useState('');\n  const [teamApps, setTeamApps] = useState([]);"
    );
}

// Add fetch logic in useEffect
if (!code.split('useEffect(() => {')[1].split('return')[0].includes("activeTab === 'teamApps'")) {
    code = code.replace(
        "if (activeTab === 'team') {\n      fetchUsers();\n      fetchWhitelisted();\n    }",
        "if (activeTab === 'team') {\n      fetchUsers();\n      fetchWhitelisted();\n    }\n    if (activeTab === 'teamApps') {\n      fetchTeamApps();\n    }"
    );
}

// Add fetchTeamApps function
if (!code.includes('const fetchTeamApps')) {
    const fetch_apps = `
  const fetchTeamApps = () => {
    setLoading(true);
    setError(null);
    try {
      const appsRef = collection(db, "team_applications");
      const q = query(appsRef, orderBy("createdAt", "desc"));
      
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedApps = [];
        querySnapshot.forEach((doc) => {
          fetchedApps.push({ id: doc.id, ...doc.data() });
        });
        setTeamApps(fetchedApps);
        setLoading(false);
      }, (err) => {
        console.error("Error in onSnapshot team_applications:", err);
        setError("Failed to load team applications.");
        setLoading(false);
      });
      
      if(window.appsUnsubscribe) window.appsUnsubscribe();
      window.appsUnsubscribe = unsubscribe;
    } catch (err) {
      console.error("Error setting up apps listener:", err);
      setLoading(false);
    }
  };

  const handleUpdateAppStatus = async (appId, newStatus) => {
    try {
      const appRef = doc(db, 'team_applications', appId);
      await updateDoc(appRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
    }
  };
`;
    code = code.replace('const fetchUsers = async () => {', fetch_apps + '\n  const fetchUsers = async () => {');
}

// Add Tab Button
if (!code.includes("activeTab === 'teamApps' ? '#a388ff' : 'transparent'")) {
    const tab_btn = `
        <button 
          onClick={() => setActiveTab('teamApps')}
          style={{ 
            background: activeTab === 'teamApps' ? '#a388ff' : 'transparent', 
            color: activeTab === 'teamApps' ? '#1a1a1a' : '#888', 
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
          <Users size={20} /> Team Applications
        </button>
      </div>`;
    code = code.replace("</button>\n      </div>\n\n      {activeTab === 'team'", "</button>" + tab_btn + "\n\n      {activeTab === 'team'");
}

// Add UI for teamApps
if (!code.includes("activeTab === 'teamApps' && (")) {
    const ui = `
      {activeTab === 'teamApps' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
              <RefreshCw size={40} className="spin" style={{ marginBottom: '1rem' }} />
              <p>Loading applications...</p>
            </div>
          ) : teamApps.length === 0 ? (
            <div className="glass" style={{ textAlign: 'center', padding: '4rem', borderRadius: '24px' }}>
              <Inbox size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff' }}>No Applications Yet</h3>
              <p className="text-secondary">When someone applies to join the team, it will show up here.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {teamApps.map((app) => (
                <div key={app.id} className="glass" style={{ padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem', marginBottom: '1.5rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {app.fullName}
                      </h3>
                      <p style={{ color: '#a388ff', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.5rem' }}>{app.position}</p>
                      <div style={{ display: 'flex', gap: '1.5rem', color: '#888', fontSize: '0.9rem' }}>
                        <span>{app.email}</span>
                        <span>{app.phone}</span>
                        <span>Exp: {app.experience}</span>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end', minWidth: '200px' }}>
                      <select 
                        value={app.status || 'New'} 
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value)}
                        style={{ 
                          padding: '0.6rem 1rem', 
                          borderRadius: '8px', 
                          background: '#fdfdfd', 
                          color: '#1a1a1a', 
                          border: '1px solid rgba(0,0,0,0.1)',
                          cursor: 'pointer',
                          outline: 'none',
                          width: '100%'
                        }}
                      >
                        <option value="New">New Application</option>
                        <option value="Reviewing">Under Review</option>
                        <option value="Interview">Interview Scheduled</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        Applied: {app.createdAt?.toDate ? app.createdAt.toDate().toLocaleDateString() : 'Just now'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                    <div>
                      <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Skills</h4>
                      <p style={{ color: '#fff' }}>{app.skills}</p>
                      
                      {app.portfolio && (
                        <div style={{ marginTop: '1rem' }}>
                          <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Portfolio/Link</h4>
                          <a href={app.portfolio} target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>{app.portfolio}</a>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Resume</h4>
                      {app.resumeUrl ? (
                        <a href={app.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', display: 'inline-block' }}>
                          Download / View Resume
                        </a>
                      ) : (
                        <p style={{ color: '#fff' }}>No resume uploaded.</p>
                      )}
                    </div>
                  </div>

                  <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.5rem' }}>
                    <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>About</h4>
                    <p style={{ color: '#1a1a1a', background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px', margin: '0 0 1rem 0' }}>{app.tellUs}</p>
                    
                    <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Why CastFlow?</h4>
                    <p style={{ color: '#1a1a1a', background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px', margin: '0 0 1rem 0' }}>{app.whyCastFlow}</p>
                    
                    <h4 style={{ color: '#888', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Best Project</h4>
                    <p style={{ color: '#1a1a1a', background: 'rgba(255,255,255,0.8)', padding: '1rem', borderRadius: '8px', margin: 0 }}>{app.bestProject}</p>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}
`;
    code = code.replace("      {activeTab === 'team' && (", ui + "\n      {activeTab === 'team' && (");
}

fs.writeFileSync('src/pages/AdminDashboard.jsx', code);
console.log('AdminDashboard updated successfully.');
