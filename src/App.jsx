import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Navbar from './components/Navbar';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const WebDevService = React.lazy(() => import('./pages/WebDevService'));
const AiAutomationService = React.lazy(() => import('./pages/AiAutomationService'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const PortfolioPage = React.lazy(() => import('./pages/PortfolioPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage'));
const JoinTeamPage = React.lazy(() => import('./pages/JoinTeamPage'));
const TeamPage = React.lazy(() => import('./pages/TeamPage'));
const EmployeeProfile = React.lazy(() => import('./pages/EmployeeProfile'));
const PricingPage = React.lazy(() => import('./pages/PricingPage'));
const AdminDashboard = React.lazy(() => import('./pages/AdminDashboard'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./pages/TermsOfService'));
const RefundPolicy = React.lazy(() => import('./pages/RefundPolicy'));
const RunFestPage = React.lazy(() => import('./pages/RunFestPage'));
const AboutRunFestPage = React.lazy(() => import('./pages/AboutRunFestPage'));

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
import ScrollToTop from './components/ScrollToTop';

import { useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';

const LoadingFallback = () => (
  <div className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'var(--bg-color)' }}>
    <Loader2 className="spin" size={48} color="#a388ff" />
  </div>
);

function AnimatedMainRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/services" element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/services/web-development" element={<PageTransition><WebDevService /></PageTransition>} />
        <Route path="/services/ai-automation" element={<PageTransition><AiAutomationService /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><ProjectsPage /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/team" element={<PageTransition><TeamPage /></PageTransition>} />
        <Route path="/team/:id" element={<PageTransition><EmployeeProfile /></PageTransition>} />
        <Route path="/join-team" element={<PageTransition><JoinTeamPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/refund-policy" element={<PageTransition><RefundPolicy /></PageTransition>} />
        <Route path="/runfest" element={<PageTransition><RunFestPage /></PageTransition>} />
        <Route path="/about-runfest" element={<PageTransition><AboutRunFestPage /></PageTransition>} />
        
        {/* Authentication & Role-Based Portals */}
        <Route path="/admin-login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/team-login" element={<PageTransition><TeamLogin /></PageTransition>} />
        <Route path="/client-login" element={<PageTransition><ClientLogin /></PageTransition>} />
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <PageTransition><AdminDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/employee" 
          element={
            <ProtectedRoute requiredRole="employee">
              <PageTransition><EmployeeDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/client" 
          element={
            <ProtectedRoute requiredRole="client">
              <PageTransition><ClientDashboard /></PageTransition>
            </ProtectedRoute>
          } 
        />
        {/* Catch-all route for any 404/unknown links from Google Search */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const hostname = window.location.hostname;

  // Subdomain: privacypolicy.castflow.in
  if (hostname.startsWith('privacypolicy.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AnalyticsTracker />
        <Navbar />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="*" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
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
        <ScrollToTop />
        <AnalyticsTracker />
        <Navbar />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="*" element={<PageTransition><PortfolioPage /></PageTransition>} />
          </Routes>
        </React.Suspense>
        <Footer />
        <AiAgentWidget />
      </Router>
    );
  }

  // Subdomain: runfest.castflow.in
  if (hostname.startsWith('runfest.')) {
    return (
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <AnalyticsTracker />
        <Navbar />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<PageTransition><RunFestPage /></PageTransition>} />
            <Route path="/about-runfest" element={<PageTransition><AboutRunFestPage /></PageTransition>} />
            <Route path="*" element={<Navigate to="/" replace />} />
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
        <ScrollToTop />
        <AnalyticsTracker />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<PageTransition><AdminLogin /></PageTransition>} />
            <Route path="/admin-login" element={<Navigate to="/" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <PageTransition><AdminDashboard /></PageTransition>
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
        <ScrollToTop />
        <AnalyticsTracker />
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<PageTransition><TeamLogin /></PageTransition>} />
            <Route path="/team-login" element={<Navigate to="/" replace />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute requiredRole="employee">
                  <PageTransition><EmployeeDashboard /></PageTransition>
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
      <ScrollToTop />
      <AnalyticsTracker />
      <ScrollReveal />
      <Navbar />
      
      <React.Suspense fallback={<LoadingFallback />}>
        <AnimatedMainRoutes />
      </React.Suspense>

      <Footer />
      {/* Global AI Agent Widget */}
      <AiAgentWidget />
    </Router>
  );
}

export default App;
