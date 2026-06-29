const fs = require('fs');
const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Sol taraf icin --spread-left
  content = content.replace(/left:"calc\(50% - \(([\d]+px) \* var\(--spread\)\)\)"/g, 'left:"calc(50% - ($1 * var(--spread-left)))"');
  // Sag taraf icin --spread-right
  content = content.replace(/left:"calc\(50% \+ \(([\d]+px) \* var\(--spread\)\)\)"/g, 'left:"calc(50% + ($1 * var(--spread-right)))"');

  fs.writeFileSync(f, content);
});

// Ayrica globals.css icindeki degiskenleri de guncelleyelim
let cssPath = 'app/globals.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');
cssContent = cssContent.replace('--spread: 1.5;', '--spread-left: 1.6;\n  --spread-right: 1.3;');
cssContent = cssContent.replace('--spread: 0.75;', '--spread-left: 0.85;\n    --spread-right: 0.65;');
fs.writeFileSync(cssPath, cssContent);

console.log('Update complete!');
