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
    <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              TRABAJOS REALES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight">
              Proyectos Destacados
            </h2>
            <p className="text-sm sm:text-base text-[#5F5646] font-normal leading-relaxed max-w-xl">
              Aquí puedes ver un vistazo rápido de las aplicaciones y sistemas que he desarrollado.
            </p>
          </div>

          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate("proyectos")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer self-start md:self-auto"
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
              className="bg-[#FAF7F2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-5 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Thumbnail */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#EAE0D2] border border-[#E2D7C7]">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FF8400] block">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#2D2A24]">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[#5F5646] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-[#EAE0D2] text-[10px] font-mono font-medium text-[#2D2A24]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 mt-4 border-t border-[#E2D7C7]/70 flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] text-xs font-bold transition-colors"
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
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#FF8400] hover:bg-[#2D2A24] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Demo</span>
                  </a>
                ) : (
                  onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate("proyectos")}
                      className="flex-1 flex items-center justify-center gap-1 py-2 px-3 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold transition-colors cursor-pointer"
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
