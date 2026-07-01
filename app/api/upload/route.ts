import { NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials missing");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }

    // Prepare payload for Telegram
    const telegramFormData = new FormData();
    telegramFormData.append("chat_id", TELEGRAM_CHAT_ID);
    
    // We send as a document so Telegram doesn't compress the image too much
    telegramFormData.append("document", file, file.name);

    // Telegram Bot API Endpoint for sending a document
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: "POST",
      body: telegramFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Telegram error:", errorText);
      throw new Error("Failed to send to Telegram");
    }

    const data = await response.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
