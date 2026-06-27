"use client";

import { useState } from "react";
import { inviteConfig } from "@/lib/invite-config";

type Entry = {
  id: string;
  name: string;
  attending: boolean;
  allergies: string;
  createdAt: string;
};

type Summary = {
  total: number;
  attending: number;
  notAttending: number;
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [summary, setSummary] = useState<Summary | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [filter, setFilter] = useState<"all" | "yes" | "no">("all");

  async function fetchData(pwd: string) {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pwd }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Kimlik doğrulama hatası.");
        setLoading(false);
        return;
      }
      setSummary(data.summary);
      setEntries(data.entries);
      setAuthed(true);
    } catch {
      setErrorMsg("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(password);
  }

  function handleRefresh() {
    fetchData(password);
  }

  const filteredEntries = entries.filter((e) => {
    if (filter === "yes") return e.attending;
    if (filter === "no") return !e.attending;
    return true;
  });

  if (!authed) {
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

          <form
            onSubmit={handleLogin}
            className="relative w-full flex flex-col items-center gap-6 text-center z-10"
          >
            <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase">
              {inviteConfig.coupleNames.first} &amp; {inviteConfig.coupleNames.second}
            </h1>
            <p className="font-display text-[10px] tracking-[0.15em] uppercase text-ink-soft">
              Özel alan
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifre"
              className="w-full font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 text-center placeholder:text-ink-soft/40 transition-colors duration-300"
            />
            {errorMsg && (
              <p className="font-body text-sm text-[#a85c4a]">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-display text-[12px] tracking-[0.18em] uppercase bg-olive text-cream rounded-full px-6 py-3.5 hover:bg-olive-deep transition-colors duration-300 disabled:opacity-60 cursor-pointer shadow-[0_4px_14px_rgba(197,168,128,0.2)]"
            >
              {loading ? "Giriş yapılıyor…" : "Giriş yap"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="relative flex-1 min-h-screen bg-cream px-6 py-14 sm:py-20 flex flex-col items-center justify-start">
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="w-full max-w-2xl flex flex-col gap-10 bg-paper border border-olive-soft/35 px-6 py-8 sm:px-10 sm:py-12 shadow-[0_12px_36px_rgba(28,26,23,0.03)] rounded-[3px] relative z-10">
        <div className="absolute inset-2.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />
        
        <div className="flex items-center justify-between z-10">
          <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase">RSVP Yanıtları</h1>
          <button
            onClick={handleRefresh}
            className="font-display text-[10px] tracking-[0.12em] uppercase text-olive-deep border border-olive-soft/45 rounded-full px-4 py-2 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300 cursor-pointer"
          >
            Güncelle
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 z-10">
          <div className="flex flex-col items-center gap-1 rounded-xl border border-olive-soft/30 py-6 bg-cream-deep/20">
            <span className="font-display text-3xl text-ink">
              {summary?.total ?? 0}
            </span>
            <span className="font-display text-[9px] tracking-[0.12em] uppercase text-ink-soft">
              Yanıtlar
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-olive-soft/40 py-6 bg-olive/10">
            <span className="font-display text-3xl text-olive-deep">
              {summary?.attending ?? 0}
            </span>
            <span className="font-display text-[9px] tracking-[0.12em] uppercase text-ink-soft">
              Katılanlar
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-olive-soft/30 py-6 bg-cream-deep/20">
            <span className="font-display text-3xl text-ink-soft">
              {summary?.notAttending ?? 0}
            </span>
            <span className="font-display text-[9px] tracking-[0.12em] uppercase text-ink-soft">
              Katılmayanlar
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-3 z-10">
          {(["all", "yes", "no"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-display text-[10px] tracking-[0.12em] uppercase rounded-full px-4 py-2 border transition-colors duration-300 cursor-pointer ${
                filter === f
                  ? "bg-olive text-cream border-olive"
                  : "text-ink-soft border-line hover:border-olive"
              }`}
            >
              {f === "all" ? "Tümü" : f === "yes" ? "Katılanlar" : "Katılmayanlar"}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-line border-t border-b border-line z-10">
          {filteredEntries.length === 0 && (
            <p className="font-body text-sm text-ink-soft py-8 text-center">
              Bu kategoride yanıt yok.
            </p>
          )}
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="flex flex-col gap-0.5">
                <span className="font-body text-base text-ink">
                  {entry.name}
                </span>
                {entry.allergies && (
                  <span className="font-body text-[13px] text-ink-soft italic">
                    {entry.allergies}
                  </span>
                )}
              </div>
              <span
                className={`font-display text-[9px] tracking-[0.1em] uppercase rounded-full px-3 py-1.5 shrink-0 ${
                  entry.attending
                    ? "bg-olive/15 text-olive-deep"
                    : "bg-ink-soft/10 text-ink-soft"
                }`}
              >
                {entry.attending ? "Evet" : "Hayır"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
