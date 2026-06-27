import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WebDevService from './pages/WebDevService';
import AiAutomationService from './pages/AiAutomationService';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AiAgentWidget from './components/AiAgentWidget';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/web-development" element={<WebDevService />} />
        <Route path="/services/ai-automation" element={<AiAutomationService />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {/* Global AI Agent Widget */}
      <AiAgentWidget />
    </Router>
  );
}

export default App;
