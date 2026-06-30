const fs = require('fs');
let code = fs.readFileSync('src/pages/ContactPage.jsx', 'utf8');

// 1. Fix the flex wrap so form is on top on mobile
code = code.replace(
  /flexWrap:\s*'wrap'/,
  "flexWrap: 'wrap-reverse'"
);

// 2. Fix the WhatsApp/Email text colors (remove forced #fff)
code = code.replace(
  /ProtectedWhatsAppLink([^>]+)color:\s*'#fff'/g,
  "ProtectedWhatsAppLink$1color: 'var(--text-primary)'"
);
code = code.replace(
  /<a href="mailto:work\.binodshaw@gmail\.com"([^>]+)color:\s*'#fff'/g,
  "<a href=\"mailto:work.binodshaw@gmail.com\"$1color: 'var(--text-primary)'"
);

// 3. Fix the main form color
code = code.replace(
  /<form onSubmit=\{handleSubmit\} className="lead-form" style=\{\{ color:\s*'#fff'\s*\}\}>/,
  "<form onSubmit={handleSubmit} className=\"lead-form\" style={{ color: 'var(--text-primary)' }}>"
);

// 4. Fix all inputs/select/textarea styling
code = code.replace(
  /style=\{\{\s*background:\s*'rgba\(0,0,0,0\.5\)',\s*border:\s*'1px solid rgba\(255,255,255,0\.1\)',\s*color:\s*'#fff'\s*\}\}/g,
  "style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-primary)' }}"
);

fs.writeFileSync('src/pages/ContactPage.jsx', code);
console.log('Fixed ContactPage.jsx!');
