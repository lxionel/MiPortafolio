import React, { useState, useEffect } from "react";
import { Clock, MapPin, Zap } from "lucide-react";

export const LimaClockWidget: React.FC = () => {
  const [timeStr, setTimeStr] = useState<string>("");
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in America/Lima
      const limaTime = new Intl.DateTimeFormat("es-PE", {
        timeZone: "America/Lima",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const hourInt = parseInt(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/Lima",
          hour: "numeric",
          hour12: false,
        }).format(now),
        10
      );

      setTimeStr(limaTime);
      setIsBusinessHours(hourInt >= 8 && hourInt < 20);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E2D7C7] space-y-3 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#FF8400]" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
            ZONA HORARIA LOCAL
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#5F5646]">
          <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
          <span>Chimbote, Perú (UTC-5)</span>
        </div>
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <div className="font-mono text-3xl font-black text-[#2D2A24] tracking-tight">
          {timeStr || "--:--:--"}
        </div>
        <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#EAE0D2] text-[#2D2A24]">
          PET
        </span>
      </div>

      <div className="pt-2 border-t border-[#E2D7C7] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isBusinessHours ? "bg-emerald-600 animate-pulse" : "bg-amber-500"
            }`}
          ></span>
          <span className="font-mono font-medium text-[#5F5646]">
            {isBusinessHours ? "Horario Activo (Respuesta ágil)" : "Recepción diferida (Respuesta a primera hora)"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#FF8400] font-mono font-bold text-[11px]">
          <Zap className="w-3 h-3" />
          <span>Disponible</span>
        </div>
      </div>
    </div>
  );
};
