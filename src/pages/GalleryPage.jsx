import React, { useState, useEffect } from 'react';
import { ArrowLeft, ZoomIn, X, ExternalLink, Filter, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';

const albums = [
  {
    id: 'healthians',
    name: 'BookHealthians Platform',
    category: 'Healthcare & Diagnostic ERP',
    tag: 'healthcare',
    description: 'A comprehensive full-stack ecosystem featuring patient blood test booking, real-time phlebotomist sample tracking, NABL report delivery, and an enterprise cloud dashboard for live ops management.',
    liveUrl: 'https://www.bookhealthians.in',
    images: [
      { id: 'h1', src: '/gallery/healthians_mobile.png', title: 'Mobile Booking Portal', caption: 'Home blood sample collection interface with 30-second rapid booking flow and automated callback system.' },
      { id: 'h2', src: '/gallery/healthians_admin.png', title: 'Enterprise Ops Dashboard', caption: 'Real-time patient order tracking, live cloud booking filters, and WhatsApp/Call integration for admin team.' }
    ]
  },
  {
    id: 'runfest',
    name: 'RunFest National Challenge',
    category: 'Virtual Event & Leaderboard Platform',
    tag: 'event',
    description: 'A nationwide 7-day virtual running marathon experience with GPS kilometer verification, dynamic runner profiles, media partner integration, and automated leaderboard tracking.',
    liveUrl: '/runfest',
    images: [
      { id: 'r1', src: '/gallery/runfest_desktop.png', title: 'Desktop Hero Portal', caption: 'Dynamic hero interface featuring live event countdown, athlete registration triggers, and official media partner showcase.' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'CastFlow AI Ecosystem',
    category: 'SaaS & Custom AI Workflows',
    tag: 'ai',
    description: 'Custom intelligent agents, automated revenue pipelines, WhatsApp conversational agents, and data-driven consulting platforms designed to eliminate manual data entry.',
    liveUrl: '/',
    images: [
      { id: 'c1', src: '/gallery/castflow_hero.jpg', title: 'Automated Revenue Engine', caption: 'Interactive 3D architecture dashboard showcasing live 127% ROI analytics, tech stack integration, and automated workflows.' }
    ]
  }
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredAlbums = activeTab === 'all' 
    ? albums 
    : albums.filter(album => album.tag === activeTab);

  return (
    <div style={{ backgroundColor: '#0F172A', color: '#FFF', minHeight: '100vh', fontFamily: '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", Roboto, sans-serif', paddingBottom: '8rem' }}>
      <SEO 
        title="Visual Gallery & Albums | CastFlow Creations"
        description="Explore our curated architectural showcases, user interface designs, AI automation workflows, and live client deployments."
        keywords="Web Design Gallery, UI UX Showcase, CastFlow Portfolio, AI Dashboard Screenshots, React UI"
        url="/gallery"
      />

      {/* Lightbox Modal */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(5, 10, 24, 0.94)',
            backdropFilter: 'blur(16px)',
            zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '1rem' : '2.5rem', cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            style={{
              position: 'absolute', top: isMobile ? '15px' : '25px', right: isMobile ? '15px' : '25px',
              background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255,255,255,0.2)',
              color: '#FFF', borderRadius: '50%', width: isMobile ? '40px' : '48px', height: isMobile ? '40px' : '48px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', zIndex: 1000000
            }}
          >
            <X size={24} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '1150px', maxHeight: '88vh', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 35px 60px -15px rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255,255,255,0.15)', background: '#1E293B' }}
          >
            <img 
              src={import.meta.env.BASE_URL + selectedImg.src.replace(/^\//, '')} 
              alt={selectedImg.title}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
            <div style={{ background: '#0F172A', padding: isMobile ? '1.25rem' : '1.75rem 2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{selectedImg.albumName}</div>
              <div style={{ fontSize: isMobile ? '1.25rem' : '1.5rem', fontWeight: 800, marginBottom: '6px' }}>{selectedImg.title}</div>
              <p style={{ fontSize: '0.95rem', color: '#94A3B8', margin: 0, lineHeight: 1.5 }}>{selectedImg.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Header */}
      <section style={{ position: 'relative', padding: isMobile ? '5rem 1.5rem 3rem' : '7rem 2rem 5rem', background: 'radial-gradient(ellipse at top, rgba(30, 58, 138, 0.4) 0%, rgba(15, 23, 42, 1) 70%)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <button 
            onClick={() => navigate(-1)} 
            style={{ 
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', 
              color: '#FFF', padding: '10px 18px', borderRadius: '30px', fontWeight: 600, fontSize: '0.9rem',
              display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2rem',
              transition: 'background 0.2s' 
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
          >
            <ArrowLeft size={16} /> Back to Overview
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38BDF8', fontWeight: 700, letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
            <Sparkles size={16} /> ORGANIZED VISUAL CATALOG
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)', fontWeight: 900, letterSpacing: '-2px', margin: '0 0 1.5rem 0', lineHeight: 1.1 }}>
            Our Creative <span style={{ background: 'linear-gradient(90deg, #38BDF8, #818CF8, #C084FC)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Masterpiece Gallery</span>
          </h1>
          <p style={{ fontSize: isMobile ? '1.05rem' : '1.25rem', color: '#94A3B8', maxWidth: '720px', lineHeight: 1.6, margin: 0 }}>
            Every product we design undergoes meticulous UX architecture, responsive mobile testing, and high-conversion visual polish. Explore our categorized project albums below.
          </p>
        </div>
      </section>

      {/* Filter Tabs & Albums */}
      <section style={{ maxWidth: '1200px', margin: '3.5rem auto 0', padding: '0 1.5rem' }}>
        
        {/* Category Tabs Bar */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '3.5rem', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: '📁 All Albums' },
            { id: 'healthcare', label: '🏥 Healthcare Systems' },
            { id: 'event', label: '🏃‍♂️ Event & Sports' },
            { id: 'ai', label: '🤖 AI & SaaS Dashboards' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '12px 24px', borderRadius: '40px', fontSize: '0.95rem', fontWeight: 700,
                whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.25s',
                background: activeTab === tab.id ? '#38BDF8' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? '#0F172A' : '#E2E8F0',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
                boxShadow: activeTab === tab.id ? '0 8px 20px -4px rgba(56, 189, 248, 0.4)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Organized Album Sections */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}
          >
            {filteredAlbums.map((album) => (
              <div key={album.id} style={{ background: 'rgba(30, 41, 59, 0.5)', borderRadius: '28px', border: '1px solid rgba(255,255,255,0.08)', padding: isMobile ? '1.75rem' : '2.5rem', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
                
                {/* Album Header */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '1.5rem', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '1.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38BDF8', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '6px' }}>
                      ALBUM • {album.category}
                    </div>
                    <h2 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: 800, margin: '0 0 10px 0', letterSpacing: '-0.5px' }}>
                      {album.name}
                    </h2>
                    <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.6, maxWidth: '780px', margin: 0 }}>
                      {album.description}
                    </p>
                  </div>

                  {album.liveUrl && (
                    <a 
                      href={album.liveUrl}
                      target={album.liveUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      style={{
                        padding: '12px 22px', borderRadius: '12px', background: '#38BDF8', color: '#0F172A',
                        fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex',
                        alignItems: 'center', gap: '8px', flexShrink: 0, transition: 'all 0.2s',
                        boxShadow: '0 10px 20px -5px rgba(56, 189, 248, 0.3)'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#7DD3FC'}
                      onMouseOut={(e) => e.currentTarget.style.background = '#38BDF8'}
                    >
                      <span>Visit Live Project</span>
                      <ExternalLink size={17} />
                    </a>
                  )}
                </div>

                {/* Album Photo Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(420px, 1fr))', 
                  gap: '2rem' 
                }}>
                  {album.images.map((img) => (
                    <div 
                      key={img.id}
                      onClick={() => setSelectedImg({ ...img, albumName: album.name, category: album.category })}
                      style={{
                        borderRadius: '20px', overflow: 'hidden', background: '#0F172A',
                        border: '1px solid rgba(255,255,255,0.1)', position: 'relative',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.3s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.4)'; e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.6)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      <div style={{ position: 'relative', height: isMobile ? '280px' : '340px', overflow: 'hidden', background: '#090E17' }}>
                        <img 
                          src={import.meta.env.BASE_URL + img.src.replace(/^\//, '')} 
                          alt={img.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s ease' }} 
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                        <div style={{ position: 'absolute', top: '15px', right: '15px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <ZoomIn size={18} color="#FFF" />
                        </div>
                      </div>

                      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: '#FFF' }}>{img.title}</h3>
                          <p style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5, margin: 0 }}>{img.caption}</p>
                        </div>
                        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#38BDF8', fontSize: '0.85rem', fontWeight: 700 }}>
                          <span>🔍 Click to launch fullscreen view</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div style={{ textAlign: 'center', marginTop: '6rem', padding: '3rem 2rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(129, 140, 248, 0.1) 100%)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem' }}>Want your product featured in our next showcase?</h2>
          <p style={{ color: '#94A3B8', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>We deliver world-class web design and custom AI automation infrastructures tailored to your growth goals.</p>
          <button 
            onClick={() => navigate('/contact')} 
            style={{ 
              background: '#38BDF8', color: '#0F172A', padding: '14px 32px', borderRadius: '30px', 
              fontWeight: 800, fontSize: '1rem', border: 'none', cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)' 
            }}
          >
            Start Your Project →
          </button>
        </div>

      </section>
    </div>
  );
};

export default GalleryPage;
