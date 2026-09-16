import React from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="pt-32 pb-16 md:pt-44 md:pb-24 bg-[#fafafa] border-b border-slate-200/60"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Presentation & Value */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            {/* Status dot */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Disponible para proyectos & consultoría</span>
            </div>

            {/* Name & Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                {profile.name}
              </h1>
              <div className="text-lg sm:text-xl font-medium text-slate-600">
                {profile.title}
              </div>
            </div>

            {/* Concise Value Statement */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
              {profile.subtitle}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#proyectos"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all shadow-xs hover:-translate-y-0.5"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contacto"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 font-semibold text-sm transition-all shadow-2xs"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Contactar</span>
              </a>

              <div className="flex items-center gap-1.5 ml-1">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors shadow-2xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Location & Focus */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
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
            <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-lg">
              <img
                src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
                alt={profile.name}
                className="w-full h-full object-cover object-top filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-xs font-semibold block">
                  {profile.fullName}
                </span>
                <span className="text-[11px] text-slate-300">
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