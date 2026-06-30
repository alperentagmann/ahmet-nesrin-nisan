import nodemailer from 'nodemailer';

export async function sendEmail({ subject, text, html }: { subject: string, text: string, html: string }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  
  if (!user || !pass) {
    console.warn("EMAIL_USER veya EMAIL_PASS eksik. E-posta gönderilmedi.");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  // Hedef e-postaları belirle
  const targetEmailsStr = process.env.TARGET_EMAILS || user;
  const targets = targetEmailsStr.split(',').map(e => e.trim()).filter(Boolean);

  try {
    // Vercel'deki TARGET_EMAILS listesindeki e-postalara sırayla gönderim yap.
    for (let i = 0; i < targets.length; i++) {
      const email = targets[i];
      // İlk e-postaya (yani size) "Heyyo...", diğer e-postalara (yeni ekleneceklere) "Nişan Davetlisi..." gitsin.
      const fromName = i === 0 ? "Heyyo Nişana birileri daha katılıyor." : "Nişan Davetlisi (12.07.2026)";

      const info = await transporter.sendMail({
        from: `"${fromName}" <${user}>`,
        to: email,
        subject: subject,
        text: text,
        html: html,
      });
      console.log(`Email sent to ${email}: %s`, info.messageId);
    }
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
