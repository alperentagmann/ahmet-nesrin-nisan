"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import WaxSeal from "./components/WaxSeal";

export default function Home() {
  const router = useRouter();
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    
    // Müziği başlat
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event('start-music'));
    }

    setTimeout(() => {
      router.push("/invite");
    }, 650);
  }

  return (
    <main className="relative flex-1 min-h-screen overflow-hidden bg-cream flex items-center justify-center">
      {/* Floating bubbles — karta daha yakın ve daha hızlı */}
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply z-10"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* The sash — spans the full width */}
      <div
        className={`absolute left-0 right-0 h-[30%] top-1/2 -translate-y-1/2 bg-cream-deep/80 border-t border-b border-olive-soft/45 shadow-[0_4px_18px_rgba(28,26,23,0.03)] transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          opening ? "-translate-x-[120%] -rotate-1" : ""
        }`}
        style={{ transformOrigin: "left center" }}
      />
      <div
        className={`absolute left-0 right-0 h-[30%] top-1/2 -translate-y-1/2 bg-cream-deep/80 border-t border-b border-olive-soft/45 shadow-[0_4px_18px_rgba(28,26,23,0.03)] transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          opening ? "translate-x-[120%] rotate-1" : ""
        }`}
        style={{ transformOrigin: "right center" }}
      />

      {/* Centre content */}
      <div className="relative z-20 flex flex-col items-center justify-center gap-10 px-6 w-full max-w-2xl">
        {/* Top label */}
        {/* Interactive Clickable Area encompassing labels and seal */}
        <div
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleOpen();
            }
          }}
          aria-label="Davetiyeyi aç"
          className="group flex flex-col items-center justify-center gap-6 cursor-pointer"
        >
          {/* Top label */}
          <div
            className={`flex justify-center transition-all duration-500 ${
              opening ? "opacity-0 -translate-y-4" : "opacity-100"
            }`}
          >
            <p className="font-display text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-ink bg-cream/80 backdrop-blur-sm px-5 py-2 rounded-full border border-olive-soft/25 shadow-[0_2px_12px_rgba(28,26,23,0.06)] group-hover:bg-cream transition-colors duration-300">
              Davetiyeyi açmak için
            </p>
          </div>

          {/* Arrow row and Seal */}
          <div
            className={`flex items-center justify-center gap-6 sm:gap-10 transition-all duration-500 ${
              opening ? "opacity-0 scale-90" : "opacity-100"
            }`}
          >
            {/* Left arrows */}
            <div className="flex items-center gap-1.5" aria-hidden>
              <Arrow delay="0.6s" />
              <Arrow delay="0.3s" />
              <Arrow delay="0s" />
            </div>

            {/* Wax seal */}
            <div className="glow-pulse transition-transform duration-300 ease-out group-hover:scale-108 group-active:scale-95">
              <WaxSeal size={148} />
            </div>

            {/* Right arrows (mirrored) */}
            <div className="flex items-center gap-1.5 rotate-180" aria-hidden>
              <Arrow delay="0.6s" />
              <Arrow delay="0.3s" />
              <Arrow delay="0s" />
            </div>
          </div>

          {/* Bottom label */}
          <div
            className={`flex justify-center transition-all duration-500 ${
              opening ? "opacity-0 translate-y-4" : "opacity-100"
            }`}
          >
            <p className="font-display text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-ink bg-cream/80 backdrop-blur-sm px-5 py-2 rounded-full border border-olive-soft/25 shadow-[0_2px_12px_rgba(28,26,23,0.06)] group-hover:bg-cream transition-colors duration-300">
              Buraya Tıklayınız.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes arrowPulse {
          0%, 100% { opacity: 0.18; transform: translateX(0); }
          50%       { opacity: 0.72; transform: translateX(5px); }
        }
        .arrow-pulse {
          animation: arrowPulse 1.6s ease-in-out infinite;
        }
      `}</style>
    </main>
  );
}

/* Single chevron arrow — pulses with a cascading delay */
function Arrow({ delay }: { delay: string }) {
  return (
    <svg
      className="arrow-pulse"
      style={{ animationDelay: delay }}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c5a880"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}
