const fs = require('fs');
let content = fs.readFileSync('src/pages/ServicesPage.jsx', 'utf8');

// Reduce clamp sizes
content = content.replace(/clamp\(2rem, 8vw, 3\.5rem\)/g, "clamp(1.8rem, 6vw, 3rem)");
content = content.replace(/clamp\(1\.8rem, 6vw, 2\.5rem\)/g, "clamp(1.5rem, 5vw, 2.2rem)");
content = content.replace(/clamp\(1\.4rem, 5vw, 1\.8rem\)/g, "clamp(1.2rem, 4vw, 1.6rem)");
content = content.replace(/clamp\(1rem, 3vw, 1\.2rem\)/g, "clamp(0.95rem, 3vw, 1.1rem)");
content = content.replace(/clamp\(0\.95rem, 2\.5vw, 1\.1rem\)/g, "clamp(0.9rem, 2.5vw, 1rem)");

// Ensure buttons look okay
content = content.replace(/padding: '1\.2rem 2\.5rem'/g, "padding: '1rem 2rem'");
content = content.replace(/padding: '1rem 2rem', fontSize: '1\.1rem'/g, "padding: '1rem 2rem', fontSize: '1rem'");

fs.writeFileSync('src/pages/ServicesPage.jsx', content);

let css = fs.readFileSync('src/index.css', 'utf8');
css += `
/* More Services Mobile Fixes */
@media (max-width: 768px) {
  /* Center the section title */
  .service-detail-content h3 {
    text-align: center !important;
    margin-bottom: 1rem !important;
  }
  
  /* Left align the paragraphs for readability, but center them as a block */
  .service-detail-content p.text-secondary {
    text-align: left !important;
    font-size: 0.95rem !important;
    line-height: 1.6 !important;
  }
  
  /* Center the features list container but left-align text inside it */
  .service-features-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    margin-top: 1rem !important;
  }
  
  /* Make the features items smaller */
  .service-features-list strong {
    font-size: 1rem !important;
  }
  
  .service-features-list p {
    font-size: 0.9rem !important;
  }
  
  /* Center the button */
  .service-detail-content .btn-primary {
    align-self: center;
    margin: 2rem auto 0 !important;
    display: flex !important;
  }

  /* Make the AI / Manual cards even more compact */
  .comparison-card {
    padding: 0.8rem !important;
  }
  .comparison-card .comp-header {
    font-size: 0.9rem !important;
    margin-bottom: 0.5rem !important;
  }
  .comparison-card .comp-body {
    font-size: 0.8rem !important;
  }
}
`;
fs.writeFileSync('src/index.css', css);
