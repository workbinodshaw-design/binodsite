import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const RunFestPage = () => {
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

  // Reusable Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: '#111827', fontFamily: '"Inter", "SF Pro Display", sans-serif', overflowX: 'hidden' }}>
      <SEO 
        title="RunFest 2026 | India's Virtual Marathon" 
        description="Join RunFest 2026, India's premier virtual marathon. Run anywhere, anytime, and earn your official premium medal and digital certificate. Powered by CastFlow."
      />

      {/* Floating Gradient Background Blobs for overall Gen Z aesthetic */}
      <div style={{
        position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', zIndex: 0, overflow: 'hidden', pointerEvents: 'none'
      }}>
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0], y: [0, -50, 0] }} 
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -60, 0], y: [0, 60, 0] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(249,115,22,0.05) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>

        {/* ================= HERO SECTION ================= */}
        <section style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '100px', overflow: 'hidden' }}>
          {/* Background Image with Gradient Overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
            <img src="/runfest_hero.png" alt="RunFest Finish Line" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.9) 80%, #FFFFFF 100%)' }}></div>
          </div>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: 'center', maxWidth: '1000px', padding: '0 20px', zIndex: 2 }}>
            <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, letterSpacing: '-0.04em', color: '#111827', margin: 0, lineHeight: 1.1 }}>
              RUNFEST <span style={{ color: '#2563EB' }}>2026</span>
            </motion.h1>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)', fontWeight: 600, color: '#374151', margin: '20px 0', letterSpacing: '-0.02em' }}>
              India's Virtual Marathon
            </motion.h2>
            <motion.div variants={fadeUp} style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', color: '#6B7280', marginBottom: '40px', fontWeight: 500 }}>
              Run Anywhere. Run Anytime.<br />Celebrate Every Finish.
            </motion.div>

            <motion.div variants={fadeUp} style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
              <a href="#registration" style={{ padding: '16px 40px', backgroundColor: '#2563EB', color: '#fff', borderRadius: '30px', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', boxShadow: '0 10px 25px rgba(37,99,235,0.3)', transition: 'all 0.3s ease' }}>
                Register Now
              </a>
              <a href="#about" style={{ padding: '16px 40px', backgroundColor: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(10px)', color: '#111827', borderRadius: '30px', fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.1)', transition: 'all 0.3s ease' }}>
                Learn More
              </a>
            </motion.div>

            {/* Floating Stat Cards */}
            <motion.div variants={staggerContainer} style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {[
                { icon: '🏃', text: '1,200+ Runners' },
                { icon: '🌎', text: '80+ Cities' },
                { icon: '🏅', text: 'Official Medal' },
                { icon: '📜', text: 'Finisher Certificate' }
              ].map((stat, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -5 }} style={{ 
                  background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '15px 25px', borderRadius: '20px', 
                  boxShadow: '0 8px 30px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '10px',
                  border: '1px solid rgba(255,255,255,1)'
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
                  <span style={{ fontWeight: 600, color: '#111827' }}>{stat.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} style={{ marginTop: '50px', fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
              Powered by <span style={{ color: '#2563EB' }}>CastFlow</span>
            </motion.div>
          </motion.div>
        </section>


        {/* ================= WHY RUNFEST ================= */}
        <section id="about" style={{ padding: '100px 20px', backgroundColor: '#F8FAFC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Why RunFest?</h2>
              <p style={{ fontSize: '1.2rem', color: '#6B7280', marginTop: '15px' }}>The ultimate virtual running experience designed for everyone.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              {[
                { title: 'Run Anywhere', desc: 'Your neighborhood, a treadmill, or a trail. You choose the venue.', icon: '🗺️' },
                { title: 'Official Medal', desc: 'A stunning, heavy-metal finisher medal shipped directly to your door.', icon: '🏅' },
                { title: 'Digital Certificate', desc: 'Personalized e-certificate with your timing and distance to share proudly.', icon: '📜' },
                { title: 'Nationwide Community', desc: 'Join thousands of runners across India in a massive virtual celebration.', icon: '🤝' }
              ].map((feature, idx) => (
                <motion.div key={idx} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                  style={{ 
                    backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '24px', 
                    boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease'
                  }}>
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{feature.icon}</div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>{feature.title}</h3>
                  <p style={{ color: '#6B7280', lineHeight: 1.6 }}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ================= CHOOSE YOUR DISTANCE ================= */}
        <section style={{ padding: '100px 20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Choose Your Distance</h2>
              <p style={{ fontSize: '1.2rem', color: '#6B7280', marginTop: '15px' }}>From beginners to ultra-runners, there's a goal for you.</p>
            </motion.div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
              {[
                { dist: '3 KM', label: 'Fun Run', color: '#10B981' },
                { dist: '5 KM', label: 'Beginner', color: '#3B82F6' },
                { dist: '10 KM', label: 'Challenger', color: '#6366F1' },
                { dist: '21.1 KM', label: 'Half Marathon', color: '#F59E0B' },
                { dist: '42.2 KM', label: 'Full Marathon', color: '#EF4444' }
              ].map((d, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  style={{ 
                    flex: '1 1 200px', maxWidth: '220px', backgroundColor: '#F8FAFC', padding: '40px 20px', 
                    borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(0,0,0,0.03)',
                    cursor: 'pointer'
                  }}>
                  <h3 style={{ fontSize: '2.5rem', fontWeight: 800, color: d.color, margin: 0, letterSpacing: '-0.05em' }}>{d.dist}</h3>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#6B7280', marginTop: '10px' }}>{d.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ================= REGISTRATION PLANS ================= */}
        <section id="registration" style={{ padding: '120px 20px', backgroundColor: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Registration Plans</h2>
              <p style={{ fontSize: '1.2rem', color: '#6B7280', marginTop: '15px' }}>Simple, transparent pricing. Pick your perfect package.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
              
              {/* Digital Pass */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ backgroundColor: '#FFFFFF', padding: '50px 40px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6B7280' }}>Digital Pass</h3>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, margin: '20px 0', letterSpacing: '-0.04em' }}>₹349</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['E-Certificate', 'Digital Badge', 'Leaderboard Entry'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontWeight: 500 }}>
                      <span style={{ color: '#22C55E' }}>✔</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '15px', backgroundColor: '#F3F4F6', color: '#111827', border: 'none', borderRadius: '20px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.3s' }}>
                  Select Pass
                </button>
              </motion.div>

              {/* Finisher Pass - Highlighted */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}
                style={{ backgroundColor: '#2563EB', padding: '60px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(37,99,235,0.2)', position: 'relative', color: '#FFFFFF', transform: 'scale(1.05)' }}>
                <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#F97316', color: '#FFF', padding: '8px 20px', borderRadius: '20px', fontWeight: 700, fontSize: '0.9rem', boxShadow: '0 5px 15px rgba(249,115,22,0.3)' }}>
                  Most Popular
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#BFDBFE' }}>Finisher Pass</h3>
                <div style={{ fontSize: '4rem', fontWeight: 800, margin: '20px 0', letterSpacing: '-0.04em' }}>₹799</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['Premium Medal', 'Dry-Fit T-Shirt', 'Certificate', 'Leaderboard', 'Shipping Included'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}>
                      <span style={{ color: '#F97316' }}>✔</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '15px', backgroundColor: '#FFFFFF', color: '#2563EB', border: 'none', borderRadius: '20px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                  Select Pass
                </button>
              </motion.div>

              {/* Premium Pass */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}
                style={{ backgroundColor: '#FFFFFF', padding: '50px 40px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#6B7280' }}>Premium Pass</h3>
                <div style={{ fontSize: '3.5rem', fontWeight: 800, margin: '20px 0', letterSpacing: '-0.04em' }}>₹999</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px 0', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {['Premium Metal Medal', 'Premium T-Shirt', 'Printed Certificate', 'Priority Dispatch', 'VIP Badge'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#374151', fontWeight: 500 }}>
                      <span style={{ color: '#22C55E' }}>✔</span> {item}
                    </li>
                  ))}
                </ul>
                <button style={{ width: '100%', padding: '15px', backgroundColor: '#F3F4F6', color: '#111827', border: 'none', borderRadius: '20px', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer', transition: 'background 0.3s' }}>
                  Select Pass
                </button>
              </motion.div>

            </div>
          </div>
        </section>


        {/* ================= HOW IT WORKS ================= */}
        <section style={{ padding: '120px 20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>How It Works</h2>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { step: '1', title: 'Register', desc: 'Choose your distance and pass.' },
                { step: '2', title: 'Run Anywhere', desc: 'Complete your distance on the event dates.' },
                { step: '3', title: 'Track', desc: 'Use any fitness app (Strava, Nike, Garmin).' },
                { step: '4', title: 'Upload', desc: 'Submit a screenshot of your run on our portal.' },
                { step: '5', title: 'Receive Rewards', desc: 'We verify and ship your premium medal and t-shirt.' }
              ].map((item, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '30px', backgroundColor: '#F8FAFC', padding: '30px', borderRadius: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#2563EB', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800, flexShrink: 0 }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 5px 0' }}>{item.title}</h3>
                    <p style={{ color: '#6B7280', margin: 0, fontSize: '1.1rem' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>


        {/* ================= REWARDS SHOWCASE ================= */}
        <section style={{ padding: '120px 20px', backgroundColor: '#F8FAFC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Premium Rewards</h2>
              <p style={{ fontSize: '1.2rem', color: '#6B7280', marginTop: '15px' }}>Quality you can feel. Memories you can keep.</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
              {[
                { img: '/runfest_medal.png', title: 'Gold Medal' },
                { img: '/runfest_tshirt.png', title: 'Premium Dry-Fit T-shirt' },
                { img: '/runfest_certificate.png', title: 'Elegant Certificate' },
                { img: '/runfest_badge.png', title: 'Digital Badge' }
              ].map((reward, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.04)' }}>
                  <img src={reward.img} alt={reward.title} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
                  <div style={{ padding: '25px', textAlign: 'center' }}>
                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>{reward.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= COUNTDOWN ================= */}
        <section style={{ padding: '100px 20px', backgroundColor: '#FFFFFF', textAlign: 'center' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '40px' }}>
              Registration Ends In
            </motion.h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {Object.keys(timeLeft).length > 0 ? Object.entries(timeLeft).map(([unit, value], i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: '#F8FAFC', padding: '30px', borderRadius: '24px', minWidth: '120px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                  <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#2563EB', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#6B7280', textTransform: 'uppercase', marginTop: '10px' }}>{unit}</div>
                </motion.div>
              )) : (
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#EF4444' }}>Registration Closed!</div>
              )}
            </div>
          </div>
        </section>

        {/* ================= TESTIMONIALS ================= */}
        <section style={{ padding: '100px 20px', backgroundColor: '#F8FAFC' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '80px' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, letterSpacing: '-0.03em', margin: 0 }}>Runner Stories</h2>
            </motion.div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              {[
                { name: 'Rahul Sharma', text: 'The medal quality is simply insane. Best virtual marathon experience in India!', city: 'Mumbai' },
                { name: 'Priya Patel', text: 'Loved the flexibility. Ran my first 5K in my neighborhood and got a beautiful certificate.', city: 'Ahmedabad' },
                { name: 'Karan Singh', text: 'The t-shirt is premium quality. Highly recommend RunFest for the amazing community.', city: 'Delhi' }
              ].map((t, i) => (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                  style={{ backgroundColor: '#FFFFFF', padding: '40px', borderRadius: '32px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                  <p style={{ fontSize: '1.1rem', color: '#374151', fontStyle: 'italic', marginBottom: '20px', lineHeight: 1.6 }}>"{t.text}"</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#E5E7EB' }}></div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#111827' }}>{t.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6B7280' }}>{t.city}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section style={{ padding: '100px 20px', backgroundColor: '#FFFFFF' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
              <h2 style={{ fontSize: '3rem', fontWeight: 800, letterSpacing: '-0.03em' }}>FAQ</h2>
            </motion.div>
            
            {[
              { q: 'Where do I run?', a: 'Anywhere! This is a virtual marathon. You can run in a park, on the road, or even on a treadmill.' },
              { q: 'How do I submit my run?', a: 'After completing your run, upload a screenshot from your tracking app (Strava, Apple Health, etc.) to your account dashboard.' },
              { q: 'When will I receive my medal?', a: 'Medals and t-shirts are dispatched within 10-15 working days after the event concludes.' }
            ].map((faq, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                style={{ borderBottom: '1px solid #E5E7EB', padding: '20px 0', cursor: 'pointer' }}
                onClick={() => setActiveFaq(activeFaq === i ? null : i)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, margin: 0 }}>{faq.q}</h3>
                  <span style={{ fontSize: '1.5rem', transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>+</span>
                </div>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                      <p style={{ color: '#6B7280', marginTop: '15px', lineHeight: 1.6 }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section style={{ padding: '120px 20px', backgroundColor: '#2563EB', color: '#FFF', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(/runfest_hero.png)', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay' }}></div>
          <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 800, letterSpacing: '-0.04em', margin: '0 0 20px 0' }}>
              Ready to Run?
            </motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ fontSize: '1.3rem', color: '#BFDBFE', marginBottom: '50px' }}>
              Join thousands of runners across India. Earn your rewards.
            </motion.p>
            <motion.a initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} whileHover={{ scale: 1.05 }} href="#registration"
              style={{ display: 'inline-block', padding: '20px 50px', backgroundColor: '#F97316', color: '#FFF', borderRadius: '40px', fontWeight: 700, fontSize: '1.2rem', textDecoration: 'none', boxShadow: '0 15px 30px rgba(249,115,22,0.4)' }}>
              Register Now
            </motion.a>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer style={{ backgroundColor: '#111827', color: '#9CA3AF', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', marginBottom: '30px' }}>
            <Link to="/privacy" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Terms</Link>
            <Link to="/refund-policy" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Refund Policy</Link>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Instagram</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>WhatsApp</a>
            <a href="#" style={{ color: '#9CA3AF', textDecoration: 'none' }}>Email</a>
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            © 2026 RunFest. Powered by <span style={{ color: '#FFF', fontWeight: 600 }}>CastFlow</span>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default RunFestPage;
