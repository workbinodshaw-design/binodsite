const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// The mobile section starts around line 2465
const startComment = '  /* 6. Navigation & Safe Area */';
const endComment = '  /* Portfolio Image overlapping fix */';

const startIndex = css.indexOf(startComment);
const endIndex = css.indexOf(endComment);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `  /* 6. Navigation & Safe Area */
  .navbar {
    padding: 1rem 1.5rem !important;
    background: rgba(250, 250, 250, 0.95) !important;
    backdrop-filter: blur(12px) !important;
    flex-wrap: nowrap !important;
    justify-content: space-between !important;
    flex-direction: row !important;
  }
  
  .logo-text {
    font-size: 1.2rem !important;
  }
  
  .logo-img {
    width: 32px !important;
    height: 32px !important;
  }
  
  .mobile-menu-btn {
    display: flex !important;
    align-items: center;
    justify-content: center;
    z-index: 1001;
  }
  
  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(250, 250, 250, 0.98);
    backdrop-filter: blur(15px);
    flex-direction: column !important;
    align-items: center;
    padding: 2rem 1rem;
    gap: 1.5rem !important;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
    overflow-x: hidden !important;
  }
  
  .nav-links.open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
  
  .nav-link {
    font-size: 1.1rem !important;
    white-space: nowrap;
  }
  
  .nav-links .btn {
    padding: 0.8rem 2rem !important;
    width: 100% !important;
    justify-content: center !important;
    margin-top: 1rem !important;
    margin-left: 0 !important;
  }

`;
  css = css.slice(0, startIndex) + newSection + css.slice(endIndex);
  fs.writeFileSync('src/index.css', css);
  console.log("Replaced successfully!");
} else {
  console.log("Could not find start/end comments!");
}
