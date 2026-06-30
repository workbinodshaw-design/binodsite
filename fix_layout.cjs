const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.jsx', 'utf8');

code = code.replace(
    /display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center'/g,
    `display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '2rem' : '4rem', alignItems: 'center'`
);

code = code.replace(
    /flex: '1 1 400px'/g,
    `flex: '1 1 auto', width: '100%', maxWidth: '400px'`
);

code = code.replace(
    /flex: '1 1 500px'/g,
    `flex: '1 1 auto', width: '100%'`
);

fs.writeFileSync('src/pages/PortfolioPage.jsx', code);
console.log("Updated PortfolioPage layout for mobile!");
