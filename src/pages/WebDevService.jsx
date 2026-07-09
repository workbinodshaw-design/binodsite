import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, ShoppingCart, Globe, ArrowRight, Zap, TrendingUp, ShieldCheck, MessageSquare } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LeadFormModal from '../components/LeadFormModal';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';
import SEO from '../components/SEO';

const WebDevService = () => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLeadForm = (serviceName) => setSelectedService(serviceName);
  const closeLeadForm = () => setSelectedService(null);

  const serviceOptions = [
    {
      id: 'saas',
      title: 'SaaS Platform Development',
      description: 'Custom software architectures, dashboards, and scalable databases built for thousands of users.',
      icon: <Monitor size={32} />
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce Solutions',
      description: 'High-converting online stores built on Shopify, WooCommerce, or custom headless architectures.',
      icon: <ShoppingCart size={32} />
    },
    {
      id: 'landing-pages',
      title: 'High-Converting Landing Pages',
      description: 'Ultra-fast, beautifully designed marketing pages optimized strictly for lead generation.',
      icon: <Smartphone size={32} />
    },
    {
      id: '3d-webgl',
      title: '3D & Immersive WebGL',
      description: 'Stand out from competitors with jaw-dropping 3D interactive experiences directly in the browser.',
      icon: <Globe size={32} />
    }
  ];

  return (
    <>
      <SEO 
        title="Custom Web Development & MVP Agency India"
        description="We build high-performance React applications, custom CRM dashboards, and e-commerce platforms. Lightning fast and built to scale."
        keywords="Web Developer India, React JS Developer, Next.js Expert, MVP Development, Custom CRM, High Performance Websites"
        url="/services/web-development"
      />
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• WEB DEVELOPMENT</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            What are you looking to <span style={{ color: '#1A73E8' }}>build?</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Select the type of web project you need, and we'll gather some quick details to get started.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <Zap size={32} color="#1A73E8" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1A1A1A' }}>0.8s</div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Average Load Time</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <TrendingUp size={32} color="#C4F042" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1A1A1A' }}>+127%</div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Conversion Increase</p>
          </div>
          <div style={{ background: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <ShieldCheck size={32} color="#1A1A1A" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '2.5rem', fontWeight: 600, color: '#1A1A1A' }}>99.9%</div>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>Server Uptime</p>
          </div>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {serviceOptions.map((option) => (
            <div 
              key={option.id} 
              onClick={() => openLeadForm(`Web Design & Development: ${option.title}`)}
              style={{ 
                background: '#fff', 
                borderRadius: '24px', 
                padding: '2rem', 
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{ width: '48px', height: '48px', background: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#1A73E8' }}>
                {option.icon}
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.8rem', color: '#1A1A1A' }}>{option.title}</h3>
              <p style={{ color: '#666', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1, fontSize: '0.95rem' }}>{option.description}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: '#1A73E8', fontSize: '0.9rem' }}>
                Request this service <ArrowRight size={16} />
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Trust Tile */}
        <div style={{ marginTop: '2rem', marginBottom: '4rem' }}>
          <ProtectedWhatsAppLink phoneNumber="919394683474" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', background: '#1A1A1A', color: '#fff', padding: '2rem', borderRadius: '24px', textDecoration: 'none' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MessageSquare size={32} color="#fff" />
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 600, margin: '0 0 0.5rem 0' }}>Need immediate advice?</h4>
              <p style={{ margin: 0, color: '#A0A0A0', fontSize: '0.95rem', lineHeight: 1.5 }}>Trusted by forward-thinking businesses. Skip the automated forms and chat with an expert on WhatsApp.</p>
            </div>
          </ProtectedWhatsAppLink>
        </div>

        <ContactSection />

        {selectedService && (
          <LeadFormModal 
            serviceName={selectedService} 
            onClose={closeLeadForm} 
          />
        )}
      </div>
    </>
  );
};

export default WebDevService;
