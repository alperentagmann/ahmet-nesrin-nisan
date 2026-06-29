const fs = require('fs');
const files = [
  'app/page.tsx',
  'app/invite/page.tsx',
  'app/invite/rsvp/page.tsx'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Balon boyutlarini standartlastir: width:18, height:18
  content = content.replace(/width:\d+,\s*height:\d+,/g, 'width:18, height:18,');

  // Hizlarini biraz yavaslat: animasyon surelerini 4 saniye uzat (orn: 7s -> 11s)
  content = content.replace(/animationDuration:"(\d+)s"/g, (match, p1) => {
    let newDuration = parseInt(p1) + 4;
    return `animationDuration:"${newDuration}s"`;
  });

  fs.writeFileSync(f, content);
});

console.log('Update complete!');
