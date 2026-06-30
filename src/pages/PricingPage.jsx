import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Target, Rocket, BarChart, ChevronDown, ChevronUp, HeartHandshake, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const pricingData = [
  {
    id: 'automations',
    icon: <Zap size={30} color="#3b82f6" />,
    iconBg: '#f0f5ff',
    title: 'Save 10+ Hours Every Week with Custom Automation',
    shortTitle: 'Custom Automation',
    desc: 'Perfect for automating repetitive tasks and saving hours of manual work.',
    priceLabel: 'Starting from',
    priceINR: '₹5,000',
    priceUSD: '/ $60',
    priceNote: '',
    features: [
      'Single-workflow automations',
      'Basic WhatsApp/Email Bots',
      'Data scraping & entry',
      'Cost scales with requirements',
      'Free post-launch support'
    ],
    linkState: 'AI Automation',
    linkLabel: 'Automate My Work',
    highlight: false,
    delay: '0.1s',
    featureColor: '#3b82f6'
  },
  {
    id: 'websites',
    icon: <Target size={30} color="#b673f8" />,
    iconBg: 'rgba(138,43,226,0.2)',
    title: 'Professional Websites',
    shortTitle: 'Websites & Web Apps',
    desc: 'Get a Website That Converts Visitors into Customers.',
    priceLabel: 'Depending on Requirements',
    priceINR: '₹8k - ₹15k',
    priceUSD: '/ $100 - $180',
    priceNote: '(Scales to ₹30k+ / $350+ for advanced apps)',
    features: [
      'Mobile Responsive',
      'Lightning Fast',
      'Admin Dashboard',
      'Contact Forms',
      'SEO Optimized',
      'Google Analytics',
      'Hosting Assistance',
      'SSL Included'
    ],
    linkState: 'Web Design & Development',
    linkLabel: 'Start My Project',
    highlight: true,
    delay: '0.3s',
    featureColor: '#b673f8'
  },
  {
    id: 'enterprise',
    icon: <Shield size={30} color="#ec4899" />,
    iconBg: '#fff0f5',
    title: 'Scale Your Business with Custom AI & Enterprise Software',
    shortTitle: 'Enterprise & AI Solutions',
    desc: 'Custom-architected software, CRMs, and complex AI solutions.',
    priceLabel: 'Custom Scope',
    priceINR: '₹50k+',
    priceUSD: '/ $600+',
    priceNote: '',
    features: [
      'Custom SaaS Dashboards',
      'NLP Email Readers & Sorting',
      'Infinite Scalability & Security',
      'Dedicated 24/7 Support',
      'Free post-launch support'
    ],
    linkState: 'Other',
    linkLabel: 'Request a Custom Quote',
    highlight: false,
    delay: '0.5s',
    featureColor: '#ec4899'
  }
];

const faqs = [
  { q: "Can I pay 50% first?", a: "Yes, for standard projects we require a 50% upfront deposit to commence work, and the remaining 50% upon successful deployment and approval." },
  { q: "How long will it take?", a: "It depends on the scope, but our maximum delivery time is 5 days for a standard business website." },
  { q: "Can you redesign my existing website?", a: "Absolutely. We can take your outdated site and migrate it to our high-performance architecture with a complete UI/UX overhaul." },
  { q: "Do you provide hosting?", a: "Yes. We handle all the technical heavy lifting, including premium, lightning-fast hosting so you never have to worry about servers." },
  { q: "Do you provide maintenance?", a: "Yes, we offer ongoing maintenance and support packages to ensure your platform stays secure, updated, and blazing fast." },
  { q: "Can you make AI chatbots?", a: "Yes, we specialize in building custom AI agents trained specifically on your company's knowledge base to handle customer support or internal tasks." }
];

const PricingPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedMobileCard, setSelectedMobileCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderFullCard = (plan, isModal = false) => {
    if (plan.highlight) {
      return (
        <div className={`pricing-card-hover ${!isModal ? 'stagger-item' : ''}`} style={{ animationDelay: plan.delay, background: '#111', padding: isMobile && isModal ? '2rem 1.5rem' : '3.5rem 3rem', borderRadius: '32px', boxShadow: '0 0 40px rgba(138,43,226,0.4)', position: 'relative', border: '2px solid rgba(138,43,226,0.6)', transform: !isModal && !isMobile ? 'scale(1.02)' : 'none', zIndex: 2, overflow: 'hidden' }}>
          {!isModal && <div style={{ position: 'absolute', top: 0, left: '-100%', width: '50%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)', transform: 'skewX(-20deg)', animation: 'shimmer 3s infinite' }}></div>}
          <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary-color)', color: '#fff', padding: '8px 24px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 800, letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 10 }}>
            🔥 MOST POPULAR
          </div>
          <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: plan.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', position: 'relative', zIndex: 1, marginTop: isMobile && isModal ? '1rem' : 0 }}>
            {plan.icon}
          </div>
          <h3 style={{ fontSize: isMobile ? '1.5rem' : '2rem', fontWeight: 800, marginBottom: '1rem', color: '#fff', lineHeight: 1.2 }}>{plan.title}</h3>
          <p style={{ color: '#aaa', marginBottom: '2rem', minHeight: isMobile ? 'auto' : '50px', fontSize: '1rem', fontWeight: 600 }}>{plan.desc}</p>
          <div style={{ marginBottom: '2.5rem' }}>
            <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>{plan.priceLabel}</span>
            <div style={{ fontSize: isMobile ? '2.5rem' : '3.6rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{plan.priceINR} <span style={{ fontSize: isMobile ? '1.5rem' : '2rem', color: plan.featureColor }}>{plan.priceUSD}</span></div>
            {plan.priceNote && <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>{plan.priceNote}</div>}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
            {plan.features.map((feat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#eee', fontWeight: 500, fontSize: '0.95rem' }}>
                <CheckCircle2 size={20} color={plan.featureColor} style={{ flexShrink: 0 }} /> {feat}
              </div>
            ))}
          </div>
          
          <Link to="/contact" state={{ service: plan.linkState }} className="btn btn-primary btn-glow" style={{ width: '100%', padding: '1rem', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block', fontSize: '1rem' }}>
            {plan.linkLabel}
          </Link>
        </div>
      );
    }

    return (
      <div className={`pricing-card-hover ${!isModal ? 'stagger-item' : ''}`} style={{ animationDelay: plan.delay, background: '#fff', padding: isMobile && isModal ? '2rem 1.5rem' : '3.5rem 3rem', borderRadius: '32px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.05)', position: 'relative' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: plan.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
          {plan.icon}
        </div>
        <h3 style={{ fontSize: isMobile ? '1.5rem' : '1.5rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.3 }}>{plan.title}</h3>
        <p style={{ color: '#666', marginBottom: '2rem', minHeight: isMobile ? 'auto' : '50px', fontSize: '0.95rem' }}>{plan.desc}</p>
        <div style={{ marginBottom: '2.5rem' }}>
          <span style={{ color: '#888', fontSize: '0.9rem', fontWeight: 600 }}>{plan.priceLabel}</span>
          <div style={{ fontSize: isMobile ? '2.5rem' : '3.6rem', fontWeight: 900, color: '#111', lineHeight: 1 }}>{plan.priceINR} <span style={{ fontSize: isMobile ? '1.5rem' : '2rem', color: plan.featureColor }}>{plan.priceUSD}</span></div>
          {plan.priceNote && <div style={{ fontSize: '0.9rem', color: '#888', marginTop: '0.5rem' }}>{plan.priceNote}</div>}
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
          {plan.features.map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#444', fontSize: '0.95rem' }}>
              <CheckCircle2 size={20} color={plan.featureColor} style={{ flexShrink: 0 }} /> {feat}
            </div>
          ))}
        </div>
        
        <Link to="/contact" state={{ service: plan.linkState }} className="btn" style={{ width: '100%', padding: '1rem', background: '#f8f9fa', color: '#111', border: '1px solid #ddd', borderRadius: '16px', fontWeight: 700, textAlign: 'center', display: 'block', fontSize: '1rem' }}>
          {plan.linkLabel}
        </Link>
      </div>
    );
  };

  return (
    <>
      <SEO 
        title="Transparent Pricing | Web Development & AI Automation"
        description="Clear, transparent pricing for custom web development, MVP creation, and AI workflow automation. No hidden fees."
        keywords="Web Development Cost India, AI Automation Pricing, Custom MVP Development Price, React Developer Rates"
        url="/pricing"
      />
      <div className="pricing-page" style={{ paddingTop: '100px', minHeight: '100vh', background: '#f8f9fa', color: '#111', fontFamily: '"Inter", sans-serif' }}>
        
        <section style={{ padding: '6rem 2rem 2rem 2rem', textAlign: 'center', position: 'relative' }}>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', padding: '6px 16px', background: 'rgba(138,43,226,0.1)', color: 'var(--primary-color)', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '2rem' }}>
              RUTHLESSLY TRANSPARENT PRICING
            </div>
            <h1 style={{ fontSize: isMobile ? '2.5rem' : '4.5rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-1.5px', color: '#111' }}>
              We Refuse to <br />
              <span style={{ color: 'var(--primary-color)' }}>Overcharge You.</span>
            </h1>
            <p style={{ fontSize: isMobile ? '1rem' : '1.3rem', color: '#555', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '800px', margin: '0 auto' }}>
              We analyze your exact requirements, calculate the precise cost of development, and charge you exactly that amount. <strong>Not a single rupee more.</strong>
            </p>
          </div>
        </section>

        {/* PRICING CARDS */}
        <section style={{ padding: isMobile ? '1rem' : '2rem 2rem 6rem 2rem' }}>
          {!isMobile ? (
            /* DESKTOP FULL GRID */
            <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', alignItems: 'center' }}>
              {pricingData.map(plan => (
                <React.Fragment key={plan.id}>
                  {renderFullCard(plan)}
                </React.Fragment>
              ))}
            </div>
          ) : (
            /* MOBILE MINI CARDS (Side-by-Side) */
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', maxWidth: '100%' }}>
              {pricingData.map((plan) => (
                <div 
                  key={plan.id}
                  onClick={() => setSelectedMobileCard(plan)}
                  style={{ 
                    background: plan.highlight ? '#111' : '#fff', 
                    color: plan.highlight ? '#fff' : '#111',
                    borderRadius: '16px', 
                    padding: '1.5rem 0.25rem',
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    textAlign: 'center',
                    boxShadow: plan.highlight ? '0 10px 25px rgba(138,43,226,0.25)' : '0 8px 15px rgba(0,0,0,0.04)',
                    border: plan.highlight ? '1px solid rgba(138,43,226,0.6)' : '1px solid rgba(0,0,0,0.04)',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'transform 0.2s',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {plan.highlight && (
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', padding: '3px', background: 'var(--primary-color)', color: '#fff', fontSize: '0.6rem', fontWeight: 800 }}>POPULAR</div>
                  )}
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: plan.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', marginTop: plan.highlight ? '0.75rem' : '0' }}>
                    {React.cloneElement(plan.icon, { size: 18 })}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 900, color: plan.highlight ? '#fff' : '#111', marginBottom: '0.2rem' }}>{plan.priceINR}</div>
                  <h4 style={{ fontSize: '0.65rem', fontWeight: 600, color: plan.highlight ? '#e0b3ff' : '#888', lineHeight: 1.3, padding: '0 2px' }}>{plan.shortTitle}</h4>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: plan.featureColor, marginTop: '0.5rem' }}>View Info</div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MOBILE MODAL POPUP */}
        {isMobile && selectedMobileCard && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', backdropFilter: 'blur(5px)' }} onClick={() => setSelectedMobileCard(null)}>
            <div style={{ width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto', position: 'relative', animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelectedMobileCard(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: selectedMobileCard.highlight ? '#fff' : '#111', cursor: 'pointer', zIndex: 99 }}>
                <X size={20} />
              </button>
              {renderFullCard(selectedMobileCard, true)}
            </div>
          </div>
        )}

        {/* TRUST SECTION */}
        <section className="stagger-item" style={{ animationDelay: '0.7s', padding: isMobile ? '3rem 1rem' : '6rem 2rem', background: '#fafafa', borderTop: '1px solid #eee', marginTop: '2rem', borderRadius: '32px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 900, marginBottom: '2rem' }}>Why Choose CastFlow?</h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Zap size={28} color="#3b82f6" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Fast Delivery</h3>
              </div>
              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Shield size={28} color="#10b981" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Secure Code</h3>
              </div>
              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <Target size={28} color="#b673f8" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Modern UI</h3>
              </div>
              <div style={{ padding: '1.5rem', background: '#fff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <CheckCircle2 size={28} color="#3b82f6" style={{ margin: '0 auto 0.5rem auto', display: 'block' }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 800 }}>Free Support</h3>
              </div>
            </div>
          </div>
        </section>

        {/* 3. VALUE PROPOSITION BANNER */}
        <section style={{ padding: isMobile ? '3rem 1.5rem' : '4rem 2rem', background: 'var(--primary-color)', color: '#fff', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <HeartHandshake size={isMobile ? 36 : 48} style={{ margin: '0 auto 1.5rem auto', opacity: 0.9 }} />
            <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Honest Pricing. Zero Surprises.
            </h2>
            <p style={{ fontSize: isMobile ? '1rem' : '1.2rem', opacity: 0.9, lineHeight: 1.6, marginBottom: '2rem' }}>
              We only charge for the exact value and architecture you require.
            </p>
            <Link to="/contact" state={{ service: "Other" }} className="btn" style={{ background: '#fff', color: 'var(--primary-color)', padding: '1rem 2rem', borderRadius: '30px', fontWeight: 800, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Get an Honest Quote <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        {/* 4. FAQ SECTION */}
        <section style={{ padding: isMobile ? '3rem 1rem' : '6rem 2rem', background: '#fff' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: 800, marginBottom: '1rem' }}>Pricing FAQ</h2>
              <p style={{ color: '#666', fontSize: isMobile ? '1rem' : '1.2rem' }}>Everything you need to know about our honest pricing model.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {faqs.map((faq, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  style={{ background: '#f8f9fa', padding: isMobile ? '1.2rem' : '1.5rem', borderRadius: '16px', border: '1px solid #eee', cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  <div style={{ fontSize: isMobile ? '1rem' : '1.2rem', fontWeight: 700, color: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {faq.q}
                    {openFaq === idx ? <ChevronUp size={20} color="#888" /> : <ChevronDown size={20} color="#888" />}
                  </div>
                  <div style={{ maxHeight: openFaq === idx ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease', opacity: openFaq === idx ? 1 : 0 }}>
                    <p style={{ marginTop: '1rem', color: '#555', lineHeight: 1.6, fontSize: isMobile ? '0.95rem' : '1.1rem', borderTop: '1px solid #ddd', paddingTop: '1rem' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default PricingPage;
