const fs = require('fs');
const path = require('path');

const pageFile = 'app/page.tsx';
const inviteFile = 'app/invite/page.tsx';
const rsvpFile = 'app/invite/rsvp/page.tsx';
const layoutFile = 'app/layout.tsx';

let pageContent = fs.readFileSync(pageFile, 'utf8');
const particleMatch = pageContent.match(/<div className="particle-layer">[\s\S]*?<\/div>/);

if (!particleMatch) {
  console.error("Could not find particle layer in page.tsx");
  process.exit(1);
}

const particleLayerHtml = particleMatch[0];

// Create ParticleLayer.tsx
const componentCode = `export default function ParticleLayer() {
  return (
${particleLayerHtml.split('\\n').map(line => '    ' + line).join('\\n')}
  );
}
`;

const componentsDir = 'app/components';
if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir);
}
fs.writeFileSync(path.join(componentsDir, 'ParticleLayer.tsx'), componentCode);

// Remove particle layer from all 3 files
const files = [pageFile, inviteFile, rsvpFile];
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/<div className="particle-layer">[\s\S]*?<\/div>\s*/g, '');
  fs.writeFileSync(f, content);
});

// Add ParticleLayer to layout.tsx
let layoutContent = fs.readFileSync(layoutFile, 'utf8');
if (!layoutContent.includes('ParticleLayer')) {
  // Add import
  layoutContent = layoutContent.replace(
    'import "./globals.css";',
    'import "./globals.css";\nimport ParticleLayer from "./components/ParticleLayer";'
  );
  // Add component inside body
  layoutContent = layoutContent.replace(
    '<body className="min-h-full flex flex-col">{children}</body>',
    '<body className="min-h-full flex flex-col">\n        <ParticleLayer />\n        {children}\n      </body>'
  );
  fs.writeFileSync(layoutFile, layoutContent);
}

console.log('Particle layer successfully extracted to layout!');
