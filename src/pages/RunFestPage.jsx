import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { 
  ArrowRight, CheckCircle, Activity, Award, Target, Users, MapPin, 
  Calendar, Clock, ShieldCheck, Mail, AlertCircle, Plus, Minus, FileText, Truck, Lock, ChevronDown, Download, Share, Crosshair
} from 'lucide-react';
import SupportWidget from '../components/SupportWidget';

const RunFestPage = () => {
  // Mobile detection
  const [isMobile, setIsMobile] = useState(false);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [countdownState, setCountdownState] = useState('Registration Closes In');
  const [registeredCount, setRegisteredCount] = useState(1243);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Sticky CTA visibility
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  const handleRegisterClick = (e) => {
    e.preventDefault();
    const width = Math.min(800, window.innerWidth - 40);
    const height = Math.min(700, window.innerHeight - 40);
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open('https://www.townscript.com/e/runfest-102240', 'TownscriptRegistration', `width=${width},height=${height},top=${top},left=${left},scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no`);
  };


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll listener for Sticky CTA
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) setShowStickyCTA(true);
      else setShowStickyCTA(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fake live counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setRegisteredCount(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Countdown Logic
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      
      const targetRegClose = new Date('2026-11-18T23:59:59+05:30');
      const targetRunStart = new Date('2026-11-29T00:00:00+05:30');
      const targetRunEnd = new Date('2026-12-05T23:59:59+05:30');
      const targetProofEnd = new Date('2026-12-06T23:59:59+05:30');
      
      let targetDate;
      let stateText = '';

      if (now < targetRegClose) {
        targetDate = targetRegClose;
        stateText = 'Registration Closes In';
      } else if (now >= targetRegClose && now < targetRunStart) {
        targetDate = targetRunStart;
        stateText = 'Registration Closed';
      } else if (now >= targetRunStart && now <= targetRunEnd) {
        targetDate = null;
        stateText = 'RunFest is LIVE';
      } else if (now > targetRunEnd && now <= targetProofEnd) {
        targetDate = null;
        stateText = 'Proof Submission Open';
      } else if (now > targetProofEnd) {
        targetDate = null;
        stateText = 'Verification in Progress';
      }

      setCountdownState(stateText);

      if (targetDate && stateText === 'Registration Closes In') {
        const difference = targetDate - now;
        if (difference > 0) {
          setCountdown({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60)
          });
        }
      } else {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Global Scroll for parallax
  const { scrollYProgress } = useScroll();
  
  // Custom Styles
  const styles = {
    bg: { backgroundColor: '#FFFFFF', color: '#111827', overflowX: 'hidden', position: 'relative' },
    heroTitle: { fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: isMobile ? '52px' : 'clamp(90px, 10vw, 140px)', letterSpacing: '-2px', lineHeight: 0.9, textTransform: 'uppercase', margin: 0 },
    bgNumber: { position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', fontFamily: '"Clash Display", sans-serif', fontWeight: 900, fontSize: isMobile ? '180px' : 'clamp(220px, 20vw, 320px)', opacity: 0.15, zIndex: 0, pointerEvents: 'none' },
    tagline: { fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? '24px' : '30px', color: '#4B5563', margin: '20px 0' },
    subheading: { fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: isMobile ? '18px' : '22px', color: '#6B7280', margin: '0 0 10px 0' },
    sectionHeading: { fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : '72px', margin: '0 0 20px 0', letterSpacing: '-1px', lineHeight: 1.1 },
    sectionDesc: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: '18px', lineHeight: 1.8, maxWidth: '700px', color: '#4B5563' },
    btn: { fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', borderRadius: '999px', padding: '16px 32px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', textDecoration: 'none', transition: 'all 0.3s ease', width: isMobile ? '100%' : 'auto' },
    btnPrimary: { backgroundColor: '#111827', color: '#FFFFFF', border: '1px solid #111827' },
    btnSecondary: { backgroundColor: '#FFFFFF', color: '#111827', border: '1px solid #E5E7EB' },
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

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { q: "Can I run multiple times?", a: "Yes. In fact, it is highly encouraged! RUNFEST is a 7-day cumulative challenge. You can run as many times as you want during the 7 days, and every verified run will be added to your total distance." },
    { q: "How is my distance verified?", a: "You must track your runs using a GPS-enabled fitness app (like Strava, Garmin, Google Fit, Nike Run Club). You'll upload a screenshot of your activity showing the route, date, distance, and duration for verification." },
    { q: "Which apps are accepted?", a: "We accept screenshots and links from Strava, Google Fit, Garmin, Adidas Running, Nike Run Club, or any credible GPS tracking application that clearly shows your route and metrics." },
    { q: "How is the winner decided?", a: "The participant with the highest cumulative verified distance at the end of the 7-day event window will be crowned the winner and top the national leaderboard." },
    { q: "Can I participate from any city?", a: "Absolutely. RUNFEST is a 100% virtual challenge. You can participate from any city, town, or remote location in India." },
    { q: "Can beginners join?", a: "Yes! RUNFEST is designed for everyone. Whether you run 2km a day or 20km a day, the goal is personal consistency and improvement over the 7 days." },
    { q: "Can I use a treadmill?", a: "Yes. Treadmill runs are accepted as long as you provide a clear photo of the treadmill dashboard showing the total distance and time upon completion of your run." },
    { q: "What happens if verification fails?", a: "If an uploaded activity is unclear, missing GPS data, or appears falsified, it will be rejected and that distance will not be added to your cumulative total." }
  ];

  return (
    <div style={styles.bg}>
      <SEO 
        title="RUNFEST 2026 | CastFlow | Virtual Marathon Challenge" 
        description="Join RunFest by CastFlow. India's Premium Virtual Marathon Challenge. Run Anywhere. Compete Nationwide." 
        keywords="RunFest CastFlow, RunFest by CastFlow, CastFlow Marathon, Virtual Run India, Fitness Challenge"
        url="/runfest"
      />

      {/* ================= HERO (100VH) ================= */}
      <header style={{ position: 'relative', width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', paddingTop: isMobile ? '80px' : '0' }}>
        {/* Unobstructed Background */}
        <motion.div style={{ position: 'absolute', inset: 0, zIndex: -1, y: heroY }}>
          {/* OPTIMIZATION: Eager load hero image with high priority */}
          <img src="/runfest_hero.png" alt="RunFest Sunrise" loading="eager" fetchPriority="high" decoding="async" style={{ width: '100%', height: '120%', objectFit: 'cover', objectPosition: 'center' }} />
        </motion.div>

        {/* Content */}
        <motion.div style={{ zIndex: 1, textAlign: 'center', opacity: heroOpacity, padding: '0 20px', width: '100%', maxWidth: '1000px' }} initial="hidden" animate="visible" variants={stagger}>
          <div style={styles.bgNumber}>26</div>

          <motion.div variants={revealUp} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '8px 16px', borderRadius: '99px', marginBottom: '20px', border: '1px solid #E5E7EB' }}>
            <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 600, color: '#111827', textTransform: 'uppercase', letterSpacing: '1px' }}>29 Nov – 5 Dec 2026</span>
          </motion.div>

          <motion.h1 variants={revealUp} style={styles.heroTitle}>RUNFEST</motion.h1>
          <motion.div variants={revealUp} style={styles.tagline}>Run Anywhere. Compete Nationwide.</motion.div>
          
          <motion.div variants={revealUp} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '15px', justifyContent: 'center', marginTop: '30px' }}>
            <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnPrimary }}>Register Now</button>
            <Link to="/about-runfest" style={{ ...styles.btn, ...styles.btnSecondary }}>About RunFest</Link>
          </motion.div>
          
          <motion.div variants={revealUp} style={{ marginTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: isMobile ? '15px' : '30px', padding: '0 10px' }}>
             {[
               { icon: <MapPin size={16}/>, text: 'PAN India Event' },
               { icon: <Award size={16}/>, text: 'Premium Finisher Kit' },
               { icon: <FileText size={16}/>, text: 'Official Certificate' },
               { icon: <Truck size={16}/>, text: 'Free Shipping' }
             ].map((badge, i) => (
               <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '12px' : '14px', color: '#374151', fontWeight: 500, backgroundColor: 'rgba(255,255,255,0.7)', padding: '6px 12px', borderRadius: '8px' }}>
                 {badge.icon} {badge.text}
               </div>
             ))}
          </motion.div>

          <motion.p variants={revealUp} style={{ ...styles.subheading, maxWidth: '600px', margin: '60px auto 0 auto', lineHeight: 1.6 }}>
            RunFest is a 7-day virtual running challenge where every verified kilometer counts. Complete as many runs as you can, climb the leaderboard, and compete to become the top runner.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', bottom: isMobile ? '20px' : '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}
        >
          <div style={{ width: '1px', height: '40px', backgroundColor: '#111827' }}></div>
        </motion.div>
      </header>

      {/* ================= OFFICIAL MEDIA PARTNER ================= */}
      <section style={{ padding: isMobile ? '40px 20px' : '60px 20px', backgroundColor: '#FFFFFF', borderBottom: '1px solid #F3F4F6', textAlign: 'center' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
               <h3 style={{ fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 700, color: '#9CA3AF', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '30px' }}>Official Media Partner</h3>
               <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                 <img src="/news_partner.png" alt="News The Desi Andaz" style={{ width: '100%', maxWidth: '450px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.05))' }} />
               </div>
            </motion.div>
         </div>
      </section>

      {/* ================= COUNTDOWN SECTION ================= */}
      <section style={{ backgroundColor: '#111827', padding: isMobile ? '50px 20px' : '80px 20px', color: '#FFF', textAlign: 'center', borderBottom: '1px solid #1F2937' }}>
         <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
            <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: '#9CA3AF', marginBottom: '20px' }}>
              {countdownState}
            </div>
            
            {countdownState === 'Registration Closes In' ? (
              <div style={{ display: 'flex', justifyContent: 'center', gap: isMobile ? '15px' : '40px' }}>
                {[
                  { label: 'Days', value: countdown.days },
                  { label: 'Hours', value: countdown.hours },
                  { label: 'Minutes', value: countdown.minutes },
                  { label: 'Seconds', value: countdown.seconds }
                ].map((unit, i) => (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: isMobile ? '60px' : '100px' }}>
                    <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : '80px', lineHeight: 1, letterSpacing: '-1px' }}>
                      {String(unit.value).padStart(2, '0')}
                    </div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: isMobile ? '12px' : '14px', color: '#6B7280', marginTop: '10px' }}>{unit.label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : '80px', lineHeight: 1, letterSpacing: '-1px', color: '#10B981' }}>
                {countdownState}
              </div>
            )}
            
            <div style={{ marginTop: '30px', fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#9CA3AF', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981', display: 'inline-block' }}></span>
              {registeredCount.toLocaleString()} runners registered so far
            </div>
         </motion.div>
      </section>

      {/* ================= ABOUT RUNFEST ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading }}>About RunFest</motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: 0.1 }} style={{ ...styles.sectionDesc, margin: '0 auto', fontSize: isMobile ? '18px' : '22px', color: '#111827' }}>
              RunFest is designed for runners of every level who want to challenge themselves over seven days. Participants can run from any location using a GPS-enabled running app. Every verified run adds to their total distance. The runner with the greatest cumulative verified distance at the end of the event wins.
            </motion.p>
         </div>
      </section>

      {/* ================= THE STORY ================= */}
      <section style={{ paddingBottom: isMobile ? '80px' : '150px', paddingLeft: '5vw', paddingRight: '5vw', backgroundColor: '#FFFFFF' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={revealUp} style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 500, fontSize: isMobile ? '48px' : 'clamp(40px, 8vw, 100px)', lineHeight: 1, color: '#111827', margin: '0 0 30px 0', letterSpacing: '-1px' }}>
            "You against<br/>yesterday."
          </h2>
          <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#4B5563', maxWidth: '600px', lineHeight: 1.6, margin: isMobile ? '0 0 50px 0' : '0 0 100px 0' }}>
            Running isn't about defeating others. It's about becoming stronger, healthier and more consistent every single day. Every kilometer brings you closer to your personal best.
          </p>
        </motion.div>
        
        {/* Full Width Cinematic Image */}
        <motion.div initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true }} style={{ width: '100%', height: isMobile ? '50vh' : '70vh', borderRadius: '4px', overflow: 'hidden' }}>
          {/* OPTIMIZATION: High priority load */}
          <img src="/runfest_story.webp" alt="Exhausted Runner" fetchpriority="high" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </motion.div>
      </section>

      {/* ================= WHY JOIN RUNFEST (REPLACES DISTANCES) ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={styles.sectionHeading}>Why Join RunFest</motion.h2>
          
          <div style={{ marginTop: isMobile ? '40px' : '80px', display: 'flex', overflowX: 'auto', gap: isMobile ? '20px' : '40px', paddingBottom: '40px', scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch', scrollSnapType: 'x mandatory' }}>
            {[
              { emoji: '🏃', title: 'Run Anywhere', desc: 'Participate from your city, park, treadmill or favorite running route.' },
              { emoji: '🏆', title: 'Compete Nationwide', desc: 'Every verified kilometer moves you higher on the leaderboard.' },
              { emoji: '🎖', title: 'Earn Premium Rewards', desc: 'Finish the challenge and unlock exclusive rewards.' },
              { emoji: '❤️', title: 'Build Consistency', desc: 'Seven days of running designed to motivate healthier habits.' }
            ].map((item, i) => (
              <motion.div key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }}
                whileHover={!isMobile ? { scale: 1.02, x: 10 } : {}}
                style={{ 
                  flex: '0 0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                  width: isMobile ? '280px' : '350px', height: isMobile ? '180px' : '200px', borderBottom: '2px solid #E5E7EB', cursor: 'pointer', scrollSnapAlign: 'start'
                }}>
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{item.emoji}</div>
                <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: isMobile ? '32px' : '40px', letterSpacing: '-1px', color: '#111827', lineHeight: 1 }}>{item.title}</div>
                <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#6B7280', marginTop: '10px', lineHeight: 1.5 }}>{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '80px' }}>How it works.</motion.h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '40px' : '60px' }}>
            {[
              { title: 'Register', desc: 'Create your participant profile.', icon: '1' },
              { title: 'Run', desc: 'Complete one or multiple runs during the event.', icon: '2' },
              { title: 'Track', desc: 'Use a GPS-enabled fitness app to record your activity.', icon: '3' },
              { title: 'Submit', desc: 'Upload your activity for verification.', icon: '4' },
              { title: 'Leaderboard', desc: 'Verified distance is added to your cumulative score.', icon: '5' },
              { title: 'Winner', desc: 'Highest verified total distance after seven days wins.', icon: '6' }
            ].map((step, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ position: 'relative' }}>
                 <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#111827', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '20px', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                   {step.icon}
                 </div>
                 <h3 style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, fontSize: '20px', color: '#111827', marginBottom: '10px' }}>{step.title}</h3>
                 <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#6B7280', lineHeight: 1.6 }}>{step.desc}</p>
                 
                 {isMobile && i !== 5 && (
                   <div style={{ textAlign: 'center', margin: '20px 0', color: '#D1D5DB' }}>↓</div>
                 )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EVENT TIMELINE ================= */}
      <section id="timeline" style={{ padding: isMobile ? '80px 5vw' : '120px 5vw', backgroundColor: '#FAFAFA' }}>
         <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, fontSize: isMobile ? '32px' : '48px', marginBottom: '20px' }}>Event Timeline</motion.h2>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#4B5563', marginBottom: '60px', lineHeight: 1.6 }}>
               Everything happens within seven days. Stay on schedule to maximize your total distance.
            </motion.p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', position: 'relative' }}>
               <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', backgroundColor: '#E5E7EB', zIndex: 0 }}></div>
               
               {[
                 { event: 'Registration Opens', date: 'LIVE NOW' },
                 { event: 'Registration Closes', date: '18 November 2026 (11:59 PM IST)' },
                 { event: 'Run Window', date: '29 November – 5 December 2026', highlight: true },
                 { event: 'Proof Submission Deadline', date: 'Until 6 December 2026 (11:59 PM IST)' },
                 { event: 'Verification Process', date: '7–10 December 2026' },
                 { event: 'Merchandise Dispatch', date: 'Starting 10 December 2026' }
               ].map((item, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ display: 'flex', gap: '30px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.highlight ? '#F97316' : '#111827', border: '4px solid #FAFAFA', flexShrink: 0, marginTop: '2px' }}></div>
                    <div>
                       <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, fontSize: '18px', color: '#111827', marginBottom: '4px' }}>{item.event}</div>
                       <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: item.highlight ? '#F97316' : '#6B7280', fontWeight: item.highlight ? 600 : 400 }}>{item.date}</div>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= CHAMPIONSHIP AWARDS ================= */}
      <section style={{ padding: isMobile ? '40px 5vw' : '60px 5vw', backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '28px' : '36px', margin: '0 0 10px 0', letterSpacing: '-1px', color: '#111827' }}>
              🏆 Championship Awards
            </h2>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', margin: '0 auto', maxWidth: '600px', lineHeight: 1.5 }}>
              The top three participants with the highest verified cumulative distance<br/>will receive official championship awards.
            </p>
          </motion.div>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '40px' }}>
            {[
              { place: "🥇 Champion", items: ["Champion Trophy", "Physical Winner Certificate", "Hall of Champions"] },
              { place: "🥈 Runner-Up", items: ["Premium Trophy", "Physical Winner Certificate", "Hall of Champions"] },
              { place: "🥉 Third Place", items: ["Premium Trophy", "Physical Winner Certificate", "Hall of Champions"] }
            ].map((award, index) => (
              <motion.div key={index} variants={revealUp} style={{ padding: '0 10px' }}>
                <h4 style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '18px', color: '#111827', margin: '0 0 12px 0', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>{award.place}</h4>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  {award.items.map((item, i) => (
                    <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#4B5563', padding: '6px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#D1D5DB', fontSize: '12px' }}>—</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB', padding: '20px 0', display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'space-between', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: isMobile ? 'center' : 'left', flexDirection: isMobile ? 'column' : 'row' }}>
              <span style={{ fontSize: '24px' }}>🏅</span>
              <div>
                <h5 style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '14px', color: '#111827', margin: '0 0 4px 0', letterSpacing: '1px' }}>TOP 10 PARTICIPANTS</h5>
                <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#6B7280', margin: 0 }}>Permanently featured on the official RunFest Hall of Champions.</p>
              </div>
            </div>
            <Link to="#" style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: '#111827', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.opacity = 0.7} onMouseLeave={(e) => e.currentTarget.style.opacity = 1}>
              View Hall of Champions <span style={{ fontSize: '16px' }}>→</span>
            </Link>
          </motion.div>
          
        </div>
      </section>

      {/* ================= THE MEDAL (HARDWARE) ================= */}
      <section style={{ height: isMobile ? '70vh' : '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
        <motion.div initial={{ y: 100, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1.5, ease: 'easeOut' }} viewport={{ once: true }} style={{ position: 'absolute', zIndex: 1, top: isMobile ? '10%' : 'auto' }}>
          {/* OPTIMIZATION: Lazy load */}
          <motion.img 
            animate={!isMobile ? { y: [-20, 20, -20], rotateZ: [-2, 2, -2] } : { y: [-10, 10, -10] }} 
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            src="/runfest_medal.webp" alt="RunFest Medal" loading="lazy" decoding="async" style={{ width: isMobile ? '80vw' : 'clamp(300px, 40vw, 600px)', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.15))', maxWidth: '400px' }} 
          />
        </motion.div>
        
        <div style={{ position: 'absolute', bottom: isMobile ? '5%' : '10%', zIndex: 2, textAlign: 'center', width: '100%', padding: '0 20px' }}>
          <motion.h3 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: isMobile ? '18px' : '24px', letterSpacing: '2px', textTransform: 'uppercase', color: '#111827' }}>
            Premium Heavy Metal Finisher Medal
          </motion.h3>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionDesc, margin: '10px auto 0 auto' }}>
            Every finisher receives a premium medal crafted to celebrate dedication, discipline and achievement.
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
            <h2 style={styles.sectionHeading}>Premium Dry-Fit Running T-Shirt</h2>
            
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#4B5563', lineHeight: 1.6, marginBottom: '20px' }}>
               Premium dry-fit performance t-shirt designed for comfort during every run.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              {['Lightweight', 'Breathable Fabric', 'Athletic Fit', 'Moisture Wicking'].map((feature, i) => (
                 <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={16} color="#111827" /> {feature}
                 </li>
              ))}
            </ul>
            <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#6B7280', marginBottom: '20px' }}>* Free Shipping Included. Available in Standard and Premium registrations.</p>
            
            <div style={{ backgroundColor: '#FFF', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', marginTop: '30px' }}>
               <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '14px', textTransform: 'uppercase', marginBottom: '15px' }}>Size Chart (Chest in Inches)</div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', textAlign: 'center' }}>
                  {[{s: 'S', v: '36'}, {s: 'M', v: '38'}, {s: 'L', v: '40'}, {s: 'XL', v: '42'}, {s: 'XXL', v: '44'}].map((size, i) => (
                    <div key={i}>
                       <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 600, fontSize: '18px', color: '#111827' }}>{size.s}</div>
                       <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#6B7280' }}>{size.v}"</div>
                    </div>
                  ))}
               </div>
            </div>

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
                <h2 style={styles.sectionHeading}>Official Digital<br/>Finisher Certificate</h2>
                <p style={styles.sectionDesc}>Receive an official personalized digital finisher certificate after successful verification.</p>
             </motion.div>
             <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: 'center', order: isMobile ? 1 : 2 }}>
               {/* OPTIMIZATION: Lazy load */}
               <img src="/runfest_certificate.jpg" alt="Certificate" loading="lazy" decoding="async" style={{ width: isMobile ? '100%' : '80%', filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.08))', transform: 'rotate(2deg)' }} />
             </motion.div>
          </div>

          {/* Digital Badge (Phone Simulation) */}
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '40px' : '60px', alignItems: 'center' }}>
             <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} viewport={{ once: true }} style={{ width: isMobile ? '100%' : '50%', display: 'flex', justifyContent: 'center' }}>
                {/* CSS Phone Frame */}
                <div style={{ width: '320px', height: '650px', backgroundColor: '#111827', borderRadius: '50px', padding: '12px', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', transform: isMobile ? 'scale(0.8)' : 'scale(1)' }}>
                   <div style={{ width: '100%', height: '100%', backgroundColor: '#FAFAFA', borderRadius: '38px', overflowY: 'auto', scrollbarWidth: 'none', position: 'relative' }}>
                      {/* Header */}
                      <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '16px 20px', backgroundColor: 'rgba(250, 250, 250, 0.8)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '16px', color: '#111827' }}>RUNFEST 2026</div>
                        <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', color: '#10B981', fontWeight: 600 }}>Official Finisher</div>
                      </div>

                      <div style={{ padding: '20px' }}>
                        {/* Badge Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '25px', position: 'relative' }}>
                          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(14,165,233,0.3) 0%, rgba(250,250,250,0) 70%)', zIndex: 0 }}></div>
                          <img src="/runfest_badge.png" alt="3D Badge" loading="lazy" decoding="async" style={{ width: '140px', zIndex: 1, filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.1))' }} />
                          <div style={{ marginTop: '15px', padding: '4px 12px', backgroundColor: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '99px', fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 700, color: '#D97706', letterSpacing: '1px', zIndex: 1 }}>VERIFIED FINISHER</div>
                        </div>

                        {/* Participant Info Card */}
                        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '20px', padding: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)', marginBottom: '20px' }}>
                           <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 600, fontSize: '18px', color: '#111827', marginBottom: '15px' }}>Participant Name</div>
                           
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                              {[
                                { l: 'Total Distance', v: '145 km' },
                                { l: 'Completed', v: '05 Dec 2026' },
                                { l: 'Status', v: 'Verified', color: '#10B981' },
                                { l: 'Finisher ID', v: 'RF-2026-8942' }
                              ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i !== 3 ? '1px solid #F3F4F6' : 'none', paddingBottom: i !== 3 ? '12px' : '0' }}>
                                   <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', color: '#6B7280' }}>{item.l}</div>
                                   <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, color: item.color || '#111827' }}>{item.v}</div>
                                </div>
                              ))}
                           </div>
                        </div>

                        {/* Achievement Progress */}
                        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                          <div style={{ color: '#F59E0B', fontSize: '18px', letterSpacing: '2px', marginBottom: '4px' }}>★★★★★</div>
                          <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '11px', fontWeight: 600, color: '#4B5563' }}>Completed Successfully</div>
                        </div>

                        {/* Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px' }}>
                          <button style={{ backgroundColor: '#111827', color: '#FFF', border: 'none', borderRadius: '12px', padding: '12px', fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}>
                            <Download size={14} /> Download Badge
                          </button>
                          <button style={{ backgroundColor: '#F3F4F6', color: '#111827', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px', fontFamily: '"Inter", sans-serif', fontSize: '13px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', width: '100%' }}>
                            <Share size={14} /> Share Achievement
                          </button>
                        </div>

                        {/* Share Options */}
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '30px' }}>
                           {['Instagram', 'WhatsApp', 'Facebook', 'LinkedIn', 'X'].map((social, i) => (
                             <div key={i} title={social} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', cursor: 'pointer' }}>
                                <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 700, color: '#4B5563' }}>{social.charAt(0)}</span>
                             </div>
                           ))}
                        </div>

                        {/* Bottom Card */}
                        <div style={{ backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '12px', textAlign: 'center' }}>
                           <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '10px', fontWeight: 600, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>Powered by CastFlow</div>
                           <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '10px', color: '#6B7280' }}>Official Digital Achievement</div>
                        </div>
                        
                        <div style={{ height: '20px' }}></div>
                      </div>
                   </div>
                </div>
             </motion.div>
             <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ width: isMobile ? '100%' : '50%' }}>
                <h2 style={styles.sectionHeading}>Digital<br/>Finisher Badge</h2>
                <p style={styles.sectionDesc}>Download your digital finisher badge and proudly share your achievement.</p>
             </motion.div>
          </div>

        </div>
      </section>

      {/* ================= TRUST & PRICING ================= */}
      <section id="register" style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ textAlign: 'center', marginBottom: '60px' }}>
             <h2 style={styles.sectionHeading}>Choose your tier.</h2>
             <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#4B5563', lineHeight: 1.6, maxWidth: '600px', margin: '0 auto' }}>
               Choose the package that fits your journey. Whether you're participating for the challenge or collecting every reward, there's an option for everyone.
             </p>
             <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                {[
                  { icon: <Lock size={16}/>, text: 'Secure Payments' },
                  { icon: <MapPin size={16}/>, text: 'PAN India Participation' },
                  { icon: <Award size={16}/>, text: 'Official Event' },
                  { icon: <CheckCircle size={16}/>, text: 'Verified Finishers' },
                  { icon: <FileText size={16}/>, text: 'Premium Merchandise' },
                  { icon: <Truck size={16}/>, text: 'Free Shipping' }
                ].map((trust, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#4B5563', backgroundColor: '#FFF', padding: '8px 16px', borderRadius: '99px', border: '1px solid #E5E7EB' }}>
                    {trust.icon} {trust.text}
                  </div>
                ))}
             </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '30px' }}>
            
            {/* Basic Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: isMobile ? '30px 20px' : '50px 40px', display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB' }}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>BASIC</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', margin: '20px 0 40px 0' }}>₹299</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                {[
                  { t: 'Official E-Certificate', inc: true },
                  { t: 'Digital Finisher Badge', inc: true },
                  { t: 'Finisher Listing', inc: true },
                  { t: 'T-Shirt', inc: false },
                  { t: 'Medal', inc: false }
                ].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: f.inc ? '#111827' : '#9CA3AF', padding: '12px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {f.inc ? <CheckCircle size={18} color="#10B981"/> : <Minus size={18} color="#D1D5DB"/>} {f.t}
                  </li>
                ))}
              </ul>
              <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnSecondary, width: '100%' }}>Register Now</button>
            </motion.div>

            {/* Standard Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: isMobile ? 0 : 0.1 }} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: isMobile ? '40px 20px' : '50px 40px', display: 'flex', flexDirection: 'column', position: 'relative', border: '2px solid #111827', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
              <div style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#F97316', color: '#FFF', padding: '6px 16px', borderRadius: '12px', fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap' }}>MOST POPULAR</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>STANDARD</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', margin: '20px 0 40px 0' }}>₹820</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                <li style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#111827', padding: '12px 0', borderBottom: '1px solid #F3F4F6', fontWeight: 600 }}>Everything in Basic +</li>
                {[
                  { t: 'Premium Dry-Fit T-Shirt', inc: true },
                  { t: 'Free Shipping', inc: true },
                  { t: 'Medal', inc: false }
                ].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: f.inc ? '#111827' : '#9CA3AF', padding: '12px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {f.inc ? <CheckCircle size={18} color="#10B981"/> : <Minus size={18} color="#D1D5DB"/>} {f.t}
                  </li>
                ))}
              </ul>
              <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnPrimary, width: '100%' }}>Register Now</button>
            </motion.div>

            {/* Premium Pass */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: isMobile ? 0 : 0.2 }} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: isMobile ? '30px 20px' : '50px 40px', display: 'flex', flexDirection: 'column', border: '1px solid #E5E7EB' }}>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827' }}>PREMIUM</div>
              <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '60px', color: '#111827', margin: '20px 0 40px 0' }}>₹999</div>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 50px 0', flex: 1 }}>
                <li style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#111827', padding: '12px 0', borderBottom: '1px solid #F3F4F6', fontWeight: 600 }}>Everything in Standard +</li>
                {[
                  { t: 'Premium Heavy Metal Medal', inc: true },
                  { t: 'Priority Dispatch', inc: true }
                ].map((f, i) => (
                  <li key={i} style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#111827', padding: '12px 0', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <CheckCircle size={18} color="#10B981"/> {f.t}
                  </li>
                ))}
              </ul>
              <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnSecondary, width: '100%' }}>Register Now</button>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================= CHALLENGE RULES ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '60px' }}>Challenge Rules</motion.h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
               {[
                 { icon: <Activity size={24} color="#10B981"/>, title: 'GPS tracking required' },
                 { icon: <Plus size={24} color="#10B981"/>, title: 'Multiple runs allowed' },
                 { icon: <CheckCircle size={24} color="#10B981"/>, title: 'Only verified activities accepted' },
                 { icon: <AlertCircle size={24} color="#EF4444"/>, title: 'No fake GPS' },
                 { icon: <AlertCircle size={24} color="#EF4444"/>, title: 'No cycling or driving' },
                 { icon: <Crosshair size={24} color="#F59E0B"/>, title: 'Highest cumulative verified distance wins' }
               ].map((rule, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ display: 'flex', alignItems: 'center', gap: '15px', backgroundColor: '#FAFAFA', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: '#FFFFFF', border: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                      {rule.icon}
                    </div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#111827' }}>{rule.title}</div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
           <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '60px' }}>Frequently Asked Questions</motion.h2>
           
           <div style={{ borderTop: '1px solid #E5E7EB' }}>
             {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                   <button 
                     onClick={() => toggleFaq(i)}
                     style={{ width: '100%', padding: '24px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                   >
                     <span style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 600, fontSize: isMobile ? '20px' : '24px', color: '#111827' }}>{faq.q}</span>
                     <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }}>
                        <ChevronDown size={24} color="#6B7280" />
                     </motion.div>
                   </button>
                   <AnimatePresence>
                     {openFaq === i && (
                       <motion.div 
                         initial={{ height: 0, opacity: 0 }} 
                         animate={{ height: 'auto', opacity: 1 }} 
                         exit={{ height: 0, opacity: 0 }}
                         style={{ overflow: 'hidden' }}
                       >
                         <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563', lineHeight: 1.6, paddingBottom: '24px', margin: 0 }}>
                           {faq.a}
                         </p>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={{ padding: isMobile ? '100px 5vw' : '200px 5vw', backgroundColor: '#111827', textAlign: 'center' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp}>
           <h2 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '40px' : 'clamp(40px, 8vw, 80px)', color: '#FFFFFF', margin: '0 0 20px 0', letterSpacing: '-1px' }}>
             Ready to Take the Challenge?
           </h2>
           <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '18px', color: '#9CA3AF', maxWidth: '600px', margin: '0 auto 40px auto', lineHeight: 1.6 }}>
             Join runners from across India, push your limits for seven days, and compete for the top spot on the leaderboard.
           </p>
           <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnGlowing, padding: '20px 50px', fontSize: '18px' }}>
             Register Now
           </button>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer style={{ padding: '60px 5vw 40px', backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
         <div style={{ display: 'flex', gap: isMobile ? '15px' : '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {['About RunFest', 'Privacy Policy', 'Refund Policy', 'Shipping Policy', 'Terms & Conditions', 'Contact', 'Instagram'].map((link) => (
              <Link key={link} to={link === 'About RunFest' ? '/about-runfest' : '#'} style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#6B7280', textDecoration: 'none' }}>{link}</Link>
            ))}
         </div>
         <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#9CA3AF' }}>
            © 2026 RunFest. Handcrafted by CastFlow.
         </div>
      </footer>

      {/* ================= STICKY MOBILE CTA ================= */}
      <AnimatePresence>
        {isMobile && showStickyCTA && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '15px 20px', backgroundColor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #E5E7EB', zIndex: 100 }}
          >
             <button onClick={handleRegisterClick} style={{ ...styles.btn, ...styles.btnPrimary, width: '100%', padding: '14px' }}>Register Now</button>
          </motion.div>
        )}
      </AnimatePresence>
      <SupportWidget />
    </div>
  );
};

export default RunFestPage;
