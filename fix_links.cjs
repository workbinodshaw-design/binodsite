const fs = require('fs');

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Insert the helper logic at the top of the component
  const helperLogic = `
  const currentHost = window.location.hostname;
  const isSubdomain = currentHost.split('.').length > 2 && !currentHost.includes('localhost') && currentHost !== 'www.castflow.in';
  
  const CustomLink = ({ to, children, ...props }) => {
    if (isSubdomain && to.startsWith('/')) {
      return <a href={\`https://castflow.in\${to}\`} {...props}>{children}</a>;
    }
    return <Link to={to} {...props}>{children}</Link>;
  };
  `;

  // For Navbar.jsx
  if (filePath.includes('Navbar')) {
    content = content.replace(
      "const Navbar = () => {",
      "const Navbar = () => {\n" + helperLogic
    );
    // Replace <Link> with <CustomLink> but exclude imports
    content = content.replace(/<Link /g, "<CustomLink ");
    content = content.replace(/<\/Link>/g, "</CustomLink>");
  }

  // For Footer.jsx
  if (filePath.includes('Footer')) {
    content = content.replace(
      "const Footer = () => {",
      "const Footer = () => {\n" + helperLogic
    );
    content = content.replace(/<Link /g, "<CustomLink ");
    content = content.replace(/<\/Link>/g, "</CustomLink>");
  }

  fs.writeFileSync(filePath, content);
}

updateFile('src/components/Navbar.jsx');
updateFile('src/components/Footer.jsx');
