import React from "react";
import { ArrowRight, Mail, MapPin, FileText, GraduationCap, ShieldCheck } from "lucide-react";
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
      className="pt-32 pb-16 md:pt-40 md:pb-24 bg-[#F5EFE6] border-b border-[#E2D7C7]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Friendly, authentic presentation */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#5F5646] bg-[#EAE0D2] px-3.5 py-1.5 rounded-full border border-[#E2D7C7]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Disponible para proyectos y oportunidades</span>
            </div>

            {/* Greeting & Title */}
            <div className="space-y-2">
              <span className="text-sm font-bold uppercase tracking-wider text-[#FF8400] font-mono">
                Hola, bienvenido a mi portafolio
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#2D2A24] leading-tight">
                Soy {profile.name}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-[#5F5646]">
                Estudiante de Ingeniería de Sistemas e Informática (UTP)
              </p>
            </div>

            {/* Natural, honest statement */}
            <p className="text-base sm:text-lg text-[#5F5646] max-w-xl font-normal leading-relaxed">
              Me gusta crear aplicaciones para celular, páginas web interactivas y sistemas con bases de datos. Me considero una persona dedicada, responsable y siempre motivada a seguir aprendiendo y aportando en equipo.
            </p>

            {/* Credential & Location Badges */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D2] text-xs font-mono text-[#2D2A24] border border-[#E2D7C7]">
                <MapPin className="w-3.5 h-3.5 text-[#FF8400]" />
                <span>{profile.location}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D2] text-xs font-mono text-[#2D2A24] border border-[#E2D7C7]">
                <GraduationCap className="w-3.5 h-3.5 text-[#FF8400]" />
                <span>Universidad Tecnológica del Perú</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAE0D2] text-xs font-mono text-[#2D2A24] border border-[#E2D7C7]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Certificado en Ciberseguridad por Cisco</span>
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
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {onOpenCv && (
                <button
                  type="button"
                  onClick={onOpenCv}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#FF8400] group-hover:text-white" />
                  <span>Ver mi CV</span>
                </button>
              )}

              <a
                href="#contacto"
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate("contacto");
                  }
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] border border-[#E2D7C7] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#5F5646]" />
                <span>Escríbeme</span>
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#EAE0D2] hover:bg-[#E2D7C7] border border-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-[#EAE0D2] hover:bg-[#E2D7C7] border border-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden bg-[#EAE0D2] border-2 border-[#E2D7C7] shadow-xl">
              <img
                src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
                alt={profile.name}
                className="w-full h-full object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A24]/70 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-base font-bold block">
                  {profile.fullName}
                </span>
                <span className="text-xs text-[#EAE0D2] font-mono block">
                  Ingeniería de Sistemas e Informática • UTP
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};