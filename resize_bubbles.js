const fs = require('fs');

const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/width:16, height:16/g, 'width:13, height:13');
  fs.writeFileSync(f, content);
});

console.log('Resize update complete!');
