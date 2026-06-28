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
    setTimeout(() => {
      router.push("/invite");
    }, 650);
  }

  return (
    <main className="relative flex-1 min-h-screen overflow-hidden bg-cream flex items-center justify-center">
      {/* Floating bubbles */}
      <div className="particle-layer">
        <div className="particle" style={{ width:7,  height:7,  left:"3%",  animationDelay:"0s",    animationDuration:"15s" }} />
        <div className="particle" style={{ width:14, height:14, left:"9%",  animationDelay:"6s",    animationDuration:"19s" }} />
        <div className="particle" style={{ width:5,  height:5,  left:"15%", animationDelay:"2s",    animationDuration:"13s" }} />
        <div className="particle" style={{ width:18, height:18, left:"22%", animationDelay:"9s",    animationDuration:"22s" }} />
        <div className="particle" style={{ width:8,  height:8,  left:"30%", animationDelay:"3.5s",  animationDuration:"16s" }} />
        <div className="particle" style={{ width:6,  height:6,  left:"38%", animationDelay:"11s",   animationDuration:"14s" }} />
        <div className="particle" style={{ width:20, height:20, left:"45%", animationDelay:"1s",    animationDuration:"24s" }} />
        <div className="particle" style={{ width:9,  height:9,  left:"53%", animationDelay:"7.5s",  animationDuration:"17s" }} />
        <div className="particle" style={{ width:5,  height:5,  left:"60%", animationDelay:"4s",    animationDuration:"13s" }} />
        <div className="particle" style={{ width:15, height:15, left:"67%", animationDelay:"0.5s",  animationDuration:"20s" }} />
        <div className="particle" style={{ width:7,  height:7,  left:"73%", animationDelay:"12s",   animationDuration:"16s" }} />
        <div className="particle" style={{ width:11, height:11, left:"80%", animationDelay:"5s",    animationDuration:"18s" }} />
        <div className="particle" style={{ width:6,  height:6,  left:"86%", animationDelay:"8s",    animationDuration:"14s" }} />
        <div className="particle" style={{ width:16, height:16, left:"91%", animationDelay:"2.5s",  animationDuration:"21s" }} />
        <div className="particle" style={{ width:8,  height:8,  left:"96%", animationDelay:"10s",   animationDuration:"15s" }} />
      </div>

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
        <div
          className={`flex justify-center transition-all duration-500 ${
            opening ? "opacity-0 -translate-y-4" : "opacity-100"
          }`}
        >
          <p className="font-display text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-ink bg-cream/80 backdrop-blur-sm px-5 py-2 rounded-full border border-olive-soft/25 shadow-[0_2px_12px_rgba(28,26,23,0.06)]">
            Davetiyeyi açmak için
          </p>
        </div>

        {/* Arrow row */}
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

          {/* Wax seal button */}
          <button
            onClick={handleOpen}
            aria-label="Davetiyeyi aç"
            className="glow-pulse transition-transform duration-300 ease-out hover:scale-108 active:scale-95 cursor-pointer"
          >
            <WaxSeal size={148} />
          </button>

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
          <p className="font-display text-[11px] sm:text-[12px] tracking-[0.35em] uppercase text-ink bg-cream/80 backdrop-blur-sm px-5 py-2 rounded-full border border-olive-soft/25 shadow-[0_2px_12px_rgba(28,26,23,0.06)]">
            Buraya Tıklayınız.
          </p>
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
