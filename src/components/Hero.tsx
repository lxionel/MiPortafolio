import React from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-20 md:pt-44 md:pb-28 bg-[#F5EFE6] border-b border-[#E2D7C7]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Presentation & Value */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#5F5646] bg-[#EAE0D2] px-4 py-1.5 rounded-full border border-[#E2D7C7]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span className="uppercase tracking-wider">DISPONIBLE PARA PROYECTOS</span>
            </div>

            {/* Name & Tilted Banner */}
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#2D2A24] leading-tight uppercase font-sans">
                {profile.name}
              </h1>
              <div>
                <span className="sticker-banner -rotate-2 text-xs sm:text-sm tracking-wider uppercase">
                  ING. DE SISTEMAS E INFORMÁTICA
                </span>
              </div>
            </div>

            {/* Concise Value Statement */}
            <p className="text-base sm:text-lg text-[#5F5646] max-w-xl font-medium leading-relaxed">
              {profile.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <a
                href="#proyectos"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contacto"
                className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] border border-[#E2D7C7] font-bold text-xs uppercase tracking-wider transition-all"
              >
                <Mail className="w-4 h-4 text-[#5F5646]" />
                <span>Contactar</span>
              </a>

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

            {/* Location & Focus */}
            <div className="pt-4 flex items-center gap-4 text-xs text-[#5F5646] font-mono font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF8400]" />
                <span>{profile.location}</span>
              </div>
              <span>•</span>
              <span>Java 17 & SQL Server (ACID)</span>
              <span>•</span>
              <span>Kotlin Android (Offline-First)</span>
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D2A24]/60 via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-sm font-bold block">
                  {profile.fullName}
                </span>
                <span className="text-xs font-mono text-[#EAE0D2]">
                  Ingeniero de Sistemas e Informática
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};