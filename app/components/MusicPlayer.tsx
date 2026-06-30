"use client";

import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.4; // Hafif bir ses seviyesi

    const handleStartMusic = () => {
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Otomatik oynatma engellendi:", err);
      });
    };

    window.addEventListener('start-music', handleStartMusic);
    
    // Play olayını dinleyerek state'i güncelle
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      window.removeEventListener('start-music', handleStartMusic);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  if (!isReady) return null;

  return (
    <>
      {/* Sesi barındıran gizli element */}
      <audio ref={audioRef} src="/music.mp3" loop preload="auto" />

      {/* Ekranın köşesinde duracak şık bir Müzik butonu */}
      <button 
        onClick={togglePlay}
        className="fixed top-4 right-4 z-[999] w-10 h-10 flex items-center justify-center rounded-full bg-paper/60 backdrop-blur-md border border-olive-soft/30 text-olive-deep shadow-sm transition-all hover:bg-paper/90 hover:scale-105"
        aria-label="Müziği aç/kapat"
      >
        {isPlaying ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </button>
    </>
  );
}
