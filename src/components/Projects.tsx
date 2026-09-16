import React, { useState } from "react";
import { ExternalLink, ArrowUpRight, Code } from "lucide-react";
import { projects, Project } from "../data/projects";
import { ProjectModal } from "./ProjectModal";
import { GithubIcon } from "./icons";

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects = projects.filter((p) => {
    if (filter === "backend") return p.tags.includes("Java 17 LTS") || p.tags.includes("SQL Server");
    if (filter === "mobile") return p.tags.includes("Kotlin") || p.tags.includes("Android SDK");
    if (filter === "web") return p.tags.includes("React") || p.tags.includes("TypeScript");
    return true;
  });

  return (
    <section id="proyectos" className="py-20 md:py-28 relative bg-[#090a0f]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
              <Code className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sistemas en Producción & Repositorios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Proyectos de Ingeniería
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl">
              Arquitecturas construidas con rigurosidad: motores transaccionales ACID,
              aplicaciones móviles offline-first y cartas interactivas optimizadas.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-[#11141c] rounded-2xl border border-white/10">
            <button
              onClick={() => setFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "all"
                  ? "bg-white/15 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Todos ({projects.length})
            </button>
            <button
              onClick={() => setFilter("backend")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "backend"
                  ? "bg-white/15 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Backend / ACID
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "mobile"
                  ? "bg-white/15 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Android Nativo
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                filter === "web"
                  ? "bg-white/15 text-white font-medium"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Web Full-Stack
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-3xl pro-card hover:border-white/20 transition-all duration-300 flex flex-col overflow-hidden shadow-xl hover:-translate-y-1"
            >
              {/* Thumbnail */}
              <div
                onClick={() => setSelectedProject(project)}
                className="relative h-48 sm:h-52 w-full bg-[#07080c] overflow-hidden cursor-pointer flex items-center justify-center p-3 border-b border-white/5"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                  alt={project.title}
                  className="w-full h-full object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-transparent opacity-50" />

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-slate-200">
                    {project.badge}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-950 font-semibold text-xs shadow-lg">
                    <span>Detalles</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-slate-500">
                    {project.category}
                  </span>
                  <h3
                    onClick={() => setSelectedProject(project)}
                    className="text-lg sm:text-xl font-bold text-white group-hover:text-slate-200 transition-colors cursor-pointer"
                  >
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {project.shortDescription}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/[0.02] text-[11px] font-mono text-slate-500">
                      +{project.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-slate-300 hover:text-white flex items-center gap-1 font-medium"
                  >
                    <span>Ficha y Arquitectura</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Ver Repositorio"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Ver en Vivo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};