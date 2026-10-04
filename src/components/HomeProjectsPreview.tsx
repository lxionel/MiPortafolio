import React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projects } from "../data/projects";
import { PageId } from "../types";
import { GithubIcon } from "./icons";

interface HomeProjectsPreviewProps {
  onNavigate?: (page: PageId) => void;
}

export const HomeProjectsPreview: React.FC<HomeProjectsPreviewProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F0F4F8] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7]">
              TRABAJOS REALES
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Proyectos Destacados
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-xl">
              Aquí puedes ver un vistazo rápido de las aplicaciones y sistemas que he desarrollado.
            </p>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("proyectos")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer self-start md:self-auto"
            >
              <span>Ver todos los proyectos</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Projects 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-5 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Thumbnail */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0284C7] block">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-mono font-medium text-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Código</span>
                  </a>
                )}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                ) : (
                  onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("proyectos")}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-[#0284C7] text-white text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>Detalles</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
