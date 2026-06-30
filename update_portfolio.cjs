const fs = require('fs');
let code = fs.readFileSync('src/pages/PortfolioPage.jsx', 'utf8');

// We need to add state for window width
if (!code.includes('const [windowWidth, setWindowWidth]')) {
    code = code.replace(
        'const [progress, setProgress] = useState(0);',
        `const [progress, setProgress] = useState(0);\n  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);\n\n  useEffect(() => {\n    const handleResize = () => setWindowWidth(window.innerWidth);\n    window.addEventListener('resize', handleResize);\n    return () => window.removeEventListener('resize', handleResize);\n  }, []);`
    );
}

// Now replace the 3D radius and padding
code = code.replace(
    /const radius = 600;/g,
    `const isMobile = windowWidth < 768;
              const radius = isMobile ? 300 : 600;`
);

code = code.replace(
    /padding: '3rem',/g,
    `padding: isMobile ? '1.5rem' : '3rem',`
);

code = code.replace(
    /fontSize: '2\.5rem'/g,
    `fontSize: isMobile ? '1.5rem' : '2.5rem'`
);

code = code.replace(
    /fontSize: '1\.2rem', flexGrow: 1, marginBottom: '2\.5rem'/g,
    `fontSize: isMobile ? '0.9rem' : '1.2rem', flexGrow: 1, marginBottom: isMobile ? '1.5rem' : '2.5rem'`
);

code = code.replace(
    /width: '80px', height: '80px', borderRadius: '20px',/g,
    `width: isMobile ? '50px' : '80px', height: isMobile ? '50px' : '80px', borderRadius: isMobile ? '12px' : '20px',`
);

// Scale down the card width on mobile
code = code.replace(
    /transform: \`translateY\(\$\{translateY\}vh\) rotateY\(\$\{angle\}deg\) translateZ\(\$\{radius\}px\)\`,/g,
    `transform: \`translateY(\${translateY}vh) rotateY(\${angle}deg) translateZ(\${radius}px) \${isMobile ? 'scale(0.8)' : 'scale(1)'}\`,`
);

fs.writeFileSync('src/pages/PortfolioPage.jsx', code);
console.log("PortfolioPage updated!");
