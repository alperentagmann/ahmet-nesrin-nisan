const fs = require('fs');
const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let lines = content.split('\n');
  let pCount = 0;
  for(let i=0; i<lines.length; i++) {
    if (lines[i].includes('className="particle"')) {
      pCount++;
      // Hide every other bubble on small screens to prevent crashing
      if (pCount % 2 === 0) {
        lines[i] = lines[i].replace('className="particle"', 'className="particle hidden sm:block"');
      }
      // Replace calc(50% - calc(230px * var(--spread))) with calc(50% - (230px * var(--spread)))
      // Regex captures the number before px
      lines[i] = lines[i].replace(/calc\((\d+)px \* var\(--spread\)\)/g, '($1px * var(--spread))');
    }
  }
  fs.writeFileSync(f, lines.join('\n'));
});
console.log('Fixed syntax and added mobile hiding!');
