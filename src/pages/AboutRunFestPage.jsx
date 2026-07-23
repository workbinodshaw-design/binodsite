import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { Mail, Instagram, Clock, ShieldCheck, Activity, Lock, Award, Headphones, Briefcase, Eye, Zap, Users, Globe, Target } from 'lucide-react';

const AboutRunFestPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const styles = {
    bg: { backgroundColor: '#FFFFFF', color: '#111827', overflowX: 'hidden', position: 'relative', minHeight: '100vh' },
    heroTitle: { fontFamily: '"Clash Display", sans-serif', fontWeight: 800, fontSize: isMobile ? '48px' : 'clamp(60px, 8vw, 100px)', letterSpacing: '-2px', lineHeight: 1, margin: 0 },
    tagline: { fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, fontSize: isMobile ? '24px' : '32px', color: '#4B5563', margin: '20px 0', lineHeight: 1.2 },
    subheading: { fontFamily: '"Inter", sans-serif', fontWeight: 500, fontSize: isMobile ? '16px' : '18px', color: '#6B7280', margin: '0 0 10px 0', lineHeight: 1.6 },
    sectionHeading: { fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: isMobile ? '32px' : '48px', margin: '0 0 20px 0', letterSpacing: '-1px', lineHeight: 1.1 },
    sectionDesc: { fontFamily: '"Inter", sans-serif', fontWeight: 400, fontSize: isMobile ? '16px' : '18px', lineHeight: 1.8, maxWidth: '700px', color: '#4B5563' },
    sectionPadding: { padding: isMobile ? '80px 5vw' : '120px 5vw' }
  };

  const revealUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div style={styles.bg}>
      <SEO title="About RunFest | Trust & Transparency" description="Discover who is behind RunFest. Building a trusted virtual running experience through technology, transparency and community." />

      {/* ================= HERO ================= */}
      <section style={{ ...styles.sectionPadding, paddingTop: isMobile ? '140px' : '200px', backgroundColor: '#FAFAFA', borderBottom: '1px solid #F3F4F6', textAlign: 'center' }}>
        <motion.div initial="hidden" animate="visible" variants={stagger} style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div variants={revealUp} style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#FFFFFF', padding: '6px 16px', borderRadius: '99px', marginBottom: '20px', border: '1px solid #E5E7EB' }}>
            <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '12px', fontWeight: 600, color: '#111827', textTransform: 'uppercase', letterSpacing: '1px' }}>Trust & Transparency</span>
          </motion.div>
          
          <motion.h1 variants={revealUp} style={styles.heroTitle}>About RunFest</motion.h1>
          <motion.div variants={revealUp} style={styles.tagline}>
            Building a trusted virtual running experience through technology, transparency and community.
          </motion.div>
          
          <motion.p variants={revealUp} style={{ ...styles.subheading, maxWidth: '600px', margin: '30px auto 0 auto' }}>
            RunFest is a modern virtual running challenge created for runners who believe every kilometer counts. Designed with fairness, transparency and accessibility in mind, our goal is to deliver an experience that every participant can trust.
          </motion.p>
        </motion.div>
      </section>

      {/* ================= OUR STORY ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={styles.sectionHeading}>Why We Created RunFest</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.p variants={revealUp} style={styles.sectionDesc}>RunFest was created with a simple vision.</motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>To make competitive running accessible to everyone, regardless of where they live.</motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>Instead of limiting participation to one city or one race day, RunFest allows runners to compete from anywhere while maintaining a transparent and fair competition through verified activity tracking.</motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>We believe every participant deserves an experience that is professional, motivating and enjoyable.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= WHO ORGANIZES ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={styles.sectionHeading}>Organized by CastFlow</motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <motion.p variants={revealUp} style={styles.sectionDesc}>RunFest is proudly organized by CastFlow.</motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>CastFlow is responsible for planning, participant management, digital infrastructure, verification systems and the overall event experience.</motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>Our focus is to ensure every participant enjoys a smooth, transparent and professionally managed event from registration to final results.</motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= LEADERSHIP ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '60px' }}>RunFest Leadership</motion.h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '40px' }}>
             {[
               { name: 'Binod Shaw', role: 'Founder & Event Director', desc: 'Leads the vision, planning, technology and execution of RunFest while ensuring a seamless participant experience from start to finish.' },
               { name: 'Mithinga Boro', role: 'Head of Business Development', desc: 'Leads partnerships, business development and strategic collaborations to help expand RunFest and build long-term relationships with communities and organizations.' }
             ].map((leader, i) => (
               <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '40px', border: '1px solid #E5E7EB', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#111827', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '24px' }}>
                    {leader.name.charAt(0)}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 700, fontSize: '24px', color: '#111827', margin: '0 0 5px 0' }}>{leader.name}</h3>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', fontWeight: 600, color: '#10B981', textTransform: 'uppercase', letterSpacing: '1px' }}>{leader.role}</div>
                  </div>
                  <p style={{ fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                    {leader.desc}
                  </p>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* ================= OUR VALUES ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#111827', color: '#FFF' }}>
         <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '60px' }}>Our Values</motion.h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: '20px' }}>
               {[
                 { icon: <Eye size={24} color="#10B981"/>, title: 'Transparency', desc: 'Every participant competes under the same rules.' },
                 { icon: <Target size={24} color="#10B981"/>, title: 'Fair Competition', desc: 'Every verified kilometer matters.' },
                 { icon: <Zap size={24} color="#10B981"/>, title: 'Innovation', desc: 'Technology is used to improve participant experience.' },
                 { icon: <Users size={24} color="#10B981"/>, title: 'Community', desc: 'Encouraging healthier lifestyles through running.' }
               ].map((val, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ backgroundColor: '#1F2937', borderRadius: '20px', padding: '30px', border: '1px solid #374151' }}>
                    <div style={{ marginBottom: '20px' }}>{val.icon}</div>
                    <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 600, fontSize: '20px', color: '#FFF', marginBottom: '10px' }}>{val.title}</div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '15px', color: '#9CA3AF', lineHeight: 1.6 }}>{val.desc}</div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= OUR COMMITMENT ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={styles.sectionHeading}>Committed to Every Participant</motion.h2>
          
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
            {['Every registration.', 'Every submitted activity.', 'Every verified kilometer.', 'Every leaderboard update.', 'Every reward.'].map((line, i) => (
              <motion.div key={i} variants={revealUp} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                 <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                 <span style={{ fontFamily: '"Inter", sans-serif', fontSize: '20px', fontWeight: 500, color: '#111827' }}>{line}</span>
              </motion.div>
            ))}
            
            <motion.p variants={revealUp} style={{ ...styles.sectionDesc, marginTop: '30px' }}>
              Everything is managed with professionalism, fairness and transparency.
            </motion.p>
            <motion.p variants={revealUp} style={styles.sectionDesc}>
              Our commitment is to create an event that participants are proud to be part of and excited to return to every year.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ================= TRUST ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FAFAFA' }}>
         <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, textAlign: 'center', marginBottom: '60px' }}>Why Participants Trust RunFest</motion.h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '20px' }}>
               {[
                 { title: 'Transparent Rules', icon: <Eye size={20} color="#4B5563" /> },
                 { title: 'Verified Activity Tracking', icon: <Activity size={20} color="#4B5563" /> },
                 { title: 'Secure Registration', icon: <Lock size={20} color="#4B5563" /> },
                 { title: 'Fair Winner Selection', icon: <Award size={20} color="#4B5563" /> },
                 { title: 'Dedicated Support', icon: <Headphones size={20} color="#4B5563" /> },
                 { title: 'Professional Event Management', icon: <Briefcase size={20} color="#4B5563" /> }
               ].map((trust, i) => (
                 <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} transition={{ delay: i * 0.1 }} style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '16px', padding: '24px', display: 'flex', alignItems: 'center', gap: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                    <div style={{ backgroundColor: '#F3F4F6', padding: '10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {trust.icon}
                    </div>
                    <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '15px', color: '#111827' }}>{trust.title}</div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section style={{ ...styles.sectionPadding, backgroundColor: '#FFFFFF', borderTop: '1px solid #E5E7EB' }}>
         <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealUp} style={{ ...styles.sectionHeading, fontSize: isMobile ? '28px' : '40px', marginBottom: '40px' }}>Get in Touch</motion.h2>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
               <motion.div variants={revealUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563' }}>
                 <Mail size={20} color="#111827" /> <span style={{ fontWeight: 600, color: '#111827' }}>Official Email:</span> support@castflow.in
               </motion.div>
               <motion.div variants={revealUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563' }}>
                 <Instagram size={20} color="#111827" /> <span style={{ fontWeight: 600, color: '#111827' }}>Official Instagram:</span> @runfest.in
               </motion.div>
               <motion.div variants={revealUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563' }}>
                 <Clock size={20} color="#111827" /> <span style={{ fontWeight: 600, color: '#111827' }}>Support Hours:</span> 10:00 AM – 6:00 PM (Mon - Sat)
               </motion.div>
               <motion.div variants={revealUp} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', fontFamily: '"Inter", sans-serif', fontSize: '16px', color: '#4B5563' }}>
                 <ShieldCheck size={20} color="#10B981" /> <span style={{ fontWeight: 600, color: '#111827' }}>Expected Response Time:</span> 24–48 Hours
               </motion.div>
            </motion.div>
         </div>
      </section>

      {/* ================= BOTTOM SECTION ================= */}
      <footer style={{ padding: '80px 20px', backgroundColor: '#FAFAFA', borderTop: '1px solid #E5E7EB', textAlign: 'center' }}>
         <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, marginBottom: '20px' }}>
           Organized by CastFlow
         </div>
         
         <div style={{ fontFamily: '"Clash Display", sans-serif', fontWeight: 600, fontSize: '20px', color: '#111827', marginBottom: '30px' }}>
           RunFest Leadership
         </div>

         <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'center', gap: isMobile ? '20px' : '60px' }}>
            <div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#111827' }}>Binod Shaw</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#6B7280' }}>Founder & Event Director</div>
            </div>
            <div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, fontSize: '16px', color: '#111827' }}>Mithinga Boro</div>
              <div style={{ fontFamily: '"Inter", sans-serif', fontSize: '14px', color: '#6B7280' }}>Head of Business Development</div>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default AboutRunFestPage;
