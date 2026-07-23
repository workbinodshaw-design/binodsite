import React, { useState, useEffect } from 'react';
import { Plus, Check, X, RefreshCw, Briefcase, FileBadge, Trash2 } from 'lucide-react';
import { getAllEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../services/employeeService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';

const EmployeeAdminPanel = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    phone: '',
    status: 'active',
    about: '',
    skills: ''
  });
  

  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (employee = null) => {
    setError('');
    if (employee) {
      setEditingId(employee.id);
      setFormData({
        name: employee.name,
        designation: employee.designation,
        email: employee.email || '',
        phone: employee.phone || '',
        status: employee.status,
        about: employee.about || '',
        skills: employee.skills ? employee.skills.join(', ') : '',
        photoUrl: employee.photoUrl
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        designation: '',
        email: '',
        phone: '',
        status: 'active',
        about: '',
        skills: ''
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formattedData = {
      ...formData,
      skills: formData.skills ? formData.skills.split(',').map(s => s.trim()).filter(Boolean) : []
    };

    try {
      if (editingId) {
        await updateEmployee(editingId, formattedData);
      } else {
        await createEmployee(formattedData);
      }
      await fetchEmployees();
      setShowModal(false);
    } catch (err) {
      console.error(err);
      setError('Failed to save employee. ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleStatus = async (employee) => {
    const newStatus = employee.status === 'active' ? 'inactive' : 'active';
    try {
      await updateEmployee(employee.id, { status: newStatus }, null);
      setEmployees(employees.map(e => e.id === employee.id ? { ...e, status: newStatus } : e));
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to PERMANENTLY delete ${employee.name}?`)) {
      try {
        await deleteEmployee(employee.id);
        setEmployees(employees.filter(e => e.id !== employee.id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete employee');
      }
    }
  };

  const generateIDCardPDF = async (employee) => {
    setGeneratingPdf(employee.id);
    
    setTimeout(async () => {
      try {
        const cardElement = document.getElementById(`id-card-${employee.id}`);
        if (!cardElement) throw new Error("Card element not found");
        
        const canvas = await html2canvas(cardElement, { scale: 3, useCORS: true });
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        
        // Portrait ID Card (CR80 standard is 2.125 x 3.375 inches -> 54mm x 86mm)
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: [54, 86]
        });
        
        pdf.addImage(imgData, 'JPEG', 0, 0, 54, 86);
        pdf.save(`${employee.name.replace(/\s+/g, '_')}_IDCard.pdf`);
      } catch (err) {
        console.error("PDF generation failed", err);
        alert("Failed to generate PDF. Make sure images are loaded.");
      } finally {
        setGeneratingPdf(null);
      }
    }, 500); // Give DOM time to render the hidden card
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div className="glass" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 className="h3" style={{ margin: '0 0 0.5rem 0' }}>Public Profiles & ID Cards</h2>
          <p className="text-secondary" style={{ margin: 0 }}>Manage the public "Our Team" directory, upload photos, and generate employee ID cards.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()} 
          className="btn"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <Plus size={18} /> Add Employee
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#666' }}>
          <RefreshCw size={40} className="spin" style={{ marginBottom: '1rem' }} />
          <p>Loading employees...</p>
        </div>
      ) : employees.length === 0 ? (
        <div className="glass" style={{ textAlign: 'center', padding: '4rem', borderRadius: '24px' }}>
          <Briefcase size={48} color="rgba(0,0,0,0.1)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>No Employees Found</h3>
          <p className="text-secondary">Click "Add Employee" to create the first profile.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
          {employees.map(emp => (
            <div key={emp.id} className="glass" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
              
              {/* ID Badge Hidden Template for PDF Generation */}
              <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
                <div id={`id-card-${emp.id}`} style={{ 
                  width: '54mm', height: '86mm', 
                  background: '#fff', 
                  display: 'flex', flexDirection: 'column', 
                  fontFamily: 'sans-serif',
                  boxSizing: 'border-box',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div style={{ height: '30%', background: 'linear-gradient(135deg, #1A73E8, #8a2be2)', position: 'relative', borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px' }}>
                    <div style={{ position: 'absolute', top: '10px', width: '100%', textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>
                      CASTFLOW
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '10px' }}>
                    <div style={{ width: '25mm', height: '25mm', borderRadius: '50%', background: '#eee', marginTop: '-15mm', border: '3px solid white', overflow: 'hidden', position: 'relative', zIndex: 10, boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                      {emp.photoUrl ? (
                        <img 
                          src={emp.photoUrl} 
                          crossOrigin="anonymous" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=f0f0f0&color=999`;
                          }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                          alt="Profile" 
                        />
                      ) : null}
                    </div>
                    
                    <h2 style={{ fontSize: '14px', margin: '10px 0 2px 0', fontWeight: 'bold', color: '#111', textAlign: 'center' }}>{emp.name}</h2>
                    <p style={{ fontSize: '10px', color: '#1A73E8', margin: '0 0 5px 0', fontWeight: 'bold', textAlign: 'center' }}>{emp.designation}</p>
                    <p style={{ fontSize: '10px', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px', margin: '0 0 10px 0', fontFamily: 'monospace' }}>{emp.id}</p>
                    
                    <div style={{ marginTop: 'auto', marginBottom: '10px' }}>
                      <QRCodeSVG value={`https://castflow.in/team/${emp.id}`} size={40} level="M" />
                    </div>
                    <p style={{ fontSize: '7px', color: '#888', margin: 0, textAlign: 'center' }}>{emp.email}</p>
                    <p style={{ fontSize: '7px', color: '#888', margin: '2px 0 0 0', textAlign: 'center' }}>castflow.in/team/{emp.id}</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
                  {emp.photoUrl && (
                    <img 
                      src={emp.photoUrl} 
                      alt={emp.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=f0f0f0&color=999`;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  )}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', fontSize: '1.2rem' }}>{emp.name}</h3>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.85rem', color: '#666', background: '#f5f5f5', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>{emp.id}</span>
                    <span style={{ 
                      fontSize: '0.8rem', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px',
                      background: emp.status === 'active' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                      color: emp.status === 'active' ? '#10B981' : '#EF4444'
                    }}>
                      {emp.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              
              <p style={{ fontSize: '0.9rem', color: '#444', marginBottom: '20px', fontWeight: '500' }}>{emp.designation}</p>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => handleOpenModal(emp)}
                  style={{ flex: 1, padding: '8px', background: '#fdfdfd', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Edit Profile
                </button>
                <button 
                  onClick={() => generateIDCardPDF(emp)}
                  disabled={generatingPdf === emp.id}
                  style={{ flex: 1, padding: '8px', background: '#1A73E8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                >
                  {generatingPdf === emp.id ? <RefreshCw size={16} className="spin" /> : <FileBadge size={16} />} 
                  {generatingPdf === emp.id ? 'Generating...' : 'ID Card PDF'}
                </button>
                <button 
                  onClick={() => toggleStatus(emp)}
                  style={{ width: '100%', padding: '8px', background: emp.status === 'active' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: emp.status === 'active' ? '#EF4444' : '#10B981', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Mark as {emp.status === 'active' ? 'Inactive' : 'Active'}
                </button>
                <button 
                  onClick={() => handleDelete(emp)}
                  style={{ width: '100%', padding: '8px', background: '#fff0f0', color: '#EF4444', border: '1px solid #ffcccc', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                >
                  <Trash2 size={16} /> Delete Permanently
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="glass" style={{ background: '#fff', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '24px', padding: '30px', position: 'relative' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} color="#666" /></button>
            
            <h2 style={{ marginBottom: '20px', fontSize: '1.8rem' }}>{editingId ? `Edit Employee ${formData.name}` : 'Add New Employee'}</h2>
            
            {error && <div style={{ padding: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '8px', marginBottom: '20px' }}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Profile Photo URL</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
                    {formData.photoUrl ? (
                      <img 
                        src={formData.photoUrl} 
                        alt="Preview" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || 'User')}&background=f0f0f0&color=999`;
                        }}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    ) : null}
                  </div>
                  <input type="text" placeholder="https://example.com/photo.jpg" value={formData.photoUrl || ''} onChange={(e) => setFormData({...formData, photoUrl: e.target.value})} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Full Name *</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Designation *</label>
                  <input type="text" required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Official Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Phone Number</label>
                  <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>About / Bio</label>
                <textarea rows="3" value={formData.about} onChange={e => setFormData({...formData, about: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', resize: 'vertical' }}></textarea>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Skills (comma separated)</label>
                <input type="text" value={formData.skills} placeholder="e.g. React, UI/UX, Sales" onChange={e => setFormData({...formData, skills: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem' }}>Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '12px', background: '#eee', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ flex: 2, padding: '12px', background: '#1A73E8', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {isSubmitting ? <RefreshCw size={18} className="spin" /> : <Check size={18} />} 
                  {isSubmitting ? 'Saving...' : editingId ? 'Update Employee' : 'Create Employee'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default EmployeeAdminPanel;
