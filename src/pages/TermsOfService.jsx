import React, { useEffect } from 'react';
import { Scale } from 'lucide-react';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="terms-page" style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* HEADER SECTION */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(20,20,25,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge" style={{ margin: '0 auto 2rem auto', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Scale size={16} /> Legal & Terms
          </div>
          <h1 className="headline" style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 900 }}>
            Terms & Conditions
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Effective Date: {currentDate}
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section style={{ padding: '0 2rem 6rem 2rem' }}>
        <div className="glass-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem', borderRadius: '24px', background: 'rgba(255,255,255,0.02)' }}>
          
          <div className="policy-content" style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Acceptance</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                By using CastFlow, you agree to these Terms.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Services</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                CastFlow provides services including:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
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
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Project Confirmation</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                A project is considered confirmed only after the required advance payment has been received.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                No work will begin until the agreed advance payment is successfully paid.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Payment Policy</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                To protect both CastFlow and our clients from fraudulent bookings, abandoned projects, and unnecessary allocation of resources, an advance payment is mandatory. Advance payments help us:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                <li>Reserve development time</li>
                <li>Allocate project resources</li>
                <li>Begin research and planning</li>
                <li>Prevent fraudulent requests</li>
                <li>Maintain project scheduling</li>
              </ul>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Remaining payments must be completed according to agreed milestones or before final delivery.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Late payments may result in temporary suspension of project work.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Client Responsibilities</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Clients must:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Provide accurate project information.</li>
                <li>Provide required credentials when necessary.</li>
                <li>Respond within reasonable timeframes.</li>
                <li>Review deliverables promptly.</li>
                <li>Ensure they have rights to all provided content.</li>
              </ul>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Intellectual Property</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Unless otherwise agreed, ownership of the final deliverables transfers to the client only after full payment has been received.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                CastFlow retains ownership of internal tools, reusable code, templates, frameworks, and proprietary systems used during development.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Confidentiality</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                We maintain strict confidentiality regarding client projects, credentials, files, and business information.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Only authorized personnel may access project information when necessary.
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Third-Party Platforms</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Some services depend on providers such as Meta, Google, OpenAI, payment gateways, hosting providers, or other third-party services.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                CastFlow is not responsible for outages, API changes, policy updates, pricing changes, account restrictions, or service interruptions caused by these providers.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Project Delays</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Project timelines may be affected if:
              </p>
              <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Required information is not provided.</li>
                <li>Client approvals are delayed.</li>
                <li>Payments are delayed.</li>
                <li>Third-party services experience interruptions.</li>
              </ul>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Termination</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                Either party may terminate a project.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Work completed before termination remains chargeable.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Limitation of Liability</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                CastFlow shall not be liable for indirect, incidental, special, or consequential damages arising from the use of our services.
              </p>
            </div>
            
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-primary)' }}>Changes</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '1rem' }}>
                We may update these Terms at any time.
              </p>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                Continued use constitutes acceptance of the revised Terms.
              </p>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};

export default TermsOfService;
