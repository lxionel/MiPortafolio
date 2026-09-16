import React, { useState } from "react";
import { ShieldCheck, Award, ZoomIn, X, CheckCircle2, Network } from "lucide-react";
import { certifications, Certification } from "../data/certifications";

export const Certifications: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certificaciones" className="py-20 md:py-28 relative bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
            <Award className="w-3.5 h-3.5" />
            <span>Acreditaciones Oficiales</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Certificaciones Profesionales
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Formación validada por líderes globales de la industria tecnológica en infraestructura,
            conmutación, seguridad y protocolos de telecomunicaciones.
          </p>
        </div>

        {/* Certifications Display Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {certifications.map((cert) => (
            <React.Fragment key={cert.id}>
              {/* Left Column: Visual Certificate Card */}
              <div className="lg:col-span-5 flex flex-col">
                <div className="group relative rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 p-5 flex flex-col justify-between h-full shadow-2xl transition-all">
                  {/* Top Certificate header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {cert.issuer}
                        </h4>
                        <span className="text-[11px] font-mono text-cyan-400">
                          {cert.badge}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-slate-400">
                      {cert.date}
                    </span>
                  </div>

                  {/* Certificate preview thumbnail with click-to-zoom */}
                  <div
                    onClick={() => setActiveCert(cert)}
                    className="relative my-4 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 cursor-pointer group/img aspect-[4/3] flex items-center justify-center shadow-inner"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}${cert.image}`}
                      alt={cert.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-xs font-semibold shadow-lg">
                        <ZoomIn className="w-4 h-4" />
                        <span>Ver Documento Completo</span>
                      </span>
                    </div>
                  </div>

                  {/* Verification note */}
                  <div className="pt-2 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{cert.verificationNote}</span>
                    <button
                      onClick={() => setActiveCert(cert)}
                      className="text-cyan-400 hover:text-cyan-300 underline font-sans"
                    >
                      Inspeccionar
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Detailed Competencies & Technical Scope */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 sm:p-8">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                      Programa Académico & Estándares
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {cert.title}
                    </h3>
                  </div>

                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Dominios de Competencia Clave
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cert.skillsAcquired.map((skill, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Network className="w-4 h-4 text-indigo-400" />
                    <span>Conmutación, Enrutamiento & Seguridad de Red</span>
                  </div>

                  <button
                    onClick={() => setActiveCert(cert)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-medium transition-all"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Ver Certificado Alta Resolución</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* High-Resolution Certificate Lightbox Modal */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md">
          <div
            onClick={() => setActiveCert(null)}
            className="fixed inset-0"
          />

          <div className="relative z-10 max-w-5xl w-full bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-sm sm:text-base">
                  {activeCert.title} - {activeCert.issuer}
                </h3>
              </div>
              <button
                onClick={() => setActiveCert(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Cerrar visor"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-4 flex items-center justify-center bg-slate-950 max-h-[calc(92vh-75px)]">
              <img
                src={`${import.meta.env.BASE_URL}${activeCert.image}`}
                alt={activeCert.title}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-slate-800"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};