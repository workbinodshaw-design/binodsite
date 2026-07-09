import React from 'react';
import { ArrowRight, Box, BarChart2, Shield, Settings, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HolographicAsset from '../components/HolographicAsset';
import SEO from '../components/SEO';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      background: '#FAFAFA',
      backgroundImage: 'radial-gradient(#E8E8E8 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      minHeight: '100vh',
      color: '#1A1A1A',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      <SEO 
        title="Web Development & AI Automation Agency India"
        description="CastFlow is India's premier agency for custom Web Development, MVP Development, and AI Automation using n8n and AI Agents. Scale your business globally."
        keywords="Web Developer India, AI Automation India, MVP Development, React Developer, Custom CRM, Full Stack Web Development, Business Automation"
        url="/"
      />

      {/* HERO SECTION */}
      <section style={{ padding: '6rem 1.5rem 4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          <div style={{ zIndex: 2 }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              letterSpacing: '-1px',
              marginBottom: '1.5rem'
            }}>
              It's The <span style={{ color: '#FF7F50' }}>Bright</span><br/>
              One, It's The<br/>
              Right One.
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '400px' }}>
              Functional and practical. Start tracking your progress in the most efficient way possible with premium AI and Web solutions.
            </p>
            <button 
              onClick={() => navigate('/portfolio')}
              style={{
                background: '#FAFAFA',
                border: '1px solid #E0E0E0',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#1A1A1A'
              }}>
              Get Started <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ position: 'relative', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <HolographicAsset variant={1} width="300px" height="300px" />
          </div>
          
        </div>
      </section>

      {/* CLIENT LOGOS MARQUEE */}
      <section style={{ padding: '2rem 1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', overflow: 'hidden' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', margin: '0 auto', maxWidth: '1200px', width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', opacity: 0.5 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1A1A1A', flexShrink: 0 }}>We Help many<br/>Companies</div>
          {['Airbnb', 'Fivetran', 'Pendo', 'Airtable', 'Framer', 'Pipedrive'].map(company => (
            <div key={company} style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1A1A1A', letterSpacing: '-0.5px' }}>
              {company}
            </div>
          ))}
        </div>
      </section>

      {/* TABS SECTION */}
      <section style={{ padding: '4rem 1.5rem', maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', background: '#F0F0F0', padding: '0.3rem', borderRadius: '4px', gap: '0.5rem', marginBottom: '4rem' }}>
          <button style={{ padding: '0.6rem 2rem', border: 'none', background: 'transparent', color: '#666', fontWeight: 500, borderRadius: '4px', cursor: 'pointer' }}>Meeting</button>
          <button style={{ padding: '0.6rem 2rem', border: 'none', background: '#FFF', color: '#1A1A1A', fontWeight: 600, borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', cursor: 'pointer' }}>Management</button>
          <button style={{ padding: '0.6rem 2rem', border: 'none', background: 'transparent', color: '#666', fontWeight: 500, borderRadius: '4px', cursor: 'pointer' }}>Results</button>
        </div>

        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1rem' }}>
          Let Your Saas Do The Walking.
        </h2>
        <p style={{ color: '#666', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
          Manage your time on your tasks and increase your efficiency, create as many projects as you want.
        </p>

        {/* SERVICES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          
          {/* Service 1 */}
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', textAlign: 'left', border: '1px solid rgba(0,0,0,0.02)' }}>
            <div style={{ height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <HolographicAsset variant={2} width="120px" height="120px" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Track time</h3>
              <ArrowRight size={20} color="#1A1A1A" />
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Create your projects and start tracking time immediately.
            </p>
          </div>

          {/* Service 2 */}
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', textAlign: 'left', border: '1px solid rgba(0,0,0,0.02)' }}>
            <div style={{ height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <HolographicAsset variant={3} width="120px" height="120px" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Performance</h3>
              <ArrowRight size={20} color="#1A1A1A" />
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Manage your time on your tasks and increase your efficiency.
            </p>
          </div>

          {/* Service 3 */}
          <div style={{ background: '#FFF', padding: '2rem', borderRadius: '4px', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', textAlign: 'left', border: '1px solid rgba(0,0,0,0.02)' }}>
            <div style={{ height: '160px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '1.5rem' }}>
              <HolographicAsset variant={4} width="120px" height="120px" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.5px' }}>Reports</h3>
              <ArrowRight size={20} color="#1A1A1A" />
            </div>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Generate and export reports of your separate projects.
            </p>
          </div>

        </div>
      </section>

      {/* BOTTOM SECTION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                Tastes Great, Less Cloud. <ArrowRight size={18} />
              </h4>
              <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>Create your personalized worksheets to prioritize and work on what is important to you as you wish.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                Software Wins Again. <ArrowRight size={18} />
              </h4>
              <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>Manage your tasks and enjoy the fun ride of project management, simple and smooth.</p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2rem' }}>
              <HolographicAsset variant={5} width="200px" height="200px" />
            </div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, letterSpacing: '-1px', marginBottom: '1rem' }}>I Feel Like Saas Tonight.</h2>
            <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>Manage your tasks and enjoy the fun ride of project management, simple.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', textAlign: 'right' }}>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                Softwares With Idea <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
              </h4>
              <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>Generate invoices and send them over, deal with your clients fast and increase your productivity.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse' }}>
                Because Saas Can't Drive. <ArrowRight size={18} style={{ transform: 'rotate(180deg)' }} />
              </h4>
              <p style={{ color: '#888', fontSize: '0.95rem', lineHeight: 1.6 }}>Keep what's important to you with you at all times. Plan ahead and get a head start.</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
