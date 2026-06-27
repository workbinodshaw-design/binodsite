import React, { useEffect } from 'react';
import ContactSection from '../components/ContactSection';
import { MessageCircle, Mail, MapPin } from 'lucide-react';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-container" style={{ paddingTop: '8rem' }}>
      <div className="page-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          LET'S TALK
        </div>
        <h1 className="headline" style={{ fontSize: '3.5rem' }}>Ready to scale?</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '600px', fontSize: '1.2rem' }}>
          Whether you need a custom AI agent or a high-performance web application, our founders are ready to discuss your architecture.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '4rem 0' }}>
        <a href="https://wa.me/919394683474" target="_blank" rel="noreferrer" className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s' }}>
          <div style={{ background: 'rgba(37, 211, 102, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <MessageCircle size={32} color="#25D366" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>WhatsApp</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Chat directly with our team.</p>
        </a>

        <a href="mailto:work.binodshaw@gmail.com" className="glass" style={{ padding: '2rem', borderRadius: '24px', textAlign: 'center', textDecoration: 'none', color: 'inherit', transition: 'transform 0.3s' }}>
          <div style={{ background: 'rgba(163, 136, 255, 0.2)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
            <Mail size={32} color="#a388ff" />
          </div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Email</h3>
          <p style={{ color: 'var(--text-secondary)' }}>work.binodshaw@gmail.com</p>
        </a>
      </div>

      <div className="content-section" style={{ minHeight: 'auto', paddingBottom: '4rem' }}>
        <ContactSection />
      </div>
    </div>
  );
};

export default ContactPage;
