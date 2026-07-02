"use client";

import { useState } from "react";
import Link from "next/link";
import { inviteConfig } from "@/lib/invite-config";
import confetti from "canvas-confetti";

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
      <path d="M12.246 16.53h1.36L12.918 13.1a2.212 2.212 0 0 0 1.137-1.932c0-1.412-.96-2.285-2.555-2.285H7.833v7.65h1.877V13.892h.349l2.187 2.64zm-2.536-4.159v-2.34h.61c.618 0 .972.298.972.888 0 .625-.331.908-.956.908h-.626z" fill="white" transform="matrix(-1 0 0 1 24 0)" />
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

type Choice = "yes" | "no" | null;
type Status = "idle" | "submitting" | "done" | "error";

export default function RsvpPage() {
  const [choice, setChoice] = useState<Choice>(null);
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [noteText, setNoteText] = useState("");
  const [noteSent, setNoteSent] = useState(false);
  const [noteSending, setNoteSending] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const aiTemplates = [
    "Bir ömür boyu sağlık, huzur ve mutluluk diliyorum...",
    "Birbirinize olan sevginiz hep ilk günkü gibi taze kalsın. Mutluluğunuz daim olsun! ✨",
    "Bu güzel yola çıkarken attığınız her adımda kalpleriniz hep bir atsın. Harika bir ömür dilerim! 🤍",
    "Gözlerinizdeki mutluluk ışığı hiç sönmesin, en güzel masallar sizinle olsun. Tebrikler! 🥂",
    "Birlikteliğiniz bir ömür boyu sevgiyle, saygıyla ve neşeyle dolsun. Harikasınız! 💍",
    "Yüzünüzdeki gülümseme ve kalbinizdeki sevgi hiç eksilmesin. Masal gibi bir hayat dilerim!"
  ];

  const generateAIMessage = () => {
    if (isGeneratingAI) return;
    setIsGeneratingAI(true);
    setNoteText("");
    
    const randomTemplate = aiTemplates[Math.floor(Math.random() * aiTemplates.length)];
    const senderName = name.trim() ? `\n\nSevgiler,\n${name.trim()}` : "";
    const fullMsg = `Sevgili Nesrin ve Ahmet,\n\n${randomTemplate}${senderName}`;
    
    let i = 0;
    const interval = setInterval(() => {
      setNoteText(fullMsg.substring(0, i + 1));
      i++;
      if (i >= fullMsg.length) {
        clearInterval(interval);
        setIsGeneratingAI(false);
      }
    }, 30);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!choice) {
      setErrorMsg("Devam etmek için bir seçenek belirleyin.");
      return;
    }
    if (!name.trim()) {
      setErrorMsg("Adınızı girin.");
      return;
    }
    if (choice === "yes" && !guestsCount.trim()) {
      setErrorMsg("Lütfen kaç kişi katılacağınızı belirtin.");
      return;
    }
    setErrorMsg("");
    setStatus("submitting");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          attending: choice === "yes",
          allergies: choice === "yes" ? `${guestsCount.trim()} Kişi` : "Katılmıyor",
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");

      // Konfeti yağmuru (Eğer katılıyorsa)
      if (choice === "yes") {
        const duration = 3 * 1000;
        const end = Date.now() + duration;
        const colors = ["#c5a880", "#e3decb", "#ffffff"];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 9999
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 9999
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
    } catch {
      setStatus("error");
      setErrorMsg("Bir hata oluştu. Tekrar deneyin.");
    }
  }

  if (status === "done") {
    // Google Calendar link
    // 2026-07-12 13:00 → 16:00
    const gcStart = "20260712T130000";
    const gcEnd   = "20260712T160000";
    const gcTitle = encodeURIComponent(`Ahmet Burak & Nesrin Nişanı`);
    const gcLocation = encodeURIComponent(inviteConfig.venueAddress);
    const googleCalUrl =
      `https://calendar.google.com/calendar/render?action=TEMPLATE` +
      `&text=${gcTitle}&dates=${gcStart}/${gcEnd}&location=${gcLocation}`;

    // Apple / Outlook Calendar route
    const icsHref = "/api/calendar";

    return (
      <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 text-center">
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

        <div className="relative w-full max-w-sm bg-paper border border-olive-soft/35 px-6 py-14 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center text-center gap-7 luxury-card z-20 animate-[fadeIn_0.8s_ease-out]">
          <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px]" />
          <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

          {/* Check Icon */}
          <div className="z-10 w-14 h-14 rounded-full flex items-center justify-center btn-glow-pulse shadow-[0_0_18px_rgba(197,168,128,0.5)]">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase z-10">Teşekkürler!</h1>
          <p className="font-body text-[1rem] italic text-ink-soft/90 max-w-[17rem] leading-relaxed z-10">
            {choice === "yes" ? (
              <>
                Katılımınız onaylandı.
                <br />
                Sizi görmek için sabırsızlanıyoruz!
              </>
            ) : (
              "Bize bildirdiğiniz için teşekkürler."
            )}
          </p>

          {/* Calendar Buttons — only if attending */}
          {choice === "yes" && (
            <div className="z-10 w-full flex flex-col gap-3 pt-1">
              <p className="font-display text-[9px] tracking-[0.22em] uppercase text-ink-soft/60">
                Takvime Ekle
              </p>

              {/* Google Calendar */}
              <a
                href={googleCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full font-display text-[11px] tracking-[0.15em] uppercase text-ink border border-olive-soft/45 rounded-full px-4 py-3 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Google Takvim
              </a>

              {/* Apple Calendar */}
              <a
                href={icsHref}
                download="ahmet-nesrin-nisan.ics"
                className="flex items-center justify-center gap-2.5 w-full font-display text-[11px] tracking-[0.15em] uppercase text-ink border border-olive-soft/45 rounded-full px-4 py-3 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                Apple Takvim / Diğer
              </a>

              {/* Location */}
              <button
                onClick={() => setIsMapModalOpen(true)}
                type="button"
                className="flex items-center justify-center gap-2.5 w-full font-display text-[11px] tracking-[0.15em] uppercase text-ink border border-olive-soft/45 rounded-full px-4 py-3 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300 cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-7.2-7-12a7 7 0 1 1 14 0c0 4.8-7 12-7 12Z" />
                  <circle cx="12" cy="9" r="2.4" />
                </svg>
                Konumu Gör
              </button>
            </div>
          )}

          {/* ─── Guest Note Section ─── */}
          <div className="z-10 w-full">
            {/* Subtle divider */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-olive-soft/25" />
              <span className="font-display text-[8px] tracking-[0.25em] uppercase text-ink-soft/35">not</span>
              <div className="flex-1 h-px bg-olive-soft/25" />
            </div>

            {noteSent ? (
              <div className="flex flex-col items-center gap-2 py-2 animate-[fadeIn_0.6s_ease-out]">
                {/* Heart */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#c5a880" stroke="none">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
                <p className="font-body text-[13px] italic text-ink-soft/70 text-center">
                  Notunuz iletildi, teşekkürler 💌
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="font-body text-[12.5px] italic text-ink-soft/65 leading-relaxed">
                    Dilerseniz, bu mutlu günümüz için bir not bırakabilirsiniz
                  </p>
                  <button
                    onClick={generateAIMessage}
                    disabled={isGeneratingAI}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-[#c5a880]/10 border border-[#c5a880]/25 hover:bg-[#c5a880]/20 rounded-full font-display text-[9px] tracking-wider uppercase text-[#c5a880] transition-colors disabled:opacity-60 cursor-pointer shadow-sm"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
                    {isGeneratingAI ? "Yazılıyor..." : "Yapay Zeka"}
                  </button>
                </div>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  readOnly={isGeneratingAI}
                  maxLength={400}
                  rows={3}
                  placeholder="Güzel bir şey yazın…"
                  className="w-full font-body text-[13px] italic text-ink bg-transparent border border-olive-soft/25 rounded-[4px] px-4 py-3 focus:border-[#c5a880] outline-none resize-none placeholder:text-ink-soft/30 transition-colors duration-300 leading-relaxed"
                />
                {noteText.trim().length > 0 && !isGeneratingAI && (
                  <button
                    onClick={async () => {
                      if (!noteText.trim() || noteSending) return;
                      setNoteSending(true);
                      try {
                        await fetch("/api/note", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ name, message: noteText }),
                        });
                        setNoteSent(true);
                      } catch {
                        setNoteSent(true); // Fail silently, don't distress the guest
                      } finally {
                        setNoteSending(false);
                      }
                    }}
                    disabled={noteSending}
                    className="self-end flex items-center gap-1.5 font-display text-[9px] tracking-[0.18em] uppercase text-[#c5a880] border border-[#c5a880]/35 rounded-full px-4 py-2 hover:bg-[#c5a880]/10 transition-colors duration-300 disabled:opacity-50 cursor-pointer animate-[fadeIn_0.4s_ease-out]"
                  >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                    {noteSending ? "Gönderiliyor…" : "Gönder"}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Closing message */}
          <p className="z-10 font-display text-[13px] tracking-[0.28em] uppercase text-[#c5a880]">
            ✦ Görüşmek Üzere ✦
          </p>

          <Link
            href="/invite"
            className="font-display text-[10px] tracking-[0.16em] uppercase text-ink-soft/50 hover:text-ink transition-colors duration-300 z-10"
          >
            Davetiyeye dön
          </Link>
        </div>

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
              
              <a href={inviteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" onClick={() => setIsMapModalOpen(false)} className="w-full py-3 px-4 border border-olive-soft/30 rounded text-[13px] font-body italic text-ink hover:bg-olive hover:text-cream transition-colors duration-300 flex items-center justify-between group">
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
      </main>
    );
  }

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* Floating bubbles */}
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative w-full max-w-sm sm:max-w-md bg-paper border border-olive-soft/35 px-6 py-12 sm:px-10 sm:py-16 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center animate-[fadeIn_0.7s_ease-out] luxury-card z-20">
        
        {/* Double Border Frame */}
        <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px]" />
        <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

        <form
          onSubmit={handleSubmit}
          className="relative w-full flex flex-col items-center text-center gap-8 z-10"
        >
          <h1 className="font-display text-xl sm:text-2xl text-ink tracking-[0.05em] uppercase leading-relaxed max-w-[18rem] sm:max-w-[22rem]">
            Katılım Sağlamayı Düşünüyor musunuz?
          </h1>

          <div className="flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => setChoice("yes")}
              className={`w-20 h-20 rounded-full font-body text-[1.1rem] tracking-wide transition-all duration-300 ease-out border cursor-pointer ${
                choice === "yes"
                  ? "bg-olive text-cream border-olive shadow-[0_4px_14px_rgba(197,168,128,0.35)] scale-105"
                  : "bg-transparent text-ink-soft border-line hover:border-olive"
              }`}
            >
              Evet
            </button>
            <button
              type="button"
              onClick={() => setChoice("no")}
              className={`w-20 h-20 rounded-full font-body text-[1.1rem] tracking-wide transition-all duration-300 ease-out border cursor-pointer ${
                choice === "no"
                  ? "bg-olive text-cream border-olive shadow-[0_4px_14px_rgba(197,168,128,0.35)] scale-105"
                  : "bg-transparent text-ink-soft border-line hover:border-olive"
              }`}
            >
              Hayır
            </button>
          </div>



          <div className="w-full flex flex-col gap-5 text-left pt-2">
            <label className="flex flex-col gap-2">
              <span className="font-display text-[10px] tracking-[0.15em] uppercase text-ink-soft">
                Ad ve soyad
              </span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Adınız"
                className="font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 placeholder:text-ink-soft/40 transition-colors duration-300"
              />
            </label>

            {choice === "yes" && (
              <label className="flex flex-col gap-2 animate-[fadeInField_0.4s_ease-out]">
                <span className="font-display text-[10px] tracking-[0.15em] uppercase text-ink-soft">
                  Kaç kişi katılmayı düşünüyorsunuz?
                </span>
                <input
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(e.target.value)}
                  type="text"
                  placeholder="Kişi sayısı yazınız (örneğin: 2)"
                  className="font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 placeholder:text-ink-soft/40 transition-colors duration-300"
                />
              </label>
            )}
          </div>

          {errorMsg && (
            <p className="font-body text-sm text-[#a85c4a]">{errorMsg}</p>
          )}

          <div className="w-full flex flex-col gap-3 pt-4">
            <button
              type="submit"
              disabled={status === "submitting"}
            className="w-full font-display text-[12px] tracking-[0.18em] uppercase bg-olive text-cream rounded-full px-6 py-4 hover:bg-olive-deep transition-colors duration-300 disabled:opacity-60 cursor-pointer shadow-[0_4px_14px_rgba(197,168,128,0.2)] btn-glow-pulse flex items-center justify-center gap-2"
          >
            {status === "submitting" ? (
              "Gönderiliyor…"
            ) : choice === "yes" ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                Onayla ve Takvime Ekle
              </>
            ) : (
              "Onayla"
            )}
          </button>
          </div>

          <Link
            href="/invite"
            className="font-display text-[11px] tracking-[0.16em] uppercase text-ink-soft border border-line rounded-full px-6 py-3 hover:border-olive transition-colors duration-300"
          >
            Davetiyeye dön
          </Link>
        </form>
      </div>

      <style>{`
        @keyframes fadeInField {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center z-20">
        <p className="font-display text-[10px] tracking-widest text-ink-soft/60">
          COPYRIGHT 2026 | DESIGN BY ALPEREN TAĞMAN.
        </p>
      </div>
    </main>
  );
}
