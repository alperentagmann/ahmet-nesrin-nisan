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
    <div className="flex flex-col items-center gap-3.5 w-full py-4 relative z-10 animate-[fadeIn_1s_ease-out]">
      <div className="flex items-center gap-3 w-full justify-center">
        <div className="w-10 h-px bg-olive-soft/35" />
        <span className="font-display text-[9px] tracking-[0.25em] uppercase text-ink-soft/45">Nişana Kalan Zaman</span>
        <div className="w-10 h-px bg-olive-soft/35" />
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 text-olive-deep">
        <div className="flex flex-col items-center min-w-[50px]">
          <span className="font-display text-2xl sm:text-3xl leading-none">{timeLeft.days}</span>
          <span className="font-display text-[8px] tracking-[0.2em] uppercase text-ink-soft/60 mt-2.5">Gün</span>
        </div>
        <span className="text-lg sm:text-xl text-olive-soft/50 font-light mb-5">:</span>
        <div className="flex flex-col items-center min-w-[50px]">
          <span className="font-display text-2xl sm:text-3xl leading-none">{timeLeft.hours}</span>
          <span className="font-display text-[8px] tracking-[0.2em] uppercase text-ink-soft/60 mt-2.5">Saat</span>
        </div>
        <span className="text-lg sm:text-xl text-olive-soft/50 font-light mb-5">:</span>
        <div className="flex flex-col items-center min-w-[50px]">
          <span className="font-display text-2xl sm:text-3xl leading-none">{timeLeft.minutes}</span>
          <span className="font-display text-[8px] tracking-[0.2em] uppercase text-ink-soft/60 mt-2.5">Dakika</span>
        </div>
        <span className="text-lg sm:text-xl text-olive-soft/50 font-light mb-5">:</span>
        <div className="flex flex-col items-center min-w-[50px]">
          <span className="font-display text-2xl sm:text-3xl leading-none">{timeLeft.seconds}</span>
          <span className="font-display text-[8px] tracking-[0.2em] uppercase text-ink-soft/60 mt-2.5">Saniye</span>
        </div>
      </div>
    </div>
  );
}
