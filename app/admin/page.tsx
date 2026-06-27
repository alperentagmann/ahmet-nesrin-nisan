"use client";

import { useState, useMemo } from "react";
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
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  async function fetchData(pwd: string, isRefresh = false) {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
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
        return;
      }
      setSummary(data.summary);
      setEntries(data.entries);
      setAuthed(true);
    } catch {
      setErrorMsg("Bir hata oluştu. Tekrar deneyin.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    fetchData(password);
  }

  function handleLogout() {
    setAuthed(false);
    setPassword("");
    setSummary(null);
    setEntries([]);
    setSearch("");
    setFilter("all");
  }

  // Total expected guests (sum of kişi sayısı from allergies field)
  const totalGuests = useMemo(() => {
    return entries
      .filter((e) => e.attending)
      .reduce((acc, e) => {
        const match = e.allergies?.match(/^(\d+)\s*Kişi/i);
        return acc + (match ? parseInt(match[1], 10) : 1);
      }, 0);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries
      .filter((e) => {
        if (filter === "yes") return e.attending;
        if (filter === "no") return !e.attending;
        return true;
      })
      .filter((e) =>
        search.trim() === "" ? true : e.name.toLowerCase().includes(search.toLowerCase())
      );
  }, [entries, filter, search]);

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleString("tr-TR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  }

  /* ─── Login Screen ─── */
  if (!authed) {
    return (
      <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 text-center">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
            backgroundSize: "4px 4px",
          }}
        />

        <div className="relative w-full max-w-sm bg-paper border border-olive-soft/35 px-8 py-14 shadow-[0_16px_40px_rgba(28,26,23,0.06)] rounded-[3px] flex flex-col items-center text-center gap-8 luxury-card">
          <div className="absolute inset-2.5 border border-olive-soft/35 pointer-events-none rounded-[1px]" />
          <div className="absolute inset-3.5 border border-olive-soft/15 pointer-events-none rounded-[1px]" />

          {/* Lock icon */}
          <div className="z-10 w-14 h-14 rounded-full btn-glow-pulse flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          <form onSubmit={handleLogin} className="relative w-full flex flex-col items-center gap-6 text-center z-10">
            <div className="flex flex-col gap-1">
              <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase">
                {inviteConfig.coupleNames.first} & {inviteConfig.coupleNames.second}
              </h1>
              <p className="font-display text-[9px] tracking-[0.2em] uppercase text-ink-soft/60">
                Yönetim Paneli
              </p>
            </div>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Şifrenizi girin"
              className="w-full font-body text-base bg-transparent border-b border-line focus:border-olive outline-none py-2 text-center placeholder:text-ink-soft/40 transition-colors duration-300"
            />

            {errorMsg && (
              <p className="font-body text-sm text-[#a85c4a]">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full font-display text-[12px] tracking-[0.18em] uppercase btn-glow-pulse text-white rounded-full px-6 py-4 transition-colors duration-300 disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Giriş yapılıyor…" : "Giriş Yap"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  /* ─── Dashboard ─── */
  return (
    <main className="relative flex-1 min-h-screen bg-cream px-4 py-10 sm:px-8 sm:py-14 flex flex-col items-center">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025] mix-blend-multiply z-0"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />
      <div className="particle-layer">
        <div className="particle w-1 h-1 left-[8%]" style={{ animationDelay: "1s", animationDuration: "14s" }} />
        <div className="particle w-1.5 h-1.5 left-[60%]" style={{ animationDelay: "3s", animationDuration: "11s" }} />
        <div className="particle w-1 h-1 left-[85%]" style={{ animationDelay: "5s", animationDuration: "16s" }} />
      </div>

      <div className="relative w-full max-w-2xl flex flex-col gap-8 z-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-ink tracking-[0.05em] uppercase">
              Yönetim Paneli
            </h1>
            <p className="font-display text-[9px] tracking-[0.18em] uppercase text-[#c5a880] mt-0.5">
              {inviteConfig.coupleNames.first} & {inviteConfig.coupleNames.second} · Nişan
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchData(password, true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 font-display text-[9px] tracking-[0.12em] uppercase text-ink-soft border border-olive-soft/40 rounded-full px-4 py-2 hover:bg-olive hover:text-cream hover:border-olive transition-colors duration-300 cursor-pointer disabled:opacity-50"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={refreshing ? "animate-spin" : ""}>
                <polyline points="23 4 23 10 17 10"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              {refreshing ? "…" : "Yenile"}
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 font-display text-[9px] tracking-[0.12em] uppercase text-ink-soft border border-olive-soft/40 rounded-full px-4 py-2 hover:bg-[#a85c4a] hover:text-cream hover:border-[#a85c4a] transition-colors duration-300 cursor-pointer"
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Çıkış
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Toplam Yanıt", value: summary?.total ?? 0, color: "text-ink" },
            { label: "Katılıyor", value: summary?.attending ?? 0, color: "text-olive-deep" },
            { label: "Katılmıyor", value: summary?.notAttending ?? 0, color: "text-ink-soft" },
            { label: "Beklenen Kişi", value: totalGuests, color: "text-[#c5a880]" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1.5 bg-paper border border-olive-soft/30 rounded-[3px] py-5 px-2 shadow-[0_4px_16px_rgba(28,26,23,0.03)]"
            >
              <span className={`font-display text-3xl ${color}`}>{value}</span>
              <span className="font-display text-[8px] tracking-[0.12em] uppercase text-ink-soft/70 text-center leading-tight">{label}</span>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="bg-paper border border-olive-soft/30 rounded-[3px] px-5 py-5 flex flex-col gap-4 shadow-[0_4px_16px_rgba(28,26,23,0.03)]">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/40 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="İsme göre ara…"
              className="w-full pl-9 pr-4 py-2.5 font-body text-sm bg-cream border border-line rounded-full focus:border-olive outline-none placeholder:text-ink-soft/40 transition-colors duration-300"
            />
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-2">
            {(["all", "yes", "no"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-display text-[9px] tracking-[0.12em] uppercase rounded-full px-4 py-2 border transition-colors duration-300 cursor-pointer ${
                  filter === f
                    ? "bg-olive text-cream border-olive"
                    : "text-ink-soft border-line hover:border-olive"
                }`}
              >
                {f === "all" ? `Tümü (${entries.length})` : f === "yes" ? `Katılanlar (${summary?.attending ?? 0})` : `Katılmayanlar (${summary?.notAttending ?? 0})`}
              </button>
            ))}
          </div>
        </div>

        {/* Entries List */}
        <div className="bg-paper border border-olive-soft/30 rounded-[3px] shadow-[0_4px_16px_rgba(28,26,23,0.03)] overflow-hidden">
          <div className="px-5 py-3.5 border-b border-line flex items-center justify-between">
            <span className="font-display text-[9px] tracking-[0.18em] uppercase text-ink-soft">
              {filteredEntries.length} kayıt
            </span>
          </div>

          {filteredEntries.length === 0 ? (
            <p className="font-body text-sm text-ink-soft/60 py-12 text-center italic">
              Bu kategoride yanıt bulunamadı.
            </p>
          ) : (
            <div className="divide-y divide-line/60">
              {filteredEntries.map((entry, i) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-cream/60 transition-colors duration-200"
                >
                  {/* Index + Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-display text-[10px] text-ink-soft/40 shrink-0 w-5 text-right">
                      {i + 1}
                    </span>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-body text-[15px] text-ink truncate">{entry.name}</span>
                      <div className="flex items-center gap-2 flex-wrap">
                        {entry.allergies && (
                          <span className="font-body text-[11px] text-ink-soft/60 italic">
                            {entry.allergies}
                          </span>
                        )}
                        <span className="font-display text-[9px] tracking-[0.1em] uppercase text-ink-soft/40">
                          {formatDate(entry.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`font-display text-[9px] tracking-[0.1em] uppercase rounded-full px-3 py-1.5 shrink-0 ${
                      entry.attending
                        ? "bg-olive/15 text-olive-deep"
                        : "bg-ink-soft/10 text-ink-soft"
                    }`}
                  >
                    {entry.attending ? "✓ Katılıyor" : "✗ Katılmıyor"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center font-display text-[8px] tracking-[0.18em] uppercase text-ink-soft/30 pb-4">
          ✦ Ahmet Burak & Nesrin · {inviteConfig.dateLabel} ✦
        </p>
      </div>
    </main>
  );
}
