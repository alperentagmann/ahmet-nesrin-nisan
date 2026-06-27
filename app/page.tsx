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
      {/* paper texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #2c2b25 1px, transparent 0)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* the sash, split open on click */}
      <div className="relative w-full max-w-md aspect-[3/4] flex items-center justify-center">
        <div
          className={`absolute left-0 w-full h-[34%] top-1/2 -translate-y-1/2 bg-olive-soft/70 transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening ? "-translate-x-[120%] -rotate-2" : ""
          }`}
          style={{ transformOrigin: "left center" }}
        />
        <div
          className={`absolute right-0 w-full h-[34%] top-1/2 -translate-y-1/2 bg-olive-soft/70 transition-transform duration-[650ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
            opening ? "translate-x-[120%] rotate-2" : ""
          }`}
          style={{ transformOrigin: "right center" }}
        />

        <button
          onClick={handleOpen}
          aria-label="Davetiyeyi aç"
          className={`relative z-10 flex flex-col items-center gap-5 transition-all duration-500 ease-out cursor-pointer group ${
            opening ? "opacity-0 scale-90" : "opacity-100"
          }`}
        >
          <span className="font-body text-[13px] tracking-[0.18em] uppercase text-ink-soft">
            Davetiyeyi açmak için
          </span>

          <span className="transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95 drop-shadow-[0_6px_14px_rgba(60,60,40,0.25)]">
            <WaxSeal size={132} />
          </span>

          <span className="font-body text-[13px] tracking-[0.18em] uppercase text-ink-soft">
            Buraya Tıklayınız.
          </span>
        </button>
      </div>
    </main>
  );
}
