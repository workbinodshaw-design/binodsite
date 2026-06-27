import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, ShoppingCart, Globe, ArrowRight } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LeadFormModal from '../components/LeadFormModal';

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

      <div className="content-section" style={{ minHeight: 'auto', paddingBottom: '4rem', marginTop: '6rem' }}>
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
