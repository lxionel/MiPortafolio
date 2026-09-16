import React from "react";
import { Box, Code2, Lightbulb, Compass, Terminal } from "lucide-react";
import { Workstation3D } from "./Workstation3D";

export const WorkstationSection: React.FC = () => {
  return (
    <section id="estacion-3d" className="py-20 md:py-28 relative bg-slate-950 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Box className="w-3.5 h-3.5" />
            <span>Entorno Interactivo Three.js</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Estación de Trabajo 3D
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Modelo 3D interactivo en primer plano con rotación libre en 360°, textura procedural
            con código Kotlin en pantalla e iluminación reactiva en tiempo real.
          </p>
        </div>

        {/* 3D Viewer Main Frame */}
        <div className="relative rounded-3xl bg-slate-900/40 border border-slate-800/80 shadow-2xl backdrop-blur-md overflow-hidden p-2 sm:p-4">
          {/* Top Window Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-800/80 bg-slate-950/70 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">
                setup_ingeniero_sistemas.3d
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-medium">WebGL 2.0</span>
              <span className="hidden sm:inline">60 FPS</span>
            </div>
          </div>

          {/* Protagonist 3D Canvas */}
          <Workstation3D />

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 pt-4 border-t border-slate-800/80 bg-slate-950/60 rounded-b-2xl">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Giro 360° Libre
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Arrastre fluido e inercia
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shrink-0">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Código en Pantalla
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Textura Canvas reactiva
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 shrink-0">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Iluminación de Estudio
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Luz emitida y puntero
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-200">
                  Presets de Cámara
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  Zoom frontal y código
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};