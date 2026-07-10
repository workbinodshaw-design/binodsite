import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Code, Bot, CheckCircle, ArrowRight, Zap, Clock, TrendingUp, Users, Globe, Mail, Database, Server, Workflow, Target, Megaphone, Smartphone } from 'lucide-react';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';

const ServicesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEO 
        title="Our Services | Custom Web Development & AI Automation"
        description="CastFlow provides custom Full Stack Web Development, MVP Development, CRM Solutions, and AI Automation Services to help you scale fast."
        keywords="Web Development Services, MVP Builders, Software Agency India, AI Workflow Automation, React JS Developers, Node JS Backend"
        url="/services"
      />
      <div style={{ padding: '6rem 1.5rem', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', background: '#fff' }}>
        
        {/* Page Header */}
        <div className="" style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px', marginBottom: '2rem', color: '#1A1A1A' }}>• OUR EXPERTISE</div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-1.5px', maxWidth: '800px', margin: '0 auto 1.5rem auto', color: '#1A1A1A' }}>
            Scale with <span style={{ color: '#1A73E8' }}>certainty.</span>
          </h1>
          <p style={{ margin: '0 auto', maxWidth: '750px', fontSize: 'clamp(1rem, 3vw, 1.2rem)', lineHeight: '1.6', color: '#666' }}>
            We provide end-to-end digital solutions combining powerful AI automation pipelines with state-of-the-art web architectures. We don't just build software; we build robust business systems designed to save you time and exponentially increase your revenue.
          </p>
        </div>

        {/* AI Automation Section (Expanded) */}
        <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#e6f0fd', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bot size={32} color="#1A73E8" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#1A1A1A', fontWeight: 600 }}>AI & Automation</h2>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: '#666' }}>Fire your manual tasks. Hire code.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            
            {/* Content Side */}
            <div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', marginBottom: '1.5rem', color: '#1A1A1A', fontWeight: 600 }}>Stop wasting time on tasks a robot can do.</h3>
              
              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
                Imagine having an employee who works 24/7, never sleeps, never takes a vacation, and absolutely never makes a mistake. That is what custom AI automation brings to your business. Most companies leak thousands of dollars every month by paying humans to do repetitive, manual data entry.
              </p>

              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '2.5rem', color: '#666' }}>
                We build intelligent pipelines that connect your entire business. When an email comes in, our AI reads the intent, extracts the important information, updates your CRM (like HubSpot or Salesforce), drafts a highly personalized reply, and notifies your team in Slack—all in exactly 2 seconds.
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                  <CheckCircle size={24} color="#1A73E8" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>Customer Support AI Agents</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>We train AI models directly on your company's knowledge base. When customers ask complex questions at 3 AM, our agents resolve them instantly, completely eliminating support tickets.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Workflow size={24} color="#1A73E8" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>Complete Workflow Automation</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>We seamlessly bridge the gap between tools like Gmail, Stripe, Slack, and your CRM. Invoicing, onboarding, and data syncing happen entirely in the background.</p>
                  </div>
                </div>
              </div>

              <Link to="/services/ai-automation" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#1A1A1A', color: '#fff', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 600 }}>
                Explore AI Automation Options <ArrowRight size={20} />
              </Link>
            </div>
            
            {/* Visual Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: '3rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    
                    <div style={{ background: '#fff', padding: '1rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '300px', border: '1px solid rgba(0,0,0,0.05)' }}>
                       <div style={{ background: '#e6f0fd', padding: '0.5rem', borderRadius: '12px' }}><Mail size={24} color="#1A73E8" /></div>
                       <span style={{ fontWeight: 600, color: '#1A1A1A' }}>Email Received</span>
                    </div>
                    
                    <div style={{ background: '#1A73E8', padding: '1.5rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 15px 40px rgba(26,115,232,0.2)', width: '100%', maxWidth: '320px', color: '#fff', transform: 'scale(1.05)' }}>
                       <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '12px' }}><Bot size={32} color="#fff" /></div>
                       <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>AI Agent Processing</span>
                    </div>
                    
                    <div style={{ background: '#fff', padding: '1rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '300px', border: '1px solid rgba(0,0,0,0.05)' }}>
                       <div style={{ background: '#e0fae5', padding: '0.5rem', borderRadius: '12px' }}><Database size={24} color="#27c93f" /></div>
                       <span style={{ fontWeight: 600, color: '#1A1A1A' }}>CRM Updated</span>
                    </div>
                 </div>
                 
                 <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', background: 'rgba(0,0,0,0.1)', zIndex: 1 }}></div>
              </div>

              {/* Custom Visual: Manual vs AI */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                 <h4 style={{ margin: '0 0 1.5rem 0', color: '#1A1A1A', fontWeight: 600, fontSize: '1.1rem' }}>The Speed Difference</h4>
                 
                 <div style={{ background: '#fafafa', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', border: '1px solid rgba(0,0,0,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#666', fontWeight: 600, fontSize: '0.9rem' }}>
                       <Clock size={18} /> <span>Manual Human Process</span>
                    </div>
                    <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.5 }}>
                       Read Email ➔ Copy to CRM ➔ Draft Reply <br/>
                       <strong style={{ color: '#e63946', display: 'block', marginTop: '0.5rem' }}>Takes 15+ mins</strong>
                    </div>
                 </div>
                 
                 <div style={{ background: '#e6f0fd', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(26,115,232,0.1)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', color: '#1A73E8', fontWeight: 600, fontSize: '0.9rem' }}>
                       <Zap size={18} /> <span>Custom AI Automation</span>
                    </div>
                    <div style={{ color: '#1A1A1A', fontSize: '0.95rem', lineHeight: 1.5 }}>
                       AI Extracts Data ➔ CRM Auto-Updates ➔ Reply Sent <br/>
                       <strong style={{ color: '#27c93f', display: 'block', marginTop: '0.5rem' }}>Takes 2 Seconds</strong>
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.05)', marginBottom: '8rem' }}></div>

        {/* Web Design & Development Section (Expanded) */}
        <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Code size={32} color="#1A1A1A" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#1A1A1A', fontWeight: 600 }}>High-End Web Design & Development</h2>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: '#666' }}>We don't build brochures. We build digital salespeople.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            
            {/* Visual Side (Left for Web Dev to alternate layout) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ position: 'relative', height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)' }}>
                 <div style={{ width: '80%', height: '80%', background: '#fff', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', position: 'relative' }}>
                   {/* Browser Header */}
                   <div style={{ height: '32px', background: '#f5f5f5', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', padding: '0 12px', gap: '6px' }}>
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }}></div>
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }}></div>
                     <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }}></div>
                   </div>
                   {/* Browser Body - Animated elements */}
                   <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
                      <div style={{ height: '20px', width: '40%', background: '#eee', borderRadius: '4px' }}></div>
                      <div style={{ height: '10px', width: '100%', background: '#f5f5f5', borderRadius: '4px' }}></div>
                      <div style={{ height: '10px', width: '80%', background: '#f5f5f5', borderRadius: '4px' }}></div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ height: '80px', background: '#fafafa', border: '1px solid #eee', borderRadius: '8px' }}></div>
                        <div style={{ height: '80px', background: '#fafafa', border: '1px solid #eee', borderRadius: '8px' }}></div>
                      </div>
                   </div>
                 </div>
                 
                 {/* Floating elements popping out of browser */}
                 <div style={{ position: 'absolute', right: '0%', top: '15%', background: '#1A73E8', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '30px', boxShadow: '0 10px 20px rgba(26,115,232,0.2)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                    <TrendingUp size={16} /> +320% Conversion
                 </div>
                 <div style={{ position: 'absolute', left: '0%', bottom: '20%', background: '#1A1A1A', color: '#fff', padding: '0.8rem 1.2rem', borderRadius: '30px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', zIndex: 2 }}>
                    <Clock size={16} color="#C4F042" /> 0.8s Load Time
                 </div>
              </div>

              {/* Custom Visual: Visitors to Revenue */}
              <div style={{ background: '#fff', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                 <h4 style={{ margin: '0 0 0.5rem 0', color: '#1A1A1A', fontWeight: 600, fontSize: '1.1rem' }}>The Conversion Funnel</h4>
                 <div style={{ padding: '1rem', background: '#fafafa', borderRadius: '12px', border: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem', color: '#666', fontWeight: 500 }}>
                    <Users size={20} color="#666" />
                    <span>Traffic & Visitors Arrive</span>
                 </div>
                 <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.2rem' }}>↓</div>
                 <div style={{ padding: '1rem', background: '#f9f9f9', borderRadius: '12px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '1rem', color: '#1A1A1A', fontWeight: 600 }}>
                    <Globe size={20} color="#1A73E8" />
                    <span>Sub-Second Load Times & Premium UI</span>
                 </div>
                 <div style={{ textAlign: 'center', color: '#ccc', fontSize: '1.2rem' }}>↓</div>
                 <div style={{ padding: '1rem', background: '#e0fae5', borderRadius: '12px', border: '1px solid rgba(39,201,63,0.2)', display: 'flex', alignItems: 'center', gap: '1rem', color: '#1A1A1A', fontWeight: 600 }}>
                    <TrendingUp size={20} color="#27c93f" />
                    <span>Massive Increase in Leads & Revenue</span>
                 </div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', marginBottom: '1.5rem', color: '#1A1A1A', fontWeight: 600 }}>Your website is your ultimate first impression.</h3>
              
              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
                In today's digital landscape, attention spans are practically zero. If your website takes more than 3 seconds to load, or if it looks like a cheap template, your potential clients will instantly bounce to a competitor. A bad website doesn't just cost you the design fee; it costs you millions in lost revenue.
              </p>

              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '2.5rem', color: '#666' }}>
                We specialize in custom-coded, ultra-premium web architectures built on Next.js and React. These aren't WordPress templates. These are high-performance software applications designed with psychological precision to guide visitors directly into your sales funnel. 
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                  <CheckCircle size={24} color="#1A1A1A" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>Conversion-Optimized Landing Pages</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>We map out the perfect user journey, utilizing elite copywriting and jaw-dropping design to ensure maximum conversion rates.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Server size={24} color="#1A1A1A" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>SaaS & Complex Architectures</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>Need a complete custom web app? We build secure, scalable backend systems and gorgeous frontend dashboards for complex software products.</p>
                  </div>
                </div>
              </div>

              <Link to="/services/web-development" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#1A1A1A', color: '#fff', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 600 }}>
                Explore Web Development Options <ArrowRight size={20} />
              </Link>
            </div>

          </div>
        </div>

        <div style={{ width: '100%', height: '1px', background: 'rgba(0,0,0,0.05)', marginBottom: '8rem' }}></div>

        {/* Marketing & Advertising Section */}
        <div className="" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', marginBottom: '8rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: '2rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#fff9e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Megaphone size={32} color="#f59e0b" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', color: '#1A1A1A', fontWeight: 600 }}>Performance Marketing & Ads</h2>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: 'clamp(0.9rem, 2.5vw, 1rem)', color: '#666' }}>We don't just generate clicks. We generate revenue.</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            
            {/* Content Side */}
            <div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.6rem)', marginBottom: '1.5rem', color: '#1A1A1A', fontWeight: 600 }}>Stop burning money on bad ads.</h3>
              
              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '1.5rem', color: '#666' }}>
                Most agencies focus on vanity metrics like "impressions" and "clicks." We focus purely on ROI. We build aggressive, highly-targeted ad campaigns on Google, Facebook, Instagram, and WhatsApp that put your business directly in front of buyers who are ready to purchase.
              </p>

              <p style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.05rem)', lineHeight: '1.8', marginBottom: '2.5rem', color: '#666' }}>
                Combining our elite web development with our ad strategies means we control the entire funnel. We run the traffic, we build the landing page that converts that traffic, and we deploy the AI that follows up with the leads. It is a completely closed loop of profitability.
              </p>
              
              <div style={{ marginTop: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
                  <Target size={24} color="#f59e0b" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>Google & Meta Ads</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>Search intent campaigns on Google and highly visual, disruptive creative on Facebook and Instagram to dominate your market.</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <Smartphone size={24} color="#27c93f" style={{ marginTop: '4px', flexShrink: 0 }} />
                  <div>
                    <strong style={{ fontSize: '1.1rem', marginBottom: '0.5rem', display: 'block', color: '#1A1A1A' }}>WhatsApp & Direct Lead Gen</strong>
                    <p style={{ lineHeight: '1.6', color: '#666', margin: 0 }}>We utilize WhatsApp Business API to run direct-message ads, immediately starting a conversation between your brand and the prospect.</p>
                  </div>
                </div>
              </div>

              <Link to="/contact" style={{ marginTop: '2.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', background: '#1A1A1A', color: '#fff', padding: '1rem 2rem', borderRadius: '30px', fontSize: '1rem', fontWeight: 600 }}>
                Start Scaling Your Leads <ArrowRight size={20} />
              </Link>
            </div>
            
            {/* Visual Side */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ background: '#f5f5f5', borderRadius: '24px', padding: '3rem', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                    
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '300px', border: '1px solid rgba(0,0,0,0.05)' }}>
                       <div style={{ background: '#ffebee', padding: '0.5rem', borderRadius: '12px' }}><Megaphone size={24} color="#f43f5e" /></div>
                       <div>
                         <span style={{ fontWeight: 600, color: '#1A1A1A', display: 'block' }}>Meta Ad Campaign</span>
                         <span style={{ fontSize: '0.8rem', color: '#666' }}>Targeted audience</span>
                       </div>
                    </div>
                    
                    <div style={{ background: '#f59e0b', padding: '1.5rem 2rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 15px 40px rgba(245,158,11,0.2)', width: '100%', maxWidth: '320px', color: '#fff', transform: 'scale(1.05)' }}>
                       <div style={{ background: 'rgba(255,255,255,0.2)', padding: '0.5rem', borderRadius: '12px' }}><Target size={32} color="#fff" /></div>
                       <div>
                         <span style={{ fontWeight: 600, fontSize: '1.1rem', display: 'block' }}>High-Intent Lead</span>
                         <span style={{ fontSize: '0.9rem', opacity: 0.9 }}>Captured via landing page</span>
                       </div>
                    </div>
                    
                    <div style={{ background: '#fff', padding: '1.5rem', borderRadius: '16px', display: 'flex', alignItems: 'center', gap: '1rem', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', width: '100%', maxWidth: '300px', border: '1px solid rgba(0,0,0,0.05)' }}>
                       <div style={{ background: '#e0fae5', padding: '0.5rem', borderRadius: '12px' }}><TrendingUp size={24} color="#27c93f" /></div>
                       <div>
                         <span style={{ fontWeight: 600, color: '#1A1A1A', display: 'block' }}>Sale Closed</span>
                         <span style={{ fontSize: '0.8rem', color: '#666' }}>Revenue generated</span>
                       </div>
                    </div>
                 </div>
                 
                 <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '2px', height: '100%', background: 'rgba(0,0,0,0.1)', zIndex: 1 }}></div>
              </div>
            </div>

          </div>
        </div>

        {/* Call to Action */}
        <div className="" style={{ paddingBottom: '4rem' }}>
          <ContactSection />
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
