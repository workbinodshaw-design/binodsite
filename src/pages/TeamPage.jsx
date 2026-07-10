import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Briefcase, MessageCircle, ArrowRight, Code, PenTool, Database, Megaphone } from 'lucide-react';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const TeamPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    {
      name: "Binod Shaw",
      role: "Founder & CEO",
      bio: "Visionary behind CastFlow. Specializes in scaling agency operations and crafting high-performance digital ecosystems.",
      icon: <Code size={32} color="#1A73E8" />,
      bg: "#e6f0fd",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Alex Rivera",
      role: "Head of AI Automation",
      bio: "Former lead engineer at a top-tier tech firm. Builds autonomous AI agents that save clients thousands of hours.",
      icon: <Database size={32} color="#8db31c" />,
      bg: "#f3fbd6",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Sarah Jenkins",
      role: "Lead UI/UX Designer",
      bio: "Obsessed with pixel perfection and human psychology. Designs interfaces that are impossible to ignore.",
      icon: <PenTool size={32} color="#f59e0b" />,
      bg: "#fff9e6",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      name: "Marcus Chen",
      role: "Growth Director",
      bio: "Masters the art of performance marketing. Turns ad spend into guaranteed ROI through data-driven campaigns.",
      icon: <Megaphone size={32} color="#f43f5e" />,
      bg: "#ffebee",
      social: { twitter: "#", linkedin: "#", github: "#" }
    }
  ];

  return (
    <>
      <SEO 
        title="Our Team | CastFlow Agency"
        description="Meet the minds behind CastFlow. We are a team of elite engineers, designers, and growth experts building the future."
        url="/team"
      />
      
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', background: '#fff' }}>
        
        {/* Page Header */}
        <div className="reveal-fade" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', color: '#1A1A1A' }}>• THE MINDS BEHIND CASTFLOW</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto', color: '#1A1A1A' }}>
            A collective of <span style={{ color: '#1A73E8' }}>visionaries.</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '700px', fontSize: 'clamp(1rem, 3vw, 1.2rem)', lineHeight: '1.6', color: '#666' }}>
            We aren't just developers. We are a tightly knit team of elite engineers, designers, and growth experts obsessed with pushing the boundaries of what's possible on the web.
          </p>
        </div>

        {/* Team Grid */}
        <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '8rem' }}>
          {team.map((member, index) => (
            <div 
              key={index} 
              style={{ 
                background: '#fafafa', 
                borderRadius: '24px', 
                padding: '2.5rem', 
                border: '1px solid rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: member.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                {member.icon}
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.2rem 0', color: '#1A1A1A' }}>{member.name}</h3>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1A73E8', marginBottom: '1.5rem', letterSpacing: '1px', textTransform: 'uppercase' }}>{member.role}</div>
              
              <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '2.5rem', flex: 1 }}>
                {member.bio}
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                <a href={member.social.twitter} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#1A1A1A'} onMouseOut={e=>e.target.style.color='#A0A0A0'}>
                  <MessageCircle size={20} />
                </a>
                <a href={member.social.linkedin} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#1A1A1A'} onMouseOut={e=>e.target.style.color='#A0A0A0'}>
                  <Briefcase size={20} />
                </a>
                <a href={member.social.github} target="_blank" rel="noreferrer" style={{ color: '#A0A0A0', transition: 'color 0.2s' }} onMouseOver={e=>e.target.style.color='#1A1A1A'} onMouseOut={e=>e.target.style.color='#A0A0A0'}>
                  <Terminal size={20} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Join Us Banner */}
        <div className="reveal-scale" style={{ background: '#1A1A1A', borderRadius: '32px', padding: '4rem 2rem', textAlign: 'center', color: '#fff', marginBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, marginBottom: '1rem', letterSpacing: '-1px' }}>Think you have what it takes?</h2>
            <p style={{ fontSize: '1.1rem', color: '#A0A0A0', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem auto' }}>
              We're always looking for exceptional talent to join our ranks. Check out our open positions.
            </p>
            <Link to="/join-team" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#C4F042', color: '#1A1A1A', padding: '1rem 2.5rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 700, transition: 'transform 0.2s' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}>
              View Open Roles <ArrowRight size={20} />
            </Link>
          </div>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
          <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px', background: 'rgba(196, 240, 66, 0.1)', borderRadius: '50%', filter: 'blur(40px)' }}></div>
        </div>

        {/* Standard CTA */}
        <div className="reveal-up" style={{ paddingBottom: '4rem' }}>
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default TeamPage;
