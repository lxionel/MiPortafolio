import React, { useEffect } from "react";
import { X, ExternalLink, Layers, Cpu, Database, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Project } from "../data/projects";
import { GithubIcon } from "./icons";
import { PageId } from "../types";

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onNavigate?: (page: PageId) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onNavigate,
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2D2A24]/75 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 cursor-pointer" />

      {/* Modal Dialog */}
      <div className="relative z-10 max-w-4xl w-full bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="px-6 py-4.5 bg-[#EAE0D2] border-b border-[#E2D7C7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-md bg-[#2D2A24] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
              {project.badge}
            </span>
            <div className="h-4 w-px bg-[#D3C5B2]"></div>
            <span className="font-mono text-xs font-bold text-[#5F5646] uppercase tracking-wider">
              FICHA TÉCNICA DE ARQUITECTURA
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#E2D7C7] text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-[#2D2A24]">
          {/* Main Title & Overview */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                {project.category}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight uppercase font-sans">
              {project.title}
            </h2>
            <p className="text-base text-[#5F5646] leading-relaxed font-medium">
              {project.architectureSummary}
            </p>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="p-4 rounded-2xl bg-white border border-[#E2D7C7] shadow-2xs space-y-1"
              >
                <span className="text-[11px] font-mono font-bold uppercase text-[#5F5646]">
                  {metric.label}
                </span>
                <div className="text-xl sm:text-2xl font-black text-[#2D2A24]">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Layers Breakdown */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF8400]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
                ESTRUCTURA DE CAPAS & RESPONSABILIDADES
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.architectureLayers.map((layer, idx) => (
                <div
                  key={layer.name}
                  className="p-4 rounded-2xl bg-white border border-[#E2D7C7] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#2D2A24]">
                      {idx + 1}. {layer.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EAE0D2] text-[#5F5646] font-bold">
                      {layer.tech}
                    </span>
                  </div>
                  <p className="text-xs text-[#5F5646] leading-relaxed">
                    {layer.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Database & Concurrency Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#EAE0D2]/50 border border-[#E2D7C7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FF8400]">
                <Database className="w-4 h-4" />
                <span>Persistencia & Motor</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D2A24] font-medium leading-relaxed">
                {project.databaseTech}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAE0D2]/50 border border-[#E2D7C7] space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FF8400]">
                <Cpu className="w-4 h-4" />
                <span>Modelo de Concurrencia</span>
              </div>
              <p className="text-xs sm:text-sm text-[#2D2A24] font-medium leading-relaxed">
                {project.concurrencyModel}
              </p>
            </div>
          </div>

          {/* Engineering Challenges & Solutions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#FF8400]" />
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
                DESAFÍOS RESUELTOS & SOLUCIÓN TÉCNICA
              </h3>
            </div>

            <div className="space-y-3">
              {project.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E2D7C7] space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      D
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#2D2A24]">
                      {item.challenge}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 pl-7 text-xs sm:text-sm text-[#5F5646]">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item.solution}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg bg-[#EAE0D2] text-xs font-mono font-bold text-[#2D2A24]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="px-6 py-4 bg-[#EAE0D2] border-t border-[#E2D7C7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Ver Código en GitHub</span>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Abrir Demo en Vivo</span>
              </a>
            )}
          </div>

          {onNavigate && (
            <button
              onClick={() => {
                onClose();
                onNavigate("contacto");
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E2D7C7] hover:bg-[#D8CDBE] text-[#2D2A24] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              <span>Consultar por este stack</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
