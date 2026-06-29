import React, { useEffect } from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="privacy-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* HEADER SECTION */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(20,20,25,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge" style={{ margin: '0 auto 2rem auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={16} /> Privacy & Security
          </div>
          <h1 className="headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 900 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section style={{ padding: '0 2rem 6rem 2rem' }}>
        <div className="glass-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
          
          <div className="policy-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>1. Introduction</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Welcome to Castflow. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>2. The Data We Collect About You</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Personal data, or personal information, means any information about an individual from which that person can be identified. We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>3. How We Use Your Data</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                Where we need to perform the contract we are about to enter into or have entered into with you.
                Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>4. Data Security</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>5. Your Legal Rights</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: '#fff' }}>6. Contact Us</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                If you have any questions about this privacy policy or our privacy practices, please contact us by email at <strong>work.binodshaw@gmail.com</strong>.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
