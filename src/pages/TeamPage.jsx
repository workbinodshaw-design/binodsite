import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import { getActiveEmployees } from '../services/employeeService';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const TeamPage = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchTeam = async () => {
      try {
        const teamData = await getActiveEmployees();
        setEmployees(teamData);
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeam();
  }, []);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEO 
        title="Our Team | CastFlow Agency"
        description="Meet the minds behind CastFlow. We are a team of elite professionals building the future."
        url="/team"
      />
      <div className="page-container" style={{ paddingTop: '120px', minHeight: '100vh', background: 'var(--bg-color)' }}>
        <div className="container">
          
          {/* Header Section */}
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
            <h1 className="section-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Meet Our Team</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', lineHeight: '1.6' }}>
              Meet the professionals behind CastFlow who help businesses grow through technology and digital solutions.
            </p>
          </div>

          {/* Search Bar */}
          <div style={{ maxWidth: '600px', margin: '0 auto 60px', position: 'relative' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50px',
              padding: '5px 20px',
              boxShadow: 'var(--glass-shadow)',
              backdropFilter: 'blur(10px)'
            }}>
              <Search size={20} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Search by Name or Employee ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  padding: '15px',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  fontFamily: 'var(--font-family-body, inherit)'
                }}
              />
            </div>
          </div>

          {/* Founder Section */}
          {(!searchQuery || 'binod shaw founder ceo'.includes(searchQuery.toLowerCase())) && (
            <div style={{ marginBottom: '80px' }}>
              <div className="glass-card" style={{ 
                maxWidth: '800px', 
                margin: '0 auto', 
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '40px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, height: '100px',
                  background: 'linear-gradient(135deg, var(--primary-color) 0%, rgba(138,43,226,0.2) 100%)',
                  zIndex: 0
                }}></div>
                
                <div style={{
                  width: '150px', height: '150px',
                  borderRadius: '50%',
                  border: '5px solid white',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  background: '#eee',
                  marginBottom: '20px',
                  zIndex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <img src="/binod-profile.png" alt="Binod Shaw" style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                       onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: '#ccc', display: 'none' }}>BS</span>
                </div>
                
                <div style={{ zIndex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '5px' }}>
                    <h3 style={{ fontSize: '2rem', margin: 0 }}>Binod Shaw</h3>
                    <ShieldCheck size={24} color="#1A73E8" title="Verified Founder" />
                  </div>
                  
                  <span style={{ 
                    display: 'inline-block',
                    background: 'rgba(26, 115, 232, 0.1)',
                    color: '#1A73E8',
                    padding: '5px 15px',
                    borderRadius: '20px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    marginBottom: '20px'
                  }}>
                    Founder & CEO
                  </span>
                  
                  <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                    Visionary leader driving innovation and digital excellence at CastFlow. Dedicated to empowering businesses with cutting-edge technology solutions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Employees Section */}
          <div style={{ marginBottom: '80px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Our Professionals</h2>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '50px' }}>Loading team members...</div>
            ) : filteredEmployees.length > 0 ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
                gap: '30px' 
              }}>
                {filteredEmployees.map(employee => (
                  <div key={employee.id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    
                    <div style={{
                      width: '120px', height: '120px',
                      borderRadius: '50%',
                      background: '#f0f0f0',
                      marginBottom: '20px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '3px solid white',
                      boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
                    }}>
                      {employee.photoUrl ? (
                        <img 
                          src={employee.photoUrl} 
                          alt={employee.name} 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(employee.name)}&background=f0f0f0&color=999`;
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        />
                      ) : (
                        <span style={{ fontSize: '2rem', color: '#999', fontWeight: 'bold' }}>
                          {employee.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '5px' }}>
                      <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{employee.name}</h3>
                      <ShieldCheck size={18} color="#10B981" title="Verified Member" />
                    </div>
                    
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '10px' }}>
                      {employee.designation}
                    </p>

                    {employee.about && (
                      <p style={{ 
                        fontSize: '0.9rem', 
                        color: '#666', 
                        marginBottom: '15px', 
                        display: '-webkit-box', 
                        WebkitLineClamp: 3, 
                        WebkitBoxOrient: 'vertical', 
                        overflow: 'hidden',
                        lineHeight: '1.5'
                      }}>
                        {employee.about}
                      </p>
                    )}
                    
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', width: '100%', justifyContent: 'center' }}>
                      <span className="mono" style={{ 
                        background: '#f5f5f5', 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '0.85rem',
                        color: '#444'
                      }}>
                        {employee.id}
                      </span>
                      <span style={{ 
                        background: 'rgba(16, 185, 129, 0.1)', 
                        color: '#10B981', 
                        padding: '4px 10px', 
                        borderRadius: '6px', 
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}>
                        Active
                      </span>
                    </div>
                    
                    <Link 
                      to={`/team/${employee.id}`} 
                      className="btn" 
                      style={{ 
                        width: '100%', 
                        background: '#111', 
                        color: 'white', 
                        textAlign: 'center',
                        padding: '10px',
                        borderRadius: '8px',
                        textDecoration: 'none'
                      }}
                    >
                      View Profile
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '50px', background: 'var(--glass-bg)', borderRadius: '20px', border: '1px dashed #ccc' }}>
                <p style={{ color: 'var(--text-secondary)' }}>No employees found matching your search.</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default TeamPage;
