import React from 'react';
import { Calendar } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="contact-container glass text-center">
      <h2>Ready to transform your business?</h2>
      <p>Let's discuss how AI and modern web technology can help you scale.</p>
      
      <div className="contact-buttons" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '1.5rem', marginTop: '2rem' }}>
        <a href="mailto:work.binodshaw@gmail.com" className="btn btn-primary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          Start a Project
        </a>
        <a href="https://calendly.com/" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ textDecoration: 'none', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
          <Calendar size={18} /> Book Discovery Call
        </a>
      </div>
      
      <div className="footer-credits">
        <p>&copy; {new Date().getFullYear()} CastFlow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactSection;
