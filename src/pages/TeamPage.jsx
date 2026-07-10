import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const TeamPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Our Team | CastFlow Agency"
        description="Meet the minds behind CastFlow. We are a team of elite engineers, designers, and growth experts building the future."
        url="/team"
      />
      
      <div style={{ padding: '8rem 1.5rem 4rem 1.5rem', maxWidth: '1000px', margin: '0 auto', minHeight: '100vh', background: '#fff' }}>
        
        {/* Page Header */}
        <div className="reveal-fade" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26, 115, 232, 0.05)', padding: '6px 16px', borderRadius: '30px', color: '#1A73E8', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '2rem', border: '1px solid rgba(26, 115, 232, 0.1)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A73E8', display: 'inline-block' }}></span>
            OUR LEADERSHIP
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 7vw, 4.5rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-2px', margin: '0 auto 1.5rem auto', color: '#111' }}>
            The minds behind <span style={{ background: 'linear-gradient(135deg, #111 0%, #444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CastFlow.</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '600px', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)', lineHeight: '1.6', color: '#666', fontWeight: 400 }}>
            We are a tight-knit collective of visionaries, obsessed with crafting premium digital experiences and scaling businesses through technology.
          </p>
        </div>

        {/* Team Grid */}
        <div className="reveal-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem', marginBottom: '8rem' }}>
          
          {/* Member 1: Binod Shaw */}
          <div 
            onClick={() => navigate('/portfolio')}
            style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '2.5rem', 
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 115, 232, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(26, 115, 232, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
            }}
          >
            {/* Top gradient accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #1A73E8, #a388ff)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '20px', overflow: 'hidden', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)' }}>
                {/* Fallback to initials if image fails */}
                <img 
                  src={import.meta.env.BASE_URL + 'binod-profile.png'} 
                  alt="Binod Shaw" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: '#1A73E8', background: 'rgba(26, 115, 232, 0.1)' }}>
                  BS
                </div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A73E8', border: '1px solid rgba(0,0,0,0.05)' }}>
                <ArrowUpRight size={20} />
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, margin: '0 0 0.3rem 0', color: '#111', letterSpacing: '-0.5px' }}>Binod Shaw</h3>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#1A73E8', marginBottom: '1.5rem' }}>Founder & CEO</div>
            
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem', margin: 0, flex: 1 }}>
              Founder of CastFlow, leading the company with a vision to build premium websites, AI automation systems, and digital solutions that help businesses scale faster.
            </p>
          </div>

          {/* Member 2: Mithinga Boro */}
          <div 
            style={{ 
              background: '#fff', 
              borderRadius: '24px', 
              padding: '2.5rem', 
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 115, 232, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(26, 115, 232, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.03)';
              e.currentTarget.style.borderColor = 'rgba(0,0,0,0.06)';
            }}
          >
            {/* Top gradient accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #38bdf8, #1A73E8)' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '20px', overflow: 'hidden', background: '#f5f5f7', border: '1px solid rgba(0,0,0,0.05)' }}>
                <img 
                  src={import.meta.env.BASE_URL + 'mithinga-profile.jpg'} 
                  alt="Mithinga Boro" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600, color: '#38bdf8', background: 'rgba(56, 189, 248, 0.1)' }}>
                  MB
                </div>
              </div>
            </div>
            
            <h3 style={{ fontSize: '1.8rem', fontWeight: 600, margin: '0 0 0.3rem 0', color: '#111', letterSpacing: '-0.5px' }}>Mithinga Boro</h3>
            <div style={{ fontSize: '0.95rem', fontWeight: 500, color: '#38bdf8', marginBottom: '1.5rem' }}>Head of Business Development</div>
            
            <p style={{ color: '#555', lineHeight: '1.7', fontSize: '1.05rem', marginBottom: '2rem', flex: 1 }}>
              A key member of the CastFlow team, focused on business growth, client relationships, strategic partnerships, and expanding CastFlow's reach. Passionate about helping businesses grow through technology and innovative digital solutions.
            </p>
            
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>Skills</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Business Development', 'Client Relations', 'Communication', 'Strategic Planning'].map((skill, i) => (
                  <span key={i} style={{ background: '#f5f5f7', color: '#444', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500, border: '1px solid rgba(0,0,0,0.05)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#A0A0A0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>Experience</div>
              <div style={{ color: '#111', fontWeight: 500, fontSize: '1rem' }}>Intermediate</div>
            </div>

            <a 
              href="https://mithingaboro.unaux.com" 
              target="_blank" 
              rel="noreferrer"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem', 
                background: '#111', 
                color: '#fff', 
                padding: '0.8rem 1.5rem', 
                borderRadius: '12px', 
                textDecoration: 'none', 
                fontWeight: 600,
                fontSize: '0.95rem',
                transition: 'background 0.2s',
                width: '100%'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#333'}
              onMouseOut={(e) => e.currentTarget.style.background = '#111'}
            >
              View Profile <ArrowUpRight size={16} />
            </a>
          </div>

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
