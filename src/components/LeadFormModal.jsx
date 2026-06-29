import React, { useState } from 'react';
import { X, Send, Lock } from 'lucide-react';
import { saveLeadToDatabase, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';

const LeadFormModal = ({ serviceName, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  // Location States (isoCodes)
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const allCountries = Country.getAllCountries();
  const priorityCodes = ['IN', 'US', 'GB', 'CA', 'AU'];
  const priorityCountries = priorityCodes.map(code => allCountries.find(c => c.isoCode === code)).filter(Boolean);
  const otherCountries = allCountries.filter(c => !priorityCodes.includes(c.isoCode));
  
  const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
  const cities = selectedState ? City.getCitiesOfState(selectedCountry, selectedState) : [];

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.target);
    const leadData = Object.fromEntries(formData.entries());

    // Format location properly
    const countryName = Country.getCountryByCode(selectedCountry)?.name || '';
    const stateName = State.getStateByCodeAndCountry(selectedState, selectedCountry)?.name || '';
    const cityName = selectedCity || ''; 
    const pincode = formData.get('pincode') || '';
    
    leadData.address = `${cityName}, ${stateName}, ${countryName} - ${pincode}`;
    
    // Cleanup temporary location fields from leadData
    delete leadData.country;
    delete leadData.state;
    delete leadData.city;
    delete leadData.pincode;

    // Attach user context to lead
    leadData.clientUid = user ? user.uid : 'anonymous';
    leadData.clientAuthEmail = user ? user.email : 'none';

    // Save to Firebase
    await saveLeadToDatabase(leadData, 'LeadFormModal');
    
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass">
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        {loadingAuth ? (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>Checking security...</div>
        ) : !user ? (
          <div className="text-center" style={{ padding: '3rem 1rem' }}>
            <div style={{ background: 'rgba(163, 136, 255, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
              <Lock size={32} color="#a388ff" />
            </div>
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Account Required</h3>
            <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              To securely submit a project request and track its progress, you must be logged into a Client Account.
            </p>
            <Link to="/client-login" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Create Account / Log In
            </Link>
          </div>
        ) : !isSubmitted ? (
          <>
            <h2>Let's discuss your project</h2>
            <p className="text-secondary" style={{ marginBottom: '2rem' }}>
              You selected: <strong>{serviceName}</strong>. Fill out the details below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="lead-form">
              {/* This hidden field lets the admin know exactly which service was clicked */}
              <input type="hidden" name="service_requested" value={serviceName} />
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" required placeholder="John Doe" />
                </div>
                <div className="form-group">
                  <label>Company Name</label>
                  <input type="text" name="company" placeholder="Optional" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" required defaultValue={user.email} />
                </div>
                <div className="form-group">
                  <label>WhatsApp Number</label>
                  <input type="tel" name="whatsapp" required placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Alternative Phone</label>
                  <input type="tel" name="phone" placeholder="Optional" />
                </div>
              </div>

              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Location / Address</label>
              <div className="form-row" style={{ marginBottom: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <select 
                    name="country" 
                    required 
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setSelectedState(''); // reset state
                      setSelectedCity('');  // reset city
                    }}
                  >
                    <option value="">Select Country</option>
                    {priorityCountries.map(c => <option key={`p-${c.isoCode}`} value={c.isoCode}>{c.name}</option>)}
                    <option disabled>──────────</option>
                    {otherCountries.map(c => <option key={c.isoCode} value={c.isoCode}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <select 
                    name="state" 
                    required 
                    value={selectedState}
                    onChange={(e) => {
                      setSelectedState(e.target.value);
                      setSelectedCity(''); // reset city
                    }}
                    disabled={!selectedCountry}
                  >
                    <option value="">Select State</option>
                    {states.map(s => <option key={s.isoCode} value={s.isoCode}>{s.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <select 
                    name="city" 
                    required 
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    disabled={!selectedState}
                  >
                    <option value="">Select City</option>
                    {cities.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <input type="text" name="pincode" required placeholder="PIN / Zip Code" disabled={!selectedCity} />
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Budget</label>
                <select name="budget">
                  <option value="">Select a range</option>
                  <option value="< ₹10,000 / $120">Less than ₹10,000 / $120</option>
                  <option value="₹10,000 - ₹40,000 / $120 - $500">₹10,000 - ₹40,000 / $120 - $500</option>
                  <option value="₹40,000 - ₹80,000 / $500 - $1,000">₹40,000 - ₹80,000 / $500 - $1,000</option>
                  <option value="₹80,000+ / $1,000+">₹80,000+ / $1,000+</option>
                </select>
              </div>

              <div className="form-group">
                <label>Project Details</label>
                <textarea 
                  name="details" 
                  required 
                  placeholder="Tell us a little bit about what you're trying to build or automate..."
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn">
                Send Request <Send size={18} />
              </button>
            </form>
          </>
        ) : (
          <div className="success-message text-center">
            <div className="success-icon">✓</div>
            <h2>Request Sent Successfully!</h2>
            <p className="text-secondary">We have received your details for {serviceName}. We'll be in touch shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadFormModal;
