import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Play, Mouse, MessageSquare, Mail, Camera, Zap, Terminal, CheckCircle2, Shield, Clock, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const PortfolioPage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      id: 1,
      title: 'WhatsApp Automation',
      desc: 'An all-in-one automation platform that helps businesses streamline workflows.',
      badge: 'Featured Project',
      icon: <MessageSquare size={24} color="#25D366" />,
      top: '30%',
      left: '50%',
      width: '450px',
      transform: 'translate(-50%, -50%) rotateX(10deg) rotateY(-5deg) rotateZ(-2deg)',
      zIndex: 5,
      scale: 1,
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=500&q=80',
    },
    {
      id: 2,
      title: 'Auto Email Sender',
      desc: 'Modern email campaigning solution with advanced features.',
      badge: 'Marketing',
      icon: <Mail size={24} color="#EA4335" />,
      top: '10%',
      left: '20%',
      width: '350px',
      transform: 'rotateX(20deg) rotateY(15deg) rotateZ(-8deg)',
      zIndex: 3,
      scale: 0.8,
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&q=80',
    },
    {
      id: 3,
      title: 'AI Email Reader',
      desc: 'Intelligent inbox assistant solution for businesses.',
      badge: 'AI Automation',
      icon: <Zap size={24} color="#FBBC05" />,
      top: '15%',
      left: '80%',
      width: '350px',
      transform: 'translate(-50%, 0) rotateX(15deg) rotateY(-15deg) rotateZ(5deg)',
      zIndex: 2,
      scale: 0.75,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80',
    },
    {
      id: 4,
      title: 'Insta Auto Reply',
      desc: 'Logo, branding and visual identity for social tech brand.',
      badge: 'Social Media',
      icon: <Camera size={24} color="#E1306C" />,
      top: '60%',
      left: '25%',
      width: '380px',
      transform: 'rotateX(5deg) rotateY(20deg) rotateZ(-12deg)',
      zIndex: 4,
      scale: 0.9,
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&q=80',
    },
    {
      id: 5,
      title: 'Auto DM Assistant',
      desc: 'Clean and modern automated messaging app design concept.',
      badge: 'Lead Gen',
      icon: <Terminal size={24} color="#8A2BE2" />,
      top: '65%',
      left: '75%',
      width: '320px',
      transform: 'rotateX(15deg) rotateY(-25deg) rotateZ(8deg)',
      zIndex: 6,
      scale: 0.85,
      image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&q=80',
    }
  ];

  return (
    <div style={{ background: '#f8f9fa', minHeight: '100vh', color: '#111', fontFamily: '"Inter", sans-serif', overflow: 'hidden' }}>
      
      <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', paddingTop: '120px' }}>
        
        {/* LEFT COLUMN - Sticky Info */}
        <div style={{ flex: '1 1 400px', padding: '0 4rem', position: 'sticky', top: '150px', height: 'fit-content', zIndex: 10, marginBottom: '4rem' }}>
          
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(138,43,226,0.1)', color: 'var(--primary-color)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '1.5rem' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary-color)' }}></div>
            PORTFOLIO
          </div>
          
          <h1 style={{ fontSize: '4.5rem', fontWeight: 800, lineHeight: 1.1, margin: '0 0 1.5rem 0', letterSpacing: '-2px' }}>
            My Work.<br/>
            <span style={{ color: 'var(--primary-color)' }}>My Passion.</span>
          </h1>
          
          <p style={{ color: '#666', fontSize: '1.25rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '350px' }}>
            A showcase of ideas, creativity, and digital solutions that drive real impact.
          </p>
          
          <div style={{ display: 'flex', gap: '2.5rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', margin: 0, fontWeight: 800 }}>25+</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>Projects</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', margin: 0, fontWeight: 800 }}>15+</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>Happy Clients</p>
            </div>
            <div>
              <h3 style={{ fontSize: '2.5rem', color: 'var(--primary-color)', margin: 0, fontWeight: 800 }}>3+</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', margin: 0, fontWeight: 500 }}>Years Experience</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" style={{ padding: '1.2rem 2.5rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 10px 25px rgba(138,43,226,0.3)' }}>
              View All Projects <ArrowUpRight size={20} />
            </button>
            <button style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '12px', color: '#111', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', padding: 0 }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Play size={18} color="var(--primary-color)" fill="var(--primary-color)" style={{ marginLeft: '4px' }} />
              </div>
              Watch Showreel
            </button>
          </div>
          
          <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', gap: '12px', color: '#aaa', fontSize: '0.9rem', fontWeight: 500 }}>
            <div style={{ width: '20px', height: '32px', borderRadius: '10px', border: '2px solid #ddd', display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
              <div style={{ width: '4px', height: '6px', background: '#aaa', borderRadius: '2px', animation: 'scrollDown 2s infinite' }}></div>
            </div>
            Scroll to explore
          </div>
          
        </div>

        {/* RIGHT COLUMN - Tornado Animation */}
        <div style={{ flex: '1 1 800px', position: 'relative', height: '1200px', perspective: '1200px' }}>
          
          {/* Tornado Background Glow */}
          <div style={{ 
            position: 'absolute', top: '20%', left: '40%', width: '600px', height: '600px', 
            background: 'radial-gradient(circle, rgba(138,43,226,0.08) 0%, rgba(255,255,255,0) 70%)',
            transform: `translateY(${scrollY * 0.2}px)`,
            zIndex: 0,
            borderRadius: '50%'
          }}></div>

          <div style={{ 
            position: 'absolute', top: '10%', left: '0', right: '0', bottom: '0', 
            transformStyle: 'preserve-3d',
            transform: `translateY(${-scrollY * 0.15}px) rotateY(${scrollY * 0.02}deg)`,
            transition: 'transform 0.1s ease-out'
          }}>
            {projects.map((project, i) => (
              <div key={project.id} style={{
                position: 'absolute',
                top: project.top,
                left: project.left,
                width: project.width,
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderRadius: '24px',
                padding: project.badge === 'Featured Project' ? '2.5rem' : '2rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.02)',
                border: '1px solid rgba(255,255,255,0.8)',
                zIndex: project.zIndex,
                transform: `${project.transform} scale(${project.scale}) translateY(${scrollY * (i % 2 === 0 ? -0.1 : -0.2)}px)`,
                transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `${project.transform} scale(${project.scale * 1.05}) translateY(${scrollY * (i % 2 === 0 ? -0.1 : -0.2)}px) translateZ(50px)`;
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(138,43,226,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `${project.transform} scale(${project.scale}) translateY(${scrollY * (i % 2 === 0 ? -0.1 : -0.2)}px)`;
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
              }}
              >
                
                {project.badge === 'Featured Project' && (
                  <div style={{ marginBottom: '1.5rem', background: '#f5f0ff', color: 'var(--primary-color)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, display: 'inline-block' }}>
                    {project.badge}
                  </div>
                )}
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                  {project.badge !== 'Featured Project' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {project.icon}
                      </div>
                      <h3 style={{ fontSize: '1.25rem', margin: 0, fontWeight: 700 }}>{project.title}</h3>
                    </div>
                  )}
                  {project.badge === 'Featured Project' && (
                    <h3 style={{ fontSize: '2rem', margin: 0, fontWeight: 800, lineHeight: 1.2 }}>{project.title}</h3>
                  )}
                  
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eaeaea', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <p style={{ color: '#666', fontSize: project.badge === 'Featured Project' ? '1.1rem' : '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                  {project.desc}
                </p>

                {project.badge === 'Featured Project' ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '1rem', background: '#f8f9fa', borderRadius: '16px', fontWeight: 600, color: '#333' }}>
                    <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                      <Camera size={20} color="var(--primary-color)" />
                    </div>
                    View Case Study
                  </div>
                ) : (
                  <img src={project.image} alt={project.title} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '12px' }} />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM CTA SECTION */}
      <div style={{ maxWidth: '1200px', margin: '-100px auto 100px auto', position: 'relative', zIndex: 20, padding: '0 2rem' }}>
        <div style={{ background: '#fff', borderRadius: '32px', padding: '4rem', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 30px 60px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
          
          <div style={{ flex: '1 1 350px' }}>
            <div style={{ display: 'inline-flex', padding: '6px 14px', background: '#f5f0ff', color: 'var(--primary-color)', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              Let's Create Together
            </div>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
              Have a <span style={{ color: 'var(--primary-color)' }}>project</span> in mind?
            </h2>
            <p style={{ color: '#666', fontSize: '1.1rem', lineHeight: 1.6, margin: 0, maxWidth: '350px' }}>
              I help businesses and individuals turn ideas into powerful digital experiences.
            </p>
          </div>

          <div style={{ flex: '1 1 250px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#333', fontWeight: 600 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <CheckCircle2 size={20} />
              </div>
              Clean & Modern Design
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#333', fontWeight: 600 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <Smartphone size={20} />
              </div>
              Responsive & Fast
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#333', fontWeight: 600 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <Shield size={20} />
              </div>
              Scalable & Secure
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#333', fontWeight: 600 }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f5f0ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                <Clock size={20} />
              </div>
              On-time Delivery
            </div>
          </div>

          <div style={{ flex: '1 1 300px', textAlign: 'center' }}>
            <Link to="/contact" className="btn btn-primary" style={{ display: 'inline-flex', padding: '1.2rem 3rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 600, alignItems: 'center', gap: '10px', boxShadow: '0 15px 30px rgba(138,43,226,0.25)', marginBottom: '1.5rem', width: '100%', justifyContent: 'center' }}>
              Let's Work Together <ArrowUpRight size={20} />
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#666', fontSize: '0.9rem', fontWeight: 500 }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366' }}></div>
              Available for new projects
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PortfolioPage;
