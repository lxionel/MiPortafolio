import React from "react";
import { ArrowUp, Mail, Phone, Code2 } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PageId } from "../types";

interface FooterProps {
  onNavigate?: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNav = (page: PageId, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <footer className="border-t border-slate-800 bg-[#0B132B] py-12 text-slate-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-teal-400 text-slate-950 flex items-center justify-center font-bold text-xs shadow-xs">
              LA
            </div>
            <div>
              <span className="font-bold text-white text-sm block font-heading">
                {profile.name}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Chimbote, Perú • UTP
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate-400">
            <a
              href="#inicio"
              onClick={(e) => handleNav("inicio", e)}
              className="hover:text-white transition-colors"
            >
              Inicio
            </a>
            <a
              href="#proyectos"
              onClick={(e) => handleNav("proyectos", e)}
              className="hover:text-white transition-colors"
            >
              Proyectos
            </a>
            <a
              href="#sobre-mi"
              onClick={(e) => handleNav("sobre-mi", e)}
              className="hover:text-white transition-colors"
            >
              Sobre Mí
            </a>
            <a
              href="#contacto"
              onClick={(e) => handleNav("contacto", e)}
              className="hover:text-white transition-colors"
            >
              Contacto
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2.5 rounded-full bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              aria-label="Correo"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#0284C7] transition-all ml-2 cursor-pointer"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Lionel Davor Aguirre Gomero • Chimbote, Perú
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-slate-500" />
            <span>React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};