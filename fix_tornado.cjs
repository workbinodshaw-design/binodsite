const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.jsx', 'utf8');

// Fix Tornado size
code = code.replace(
    /width: '1200px', height: '1200px',/g,
    `width: isMobile ? '500px' : '1200px', height: isMobile ? '500px' : '1200px',`
);

// Fix 3D card radius so they don't hit the edges
code = code.replace(
    /const radius = isMobile \? 300 : 600;/g,
    `const radius = isMobile ? 180 : 600;`
);

fs.writeFileSync('src/pages/PortfolioPage.jsx', code);
console.log("Fixed tornado and radius!");
