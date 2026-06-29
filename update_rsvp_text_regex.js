const fs = require('fs');

let f = 'app/invite/rsvp/page.tsx';
let content = fs.readFileSync(f, 'utf8');

// Use regex to match the exact paragraph regardless of spacing
content = content.replace(
  /<p className="font-body text-\[0\.95rem\] italic text-ink-soft\/90 leading-relaxed max-w-\[16rem\]">\s*Nişan Tarihine Kadar Katılım Durumunuzu Bildiriniz\s*<\/p>/g,
  `<p className="font-body text-[0.95rem] italic text-ink-soft/90 leading-relaxed text-center">\n            Nişan Tarihine Kadar Katılım Durumunuzu<br />Lütfen Bildiriniz\n          </p>`
);

fs.writeFileSync(f, content);

console.log('Update complete using regex!');
