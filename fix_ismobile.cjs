const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.jsx', 'utf8');

code = code.replace(
    'const containerRef = useRef(null);',
    'const containerRef = useRef(null);\n  const isMobile = windowWidth < 768;'
);

fs.writeFileSync('src/pages/PortfolioPage.jsx', code);
console.log("Fixed isMobile");
