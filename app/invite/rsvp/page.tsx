"use client";

import { useState } from "react";
import Link from "next/link";
import { inviteConfig } from "@/lib/invite-config";

type Choice = "yes" | "no" | null;
type Status = "idle" | "submitting" | "done" | "error";

export default function RsvpPage() {
  const [choice, setChoice] = useState<Choice>(null);
  const [name, setName] = useState("");
  const [allergies, setAllergies] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!choice) {
      setErrorMsg("Devam etmek için Evet veya Hayır seçin.");
      return;
    }
    if (!name.trim()) {
      setErrorMsg("Adınızı girin.");
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
          allergies,
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
      <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-16 text-center gap-6">
        <h1 className="font-display text-3xl text-ink">Teşekkürler!</h1>
        <p className="font-body text-lg text-ink-soft max-w-xs">
          {choice === "yes"
            ? "Katılımınız onaylandı. Sizi görmek için sabırsızlanıyoruz!"
            : "Bize bildirdiğiniz için teşekkürler."}
        </p>
        <Link
          href="/invite"
          className="font-body text-[12px] tracking-[0.14em] uppercase text-olive-deep border border-line rounded-full px-6 py-3 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300"
        >
          Davetiyeye dön
        </Link>
      </main>
    );
  }

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

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-sm flex flex-col items-center text-center gap-8"
      >
        <h1 className="font-display text-3xl text-ink">Orada olacak mısın?</h1>

        <div className="flex items-center justify-center gap-8">
          <button
            type="button"
            onClick={() => setChoice("yes")}
            className={`w-20 h-20 rounded-full font-body text-lg tracking-wide transition-all duration-300 ease-out border ${
              choice === "yes"
                ? "bg-olive text-cream border-olive shadow-[0_4px_14px_rgba(95,99,71,0.35)] scale-105"
                : "bg-transparent text-ink-soft border-line hover:border-olive"
            }`}
          >
            Evet
          </button>
          <button
            type="button"
            onClick={() => setChoice("no")}
            className={`w-20 h-20 rounded-full font-body text-lg tracking-wide transition-all duration-300 ease-out border ${
              choice === "no"
                ? "bg-olive text-cream border-olive shadow-[0_4px_14px_rgba(95,99,71,0.35)] scale-105"
                : "bg-transparent text-ink-soft border-line hover:border-olive"
            }`}
          >
            Hayır
          </button>
        </div>

        <p className="font-body text-[0.98rem] text-ink-soft leading-relaxed">
          Düğün Tarihine Kadar Katılım Durumunuzu Bildiriniz
        </p>

        <div className="w-full flex flex-col gap-4 text-left">
          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[12px] tracking-[0.12em] uppercase text-ink-soft">
              Ad ve soyad
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Adınız"
              className="font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 placeholder:text-ink-soft/50 transition-colors duration-300"
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="font-body text-[12px] tracking-[0.12em] uppercase text-ink-soft leading-relaxed">
              Onay sırasında varsa alerji veya gıda intoleranslarınızı bize bildirin
            </span>
            <input
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              type="text"
              placeholder="Yok / buraya yazın"
              className="font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 placeholder:text-ink-soft/50 transition-colors duration-300"
            />
          </label>
        </div>

        {errorMsg && (
          <p className="font-body text-sm text-[#a85c4a]">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full font-body text-[13px] tracking-[0.16em] uppercase bg-olive text-cream rounded-full px-6 py-4 hover:bg-olive-deep transition-colors duration-300 disabled:opacity-60"
        >
          {status === "submitting" ? "Gönderiliyor…" : "Onayla"}
        </button>

        <Link
          href="/invite"
          className="font-body text-[12px] tracking-[0.14em] uppercase text-ink-soft border border-line rounded-full px-6 py-3 hover:border-olive transition-colors duration-300"
        >
          Davetiyeye dön
        </Link>
      </form>
    </main>
  );
}
