import { NextResponse } from "next/server";
import { inviteConfig } from "@/lib/invite-config";

export async function GET() {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nesrin Ahmet//Nisan Davetiyesi//TR",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    "DTSTART:20260712T100000Z",
    "DTEND:20260712T130000Z",
    `SUMMARY:Ahmet Burak & Nesrin Nişanı`,
    `LOCATION:${inviteConfig.venueAddress}`,
    `DESCRIPTION:Ahmet Burak ve Nesrin'in Nişan Töreni`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  return new NextResponse(icsContent, {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="nisan-davetiyesi.ics"',
    },
  });
}
