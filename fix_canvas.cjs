const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');
css = css.replace(
  /\/\* Canvas Container absolutely positioned at the bottom \*\/[\s\S]*?\.canvas-container\s*\{[\s\S]*?\}/,
  `/* Canvas Container fills sticky section on mobile */
  .canvas-container {
    width: 100% !important;
    height: 100vh !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    z-index: 1 !important;
  }`
);
fs.writeFileSync('src/index.css', css);
console.log('Fixed index.css');
