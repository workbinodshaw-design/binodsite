import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Billboard, Line } from '@react-three/drei';
import { Activity, Code, Database, Zap, Layout, Server, Bot } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

const FloatingPanel = ({ radius, height, startAngle, webOrigin = [0, 1.2, 0], onClick, children, className = "floating-card" }) => {
  const [hovered, setHovered] = useState(false);
  
  // Compute fixed position once
  const angle = startAngle;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const y = height;
  const cardPos = [x, y, z];
  const lineEndPos = [x, y - 1, z];

  return (
    <>
      <group position={cardPos}>
        <Billboard follow={true} lockX={false} lockY={false} lockZ={false}>
          <Html 
            transform 
            distanceFactor={6}
            zIndexRange={[100, 0]}
            style={{ 
              transition: 'all 0.2s', 
              opacity: 1, 
              cursor: hovered ? 'pointer' : 'auto',
              transform: hovered ? 'scale(1.05)' : 'scale(1)'
            }}
          >
            <div 
              className={className} 
              onClick={(e) => { e.stopPropagation(); onClick(); }}
              onPointerOver={() => setHovered(true)}
              onPointerOut={() => setHovered(false)}
            >
              {children}
            </div>
          </Html>
        </Billboard>
      </group>

      {/* Taut, straight web line for realistic silk look */}
      <Line
        points={[webOrigin, lineEndPos]}
        color="#AAAAAA"
        lineWidth={1.5}
        transparent
        opacity={0.6}
      />
    </>
  );
};

