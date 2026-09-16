import React from "react";
import { ArrowRight, ShieldCheck, Database, Smartphone, Network, Box, ChevronDown } from "lucide-react";
import { profile } from "../data/profile";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Background glow discs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-950/50 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span>Disponible para desarrollo de software & proyectos de ingeniería</span>
        </div>

        {/* Identity & Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
          {profile.name}
        </h1>

        <div className="mt-3 text-xl sm:text-2xl lg:text-3xl font-mono text-cyan-400 font-semibold tracking-wide">
          {profile.title}
        </div>

        {/* Core Value Statement */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          {profile.subtitle}
        </p>

        {/* Engineering Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Java 17 & SQL Server (ACID)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            <span>Kotlin Android (Offline-First)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-200">
            <Network className="w-4 h-4 text-sky-400" />
            <span>Cisco Certified Fundamentals</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <a
            href="#estacion-3d"
            className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5"
          >
            <Box className="w-4 h-4" />
            <span>Explorar Estación 3D</span>
          </a>

          <a
            href="#proyectos"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-slate-700 text-sm font-semibold transition-all"
          >
            <span>Ver Proyectos</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </a>

          <a
            href="#certificaciones"
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-transparent hover:bg-slate-900/60 text-slate-400 hover:text-cyan-300 border border-slate-800 text-sm font-mono transition-all"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Certificación Cisco</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mt-16 pt-12 border-t border-slate-900 w-full max-w-4xl">
          {profile.metrics.map((m) => (
            <div key={m.label} className="flex flex-col items-center">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {m.value}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-300 mt-1">
                {m.label}
              </span>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                {m.detail}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <a
          href="#estacion-3d"
          className="mt-12 p-2 rounded-full text-slate-400 hover:text-cyan-400 animate-bounce transition-colors"
          aria-label="Ir a Estación 3D"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};