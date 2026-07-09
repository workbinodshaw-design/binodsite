import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, 
  Code, 
  Settings, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';
import { saveJobApplicationToDatabase } from '../firebase';
import { Country, State, City } from 'country-state-city';
import SEO from '../components/SEO';

const JoinTeamPage = () => {
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    pinCode: '',
    position: '',
    experience: 'Fresher',
    skills: '',
    portfolio: '',
    tellUs: '',
    whyCastFlow: '',
    bestProject: '',
    confirmAccurate: false
  });

  // Location States (isoCodes)
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const allCountries = Country.getAllCountries();
  const priorityCodes = ['IN', 'US', 'GB', 'CA', 'AU'];
  const priorityCountries = priorityCodes.map(code => allCountries.find(c => c.isoCode === code)).filter(Boolean);
  const otherCountries = allCountries.filter(c => !priorityCodes.includes(c.isoCode));
  
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const roles = [
    {
      id: 'communication',
      title: 'Communication & Client Success',
      icon: <MessageCircle size={24} color="#1A73E8" />,
      description: 'Excellent communication skills, confident with client meetings, professional attitude, and ability to manage client relationships.',
      color: '#e6f0fd'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Web Developer',
      icon: <Code size={24} color="#9C27B0" />,
      description: 'Strong frontend and backend knowledge. Comfortable building modern responsive applications. Experience with React, Next.js, Node.js, APIs, databases, GitHub, and AI-assisted development is a plus.',
      color: '#f3e5f5'
    },
    {
      id: 'aiautomation',
      title: 'AI Automation & AI Agent Developer',
      icon: <Settings size={24} color="#E91E63" />,
      description: 'Experience with n8n, Make.com, AI Agents, APIs, Webhooks, OpenAI/Claude integrations, workflow automation, and business automation.',
      color: '#fce4ec'
    },
    {
      id: 'marketing',
      title: 'Marketing & Client Acquisition',
      icon: <TrendingUp size={24} color="#FF9800" />,
      description: 'Lead generation, client outreach, sales, networking, business development, LinkedIn and email outreach.',
      color: '#fff3e0'
    },
    {
      id: 'expertvibe',
      title: 'Expert Vibe Coder',
      icon: <Code size={24} color="#4CAF50" />,
      description: 'Someone with exceptional coding skills and a great vibe. You write clean code, solve complex problems effortlessly, and bring positive energy to the team.',
      color: '#e8f5e9'
    }
  ];

  const handleApplyClick = (roleTitle) => {
    setFormData(prev => ({ ...prev, position: roleTitle }));
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.confirmAccurate) {
      alert("Please confirm that the information provided is accurate.");
      return;
    }

    if (!selectedCountry || !selectedState || (!selectedCity && cities.length > 0)) {
        alert("Please complete your address selection (Country, State, City).");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
      const applicationData = {
        ...formData,
        country: Country.getCountryByCode(selectedCountry)?.name || '',
        state: State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || '',
        city: selectedCity,
        submittedAt: new Date().toISOString()
      };
      
      const success = await saveJobApplicationToDatabase(applicationData);
      
      if (success) {
        setIsSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        alert("Failed to submit application. Please check your connection and try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("An error occurred while submitting your application.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = { 
    backgroundColor: '#fff', 
    color: '#1A1A1A', 
    border: '1px solid #ddd',
    padding: '12px 16px',
    borderRadius: '8px',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = {
    color: '#1A1A1A',
    fontWeight: 600,
    marginBottom: '8px',
    display: 'block'
  };

  return (
    <>
      <SEO 
        title="Careers | Join the CastFlow Team"
        description="We are hiring web developers, UI/UX designers, marketing specialists, and AI automation engineers. Build the future with CastFlow."
        keywords="Web Developer Jobs, React Developer Careers, Hiring AI Engineer, Marketing Jobs India, UI/UX Designer Careers"
        url="/join-team"
      />
      <div style={{ padding: '6rem 1.5rem', background: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* Hero Section */}
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', color: '#1A1A1A' }}>
          • CAREERS AT CASTFLOW
        </div>
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', marginBottom: '1.5rem', color: '#1A1A1A' }}>
          Join the Team
        </h1>
        <p style={{ margin: '0 auto 2.5rem auto', maxWidth: '700px', fontSize: '1.2rem', color: '#666', lineHeight: 1.6 }}>
          We're building AI Automation, AI Agents, and Modern Web Solutions. We're looking for passionate people who want to grow with us and build something meaningful together.
        </p>
        <button 
          onClick={() => handleApplyClick('')}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: '#1A1A1A', color: '#fff', borderRadius: '30px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', fontWeight: 600 }}
        >
          Apply Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
        </button>
      </div>

      {!isSubmitted ? (
        <>
          {/* Open Positions Section */}
          <div style={{ margin: '6rem auto', maxWidth: '1200px' }}>
            <h2 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: '#1A1A1A', fontWeight: 600, letterSpacing: '-1px' }}>
              Open Positions
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {roles.map((role) => (
                <div key={role.id} style={{ background: '#fff', padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <div style={{ background: role.color, width: '48px', height: '48px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                    {role.icon}
                  </div>
                  <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: '#1A1A1A', fontWeight: 600 }}>{role.title}</h3>
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem', flexGrow: 1 }}>
                    {role.description}
                  </p>
                  <button 
                    onClick={() => handleApplyClick(role.title)}
                    style={{ 
                      width: '100%', 
                      background: '#f5f5f5', 
                      border: '1px solid #ddd',
                      color: '#1A1A1A',
                      padding: '12px',
                      borderRadius: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      marginTop: 'auto',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = '#e0e0e0'}
                    onMouseOut={(e) => e.target.style.background = '#f5f5f5'}
                  >
                    Apply for this role
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div ref={formRef} style={{ margin: '4rem auto', maxWidth: '800px', padding: '3rem', borderRadius: '24px', background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1A1A1A', fontWeight: 600, letterSpacing: '-0.5px' }}>Application Form</h2>
            <p style={{ color: '#666', marginBottom: '3rem' }}>Fill out the details below to apply for a position.</p>
            
            <form onSubmit={handleSubmit}>
              <h4 style={{ color: '#1A73E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Personal Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required style={inputStyle} placeholder="John Doe" />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={inputStyle} placeholder="john@example.com" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required style={inputStyle} placeholder="+91 9876543210" />
                </div>
              </div>

              <h4 style={{ color: '#1A73E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Address Details</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Country *</label>
                  <select 
                    name="country" 
                    value={selectedCountry} 
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState('');
                      setSelectedCity('');
                    }} 
                    required 
                    style={inputStyle}
                  >
                    <option value="" disabled>Select Country</option>
                    <optgroup label="Popular">
                      {priorityCountries.map(c => (
                        <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="All Countries">
                      {otherCountries.map(c => (
                        <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                
                <div>
                  <label style={labelStyle}>State / Province *</label>
                  <select 
                    name="state" 
                    value={selectedState} 
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity('');
                    }} 
                    required 
                    style={inputStyle}
                    disabled={states.length === 0}
                  >
                    <option value="" disabled>Select State</option>
                    {states.map(s => (
                      <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>City / Town / Village *</label>
                  {cities.length > 0 ? (
                    <select 
                      name="city" 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)} 
                      required 
                      style={inputStyle}
                    >
                      <option value="" disabled>Select City</option>
                      {cities.map(c => (
                        <option key={c.name} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type="text" 
                      name="city" 
                      value={selectedCity} 
                      onChange={(e) => setSelectedCity(e.target.value)} 
                      required 
                      placeholder="Enter City" 
                      style={inputStyle}
                      disabled={!selectedState && states.length > 0} 
                    />
                  )}
                </div>

                <div>
                  <label style={labelStyle}>PIN / ZIP Code *</label>
                  <input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} required style={inputStyle} placeholder="Manual Entry (e.g., 400001)" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <div>
                  <label style={labelStyle}>Full Street Address *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleInputChange} required style={inputStyle} placeholder="Street, Area, Landmark, House No." />
                </div>
              </div>

              <h4 style={{ color: '#1A73E8', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 600 }}>Professional Profile</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Position Applying For *</label>
                  <select name="position" value={formData.position} onChange={handleInputChange} required style={inputStyle}>
                    <option value="" disabled>Select a role</option>
                    {roles.map(r => (
                      <option key={r.id} value={r.title}>{r.title}</option>
                    ))}
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Experience Level *</label>
                  <select name="experience" value={formData.experience} onChange={handleInputChange} required style={inputStyle}>
                    <option value="Fresher">Fresher</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Experienced">Experienced</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Skills *</label>
                  <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} required style={inputStyle} placeholder="e.g. React, Node.js, Communication" />
                </div>
                <div>
                  <label style={labelStyle}>Portfolio / GitHub / LinkedIn (Optional)</label>
                  <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} style={inputStyle} placeholder="https://" />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Tell us about yourself *</label>
                <textarea name="tellUs" value={formData.tellUs} onChange={handleInputChange} required rows="3" placeholder="Brief intro..." style={{...inputStyle, resize: 'vertical'}}></textarea>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Why do you want to join CastFlow? *</label>
                <textarea name="whyCastFlow" value={formData.whyCastFlow} onChange={handleInputChange} required rows="3" placeholder="What excites you about us?" style={{...inputStyle, resize: 'vertical'}}></textarea>
              </div>

              <div style={{ marginBottom: '2.5rem' }}>
                <label style={labelStyle}>Best Project You've Built (or Achievement) *</label>
                <textarea name="bestProject" value={formData.bestProject} onChange={handleInputChange} required rows="3" placeholder="Tell us about something you are proud of..." style={{...inputStyle, resize: 'vertical'}}></textarea>
              </div>

              <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <input 
                  type="checkbox" 
                  id="confirm" 
                  name="confirmAccurate"
                  checked={formData.confirmAccurate} 
                  onChange={handleInputChange} 
                  style={{ width: '20px', height: '20px', marginTop: '2px', cursor: 'pointer' }}
                />
                <label htmlFor="confirm" style={{ color: '#666', cursor: 'pointer', fontSize: '0.95rem', lineHeight: '1.5' }}>
                  I confirm that the information provided is accurate.
                </label>
              </div>

              {/* Notice */}
              <div style={{ 
                background: '#e6f0fd', 
                borderLeft: '4px solid #1A73E8', 
                padding: '1.5rem', 
                borderRadius: '0 12px 12px 0',
                marginBottom: '2.5rem'
              }}>
                <p style={{ color: '#1A1A1A', margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>
                  CastFlow is currently an early-stage startup. We're building a passionate core team to grow together. At this stage, contributions are project-based, with opportunities to grow alongside the company as we expand.
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{ 
                  width: '100%', 
                  padding: '1.2rem', 
                  fontSize: '1.1rem', 
                  opacity: isSubmitting ? 0.7 : 1,
                  background: '#1A1A1A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => !isSubmitting && (e.target.style.background = '#333')}
                onMouseOut={(e) => !isSubmitting && (e.target.style.background = '#1A1A1A')}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </>
      ) : (
        /* Success State */
        <div style={{ margin: '4rem auto', maxWidth: '600px', padding: '4rem 2rem', borderRadius: '24px', textAlign: 'center', background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          <div style={{ background: '#e0fae5', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
            <CheckCircle2 size={40} color="#27c93f" />
          </div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#1A1A1A', fontWeight: 600, letterSpacing: '-0.5px' }}>Application Submitted</h2>
          <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2.5rem' }}>
            Thank you for your interest in CastFlow. We appreciate your application. Our team will review your profile and contact you if there's a suitable opportunity.
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ 
              padding: '1rem 2.5rem', 
              fontSize: '1.1rem', 
              background: '#1A1A1A',
              color: '#fff',
              border: 'none',
              borderRadius: '30px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Return to Home
          </button>
        </div>
      )}
      
    </div>
    </>
  );
};

export default JoinTeamPage;
