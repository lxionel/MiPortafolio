import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, ExternalLink } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Estación 3D", href: "#estacion-3d" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Habilidades", href: "#habilidades" },
    { label: "Certificaciones", href: "#certificaciones" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/40 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="group flex items-center gap-3 focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.35)] transition-all">
            <span className="text-base tracking-wider">LA</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-100 tracking-tight group-hover:text-cyan-300 transition-colors text-sm sm:text-base">
              Lionel Aguirre
            </span>
            <span className="text-[11px] font-mono text-slate-400 hidden sm:block">
              Ingeniero de Sistemas
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-300 hover:text-cyan-300 hover:bg-slate-800/80 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            aria-label="GitHub de Lionel Aguirre"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-cyan-400 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            aria-label="LinkedIn de Lionel Aguirre"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contacto"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs font-mono font-medium transition-all shadow-[0_0_12px_rgba(56,189,248,0.15)]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Contactar</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800/80 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-all"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 bg-slate-900"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 bg-slate-900"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono"
            >
              <span>Contactar</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};