import React from 'react';
import { Mail, Calendar } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="contact-container glass text-center">
      <h2>Ready to transform your business?</h2>
      <p>Let's discuss how AI and modern web technology can help you scale.</p>
      
      <div className="contact-buttons">
        <button className="btn btn-primary">
          <Calendar size={18} /> Book a Discovery Call
        </button>
        <button className="btn btn-secondary">
          <Mail size={18} /> Email Us
        </button>
      </div>
      
      <div className="footer-credits">
        <p>&copy; {new Date().getFullYear()} CastFlow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactSection;
