const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

// We will use regex to remove these blocks:
// .portfolio-page section > div[style*="display: flex"] { flex-direction: column !important; }
// .portfolio-page div[style*="transform: translateZ"] { ... }
// .portfolio-page .glass { ... }

css = css.replace(/\.portfolio-page section > div\[style\*="display: flex"\]\s*\{\s*flex-direction: column !important;\s*\}/g, '');

css = css.replace(/\.portfolio-page div\[style\*="transform: translateZ"\]\s*\{[\s\S]*?\}/g, '');

css = css.replace(/\.portfolio-page \.glass\s*\{[\s\S]*?\}/g, '');

fs.writeFileSync('src/index.css', css);
console.log("Removed broken mobile CSS overrides!");
