import React, { useEffect, useState } from 'react';
import { MessageCircle, Mail, Send } from 'lucide-react';
import { saveLeadToDatabase } from '../firebase';

const ContactPage = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const formData = new FormData(e.target);
      const leadData = Object.fromEntries(formData.entries());
      
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
            
            <a href="https://wa.me/919394683474" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: '#fff', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(37, 211, 102, 0.2)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MessageCircle size={24} color="#25D366" />
              </div>
              <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>WhatsApp Us</span>
            </a>

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
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="lead-form">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem' }}>Project Details</h3>
              
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required placeholder="John Doe" />
              </div>

              <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Email</label>
                  <input type="email" name="email" required placeholder="john@company.com" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>WhatsApp / Phone</label>
                  <input type="tel" name="phone" placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Budget</label>
                <select name="budget" required>
                  <option value="">Select a range</option>
                  <option value="< $1,000">Less than $1,000</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
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
                {isSubmitting ? 'Sending...' : (
                  <>Submit Request <Send size={18} /></>
                )}
              </button>
            </form>
          ) : (
            <div className="success-message text-center" style={{ padding: '4rem 0' }}>
              <div className="success-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(37, 211, 102, 0.2)', color: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1.5rem auto' }}>✓</div>
              <h2>Request Sent Successfully!</h2>
              <p className="text-secondary" style={{ marginTop: '1rem' }}>Our team will review your project and get back to you within 24 hours.</p>
              <button onClick={() => setIsSubmitted(false)} className="btn btn-secondary" style={{ marginTop: '2rem' }}>Send another request</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
