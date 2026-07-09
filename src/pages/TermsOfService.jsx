import React, { useEffect } from 'react';
import { Scale } from 'lucide-react';

const TermsOfService = () => {
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
            <Scale size={16} /> LEGAL & TERMS
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-1.5px', color: '#1A1A1A' }}>
            Terms & Conditions
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
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Acceptance</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                By using CastFlow, you agree to these Terms.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Services</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                CastFlow provides services including:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Website Development</li>
                <li>AI Automation</li>
                <li>Workflow Automation</li>
                <li>API Integrations</li>
                <li>UI/UX Design</li>
                <li>Technical Consulting</li>
                <li>Maintenance</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Project Confirmation</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                A project is considered confirmed only after the required advance payment has been received.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                No work will begin until the agreed advance payment is successfully paid.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Payment Policy</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                To protect both CastFlow and our clients from fraudulent bookings, abandoned projects, and unnecessary allocation of resources, an advance payment is mandatory. Advance payments help us:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <li>Reserve development time</li>
                <li>Allocate project resources</li>
                <li>Begin research and planning</li>
                <li>Prevent fraudulent requests</li>
                <li>Maintain project scheduling</li>
              </ul>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Remaining payments must be completed according to agreed milestones or before final delivery.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                Late payments may result in temporary suspension of project work.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Client Responsibilities</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Clients must:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Provide accurate project information.</li>
                <li>Provide required credentials when necessary.</li>
                <li>Respond within reasonable timeframes.</li>
                <li>Review deliverables promptly.</li>
                <li>Ensure they have rights to all provided content.</li>
              </ul>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Intellectual Property</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Upon full and final payment, intellectual property rights for the developed custom code and design are transferred to the client, subject to the following:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>CastFlow retains rights to re-use general, non-proprietary code snippets, libraries, or frameworks.</li>
                <li>CastFlow retains the right to display the completed project in our portfolio, case studies, or marketing materials unless explicitly requested otherwise in writing.</li>
              </ul>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Limitation of Liability</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                CastFlow is not liable for:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Loss of profits or revenue</li>
                <li>Data loss</li>
                <li>Third-party service failures (e.g., hosting downtime, API changes, Meta/Google platform issues)</li>
                <li>Indirect or consequential damages</li>
              </ul>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Modifications</h2>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                We reserve the right to modify these Terms at any time. Continued use of our services constitutes acceptance of the new Terms.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default TermsOfService;
