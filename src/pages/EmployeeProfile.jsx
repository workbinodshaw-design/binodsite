import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { getEmployeeById } from '../services/employeeService';
import { ArrowLeft, ShieldCheck, ShieldAlert, Mail, Phone, Calendar, Briefcase, User } from 'lucide-react';

const EmployeeProfile = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getEmployeeById(id);
        if (data) {
          setEmployee(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [id]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>Loading Profile...</p>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <ShieldAlert size={64} color="#EF4444" style={{ marginBottom: '20px' }} />
        <h1 className="section-title" style={{ marginBottom: '10px' }}>Profile Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>This employee ID does not exist in our system.</p>
        <Link to="/team" className="btn">Return to Team Directory</Link>
      </div>
    );
  }

  if (employee.status !== 'active') {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}>
        <ShieldAlert size={64} color="#F59E0B" style={{ marginBottom: '20px' }} />
        <h1 className="section-title" style={{ marginBottom: '10px' }}>Inactive Profile</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.2rem', textAlign: 'center', maxWidth: '400px' }}>
          This member is no longer associated with CastFlow.
        </p>
        <Link to="/team" className="btn">Return to Team Directory</Link>
      </div>
    );
  }

  const profileUrl = window.location.href; // e.g. https://castflow.in/team/CF-0001
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="page-container" style={{ paddingTop: '100px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        <Link to="/team" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', textDecoration: 'none', marginBottom: '30px', fontWeight: '500' }}>
          <ArrowLeft size={18} /> Back to Team
        </Link>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
          
          {/* Cover Photo Area */}
          <div style={{ height: '150px', background: 'linear-gradient(90deg, #1A73E8 0%, #8a2be2 100%)', position: 'relative' }}>
            {/* Status Badge */}
            <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.9)', padding: '5px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: 'bold', color: '#10B981', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
              <ShieldCheck size={16} /> Verified Active
            </div>
          </div>

          <div style={{ padding: '0 40px 40px 40px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
            
            {/* Profile Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', alignItems: 'flex-end', marginTop: '-60px', marginBottom: '40px' }}>
              <div style={{
                width: '150px', height: '150px',
                borderRadius: '20px',
                background: '#fff',
                padding: '5px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}>
                <div style={{
                  width: '100%', height: '100%',
                  borderRadius: '15px',
                  background: '#f0f0f0',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {employee.photoUrl ? (
                    <img src={employee.photoUrl} alt={employee.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <User size={60} color="#ccc" />
                  )}
                </div>
              </div>

              <div style={{ flex: 1, paddingBottom: '10px' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '5px', fontFamily: 'Syne, sans-serif' }}>{employee.name}</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--primary-color)', fontWeight: '600', marginBottom: '10px' }}>{employee.designation}</p>
                <div style={{ display: 'inline-block', background: '#f5f5f5', padding: '5px 15px', borderRadius: '8px', color: '#444', border: '1px solid #e0e0e0' }}>
                  <span className="mono" style={{ fontWeight: 'bold' }}>{employee.id}</span>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
              
              {/* Left Column: Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <User size={20} color="var(--primary-color)" /> About
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                    {employee.about || `${employee.name} is a valued member of the CastFlow team, working as a ${employee.designation}.`}
                  </p>
                </div>

                {employee.skills && employee.skills.length > 0 && (
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Briefcase size={20} color="var(--primary-color)" /> Expertise
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {employee.skills.map((skill, i) => (
                        <span key={i} style={{ background: 'rgba(138,43,226,0.1)', color: 'var(--primary-color)', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '500' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column: Contact & QR */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ background: '#f9f9f9', borderRadius: '15px', padding: '25px', border: '1px solid #eee' }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>Contact Information</h3>
                  
                  {employee.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <Mail size={18} color="#555" />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>Official Email</p>
                        <a href={`mailto:${employee.email}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>{employee.email}</a>
                      </div>
                    </div>
                  )}

                  {employee.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <Phone size={18} color="#555" />
                      </div>
                      <div>
                        <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>Phone</p>
                        <a href={`tel:${employee.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontWeight: '500' }}>{employee.phone}</a>
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                      <Calendar size={18} color="#555" />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '2px' }}>Joined</p>
                      <p style={{ color: 'var(--text-primary)', fontWeight: '500', margin: 0 }}>{formatDate(employee.joiningDate)}</p>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fff', borderRadius: '15px', padding: '25px', border: '1px solid #eee', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>Scan to verify this profile</p>
                  <div style={{ padding: '10px', background: '#fff', border: '1px solid #eee', borderRadius: '10px' }}>
                    <QRCodeSVG value={profileUrl} size={150} level="H" includeMargin={true} />
                  </div>
                  <p className="mono" style={{ marginTop: '15px', fontSize: '0.8rem', color: '#aaa', wordBreak: 'break-all' }}>{profileUrl}</p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
