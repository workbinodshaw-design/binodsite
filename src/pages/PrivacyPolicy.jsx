import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: '#f5f5f5', color: '#1A1A1A' }}>
      
      {/* HEADER SECTION */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ margin: '0 auto 2rem auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#1A1A1A' }}>
            <Shield size={16} /> PRIVACY & SECURITY
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-1.5px', color: '#1A1A1A' }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#666', lineHeight: 1.6 }}>
            Effective Date: {currentDate}
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section style={{ padding: '0 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem', borderRadius: '24px', background: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>1. Introduction</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Welcome to CastFlow ("CastFlow", "we", "our", or "us"). We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website or services.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginTop: '1rem' }}>
                By using our website, you agree to this Privacy Policy.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>2. Information We Collect</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Depending on the services you request, we may collect:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Company Name</li>
                <li>Project Details</li>
                <li>Files and documents you upload</li>
                <li>Social media account information only when you voluntarily connect your accounts for automation</li>
                <li>Browser information</li>
                <li>Device information</li>
                <li>IP Address</li>
                <li>Contact form submissions</li>
              </ul>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginTop: '1rem' }}>
                We only collect information necessary to provide our services.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>3. How We Use Your Information</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Your information may be used to:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Respond to inquiries</li>
                <li>Deliver our services</li>
                <li>Build websites and automation systems</li>
                <li>Configure API integrations</li>
                <li>Improve our services</li>
                <li>Provide customer support</li>
                <li>Send project updates</li>
                <li>Prevent fraud and abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>4. Client Confidentiality</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                All client information is treated as confidential.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                We never sell your information.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Only authorized personnel who require access for project completion may access client data.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Access permissions are granted on a need-to-know basis.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>5. Social Media & Third-Party Integrations</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                If you authorize CastFlow to connect your accounts (such as Meta, Instagram, Facebook, WhatsApp, Google, etc.), authentication is completed using the official authorization systems provided by those platforms.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                We only use the permissions you explicitly grant to deliver the requested services.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                We never request unnecessary permissions.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>6. Data Security</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Protecting client information is a priority. We implement appropriate technical and organizational security measures including:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <li>Secure infrastructure</li>
                <li>HTTPS encryption</li>
                <li>Restricted administrative access</li>
                <li>Authentication controls</li>
                <li>Encrypted storage where applicable</li>
                <li>Regular security monitoring</li>
                <li>Access logging where applicable</li>
              </ul>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Although we take reasonable precautions, no internet transmission can be guaranteed to be 100% secure.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>7. Cookies</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                We may use cookies to:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <li>Improve website performance</li>
                <li>Remember user preferences</li>
                <li>Analyze website traffic</li>
                <li>Enhance user experience</li>
              </ul>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                You may disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>8. Data Retention</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                We retain information only as long as necessary to provide services, comply with legal obligations, resolve disputes, or protect our business interests.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>9. Your Rights</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                You may request to:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Access your information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your information (where legally permitted)</li>
                <li>Withdraw consent where applicable</li>
              </ul>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>10. Children's Privacy</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Our services are not intended for children under 13 years of age.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>11. Policy Updates</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                We may update this Privacy Policy periodically. Changes become effective immediately after publication.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>12. Contact</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
                Email: <a href="mailto:support@castflow.in" style={{ color: '#1A73E8', textDecoration: 'none' }}>support@castflow.in</a>
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Website: <a href="https://castflow.in" target="_blank" rel="noreferrer" style={{ color: '#1A73E8', textDecoration: 'none' }}>https://castflow.in</a>
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
