import nodemailer from 'nodemailer';

export async function sendEmail({ subject, text, html }: { subject: string, text: string, html: string }) {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  
  if (!user || !pass) {
    console.warn("EMAIL_USER veya EMAIL_PASS eksik. E-posta gönderilmedi.");
    return;
  }

  // Eger TARGET_EMAILS tanimlanmadiysa, maili direkt gonderici (EMAIL_USER) adresine gonder.
  // Birden fazla kisiye gitmesini istersen Vercel'e TARGET_EMAILS ekleyip "mail1@gmail.com, mail2@gmail.com" yazabilirsin.
  const to = process.env.TARGET_EMAILS || user;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Düğün Davetiyesi" <${user}>`,
      to: to,
      subject: subject,
      text: text,
      html: html,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
