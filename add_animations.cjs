const fs = require('fs');

function addRevealClass(filePath, regexStr, replacement, flags = 'g') {
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(new RegExp(regexStr, flags), replacement);
  fs.writeFileSync(filePath, content);
}

// 1. HomePage.jsx
addRevealClass('src/pages/HomePage.jsx', 'className="funnel-tile"', 'className="funnel-tile reveal-up"');
addRevealClass('src/pages/HomePage.jsx', 'className="process-step"', 'className="process-step reveal-up"');
addRevealClass('src/pages/HomePage.jsx', 'className="glass"', 'className="glass reveal-up"');
addRevealClass('src/pages/HomePage.jsx', 'className="headline"', 'className="headline reveal-fade"');

// 2. ServicesPage.jsx
addRevealClass('src/pages/ServicesPage.jsx', 'className="glass"', 'className="glass reveal-up"');
addRevealClass('src/pages/ServicesPage.jsx', 'className="headline"', 'className="headline reveal-fade"');

// 3. PricingPage.jsx
addRevealClass('src/pages/PricingPage.jsx', 'className="pricing-card"', 'className="pricing-card reveal-up"');
addRevealClass('src/pages/PricingPage.jsx', 'className="glass"', 'className="glass reveal-up"');
addRevealClass('src/pages/PricingPage.jsx', 'className="headline"', 'className="headline reveal-fade"');

// 4. PortfolioPage.jsx
addRevealClass('src/pages/PortfolioPage.jsx', 'className="glass-container"', 'className="glass-container reveal-up"');
addRevealClass('src/pages/PortfolioPage.jsx', 'className="headline"', 'className="headline reveal-fade"');

// 5. ContactPage.jsx
addRevealClass('src/pages/ContactPage.jsx', 'className="contact-info"', 'className="contact-info reveal-up"');
addRevealClass('src/pages/ContactPage.jsx', 'className="contact-form-container glass"', 'className="contact-form-container glass reveal-up"');
addRevealClass('src/pages/ContactPage.jsx', 'className="headline"', 'className="headline reveal-fade"');

// 6. AiAutomationService.jsx & WebDevService.jsx
addRevealClass('src/pages/AiAutomationService.jsx', 'className="glass"', 'className="glass reveal-up"');
addRevealClass('src/pages/WebDevService.jsx', 'className="glass"', 'className="glass reveal-up"');

console.log("Animation classes injected!");
