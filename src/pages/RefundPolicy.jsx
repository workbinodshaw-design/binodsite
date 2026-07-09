import React, { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

const RefundPolicy = () => {
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
            <RefreshCcw size={16} /> RETURNS & CANCELLATIONS
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-1.5px', color: '#1A1A1A' }}>
            Refund Policy
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
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '2rem' }}>
                At CastFlow, we strive to deliver high-quality services and ensure client satisfaction. If you are not satisfied with the work delivered, please contact us first so we can understand your concerns and, where possible, make reasonable revisions.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Refund Eligibility</h3>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                If a refund is approved, CastFlow reserves the right to deduct reasonable costs already incurred, including but not limited to:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <li>Initial consultation and planning</li>
                <li>Research and project analysis</li>
                <li>UI/UX design work</li>
                <li>Development work completed</li>
                <li>Automation setup and configuration</li>
                <li>API integration work</li>
                <li>Third-party service charges</li>
                <li>Payment gateway transaction fees (if applicable)</li>
                <li>Any other resources or expenses directly related to your project</li>
              </ul>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                The remaining eligible amount will be refunded using the original payment method whenever possible.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Non-Refundable Situations</h3>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Refunds may not be provided if:
              </p>
              <ul style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>The agreed work has been completed and delivered.</li>
                <li>The client changes their mind after development has started.</li>
                <li>The client fails to provide required information or approvals, causing project delays.</li>
                <li>Third-party services or platforms (such as hosting providers, Meta, Google, payment gateways, or API providers) cause issues beyond CastFlow's control.</li>
                <li>The project is cancelled after a significant portion of the work has already been completed.</li>
              </ul>
            </div>

            <div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '1rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>Our Commitment</h3>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem', marginBottom: '1rem' }}>
                Client satisfaction is important to us. Before processing any refund request, we will make reasonable efforts to resolve issues through revisions, corrections, or alternative solutions whenever appropriate.
              </p>
              <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                All refund requests are reviewed individually based on the project's progress, work completed, and expenses incurred.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default RefundPolicy;
