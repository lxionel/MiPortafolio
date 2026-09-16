import React from "react";
import { ArrowUp, Mail, Phone, Code2 } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[#E2D7C7] bg-[#EAE0D2] py-14 text-[#5F5646]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#E2D7C7]">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#2D2A24] flex items-center justify-center font-mono font-bold text-white text-xs">
              LA
            </div>
            <div>
              <span className="font-bold text-[#2D2A24] text-sm block">
                {profile.name}
              </span>
              <span className="text-xs font-mono text-[#5F5646]">
                {profile.title}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-bold uppercase tracking-wider text-[#5F5646]">
            <a href="#hero" className="hover:text-[#2D2A24] transition-colors">
              Inicio
            </a>
            <a href="#proyectos" className="hover:text-[#2D2A24] transition-colors">
              Proyectos
            </a>
            <a href="#perfil" className="hover:text-[#2D2A24] transition-colors">
              Perfil & Habilidades
            </a>
            <a href="#contacto" className="hover:text-[#2D2A24] transition-colors">
              Contacto
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2.5 rounded-full bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors"
              aria-label="Correo"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-full bg-[#E2D7C7] text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#D8CDBE] transition-all ml-2"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#5F5646]">
          <div>
            &copy; {new Date().getFullYear()} Lionel Davor Aguirre Gomero. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-3.5 h-3.5 text-[#5F5646]" />
            <span>React, TypeScript & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};