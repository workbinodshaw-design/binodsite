import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BarChart, Globe, Zap, Cpu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HolographicAsset from '../components/HolographicAsset';
import SEO from '../components/SEO';

const HomePage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      color: '#1A1A1A',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      overflowX: 'hidden'
    }}>
      <SEO 
        title="CastFlow | AI Automation & Premium Web Apps"
        description="We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation."
        keywords="AI Agency, Web Development, Automation, n8n, Next.js, React, MVP Development"
        url="/"
      />

      <style>{`
        .sky-hero {
          background-image: url(/blue_sky.png);
          background-size: cover;
          background-position: center bottom;
          min-height: 100vh;
          position: relative;
          padding-top: 120px;
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow: hidden;
        }
        
        .hero-title {
          font-size: clamp(3rem, 6vw, 5rem);
          font-weight: 500;
          letter-spacing: -1.5px;
          color: #FFFFFF;
          text-align: center;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          max-width: 900px;
        }

        .hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.9);
          text-align: center;
          max-width: 600px;
          line-height: 1.5;
          margin-bottom: 2.5rem;
        }

        .btn-hollow {
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.3);
          color: #FFFFFF;
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-weight: 500;
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-hollow:hover { background: rgba(255,255,255,0.2); }

        .btn-solid {
          background: #C4F042;
          border: none;
          color: #1A1A1A;
          padding: 0.8rem 2rem;
          border-radius: 30px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 0.2s;
        }
        .btn-solid:hover { transform: translateY(-2px); box-shadow: 0 4px 15px rgba(196, 240, 66, 0.4); }

        /* Floating 3D Carousel (Desktop) */
        .carousel-container {
          perspective: 1200px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 4rem;
          position: relative;
          height: 300px;
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          width: 260px;
          height: 200px;
          position: absolute;
          transition: transform 0.5s ease;
          border: 1px solid rgba(255,255,255,0.5);
        }

        .card-center { transform: translateZ(50px) scale(1.1); z-index: 3; background: #1A1A1A; color: white; }
        .card-left { transform: translateX(-280px) translateZ(-50px) rotateY(15deg); z-index: 2; opacity: 0.9; }
        .card-right { transform: translateX(280px) translateZ(-50px) rotateY(-15deg); z-index: 2; opacity: 0.9; }
        .card-far-left { transform: translateX(-520px) translateZ(-150px) rotateY(25deg); z-index: 1; opacity: 0.7; }
        .card-far-right { transform: translateX(520px) translateZ(-150px) rotateY(-25deg); z-index: 1; opacity: 0.7; }

        /* Mobile swipeable carousel */
        .mobile-carousel {
          display: flex;
          overflow-x: auto;
          gap: 1rem;
          padding: 2rem 1.5rem;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          width: 100%;
          margin-top: 2rem;
        }
        .mobile-carousel::-webkit-scrollbar { display: none; }
        .mobile-glass-card {
          flex: 0 0 80%;
          background: rgba(255, 255, 255, 0.95);
          border-radius: 16px;
          padding: 1.5rem;
          scroll-snap-align: center;
          min-height: 180px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        /* Colorful Bento */
        .bento-blue { background: #1A73E8; color: white; border-radius: 24px; padding: 2rem; }
        .bento-white { background: #F8F9FA; color: #1A1A1A; border-radius: 24px; padding: 2rem; }
        .bento-green { background: #C4F042; color: #1A1A1A; border-radius: 24px; padding: 2rem; }
        .bento-black { background: #1A1A1A; color: white; border-radius: 24px; padding: 2rem; }
        
        .bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: auto auto;
          gap: 1.5rem;
          margin-top: 4rem;
        }

        @media (max-width: 900px) {
          .bento-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 3rem; }
        }
      `}</style>

      {/* HERO SECTION (SKY) */}
      <section className="sky-hero">
        <h1 className="hero-title">
          Building the future with<br />AI and strategy
        </h1>
        <p className="hero-subtitle">
          We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-hollow" onClick={() => navigate('/services')}>EXPLORE SERVICES</button>
          <button className="btn-solid" onClick={() => navigate('/contact')}>
            BOOK CONSULTATION <div style={{ background: '#1A1A1A', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4F042' }}><ArrowUpRight size={14} /></div>
          </button>
        </div>

        {/* 3D Curved Cards (Desktop) vs Swipeable Row (Mobile) */}
        {!isMobile ? (
          <div className="carousel-container">
            {/* Card 1: Web Dev */}
            <div className="glass-card card-far-left" onClick={() => navigate('/services/web-development')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem' }}>
               <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '0.8rem', height: '90px', marginBottom: '1rem', border: '1px solid #e0e0e0', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56'}}/>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e'}}/>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f'}}/>
                 </div>
                 <div style={{ width: '60%', height: '4px', background: '#e0e0e0', marginBottom: '6px', borderRadius: '2px' }}/>
                 <div style={{ width: '80%', height: '4px', background: '#e0e0e0', marginBottom: '6px', borderRadius: '2px' }}/>
                 <div style={{ width: '40%', height: '4px', background: '#1A73E8', borderRadius: '2px' }}/>
               </div>
               <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>Web Dev</div>
            </div>
            
            {/* Card 2: MVP Build */}
            <div className="glass-card card-left" onClick={() => navigate('/services')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem' }}>
               <div style={{ height: '90px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px', marginBottom: '1rem' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold' }}>1</div>
                   <div style={{ height: '2px', flex: 1, background: '#1A73E8' }}/>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#1A73E8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: 'bold' }}>2</div>
                   <div style={{ height: '2px', flex: 1, background: '#e0e0e0' }}/>
                 </div>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                   <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0a0a0', fontSize: '10px', fontWeight: 'bold' }}>3</div>
                   <div style={{ height: '2px', flex: 1, background: 'transparent' }}/>
                 </div>
               </div>
               <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>MVP Build</div>
            </div>

            {/* Card 3: AI Automation (Center) */}
            <div className="glass-card card-center" onClick={() => navigate('/services/ai-automation')} style={{ cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, #FF6B6B 0%, #845EC2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 10px 25px rgba(132, 94, 194, 0.4)' }}>
                 <Cpu size={32} color="#FFF" />
               </div>
               <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px' }}>TRY AI AUTOMATION</div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#C4F042', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 600 }}>
                 Explore <ArrowRight size={14} />
               </div>
            </div>

            {/* Card 4: UX/UI Design */}
            <div className="glass-card card-right" onClick={() => navigate('/services')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem' }}>
               <div style={{ height: '90px', display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                 <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '6px' }} />
                 <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ flex: 1, background: '#e0e0e0', borderRadius: '6px' }} />
                   <div style={{ flex: 2, background: '#1A73E8', borderRadius: '6px', opacity: 0.8 }} />
                 </div>
               </div>
               <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>UX/UI Design</div>
            </div>

            {/* Card 5: Cloud Solutions */}
            <div className="glass-card card-far-right" onClick={() => navigate('/services')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem' }}>
               <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', position: 'relative' }}>
                 <div style={{ position: 'absolute', width: '100%', height: '1px', background: '#e0e0e0', zIndex: 0 }} />
                 <div style={{ width: '32px', height: '32px', background: '#1A73E8', borderRadius: '8px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginRight: '2rem' }}>
                   <Globe size={16} />
                 </div>
                 <div style={{ width: '32px', height: '32px', background: '#1A1A1A', borderRadius: '8px', zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                   <Zap size={16} />
                 </div>
               </div>
               <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>Cloud Solutions</div>
            </div>
          </div>
        ) : (
          <div className="mobile-carousel">
            <div className="mobile-glass-card" onClick={() => navigate('/services/ai-automation')} style={{ background: '#1A1A1A', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: 'linear-gradient(135deg, #FF6B6B 0%, #845EC2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 10px 25px rgba(132, 94, 194, 0.4)' }}>
                 <Cpu size={32} color="#FFF" />
               </div>
               <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF' }}>TRY AI AUTOMATION</div>
            </div>
            <div className="mobile-glass-card" onClick={() => navigate('/services/web-development')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ background: '#f5f5f5', borderRadius: '8px', padding: '0.8rem', height: '90px', width: '100%', maxWidth: '200px', marginBottom: '1rem', border: '1px solid #e0e0e0' }}>
                 <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56'}}/>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e'}}/>
                   <div style={{width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f'}}/>
                 </div>
                 <div style={{ width: '60%', height: '4px', background: '#e0e0e0', marginBottom: '6px', borderRadius: '2px' }}/>
                 <div style={{ width: '80%', height: '4px', background: '#e0e0e0', marginBottom: '6px', borderRadius: '2px' }}/>
                 <div style={{ width: '40%', height: '4px', background: '#1A73E8', borderRadius: '2px' }}/>
               </div>
               <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A1A' }}>Web Development</div>
            </div>
            <div className="mobile-glass-card" onClick={() => navigate('/services')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ height: '90px', width: '100%', maxWidth: '200px', display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                 <div style={{ flex: 1, background: '#f0f0f0', borderRadius: '6px' }} />
                 <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                   <div style={{ flex: 1, background: '#e0e0e0', borderRadius: '6px' }} />
                   <div style={{ flex: 2, background: '#1A73E8', borderRadius: '6px', opacity: 0.8 }} />
                 </div>
               </div>
               <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A1A' }}>UX/UI Design</div>
            </div>
          </div>
        )}

        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', paddingBottom: '2rem', marginTop: isMobile ? '0' : '2rem' }}>
          Rated 4.9/5 by 4,900+ clients ★★★★★
        </div>
      </section>



      {/* MAIN CONTENT AREA */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ABOUT US TEXT */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• ABOUT US</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-1.5px', maxWidth: '900px', margin: '0 auto' }}>
            Transforming workflows with <span style={{ color: '#1A73E8' }}><Globe size={32} style={{ display: 'inline', verticalAlign: 'middle' }} /> AI</span>. Scaling brands with <span style={{ color: '#A0A0A0' }}><Zap size={32} style={{ display: 'inline', verticalAlign: 'middle', color: '#C4F042' }} /> high-performance</span> web apps.
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="bento-grid">
          
          {/* Blue Block */}
          <div className="bento-blue" style={{ gridColumn: isMobile ? '1' : '1 / span 1', gridRow: isMobile ? 'auto' : '1 / span 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>CASTFLOW ECOSYSTEM</div>
              <div style={{ width: '32px', height: '32px', background: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart size={16} color="#1A73E8" />
              </div>
            </div>
            
            <div style={{ background: 'white', color: '#1A1A1A', padding: '1.5rem', borderRadius: '16px', marginTop: 'auto' }}>
              <div style={{ fontSize: '3rem', fontWeight: 500, letterSpacing: '-1px', marginBottom: '0.5rem' }}>10x ROI</div>
              <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: 1.5 }}>We build custom internal tools and AI agents that eliminate manual data entry and scale your margins.</p>
            </div>
          </div>

          {/* White Center Block */}
          <div className="bento-white" style={{ gridColumn: isMobile ? '1' : '2 / span 1', gridRow: isMobile ? 'auto' : '1 / span 2', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Partnership & Delivery</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 500, letterSpacing: '-2px', marginBottom: 'auto' }}>99%</div>
            
            <div style={{ marginTop: '3rem' }}>
              <div style={{ display: 'flex', gap: '-10px', marginBottom: '1rem' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{ width: '32px', height: '32px', borderRadius: '16px', background: '#e0e0e0', border: '2px solid white', marginLeft: i > 1 ? '-10px' : '0' }} />
                ))}
              </div>
              <p style={{ fontSize: '1.1rem', fontWeight: 500, lineHeight: 1.5 }}>
                "CastFlow didn't just write code. They audited our entire process, integrated AI, and fundamentally upgraded our operational efficiency."
              </p>
            </div>
          </div>

          {/* Lime Green Block */}
          <div className="bento-green" style={{ gridColumn: isMobile ? '1' : '3 / span 1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Manual Hours Saved</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 500, letterSpacing: '-2px', marginBottom: '2rem' }}>1.2M+</div>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>Hours of manual labor eliminated across our client portfolio through intelligent automations.</p>
          </div>

          {/* Black Block */}
          <div className="bento-black" style={{ gridColumn: isMobile ? '1' : '3 / span 1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#A0A0A0' }}>Successful Deployments</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 500 }}>150+</div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
