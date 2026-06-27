import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      {/* Navbar sits outside Routes so it is persistent across all pages */}
      <Navbar />
      
      {/* Routes define which page component renders based on the URL */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        {/* We can add /portfolio and /contact here later */}
      </Routes>
    </Router>
  );
}

export default App;
