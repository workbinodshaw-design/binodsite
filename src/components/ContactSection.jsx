import React from 'react';
import { Mail, Calendar, MessageCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <div className="contact-container glass text-center">
      <h2>Ready to transform your business?</h2>
      <p>Let's discuss how AI and modern web technology can help you scale.</p>
      
      <div className="contact-buttons" style={{ flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <a 
          href="https://wa.me/919394683474" 
          target="_blank" 
          rel="noreferrer" 
          className="btn" 
          style={{ 
            textDecoration: 'none', 
            background: '#25D366', 
            color: 'white', 
            fontSize: '1.5rem', 
            padding: '1.2rem 3rem',
            boxShadow: '0 10px 30px rgba(37, 211, 102, 0.3)',
            borderRadius: '100px'
          }}
        >
          <MessageCircle size={28} /> Talk with us on WhatsApp
        </a>
        <a href="mailto:work.binodshaw@gmail.com" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
          <Mail size={18} /> Or Email Us
        </a>
      </div>
      
      <div className="footer-credits">
        <p>&copy; {new Date().getFullYear()} CastFlow. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ContactSection;
