import { NextRequest, NextResponse } from "next/server";
import { addNote } from "@/lib/rsvp-store";

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
    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
