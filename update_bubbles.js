const fs = require('fs');
const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/left:"calc\(50% - (\d+)px\)"/g, 'left:"calc(50% - calc($1px * var(--spread)))"');
  content = content.replace(/left:"calc\(50% \+ (\d+)px\)"/g, 'left:"calc(50% + calc($1px * var(--spread)))"');
  fs.writeFileSync(f, content);
});
console.log('Update complete!');
