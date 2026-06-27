import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, ShoppingCart, Globe, ArrowRight, MessageCircle, Zap, TrendingUp, ShieldCheck, MessageSquare } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LeadFormModal from '../components/LeadFormModal';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';

const WebDevService = () => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLeadForm = (serviceName) => {
    setSelectedService(serviceName);
  };

  const closeLeadForm = () => {
    setSelectedService(null);
  };

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
    <div className="page-container">
      <div className="page-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          WEB DEVELOPMENT
        </div>
        <h1 className="headline">What are you looking to build?</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '600px' }}>
          Select the type of web project you need, and we'll gather some quick details to get started.
        </p>
      </div>

      {/* Performance Visualizer */}
      <div className="performance-showcase glass" style={{ maxWidth: '1000px', margin: '4rem auto', padding: '3rem', borderRadius: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Why top brands choose us</h2>
          <p style={{ color: 'var(--text-secondary)' }}>We don't just build websites; we engineer high-performance conversion machines.</p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <div className="stat-card" style={{ flex: '1', minWidth: '250px', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(255,107,107,0.2)' }}>
            <Zap size={40} color="#FF6B6B" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#FF6B6B' }}>0.8s</div>
            <p style={{ color: 'var(--text-secondary)' }}>Average Load Time</p>
          </div>
          
          <div className="stat-card" style={{ flex: '1', minWidth: '250px', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(163,136,255,0.2)' }}>
            <TrendingUp size={40} color="#a388ff" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#a388ff' }}>+127%</div>
            <p style={{ color: 'var(--text-secondary)' }}>Conversion Increase</p>
          </div>

          <div className="stat-card" style={{ flex: '1', minWidth: '250px', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '20px', textAlign: 'center', border: '1px solid rgba(37,211,102,0.2)' }}>
            <ShieldCheck size={40} color="#25D366" style={{ margin: '0 auto 1rem' }} />
            <div style={{ fontSize: '3rem', fontWeight: '800', color: '#25D366' }}>99.9%</div>
            <p style={{ color: 'var(--text-secondary)' }}>Server Uptime</p>
          </div>
        </div>
      </div>

      <div className="service-options-grid">
        {serviceOptions.map((option) => (
          <div 
            key={option.id} 
            className="service-option-card glass"
            onClick={() => openLeadForm(`Web Development: ${option.title}`)}
          >
            <div className="service-icon coral mb-4">
              {option.icon}
            </div>
            <h3>{option.title}</h3>
            <p>{option.description}</p>
            <div className="service-action">
              Request this service <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Trust Tile */}
      <div className="whatsapp-trust-wrapper" style={{ marginTop: '4rem' }}>
        <ProtectedWhatsAppLink phoneNumber="919394683474" className="whatsapp-trust-tile glass">
          <div className="whatsapp-icon-bg">
            <MessageSquare size={32} color="#fff" />
          </div>
          <div className="whatsapp-trust-text">
            <h4>Need immediate advice?</h4>
            <p>Trusted by forward-thinking businesses. Skip the automated forms and chat with an expert on WhatsApp.</p>
          </div>
        </ProtectedWhatsAppLink>
      </div>

      <div className="content-section" style={{ minHeight: 'auto', paddingBottom: '4rem', marginTop: '2rem' }}>
        <ContactSection />
      </div>

      {selectedService && (
        <LeadFormModal 
          serviceName={selectedService} 
          onClose={closeLeadForm} 
        />
      )}
    </div>
  );
};

export default WebDevService;
