import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, Code, Cpu, MessageSquare, Mail, Camera, ExternalLink, Zap, Terminal, Server } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef(null);

  const skills = [
    { name: 'Frontend Development', icon: <Code size={24} />, desc: 'React, Next.js, UI/UX Design' },
    { name: 'Backend & APIs', icon: <Server size={24} />, desc: 'Node.js, Express, Python' },
    { name: 'AI & Automation', icon: <Cpu size={24} />, desc: 'OpenAI API, Workflow Scripts, Chatbots' },
  ];

  const projects = [
    {
      id: 1,
      title: 'WhatsApp Automation',
      description: 'A powerful automated system that handles customer inquiries and acts as a 24/7 intelligent agent directly on WhatsApp.',
      icon: <MessageSquare size={40} color="#25D366" />,
      tags: ['Node.js', 'WhatsApp API', 'AI'],
      color: 'rgba(37, 211, 102, 0.1)'
    },
    {
      id: 2,
      title: 'Auto Email Sender',
      description: 'A scalable bulk-emailing tool designed to programmatically send personalized emails to thousands of leads.',
      icon: <Mail size={40} color="#EA4335" />,
      tags: ['Python', 'SMTP', 'React'],
      color: 'rgba(234, 67, 53, 0.1)'
    },
    {
      id: 3,
      title: 'AI Email Reader',
      description: 'An intelligent inbox assistant that reads incoming emails, categorizes them using NLP, and extracts critical information.',
      icon: <Zap size={40} color="#FBBC05" />,
      tags: ['Python', 'IMAP', 'NLP'],
      color: 'rgba(251, 188, 5, 0.1)'
    },
    {
      id: 4,
      title: 'Insta Auto Reply',
      description: 'A social media automation script that monitors posts and automatically replies to specific keyword comments.',
      icon: <Camera size={40} color="#E1306C" />,
      tags: ['JavaScript', 'Graph API', 'Webhooks'],
      color: 'rgba(225, 48, 108, 0.1)'
    },
    {
      id: 5,
      title: 'Auto DM Assistant',
      description: 'A robust direct messaging bot that initiates conversations, handles FAQs via AI, and funnels warm leads to a CRM.',
      icon: <Terminal size={40} color="#8A2BE2" />,
      tags: ['Node.js', 'Social APIs', 'CRM'],
      color: 'rgba(138, 43, 226, 0.1)'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const handleScroll = () => {
      if (containerRef.current) {
        const { top, height } = containerRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Total scrollable area is height - windowHeight
        const scrollPx = -top; 
        const maxScroll = height - windowHeight;
        
        if (scrollPx < 0) {
           setProgress(0);
        } else if (scrollPx > maxScroll) {
           setProgress(projects.length - 1);
        } else {
           setProgress((scrollPx / maxScroll) * (projects.length - 1));
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [projects.length]);


  return (
    <div className="portfolio-page" style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      
      {/* 1. HERO SECTION */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(138,43,226,0.15) 0%, rgba(20,20,25,0) 70%)', zIndex: 0 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
          <div className="badge" style={{ margin: '0 auto 2rem auto', display: 'inline-flex' }}>
            <div className="badge-dot"></div>
            CSE STUDENT • AUTOMATION EXPERT
          </div>
          <h1 style={{ fontSize: '4rem', fontWeight: '800', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Hi, I'm <span className="gradient-text">Binod Shaw</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            I build intelligent web applications and automated systems that eliminate manual work.
          </p>
        </div>
      </section>

      {/* 2. ABOUT ME SECTION */}
      <section style={{ padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-15px', background: 'linear-gradient(45deg, #8A2BE2, #FF7F50)', borderRadius: '24px', opacity: 0.5, filter: 'blur(20px)' }}></div>
              <img 
                src="/binod-profile.png" 
                alt="Binod Shaw" 
                style={{ width: '100%', maxWidth: '450px', height: '500px', objectFit: 'cover', borderRadius: '24px', position: 'relative', zIndex: 1, border: '1px solid rgba(255,255,255,0.1)' }}
              />
              <div className="glass" style={{ position: 'absolute', bottom: '-20px', right: '-20px', zIndex: 2, padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', border: '1px solid rgba(138,43,226,0.3)' }}>
                <Cpu color="#8A2BE2" size={32} />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>AI Automation</h4>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Specialist</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>About Me</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              I am currently a student at the <strong style={{ color: 'var(--text-primary)' }}>Central Institute of Technology Kokrajhar (CITK)</strong>, studying <strong style={{ color: 'var(--text-primary)' }}>Computer Science and Engineering (CSE)</strong>. 
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
              While academia gives me a strong theoretical foundation, my true passion lies in building practical, high-impact digital solutions. I specialize in <strong style={{ color: 'var(--text-primary)' }}>Web Development</strong> and <strong style={{ color: 'var(--text-primary)' }}>AI Automation</strong>.
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
              I love finding bottlenecks in workflows and writing scripts, bots, and applications to completely automate them. From social media engagement bots to intelligent email parsers, if a process is repetitive, I can automate it.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              {skills.map((skill, idx) => (
                <div key={idx} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ color: '#8A2BE2', marginBottom: '1rem' }}>{skill.icon}</div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--text-primary)' }}>{skill.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{skill.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCROLLING STACK PROJECTS SECTION */}
      <section ref={containerRef} style={{ position: 'relative', height: `${projects.length * 100}vh`, padding: 0, marginTop: '4rem' }}>
        
        {/* Sticky Container */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', perspective: '1500px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ position: 'absolute', top: '15%', textAlign: 'center', zIndex: 10, width: '100%' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Featured Projects</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)' }}>Scroll down to explore</p>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: '800px', height: '400px', transformStyle: 'preserve-3d', transform: 'translateZ(-400px) rotateX(5deg)' }}>
            {projects.map((project, i) => {
              const delta = progress - i; 
              
              // Clamp delta to prevent cards from flying too far away when totally offscreen
              // We'll let them go up to delta = +/- 2 so they complete a half circle behind
              const clampedDelta = Math.max(-2, Math.min(2, delta));
              
              // Circular Helix Math:
              // Angle determines where it is on the circle. 
              // When delta is 0, it's at 0deg (front).
              // When delta > 0 (passed), it rotates left (negative degrees) and goes UP.
              // When delta < 0 (coming), it comes from the right (positive degrees) and UP from BELOW.
              const angle = clampedDelta * -75; // degrees around the Y axis
              const translateY = clampedDelta * -30; // vh (vertical movement)
              const radius = 600; // px (distance from center of rotation)
              
              const opacity = Math.max(0, 1 - Math.abs(clampedDelta) * 0.4);
              const isPointerActive = Math.abs(delta) < 0.2;

              return (
                <div key={project.id} className="glass" style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  right: '0',
                  bottom: '0',
                  margin: 'auto',
                  padding: '3rem',
                  borderRadius: '32px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  transform: `translateY(${translateY}vh) rotateY(${angle}deg) translateZ(${radius}px)`,
                  opacity: opacity,
                  transition: 'transform 0.1s ease-out, opacity 0.1s ease-out',
                  pointerEvents: isPointerActive ? 'auto' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'rgba(20, 20, 25, 0.7)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4), 0 0 40px rgba(138,43,226,0.1)'
                }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '20px', background: project.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                    {project.icon}
                  </div>
                  <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fff', fontWeight: 800 }}>{project.title}</h3>
                  <p style={{ color: '#aaa', lineHeight: '1.8', fontSize: '1.2rem', flexGrow: 1, marginBottom: '2.5rem' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', marginBottom: '1.5rem' }}>
                    {project.tags.map((tag, idx) => (
                      <span key={idx} style={{ padding: '0.4rem 1.2rem', background: 'rgba(138,43,226,0.15)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '1px', color: '#b673f8' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', background: 'rgba(138,43,226,0.05)', borderTop: '1px solid rgba(138,43,226,0.2)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Ready to Automate Your Business?</h2>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
            Whether you need a custom web application or an intelligent automation script to save you hours of manual work, I can build it.
          </p>
          <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
            Let's Talk <ArrowRight size={20} />
          </Link>
        </div>
      </section>
      
    </div>
  );
};

export default PortfolioPage;
