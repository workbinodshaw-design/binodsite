import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail, Send, Lock, CheckCircle2 } from 'lucide-react';
import { saveLeadToDatabase, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link, useLocation } from 'react-router-dom';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';
import { Country, State, City } from 'country-state-city';
import SEO from '../components/SEO';

const ContactPage = () => {
  const location = useLocation();
  const defaultService = location.state?.service || '';

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Location States
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const allCountries = Country.getAllCountries();
  const priorityCodes = ['IN', 'US', 'GB', 'CA', 'AU'];
  const priorityCountries = priorityCodes.map(code => allCountries.find(c => c.isoCode === code)).filter(Boolean);
  const otherCountries = allCountries.filter(c => !priorityCodes.includes(c.isoCode));
  
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const leadData = Object.fromEntries(formData.entries());
      
      const countryName = Country.getCountryByCode(selectedCountry)?.name || '';
      const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || '';
      const cityName = selectedCity || ''; 
      const pincode = formData.get('pincode') || '';
      
      leadData.address = `${cityName}, ${stateName}, ${countryName} - ${pincode}`;
      
      delete leadData.country;
      delete leadData.state;
      delete leadData.city;
      delete leadData.pincode;
      
      leadData.email = user.email;
      leadData.clientUid = user.uid;
      leadData.clientAuthEmail = user.email;
      
      await saveLeadToDatabase(leadData, 'ContactPage');
      
      setIsSubmitted(true);
      e.target.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: '#f9f9f9',
    border: '1px solid #eee',
    borderRadius: '12px',
    color: '#1A1A1A',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#444'
  };

  return (
    <>
      <SEO 
        title="Contact Us | Hire Web Developers & AI Experts"
        description="Ready to scale your business? Contact CastFlow for custom web development, CRM solutions, and AI automation. Based in India, serving globally."
      />
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• BOOK DISCOVERY CALL</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Ready to <span style={{ color: '#1A73E8' }}>scale?</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Fill out the details below. Our founders will review your architecture and contact you within 24 hours.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>

          {/* Lead Form Side */}
          <div style={{ background: '#fff', padding: '3rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
            
            {loadingAuth ? (
              <div style={{ textAlign: 'center', padding: '4rem 0', color: '#666' }}>Checking security...</div>
            ) : !user ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ background: '#f5f5f5', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <Lock size={28} color="#1A1A1A" />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem' }}>Account Required</h3>
                <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
                  To securely request and track a project with Castflow, you must be logged into a Client Account. This ensures your project data remains strictly confidential.
                </p>
                <Link to="/client-login" style={{ display: 'inline-block', background: '#1A1A1A', color: '#fff', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 600, textDecoration: 'none' }}>
                  Create Account / Log In
                </Link>
              </div>
            ) : !isSubmitted ? (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem', marginBottom: '1rem' }}>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>Project Request</h3>
                  <p style={{ color: '#1A73E8', fontSize: '0.9rem', marginTop: '0.5rem', fontWeight: 500 }}>Logged in as: {user.email}</p>
                </div>
                
                <h4 style={{ fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1A1A' }}>
                  <span style={{ background: '#f5f5f5', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>1</span>
                  Personal & Business Info
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input type="text" name="name" required placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company / Business Name</label>
                    <input type="text" name="company" placeholder="Optional" style={inputStyle} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>WhatsApp Number</label>
                    <input type="tel" name="whatsapp" required placeholder="+1 234 567 8900" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Alternative Phone</label>
                    <input type="tel" name="phone" placeholder="Optional" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Location / Address</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                    <select 
                      name="country" 
                      required 
                      value={selectedCountry}
                      onChange={(e) => { setSelectedCountry(e.target.value); setSelectedState(''); setSelectedCity(''); }}
                      style={inputStyle}
                    >
                      <option value="">Select Country</option>
                      {priorityCountries.map(c => <option key={`p-${c.isoCode}`} value={c.isoCode}>{c.name}</option>)}
                      <option disabled>──────────</option>
                      {otherCountries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                    </select>
                    <select 
                      name="state" 
                      required 
                      value={selectedState}
                      onChange={(e) => { setSelectedState(e.target.value); setSelectedCity(''); }}
                      disabled={!selectedCountry}
                      style={inputStyle}
                    >
                      <option value="">Select State</option>
                      {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <select 
                      name="city" 
                      required 
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      disabled={!selectedState}
                      style={inputStyle}
                    >
                      <option value="">Select City</option>
                      {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                    </select>
                    <input 
                      type="text" 
                      name="pincode" 
                      required 
                      placeholder="PIN / Zip Code" 
                      disabled={!selectedCity} 
                      style={inputStyle} 
                    />
                  </div>
                </div>

                <h4 style={{ fontWeight: 600, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px', color: '#1A1A1A', marginTop: '1rem' }}>
                  <span style={{ background: '#f5f5f5', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>2</span>
                  Project Specifications
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Service Requested</label>
                    <select name="service_requested" required defaultValue={defaultService} style={inputStyle}>
                      <option value="">Select a service</option>
                      <option value="Web Design & Development">Web Design & Development</option>
                      <option value="AI Automation">AI Automation</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Estimated Budget</label>
                    <select name="budget" required style={inputStyle}>
                      <option value="">Select a range</option>
                      <option value="< ₹10,000 / $120">Less than ₹10,000 / $120</option>
                      <option value="₹10,000 - ₹40,000 / $120 - $500">₹10,000 - ₹40,000 / $120 - $500</option>
                      <option value="₹40,000 - ₹80,000 / $500 - $1,000">₹40,000 - ₹80,000 / $500 - $1,000</option>
                      <option value="₹80,000+ / $1,000+">₹80,000+ / $1,000+</option>
                      <option value="Custom">Custom / Let's Discuss</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                  <div>
                    <label style={labelStyle}>Ideal Deadline</label>
                    <select name="deadline" required style={inputStyle}>
                      <option value="">Select a timeline</option>
                      <option value="ASAP (Urgent)">ASAP (Urgent)</option>
                      <option value="Within 1 Month">Within 1 Month</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>How did you hear about us?</label>
                    <select name="source" style={inputStyle}>
                      <option value="">Select an option (Optional)</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Referral">Referral / Word of Mouth</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Project Details / Requirements</label>
                  <textarea 
                    name="details" 
                    required 
                    placeholder="Tell us everything we need to know about your project, goals, and specific features..."
                    rows="5"
                    style={{ ...inputStyle, resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} style={{ background: '#1A1A1A', color: '#fff', border: 'none', padding: '1rem', borderRadius: '12px', fontWeight: 600, fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1, marginTop: '1rem' }}>
                  {isSubmitting ? 'Processing Request...' : (
                    <>Submit Request <Send size={18} /></>
                  )}
                </button>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#e6f0fd', color: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '1rem' }}>Request Secured!</h3>
                <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.6' }}>
                  Your project request has been submitted securely. You can now track its progress directly from your <strong>Client Dashboard</strong>.
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button onClick={() => setIsSubmitted(false)} style={{ background: '#f5f5f5', color: '#1A1A1A', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 600, cursor: 'pointer' }}>Submit Another</button>
                  <Link to="/client" style={{ background: '#1A73E8', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '30px', fontWeight: 600, textDecoration: 'none' }}>Go to Dashboard</Link>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info Side */}
          <div>
            <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Direct Contact</h3>
              <p style={{ color: '#666', marginBottom: '2rem' }}>Skip the form and chat with us immediately.</p>
              
              <ProtectedWhatsAppLink phoneNumber="919394683474" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#1A1A1A', marginBottom: '1.5rem', padding: '1rem', background: '#f5f5f5', borderRadius: '16px', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'} onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f5'}>
                <div style={{ background: '#25D366', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>WhatsApp Us</span>
              </ProtectedWhatsAppLink>

              <a href="mailto:work.binodshaw@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#1A1A1A', padding: '1rem', background: '#f5f5f5', borderRadius: '16px', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#e8e8e8'} onMouseOut={(e) => e.currentTarget.style.background = '#f5f5f5'}>
                <div style={{ background: '#1A73E8', width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={20} color="#fff" />
                </div>
                <span style={{ fontSize: '1.05rem', fontWeight: 600 }}>Email Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;
