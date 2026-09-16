import React, { useState, useEffect } from "react";
import { X, ExternalLink, CheckCircle2, Layers, Cpu, Server } from "lucide-react";
import { Project } from "../data/projects";
import { GithubIcon } from "./icons";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "specs">("overview");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161b22]">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
              {project.badge}
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-white font-sans">
              {project.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Project Screenshot / Hero Image */}
          <div className="w-full relative rounded-2xl overflow-hidden bg-[#090a0f] border border-white/10 flex items-center justify-center max-h-80">
            <img
              src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
              alt={project.title}
              className="w-full h-full object-contain max-h-80 bg-[#090a0f]"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                activeTab === "overview"
                  ? "border-white text-white bg-white/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Server className="w-4 h-4" />
              <span>Resumen & Solución</span>
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                activeTab === "architecture"
                  ? "border-white text-white bg-white/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Arquitectura & Flujo</span>
            </button>
            <button
              onClick={() => setActiveTab("specs")}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium border-b-2 transition-all ${
                activeTab === "specs"
                  ? "border-white text-white bg-white/5"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Ficha Técnica</span>
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="space-y-3">
                {project.fullDescription.map((p, idx) => (
                  <p key={idx} className="text-slate-300 text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Características Implementadas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Architecture */}
          {activeTab === "architecture" && (
            <div className="space-y-4">
              <p className="text-slate-300 text-sm">
                Enfoque de diseño enfocado en modularidad, desacoplamiento de capas y cero pérdida de información:
              </p>
              <div className="space-y-3">
                {project.architecturePoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs text-white shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Technical Specs */}
          {activeTab === "specs" && (
            <div className="space-y-4">
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161b22] text-slate-400 uppercase font-mono border-b border-white/10">
                    <tr>
                      <th className="px-4 py-3">Componente</th>
                      <th className="px-4 py-3">Especificación Técnica</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-slate-300">
                    {Object.entries(project.technicalSpecs).map(([key, val]) => (
                      <tr key={key} className="hover:bg-white/[0.02]">
                        <td className="px-4 py-3 font-mono font-medium text-white">
                          {key}
                        </td>
                        <td className="px-4 py-3 text-slate-300">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Tags summary */}
              <div className="pt-2">
                <span className="text-xs font-mono text-slate-400 block mb-2">
                  Tecnologías & Librerías
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 bg-[#161b22] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-mono transition-colors border border-white/10"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repositorio</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-950 hover:bg-slate-200 text-xs font-mono font-semibold transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Probar en Producción</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium transition-colors border border-white/10"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};