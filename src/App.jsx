import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WebDevService from './pages/WebDevService';
import AiAutomationService from './pages/AiAutomationService';
import ContactWidget from './components/ContactWidget';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/web-development" element={<WebDevService />} />
        <Route path="/services/ai-automation" element={<AiAutomationService />} />
      </Routes>

      {/* Global Floating Contact Widget */}
      <ContactWidget />
    </Router>
  );
}

export default App;
