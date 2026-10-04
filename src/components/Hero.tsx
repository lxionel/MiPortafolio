import React from "react";
import { ArrowRight, MapPin, FileText, GraduationCap, ShieldCheck, MessageSquare } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PageId } from "../types";

interface HeroProps {
  onNavigate?: (page: PageId) => void;
  onOpenCv?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenCv }) => {
  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#F0F4F8] border-b border-slate-200/80 overflow-hidden"
    >
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(2,132,199,0.10),rgba(240,244,248,0))] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Presentation & Value */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-slate-700 bg-white/90 px-4 py-1.5 rounded-full border border-slate-200 shadow-2xs backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Disponible para proyectos y prácticas • Chimbote, Perú</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0284C7] font-mono block">
                Portafolio Personal
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.08] font-heading">
                Lionel Aguirre
              </h1>
              <p className="text-lg sm:text-xl font-bold text-slate-700 font-heading">
                Estudiante de Ingeniería de Sistemas e Informática
              </p>
            </div>

            {/* Natural, honest statement */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              Soy de <strong className="text-slate-800 font-semibold">Chimbote, Perú</strong> y estudio en la UTP. Me apasiona crear aplicaciones móviles para Android, páginas web interactivas y software conectado a bases de datos. Me enfoco en aprender constantemente, cuidar los detalles y colaborar con entusiasmo en equipo.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-mono font-medium text-slate-700 border border-slate-200 shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Chimbote, Perú</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-mono font-medium text-slate-700 border border-slate-200 shadow-2xs">
                <GraduationCap className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>Universidad Tecnológica del Perú</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-mono font-medium text-slate-700 border border-slate-200 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Certificado Cisco en Ciberseguridad</span>
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#proyectos"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("proyectos");
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenCv && (
                <button
                  type="button"
                  onClick={onOpenCv}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-xs uppercase tracking-wider transition-all shadow-2xs hover:-translate-y-0.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#0284C7]" />
                  <span>Ver mi CV</span>
                </button>
              )}

              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-2xs hover:-translate-y-0.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden bg-white border-2 border-slate-200 shadow-2xl group">
              <img
                src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
                alt={profile.name}
                className="w-full h-full object-cover object-top filter contrast-105 group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-base font-bold block font-heading">
                  {profile.fullName}
                </span>
                <span className="text-xs text-sky-300 font-mono block">
                  Chimbote, Perú • UTP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};