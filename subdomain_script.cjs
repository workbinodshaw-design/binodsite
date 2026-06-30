const fs = require('fs');
let appJsx = fs.readFileSync('src/App.jsx', 'utf8');

const newAppJsx = `import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WebDevService from './pages/WebDevService';
import AiAutomationService from './pages/AiAutomationService';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import PricingPage from './pages/PricingPage';
import AdminDashboard from './pages/AdminDashboard';
import AiAgentWidget from './components/AiAgentWidget';
import Footer from './components/Footer';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import RefundPolicy from './pages/RefundPolicy';

import ProtectedRoute from './components/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';
import TeamLogin from './pages/TeamLogin';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ClientLogin from './pages/ClientLogin';

function App() {
  const hostname = window.location.hostname;

  // Subdomain: privacypolicy.castflow.in
  if (hostname.startsWith('privacypolicy.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <Navbar />
        <Routes>
          <Route path="*" element={<PrivacyPolicy />} />
        </Routes>
        <Footer />
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: admin.castflow.in
  if (hostname.startsWith('admin.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/admin-login" element={<Navigate to="/" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: team.castflow.in
  if (hostname.startsWith('team.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<TeamLogin />} />
          <Route path="/team-login" element={<Navigate to="/" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <AiAgentWidget />
      </Router>
    );
  }

  // Default Main Domain (castflow.in, www.castflow.in, localhost)
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/web-development" element={<WebDevService />} />
        <Route path="/services/ai-automation" element={<AiAutomationService />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        
        {/* Authentication & Role-Based Portals */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/team-login" element={<TeamLogin />} />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute requiredRole="employee">
              <EmployeeDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client" 
          element={
            <ProtectedRoute requiredRole="client">
              <ClientDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>

      <Footer />
      {/* Global AI Agent Widget */}
      <AiAgentWidget />
    </Router>
  );
}

export default App;
\`;

fs.writeFileSync('src/App.jsx', newAppJsx);
