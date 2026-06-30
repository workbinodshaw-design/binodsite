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
      icon: <MessageCircle size={24} color="#38bdf8" />,
      description: 'Excellent communication skills, confident with client meetings, professional attitude, and ability to manage client relationships.',
      color: 'rgba(56, 189, 248, 0.2)'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Web Developer',
      icon: <Code size={24} color="#a388ff" />,
      description: 'Strong frontend and backend knowledge. Comfortable building modern responsive applications. Experience with React, Next.js, Node.js, APIs, databases, GitHub, and AI-assisted development is a plus.',
      color: 'rgba(163, 136, 255, 0.2)'
    },
    {
      id: 'aiautomation',
      title: 'AI Automation & AI Agent Developer',
      icon: <Settings size={24} color="#f43f5e" />,
      description: 'Experience with n8n, Make.com, AI Agents, APIs, Webhooks, OpenAI/Claude integrations, workflow automation, and business automation.',
      color: 'rgba(244, 63, 94, 0.2)'
    },
    {
      id: 'marketing',
      title: 'Marketing & Client Acquisition',
      icon: <TrendingUp size={24} color="#fbbf24" />,
      description: 'Lead generation, client outreach, sales, networking, business development, LinkedIn and email outreach.',
      color: 'rgba(251, 191, 36, 0.2)'
    },
    {
      id: 'expertvibe',
      title: 'Expert Vibe Coder',
      icon: <Code size={24} color="#10b981" />,
      description: 'Someone with exceptional coding skills and a great vibe. You write clean code, solve complex problems effortlessly, and bring positive energy to the team.',
      color: 'rgba(16, 185, 129, 0.2)'
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

  // Light theme input style
  const inputStyle = { backgroundColor: 'rgba(0,0,0,0.02)', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.1)' };

  return (
    <div className="page-container" style={{ paddingTop: '8rem' }}>
      
      {/* Hero Section */}
      <div className="page-header text-center reveal-up">
        <div className="badge" style={{ margin: '0 auto 2rem auto' }}>
          <div className="badge-dot"></div>
          CAREERS AT CASTFLOW
        </div>
        <h1 className="headline" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
          Join the CastFlow Team
        </h1>
        <p className="description" style={{ margin: '0 auto 2.5rem auto', maxWidth: '700px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          We're building AI Automation, AI Agents, and Modern Web Solutions. We're looking for passionate people who want to grow with us and build something meaningful together.
        </p>
        <button 
          className="btn btn-primary" 
          onClick={() => handleApplyClick('')}
          style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
        >
          Apply Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
    <>
      <SEO 
        title="Careers | Join the CastFlow Team"
        description="We are hiring web developers, UI/UX designers, marketing specialists, and AI automation engineers. Build the future with CastFlow."
        keywords="Web Developer Jobs, React Developer Careers, Hiring AI Engineer, Marketing Jobs India, UI/UX Designer Careers"
        url="/join-team"
      />
      <div className="page-container" style={{ paddingTop: '8rem' }}>
        
        {/* Hero Section */}
        <div className="page-header text-center reveal-up">
          <div className="badge" style={{ margin: '0 auto 2rem auto' }}>
            <div className="badge-dot"></div>
            CAREERS AT CASTFLOW
          </div>
          <h1 className="headline" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
            Join the CastFlow Team
          </h1>
          <p className="description" style={{ margin: '0 auto 2.5rem auto', maxWidth: '700px', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
            We're building AI Automation, AI Agents, and Modern Web Solutions. We're looking for passionate people who want to grow with us and build something meaningful together.
          </p>
          <button 
            className="btn btn-primary" 
            onClick={() => handleApplyClick('')}
            style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}
          >
            Apply Now <ArrowRight size={20} style={{ marginLeft: '10px' }} />
          </button>
        </div>

        {!isSubmitted ? (
          <>
            {/* Open Positions Section */}
            <div style={{ margin: '6rem auto', maxWidth: '1200px' }}>
              <h2 className="headline reveal-fade" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '3rem', color: 'var(--text-primary)' }}>
                Open Positions
              </h2>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '2rem' 
              }}>
                {roles.map((role) => (
                  <div key={role.id} className="glass reveal-up" style={{ padding: '2rem', borderRadius: '24px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ background: role.color, width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                      {role.icon}
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{role.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem', flexGrow: 1 }}>
                      {role.description}
                    </p>
                    <button 
                      onClick={() => handleApplyClick(role.title)}
                      className="btn" 
                      style={{ 
                        width: '100%', 
                        background: 'rgba(0,0,0,0.05)', 
                        border: '1px solid rgba(0,0,0,0.1)',
                        color: 'var(--text-primary)',
                        marginTop: 'auto'
                      }}
                    >
                      Apply for this role
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Form */}
            <div ref={formRef} className="glass reveal-up" style={{ margin: '4rem auto', maxWidth: '800px', padding: '3rem', borderRadius: '24px' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Application Form</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Fill out the details below to apply for a position.</p>
              
              <form onSubmit={handleSubmit} className="lead-form">
                <h4 style={{ color: '#a388ff', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Personal Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Full Name *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="form-control" placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Email Address *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="form-control" placeholder="john@example.com" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Phone Number *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="form-control" placeholder="+91 9876543210" style={inputStyle} />
                  </div>
                </div>

                <h4 style={{ color: '#38bdf8', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Address Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Country *</label>
                    <select 
                      name="country" 
                      value={selectedCountry} 
                      onChange={(e) => {
                        setSelectedCountry(e.target.value);
                        setSelectedState('');
                        setSelectedCity('');
                      }} 
                      required 
                      className="form-control" 
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
                  
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>State / Province *</label>
                    <select 
                      name="state" 
                      value={selectedState} 
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        setSelectedCity('');
                      }} 
                      required 
                      className="form-control" 
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>City / Town / Village *</label>
                    {cities.length > 0 ? (
                      <select 
                        name="city" 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)} 
                        required 
                        className="form-control" 
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
                        className="form-control" 
                        placeholder="Enter City" 
                        style={inputStyle}
                        disabled={!selectedState && states.length > 0} 
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>PIN / ZIP Code *</label>
                    <input type="text" name="pinCode" value={formData.pinCode} onChange={handleInputChange} required className="form-control" placeholder="Manual Entry (e.g., 400001)" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Full Street Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} required className="form-control" placeholder="Street, Area, Landmark, House No." style={inputStyle} />
                  </div>
                </div>

                <h4 style={{ color: '#fbbf24', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Professional Profile</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Position Applying For *</label>
                    <select name="position" value={formData.position} onChange={handleInputChange} required className="form-control" style={inputStyle}>
                      <option value="" disabled>Select a role</option>
                      {roles.map(r => (
                        <option key={r.id} value={r.title}>{r.title}</option>
                      ))}
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Experience Level *</label>
                    <select name="experience" value={formData.experience} onChange={handleInputChange} required className="form-control" style={inputStyle}>
                      <option value="Fresher">Fresher</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Experienced">Experienced</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Skills *</label>
                    <input type="text" name="skills" value={formData.skills} onChange={handleInputChange} required className="form-control" placeholder="e.g. React, Node.js, Communication" style={inputStyle} />
                  </div>
                  <div className="form-group">
                    <label style={{ color: 'var(--text-primary)' }}>Portfolio / GitHub / LinkedIn (Optional)</label>
                    <input type="url" name="portfolio" value={formData.portfolio} onChange={handleInputChange} className="form-control" placeholder="https://" style={inputStyle} />
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: 'var(--text-primary)' }}>Tell us about yourself *</label>
                  <textarea name="tellUs" value={formData.tellUs} onChange={handleInputChange} required className="form-control" rows="3" placeholder="Brief intro..." style={inputStyle}></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                  <label style={{ color: 'var(--text-primary)' }}>Why do you want to join CastFlow? *</label>
                  <textarea name="whyCastFlow" value={formData.whyCastFlow} onChange={handleInputChange} required className="form-control" rows="3" placeholder="What excites you about us?" style={inputStyle}></textarea>
                </div>

                <div className="form-group" style={{ marginBottom: '2.5rem' }}>
                  <label style={{ color: 'var(--text-primary)' }}>Best Project You've Built (or Achievement) *</label>
                  <textarea name="bestProject" value={formData.bestProject} onChange={handleInputChange} required className="form-control" rows="3" placeholder="Tell us about something you are proud of..." style={inputStyle}></textarea>
                </div>

                <div style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <input 
                    type="checkbox" 
                    id="confirm" 
                    name="confirmAccurate"
                    checked={formData.confirmAccurate} 
                    onChange={handleInputChange} 
                    style={{ width: '20px', height: '20px', marginTop: '4px', cursor: 'pointer' }}
                  />
                  <label htmlFor="confirm" style={{ color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    I confirm that the information provided is accurate.
                  </label>
                </div>

                {/* Notice */}
                <div style={{ 
                  background: 'rgba(56, 189, 248, 0.1)', 
                  borderLeft: '4px solid #38bdf8', 
                  padding: '1.5rem', 
                  borderRadius: '0 12px 12px 0',
                  marginBottom: '2rem'
                }}>
                  <p style={{ color: 'var(--text-primary)', margin: 0, lineHeight: '1.6', fontSize: '0.95rem' }}>
                    CastFlow is currently an early-stage startup. We're building a passionate core team to grow together. At this stage, contributions are project-based, with opportunities to grow alongside the company as we expand.
                  </p>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={isSubmitting}
                  style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                </button>
              </form>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="glass" style={{ margin: '4rem auto', maxWidth: '600px', padding: '4rem 2rem', borderRadius: '24px', textAlign: 'center', animation: 'fadeIn 0.5s ease-in' }}>
            <div style={{ background: 'rgba(37, 211, 102, 0.2)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
              <CheckCircle2 size={40} color="#25D366" />
            </div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Application Submitted Successfully</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
              Thank you for your interest in CastFlow. We appreciate your application. Our team will review your profile and contact you if there's a suitable opportunity.
            </p>
            <button onClick={() => window.location.href = '/'} className="btn btn-primary">
              Return to Home
            </button>
          </div>
        )}
        
      </div>
    </>
  );
};

export default JoinTeamPage;
