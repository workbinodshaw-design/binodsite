import React, { useState, useEffect } from 'react';
import { ArrowLeft, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import ContactSection from '../components/ContactSection';

const albums = [
  {
    id: 'astrology',
    name: 'Uttam Raj Astrology',
    tag: 'consulting',
    images: [
      { id: 'as1', src: '/gallery/astrology_1.png', alt: 'Astrology Backend' },
      { id: 'as2', src: '/gallery/astrology_2.png', alt: 'Astrology Store' },
      { id: 'as3', src: '/gallery/astrology_3.png', alt: 'Astrology Services' },
      { id: 'as4', src: '/gallery/astrology_4.png', alt: 'Astrology Home 1' },
      { id: 'as5', src: '/gallery/astrology_5.png', alt: 'Astrology Home 2' },
      { id: 'as6', src: '/gallery/astrology_6.png', alt: 'Astrology Booking' },
      { id: 'as7', src: '/gallery/astrology_7.png', alt: 'Astrology Admin Store' },
      { id: 'as8', src: '/gallery/astrology_8.png', alt: 'Astrology Client Dashboard' }
    ]
  },
  {
    id: 'healthians',
    name: 'BookHealthians',
    tag: 'healthcare',
    images: [
      { id: 'h1', src: '/gallery/healthians_mobile.png', alt: 'BookHealthians 1' },
      { id: 'h2', src: '/gallery/healthians_admin.png', alt: 'BookHealthians 2' },
      { id: 'h3', src: '/gallery/Screenshot 2026-08-04 220322.png', alt: 'BookHealthians 3' },
      { id: 'h4', src: '/gallery/Screenshot 2026-08-04 220255.png', alt: 'BookHealthians 4' },
      { id: 'h5', src: '/gallery/Screenshot 2026-08-04 220236.png', alt: 'BookHealthians 5' },
      { id: 'h6', src: '/gallery/www.bookhealthians.in_(Samsung Galax.png', alt: 'BookHealthians 6' },
      { id: 'h7', src: '/gallery/Screenshot 2026-08-04 224343.png', alt: 'BookHealthians 7' }
    ]
  },
  {
    id: 'ai-verse',
    name: 'AIVerse Hub 2.0',
    tag: 'ai',
    images: [
      { id: 'ai1', src: '/gallery/WhatsApp Image 2026-08-04 at 10.40.55 PM.jpeg', alt: 'AIVerse 1' },
      { id: 'ai2', src: '/gallery/Screenshot 2026-08-04 223331.png', alt: 'AIVerse 2' },
      { id: 'ai3', src: '/gallery/Screenshot 2026-08-04 223349.png', alt: 'AIVerse 3' },
      { id: 'ai4', src: '/gallery/Screenshot 2026-08-04 223321.png', alt: 'AIVerse 4' },
      { id: 'ai5', src: '/gallery/Screenshot 2026-08-04 223358.png', alt: 'AIVerse 5' },
      { id: 'ai6', src: '/gallery/Screenshot 2026-08-04 223047.png', alt: 'AIVerse 6' }
    ]
  },
  {
    id: 'portify',
    name: 'Portify AI',
    tag: 'ai',
    images: [
      { id: 'p1', src: '/gallery/localhost_3000_.png', alt: 'Portify 1' }
    ]
  },
  {
    id: 'pinjillyn',
    name: 'Pinjillyn Resort & Spa',
    tag: 'hospitality',
    images: [
      { id: 'pj1', src: '/gallery/localhost_2500_ (2).png', alt: 'Pinjillyn 1' },
      { id: 'pj2', src: '/gallery/Screenshot 2026-08-04 223614.png', alt: 'Pinjillyn 2' },
      { id: 'pj3', src: '/gallery/Screenshot 2026-08-04 223624.png', alt: 'Pinjillyn 3' },
      { id: 'pj4', src: '/gallery/Screenshot 2026-08-04 223634.png', alt: 'Pinjillyn 4' },
      { id: 'pj5', src: '/gallery/Screenshot 2026-08-04 223642.png', alt: 'Pinjillyn 5' },
      { id: 'pj6', src: '/gallery/localhost_2500_ (1).png', alt: 'Pinjillyn 6' },
      { id: 'pj7', src: '/gallery/Screenshot 2026-08-04 223654.png', alt: 'Pinjillyn 7' }
    ]
  },
  {
    id: 'raimona-rish',
    name: 'Raimona Rish Aqua Park',
    tag: 'hospitality',
    images: [
      { id: 'rr1', src: '/gallery/localhost_3000_ (1).png', alt: 'Raimona Rish 1' },
      { id: 'rr2', src: '/gallery/localhost_3000_ (3).png', alt: 'Raimona Rish 2' },
      { id: 'rr3', src: '/gallery/Screenshot 2026-08-04 223445.png', alt: 'Raimona Rish 3' },
      { id: 'rr4', src: '/gallery/Screenshot 2026-08-04 223512.png', alt: 'Raimona Rish 4' },
      { id: 'rr5', src: '/gallery/Screenshot 2026-08-04 223522.png', alt: 'Raimona Rish 5' },
      { id: 'rr6', src: '/gallery/Screenshot 2026-08-04 223529.png', alt: 'Raimona Rish 6' },
      { id: 'rr7', src: '/gallery/Screenshot 2026-08-04 223547.png', alt: 'Raimona Rish 7' }
    ]
  },
  {
    id: 'runfest',
    name: 'RunFest National Challenge',
    tag: 'event',
    images: [
      { id: 'r1', src: '/gallery/runfest_desktop.png', alt: 'RunFest 1' },
      { id: 'r2', src: '/gallery/ChatGPT Image Jul 29, 2026, 10_18.png', alt: 'RunFest 2' }
    ]
  },
  {
    id: 'ai-automation',
    name: 'CastFlow AI & Systems',
    tag: 'ai',
    images: [
      { id: 'c1', src: '/gallery/castflow_hero.jpg', alt: 'CastFlow 1' },
      { id: 'c2', src: '/gallery/WhatsApp Image 2026-08-04 at 10.40.53 PM.jpeg', alt: 'CastFlow 2' }
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
        title="Project Gallery | CastFlow"
        description="Browse our complete portfolio visual archive and deployed product screenshots."
        keywords="Project Gallery, Web Development Portfolio, CastFlow Screenshots, Custom Software UI"
        url="/gallery"
      />

      {/* Pure Visual Fullscreen Lightbox Modal (Zero Text) */}
      {selectedImg && (
        <div 
          onClick={() => setSelectedImg(null)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)',
            zIndex: 999999, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: isMobile ? '1rem' : '2.5rem', cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            style={{
              position: 'absolute', top: isMobile ? '15px' : '25px', right: isMobile ? '15px' : '25px',
              background: 'rgba(255, 255, 255, 0.2)', border: '1px solid rgba(255,255,255,0.4)',
              color: '#FFF', borderRadius: '50%', width: '44px', height: '44px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', zIndex: 1000000, transition: 'all 0.2s'
            }}
          >
            <X size={22} />
          </button>

          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ position: 'relative', maxWidth: '1200px', maxHeight: '90vh', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' }}
          >
            <img 
              src={encodeURI(import.meta.env.BASE_URL + selectedImg.src.replace(/^\//, ''))} 
              alt={selectedImg.alt}
              style={{ width: 'auto', height: 'auto', maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
            />
          </div>
        </div>
      )}

      {/* Main Page Container */}
      <div style={{ padding: isMobile ? '6rem 1.25rem 4rem' : '7rem 2rem 5rem', maxWidth: '1240px', margin: '0 auto', minHeight: '100vh', background: '#FFF', fontFamily: '"Inter", sans-serif' }}>
        
        {/* Navigation / Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          style={{ 
            background: 'transparent', border: '1px solid rgba(0,0,0,0.1)', 
            color: '#444', padding: '8px 18px', borderRadius: '30px', fontWeight: 600, fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '2.5rem',
            transition: 'all 0.2s' 
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#444'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)'; }}
        >
          <ArrowLeft size={15} /> Back
        </button>

        {/* Clean Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, margin: 0, color: '#111', letterSpacing: '-1px' }}>
            Gallery
          </h1>
        </div>

        {/* Filter Pill Tabs */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '3.5rem', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All' },
            { id: 'healthcare', label: 'Healthcare' },
            { id: 'consulting', label: 'Consulting' },
            { id: 'ai', label: 'AI & SaaS' },
            { id: 'hospitality', label: 'Hospitality' },
            { id: 'event', label: 'Sports' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px', borderRadius: '30px', fontSize: '0.9rem', fontWeight: 600,
                whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
                background: activeTab === tab.id ? '#111' : '#F8FAFC',
                color: activeTab === tab.id ? '#FFF' : '#555',
                border: activeTab === tab.id ? '1px solid #111' : '1px solid rgba(0,0,0,0.08)',
                boxShadow: activeTab === tab.id ? '0 4px 10px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Organized Photo Gallery (Zero Card Text) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', marginBottom: '5rem' }}
          >
            {filteredAlbums.map((album) => (
              <div key={album.id}>
                {/* Minimalist Section Title */}
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 1.25rem 0', color: '#111', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '0.75rem' }}>
                  {album.name}
                </h2>

                {/* Pure Photo Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(260px, 1fr))', 
                  gap: isMobile ? '0.75rem' : '1.5rem' 
                }}>
                  {album.images.map((img) => (
                    <div 
                      key={img.id}
                      onClick={() => setSelectedImg(img)}
                      style={{
                        borderRadius: '12px', overflow: 'hidden', background: '#F8FAFC',
                        border: '1px solid rgba(0,0,0,0.08)', position: 'relative',
                        cursor: 'zoom-in', height: isMobile ? '150px' : '200px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.03)', transition: 'all 0.25s ease'
                      }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.08)'; e.currentTarget.style.borderColor = '#111'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
                    >
                      <img 
                        src={encodeURI(import.meta.env.BASE_URL + img.src.replace(/^\//, ''))} 
                        alt={img.alt} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.4s ease' }} 
                        onMouseOver={(e) => e.target.style.transform = 'scale(1.04)'}
                        onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>

      <ContactSection />
    </>
  );
};

export default GalleryPage;
