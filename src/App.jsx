import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const WebDevService = React.lazy(() => import('./pages/WebDevService'));
const AiAutomationService = React.lazy(() => import('./pages/AiAutomationService'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const JoinTeamPage = React.lazy(() => import('./pages/JoinTeamPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy'));

const AdminLogin = React.lazy(() => import('./pages/AdminLogin'));
const TeamLogin = React.lazy(() => import('./pages/TeamLogin'));
const EmployeeDashboard = React.lazy(() => import('./pages/EmployeeDashboard'));
const ClientDashboard = React.lazy(() => import('./pages/ClientDashboard'));
const ClientLogin = React.lazy(() => import('./pages/ClientLogin'));
import AiAgentWidget from './components/AiAgentWidget';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollReveal from './components/ScrollReveal';
import AnalyticsTracker from './components/AnalyticsTracker';

function App() {
  const hostname = window.location.hostname;

  // Subdomain: privacypolicy.castflow.in
  if (hostname.startsWith('privacypolicy.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <AnalyticsTracker />
        <Navbar />
        <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="*" element={<PrivacyPolicy />} />
          </Routes>
        </React.Suspense>
        <Footer />
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: portfolio.castflow.in
  if (hostname.startsWith('portfolio.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <AnalyticsTracker />
        <Navbar />
        <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
          <Routes>
            <Route path="*" element={<PortfolioPage />} />
          </Routes>
        </React.Suspense>
        <Footer />
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: admin.castflow.in
  if (hostname.startsWith('admin.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <AnalyticsTracker />
        <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
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
        </React.Suspense>
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: team.castflow.in
  if (hostname.startsWith('team.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <AnalyticsTracker />
        <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
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
        </React.Suspense>
        <AiAgentWidget />
      </Router>
    );
  }

  // Default Main Domain (castflow.in, www.castflow.in, localhost)
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <AnalyticsTracker />
      <ScrollReveal />
      <Navbar />
      
      <React.Suspense fallback={<div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)' }}></div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/web-development" element={<WebDevService />} />
          <Route path="/services/ai-automation" element={<AiAutomationService />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/join-team" element={<JoinTeamPage />} />
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
      </React.Suspense>

      <Footer />
      {/* Global AI Agent Widget */}
      <AiAgentWidget />
    </Router>
  );
}

export default App;
