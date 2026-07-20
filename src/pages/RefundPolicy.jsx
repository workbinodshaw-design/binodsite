import React, { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';
import { motion } from 'framer-motion';

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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ 
                marginTop: '1rem',
                paddingTop: '3.5rem',
                borderTop: '1px solid rgba(0,0,0,0.08)'
              }}
            >
              <h2 style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '2rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>
                Digital Advertising Services
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1A1A1A' }}>Advertising Budget</h3>
                  <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    The advertising budget is paid directly to the respective advertising platform (including but not limited to Meta, Google, LinkedIn, YouTube, X, TikTok, or other third-party advertising platforms). Any amount already spent on advertising is strictly non-refundable.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1A1A1A' }}>Service Fee</h3>
                  <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    Once campaign planning, strategy, audience research, creative preparation, campaign setup, optimization, or management has started, the CastFlow service fee is strictly non-refundable.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1A1A1A' }}>Performance Disclaimer</h3>
                  <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    CastFlow does not guarantee any specific number of leads, sales, appointments, conversions, revenue, or return on ad spend (ROAS). Advertising performance depends on multiple factors, including advertising budget, competition, audience behavior, market conditions, client response time, landing page quality, and third-party advertising platform algorithms.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.75rem', color: '#1A1A1A' }}>Campaign Cancellation</h3>
                  <p style={{ color: '#666', lineHeight: 1.8, fontSize: '1.05rem' }}>
                    Clients may request to pause or stop an advertising campaign at any time. However, all service fees and advertising costs incurred before cancellation are non-refundable.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default RefundPolicy;
