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
    return (
      <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 text-center">
        {/* paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="relative w-full max-w-sm bg-paper border border-olive-soft/35 px-6 py-14 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center text-center gap-6">
          <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px]" />
          <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

          <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase z-10">Teşekkürler!</h1>
          <p className="font-body text-[1.1rem] italic text-ink-soft/90 max-w-xs z-10">
            {choice === "yes"
              ? "Katılımınız onaylandı. Sizi görmek için sabırsızlanıyoruz!"
              : "Bize bildirdiğiniz için teşekkürler."}
          </p>
          <Link
            href="/invite"
            className="font-display text-[11px] tracking-[0.16em] uppercase text-olive-deep border border-olive-soft/45 rounded-full px-6 py-3 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300 z-10"
          >
            Davetiyeye dön
          </Link>
        </div>
      </main>
    );
  }

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

      <div className="relative w-full max-w-sm sm:max-w-md bg-paper border border-olive-soft/35 px-6 py-12 sm:px-10 sm:py-16 shadow-[0_16px_40px_rgba(28,26,23,0.03)] rounded-[3px] flex flex-col items-center animate-[fadeIn_0.7s_ease-out]">
        
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
            className="w-full font-display text-[12px] tracking-[0.18em] uppercase bg-olive text-cream rounded-full px-6 py-4 hover:bg-olive-deep transition-colors duration-300 disabled:opacity-60 cursor-pointer shadow-[0_4px_14px_rgba(197,168,128,0.2)]"
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
