import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail, Send, Lock } from 'lucide-react';
import { saveLeadToDatabase, auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Link } from 'react-router-dom';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

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
    if (!user) return; // double check

    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const leadData = Object.fromEntries(formData.entries());
      
      // Forcefully attach the logged-in user's email to tie it to their dashboard
      leadData.email = user.email;
      
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

  return (
    <div className="page-container" style={{ paddingTop: '8rem' }}>
      <div className="page-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          BOOK DISCOVERY CALL
        </div>
        <h1 className="headline" style={{ fontSize: '3.5rem' }}>Ready to scale?</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '600px', fontSize: '1.2rem' }}>
          Fill out the details below. Our founders will review your architecture and contact you within 24 hours.
        </p>
      </div>

      <div className="contact-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', margin: '4rem auto', maxWidth: '1000px' }}>
        
        {/* Contact Info Side */}
        <div className="contact-info" style={{ flex: '1', minWidth: '300px' }}>
          <div className="glass" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Direct Contact</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Skip the form and chat with us immediately.</p>
            
            <ProtectedWhatsAppLink phoneNumber="919394683474" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#fff', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(37, 211, 102, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={24} color="#25D366" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>WhatsApp Us</span>
            </ProtectedWhatsAppLink>

            <a href="mailto:work.binodshaw@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#fff' }}>
              <div style={{ background: 'rgba(163, 136, 255, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Mail size={24} color="#a388ff" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Email Us</span>
            </a>
          </div>
        </div>

        {/* Lead Form Side */}
        <div className="contact-form-container glass" style={{ flex: '2', minWidth: '350px', padding: '3rem', borderRadius: '24px' }}>
          
          {loadingAuth ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>Checking security...</div>
          ) : !user ? (
            // Authentication Required Wall
            <div className="text-center" style={{ padding: '2rem 0' }}>
              <div style={{ background: 'rgba(163, 136, 255, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                <Lock size={32} color="#a388ff" />
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Account Required</h3>
              <p className="text-secondary" style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                To securely request and track a project with Castflow, you must be logged into a Client Account. This ensures your project data remains strictly confidential and allows you to track development progress in real-time.
              </p>
              <Link to="/client-login" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
                Create Account / Log In
              </Link>
            </div>
          ) : !isSubmitted ? (
            <form onSubmit={handleSubmit} className="lead-form">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Project Details</h3>
              <p style={{ color: '#a388ff', marginBottom: '2rem', fontSize: '0.9rem' }}>Logged in as: {user.email}</p>
              
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required placeholder="John Doe" />
              </div>

              <div className="form-group">
                <label>WhatsApp / Phone (Important)</label>
                <input type="tel" name="phone" required placeholder="+1 234 567 8900" />
              </div>

              <div className="form-group">
                <label>Estimated Budget</label>
                <select name="budget" required>
                  <option value="">Select a range</option>
                  <option value="< ₹10,000 / $120">Less than ₹10,000 / $120</option>
                  <option value="₹10,000 - ₹30,000 / $120 - $350">₹10,000 - ₹30,000 / $120 - $350</option>
                  <option value="₹30,000 - ₹60,000 / $350 - $700">₹30,000 - ₹60,000 / $350 - $700</option>
                  <option value="₹60,000+ / $700+">₹60,000+ / $700+</option>
                  <option value="Custom">Custom / Let's Discuss</option>
                </select>
              </div>

              <div className="form-group">
                <label>How can we help?</label>
                <textarea 
                  name="details" 
                  required 
                  placeholder="Tell us a little bit about what you're trying to build or automate..."
                  rows="5"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting} style={{ width: '100%', marginTop: '1rem' }}>
                {isSubmitting ? 'Processing Request...' : (
                  <>Submit Request <Send size={18} /></>
                )}
              </button>
            </form>
          ) : (
            <div className="success-message text-center" style={{ padding: '4rem 0' }}>
              <div className="success-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.2)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem auto' }}>✓</div>
              <h2>Request Secured!</h2>
              <p className="text-secondary" style={{ marginTop: '1rem', lineHeight: '1.6' }}>
                Your project request has been submitted securely. You can now track its progress directly from your <strong>Client Dashboard</strong>.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary">Submit another</button>
                <Link to="/client" className="btn btn-primary" style={{ textDecoration: 'none' }}>Go to Dashboard</Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
