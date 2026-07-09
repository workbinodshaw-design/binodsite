import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Zap, Shield, Target, Rocket, BarChart, ChevronDown, ChevronUp, HeartHandshake, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const pricingData = [
  {
    id: 'automations',
    icon: <Zap size={30} color="#1A73E8" />,
    iconBg: '#e6f0fd',
    title: 'Custom Automation',
    desc: 'Perfect for automating repetitive tasks and saving hours of manual work.',
    priceLabel: 'Starting from',
    priceINR: '₹5,000',
    priceUSD: '/ $60',
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
    featureColor: '#1A73E8'
  },
  {
    id: 'websites',
    icon: <Target size={30} color="#fff" />,
    iconBg: 'rgba(255,255,255,0.2)',
    title: 'Professional Websites',
    desc: 'Get a High-Performance Website That Converts Visitors into Customers.',
    priceLabel: 'Depending on Requirements',
    priceINR: '₹8k - ₹15k',
    priceUSD: '/ $100+',
    features: [
      'Mobile Responsive',
      'Lightning Fast',
      'Admin Dashboard',
      'Contact Forms',
      'SEO Optimized',
      'Google Analytics'
    ],
    linkState: 'Web Design & Development',
    linkLabel: 'Start My Project',
    highlight: true,
    featureColor: '#fff'
  },
  {
    id: 'enterprise',
    icon: <Shield size={30} color="#1A1A1A" />,
    iconBg: '#f5f5f5',
    title: 'Enterprise & AI Solutions',
    desc: 'Custom-architected software, CRMs, and complex AI solutions.',
    priceLabel: 'Custom Scope',
    priceINR: '₹50k+',
    priceUSD: '/ $600+',
    features: [
      'Custom SaaS Dashboards',
      'NLP Email Readers',
      'Infinite Scalability',
      'Dedicated 24/7 Support',
      'Free post-launch support'
    ],
    linkState: 'Other',
    linkLabel: 'Request a Quote',
    highlight: false,
    featureColor: '#1A1A1A'
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Transparent Pricing | Web Development & AI Automation"
        description="Clear, transparent pricing for custom web development, MVP creation, and AI workflow automation. No hidden fees."
      />
      
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• RUTHLESSLY TRANSPARENT</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            We refuse to <span style={{ color: '#1A73E8' }}>overcharge you.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            We analyze your exact requirements, calculate the precise cost of development, and charge you exactly that amount. Not a single rupee more.
          </p>
        </div>

        {/* Pricing Bento Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '2rem',
          marginBottom: '6rem'
        }}>
          {pricingData.map((plan) => (
            <div 
              key={plan.id}
              style={{
                background: plan.highlight ? '#1A73E8' : '#fff',
                color: plan.highlight ? '#fff' : '#1A1A1A',
                borderRadius: '24px',
                padding: '2.5rem',
                border: plan.highlight ? 'none' : '1px solid rgba(0,0,0,0.05)',
                boxShadow: plan.highlight ? '0 20px 50px rgba(26,115,232,0.3)' : '0 10px 40px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transform: plan.highlight ? 'scale(1.02)' : 'scale(1)',
                zIndex: plan.highlight ? 10 : 1
              }}
            >
              {plan.highlight && (
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', background: '#C4F042', color: '#1A1A1A', padding: '6px 20px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '1px' }}>
                  MOST POPULAR
                </div>
              )}
              
              <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: plan.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {plan.icon}
              </div>
              
              <h3 style={{ fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>{plan.title}</h3>
              <p style={{ color: plan.highlight ? 'rgba(255,255,255,0.9)' : '#666', fontSize: '0.95rem', marginBottom: '2rem', minHeight: '40px' }}>{plan.desc}</p>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: plan.highlight ? 'rgba(255,255,255,0.8)' : '#888', marginBottom: '0.2rem' }}>{plan.priceLabel}</div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-1px' }}>
                  {plan.priceINR} <span style={{ fontSize: '1.5rem', color: plan.highlight ? 'rgba(255,255,255,0.8)' : '#888' }}>{plan.priceUSD}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, marginBottom: '2rem' }}>
                {plan.features.map((feat, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.95rem', fontWeight: 500 }}>
                    <CheckCircle2 size={20} color={plan.featureColor} style={{ flexShrink: 0 }} /> {feat}
                  </div>
                ))}
              </div>
              
              <Link 
                to="/contact" 
                state={{ service: plan.linkState }} 
                style={{ 
                  background: plan.highlight ? '#C4F042' : '#f5f5f5', 
                  color: '#1A1A1A', 
                  padding: '1.2rem', 
                  borderRadius: '16px', 
                  fontWeight: 600, 
                  textAlign: 'center', 
                  textDecoration: 'none',
                  display: 'block',
                  transition: 'background 0.2s'
                }}
              >
                {plan.linkLabel}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQs */}
        <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '6rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 600, marginBottom: '1rem' }}>Pricing FAQ</h2>
            <p style={{ color: '#666' }}>Everything you need to know about our honest pricing model.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.3s ease' }}
              >
                <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1A1A1A', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {faq.q}
                  {openFaq === idx ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
                </div>
                <div style={{ maxHeight: openFaq === idx ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease', opacity: openFaq === idx ? 1 : 0 }}>
                  <p style={{ marginTop: '1rem', color: '#666', lineHeight: 1.6, borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1rem' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
