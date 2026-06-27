import React from 'react';
import { Mail, Calendar } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="contact-container glass text-center">
      <h2>Ready to transform your business?</h2>
      <p>Let's discuss how AI and modern web technology can help you scale.</p>
      
      <div className="contact-buttons">
        <a href="https://wa.me/919394683474" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          <Calendar size={18} /> Book a Discovery Call
        </a>
        <a href="mailto:work.binodshaw@gmail.com" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <Mail size={18} /> Email Us
        </a>
      </div>
      
      <div className="footer-credits">
        <p>&copy; {new Date().getFullYear()} CastFlow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactSection;
