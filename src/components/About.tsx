import React, { useState } from "react";
import { Cpu, Database, Server, Smartphone, ShieldCheck, ZoomIn, X } from "lucide-react";
import { profile } from "../data/profile";
import { skillCategories } from "../data/skills";
import { certifications, Certification } from "../data/certifications";

export const About: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="habilidades" className="py-20 md:py-28 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span>Perfil Profesional & Competencias</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ingeniería de Software & Arquitectura
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Construcción de sistemas robustos desde los cimientos: rigor transaccional ACID,
            desacoplamiento de capas, aplicaciones offline-first y seguridad defensiva.
          </p>
        </div>

        {/* Profile Card & Bio Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-stretch">
          {/* Left: Professional Portrait & Bio Card */}
          <div className="lg:col-span-5 pro-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-start lg:items-center gap-6 text-center sm:text-left lg:text-center">
              {/* Studio Portrait with sleek border */}
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border border-white/15 shadow-2xl shrink-0 group">
                <img
                  src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-110 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {profile.name}
                </h3>
                <div className="text-xs font-mono text-emerald-400 font-medium">
                  {profile.title}
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  {profile.location}
                </div>
              </div>
            </div>

            {/* Bio text */}
            <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-6">
              {profile.aboutText.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Discrete Cisco Cybersecurity Credential Badge */}
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-white">
                        {cert.title}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-slate-400 border border-white/10">
                        {cert.issuer}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                      {cert.score}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(cert)}
                  className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono transition-colors shrink-0 flex items-center gap-1.5 border border-white/10"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ver</span>
                </button>
              </div>
            ))}
          </div>

          {/* Right: Engineering Principles Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="pro-card p-6 rounded-3xl flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 mb-4">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  Persistencia Transaccional
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Integridad ACID en SQL Server
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Lógica transaccional atómica encapsulada en procedimientos almacenados con control preventivo de rollback.
                </p>
              </div>
            </div>

            <div className="pro-card p-6 rounded-3xl flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  Desarrollo Móvil Nativo
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Arquitectura Offline-First
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Cómputo local con Room DB, Kotlin StateFlow y Coroutines para garantizar operatividad continua sin internet.
                </p>
              </div>
            </div>

            <div className="pro-card p-6 rounded-3xl flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  Seguridad de la Información
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Principios de Ciberseguridad
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Acreditado por Cisco en detección de amenazas, confidencialidad de datos y mejores prácticas defensivas.
                </p>
              </div>
            </div>

            <div className="pro-card p-6 rounded-3xl flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400 mb-4">
                <Server className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 block mb-1">
                  Ingeniería de Software
                </span>
                <h4 className="text-base font-bold text-white mb-2">
                  Clean Architecture & MVVM
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Desacoplamiento estricto entre dominio, casos de uso, persistencia e interfaces de usuario para alta testeabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Breakdown Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Stack Tecnológico Especializado
            </h3>
            <span className="text-xs font-mono text-slate-500">
              Stack Verificado
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="pro-card rounded-3xl p-6 space-y-4"
              >
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white">
                    {category.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {category.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-2xl bg-[#090a0f]/60 border border-white/5 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-xs sm:text-sm text-slate-200 block">
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-slate-400 leading-relaxed block">
                          {skill.detail}
                        </span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-slate-300 shrink-0">
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

      {/* Discrete Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md">
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0"
          />

          <div className="relative z-10 max-w-4xl w-full bg-[#0d1117] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161b22]">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-white text-sm sm:text-base">
                    {selectedCert.title} - {selectedCert.issuer}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">
                    ID de Credencial: {selectedCert.verificationId}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-6 flex flex-col items-center justify-center bg-[#090a0f]">
              <img
                src={`${import.meta.env.BASE_URL}${selectedCert.image}`}
                alt={selectedCert.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
              <p className="text-xs text-slate-400 font-mono mt-4 text-center">
                {selectedCert.verificationNote} • {selectedCert.score}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};