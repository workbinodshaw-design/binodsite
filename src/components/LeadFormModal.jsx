import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { saveLeadToDatabase } from '../firebase';

const LeadFormModal = ({ serviceName, onClose }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Extract form data
    const formData = new FormData(e.target);
    const leadData = Object.fromEntries(formData.entries());

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

        {!isSubmitted ? (
          <>
            <h2>Let's discuss your project</h2>
            <p className="text-secondary" style={{ marginBottom: '2rem' }}>
              You selected: <strong>{serviceName}</strong>. Fill out the details below and our team will get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="lead-form">
              {/* This hidden field lets the admin know exactly which service was clicked */}
              <input type="hidden" name="service_requested" value={serviceName} />

              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" required placeholder="John Doe" />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" name="email" required placeholder="john@company.com" />
                </div>
                <div className="form-group">
                  <label>WhatsApp / Phone</label>
                  <input type="tel" name="phone" placeholder="+1 234 567 8900" />
                </div>
              </div>

              <div className="form-group">
                <label>Estimated Budget</label>
                <select name="budget">
                  <option value="">Select a range</option>
                  <option value="< $1,000">Less than $1,000</option>
                  <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000+">$10,000+</option>
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
