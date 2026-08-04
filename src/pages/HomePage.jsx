import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BarChart, Globe, Zap, Cpu, Shield, TrendingUp, Calendar, MapPin, User, X, ZoomIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import './HomePage.css';

const galleryImages = [
  { id: 1, src: '/gallery/healthians_mobile.png', title: 'Healthians App & Mobile UI', category: 'Healthcare • Mobile App', alt: 'Healthians Mobile Booking Interface' },
  { id: 2, src: '/gallery/runfest_desktop.png', title: 'RunFest Virtual Challenge', category: 'Sports & Event • Web Design', alt: 'RunFest Hero UI' },
  { id: 3, src: '/gallery/castflow_hero.jpg', title: 'CastFlow AI Automation Portal', category: 'SaaS & AI • Dashboard', alt: 'CastFlow Platform Interface' },
  { id: 4, src: '/gallery/healthians_admin.png', title: 'Enterprise Ops Admin Cloud', category: 'Internal Tool • Cloud ERP', alt: 'Healthians Admin Dashboard' }
];

const HomePage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedImg, setSelectedImg] = useState(null);

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
      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(12px)',
            zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '1rem' : '2.5rem', cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            style={{
              position: 'absolute', top: isMobile ? '15px' : '25px', right: isMobile ? '15px' : '25px',
              background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF', borderRadius: '50%', width: isMobile ? '38px' : '46px', height: isMobile ? '38px' : '46px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', zIndex: 1000000
            }}
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '1150px', maxHeight: '88vh', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)', border: '1px solid rgba(255,255,255,0.15)', background: '#0F172A' }}
          >
            <img 
              src={import.meta.env.BASE_URL + selectedImg.src.replace(/^\//, '')} 
              alt={selectedImg.title}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', display: 'block' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 100%)', padding: '2.5rem 1.5rem 1.5rem 1.5rem', color: '#FFF' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '4px' }}>{selectedImg.category}</div>
              <div style={{ fontSize: isMobile ? '1.25rem' : '1.6rem', fontWeight: 800 }}>{selectedImg.title}</div>
            </div>
          </div>
        </div>
      )}
      <SEO 
        title="CastFlow | AI Automation & Premium Web Apps"
        description="We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation."
        keywords="AI Agency, Web Development, Automation, n8n, Next.js, React, MVP Development"
        url="/"
      />

      {/* HERO SECTION (SKY) */}
      <section className="sky-hero">
        
        <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '1200px', padding: '0 20px', gap: isMobile ? '4rem' : '2rem' }}>
          
          {/* LEFT SIDE: Original Hero Text */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isMobile ? 'center' : 'flex-start', textAlign: isMobile ? 'center' : 'left' }}>
            <h1 className="hero-title" style={{ textAlign: isMobile ? 'center' : 'left', marginLeft: isMobile ? 'auto' : '0', marginRight: isMobile ? 'auto' : '0' }}>
              Building the future with<br />AI and strategy
            </h1>
            <p className="hero-subtitle" style={{ textAlign: isMobile ? 'center' : 'left', marginLeft: isMobile ? 'auto' : '0', marginRight: isMobile ? 'auto' : '0' }}>
              We help organizations unlock growth and efficiency through data-driven consulting and intelligent automation.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
              <button className="btn-hollow" onClick={() => navigate('/services')}>EXPLORE SERVICES</button>
              <button className="btn-solid" onClick={() => navigate('/contact')}>
                BOOK CONSULTATION <div style={{ background: '#1A1A1A', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4F042' }}><ArrowUpRight size={14} /></div>
              </button>
            </div>
          </div>

          {/* RIGHT SIDE: RunFest Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            style={{ 
              flex: 1, display: 'flex', justifyContent: isMobile ? 'center' : 'flex-end', width: '100%', position: 'relative' 
            }}
          >
            <motion.div 
              whileHover={{ y: -5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                borderRadius: '32px',
                padding: isMobile ? '24px' : '32px',
                width: '100%',
                maxWidth: '540px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                position: 'relative',
                overflow: 'visible',
                color: '#FFF'
              }}
            >
              {/* Header Badges */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.3)', border: '1px solid rgba(59, 130, 246, 0.5)', padding: '6px 14px', borderRadius: '99px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#E0F2FE' }}>
                  FEATURED EVENT
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#FFF' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', boxShadow: '0 0 10px rgba(16,185,129,0.8)' }}></span> LIVE EVENT
                </div>
              </div>

              {/* Title & Content */}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <h2 style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '36px' : '48px', fontWeight: 800, margin: '0 0 5px 0', lineHeight: 1, letterSpacing: '-1px' }}>RUNFEST</h2>
                <div style={{ fontSize: isMobile ? '15px' : '18px', fontWeight: 500, color: '#F3F4F6', marginBottom: '20px' }}>7-Day Virtual Running Challenge</div>
                
                <p style={{ fontSize: isMobile ? '13px' : '15px', color: '#E5E7EB', lineHeight: 1.6, maxWidth: isMobile ? '60%' : '260px', marginBottom: '30px' }}>
                  Run anywhere. Track every verified kilometer. Compete with runners across India.
                </p>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
                  <button className="btn-solid" onClick={() => navigate('/runfest')} style={{ padding: '10px 20px', fontSize: '13px', width: 'auto', background: '#C4F042', color: '#1A1A1A', border: 'none', borderRadius: '30px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', transition: 'transform 0.2s' }}>
                    EXPLORE RUNFEST <div style={{ background: '#1A1A1A', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C4F042' }}><ArrowRight size={12} /></div>
                  </button>
                  <button className="btn-hollow" onClick={() => navigate('/about-runfest')} style={{ padding: '10px 20px', fontSize: '13px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', borderRadius: '30px', fontWeight: 600, cursor: 'pointer', backdropFilter: 'blur(10px)', transition: 'all 0.2s' }}>
                    LEARN MORE
                  </button>
                </div>

                <div style={{ display: 'flex', gap: isMobile ? '12px' : '20px', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#E5E7EB', fontWeight: 500 }}><Calendar size={14}/> 7 Days Challenge</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#E5E7EB', fontWeight: 500 }}><MapPin size={14}/> GPS Verified</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#E5E7EB', fontWeight: 500 }}><User size={14}/> Open Registration</div>
                </div>
                <div style={{ fontSize: '11px', color: '#D1D5DB', marginTop: '20px', textAlign: 'center' }}>Organized by <span style={{ fontWeight: 600, color: '#FFF' }}>CastFlow</span></div>
              </div>

              {/* 3D Medal Floating Image */}
              <motion.img 
                animate={{ y: [-15, 15, -15], rotateZ: [-2, 2, -2] }} 
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                src="/runfest_medal.webp" 
                alt="RunFest Medal" 
                fetchpriority="high"
                style={{ 
                  position: 'absolute', 
                  right: isMobile ? '-10px' : '-45px', 
                  top: isMobile ? '25%' : '15%', 
                  width: isMobile ? '150px' : '260px', 
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.3))',
                  zIndex: 1,
                  pointerEvents: 'none'
                }} 
              />
            </motion.div>
          </motion.div>

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

            {/* Card 4: Ads & Marketing */}
            <div className="glass-card card-right" onClick={() => navigate('/services')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', padding: '1.2rem', alignItems: 'center', justifyContent: 'center' }}>
               <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)' }}>
                 <TrendingUp size={32} color="#FFF" />
               </div>
               <div style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center' }}>Ads & Marketing</div>
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
               <div style={{ width: '70px', height: '70px', borderRadius: '20px', background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', boxShadow: '0 10px 25px rgba(245, 158, 11, 0.4)' }}>
                 <TrendingUp size={32} color="#FFF" />
               </div>
               <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1A1A1A' }}>Ads & Marketing</div>
            </div>
          </div>
        )}

        <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', paddingBottom: '2rem', marginTop: isMobile ? '0' : '2rem' }}>
          Rated 4.9/5 by 20+ clients ★★★★★
        </div>
      </section>



      {/* MAIN CONTENT AREA */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* ABOUT US TEXT */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem' }}>• ABOUT US</div>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 500, lineHeight: 1.2, letterSpacing: '-1.5px', maxWidth: '900px', margin: '0 auto' }}>
            Trusted by visionary brands to engineer <span style={{ color: '#1A73E8' }}><Shield size={32} style={{ display: 'inline', verticalAlign: 'middle', marginBottom: '4px' }} /> secure</span> web apps and <span style={{ color: '#A0A0A0' }}><Zap size={32} style={{ display: 'inline', verticalAlign: 'middle', color: '#C4F042', marginBottom: '4px' }} /> high-performance</span> AI workflows.
          </h2>
        </div>

        {/* BENTO GRID */}
        <div className="bento-grid">
          
          {/* Blue Block */}
          <div className="bento-blue reveal-up" style={{ gridColumn: isMobile ? '1' : '1 / span 1', gridRow: isMobile ? 'auto' : '1 / span 2', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
          <div className="bento-white reveal-up" style={{ gridColumn: isMobile ? '1' : '2 / span 1', gridRow: isMobile ? 'auto' : '1 / span 2', display: 'flex', flexDirection: 'column' }}>
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
          <div className="bento-green reveal-up" style={{ gridColumn: isMobile ? '1' : '3 / span 1', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.9rem', marginBottom: '1rem', fontWeight: 500 }}>Manual Hours Saved</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 500, letterSpacing: '-2px', marginBottom: '2rem' }}>1.2M+</div>
            <p style={{ fontSize: '1rem', fontWeight: 500 }}>Hours of manual labor eliminated across our client portfolio through intelligent automations.</p>
          </div>

          {/* Black Block */}
          <div className="bento-black reveal-up" style={{ gridColumn: isMobile ? '1' : '3 / span 1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ color: '#A0A0A0' }}>Successful Deployments</div>
            <div style={{ fontSize: '2.5rem', fontWeight: 500 }}>150+</div>
          </div>

        </div>
      </section>

      {/* CAPABILITIES SECTION - Mobile Friendly List */}
      <section style={{ padding: '6rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '3rem', textAlign: 'center' }}>• CAPABILITIES</div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            
            {/* Feature 1 */}
            <div className="reveal-up" style={{ padding: '2rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(26, 115, 232, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A73E8', flexShrink: 0 }}>
                <Cpu size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>AI Agents & Automation</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>We build custom LLM agents and workflow automations that integrate directly with your existing software stack, eliminating repetitive tasks.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="reveal-up" style={{ padding: '2rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center', transitionDelay: '0.1s' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(196, 240, 66, 0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8db31c', flexShrink: 0 }}>
                <Globe size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Web Applications</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>High-performance, scalable web applications built with modern frameworks. From complex dashboards to enterprise SaaS platforms.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="reveal-up" style={{ padding: '2rem 0', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '1.5rem', alignItems: isMobile ? 'flex-start' : 'center', transitionDelay: '0.2s' }}>
              <div style={{ width: '48px', height: '48px', background: 'rgba(0, 0, 0, 0.05)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A', flexShrink: 0 }}>
                <TrendingUp size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Performance Marketing & Ads</h3>
                <p style={{ color: '#666', lineHeight: 1.6 }}>We drive high-quality leads through targeted advertising on Google, Meta (Facebook & Instagram), and WhatsApp to rapidly scale your revenue.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED GALLERY SHOWCASE (BENTO GRID ON PC, SWIPEABLE ON MOBILE) */}
      <section style={{ padding: '6rem 1.5rem', background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', color: '#1A73E8', marginBottom: '1rem' }}>• CREATIVE SHOWCASE & UI GALLERY</div>
            <h2 style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-1.5px', marginBottom: '1rem', color: '#1A1A1A', fontFamily: '"Inter", sans-serif' }}>
              Designed to Captivate & Convert
            </h2>
            <p style={{ fontSize: '1.1rem', color: '#666', maxWidth: '600px', margin: '0 auto' }}>
              Take a closer look at our recent digital products and interface architecture. Tap or click any preview to launch the interactive lightbox.
            </p>
          </div>

          {!isMobile ? (
            /* Desktop Bento Grid Gallery */
            <div style={{ display: 'grid', gridTemplateColumns: '42% 1fr', gap: '1.5rem', marginBottom: '3.5rem' }}>
              {/* LEFT TALL CARD (Image 1) */}
              <div 
                onClick={() => setSelectedImg(galleryImages[0])}
                style={{ 
                  borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', 
                  background: '#1E293B', position: 'relative', cursor: 'pointer',
                  boxShadow: '0 15px 35px -5px rgba(0,0,0,0.07)', display: 'flex', minHeight: '520px', transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.18)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 15px 35px -5px rgba(0,0,0,0.07)'; }}
              >
                <img src={import.meta.env.BASE_URL + 'gallery/healthians_mobile.png'} alt="Healthians Mobile" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={(e) => e.target.style.transform='scale(1.04)'} onMouseOut={(e) => e.target.style.transform='scale(1)'} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '2rem', pointerEvents: 'none' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>Healthcare • Mobile App</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Healthians App & Mobile UI</span>
                    <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={18} color="#FFF"/></div>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE (Top row + Bottom wide) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', justifyContent: 'space-between' }}>
                
                {/* Top Row (2 Horizontal Cards Side-by-Side) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', height: '250px' }}>
                  {/* Image 2 */}
                  <div 
                    onClick={() => setSelectedImg(galleryImages[1])}
                    style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#1E293B', position: 'relative', cursor: 'pointer', boxShadow: '0 12px 30px -5px rgba(0,0,0,0.07)', display: 'flex', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.16)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px -5px rgba(0,0,0,0.07)'; }}
                  >
                    <img src={import.meta.env.BASE_URL + 'gallery/runfest_desktop.png'} alt="RunFest Desktop" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={(e) => e.target.style.transform='scale(1.05)'} onMouseOut={(e) => e.target.style.transform='scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem', pointerEvents: 'none' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Sports & Event • Web Design</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>RunFest Challenge</span>
                        <ZoomIn size={16} color="#FFF"/>
                      </div>
                    </div>
                  </div>

                  {/* Image 3 */}
                  <div 
                    onClick={() => setSelectedImg(galleryImages[2])}
                    style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#1E293B', position: 'relative', cursor: 'pointer', boxShadow: '0 12px 30px -5px rgba(0,0,0,0.07)', display: 'flex', transition: 'all 0.3s ease' }}
                    onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.16)'; }}
                    onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px -5px rgba(0,0,0,0.07)'; }}
                  >
                    <img src={import.meta.env.BASE_URL + 'gallery/castflow_hero.jpg'} alt="CastFlow AI" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} onMouseOver={(e) => e.target.style.transform='scale(1.05)'} onMouseOut={(e) => e.target.style.transform='scale(1)'} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem', pointerEvents: 'none' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#A855F7', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>SaaS & AI • Dashboard</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>AI Automation Hub</span>
                        <ZoomIn size={16} color="#FFF"/>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Wide Card (Image 4) */}
                <div 
                  onClick={() => setSelectedImg(galleryImages[3])}
                  style={{ borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', background: '#1E293B', position: 'relative', cursor: 'pointer', boxShadow: '0 12px 30px -5px rgba(0,0,0,0.07)', display: 'flex', height: '250px', transition: 'all 0.3s ease' }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0,0,0,0.16)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 30px -5px rgba(0,0,0,0.07)'; }}
                >
                  <img src={import.meta.env.BASE_URL + 'gallery/healthians_admin.png'} alt="Healthians Admin Ops" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', objectPosition: 'top' }} onMouseOver={(e) => e.target.style.transform='scale(1.04)'} onMouseOut={(e) => e.target.style.transform='scale(1)'} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.5rem', pointerEvents: 'none' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#10B981', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Internal Tool • Cloud ERP</div>
                    <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Enterprise Ops Admin Cloud</span>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(5px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={16} color="#FFF"/></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Mobile Swipeable Gallery */
            <div style={{ marginBottom: '3rem' }}>
              <div style={{ 
                display: 'flex', overflowX: 'auto', gap: '1rem', paddingBottom: '1rem', 
                scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
                margin: '0 -1.5rem', paddingLeft: '1.5rem', paddingRight: '1.5rem'
              }}>
                {galleryImages.map((img) => (
                  <div 
                    key={img.id}
                    onClick={() => setSelectedImg(img)}
                    style={{
                      flex: '0 0 84%', height: '350px', borderRadius: '22px', overflow: 'hidden',
                      position: 'relative', scrollSnapAlign: 'center', border: '1px solid rgba(0,0,0,0.08)',
                      boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', background: '#1E293B', cursor: 'pointer'
                    }}
                  >
                    <img src={import.meta.env.BASE_URL + img.src.replace(/^\//, '')} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.88) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '1.25rem', pointerEvents: 'none' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#38BDF8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{img.category}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span>{img.title}</span>
                        <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ZoomIn size={16} color="#FFF" /></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', fontSize: '12px', color: '#888', fontWeight: 500, marginTop: '0.5rem' }}>
                👉 Swipe left & right to view • Tap any image to zoom
              </div>
            </div>
          )}

          {/* See More / Explore Full Gallery Button */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button 
              onClick={() => navigate('/gallery')} 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '12px', 
                background: '#1A1A1A', color: '#FFF', padding: '16px 36px', 
                borderRadius: '50px', fontWeight: 700, fontSize: '1.05rem', 
                border: 'none', cursor: 'pointer', boxShadow: '0 12px 30px -8px rgba(0, 0, 0, 0.25)', 
                transition: 'all 0.25s' 
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.background = '#1A73E8'; e.currentTarget.style.boxShadow = '0 18px 35px -5px rgba(26, 115, 232, 0.35)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.boxShadow = '0 12px 30px -8px rgba(0, 0, 0, 0.25)'; }}
            >
              <span>See Full Organized Gallery</span> <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="reveal-scale" style={{ padding: '8rem 1.5rem', background: '#FAFAFA', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-1px' }}>Ready to scale?</h2>
        <p style={{ color: '#666', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto 3rem' }}>Stop wasting time on manual processes. Let's build the systems that will power your next phase of growth.</p>
        <button className="btn btn-primary" onClick={() => navigate('/services')} style={{ fontSize: '1.1rem', padding: '1rem 2.5rem', borderRadius: '30px', margin: '0 auto', display: 'inline-flex', justifyContent: 'center' }}>
          Explore Services
        </button>
      </section>

    </div>
  );
};

export default HomePage;
