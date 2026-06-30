"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) return <div className="h-[90px] w-full" />; // Prevents hydration mismatch and layout shift

  return (
    <div className="flex flex-col items-center gap-1.5 w-full max-w-[220px] py-2 px-3 relative z-10 animate-[fadeIn_1s_ease-out] border border-olive-soft/35 rounded-[2px] bg-paper/50 backdrop-blur-[2px] shadow-[0_4px_12px_rgba(28,26,23,0.02)]">
      <div className="flex items-center gap-2 w-full justify-center">
        <div className="w-6 h-px bg-olive-soft/25" />
        <span className="font-display text-[7.5px] tracking-[0.25em] uppercase text-ink-soft/50">Nişana Kalan Zaman</span>
        <div className="w-6 h-px bg-olive-soft/25" />
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 text-olive-deep pt-1">
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="font-display text-lg sm:text-xl leading-none">{timeLeft.days}</span>
          <span className="font-display text-[7px] tracking-[0.2em] uppercase text-ink-soft/60 mt-1">Gün</span>
        </div>
        <span className="text-xs sm:text-sm text-olive-soft/50 font-light mb-2">:</span>
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="font-display text-lg sm:text-xl leading-none">{timeLeft.hours}</span>
          <span className="font-display text-[7px] tracking-[0.2em] uppercase text-ink-soft/60 mt-1">Saat</span>
        </div>
        <span className="text-xs sm:text-sm text-olive-soft/50 font-light mb-2">:</span>
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="font-display text-lg sm:text-xl leading-none">{timeLeft.minutes}</span>
          <span className="font-display text-[7px] tracking-[0.2em] uppercase text-ink-soft/60 mt-1">Dakika</span>
        </div>
        <span className="text-xs sm:text-sm text-olive-soft/50 font-light mb-2">:</span>
        <div className="flex flex-col items-center min-w-[36px]">
          <span className="font-display text-lg sm:text-xl leading-none">{timeLeft.seconds}</span>
          <span className="font-display text-[7px] tracking-[0.2em] uppercase text-ink-soft/60 mt-1">Saniye</span>
        </div>
      </div>
    </div>
  );
}
