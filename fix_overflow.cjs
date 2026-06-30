const fs = require('fs');
let css = fs.readFileSync('src/index.css', 'utf8');

css = css.replace(
    /\.services-container, \.process-container, \.contact-container, \.portfolio-page \{/g,
    '.services-container, .process-container, .contact-container {'
);

fs.writeFileSync('src/index.css', css);
console.log("Fixed overflow-x breaking sticky!");
