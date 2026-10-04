import React, { useState } from "react";
import { ExternalLink, Check, ArrowUpRight, Plus, ArrowRight, Layers, Filter } from "lucide-react";
import { projects, Project } from "../data/projects";
import { GithubIcon } from "./icons";
import { PageId } from "../types";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ProjectStackComparator } from "./ProjectStackComparator";

interface ProjectsProps {
  onNavigate?: (page: PageId) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    { id: "all", label: "Todos", count: projects.length },
    { id: "Móvil Nativo", label: "Móvil & Offline", count: projects.filter((p) => p.category === "Móvil Nativo").length },
    { id: "Software Transaccional", label: "Backend & ACID", count: projects.filter((p) => p.category === "Software Transaccional").length },
    { id: "Web Frontend", label: "Web Frontend", count: projects.filter((p) => p.category === "Web Frontend").length },
  ];

  const filteredProjects = selectedCategory === "all"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-20 md:py-28 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tilted Sticker Banner */}
        <div className="relative mb-10 space-y-3">
          <div className="inline-block">
            <span className="sticker-banner -rotate-2 text-xs tracking-wider uppercase">
              SELECCIÓN DE PROYECTOS DE INGENIERÍA
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A24] tracking-tight uppercase font-sans">
            PROYECTOS
          </h2>
          <p className="text-[#5F5646] text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            Sistemas transaccionales, aplicaciones móviles offline-first y plataformas web en producción. Selecciona cualquier proyecto para inspeccionar su arquitectura detallada.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#E2D7C7]">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#5F5646] mr-2">
            <Filter className="w-3.5 h-3.5 text-[#FF8400]" />
            <span className="uppercase">FILTRO:</span>
          </div>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#2D2A24] text-white shadow-xs -translate-y-0.5"
                    : "bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] border border-[#E2D7C7]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-[#FF8400] text-white" : "bg-[#D8CDBE] text-[#2D2A24]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2x2 Grid of PreviewCards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between bg-[#FAF7F2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md"
            >
              <div>
                {/* PreviewCard Top: Image Container with Aspect Ratio and Round Arrow Button */}
                <div
                  onClick={() => setActiveModalProject(project)}
                  className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#EAE0D2] border border-[#E2D7C7] transition-all duration-300 group-hover:border-[#D3C5B2] shadow-xs cursor-pointer"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badge Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-[#2D2A24]/90 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-white/15">
                      {project.badge}
                    </span>
                  </div>

                  {/* Corner Round Accent Button */}
                  <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-[#FF8400] text-white flex items-center justify-center shadow-md group-hover:bg-[#2D2A24] transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                  </div>
                </div>

                {/* PreviewCard Content */}
                <div className="pt-5 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                      {project.category}
                    </span>
                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-2xl font-black text-[#2D2A24] group-hover:text-[#FF8400] transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#5F5646] font-medium leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Highlights */}
                  <div className="space-y-1.5 pt-2">
                    {project.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#5F5646] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#2D2A24] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#EAE0D2] text-[11px] font-mono font-bold text-[#2D2A24]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 space-y-2 border-t border-[#E2D7C7]/80 mt-5">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <Layers className="w-4 h-4 text-[#FF8400] group-hover:text-white" />
                  <span>Inspeccionar Arquitectura</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] text-xs font-bold transition-colors border border-[#E2D7C7]"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Código</span>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] text-xs font-bold transition-colors border border-[#E2D7C7]"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Start a Project Collaboration Card */}
          <div className="group relative flex flex-col justify-between bg-[#FAF7F2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md">
            <a
              href="#contacto"
              onClick={(e) => {
                if (onNavigate) {
                  e.preventDefault();
                  onNavigate("contacto");
                }
              }}
              className="block"
            >
              <div className="relative w-full aspect-[16/10] rounded-2xl border-2 border-dashed border-[#C8BEAE] bg-[#EAE0D2]/40 group-hover:bg-[#EAE0D2]/70 group-hover:border-[#2D2A24] transition-all flex flex-col items-center justify-center p-6 text-center cursor-pointer shadow-2xs">
                <div className="w-14 h-14 rounded-full bg-[#E2D7C7] group-hover:bg-[#FF8400] group-hover:text-white text-[#2D2A24] flex items-center justify-center transition-all mb-3 shadow-xs">
                  <Plus className="w-7 h-7 transition-transform group-hover:scale-110" />
                </div>
                <span className="font-mono text-xs uppercase font-bold text-[#5F5646] tracking-wider">
                  NUEVA PROPUESTA
                </span>
              </div>

              <div className="pt-5 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                    Colaboración & Consultoría
                  </span>
                  <h3 className="text-2xl font-black text-[#2D2A24] group-hover:text-[#FF8400] transition-colors">
                    Iniciar un Proyecto
                  </h3>
                </div>

                <p className="text-sm text-[#5F5646] font-medium leading-relaxed">
                  ¿Tienes una iniciativa de software, arquitectura backend o desarrollo móvil? Diseñemos una solución técnica sólida y escalable.
                </p>

                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-[#2D2A24] group-hover:text-[#FF8400] transition-colors">
                    <span>Escribir requerimiento</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </a>

            <div className="pt-6 border-t border-[#E2D7C7]/80 mt-5">
              <a
                href="#contacto"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("contacto");
                  }
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EAE0D2] hover:bg-[#FF8400] hover:text-white text-[#2D2A24] text-xs font-bold transition-colors border border-[#E2D7C7]"
              >
                <span>Contactar ahora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Stack Comparator Component */}
        <ProjectStackComparator
          onSelectProject={(project) => setActiveModalProject(project)}
          onNavigate={onNavigate}
        />
      </div>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
        onNavigate={onNavigate}
      />
    </section>
  );
};