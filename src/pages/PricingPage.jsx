import React, { useEffect } from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Rocket, Target, BarChart, ChevronDown, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Are there any hidden charges?",
      a: "Never. We despise the 'hidden fee' agency model. We analyze your exact business needs, calculate the precise scope of work, and that becomes your final price. It is mathematically impossible for you to be overcharged."
    },
    {
      q: "Why is website pricing a range?",
      a: "A sleek 3-page portfolio requires vastly different architecture than a massive e-commerce portal. We keep things aggressively affordable (₹8k - ₹15k) for high-converting landing pages, and scale up (₹30k+) only when your business demands heavy backend complexity."
    },
    {
      q: "How does automation pricing work?",
      a: "You can start buying your time back for as low as ₹5,000 / $60. As your operations scale and you require more intelligent AI agents, the investment scales proportionally with the exact value the system generates for you."
    },
    {
      q: "Do you offer payment plans for larger projects?",
      a: "Absolutely. For enterprise projects (₹40,000+), we divide the investment into strict milestones. You only pay as you see tangible, working software deployed for your business."
    }
  ];

  return (
    <div className="pricing-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#f8f9fa', color: '#111', fontFamily: '"Inter", sans-serif' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ padding: '6rem 2rem', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(138,43,226,0.1)', color: 'var(--primary-color)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '2rem' }}>
            RUTHLESSLY TRANSPARENT PRICING
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1.5px', color: '#111' }}>
            We Refuse to <br />
            <span style={{ color: 'var(--primary-color)' }}>Overcharge You.</span>
          </h1>
          <p style={{ fontSize: '1.3rem', color: '#555', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
            Most agencies force you into bloated packages with features you will never use. We despise that model. We analyze your exact requirements, calculate the precise cost of development, and charge you exactly that amount. <strong>Not a single rupee more.</strong>
          </p>
        </div>
      </section>

      {/* 2. PRICING CARDS */}
      <section style={{ padding: '2rem 2rem 6rem 2rem' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          
          {/* Tier 1: Small Automations */}
          <div style={{ background: '#fff', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Zap size={30} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Automations & Bots</h3>
            <p style={{ color: '#666', marginBottom: '2rem', minHeight: '50px' }}>Perfect for automating repetitive tasks and saving hours of manual work.</p>
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Starting from</span>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>₹5,000 / $60</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#3b82f6" /> Single-workflow automations
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#3b82f6" /> Basic WhatsApp/Email Bots
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#3b82f6" /> Data scraping & entry
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#3b82f6" /> Cost scales with requirements
              </div>
            </div>
            
            <Link to="/contact" className="btn" style={{ width: '100%', padding: '1.2rem', background: '#f8f9fa', color: '#111', border: '1px solid #ddd', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block' }}>
              Automate My Work
            </Link>
          </div>

          {/* Tier 2: Websites (Highlighted) */}
          <div style={{ background: '#111', padding: '4rem 3rem', borderRadius: '32px', boxShadow: '0 30px 60px rgba(138,43,226,0.2)', position: 'relative', border: '1px solid rgba(138,43,226,0.3)', transform: 'scale(1.05)', zIndex: 2 }}>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: '#fff', padding: '8px 24px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px' }}>
              Web Design & Development
            </div>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(138,43,226,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Target size={30} color="#b673f8" />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', color: '#fff' }}>Websites & Portals</h3>
            <p style={{ color: '#aaa', marginBottom: '2rem', minHeight: '50px' }}>Affordable, beautiful websites. The price is tailored entirely to your requirements.</p>
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Depending on Requirements</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#fff', lineHeight: 1.1 }}>₹8k - ₹15k <span style={{ fontSize: '1.5rem', color: '#b673f8' }}>/ $100 - $180</span></div>
              <div style={{ fontSize: '1rem', color: '#888', marginTop: '0.5rem' }}>(Scales to ₹30k+ / $350+ for advanced apps)</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}>
                <CheckCircle2 size={22} color="#b673f8" /> Landing Pages & Portfolios
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}>
                <CheckCircle2 size={22} color="#b673f8" /> Business Websites
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}>
                <CheckCircle2 size={22} color="#b673f8" /> E-commerce Stores
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}>
                <CheckCircle2 size={22} color="#b673f8" /> Mobile-first & SEO Optimized
              </div>
            </div>
            
            <Link to="/contact" className="btn btn-primary" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block', fontSize: '1.1rem' }}>
              Build My Website
            </Link>
          </div>

          {/* Tier 3: Custom Scale */}
          <div style={{ background: '#fff', padding: '3rem', borderRadius: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#fff0f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
              <Shield size={30} color="#ec4899" />
            </div>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Large Scale Systems</h3>
            <p style={{ color: '#666', marginBottom: '2rem', minHeight: '50px' }}>Custom-architected software, CRMs, and complex AI solutions.</p>
            <div style={{ marginBottom: '2.5rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Custom Scope</span>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111', lineHeight: 1.2 }}>₹50k - ₹90k+ <span style={{ fontSize: '1.5rem', color: '#ec4899' }}>/ $600 - $1100+</span></div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#ec4899" /> Custom SaaS Dashboards
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#ec4899" /> NLP Email Readers & Sorting
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#ec4899" /> Infinite Scalability & Security
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#ec4899" /> Dedicated 24/7 Support
              </div>
            </div>
            
            <Link to="/contact" className="btn" style={{ width: '100%', padding: '1.2rem', background: '#f8f9fa', color: '#111', border: '1px solid #ddd', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block' }}>
              Request a Custom Quote
            </Link>
          </div>

        </div>
      </section>

      {/* 3. VALUE PROPOSITION BANNER */}
      <section style={{ padding: '4rem 2rem', background: 'var(--primary-color)', color: '#fff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <HeartHandshake size={48} style={{ margin: '0 auto 1.5rem auto', opacity: 0.9 }} />
          <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Honest Pricing. Zero Surprises.
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
            We only charge for the exact value and architecture you require. If your needs are small, your price stays small. If you need a massive enterprise system, we build it at a fair, requirement-based cost.
          </p>
          <Link to="/contact" className="btn" style={{ background: '#fff', color: 'var(--primary-color)', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 800, fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Get an Honest Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* 4. FAQ SECTION */}
      <section style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem' }}>Pricing FAQ</h2>
            <p style={{ color: '#666', fontSize: '1.2rem' }}>Everything you need to know about our honest pricing model.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqs.map((faq, idx) => (
              <details key={idx} style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: '16px',
                border: '1px solid #eee',
                cursor: 'pointer'
              }}>
                <summary style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  <ChevronDown size={20} color="#888" />
                </summary>
                <p style={{ marginTop: '1.5rem', color: '#555', lineHeight: 1.7, fontSize: '1.1rem', borderTop: '1px solid #ddd', paddingTop: '1.5rem' }}>
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
