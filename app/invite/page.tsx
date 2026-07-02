"use client";

import { useState } from "react";
import Link from "next/link";
import imageCompression from "browser-image-compression";
import { inviteConfig } from "@/lib/invite-config";
import Countdown from "@/app/components/Countdown";
import WeatherWidget from "@/app/components/WeatherWidget";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function YandexIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="#FC3F1D"/>
      <path d="M12.246 16.532h1.36L12.918 13.1a2.212 2.212 0 0 0 1.137-1.932c0-1.412-.96-2.285-2.555-2.285H7.833v7.65h1.877V13.892h.349l2.187 2.64zm-2.536-4.159v-2.34h.61c.618 0 .972.298.972.888 0 .625-.331.908-.956.908h-.626z" fill="white" transform="matrix(-1 0 0 1 24 0)" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.4 6.74c.78-.96 1.3-2.17 1.15-3.38-1.05.04-2.34.71-3.15 1.69-.72.87-1.32 2.1-1.15 3.3 1.17.09 2.37-.65 3.15-1.61zM16.51 7.42c-1.58-.04-3.14.96-3.95.96-.82 0-2.1-.92-3.41-.89-1.71.02-3.29.99-4.17 2.53-1.8 3.12-.46 7.74 1.28 10.27.86 1.24 1.87 2.62 3.2 2.57 1.28-.04 1.77-.82 3.32-.82 1.54 0 2.01.82 3.35.79 1.37-.02 2.23-1.26 3.08-2.51.98-1.43 1.38-2.82 1.41-2.89-.03-.02-2.7-1.04-2.73-4.13-.02-2.59 2.11-3.83 2.2-3.88-1.22-1.78-3.1-2.02-3.78-2.04z" />
    </svg>
  );
}

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

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-mt-[2px]">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

