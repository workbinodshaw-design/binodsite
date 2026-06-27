import React from 'react';
import { Search, PenTool, Rocket } from 'lucide-react';

const ProcessSection = () => {
  return (
    <div className="process-container">
      <div className="section-header text-center">
        <div className="badge">
          <div className="badge-dot"></div>
          HOW IT WORKS
        </div>
        <h2 className="section-title">Our Process</h2>
      </div>

      <div className="process-steps">
        <div className="step-card glass">
          <div className="step-number">01</div>
          <div className="step-icon">
            <Search size={24} />
          </div>
          <h3>Discovery & Strategy</h3>
          <p>We analyze your business operations to identify bottlenecks and opportunities for automation or digital growth.</p>
        </div>

        <div className="step-connector"></div>

        <div className="step-card glass">
          <div className="step-number">02</div>
          <div className="step-icon">
            <PenTool size={24} />
          </div>
          <h3>Build & Automate</h3>
          <p>Our experts design and develop custom solutions, integrating cutting-edge AI and seamless web architectures.</p>
        </div>

        <div className="step-connector"></div>

        <div className="step-card glass">
          <div className="step-number">03</div>
          <div className="step-icon">
            <Rocket size={24} />
          </div>
          <h3>Deploy & Scale</h3>
          <p>We launch your solution and provide ongoing support to ensure maximum ROI as your business scales.</p>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;
