const fs = require('fs');

const lanes = [220, 240, 260, 280, 300, 320, 340, 360, 380, 400];
const durations = [14, 16, 13, 15, 17, 14, 16, 13, 15, 17];
const delays = [0, 2, 1, 3, 0.5, 4, 1.5, 5, 2.5, 6];

let newContent = `<div className="particle-layer">\n`;

// Left Side
newContent += `        {/* Sol */}\n`;
for(let i=0; i<10; i++) {
  let lane = lanes[i];
  let dur = durations[i];
  let del1 = delays[i];
  let del2 = del1 + (dur / 2); // Perfectly staggered by half duration

  newContent += `        <div className="particle" style={{ width:16, height:16, left:"calc(50% - (${lane}px * var(--spread-left)))", bottom:"-5%", animationDelay:"${del1}s", animationDuration:"${dur}s" }} />\n`;
  newContent += `        <div className="particle hidden sm:block" style={{ width:16, height:16, left:"calc(50% - (${lane}px * var(--spread-left)))", bottom:"-5%", animationDelay:"${del2}s", animationDuration:"${dur}s" }} />\n`;
}

// Right Side
newContent += `        {/* Sağ */}\n`;
for(let i=0; i<10; i++) {
  let lane = lanes[i];
  let dur = durations[i];
  // Offset right side delays so it's not a perfect mirror
  let del1 = (delays[i] + 1.5) % dur;
  let del2 = del1 + (dur / 2);

  newContent += `        <div className="particle" style={{ width:16, height:16, left:"calc(50% + (${lane}px * var(--spread-right)))", bottom:"-5%", animationDelay:"${del1}s", animationDuration:"${dur}s" }} />\n`;
  newContent += `        <div className="particle hidden sm:block" style={{ width:16, height:16, left:"calc(50% + (${lane}px * var(--spread-right)))", bottom:"-5%", animationDelay:"${del2}s", animationDuration:"${dur}s" }} />\n`;
}
newContent += `      </div>`;

const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  // Match the entire particle-layer block up to the first closing </div>
  content = content.replace(/<div className="particle-layer">[\s\S]*?<\/div>/g, newContent);
  fs.writeFileSync(f, content);
});

console.log('Update complete!');
