"use client";

import { useEffect, useState } from "react";

function getWeatherDescription(code: number): { label: string; icon: string } {
  if (code === 0) return { label: "Açık", icon: "☀️" };
  if (code === 1 || code === 2) return { label: "Parçalı", icon: "🌤️" };
  if (code === 3) return { label: "Bulutlu", icon: "☁️" };
  if (code >= 45 && code <= 48) return { label: "Sisli", icon: "🌫️" };
  if (code >= 51 && code <= 57) return { label: "Çisenti", icon: "🌦️" };
  if (code >= 61 && code <= 67) return { label: "Yağmur", icon: "🌧️" };
  if (code >= 71 && code <= 77) return { label: "Kar", icon: "❄️" };
  if (code >= 80 && code <= 82) return { label: "Sağanak", icon: "🌧️" };
  if (code >= 95) return { label: "Fırtına", icon: "⛈️" };
  return { label: "?", icon: "✨" };
}

export default function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<{
    maxTemp: number;
    icon: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const targetDate = "2026-07-12";
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=41.0588&longitude=28.5533&daily=temperature_2m_max,weather_code&timezone=Europe%2FIstanbul&forecast_days=14"
        );
        const data = await res.json();
        
        if (data && data.daily && data.daily.time) {
          const index = data.daily.time.indexOf(targetDate);
          if (index !== -1) {
            const maxTemp = Math.round(data.daily.temperature_2m_max[index]);
            const code = data.daily.weather_code[index];
            const { icon } = getWeatherDescription(code);
            setWeatherData({ maxTemp, icon });
            setLoading(false);
            return;
          }
        }
        
        setWeatherData({ maxTemp: 30, icon: "☀️" });
        setLoading(false);
      } catch (err) {
        setWeatherData({ maxTemp: 30, icon: "☀️" });
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center border border-olive-soft/35 rounded-[2px] bg-paper/50 backdrop-blur-[2px] shadow-[0_4px_12px_rgba(28,26,23,0.02)] min-w-[70px] min-h-[66px] animate-[fadeIn_1s_ease-out]">
       <div className="w-4 h-4 border border-olive border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center gap-1 border border-olive-soft/35 rounded-[2px] bg-paper/50 backdrop-blur-[2px] shadow-[0_4px_12px_rgba(28,26,23,0.02)] min-w-[70px] min-h-[66px] animate-[fadeIn_1s_ease-out] relative z-10">
      <span className="text-[22px] drop-shadow-sm filter leading-none">{weatherData?.icon}</span>
      <span className="font-display text-[15px] text-[#9a7e58] leading-none">{weatherData?.maxTemp}°</span>
    </div>
  );
}
