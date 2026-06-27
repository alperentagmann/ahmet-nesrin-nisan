import { NextRequest, NextResponse } from "next/server";
import { getAllRsvps, getRsvpSummary } from "@/lib/rsvp-store";

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

    const [summary, entries] = await Promise.all([
      getRsvpSummary(),
      getAllRsvps(),
    ]);

    return NextResponse.json({ ok: true, summary, entries });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Bir hata oluştu." },
      { status: 500 }
    );
  }
}
