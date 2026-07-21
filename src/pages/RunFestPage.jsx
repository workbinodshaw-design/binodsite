import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const RunFestPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Countdown Timer Logic
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-12-31T23:59:59') - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  // Reusable Animation Variants (Optimized for Mobile)
  const fadeUp = {
    hidden: { opacity: 0, y: isMobile ? 15 : 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isMobile ? 0.05 : 0.1 }
    }
  };

  return (
    <div style={{ backgroundColor: '#FAFAFA', color: '#0F172A', fontFamily: '"Inter", "SF Pro Display", sans-serif', overflowX: 'hidden' }}>
      <SEO 
        title="RunFest 2026 | The Ultimate Virtual Marathon" 
        description="Join the movement. RunFest 2026 is India's most premium virtual marathon. Earn your official heavy-metal medal and digital certificate."
      />

      {/* Static Vibrant Mesh Background (Mobile Optimized) */}
      <div style={{
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 15% 50%, rgba(249, 115, 22, 0.08), transparent 50%), radial-gradient(circle at 85% 30%, rgba(37, 99, 235, 0.08), transparent 50%)'
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ================= STICKY BANNER ================= */}
        <div style={{ width: '100%', backgroundColor: '#0F172A', color: '#FFF', textAlign: 'center', padding: '10px', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', position: 'fixed', top: 0, zIndex: 50 }}>
          🔥 OVER 1,200 RUNNERS REGISTERED. SPOTS FILLING FAST. 🔥
        </div>

        {/* ================= HERO SECTION ================= */}
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px', paddingBottom: '40px', overflow: 'hidden' }}>
          
          {/* Dynamic Hero Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
             <img src="/runfest_hero.png" alt="RunFest Event" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.8 }} />
             <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(250,250,250,0.3) 0%, rgba(250,250,250,0.95) 70%, #FAFAFA 100%)' }}></div>
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', maxWidth: '900px', padding: '0 20px', zIndex: 2, width: '100%' }}>
            
            <motion.div variants={fadeUp} style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: 'rgba(37,99,235,0.1)', color: '#2563EB', borderRadius: '20px', fontWeight: 700, fontSize: '0.85rem', marginBottom: '20px', border: '1px solid rgba(37,99,235,0.2)' }}>
              INDIA'S #1 VIRTUAL MARATHON
            </motion.div>

            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3.5rem, 12vw, 7rem)', fontWeight: 900, letterSpacing: '-0.06em', color: '#0F172A', margin: 0, lineHeight: 0.9 }}>
              RUNFEST <span style={{ background: 'linear-gradient(90deg, #2563EB, #F97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>26</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', color: '#475569', margin: '30px auto', fontWeight: 500, maxWidth: '600px', lineHeight: 1.5 }}>
              Run Anywhere. Run Anytime. Complete the challenge and earn your premium metal hardware.
            </motion.p>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', marginTop: '40px' }}>
              <a href="#registration" style={{ width: isMobile ? '100%' : 'auto', padding: '18px 45px', backgroundColor: '#0F172A', color: '#fff', borderRadius: '16px', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none', boxShadow: '0 20px 40px rgba(15,23,42,0.25)', transition: 'transform 0.2s', display: 'block' }}>
                Claim Your Spot
              </a>
            </motion.div>

            {/* Mobile-Optimized Stat Grid */}
            <motion.div variants={staggerContainer} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: '15px', marginTop: '60px' }}>
              {[
                { val: '1.2k+', label: 'Runners' },
                { val: '80+', label: 'Cities' },
                { val: '100%', label: 'Verified' },
                { val: '24/7', label: 'Support' }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} style={{ 
                  background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(12px)', padding: '20px 10px', borderRadius: '20px', 
                  boxShadow: '0 8px 32px rgba(0,0,0,0.04)', border: '1px solid rgba(255,255,255,1)', textAlign: 'center'
                }}>
                  <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563EB', letterSpacing: '-0.04em' }}>{stat.val}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748B', textTransform: 'uppercase', marginTop: '5px' }}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>


        {/* ================= CHOOSE YOUR DISTANCE ================= */}
        <section style={{ padding: isMobile ? '60px 20px' : '100px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '50px' }}>
              <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: 0 }}>The Challenge.</h2>
              <p style={{ fontSize: '1.2rem', color: '#64748B', marginTop: '10px', fontWeight: 500 }}>Select your battlefield.</p>
            </motion.div>

            <div style={{ display: 'flex', overflowX: 'auto', gap: '20px', paddingBottom: '20px', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
              {[
                { dist: '3K', label: 'Starter', color: '#10B981' },
                { dist: '5K', label: 'Beginner', color: '#3B82F6' },
                { dist: '10K', label: 'Challenger', color: '#8B5CF6' },
                { dist: '21K', label: 'Half Marathon', color: '#F59E0B' },
                { dist: '42K', label: 'Full Marathon', color: '#EF4444' }
              ].map((d, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.05 }}
                  whileHover={!isMobile ? { y: -8, scale: 1.02 } : {}}
                  style={{ 
                    flex: '0 0 auto', width: isMobile ? '160px' : '200px', backgroundColor: '#FFFFFF', padding: '30px 20px', 
                    borderRadius: '24px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)',
                    scrollSnapAlign: 'start'
                  }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 900, color: d.color, margin: 0, letterSpacing: '-0.06em' }}>{d.dist}</h3>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94A3B8', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{d.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ================= REWARDS (THE LOOT) ================= */}
        <section style={{ padding: isMobile ? '60px 20px' : '100px 20px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '50px' }}>
              <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: 0 }}>The Loot.</h2>
              <p style={{ fontSize: '1.2rem', color: '#64748B', marginTop: '10px', fontWeight: 500 }}>High-end hardware you actually want to wear.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: '30px' }}>
              {[
                { img: '/runfest_medal.png', title: 'Heavy-Metal Gold Medal', desc: 'Die-cast zinc alloy with premium ribbon.' },
                { img: '/runfest_tshirt.png', title: 'Aero-Dry Performance Tee', desc: 'Breathable, moisture-wicking fabric.' },
                { img: '/runfest_certificate.png', title: 'Verified Certificate', desc: 'Official digital proof of your time.' },
                { img: '/runfest_badge.png', title: '3D Digital Badge', desc: 'Unlockable achievement for your profile.' }
              ].map((reward, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  whileHover={!isMobile ? { scale: 1.02 } : {}}
                  style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
                  <img src={reward.img} alt={reward.title} style={{ width: '100%', height: isMobile ? '250px' : '400px', objectFit: 'cover' }} />
                  <div style={{ padding: '30px' }}>
                    <h3 style={{ margin: '0 0 10px 0', fontSize: '1.4rem', fontWeight: 800 }}>{reward.title}</h3>
                    <p style={{ margin: 0, color: '#64748B', fontWeight: 500 }}>{reward.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ================= REGISTRATION PLANS ================= */}
        <section id="registration" style={{ padding: isMobile ? '80px 20px' : '120px 20px', position: 'relative' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0 }}>Secure Your Spot.</h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '30px', alignItems: isMobile ? 'stretch' : 'center', justifyContent: 'center' }}>
              
              {/* Digital Pass */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ flex: 1, maxWidth: isMobile ? '100%' : '350px', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>Digital Pass</h3>
                <div style={{ fontSize: '3rem', fontWeight: 900, margin: '15px 0', letterSpacing: '-0.04em' }}>₹349</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['E-Certificate', 'Digital Badge', 'Global Leaderboard'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ color: '#0F172A' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '18px', backgroundColor: '#F1F5F9', color: '#0F172A', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem' }}>
                  Select
                </button>
              </motion.div>

              {/* Finisher Pass - Glowing / Highlighted */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
                style={{ 
                  flex: 1, maxWidth: isMobile ? '100%' : '400px', backgroundColor: '#0F172A', padding: '50px 40px', borderRadius: '32px', 
                  boxShadow: '0 30px 60px rgba(15,23,42,0.3)', position: 'relative', color: '#FFFFFF', 
                  transform: isMobile ? 'none' : 'scale(1.05)', zIndex: 10, border: '1px solid rgba(255,255,255,0.1)'
                }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#F97316', color: '#FFF', padding: '8px 24px', borderRadius: '20px', fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Most Popular
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#60A5FA', textTransform: 'uppercase' }}>Finisher Pass</h3>
                <div style={{ fontSize: '4rem', fontWeight: 900, margin: '15px 0', letterSpacing: '-0.04em' }}>₹799</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['Heavy-Metal Medal', 'Performance T-Shirt', 'Printed Certificate', 'Leaderboard Entry', 'Free Shipping in India'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, color: '#F8FAFC' }}>
                      <span style={{ color: '#F97316' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '18px', backgroundColor: '#FFFFFF', color: '#0F172A', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  Claim Pass
                </button>
              </motion.div>

              {/* Premium Pass */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
                style={{ flex: 1, maxWidth: isMobile ? '100%' : '350px', backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', border: '1px solid #F1F5F9' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase' }}>VIP Pass</h3>
                <div style={{ fontSize: '3rem', fontWeight: 900, margin: '15px 0', letterSpacing: '-0.04em' }}>₹999</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['Everything in Finisher', 'Priority 48hr Dispatch', 'VIP Golden Badge', 'Exclusive Community Access'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#475569', fontWeight: 600 }}>
                      <span style={{ color: '#0F172A' }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '18px', backgroundColor: '#F1F5F9', color: '#0F172A', border: 'none', borderRadius: '16px', fontWeight: 800, fontSize: '1.1rem' }}>
                  Select
                </button>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ================= COUNTDOWN ================= */}
        <section style={{ padding: '80px 20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', marginBottom: '40px' }}>
              TIME IS RUNNING OUT
            </motion.h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '10px' : '20px', flexWrap: 'nowrap' }}>
              {Object.keys(timeLeft).length > 0 ? Object.entries(timeLeft).map(([unit, value], i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: '#F8FAFC', padding: isMobile ? '15px 10px' : '30px', borderRadius: '20px', flex: 1, boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
                  <div style={{ fontSize: 'clamp(2rem, 8vw, 4rem)', fontWeight: 900, color: '#0F172A', lineHeight: 1, letterSpacing: '-0.05em' }}>
                    {String(value).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: 'clamp(0.6rem, 2vw, 0.9rem)', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginTop: '10px', letterSpacing: '0.05em' }}>{unit}</div>
                </motion.div>
              )) : (
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#EF4444' }}>Registration Closed!</div>
              )}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section style={{ padding: isMobile ? '60px 20px' : '100px 20px' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: 'clamp(2.2rem, 8vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em' }}>Questions?</h2>
            </motion.div>
            
            {[
              { q: 'Where do I actually run?', a: 'Anywhere! That is the beauty of a virtual marathon. You can run in your local park, on your street, or even on a treadmill.' },
              { q: 'How do I submit my proof?', a: 'Just take a screenshot of your run on any tracking app (Apple Watch, Strava, Garmin, Nike Run Club) and upload it to our portal.' },
              { q: 'When do I get my medal?', a: 'Medals and T-shirts are dispatched via premium courier within 10 days of your run verification.' }
            ].map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ borderBottom: '2px solid #F1F5F9', padding: '25px 0', cursor: 'pointer' }}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, paddingRight: '20px' }}>{faq.q}</h3>
                  <span style={{ fontSize: '1.5rem', fontWeight: 400, transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.2s ease-out' }}>+</span>
                </div>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <p style={{ color: '#64748B', marginTop: '15px', lineHeight: 1.6, fontWeight: 500 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section style={{ padding: isMobile ? '80px 20px' : '120px 20px', backgroundColor: '#0F172A', color: '#FFF', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ fontSize: 'clamp(2.5rem, 10vw, 5rem)', fontWeight: 900, letterSpacing: '-0.05em', margin: '0 0 20px 0', lineHeight: 1 }}>
              DO IT FOR<br/>THE GLORY.
            </motion.h2>
            <motion.a initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} href="#registration"
              style={{ display: 'inline-block', marginTop: '40px', padding: '20px 50px', backgroundColor: '#2563EB', color: '#FFF', borderRadius: '20px', fontWeight: 800, fontSize: '1.2rem', textDecoration: 'none', boxShadow: '0 20px 40px rgba(37,99,235,0.4)', width: isMobile ? '100%' : 'auto' }}>
              Claim Your Spot
            </motion.a>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer style={{ backgroundColor: '#020617', color: '#64748B', padding: '40px 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap', marginBottom: '30px', fontWeight: 600, fontSize: '0.9rem' }}>
            <Link to="/privacy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms" style={{ color: '#94A3B8', textDecoration: 'none' }}>Terms</Link>
            <Link to="/refund-policy" style={{ color: '#94A3B8', textDecoration: 'none' }}>Refunds</Link>
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 500 }}>
            © 2026 RunFest. Powered by <span style={{ color: '#FFF', fontWeight: 800 }}>CastFlow</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default RunFestPage;
