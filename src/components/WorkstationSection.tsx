import React from "react";
import { Box, Code2, Sparkles, Compass, Terminal } from "lucide-react";
import { Workstation3D } from "./Workstation3D";

export const WorkstationSection: React.FC = () => {
  return (
    <section id="estacion-3d" className="py-20 md:py-28 relative bg-[#090a0f] overflow-hidden">
      {/* Subtle radial lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
            <Box className="w-3.5 h-3.5 text-cyan-400" />
            <span>Entorno Interactivo Three.js</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Estación de Trabajo 3D
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Renderizado 3D en primer plano. Gira 360°, inspecciona la pantalla con código Kotlin
            activo y experimenta la iluminación reactiva.
          </p>
        </div>

        {/* 3D Frame */}
        <div className="relative rounded-3xl bg-[#0e1118]/60 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden p-2 sm:p-4">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#090a0f]/80 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                estacion_trabajo_lionel.3d
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-emerald-400 font-medium">WebGL 2.0</span>
              <span className="hidden sm:inline text-slate-500">60 FPS</span>
            </div>
          </div>

          {/* 3D Canvas */}
          <Workstation3D />

          {/* Feature Highlights Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 pt-4 border-t border-white/5 bg-[#090a0f]/60 rounded-b-2xl">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#12151e]/80 border border-white/5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 shrink-0">
                <Compass className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Giro 360° Libre
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Rotación con inercia
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#12151e]/80 border border-white/5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 shrink-0">
                <Code2 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Código en Pantalla
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  IDE activo en vivo
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#12151e]/80 border border-white/5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 shrink-0">
                <Sparkles className="w-4 h-4 text-sky-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Iluminación de Estudio
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Reflejo en teclado y puntero
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#12151e]/80 border border-white/5">
              <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 shrink-0">
                <Terminal className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Enfoque Rápido
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Presets de cámara suaves
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};