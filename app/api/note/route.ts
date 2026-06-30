import { NextRequest, NextResponse } from "next/server";
import { addNote } from "@/lib/rsvp-store";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, message } = body as { name?: string; message?: string };

    if (!name || !name.trim()) {
      return NextResponse.json({ error: "İsim zorunludur." }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: "Not boş olamaz." }, { status: 400 });
    }
    if (message.trim().length > 400) {
      return NextResponse.json({ error: "Not en fazla 400 karakter olabilir." }, { status: 400 });
    }

    const entry = await addNote({ name, message });

    // E-posta bildirimi gönder
    await sendEmail({
      subject: `Yeni Not: ${name}`,
      text: `Ad: ${name}\nNot: ${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e3decb; border-radius: 8px; background-color: #fdfbf7;">
          <h2 style="color: #c5a880; text-align: center; margin-bottom: 20px;">Yeni Bir Not Bırakıldı! 💌</h2>
          <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #f0eee5;">
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Kimden:</strong> ${name}</p>
            <p style="margin: 0; font-size: 16px; font-style: italic; color: #555;">"${message}"</p>
          </div>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">Bu e-posta otomatik olarak gönderilmiştir.</p>
        </div>
      `
    });

    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
