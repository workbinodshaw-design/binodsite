const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.jsx', 'utf8');

// Replace all hardcoded font sizes with clamp
content = content.replace(/fontSize:\s*'3\.5rem'/g, "fontSize: 'clamp(2rem, 8vw, 3.5rem)'");
content = content.replace(/fontSize:\s*'2\.5rem'/g, "fontSize: 'clamp(1.8rem, 6vw, 2.5rem)'");
content = content.replace(/fontSize:\s*'1\.8rem'/g, "fontSize: 'clamp(1.4rem, 5vw, 1.8rem)'");
content = content.replace(/fontSize:\s*'1\.2rem'/g, "fontSize: 'clamp(1rem, 3vw, 1.2rem)'");
content = content.replace(/fontSize:\s*'1\.1rem'/g, "fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)'");

// For cards, let's make sure they are smaller on mobile
// In AI Automation Section visual side:
content = content.replace(
  /className="comparison-card manual"/g, 
  'className="comparison-card manual mobile-small-card"'
);
content = content.replace(
  /className="comparison-card ai"/g, 
  'className="comparison-card ai mobile-small-card"'
);

// Make sure the main header text aligns properly
content = content.replace(
  /className="page-header text-center"/g,
  'className="page-header responsive-text-center"'
);
content = content.replace(
  /className="description" style={{ margin: '0 auto'/g,
  'className="description responsive-text-center" style={{ margin: \'0 auto\''
);

fs.writeFileSync('src/pages/ServicesPage.jsx', content);

// Now update CSS to support these new responsive classes
let css = fs.readFileSync('src/index.css', 'utf8');
if (!css.includes('.responsive-text-center')) {
  css += `
/* Services Responsive Fixes */
@media (max-width: 768px) {
  .responsive-text-center {
    text-align: center !important;
  }
  .responsive-text-center h1, .responsive-text-center p {
    text-align: center !important;
  }
  .mobile-small-card {
    padding: 1rem !important;
    font-size: 0.9rem !important;
  }
  .mobile-small-card .comp-header {
    font-size: 1rem !important;
  }
  .service-detail-section {
    margin-bottom: 4rem !important;
  }
  .service-grid-2-col {
    gap: 2rem !important;
  }
  .premium-animated-visual {
    transform: scale(0.85);
    margin: -1rem 0;
  }
}
`;
  fs.writeFileSync('src/index.css', css);
}
