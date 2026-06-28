import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

import ProtectedRoute from './components/ProtectedRoute';
import LoginPortal from './pages/LoginPortal';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ClientDashboard from './pages/ClientDashboard';
import ClientLogin from './pages/ClientLogin';

function App() {
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
        
        {/* Authentication & Role-Based Portals */}
        <Route path="/login" element={<LoginPortal />} />
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

      {/* Global AI Agent Widget */}
      <AiAgentWidget />
    </Router>
  );
}

export default App;
