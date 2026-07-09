import React, { useEffect } from 'react';
import { ArrowRight, Code, Cpu, MessageSquare, Mail, Camera, ExternalLink, Zap, Terminal, Server, Phone, Video, Layers } from 'lucide-react';
import SEO from '../components/SEO';

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 0,
      title: 'AIVerse Hub',
      description: 'The ultimate community-curated directory for discovering, comparing, and mastering the world\'s best Artificial Intelligence tools. Includes a library of 3,000+ AI tools.',
      icon: <ExternalLink size={24} color="#ff007f" />,
      tags: ['React', 'Directory', 'AI Tools'],
      url: 'https://testpush-mauve.vercel.app/'
    },
    {
      id: 1,
      title: 'WhatsApp Automation',
      description: 'A powerful automated system that handles customer inquiries and acts as a 24/7 intelligent agent directly on WhatsApp.',
      icon: <MessageSquare size={24} color="#25D366" />,
      tags: ['Node.js', 'WhatsApp API', 'AI'],
    },
    {
      id: 2,
      title: 'Auto Email Sender',
      description: 'A scalable bulk-emailing tool designed to programmatically send personalized emails to thousands of leads.',
      icon: <Mail size={24} color="#EA4335" />,
      tags: ['Python', 'SMTP', 'React'],
    },
    {
      id: 3,
      title: 'AI Email Reader',
      description: 'An intelligent inbox assistant that reads incoming emails, categorizes them using NLP, and extracts critical information.',
      icon: <Zap size={24} color="#FBBC05" />,
      tags: ['Python', 'IMAP', 'NLP'],
    },
    {
      id: 4,
      title: 'Insta Auto Reply',
      description: 'A social media automation script that monitors posts and automatically replies to specific keyword comments.',
      icon: <Camera size={24} color="#E1306C" />,
      tags: ['JavaScript', 'Graph API', 'Webhooks'],
    },
    {
      id: 5,
      title: 'Auto DM Assistant',
      description: 'A robust direct messaging bot that initiates conversations, handles FAQs via AI, and funnels warm leads to a CRM.',
      icon: <Terminal size={24} color="#8A2BE2" />,
      tags: ['Node.js', 'Social APIs', 'CRM'],
    },
    {
      id: 6,
      title: 'AI Calling Agent',
      description: 'An intelligent voice agent that handles inbound and outbound calls, schedules appointments, and provides customer support 24/7.',
      icon: <Phone size={24} color="#FF7F50" />,
      tags: ['Voice AI', 'WebRTC', 'NLP'],
    },
    {
      id: 7,
      title: 'AI Manager',
      description: 'An autonomous digital manager that oversees team tasks, generates progress reports, and optimizes daily workflows using AI.',
      icon: <Server size={24} color="#38bdf8" />,
      tags: ['Autonomous AI', 'Management', 'LLM'],
    },
    {
      id: 8,
      title: 'AI YouTube Creator',
      description: 'A fully automated pipeline that generates video scripts, creates voiceovers, edits clips, and schedules YouTube uploads autonomously.',
      icon: <Video size={24} color="#ff0000" />,
      tags: ['Video AI', 'YouTube API', 'Automation'],
    },
    {
      id: 9,
      title: 'Frontend UI Design',
      description: 'Beautiful, conversion-focused user interfaces designed in Figma and developed flawlessly into high-performance React applications.',
      icon: <Layers size={24} color="#1A73E8" />,
      tags: ['Figma', 'React', 'Tailwind'],
    }
  ];

  return (
    <>
      <SEO 
        title="Our Portfolio | CastFlow AI Automation & Web Dev"
        description="Explore the projects we've built, ranging from massive AI directories to custom WhatsApp automation pipelines."
      />
      
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• PORTFOLIO</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
            Products we have <span style={{ color: '#1A73E8' }}>architected.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', color: '#666', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
            Explore some of our recent builds in Web Development, SaaS platforms, and AI Automation pipelines.
          </p>
        </div>

        {/* Projects Bento Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2rem',
          marginBottom: '6rem'
        }}>
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => project.url ? window.open(project.url, '_blank') : null}
              style={{
                background: '#fff',
                borderRadius: '24px',
                padding: '2.5rem',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                cursor: project.url ? 'pointer' : 'default',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={(e) => {
                if (project.url) {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.05)';
                }
              }}
              onMouseOut={(e) => {
                if (project.url) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div style={{ width: '48px', height: '48px', background: '#f5f5f5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {project.icon}
                </div>
                {project.url && (
                  <div style={{ color: '#A0A0A0' }}>
                    <ExternalLink size={20} />
                  </div>
                )}
              </div>
              
              <h3 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1A1A1A', marginBottom: '1rem' }}>
                {project.title}
              </h3>
              
              <p style={{ color: '#666', lineHeight: 1.6, fontSize: '0.95rem', marginBottom: '2rem', flex: 1 }}>
                {project.description}
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {project.tags.map(tag => (
                  <span 
                    key={tag} 
                    style={{ 
                      fontSize: '0.75rem', 
                      background: '#f5f5f5', 
                      color: '#666', 
                      padding: '4px 10px', 
                      borderRadius: '20px', 
                      fontWeight: 600 
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default PortfolioPage;
