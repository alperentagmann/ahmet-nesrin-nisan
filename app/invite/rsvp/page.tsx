"use client";

import { useState } from "react";
import Link from "next/link";
import { inviteConfig } from "@/lib/invite-config";

type Choice = "yes" | "no" | null;
type Status = "idle" | "submitting" | "done" | "error";

export default function RsvpPage() {
  const [choice, setChoice] = useState<Choice>(null);
  const [name, setName] = useState("");
  const [guestsCount, setGuestsCount] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

    // Apple / iCal data URI
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      "DTSTART:20260712T100000Z",   // UTC (13:00 TR = 10:00 UTC)
      "DTEND:20260712T130000Z",
      `SUMMARY:Ahmet Burak & Nesrin Nişanı`,
      `LOCATION:${inviteConfig.venueAddress}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    const icsHref = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

    return (
      <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 text-center">
        {/* Floating particles */}
        <div className="particle-layer">
          <div className="particle w-1.5 h-1.5 left-[10%]" style={{ animationDelay: "0.5s", animationDuration: "13s" }} />
          <div className="particle w-1 h-1 left-[25%]" style={{ animationDelay: "2.5s", animationDuration: "11s" }} />
          <div className="particle w-2 h-2 left-[50%]" style={{ animationDelay: "1.5s", animationDuration: "15s" }} />
          <div className="particle w-1.5 h-1.5 left-[75%]" style={{ animationDelay: "4.5s", animationDuration: "12s" }} />
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
            {choice === "yes"
              ? "Katılımınız onaylandı. Sizi görmek için sabırsızlanıyoruz!"
              : "Bize bildirdiğiniz için teşekkürler."}
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
            </div>
          )}

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
      </main>
    );
  }

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* Floating particles */}
      <div className="particle-layer">
        <div className="particle w-1.5 h-1.5 left-[10%]" style={{ animationDelay: "0.5s", animationDuration: "13s" }} />
        <div className="particle w-1 h-1 left-[25%]" style={{ animationDelay: "2.5s", animationDuration: "11s" }} />
        <div className="particle w-2 h-2 left-[50%]" style={{ animationDelay: "1.5s", animationDuration: "15s" }} />
        <div className="particle w-1.5 h-1.5 left-[75%]" style={{ animationDelay: "4.5s", animationDuration: "12s" }} />
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

          <p className="font-body text-[0.95rem] italic text-ink-soft/90 leading-relaxed max-w-[16rem]">
            Nişan Tarihine Kadar Katılım Durumunuzu Bildiriniz
          </p>

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

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full font-display text-[12px] tracking-[0.18em] uppercase bg-olive text-cream rounded-full px-6 py-4 hover:bg-olive-deep transition-colors duration-300 disabled:opacity-60 cursor-pointer shadow-[0_4px_14px_rgba(197,168,128,0.2)] btn-glow-pulse"
          >
            {status === "submitting" ? "Gönderiliyor…" : "Onayla"}
          </button>

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
    </main>
  );
}
