import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const RunFestPage = () => {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Global Scroll for parallax
  const { scrollYProgress } = useScroll();
  
  // Custom Styles matching the exact typography system
  const styles = {
    bg: { backgroundColor: '#FFFFFF', color: '#111827', overflowX: 'hidden' },
    heroTitle: { fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: isMobile ? '52px' : 'clamp(90px, 10vw, 140px)', letterSpacing: '-2px', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 },
    bgNumber: { position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: '"Clash Display", sans-serif', fontWeight: 900, fontSize: isMobile ? '180px' : 'clamp(220px, 20vw, 320px)', opacity: 0.05, zIndex: 0, pointerEvents: 'none' },
    tagline: { fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? '24px' : '30px', color: '#4B5563', margin: '20px 0' },
    subheading: { fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: isMobile ? '18px' : '22px', color: '#6B7280', margin: '0 0 40px 0' },
    sectionHeading: { fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : '72px', margin: '0 0 20px 0', letterSpacing: '-1px', lineHeight: 1.1 },
    sectionDesc: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.8, maxWidth: '700px', color: '#4B5563' },
    btn: { fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', borderRadius: '999px', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s ease', width: isMobile ? '100%' : 'auto' },
    btnPrimary: { backgroundColor: '#111827', color: '#FFFFFF', border: '1px solid #111827' },
    btnGlowing: { backgroundColor: '#F97316', color: '#FFFFFF', border: 'none', boxShadow: '0 10px 30px rgba(249, 115, 22, 0.4)' },
    sectionPadding: { padding: isMobile ? '80px 5vw' : '150px 5vw' }
  };

  // Parallax Values for Hero
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, isMobile ? 50 : 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Framer Variants
  const revealUp = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: isMobile ? 0.05 : 0.1 } }
  };

  return (
    <div style={styles.bg}>
      <SEO title="RUNFEST 26 | CastFlow" description="A race against yourself, on your own terms." />

      {/* ================= HERO (100VH) ================= */}
      <section style={{ position: 'relative', width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
        {/* Unobstructed Background */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: -1, y: heroY }}>
          {/* OPTIMIZATION: Eager load hero image with high priority */}
          <img src="/runfest_hero.png" alt="RunFest Sunrise" loading="eager" fetchPriority="high" decoding="async" style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center' }} />
        </motion.div>

        {/* Content */}
        <motion.div style={{ zIndex: 1, textAlign: 'center', opacity: heroOpacity, padding: '0 20px', width: '100%' }} initial="hidden" animate="visible" variants={stagger}>
          <div style={styles.bgNumber}>26</div>
          <motion.h1 variants={revealUp} style={styles.heroTitle}>RUNFEST</motion.h1>
          <motion.div variants={revealUp} style={styles.tagline}>Move. Breathe. Conquer.</motion.div>
          <motion.div variants={revealUp} style={styles.subheading}>A race against yourself, on your own terms.</motion.div>
          
          <motion.a variants={revealUp} href="#register" style={{ ...styles.btn, ...styles.btnPrimary, marginTop: '20px' }}>
            Commit now
          </motion.a>
          
          <motion.div variants={revealUp} style={{ marginTop: '40px', fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#4B5563', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
            1,200+ on the starting line
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}
        >
          <div style={{ width: '1px', height: '40px', backgroundColor: '#111827' }}></div>
        </motion.div>
      </section>

      {/* ================= THE STORY ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 500, fontSize: isMobile ? '48px' : 'clamp(40px, 8vw, 100px)', lineHeight: 1, color: '#111827', margin: isMobile ? '0 0 50px 0' : '0 0 100px 0', letterSpacing: '-1px' }}>
            "You against<br/>yesterday."
          </h2>
        </motion.div>
        
        {/* Full Width Cinematic Image */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} style={{ width: '100%', height: isMobile ? '50vh' : '70vh', borderRadius: '4px', overflow: 'hidden' }}>
          {/* OPTIMIZATION: Lazy load */}
          <img src="/runfest_story.png" alt="Exhausted Runner" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </section>

      {/* ================= DISTANCE SELECTOR ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={styles.sectionHeading}>Pick your battle.</motion.h2>
          
          <div style={{ marginTop: isMobile ? '40px' : '80px', display: 'flex', overflowX: 'auto', gap: isMobile ? '20px' : '40px', paddingBottom: '40px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}>
            {['3K', '5K', '10K', '21K', '42K'].map((dist, i) => {
              const subtitles = { '3K': 'The warm-up', '5K': 'The sprint', '10K': 'The milestone', '21K': 'The half', '42K': 'The marathon' };
              return (
                <motion.div key={dist} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }}
                  whileHover={!isMobile ? { scale: 1.05, x: 10 } : {}}
                  style={{ 
                    flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                    width: isMobile ? '220px' : '300px', height: isMobile ? '150px' : '200px', borderBottom: '2px solid #E5E7EB', cursor: 'pointer', scrollSnapAlign: 'start'
                  }}>
                  <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: isMobile ? '60px' : '80px', letterSpacing: '-2px', color: '#111827', lineHeight: 1 }}>{dist}</div>
                  <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', marginTop: '10px' }}>{subtitles[dist]}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= THE MEDAL (HARDWARE) ================= */}
      <section style={{ height: isMobile ? '70vh' : '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} viewport={{ once: true }} style={{ position: 'absolute', zIndex: 1, top: isMobile ? '10%' : 'auto' }}>
          {/* OPTIMIZATION: Lazy load */}
          <motion.img 
            animate={!isMobile ? { y: [-20, 20, -20], rotateZ: [-2, 2, -2] } : { y: [-10, 10, -10] }} 
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            src="/runfest_medal.png" alt="RunFest Medal" loading="lazy" decoding="async" style={{ width: isMobile ? '80vw' : 'clamp(300px, 40vw, 600px)', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.15))', maxWidth: '400px' }} 
          />
        </motion.div>
        
        <div style={{ position: 'absolute', bottom: isMobile ? '5%' : '10%', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: isMobile ? '18px' : '24px', letterSpacing: '2px', textTransform: 'uppercase', color: '#111827' }}>
            Heavy metal.
          </motion.h3>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionDesc, margin: '10px auto 0 auto' }}>
            Earned, not given. Cast from solid steel to mark the miles.
          </motion.p>
        </div>
      </section>

      {/* ================= THE TSHIRT (MAGAZINE) ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '80px', alignItems: 'center' }}>
          <motion.div initial={{ x: isMobile ? 0 : -50, y: isMobile ? 50 : 0, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%' }}>
            {/* OPTIMIZATION: Lazy load */}
            <img src="/runfest_tshirt.png" alt="Premium T-Shirt" loading="lazy" decoding="async" style={{ width: '100%', borderRadius: '4px' }} />
          </motion.div>
          <motion.div initial={{ x: isMobile ? 0 : 50, y: isMobile ? 50 : 0, opacity: 0 }} whileInView={{ x: 0, y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%' }}>
            <h2 style={styles.sectionHeading}>Built to<br/>breathe.</h2>
            <p style={styles.sectionDesc}>
              Woven for the hottest days and the longest routes. It disappears when you move, so you can focus on the road ahead.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CERTIFICATE & BADGE ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.03), transparent 70%)', pointerEvents: 'none' }}></div>
        
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: isMobile ? '80px' : '150px' }}>
          
          {/* Certificate */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ width: isMobile ? '100%' : '50%', order: isMobile ? 2 : 1 }}>
                <h2 style={styles.sectionHeading}>On the<br/>record.</h2>
                <p style={styles.sectionDesc}>Your time, locked in. A permanent mark of what you accomplished when nobody was watching.</p>
             </motion.div>
             <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 2 }}>
               {/* OPTIMIZATION: Lazy load */}
               <img src="/runfest_certificate.png" alt="Certificate" loading="lazy" decoding="async" style={{ width: isMobile ? '100%' : '80%', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.08))', transform: 'rotate(2deg)' }} />
             </motion.div>
          </div>

          {/* Digital Badge (Phone Simulation) */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
             <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: 'center' }}>
                {/* CSS Phone Frame */}
                <div style={{ width: '320px', height: '650px', backgroundColor: '#111827', borderRadius: '50px', padding: '12px', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', transform: isMobile ? 'scale(0.8)' : 'scale(1)' }}>
                   <div style={{ width: '100%', height: '100%', backgroundColor: '#FFFFFF', borderRadius: '38px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '60px' }}>
                      <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '18px', color: '#111827', marginBottom: '40px' }}>Trophy Cabinet</div>
                      {/* OPTIMIZATION: Lazy load */}
                      <img src="/runfest_badge.png" alt="3D Badge" loading="lazy" decoding="async" style={{ width: '180px' }} />
                      <div style={{ marginTop: '20px', fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '24px' }}>RunFest Finisher</div>
                   </div>
                </div>
             </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ width: isMobile ? '100%' : '50%' }}>
                <h2 style={styles.sectionHeading}>Carry the<br/>badge.</h2>
                <p style={styles.sectionDesc}>Unlock a 3D emblem for your digital life. Visual proof that you crossed the finish line.</p>
             </motion.div>
          </div>

        </div>
      </section>

      {/* ================= TIMELINE ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', overflowX: 'auto', paddingBottom: '40px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ position: 'absolute', top: '15px', left: 0, width: isMobile ? '200%' : '100%', height: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }}></div>
            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1.5, ease: 'easeInOut' }} viewport={{ once: true }} style={{ position: 'absolute', top: '15px', left: 0, width: isMobile ? '200%' : '100%', height: '2px', backgroundColor: '#111827', zIndex: 1, originX: 0 }}></motion.div>

            {['Sign up', 'Lace up', 'Log it', 'Verified', 'Unbox'].map((step, i) => (
              <div key={i} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '180px' : '20%', flexShrink: 0 }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#111827', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '14px', marginBottom: '20px', border: '4px solid #FAFAFA' }}>{i + 1}</div>
                <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#111827', textAlign: 'center' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= REGISTRATION (APPLE STORE STYLE) ================= */}
      <section id="register" style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: isMobile ? '40px' : '80px' }}>Choose your tier.</motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
            
            {/* Digital Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ backgroundColor: '#F9FAFB', borderRadius: '24px', padding: isMobile ? '30px 20px' : '50px 40px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>Digital</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', margin: '10px 0 30px 0' }}>Just the race.</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', marginBottom: '40px' }}>₹349</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                {['Race entry', 'Digital certificate', 'Global ranking'].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>{f}</li>
                ))}
              </ul>
              <button style={{ ...styles.btn, backgroundColor: '#E5E7EB', color: '#111827', border: 'none', width: '100%' }}>Select</button>
            </motion.div>

            {/* Finisher Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: isMobile ? 0 : 0.1 }} style={{ backgroundColor: '#F9FAFB', borderRadius: '24px', padding: isMobile ? '40px 20px' : '50px 40px', display: 'flex', flexDirection: 'column', position: 'relative', border: '2px solid #111827' }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0EA5E9', color: '#FFF', padding: '6px 16px', borderRadius: '12px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>POPULAR</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>The Hardware</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', margin: '10px 0 30px 0' }}>Leave with proof.</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', marginBottom: '40px' }}>₹799</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                {['Solid metal medal', 'Performance tee', 'Printed certificate', 'Delivered to your door'].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>{f}</li>
                ))}
              </ul>
              <button style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }}>Select</button>
            </motion.div>

            {/* VIP Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: isMobile ? 0 : 0.2 }} style={{ backgroundColor: '#F9FAFB', borderRadius: '24px', padding: isMobile ? '30px 20px' : '50px 40px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>VIP</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', margin: '10px 0 30px 0' }}>The full treatment.</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', marginBottom: '40px' }}>₹999</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                {['All hardware rewards', 'Skip the shipping queue', 'Gold-tier digital badge', 'Private community invite'].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563', padding: '10px 0', borderBottom: '1px solid #E5E7EB' }}>{f}</li>
                ))}
              </ul>
              <button style={{ ...styles.btn, backgroundColor: '#E5E7EB', color: '#111827', border: 'none', width: '100%' }}>Select</button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))', gap: isMobile ? '60px' : '80px' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
            <div style={{ width: '100%', height: isMobile ? '350px' : '300px', overflow: 'hidden', borderRadius: '4px', marginBottom: '30px' }}>
               {/* OPTIMIZATION: Lazy load */}
               <img src="/runfest_testimonial1.png" alt="Runner" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: isMobile ? '28px' : '32px', color: '#111827', lineHeight: 1.2 }}>
              "I ran my fastest 10K because I wanted that medal. When it arrived, I wasn't disappointed."
            </div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#6B7280', marginTop: '15px' }}>— Rahul K., 10K Finisher</div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: isMobile ? 0 : 0.2 }}>
            <div style={{ width: '100%', height: isMobile ? '350px' : '300px', overflow: 'hidden', borderRadius: '4px', marginBottom: '30px' }}>
               {/* OPTIMIZATION: Lazy load */}
               <img src="/runfest_testimonial2.png" alt="Runner" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: isMobile ? '28px' : '32px', color: '#111827', lineHeight: 1.2 }}>
              "No crowds. No starting gun. Just me, the road, and a goal. The gear is legitimately good."
            </div>
            <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#6B7280', marginTop: '15px' }}>— Priya S., Half Marathon</div>
          </motion.div>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={{ padding: isMobile ? '100px 5vw' : '200px 5vw', backgroundColor: '#111827', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
           <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : 'clamp(40px, 8vw, 80px)', color: '#FFFFFF', margin: '0 0 40px 0', letterSpacing: '-1px' }}>
             The starting line<br/>is waiting.
           </h2>
           <a href="#register" style={{ ...styles.btn, ...styles.btnGlowing, padding: '20px 50px', fontSize: '18px' }}>
             Commit now
           </a>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={{ padding: '40px 5vw', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
         <div style={{ display: 'flex', gap: '30px' }}>
            {['Privacy', 'Terms', 'Refunds'].map((link) => (
              <Link key={link} to="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#6B7280', textDecoration: 'none' }}>{link}</Link>
            ))}
         </div>
         <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#9CA3AF' }}>
            © 2026 RunFest. Handcrafted by CastFlow.
         </div>
      </footer>

    </div>
  );
};

export default RunFestPage;
