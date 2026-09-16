import React from "react";
import { ArrowUp, Mail, Phone, Terminal } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-900">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400">
              LA
            </div>
            <div>
              <span className="font-semibold text-white text-sm block">
                {profile.name}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {profile.title}
              </span>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
            <a href="#hero" className="hover:text-cyan-400 transition-colors">
              Inicio
            </a>
            <a href="#estacion-3d" className="hover:text-cyan-400 transition-colors">
              Estación 3D
            </a>
            <a href="#proyectos" className="hover:text-cyan-400 transition-colors">
              Proyectos
            </a>
            <a href="#habilidades" className="hover:text-cyan-400 transition-colors">
              Habilidades
            </a>
            <a href="#certificaciones" className="hover:text-cyan-400 transition-colors">
              Certificaciones
            </a>
            <a href="#contacto" className="hover:text-cyan-400 transition-colors">
              Contacto
            </a>
          </div>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="p-2 rounded-lg bg-slate-900 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Correo"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all ml-2"
              title="Volver arriba"
              aria-label="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Details */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Lionel Aguirre Gomero. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Desarrollado con React 19, TypeScript, Tailwind CSS & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};