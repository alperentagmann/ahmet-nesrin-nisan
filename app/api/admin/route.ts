import { NextRequest, NextResponse } from "next/server";
import { getAllRsvps, getAllNotes } from "@/lib/rsvp-store";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "ahmetnesrin123";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body as { password?: string };

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Yanlış parola." },
        { status: 401 }
      );
    }

    const [entries, notes] = await Promise.all([getAllRsvps(), getAllNotes()]);
    const summary = {
      total: entries.length,
      attending: entries.filter((e) => e.attending).length,
      notAttending: entries.filter((e) => !e.attending).length,
    };

    return NextResponse.json({ ok: true, summary, entries, notes });
  } catch (err) {
    console.error(err);
    const message = err instanceof Error ? err.message : "Bir hata oluştu.";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