function CircleAction({
  icon,
  label,
  href,
  external,
  onClick,
  primary = false,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  primary?: boolean;
}) {
  const content = (
    <div className="flex flex-col items-center gap-2.5 group cursor-pointer w-[86px]" onClick={onClick}>
      <span
        className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-active:scale-95 ${
          primary
            ? "text-white btn-glow-pulse"
            : "bg-white text-olive border border-olive-soft/40 shadow-sm hover:shadow-md"
        }`}
      >
        {icon}
      </span>
      <span className="font-display text-[9px] tracking-[0.15em] leading-snug uppercase text-center text-ink-soft transition-colors duration-300 group-hover:text-[#9a7e58]">
        {label}
      </span>
    </div>
  );

  if (onClick) return content;

  if (external && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}

export default function InvitePage() {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isRsvpCheckModalOpen, setIsRsvpCheckModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPhotoFiles(files);
      setUploadSuccess(false);
      setUploadError("");
      setUploadedCount(0);
    }
  };

  const handlePhotoUpload = async () => {
    if (photoFiles.length === 0) return;
    setIsUploading(true);
    setUploadError("");
    setUploadedCount(0);
    
    let successCount = 0;
    try {
      const options = {
        maxSizeMB: 2, // Vercel limit is 4.5MB, keeping it at 2MB ensures safety and speed
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };

      for (let i = 0; i < photoFiles.length; i++) {
        const file = photoFiles[i];
        const formData = new FormData();
        
        try {
          const compressedFile = await imageCompression(file, options);
          formData.append("file", compressedFile, file.name);
        } catch (error) {
          formData.append("file", file);
        }
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Bilinmeyen bir hata oluştu");
        }
        successCount++;
        setUploadedCount(successCount);

        if (i < photoFiles.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      }
      
      setUploadSuccess(true);
      setPhotoFiles([]);
    } catch (err: any) {
      setUploadError(`Hata: ${err.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
    setTimeout(() => {
      setPhotoFiles([]);
      setUploadSuccess(false);
      setUploadError("");
      setUploadedCount(0);
    }, 300);
  };
  
  const { coupleNames, parents, dateLabel, timeLabel, venueName, venueAddress, mapsUrl, receptionNote } =
    inviteConfig;

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* Floating bubbles — karta daha yakın ve daha hızlı */}
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
      <div className="relative w-full max-w-sm sm:max-w-md bg-paper border border-olive-soft/35 px-5 py-10 sm:px-8 sm:py-12 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center text-center gap-5 sm:gap-6 animate-[fadeIn_0.7s_ease-out] luxury-card border-glow-breath z-20">
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

          <h1 className="font-script text-[3.8rem] sm:text-[4.4rem] leading-[0.85] text-olive-deep mt-1 mb-1.5">
            {coupleNames.second}
          </h1>
          <p className="font-body text-[0.88rem] tracking-wide italic text-ink-soft leading-snug -mt-2.5">
            {parents.groom.names}
          </p>
        </div>

        {/* Intertwined Engagement Rings Divider */}
        <div className="flex items-center gap-4.5 z-10 opacity-85 my-0.5">
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

        {/* Countdown and Weather Container */}
        <div className="flex flex-row items-stretch justify-center gap-2 z-10 w-full pt-1 pb-1">
          <Countdown targetDate={inviteConfig.eventDate} />
          <WeatherWidget />
        </div>

        {/* Venue & Note Group */}
        <div className="flex flex-col items-center gap-3 z-10 pt-2">
          <div className="flex flex-col gap-1">
            <p className="font-display text-[1rem] tracking-[0.12em] uppercase text-ink">{venueName}</p>
            <p className="font-body text-[0.94rem] text-ink-soft leading-relaxed max-w-[16rem]">{venueAddress}</p>
          </div>

          {receptionNote && (
            <p className="font-body text-[0.94rem] text-ink-soft/95 leading-relaxed max-w-[18rem]">
              {receptionNote}
            </p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-col items-center gap-5 pt-1 z-10">
          {/* LCV Reminder */}
          <div className="animate-[pulse_3s_ease-in-out_infinite]">
            <p className="font-display text-[11px] font-semibold tracking-[0.12em] uppercase text-ink bg-[#c5a880]/20 py-2 px-5 rounded-full border border-[#c5a880]/40 text-center shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
              Lütfen katılım durumunuzu bildiriniz
            </p>
          </div>

          <div className="flex items-center justify-center gap-6">
            <CircleAction
              icon={<MapPinIcon />}
            label="konum"
            onClick={() => setIsRsvpCheckModalOpen(true)}
          />
          <CircleAction icon={<CheckIcon />} label="LCV/Katılım" href="/invite/rsvp" primary={true} />
          <CircleAction
            icon={<CameraIcon />}
            label="Fotoğraf Yükle"
            onClick={() => setIsPhotoModalOpen(true)}
          />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Map Selection Modal */}
      {isMapModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-ink/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-[280px] bg-paper border border-olive-soft/40 p-6 py-8 rounded-[4px] shadow-2xl flex flex-col items-center gap-4 text-center">
            
            <button 
              onClick={() => setIsMapModalOpen(false)}
              className="absolute top-3 right-3 text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <h3 className="font-display text-[12px] sm:text-[13px] tracking-[0.08em] text-ink uppercase mb-2">Konumu Görmek İçin Uygulama Seçin</h3>
            
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsMapModalOpen(false)} className="w-full py-3 px-4 border border-olive-soft/30 rounded text-[13px] font-body italic text-ink hover:bg-olive hover:text-cream transition-colors duration-300 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <GoogleIcon />
                <span>Google Haritalar</span>
              </div>
              <svg className="opacity-50 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            
            <a href="https://yandex.com/maps/?text=Trakya+2+Cad.+Menekse+6+Sokak+No:2,+Buyukcekmece,+Istanbul" target="_blank" rel="noopener noreferrer" onClick={() => setIsMapModalOpen(false)} className="w-full py-3 px-4 border border-olive-soft/30 rounded text-[13px] font-body italic text-ink hover:bg-olive hover:text-cream transition-colors duration-300 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <YandexIcon />
                <span>Yandex Navigasyon</span>
              </div>
              <svg className="opacity-50 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            
            <a href="http://maps.apple.com/?q=Trakya+2+Cad.+Menekse+6+Sokak+No:2,+Buyukcekmece,+Istanbul" target="_blank" rel="noopener noreferrer" onClick={() => setIsMapModalOpen(false)} className="w-full py-3 px-4 border border-olive-soft/30 rounded text-[13px] font-body italic text-ink hover:bg-olive hover:text-cream transition-colors duration-300 flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <AppleIcon />
                <span>Apple Haritalar</span>
              </div>
              <svg className="opacity-50 group-hover:opacity-100 transition-opacity" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      )}

      {/* RSVP Check Modal before Map */}
      {isRsvpCheckModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-ink/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-[300px] bg-paper border border-olive-soft/40 p-6 py-8 rounded-[4px] shadow-2xl flex flex-col items-center gap-6 text-center">
            
            <button 
              onClick={() => setIsRsvpCheckModalOpen(false)}
              className="absolute top-3 right-3 text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div className="flex flex-col gap-2 items-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-olive mb-1">
                <path d="M5 12.5 9.5 17 19 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="font-display text-[15px] tracking-[0.08em] text-ink uppercase">Katılım Durumunuzu Bildirdiniz mi?</h3>
              <p className="font-body text-[14px] text-ink-soft/90 italic leading-snug">
                Konum bilgilerini görmeden önce lütfen katılım formunu doldurun.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              <button 
                onClick={() => {
                  setIsRsvpCheckModalOpen(false);
                  setIsMapModalOpen(true);
                }} 
                className="w-full py-3 px-4 bg-olive text-cream rounded text-[12px] font-display uppercase tracking-[0.15em] hover:bg-olive-deep transition-colors duration-300"
              >
                Evet, Bildirdim
              </button>
              
              <Link 
                href="/invite/rsvp"
                className="w-full py-3 px-4 border border-olive-soft/30 rounded text-[12px] font-display uppercase tracking-[0.15em] text-ink hover:bg-olive hover:text-cream transition-colors duration-300"
              >
                Hayır, Şimdi Bildireyim
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Photo Upload Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-ink/40 backdrop-blur-sm animate-[fadeIn_0.3s_ease-out]">
          <div className="relative w-full max-w-[320px] bg-paper border border-olive-soft/40 p-6 py-8 rounded-[4px] shadow-2xl flex flex-col items-center gap-6 text-center">
            
            <button 
              onClick={closePhotoModal}
              className="absolute top-3 right-3 text-ink-soft hover:text-ink transition-colors cursor-pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>

            <div className="flex flex-col gap-2 items-center">
              <div className="w-12 h-12 rounded-full bg-olive/10 flex items-center justify-center text-olive mb-2">
                <CameraIcon />
              </div>
              <h3 className="font-display text-[15px] tracking-[0.08em] text-ink uppercase">Anılarınızı Paylaşın</h3>
              <p className="font-body text-[13px] text-ink-soft/90 italic leading-snug">
                Bizimle bu özel günü ölümsüzleştirmek için çektiğiniz harika kareleri yükleyebilirsiniz.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 w-full">
              {uploadSuccess ? (
                <div className="flex flex-col items-center gap-3 py-4 animate-[fadeIn_0.4s_ease-out]">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-2">
                    <CheckIcon />
                  </div>
                  <p className="font-display text-[12px] tracking-wider text-green-700 uppercase font-semibold">Başarıyla Yüklendi!</p>
                  <p className="font-body text-[13px] italic text-ink-soft">Güzel anınızı paylaştığınız için teşekkürler.</p>
                  <button 
                    onClick={() => {
                      setUploadSuccess(false);
                    }}
                    className="mt-2 text-[11px] font-display uppercase tracking-widest text-olive hover:text-olive-deep underline decoration-olive/30 underline-offset-4 cursor-pointer"
                  >
                    Başka Fotoğraf Yükle
                  </button>
                </div>
              ) : photoFiles.length > 0 ? (
                <div className="flex flex-col gap-4 w-full items-center animate-[fadeIn_0.4s_ease-out]">
                  <div className="relative w-full aspect-video rounded overflow-hidden border border-olive-soft/30 bg-ink/5 flex flex-col items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-olive mb-2 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    <p className="font-display text-[14px] text-ink">{photoFiles.length} fotoğraf seçildi</p>
                    
                    {isUploading && (
                      <div className="absolute inset-0 bg-paper/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <div className="w-8 h-8 border-2 border-olive border-t-transparent rounded-full animate-spin"></div>
                        <p className="font-display text-[11px] uppercase tracking-wider text-olive-deep">Yükleniyor... ({uploadedCount}/{photoFiles.length})</p>
                      </div>
                    )}
                  </div>
                  {uploadError && <p className="text-[12px] text-red-500 font-body text-center">{uploadError}</p>}
                  <div className="flex gap-2 w-full">
                    <button 
                      onClick={() => setPhotoFiles([])}
                      disabled={isUploading}
                      className="flex-1 py-3 px-4 border border-olive-soft/30 text-ink rounded text-[11px] font-display uppercase tracking-[0.15em] hover:bg-olive/5 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      İptal
                    </button>
                    <button 
                      onClick={handlePhotoUpload}
                      disabled={isUploading}
                      className="flex-1 py-3 px-4 bg-olive text-cream rounded text-[11px] font-display uppercase tracking-[0.15em] hover:bg-olive-deep transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {isUploading ? "Yükleniyor..." : "Yükle"}
                    </button>
                  </div>
                </div>
              ) : (
                <label className="w-full py-4 px-4 border border-dashed border-olive-soft rounded bg-olive/5 hover:bg-olive/10 transition-colors duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer min-h-[140px] group">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-olive group-hover:scale-110 transition-transform">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  <span className="font-display text-[11px] tracking-[0.15em] uppercase text-ink mt-2">
                    Çoklu Fotoğraf Seç
                  </span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    onChange={handlePhotoSelect} 
                    className="hidden" 
                  />
                </label>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20">
        <p className="font-display text-[10px] tracking-widest text-ink-soft/60">
          COPYRIGHT 2026 | DESIGN BY ALPEREN TAĞMAN.
        </p>
      </div>
    </main>
  );
}
