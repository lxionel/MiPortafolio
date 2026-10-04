import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PageId, NAV_ITEMS } from "../types";

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(pageId);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F0F4F8]/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick("inicio", e)}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-sky-400 flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition-all border border-slate-700/40">
            LA
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-tight font-sans tracking-tight">
              {profile.name}
            </span>
            <span className="text-[11px] font-mono font-medium text-slate-500">
              Sistemas e Informática • UTP
            </span>
          </div>
        </a>

        {/* Desktop Links (Centered Pill Selector) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-200/70 p-1.5 rounded-full border border-slate-300/60 backdrop-blur-md shadow-2xs">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.hash}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                  isActive
                    ? "bg-[#0F172A] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white border border-slate-200 transition-colors shadow-2xs"
            aria-label="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-white/60 hover:bg-white border border-slate-200 transition-colors shadow-2xs"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="#contacto"
            onClick={(e) => handleNavClick("contacto", e)}
            className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xs ${
              currentPage === "contacto"
                ? "bg-[#0F172A] text-white"
                : "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0369A1] hover:to-[#0284C7] text-white hover:shadow-md"
            }`}
          >
            <span>Hablemos</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#F0F4F8]/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={item.hash}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  isActive
                    ? "bg-[#0F172A] text-white"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/80"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
            <a
              href="#contacto"
              onClick={(e) => handleNavClick("contacto", e)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white text-xs font-bold uppercase tracking-wider shadow-xs"
            >
              Hablemos
            </a>
          </div>
        </div>
      )}
    </header>
  );
};