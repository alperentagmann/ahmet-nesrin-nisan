"use client";

import { useState } from "react";
import Link from "next/link";

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="-mt-[2px]">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
      <circle cx="12" cy="13" r="3"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M5 12.5 9.5 17 19 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FotoPage() {
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadedCount, setUploadedCount] = useState(0);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setPhotoFiles(files);
      setUploadSuccess(false);
      setUploadError("");
      setUploadedCount(0);
    }
  };

  const handlePhotoUpload = async () => {
    if (photoFiles.length === 0) return;
    setIsUploading(true);
    setUploadError("");
    setUploadedCount(0);
    
    let successCount = 0;
    try {
      for (const file of photoFiles) {
        const formData = new FormData();
        formData.append("file", file);
        
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        
        if (!res.ok) throw new Error("Hata");
        successCount++;
        setUploadedCount(successCount);
      }
      
      setUploadSuccess(true);
      setPhotoFiles([]);
    } catch (err) {
      setUploadError(`${successCount} fotoğraf yüklendi ancak kalanı tamamlanamadı. Yeniden deneyebilirsiniz.`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="relative flex-1 min-h-screen bg-cream flex flex-col items-center justify-center px-4 py-12 sm:py-20">
      {/* Background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-multiply z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--ink) 1.5px, transparent 0)",
          backgroundSize: "4px 4px",
        }}
      />

      <div className="relative w-full max-w-[360px] bg-paper border border-olive-soft/40 p-8 rounded-[4px] shadow-2xl flex flex-col items-center gap-6 text-center z-20 animate-[fadeIn_0.5s_ease-out]">
        
        <div className="flex flex-col gap-2 items-center">
          <div className="w-14 h-14 rounded-full bg-olive/10 flex items-center justify-center text-olive mb-2">
            <CameraIcon />
          </div>
          <h1 className="font-display text-[18px] tracking-[0.08em] text-ink uppercase">
            Anılarınızı Paylaşın
          </h1>
          <p className="font-body text-[14px] text-ink-soft/90 italic leading-snug">
            Bizimle bu özel günü ölümsüzleştirmek için çektiğiniz harika kareleri yükleyebilirsiniz.
          </p>
        </div>
        
        <div className="flex flex-col gap-3 w-full mt-4">
          {uploadSuccess ? (
            <div className="flex flex-col items-center gap-4 py-4 animate-[fadeIn_0.4s_ease-out]">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 mb-2">
                <CheckIcon />
              </div>
              <p className="font-display text-[14px] tracking-wider text-green-700 uppercase font-semibold">
                Başarıyla Yüklendi!
              </p>
              <p className="font-body text-[14px] italic text-ink-soft">
                Güzel anınızı paylaştığınız için teşekkürler.
              </p>
              <button 
                onClick={() => setUploadSuccess(false)}
                className="mt-4 text-[12px] font-display uppercase tracking-widest text-olive hover:text-olive-deep underline decoration-olive/30 underline-offset-4 cursor-pointer"
              >
                Başka Fotoğraf Yükle
              </button>
            </div>
          ) : photoFiles.length > 0 ? (
            <div className="flex flex-col gap-5 w-full items-center animate-[fadeIn_0.4s_ease-out]">
              <div className="relative w-full aspect-video rounded overflow-hidden border border-olive-soft/30 bg-ink/5 flex flex-col items-center justify-center p-4">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-olive mb-3 opacity-50"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <p className="font-display text-[15px] text-ink">{photoFiles.length} fotoğraf seçildi</p>
                
                {isUploading && (
                  <div className="absolute inset-0 bg-paper/85 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <div className="w-10 h-10 border-2 border-olive border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-display text-[12px] uppercase tracking-wider text-olive-deep font-semibold">
                      Yükleniyor... ({uploadedCount}/{photoFiles.length})
                    </p>
                  </div>
                )}
              </div>
              
              {uploadError && <p className="text-[13px] text-red-500 font-body text-center">{uploadError}</p>}
              
              <div className="flex gap-3 w-full mt-2">
                <button 
                  onClick={() => setPhotoFiles([])}
                  disabled={isUploading}
                  className="flex-1 py-4 px-4 border border-olive-soft/40 text-ink rounded-[3px] text-[12px] font-display uppercase tracking-[0.15em] hover:bg-olive/5 transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                >
                  İptal
                </button>
                <button 
                  onClick={handlePhotoUpload}
                  disabled={isUploading}
                  className="flex-1 py-4 px-4 bg-olive text-cream rounded-[3px] text-[12px] font-display uppercase tracking-[0.15em] hover:bg-olive-deep transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                >
                  {isUploading ? "Yükleniyor..." : "Yükle"}
                </button>
              </div>
            </div>
          ) : (
            <label className="w-full py-8 px-4 border-2 border-dashed border-olive-soft/60 rounded-[4px] bg-olive/5 hover:bg-olive/10 transition-colors duration-300 flex flex-col items-center justify-center gap-3 cursor-pointer min-h-[180px] group">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-olive group-hover:scale-110 transition-transform">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className="font-display text-[13px] tracking-[0.15em] uppercase text-ink mt-2">
                Fotoğraf Seç
              </span>
              <p className="font-body text-[12px] text-ink-soft/70">
                Aynı anda birden fazla fotoğraf seçebilirsiniz
              </p>
              <input 
                type="file" 
                accept="image/*" 
                multiple
                onChange={handlePhotoSelect} 
                className="hidden" 
              />
            </label>
          )}
        </div>
        
        {!isUploading && !uploadSuccess && photoFiles.length === 0 && (
          <div className="mt-8 pt-6 border-t border-olive-soft/20 w-full">
            <Link 
              href="/invite"
              className="text-[11px] font-display uppercase tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
              ← Davetiyeye Dön
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
