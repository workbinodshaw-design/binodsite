import React, { useEffect, useState } from 'react';
import { MessageSquare, Workflow, Database, LineChart, ArrowRight, MessageCircle } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LeadFormModal from '../components/LeadFormModal';
import InteractiveDemo from '../components/InteractiveDemo';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';

const AiAutomationService = () => {
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
      id: 'support-chatbots',
      title: 'Customer Support Chatbots',
      description: 'AI agents trained on your business data to handle customer inquiries 24/7 without human intervention.',
      icon: <MessageSquare size={32} />
    },
    {
      id: 'crm-automation',
      title: 'CRM & Workflow Automation',
      description: 'Connect your tools (HubSpot, Slack, Email) to automatically move data and trigger actions. No more manual entry.',
      icon: <Workflow size={32} />
    },
    {
      id: 'lead-generation',
      title: 'Automated Lead Generation',
      description: 'Scrape prospects, qualify leads via AI, and send personalized outreach emails on complete autopilot.',
      icon: <Database size={32} />
    },
    {
      id: 'data-analysis',
      title: 'AI Data Analysis & Reporting',
      description: 'Instantly turn messy spreadsheets into clear, actionable business reports generated weekly by AI.',
      icon: <LineChart size={32} />
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          AI & AUTOMATION
        </div>
        <h1 className="headline" style={{ fontSize: '3.5rem' }}>We Build Systems That Scale.</h1>
        <p className="description" style={{ margin: '0 auto', maxWidth: '700px', fontSize: '1.2rem' }}>
          Stop losing leads and wasting time on manual entry. Experience our custom automation workflows directly below.
        </p>
      </div>

      {/* INTERACTIVE DEMO INJECTED HERE */}
      <InteractiveDemo />

      <div className="text-center" style={{ marginTop: '2rem', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem' }}>What process can we automate?</h2>
        <p className="text-secondary" style={{ maxWidth: '600px', margin: '1rem auto' }}>
          Select the type of automation you need, and we'll gather some quick details to get started.
        </p>
      </div>

      <div className="service-options-grid">
        {serviceOptions.map((option) => (
          <div 
            key={option.id} 
            className="service-option-card glass"
            onClick={() => openLeadForm(`AI Automation: ${option.title}`)}
          >
            <div className="service-icon lavender mb-4">
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
            <h4>Need immediate AI advice?</h4>
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

export default AiAutomationService;