const FloatingPanels = ({ setActiveCard }) => {
  const navigate = useNavigate();

  return (
    <group>
      {/* Panel 6: Experience Automation (New Sandbox Link) */}
      <FloatingPanel 
        radius={7} height={1.5} startAngle={Math.PI / 6} webOrigin={[1, 0, 0]}
        onClick={() => navigate('/services/ai-automation')}
      >
        <div className="card-header">
          <div className="card-icon" style={{ background: '#E6E6FA' }}><Bot size={18} color="#8A2BE2" /></div>
          Live Sandbox
        </div>
        <div style={{ padding: '1rem 0', fontWeight: 800, fontSize: '1.8rem', color: '#1a1a1a', lineHeight: '1.2' }}>
          Experience Automation
        </div>
        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Zap size={16} color="#FF7F50" className="pulse" /> Click to test the AI
        </div>
      </FloatingPanel>
      {/* Panel 1: AI Automation (Front, High) - Tom's Hand (High Forward) */}
      <FloatingPanel 
        radius={7} height={3} startAngle={0} webOrigin={[0.2, 0.5, 1]}
        onClick={() => setActiveCard({
          title: "AI Automation",
          icon: <div className="card-icon lavender"><Bot size={24} color="#8A2BE2" /></div>,
          content: (
            <ul className="card-list" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <li>AI Agents Setup</li>
              <li>Workflow Automation</li>
              <li>CRM Integration</li>
              <li>Data Processing</li>
              <li>Smart Business Logic</li>
            </ul>
          )
        })}
      >
        <div className="card-header">
          <div className="card-icon lavender"><Bot size={18} color="#8A2BE2" /></div>
          AI Automation
        </div>
        <ul className="card-list">
          <li>AI Agents Setup</li>
          <li>Workflow Automation</li>
          <li>CRM Integration</li>
          <li>Data Processing</li>
          <li>Smart Business Logic</li>
        </ul>
      </FloatingPanel>

      {/* Panel 2: Web Design & Development (Right, Low) - Toby's Right Hand (Touching ground) */}
      <FloatingPanel 
        radius={8} height={-1} startAngle={Math.PI / 2.5} webOrigin={[0.5, -2.5, 1]}
        onClick={() => setActiveCard({
          title: "Web Design & Development",
          icon: <div className="card-icon coral"><Layout size={24} color="#FF4500" /></div>,
          content: (
            <ul className="card-list" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <li>Web Applications</li>
              <li>SaaS Platforms</li>
              <li>E-Commerce Stores</li>
              <li>Landing Pages</li>
            </ul>
          )
        })}
      >
        <div className="card-header">
          <div className="card-icon coral"><Layout size={18} color="#FF4500" /></div>
          Web Design & Development
        </div>
        <ul className="card-list">
          <li>Web Applications</li>
          <li>SaaS Platforms</li>
          <li>E-Commerce Stores</li>
          <li>Landing Pages</li>
        </ul>
      </FloatingPanel>

      {/* Panel 3: Live Analytics (Back, High) - Tom's Back Hand */}
      <FloatingPanel 
        radius={6} height={4} startAngle={Math.PI} webOrigin={[-0.8, 0.5, -1]}
        onClick={() => setActiveCard({
          title: "Live Analytics",
          icon: <div className="card-icon mint"><Activity size={24} color="#2E8B57" /></div>,
          content: (
            <div>
              <div style={{ fontSize: '3rem', fontWeight: 800, margin: '1rem 0', color: '#1A1A1A' }}>+127%</div>
              <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>vs last 6 months</div>
              <div className="mini-chart" style={{ height: '120px', marginTop: '2rem' }}>
                <div className="chart-bar" style={{ height: '30%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
                <div className="chart-bar" style={{ height: '50%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
                <div className="chart-bar" style={{ height: '40%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
                <div className="chart-bar" style={{ height: '80%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
                <div className="chart-bar" style={{ height: '60%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
                <div className="chart-bar" style={{ height: '100%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
              </div>
            </div>
          )
        })}
      >
        <div className="card-header">
          <div className="card-icon mint"><Activity size={18} color="#2E8B57" /></div>
          Live Analytics
        </div>
        <div style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0.5rem 0', color: '#1A1A1A' }}>+127%</div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>vs last 6 months</div>
        <div className="mini-chart">
          <div className="chart-bar" style={{ height: '30%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
          <div className="chart-bar" style={{ height: '50%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
          <div className="chart-bar" style={{ height: '40%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
          <div className="chart-bar" style={{ height: '80%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
          <div className="chart-bar" style={{ height: '60%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
          <div className="chart-bar" style={{ height: '100%', background: 'linear-gradient(to top, #98FF98, #2E8B57)' }}></div>
        </div>
      </FloatingPanel>

      {/* Panel 4: Tech Stack (Left, Mid) - Andrew's Left Hand (Reaching left) */}
      <FloatingPanel 
        radius={9} height={1} startAngle={Math.PI * 1.5} webOrigin={[-1.5, -0.2, 0]}
        onClick={() => setActiveCard({
          title: "Tech Stack",
          icon: <div className="card-icon" style={{ background: '#F7E7CE' }}><Code size={24} color="#D2B48C" /></div>,
          content: (
            <ul className="card-list" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <li>React / Next.js</li>
              <li>Node.js / Express</li>
              <li>Three.js / WebGL</li>
              <li>PostgreSQL</li>
            </ul>
          )
        })}
      >
        <div className="card-header">
          <div className="card-icon" style={{ background: '#F7E7CE' }}><Code size={18} color="#D2B48C" /></div>
          Tech Stack
        </div>
        <ul className="card-list">
          <li>React / Next.js</li>
          <li>Node.js / Express</li>
          <li>Three.js / WebGL</li>
          <li>PostgreSQL</li>
        </ul>
      </FloatingPanel>

      {/* Panel 5: Server Status (Front Right, Mid) - Toby's Left Hand (Reaching back right) */}
      <FloatingPanel 
        radius={7.5} height={0.5} startAngle={Math.PI * 1.8} webOrigin={[2.2, -0.5, -0.5]}
        onClick={() => setActiveCard({
          title: "Infrastructure",
          icon: <div className="card-icon lavender"><Server size={24} color="#8A2BE2" /></div>,
          content: (
            <ul className="card-list" style={{ fontSize: '1.2rem', lineHeight: '2' }}>
              <li><Zap size={20} color="#FF7F50" /> 99.99% Uptime</li>
              <li><Database size={20} color="#8A2BE2" /> Auto-scaling DB</li>
              <li><Activity size={20} color="#2E8B57" /> Edge caching</li>
            </ul>
          )
        })}
      >
        <div className="card-header">
          <div className="card-icon lavender"><Server size={18} color="#8A2BE2" /></div>
          Infrastructure
        </div>
        <ul className="card-list">
          <li><Zap size={14} color="#FF7F50" /> 99.99% Uptime</li>
          <li><Database size={14} color="#8A2BE2" /> Auto-scaling DB</li>
          <li><Activity size={14} color="#2E8B57" /> Edge caching</li>
        </ul>
      </FloatingPanel>
    </group>
  );
};

export default FloatingPanels;
