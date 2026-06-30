"use client";

import { useEffect, useState } from "react";

// WMO Hava Durumu Kodları (https://open-meteo.com/en/docs)
function getWeatherDescription(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Açık / Güneşli", icon: "☀️" };
  if (code === 1 || code === 2) return { label: "Parçalı Bulutlu", icon: "🌤️" };
  if (code === 3) return { label: "Çok Bulutlu", icon: "☁️" };
  if (code >= 45 && code <= 48) return { label: "Sisli", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Çisenti", icon: "🌦️" };
  if (code >= 61 && code <= 67) return { label: "Yağmurlu", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Kar Yağışlı", icon: "❄️" };
  if (code >= 80 && code <= 82) return { label: "Sağanak Yağışlı", icon: "🌧️" };
  if (code >= 95) return { label: "Fırtınalı", icon: "⛈️" };
  return { label: "Bilinmiyor", icon: "✨" };
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<{
    maxTemp: number;
    minTemp: number;
    label: string;
    icon: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const targetDate = "2026-07-12";
        
        // Açık kaynaklı ve API anahtarı gerektirmeyen Open-Meteo
        // 14 günlük tahmin alıyoruz (12 Temmuz'u yakalamak için)
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.0588&longitude=28.5533&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FIstanbul&forecast_days=14"
        );
        
        const data = await res.json();
        
        if (data && data.daily && data.daily.time) {
          const index = data.daily.time.indexOf(targetDate);
          
          if (index !== -1) {
            const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
            const minTemp = Math.round(data.daily.temperature_2m_min[index]);
            const code = data.daily.weather_code[index];
            const { label, icon } = getWeatherDescription(code);
            
            setWeatherData({ maxTemp, minTemp, label, icon });
            setLoading(false);
            return;
          }
        }
        
        // Eğer 14 günü geçtiyse veya API'de sorun varsa yedek (fallback) veri:
        setWeatherData({ maxTemp: 30, minTemp: 22, label: "Açık / Güneşli", icon: "☀️" });
        setLoading(false);
        
      } catch (err) {
        // Hata durumunda Temmuz ortalamasını göster
        setWeatherData({ maxTemp: 30, minTemp: 22, label: "Açık / Güneşli", icon: "☀️" });
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) return null; // Yüklenirken hiçbir şey gösterme

  return (
    <div className="w-full flex items-center justify-between bg-paper/60 border border-olive-soft/40 px-5 py-3 rounded-[3px] shadow-[0_2px_10px_rgba(28,26,23,0.02)] backdrop-blur-sm animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-col gap-0.5">
        <span className="font-display text-[9px] tracking-[0.2em] uppercase text-ink-soft">12 Temmuz Hava Durumu</span>
        <span className="font-body text-[13px] italic text-ink">{weatherData?.label}</span>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-2xl drop-shadow-sm filter">{weatherData?.icon}</span>
        <div className="flex flex-col items-end gap-0.5">
          <span className="font-display text-[12px] text-[#9a7e58]">{weatherData?.maxTemp}°</span>
          <span className="font-display text-[9px] text-ink-soft">{weatherData?.minTemp}°</span>
        </div>
      </div>
    </div>
  );
}
