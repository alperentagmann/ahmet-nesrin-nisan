import { NextRequest, NextResponse } from "next/server";
import { addRsvp } from "@/lib/rsvp-store";

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

    return NextResponse.json({ ok: true, entry });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Bir hata oluştu. Tekrar deneyin." },
      { status: 500 }
    );
  }
}
