import React from "react";
import { Cpu, Database, Server, Smartphone, Network, Shield } from "lucide-react";
import { profile } from "../data/profile";
import { skillCategories } from "../data/skills";

export const About: React.FC = () => {
  return (
    <section id="habilidades" className="py-20 md:py-28 relative bg-slate-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Cpu className="w-3.5 h-3.5" />
            <span>Perfil Técnico & Habilidades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ingeniería & Especialización
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Soluciones concebidas desde los cimientos: desde el diseño relacional con integridad
            ACID hasta la entrega continua y la arquitectura de aplicaciones distribuidas.
          </p>
        </div>

        {/* Profile Bio & Philosophy Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Bio Card */}
          <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center font-mono text-cyan-400 font-bold text-lg">
                LA
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {profile.name}
                </h3>
                <span className="text-xs font-mono text-cyan-400">
                  {profile.title} - {profile.location}
                </span>
              </div>
            </div>

            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
              {profile.aboutText.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" />
                <span>Enfoque en Integridad & Seguridad</span>
              </div>
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-indigo-400" />
                <span>Redes Cisco & Conectividad</span>
              </div>
            </div>
          </div>

          {/* Right Metrics & Principles */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 w-fit mb-4">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Persistencia Transaccional
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Rigor ACID & SQL Server
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lógica de negocio atómica encapsulada en procedimientos almacenados con control estricto de transacciones.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 w-fit mb-4">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Móvil & Autonomía
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Offline-First en Kotlin
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cómputo en el dispositivo con Room DB y StateFlow para una experiencia sin caídas por conectividad.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 w-fit mb-4">
                <Network className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Comunicaciones
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Redes & Protocolos
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Formación certificada en configuración de enrutadores, segmentación VLANs y diagnóstico de tráfico TCP/IP.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 flex flex-col justify-between">
              <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-fit mb-4">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block mb-1">
                  Mantenibilidad
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Clean Architecture
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Aislamiento estricto de capas de dominio, datos e interfaces para facilitar pruebas y escalabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Categorized Skills Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Tecnologías & Competencias Específicas
            </h3>
            <span className="text-xs font-mono text-slate-400">
              Stack Verificado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 space-y-4 hover:border-slate-700 transition-colors"
              >
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {category.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/60 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <span className="font-semibold text-sm text-slate-200 block">
                          {skill.name}
                        </span>
                        <span className="text-xs text-slate-400 leading-relaxed block">
                          {skill.detail}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shrink-0">
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};