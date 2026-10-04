import React from "react";
import { MessageSquare, Mail, ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { PageId } from "../types";
import { LinkedinIcon } from "./icons";

interface HomeCallToActionProps {
  onNavigate?: (page: PageId) => void;
}

export const HomeCallToAction: React.FC<HomeCallToActionProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 sm:py-24 bg-[#F0F4F8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-white border border-slate-200 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-md overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(2,132,199,0.08),rgba(255,255,255,0))] pointer-events-none" />

          <div className="relative max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7]">
              CONVERSEMOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              ¿Tienes una idea en mente o buscas sumar a tu equipo?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Siempre tengo la mejor disposición de aprender, colaborar y aportar con dedicación. Escríbeme y platiquemos sobre cómo puedo ayudarte desde Chimbote para cualquier lugar.
            </p>
          </div>

          <div className="relative flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Escríbeme por WhatsApp</span>
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("contacto")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-900 hover:bg-[#0284C7] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Formulario de Contacto</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs uppercase tracking-wider transition-all"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>Ver mi LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
