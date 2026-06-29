const fs = require('fs');

let f = 'app/invite/rsvp/page.tsx';
let content = fs.readFileSync(f, 'utf8');

const oldText = `<p className="font-body text-[0.95rem] italic text-ink-soft/90 leading-relaxed max-w-[16rem]">\n            Nişan Tarihine Kadar Katılım Durumunuzu Bildiriniz\n          </p>`;
const newText = `<p className="font-body text-[0.95rem] italic text-ink-soft/90 leading-relaxed">\n            Nişan Tarihine Kadar Katılım Durumunuzu<br />Lütfen Bildiriniz\n          </p>`;

content = content.replace(oldText, newText);
fs.writeFileSync(f, content);

console.log('Update complete!');
