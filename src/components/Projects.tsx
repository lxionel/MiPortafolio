import React from "react";
import { ExternalLink, Check, ArrowUpRight, Plus, ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import { GithubIcon } from "./icons";

export const Projects: React.FC = () => {
  return (
    <section id="proyectos" className="py-24 md:py-32 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Tilted Sticker Banner */}
        <div className="relative mb-14 space-y-2">
          <div className="inline-block mb-2">
            <span className="sticker-banner -rotate-3 text-xs tracking-wider uppercase">
              SELECCIÓN DE PROYECTOS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A24] tracking-tight uppercase">
            PROYECTOS
          </h2>
          <p className="text-[#5F5646] text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            Sistemas transaccionales, aplicaciones móviles offline-first y plataformas web en producción.
          </p>
        </div>

        {/* 2x2 Grid of PreviewCards (3 projects + 1 collaboration card) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between"
            >
              <div>
                {/* PreviewCard Top: Image Container with Aspect Ratio and Round Arrow Button */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#EAE0D2] border border-[#E2D7C7] transition-all duration-300 group-hover:border-[#D3C5B2] shadow-xs group-hover:shadow-md">
                  <img
                    src={`${import.meta.env.BASE_URL}${project.thumbnail}`}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badge Top Left */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-[#2D2A24]/85 backdrop-blur-xs text-white text-[11px] font-mono font-bold tracking-wider uppercase border border-white/15">
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
                    <h3 className="text-2xl font-black text-[#2D2A24] group-hover:text-[#FF8400] transition-colors">
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
              <div className="pt-6 flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Código</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FF8400] hover:bg-[#2D2A24] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Demo en Vivo</span>
                  </a>
                )}
              </div>
            </div>
          ))}

          {/* 4th Card: Empty / Start a Project Collaboration */}
          <div className="group relative flex flex-col justify-between">
            <a
              href="#contacto"
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

            <div className="pt-6">
              <a
                href="#contacto"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EAE0D2] hover:bg-[#FF8400] hover:text-white text-[#2D2A24] text-xs font-bold transition-colors border border-[#E2D7C7]"
              >
                <span>Contactar ahora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};