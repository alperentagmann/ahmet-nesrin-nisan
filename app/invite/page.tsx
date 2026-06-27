"use client";

import Link from "next/link";
import { inviteConfig } from "@/lib/invite-config";

function MapPinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21s-7-7.2-7-12a7 7 0 1 1 14 0c0 4.8-7 12-7 12Z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle cx="12" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CircleAction({
  icon,
  label,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  external?: boolean;
}) {
  const content = (
    <div className="flex flex-col items-center gap-2.5 group">
      <span className="w-16 h-16 rounded-full bg-olive text-cream flex items-center justify-center shadow-[0_4px_14px_rgba(95,99,71,0.35)] transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95">
        {icon}
      </span>
      <span className="font-body text-[12px] tracking-[0.14em] uppercase text-ink-soft">
        {label}
      </span>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={href}>{content}</Link>;
}

export default function InvitePage() {
  const { coupleNames, dateLabel, timeLabel, venueName, venueAddress, mapsUrl, receptionNote } =
    inviteConfig;

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center px-6 py-16 sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #2c2b25 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      <div className="relative w-full max-w-sm flex flex-col items-center text-center gap-10 animate-[fadeIn_0.7s_ease-out]">
        {/* Names */}
        <div className="flex flex-col items-center">
          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-wide text-ink">
            {coupleNames.first}
          </h1>
          <span className="font-display text-2xl text-olive-deep my-1">&</span>
          <h1 className="font-display text-[2.6rem] leading-[1.05] tracking-wide text-ink">
            {coupleNames.second}
          </h1>
        </div>

        <div className="w-12 h-px bg-line" />

        {/* Invite text */}
        <p className="font-body text-[1.15rem] italic text-ink-soft leading-relaxed">
          Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.
          <br />
           Lütfen katılım durumunuzu bildiriniz.
        </p>

        {/* Date & time */}
        <div className="flex flex-col gap-1">
          <p className="font-body text-[1.1rem] text-ink">{dateLabel}</p>
          <p className="font-body text-[1.1rem] text-ink-soft">{timeLabel}</p>
        </div>

        {/* Venue */}
        <div className="flex flex-col gap-1">
          <p className="font-body text-[1.05rem] text-ink">{venueName}</p>
          <p className="font-body text-[1rem] text-ink-soft">{venueAddress}</p>
        </div>

        <p className="font-body text-[0.98rem] text-ink-soft leading-relaxed max-w-[20rem]">
          {receptionNote}
        </p>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-10 pt-2">
          <CircleAction
            icon={<MapPinIcon />}
            label="konum"
            href={mapsUrl}
            external
          />
          <CircleAction icon={<CheckIcon />} label="Katılım Durumu" href="/invite/rsvp" />
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}
