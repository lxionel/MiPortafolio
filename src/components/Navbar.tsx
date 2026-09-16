import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Inicio", href: "#hero" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Perfil & Habilidades", href: "#perfil" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[#F5EFE6]/90 backdrop-blur-md border-b border-[#E2D7C7] shadow-xs py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-[#2D2A24] text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-[#FF8400] transition-colors">
            LA
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[#2D2A24] text-sm sm:text-base leading-tight">
              {profile.name}
            </span>
            <span className="text-[11px] font-mono font-medium text-[#5F5646]">
              Ingeniero de Sistemas
            </span>
          </div>
        </a>

        {/* Desktop Links (Centered Pill) */}
        <nav className="hidden md:flex items-center gap-1 bg-[#EAE0D2]/80 p-1 rounded-full border border-[#E2D7C7]">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#F5EFE6] transition-all uppercase tracking-wide"
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
            className="p-2 rounded-xl text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#EAE0D2] transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#EAE0D2] transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contacto"
            className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <span>Contactar</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-[#EAE0D2] text-[#2D2A24] hover:bg-[#E2D7C7]"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F5EFE6] border-b border-[#E2D7C7] px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#EAE0D2]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#E2D7C7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#5F5646] hover:text-[#2D2A24] bg-[#EAE0D2]"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[#5F5646] hover:text-[#2D2A24] bg-[#EAE0D2]"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contacto"
              onClick={() => setMobileOpen(false)}
              className="px-5 py-2 rounded-full bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider"
            >
              Contactar
            </a>
          </div>
        </div>
      )}
    </header>
  );
};