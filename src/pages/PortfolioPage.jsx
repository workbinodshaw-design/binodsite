import React, { useEffect } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const PortfolioPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'AIVerse Hub',
      shortName: 'AIVerse Hub',
      description: 'The ultimate community-curated directory for discovering, comparing, and mastering the world\'s best Artificial Intelligence tools. Includes a library of 3,000+ AI tools.',
      tags: ['React', 'Next.js', 'Tailwind CSS'],
      liveUrl: 'https://testpush-mauve.vercel.app/',
      githubUrl: '#',
      bgColor: '#111111'
    },
    {
      id: 2,
      title: 'WhatsApp Automation',
      shortName: 'WA Bot',
      description: 'A powerful automated system that handles customer inquiries and acts as a 24/7 intelligent agent directly on WhatsApp.',
      tags: ['Node.js', 'WhatsApp API', 'OpenAI'],
      liveUrl: '#',
      githubUrl: '#',
      bgColor: '#1A73E8'
    },
    {
      id: 3,
      title: 'Auto Email Sender',
      shortName: 'MailFlow',
      description: 'A scalable bulk-emailing tool designed to programmatically send personalized emails to thousands of leads with high deliverability.',
      tags: ['Python', 'SMTP', 'React'],
      liveUrl: '#',
      githubUrl: '#',
      bgColor: '#8A2BE2'
    },
    {
      id: 4,
      title: 'AI Email Reader',
      shortName: 'Inbox AI',
      description: 'An intelligent inbox assistant that reads incoming emails, categorizes them using NLP, and extracts critical information automatically.',
      tags: ['Python', 'IMAP', 'NLP'],
      liveUrl: '#',
      githubUrl: '#',
      bgColor: '#FF7F50'
    },
    {
      id: 5,
      title: 'Insta Auto Reply',
      shortName: 'InstaBot',
      description: 'A social media automation script that monitors posts and automatically replies to specific keyword comments to drive engagement.',
      tags: ['JavaScript', 'Graph API', 'Webhooks'],
      liveUrl: '#',
      githubUrl: '#',
      bgColor: '#E1306C'
    },
    {
      id: 6,
      title: 'Frontend UI Design',
      shortName: 'UI System',
      description: 'Premium, modern website interfaces built with React and Tailwind. Focusing on glassmorphism, fluid animations, and perfect UX.',
      tags: ['React', 'UI/UX', 'Figma'],
      liveUrl: '#',
      githubUrl: '#',
      bgColor: '#111111'
    }
  ];

  return (
    <>
      <SEO 
        title="Our Work & Live Demos | CastFlow Agency"
        description="Explore our portfolio of premium web applications, AI automation tools, and digital solutions."
        keywords="Web Development Portfolio, React Projects, AI Automation Case Studies, Custom Software Agency"
        url="/portfolio"
      />
      
      <div style={{ padding: '8rem 1.5rem 4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', background: '#fff' }}>
        
        {/* Page Header */}
        <div className="reveal-fade" style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26, 115, 232, 0.05)', padding: '6px 16px', borderRadius: '30px', color: '#1A73E8', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '2rem', border: '1px solid rgba(26, 115, 232, 0.1)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A73E8', display: 'inline-block' }}></span>
            FEATURED WORK
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto', color: '#111' }}>
            Projects & <span style={{ color: '#1A73E8' }}>Live Demos.</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '700px', fontSize: 'clamp(1.05rem, 3vw, 1.25rem)', lineHeight: '1.6', color: '#666' }}>
            Explore our latest high-performance web architectures, custom SaaS platforms, and intelligent AI automation systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem', marginBottom: '8rem' }}>
          {projects.map((project) => (
            <div 
              key={project.id}
              style={{ 
                background: '#fff', 
                borderRadius: '24px', 
                border: '1px solid rgba(0,0,0,0.06)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)';
              }}
            >
              {/* Top Banner Area (Dark) */}
              <div style={{ background: project.bgColor, height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center', position: 'relative' }}>
                <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700, margin: 0, letterSpacing: '-0.5px', zIndex: 2 }}>{project.shortName}</h2>
                {/* Subtle overlay gradient */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)', zIndex: 1 }}></div>
              </div>

              {/* Bottom Content Area (Light) */}
              <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '0 0 1rem 0', color: '#111' }}>{project.title}</h3>
                <p style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '2rem', flexGrow: 1 }}>
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '2.5rem' }}>
                  {project.tags.map((tag, i) => (
                    <span key={i} style={{ padding: '6px 14px', background: 'rgba(26,115,232,0.05)', color: '#1A73E8', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(26,115,232,0.1)' }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      background: '#1A73E8', 
                      color: '#fff', 
                      padding: '0.8rem', 
                      borderRadius: '12px', 
                      textDecoration: 'none', 
                      fontWeight: 600, 
                      fontSize: '0.95rem',
                      transition: 'background 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#1557b0'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#1A73E8'}
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                  
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={{ 
                      flex: 1, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      background: '#fff', 
                      color: '#111', 
                      border: '1px solid #ddd',
                      padding: '0.8rem', 
                      borderRadius: '12px', 
                      textDecoration: 'none', 
                      fontWeight: 600, 
                      fontSize: '0.95rem',
                      transition: 'background 0.2s, borderColor 0.2s'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.background = '#f9f9f9';
                      e.currentTarget.style.borderColor = '#ccc';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.background = '#fff';
                      e.currentTarget.style.borderColor = '#ddd';
                    }}
                  >
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Standard CTA */}
        <div className="reveal-scale" style={{ paddingBottom: '4rem' }}>
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
