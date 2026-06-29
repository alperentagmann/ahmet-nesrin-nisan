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
      <span className="w-14 h-14 rounded-full text-white flex items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95 btn-glow-pulse">
        {icon}
      </span>
      <span className="font-display text-[9px] tracking-[0.2em] uppercase text-ink-soft transition-colors duration-300 group-hover:text-[#9a7e58]">
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
      {/* Floating bubbles — karta daha yakın ve daha hızlı */}
      <div className="particle-layer">
        {/* Sol */}
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (230px * var(--spread-left)))", bottom:"0%",  animationDelay:"0s",    animationDuration:"11s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (280px * var(--spread-left)))", bottom:"5%",  animationDelay:"2s",    animationDuration:"14s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (240px * var(--spread-left)))", bottom:"0%",  animationDelay:"0.5s",  animationDuration:"10s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (310px * var(--spread-left)))", bottom:"3%",  animationDelay:"3.5s",  animationDuration:"13s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% - (260px * var(--spread-left)))", bottom:"0%",  animationDelay:"1s",    animationDuration:"12s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (340px * var(--spread-left)))", bottom:"6%",  animationDelay:"5s",    animationDuration:"16s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (235px * var(--spread-left)))", bottom:"0%",  animationDelay:"2.5s",  animationDuration:"11s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (290px * var(--spread-left)))", bottom:"4%",  animationDelay:"0.2s",  animationDuration:"14s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (250px * var(--spread-left)))", bottom:"0%",  animationDelay:"4s",    animationDuration:"12s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (360px * var(--spread-left)))", bottom:"2%",  animationDelay:"1.5s",  animationDuration:"17s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (245px * var(--spread-left)))", bottom:"0%",  animationDelay:"5.5s",  animationDuration:"10s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (300px * var(--spread-left)))", bottom:"7%",  animationDelay:"0.7s",  animationDuration:"13s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (270px * var(--spread-left)))", bottom:"0%",  animationDelay:"3s",    animationDuration:"11s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (320px * var(--spread-left)))", bottom:"9%",  animationDelay:"6.5s",  animationDuration:"15s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (225px * var(--spread-left)))", bottom:"0%",  animationDelay:"1.2s",  animationDuration:"10s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (330px * var(--spread-left)))", bottom:"12%", animationDelay:"4.5s",  animationDuration:"16s" }} />
        <div className="particle" style={{ width:18, height:18,  left:"calc(50% - (230px * var(--spread-left)))", bottom:"0%",  animationDelay:"2.2s",  animationDuration:"10s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% - (295px * var(--spread-left)))", bottom:"5%",  animationDelay:"3.7s",  animationDuration:"12s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% - (370px * var(--spread-left)))", bottom:"0%",  animationDelay:"6s",    animationDuration:"18s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% - (255px * var(--spread-left)))", bottom:"8%",  animationDelay:"0s",    animationDuration:"11s" }} />
        {/* Sağ */}
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (280px * var(--spread-right)))", bottom:"3%",  animationDelay:"1s",    animationDuration:"15s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (240px * var(--spread-right)))", bottom:"0%",  animationDelay:"2.5s",  animationDuration:"10s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (310px * var(--spread-right)))", bottom:"5%",  animationDelay:"4.5s",  animationDuration:"13s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (260px * var(--spread-right)))", bottom:"0%",  animationDelay:"0s",    animationDuration:"11s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (340px * var(--spread-right)))", bottom:"2%",  animationDelay:"1.7s",  animationDuration:"17s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (230px * var(--spread-right)))", bottom:"0%",  animationDelay:"3.5s",  animationDuration:"10s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (290px * var(--spread-right)))", bottom:"6%",  animationDelay:"0.5s",  animationDuration:"13s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (250px * var(--spread-right)))", bottom:"0%",  animationDelay:"6s",    animationDuration:"12s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (320px * var(--spread-right)))", bottom:"4%",  animationDelay:"2.2s",  animationDuration:"14s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (235px * var(--spread-right)))", bottom:"0%",  animationDelay:"4.2s",  animationDuration:"11s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (360px * var(--spread-right)))", bottom:"1%",  animationDelay:"3s",    animationDuration:"16s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% + (270px * var(--spread-right)))", bottom:"0%",  animationDelay:"1.2s",  animationDuration:"12s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (300px * var(--spread-right)))", bottom:"8%",  animationDelay:"5s",    animationDuration:"14s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (225px * var(--spread-right)))", bottom:"0%",  animationDelay:"7s",    animationDuration:"10s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (370px * var(--spread-right)))", bottom:"11%", animationDelay:"0.7s",  animationDuration:"18s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (245px * var(--spread-right)))", bottom:"0%",  animationDelay:"3.2s",  animationDuration:"10s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (330px * var(--spread-right)))", bottom:"4%",  animationDelay:"1.5s",  animationDuration:"14s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18,  left:"calc(50% + (220px * var(--spread-right)))", bottom:"0%",  animationDelay:"4.7s",  animationDuration:"11s" }} />
        <div className="particle" style={{ width:18, height:18, left:"calc(50% + (295px * var(--spread-right)))", bottom:"7%",  animationDelay:"2.7s",  animationDuration:"13s" }} />
        <div className="particle hidden sm:block" style={{ width:18, height:18, left:"calc(50% + (350px * var(--spread-right)))", bottom:"0%",  animationDelay:"5.7s",  animationDuration:"15s" }} />
      </div>

      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* The Invitation Card */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-paper border border-olive-soft/35 px-6 py-12 sm:px-10 sm:py-14 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center text-center gap-7 sm:gap-8 animate-[fadeIn_0.7s_ease-out] luxury-card border-glow-breath z-20">
        {/* Glossy Light Sweep (Yanarlı Dönerli Altın Işık Süzmesi) */}
        <div className="light-sweep-container">
          <div className="light-sweep" />
        </div>
        {/* Twinkling Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
          {/* Corners */}
          <svg className="absolute top-[4%]  left-[5%]  text-olive/65 animate-twinkle" style={{ animationDelay:'0.2s',  animationDuration:'2.8s' }} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[4%]  right-[5%] text-olive/65 animate-twinkle" style={{ animationDelay:'1.4s',  animationDuration:'3.5s' }} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute bottom-[4%] left-[5%]  text-olive/65 animate-twinkle" style={{ animationDelay:'0.7s',  animationDuration:'3.1s' }} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute bottom-[4%] right-[5%] text-olive/65 animate-twinkle" style={{ animationDelay:'2.0s',  animationDuration:'2.5s' }} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          {/* Left side */}
          <svg className="absolute top-[22%] left-[4%]  text-olive/55 animate-twinkle" style={{ animationDelay:'1.1s',  animationDuration:'4.0s' }} width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[42%] left-[3%]  text-olive/60 animate-twinkle" style={{ animationDelay:'0.4s',  animationDuration:'3.3s' }} width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[62%] left-[5%]  text-olive/50 animate-twinkle" style={{ animationDelay:'2.5s',  animationDuration:'2.9s' }} width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[80%] left-[4%]  text-olive/55 animate-twinkle" style={{ animationDelay:'1.8s',  animationDuration:'3.7s' }} width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          {/* Right side */}
          <svg className="absolute top-[28%] right-[3%] text-olive/60 animate-twinkle" style={{ animationDelay:'0.9s',  animationDuration:'3.8s' }} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[48%] right-[4%] text-olive/55 animate-twinkle" style={{ animationDelay:'3.0s',  animationDuration:'2.7s' }} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[66%] right-[5%] text-olive/65 animate-twinkle" style={{ animationDelay:'1.3s',  animationDuration:'3.4s' }} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute top-[84%] right-[3%] text-olive/50 animate-twinkle" style={{ animationDelay:'0.6s',  animationDuration:'4.2s' }} width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          {/* Top & bottom centre */}
          <svg className="absolute top-[1%]  left-[45%] text-olive/55 animate-twinkle" style={{ animationDelay:'2.2s',  animationDuration:'3.0s' }} width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
          <svg className="absolute bottom-[1%] left-[48%] text-olive/55 animate-twinkle" style={{ animationDelay:'1.6s',  animationDuration:'3.6s' }} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z"/></svg>
        </div>

        
        {/* Double Border Frame */}
        <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px] border-glow-breath" />
        <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

        {/* Corner Floral Ornaments */}
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="absolute top-1.5 left-1.5 text-olive/30 pointer-events-none opacity-60">
          <path d="M0 0 C 25 5, 45 25, 40 50" stroke="currentColor" strokeWidth="0.8" />
          <path d="M12 8 C 20 4, 25 12, 17 18 C 9 24, 5 16, 12 8 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 20 C 32 16, 37 24, 29 30 C 21 36, 17 28, 24 20 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="absolute top-1.5 right-1.5 text-olive/30 pointer-events-none opacity-60 rotate-90">
          <path d="M0 0 C 25 5, 45 25, 40 50" stroke="currentColor" strokeWidth="0.8" />
          <path d="M12 8 C 20 4, 25 12, 17 18 C 9 24, 5 16, 12 8 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 20 C 32 16, 37 24, 29 30 C 21 36, 17 28, 24 20 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="absolute bottom-1.5 left-1.5 text-olive/30 pointer-events-none opacity-60 -rotate-90">
          <path d="M0 0 C 25 5, 45 25, 40 50" stroke="currentColor" strokeWidth="0.8" />
          <path d="M12 8 C 20 4, 25 12, 17 18 C 9 24, 5 16, 12 8 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 20 C 32 16, 37 24, 29 30 C 21 36, 17 28, 24 20 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
        </svg>
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="absolute bottom-1.5 right-1.5 text-olive/30 pointer-events-none opacity-60 rotate-180">
          <path d="M0 0 C 25 5, 45 25, 40 50" stroke="currentColor" strokeWidth="0.8" />
          <path d="M12 8 C 20 4, 25 12, 17 18 C 9 24, 5 16, 12 8 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
          <path d="M24 20 C 32 16, 37 24, 29 30 C 21 36, 17 28, 24 20 Z" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeWidth="0.8" />
        </svg>

        {/* Crown Twig Ornament */}
        <svg width="50" height="24" viewBox="0 0 80 40" fill="none" className="text-olive/50 mt-1 opacity-80 shrink-0 z-10">
          <path d="M40 38 V 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 30 C 30 28, 25 20, 28 15 C 31 10, 38 18, 40 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 22 C 28 20, 23 12, 26 7 C 29 2, 38 10, 40 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 30 C 50 28, 55 20, 52 15 C 49 10, 42 18, 40 22" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 22 C 52 20, 57 12, 54 7 C 51 2, 42 10, 40 14" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <path d="M40 10 C 37 5, 40 0, 40 0 C 40 0, 43 5, 40 10" stroke="currentColor" strokeWidth="1.2" fill="none" />
        </svg>

        {/* Invitation Header */}
        <p className="font-display text-[10px] sm:text-[11px] tracking-[0.24em] uppercase text-ink-soft/90 z-10 -mt-2">
          Nişanımıza Davetlisiniz
        </p>

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

        {/* Intertwined Engagement Rings Divider */}
        <div className="flex items-center gap-4.5 z-10 opacity-85 my-2">
          <div className="w-12 h-px bg-line" />
          <svg width="72" height="48" viewBox="0 0 48 32" fill="none" className="text-olive scale-110">
            {/* Left Ring (engagement/diamond ring) */}
            <circle cx="18" cy="18" r="9" stroke="currentColor" strokeWidth="1.6" />
            <path d="M18 4 L21 7 L18 10 L15 7 Z" fill="currentColor" />
            <circle cx="18" cy="7" r="1" fill="var(--paper)" />
            {/* Right Ring */}
            <circle cx="28" cy="18" r="9" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <div className="w-12 h-px bg-line" />
        </div>

        {/* Invite text */}
        <p className="font-body text-[1.1rem] italic text-ink-soft leading-relaxed max-w-[21rem] z-10">
          Birlikte gülmeyi, hayal kurmayı ve aynı yolda yürümeyi seçtik. Bu özel günümüzde yanımızda olmanız bizim için en güzel hediye olacak.
          <br />
          <span className="mt-4 block not-italic font-display text-[9.5px] tracking-[0.18em] uppercase text-olive-deep font-semibold">
            Lütfen katılım durumunuzu bildiriniz
          </span>
        </p>

        {/* Date & Time */}
        <div className="flex flex-col gap-2.5 z-10 items-center">
          <div className="flex items-center justify-center text-ink gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--olive)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="font-display text-[1.02rem] tracking-[0.12em] uppercase">{dateLabel}</span>
          </div>
          
          <div className="flex items-center justify-center text-ink gap-2">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--olive)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="font-display text-[1.02rem] tracking-[0.12em] uppercase">{timeLabel}</span>
          </div>
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
