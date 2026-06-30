import { NextRequest, NextResponse } from "next/server";
import { addRsvp } from "@/lib/rsvp-store";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, attending, allergies } = body as {
      name?: string;
      attending?: boolean;
      allergies?: string;
    };

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Ad zorunludur." },
        { status: 400 }
      );
    }

    if (typeof attending !== "boolean") {
      return NextResponse.json(
        { error: "Katılımınızı onaylayın." },
        { status: 400 }
      );
    }

    const entry = await addRsvp({
      name,
      attending,
      allergies: allergies ?? "",
    });

    // E-posta bildirimi gönder
    const statusText = attending ? "✅ Katılıyor" : "❌ Katılmıyor";
    const countText = attending ? (allergies ? ` (${allergies})` : "") : "";
    
    await sendEmail({
      subject: `Yeni LCV: ${name} - ${statusText}`,
      text: `Ad: ${name}\nDurum: ${statusText}${countText}`,
      html: `
        <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e3decb; border-radius: 8px; background-color: #fdfbf7;">
          <h2 style="color: #c5a880; text-align: center; margin-bottom: 20px;">Yeni LCV Yanıtı Geldi! 💌</h2>
          <div style="background: white; padding: 20px; border-radius: 6px; border: 1px solid #f0eee5;">
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Ad Soyad:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Durum:</strong> <span style="color: ${attending ? '#4caf50' : '#f44336'}; font-weight: bold;">${statusText}</span></p>
            ${attending ? `<p style="margin: 0 0 10px 0; font-size: 16px;"><strong>Kişi Sayısı:</strong> ${allergies || 'Belirtilmedi'}</p>` : ''}
          </div>
          <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">Bu e-posta otomatik olarak gönderilmiştir.</p>
        </div>
      `
    });

    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Bir hata oluştu. Tekrar deneyin." },
      { status: 500 }
    );
  }
}
