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
    <div className="flex flex-col items-center gap-2.5 group cursor-pointer">
      <span className="w-14 h-14 rounded-full border border-olive-soft/40 bg-cream-deep/30 text-olive-deep flex items-center justify-center shadow-[0_4px_12px_rgba(197,168,128,0.12)] transition-all duration-300 ease-out group-hover:scale-105 group-hover:bg-olive group-hover:text-cream group-active:scale-95">
        {icon}
      </span>
      <span className="font-display text-[9px] tracking-[0.2em] uppercase text-ink-soft transition-colors duration-300 group-hover:text-olive-deep">
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
  const { coupleNames, parents, dateLabel, timeLabel, venueName, venueAddress, mapsUrl, receptionNote } =
    inviteConfig;

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* The Invitation Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-paper border border-olive-soft/35 px-6 py-14 sm:px-10 sm:py-16 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center text-center gap-8 sm:gap-10 animate-[fadeIn_0.7s_ease-out]">
        
        {/* Double Border Frame */}
        <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px]" />
        <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

        {/* Crown Twig Ornament */}
        <svg width="60" height="30" viewBox="0 0 80 40" fill="none" className="text-olive/50 mt-1 opacity-80 shrink-0">
          <path d="M40 38 V 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          {/* Left leaves */}
          <path d="M40 30 C 30 28, 25 20, 28 15 C 31 10, 38 18, 40 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 22 C 28 20, 23 12, 26 7 C 29 2, 38 10, 40 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
          {/* Right leaves */}
          <path d="M40 30 C 50 28, 55 20, 52 15 C 49 10, 42 18, 40 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 22 C 52 20, 57 12, 54 7 C 51 2, 42 10, 40 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
          {/* Center top leaf */}
          <path d="M40 10 C 37 5, 40 0, 40 0 C 40 0, 43 5, 40 10" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Names & Parents */}
        <div className="flex flex-col items-center gap-1.5 z-10">
          <p className="font-body text-[0.88rem] tracking-wide italic text-ink-soft leading-snug">
            {parents.bride.names}
          </p>
          <h1 className="font-script text-[3.8rem] sm:text-[4.4rem] leading-[0.85] text-olive-deep mt-3.5 mb-1.5">
            {coupleNames.first}
          </h1>

          <span className="font-body text-lg italic text-ink-soft/75 my-1">&amp;</span>

          <h1 className="font-script text-[3.8rem] sm:text-[4.4rem] leading-[0.85] text-olive-deep mt-1 mb-3.5">
            {coupleNames.second}
          </h1>
          <p className="font-body text-[0.88rem] tracking-wide italic text-ink-soft leading-snug">
            {parents.groom.names}
          </p>
        </div>

        <div className="w-10 h-px bg-line opacity-80" />

        {/* Invite text */}
        <p className="font-body text-[1.12rem] italic text-ink-soft leading-relaxed max-w-[19rem] z-10">
          Bu mutlu günümüzde sizleri de aramızda görmekten onur duyarız.
          <br />
          Lütfen katılım durumunuzu bildiriniz.
        </p>

        {/* Date & time */}
        <div className="flex flex-col gap-1 z-10">
          <p className="font-display text-[1.08rem] tracking-[0.15em] uppercase text-ink">{dateLabel}</p>
          <p className="font-body text-[1.02rem] text-ink-soft/90 italic">{timeLabel}</p>
        </div>

        {/* Venue */}
        <div className="flex flex-col gap-1 z-10">
          <p className="font-display text-[1rem] tracking-[0.12em] uppercase text-ink">{venueName}</p>
          <p className="font-body text-[0.94rem] text-ink-soft leading-relaxed max-w-[16rem]">{venueAddress}</p>
        </div>

        {receptionNote && (
          <p className="font-body text-[0.94rem] text-ink-soft/95 leading-relaxed max-w-[18rem] z-10">
            {receptionNote}
          </p>
        )}

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-10 pt-2 z-10">
          <CircleAction
            icon={<MapPinIcon />}
            label="konum"
            href={mapsUrl}
            external
          />
          <CircleAction icon={<CheckIcon />} label="L.C.V. / Katılım" href="/invite/rsvp" />
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
