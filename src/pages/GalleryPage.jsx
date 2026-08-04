import React, { useState, useEffect } from 'react';
import { ArrowLeft, ZoomIn, X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const albums = [
  {
    id: 'healthians',
    name: 'BookHealthians Platform',
    category: 'Healthcare & Diagnostic ERP',
    tag: 'healthcare',
    description: 'A comprehensive full-stack ecosystem featuring patient blood test booking, real-time phlebotomist sample tracking, NABL report delivery, and an enterprise cloud dashboard for live ops management.',
    liveUrl: 'https://www.bookhealthians.in',
    images: [
      { id: 'h1', src: '/gallery/healthians_mobile.png', title: 'Mobile Booking Portal', caption: 'Home blood sample collection interface with 30-second rapid booking flow.' },
      { id: 'h2', src: '/gallery/healthians_admin.png', title: 'Enterprise Ops Dashboard', caption: 'Real-time patient order tracking, live cloud booking filters, and team integration.' }
    ]
  },
  {
    id: 'runfest',
    name: 'RunFest National Challenge',
    category: 'Virtual Event Platform',
    tag: 'event',
    description: 'A nationwide virtual running marathon experience with GPS kilometer verification, dynamic runner profiles, and official media partner integration.',
    liveUrl: '/runfest',
    images: [
      { id: 'r1', src: '/gallery/runfest_desktop.png', title: 'Desktop Hero Portal', caption: 'Dynamic hero interface featuring live event countdown and athlete registration.' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'CastFlow AI Ecosystem',
    category: 'SaaS & AI Workflows',
    tag: 'ai',
    description: 'Custom intelligent agents, automated revenue pipelines, WhatsApp conversational bots, and data-driven automation platforms.',
    liveUrl: '/services/ai-automation',
    images: [
      { id: 'c1', src: '/gallery/castflow_hero.jpg', title: 'Automated Revenue Engine', caption: 'Interactive dashboard showcasing live ROI analytics and intelligent workflow architecture.' }
    ]
  }
];

const GalleryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImg, setSelectedImg] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredAlbums = activeTab === 'all' 
    ? albums 
    : albums.filter(album => album.tag === activeTab);

  return (
    <>
      <SEO 
        title="Visual Showcase & UI Gallery | CastFlow Agency"
        description="Explore our minimalist visual showcase of interface designs, healthcare ERP dashboards, AI automation tools, and web deployments."
        keywords="Web Design Gallery, Minimalist UI UX, CastFlow Portfolio, Clean SaaS Screenshots, React Architecture"
        url="/gallery"
      />

      {/* Fullscreen Lightbox Modal */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '1rem' : '2.5rem', cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            style={{
              position: 'absolute', top: isMobile ? '15px' : '25px', right: isMobile ? '15px' : '25px',
              background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255,255,255,0.3)',
              color: '#FFF', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s', zIndex: 1000000
            }}
          >
            <X size={22} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '1100px', maxHeight: '88vh', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', background: '#FFF' }}
          >
            <img 
              src={import.meta.env.BASE_URL + selectedImg.src.replace(/^\//, '')} 
              alt={selectedImg.title}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '78vh', objectFit: 'contain', display: 'block', margin: '0 auto', background: '#F8FAFC' }}
            />
            <div style={{ background: '#FFF', padding: isMobile ? '1.25rem' : '1.5rem 2rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#1A73E8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{selectedImg.albumName}</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '4px' }}>{selectedImg.title}</div>
              <p style={{ fontSize: '0.95rem', color: '#666', margin: 0, lineHeight: 1.5 }}>{selectedImg.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Container - Pure Minimalist Light Theme */}
      <div style={{ padding: isMobile ? '7rem 1.5rem 4rem' : '8rem 2rem 5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', background: '#FFF', fontFamily: '"Inter", sans-serif' }}>
        
        {/* Navigation / Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', 
            color: '#444', padding: '8px 18px', borderRadius: '30px', fontWeight: 600, fontSize: '0.88rem',
            display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '3rem',
            transition: 'all 0.2s' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
        >
          <ArrowLeft size={16} /> Back to Overview
        </button>

        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(26, 115, 232, 0.05)', padding: '6px 16px', borderRadius: '30px', color: '#1A73E8', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px', marginBottom: '1.5rem', border: '1px solid rgba(26, 115, 232, 0.1)' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1A73E8', display: 'inline-block' }}></span>
            VISUAL SHOWCASE
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.2rem auto', color: '#111' }}>
            Minimalist UI & <span style={{ color: '#1A73E8' }}>Architecture Gallery.</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '680px', fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', lineHeight: 1.6, color: '#666' }}>
            A pure, clean exploration of our digital interfaces, healthcare platforms, and intelligent automation dashboards. Click any picture for fullscreen inspection.
          </p>
        </div>

        {/* Filter Pill Tabs */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '4rem', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'healthcare', label: 'Healthcare Systems' },
            { id: 'event', label: 'Event & Sports' },
            { id: 'ai', label: 'AI & SaaS Workflows' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 22px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600,
                whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab.id ? '#1A73E8' : '#F8FAFC',
                color: activeTab === tab.id ? '#FFF' : '#555',
                border: activeTab === tab.id ? 'none' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(26, 115, 232, 0.25)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Albums List */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '5rem', marginBottom: '6rem' }}
          >
            {filteredAlbums.map((album) => (
              <div 
                key={album.id} 
                style={{ 
                  background: '#FFF', 
                  borderRadius: '24px', 
                  border: '1px solid rgba(0,0,0,0.06)', 
                  padding: isMobile ? '1.75rem' : '2.5rem', 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                  transition: 'border-color 0.3s'
                }}
              >
                {/* Album Title Row */}
                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', alignItems: isMobile ? 'flex-start' : 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1A73E8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>
                      {album.category}
                    </div>
                    <h2 style={{ fontSize: isMobile ? '1.6rem' : '2rem', fontWeight: 700, margin: '0 0 8px 0', color: '#111', letterSpacing: '-0.5px' }}>
                      {album.name}
                    </h2>
                    <p style={{ color: '#666', fontSize: '1rem', lineHeight: 1.6, maxWidth: '750px', margin: 0 }}>
                      {album.description}
                    </p>
                  </div>

                  {album.liveUrl && (
                    <a 
                      href={album.liveUrl}
                      target={album.liveUrl.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      style={{
                        padding: '12px 22px', borderRadius: '30px', background: '#F8FAFC', color: '#111',
                        border: '1px solid rgba(0,0,0,0.1)', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none', 
                        display: 'inline-flex', alignItems: 'center', gap: '6px', flexShrink: 0, transition: 'all 0.2s'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.background = '#111'; e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = '#111'; }}
                      onMouseOut={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
                    >
                      <span>Visit Project</span>
                      <ExternalLink size={15} />
                    </a>
                  )}
                </div>

                {/* Pure Clean Screenshots Grid - No Fades, No Overlays */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', 
                  gap: '2rem' 
                }}>
                  {album.images.map((img) => (
                    <div 
                      key={img.id}
                      onClick={() => setSelectedImg({ ...img, albumName: album.name, category: album.category })}
                      style={{
                        borderRadius: '16px', overflow: 'hidden', background: '#F8FAFC',
                        border: '1px solid rgba(0,0,0,0.08)', position: 'relative',
                        cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#1A73E8'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                    >
                      <div style={{ position: 'relative', height: isMobile ? '260px' : '320px', overflow: 'hidden', background: '#F1F5F9' }}>
                        <img 
                          src={import.meta.env.BASE_URL + img.src.replace(/^\//, '')} 
                          alt={img.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s ease' }} 
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.04)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                      </div>

                      <div style={{ padding: '1.5rem', background: '#FFF', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <div>
                          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 6px 0', color: '#111' }}>{img.title}</h3>
                          <p style={{ fontSize: '0.92rem', color: '#666', lineHeight: 1.5, margin: 0 }}>{img.caption}</p>
                        </div>
                        <div style={{ marginTop: '1rem', color: '#1A73E8', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span>🔍 Click to zoom preview</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* Consistent Minimalist Contact Section */}
      <ContactSection />
    </>
  );
};

export default GalleryPage;
