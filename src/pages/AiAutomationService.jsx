import React, { useEffect, useState } from 'react';
import { MessageSquare, Workflow, Database, LineChart, ArrowRight } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import LeadFormModal from '../components/LeadFormModal';
import InteractiveDemo from '../components/InteractiveDemo';
import ProtectedWhatsAppLink from '../components/ProtectedWhatsAppLink';
import SEO from '../components/SEO';

const AiAutomationService = () => {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openLeadForm = (serviceName) => setSelectedService(serviceName);
  const closeLeadForm = () => setSelectedService(null);

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
    <>
      <SEO 
        title="AI Automation Services & n8n Experts India"
        description="Automate your entire business workflow with custom AI Agents, n8n, Make.com, and ChatGPT integrations. Stop doing manual work."
        keywords="AI Automation Agency India, n8n expert, Make.com developer, AI Agent Developer, ChatGPT Integration, Business Automation"
        url="/services/ai-automation"
      />
      
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• AI & AUTOMATION</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            We build systems that <span style={{ color: '#1A73E8' }}>scale.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Stop losing leads and wasting time on manual entry. Experience our custom automation workflows directly below.
          </p>
        </div>

        {/* INTERACTIVE DEMO */}
        <div style={{ marginBottom: '6rem' }}>
          <InteractiveDemo />
        </div>

        {/* What process can we automate? */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 2.5rem)', fontWeight: 600, marginBottom: '1rem' }}>What process can we automate?</h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Select the type of automation you need, and we'll gather some quick details to get started.
          </p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '4rem' }}>
          {serviceOptions.map((option) => (
            <div 
              key={option.id} 
              onClick={() => openLeadForm(`AI Automation: ${option.title}`)}
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

export default AiAutomationService;
