import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Rocket, Target, BarChart, ChevronDown, ChevronUp, HeartHandshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: "Can I pay 50% first?",
      a: "Yes, for standard projects we require a 50% upfront deposit to commence work, and the remaining 50% upon successful deployment and approval."
    },
    {
      q: "How long will it take?",
      a: "It depends on the scope, but our maximum delivery time is 5 days for a standard business website."
    },
    {
      q: "Can you redesign my existing website?",
      a: "Absolutely. We can take your outdated site and migrate it to our high-performance architecture with a complete UI/UX overhaul."
    },
    {
      q: "Do you provide hosting?",
      a: "Yes. We handle all the technical heavy lifting, including premium, lightning-fast hosting so you never have to worry about servers."
    },
    {
      q: "Do you provide maintenance?",
      a: "Yes, we offer ongoing maintenance and support packages to ensure your platform stays secure, updated, and blazing fast."
    },
    {
      q: "Can you make AI chatbots?",
      a: "Yes, we specialize in building custom AI agents trained specifically on your company's knowledge base to handle customer support or internal tasks."
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
          <div className="pricing-card-hover stagger-item" style={{ animationDelay: '0.1s', background: '#fff', padding: '3.5rem 3rem', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Zap size={30} color="#3b82f6" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>Save 10+ Hours Every Week with Custom Automation</h3>
            <p style={{ color: '#666', marginBottom: '3rem', minHeight: '50px' }}>Perfect for automating repetitive tasks and saving hours of manual work.</p>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Starting from</span>
              <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>₹5,000 <span style={{ fontSize: '2rem' }}>/ $60</span></div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#3b82f6" /> Free post-launch support
              </div>
            </div>
            
            <Link to="/contact" state={{ service: "AI Automation" }} className="btn" style={{ width: '100%', padding: '1.2rem', background: '#f8f9fa', color: '#111', border: '1px solid #ddd', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block' }}>
              Automate My Work
            </Link>
          </div>

          {/* Tier 2: Websites (Highlighted) */}
          <div className="pricing-tier-highlight pricing-card-hover stagger-item" style={{ animationDelay: '0.3s', background: '#111', padding: '4.5rem 3rem', borderRadius: '32px', boxShadow: '0 0 40px rgba(138,43,226,0.4)', position: 'relative', border: '2px solid rgba(138,43,226,0.6)', transform: 'scale(1.05)', zIndex: 2, overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', transform: 'skewX(-20deg)', animation: 'shimmer 3s infinite' }}></div>
            <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: '#fff', padding: '8px 24px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔥 MOST POPULAR
            </div>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: 'rgba(138,43,226,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', position: 'relative', zIndex: 1 }}>
              <Target size={30} color="#b673f8" />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#fff', lineHeight: 1.2 }}>Professional Websites</h3>
            <p style={{ color: '#aaa', marginBottom: '3rem', minHeight: '50px', fontSize: '1.1rem', fontWeight: 600 }}>Get a Website That Converts Visitors into Customers.</p>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Depending on Requirements</span>
              <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>₹8k - ₹15k <span style={{ fontSize: '2rem', color: '#b673f8' }}>/ $100 - $180</span></div>
              <div style={{ fontSize: '1rem', color: '#888', marginTop: '0.5rem' }}>(Scales to ₹30k+ / $350+ for advanced apps)</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Mobile Responsive</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Lightning Fast</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Admin Dashboard</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Contact Forms</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> SEO Optimized</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Google Analytics</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> Hosting Assistance</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500 }}><CheckCircle2 size={22} color="#b673f8" /> SSL Included</div>
            </div>
            
            <Link to="/contact" state={{ service: "Web Design & Development" }} className="btn btn-primary btn-glow" style={{ width: '100%', padding: '1.2rem', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block', fontSize: '1.1rem' }}>
              Start My Project
            </Link>
          </div>

          {/* Tier 3: Custom Scale */}
          <div className="pricing-card-hover stagger-item" style={{ animationDelay: '0.5s', background: '#fff', padding: '3.5rem 3rem', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#fff0f5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem' }}>
              <Shield size={30} color="#ec4899" />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>Scale Your Business with Custom AI & Enterprise Software</h3>
            <p style={{ color: '#666', marginBottom: '3rem', minHeight: '50px' }}>Custom-architected software, CRMs, and complex AI solutions.</p>
            <div style={{ marginBottom: '3rem' }}>
              <span style={{ color: '#888', fontSize: '1rem', fontWeight: 600 }}>Custom Scope</span>
              <div style={{ fontSize: '3.6rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>₹50k+ <span style={{ fontSize: '2rem', color: '#ec4899' }}>/ $600+</span></div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444' }}>
                <CheckCircle2 size={20} color="#ec4899" /> Free post-launch support
              </div>
            </div>
            
            <Link to="/contact" state={{ service: "Other" }} className="btn" style={{ width: '100%', padding: '1.2rem', background: '#f8f9fa', color: '#111', border: '1px solid #ddd', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block' }}>
              Request a Custom Quote
            </Link>
          </div>

        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="stagger-item" style={{ animationDelay: '0.7s', padding: '6rem 2rem', background: '#fafafa', borderTop: '1px solid #eee', marginTop: '2rem', borderRadius: '32px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '3rem' }}>Why Choose CastFlow?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <Zap size={32} color="#3b82f6" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Fast Delivery</h3>
            </div>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <Shield size={32} color="#10b981" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Secure Code</h3>
            </div>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <Target size={32} color="#b673f8" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Modern UI</h3>
            </div>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <Rocket size={32} color="#ef4444" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>AI Powered</h3>
            </div>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <Shield size={32} color="#f59e0b" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Lifetime Ownership</h3>
            </div>
            <div style={{ padding: '2rem', background: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
              <CheckCircle2 size={32} color="#3b82f6" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.5rem' }}>Free Support</h3>
            </div>
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
          <Link to="/contact" state={{ service: "Other" }} className="btn" style={{ background: '#fff', color: 'var(--primary-color)', padding: '1rem 2.5rem', borderRadius: '30px', fontWeight: 800, fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
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
              <div 
                key={idx} 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ 
                  background: '#f8f9fa', 
                  padding: '1.5rem', 
                  borderRadius: '16px',
                  border: '1px solid #eee',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  {openFaq === idx ? <ChevronUp size={20} color="#888" /> : <ChevronDown size={20} color="#888" />}
                </div>
                <div style={{ 
                  maxHeight: openFaq === idx ? '200px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s ease',
                  opacity: openFaq === idx ? 1 : 0
                }}>
                  <p style={{ marginTop: '1.5rem', color: '#555', lineHeight: 1.7, fontSize: '1.1rem', borderTop: '1px solid #ddd', paddingTop: '1.5rem' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default PricingPage;
