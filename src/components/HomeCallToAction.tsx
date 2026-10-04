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
    <section className="py-16 sm:py-20 bg-[#F5EFE6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF7F2] border-2 border-[#E2D7C7] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              CONVERSEMOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight">
              ¿Tienes una idea en mente o buscas sumar a tu equipo?
            </h2>
            <p className="text-sm sm:text-base text-[#5F5646] font-normal leading-relaxed">
              Siempre estoy con la mejor disposición de aprender, colaborar y aportar con dedicación. Escríbeme y platiquemos sobre cómo puedo ayudarte.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Escríbeme por WhatsApp</span>
            </a>

            {onNavigate && (
              <button
                type="button"
                onClick={() => onNavigate("contacto")}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white font-bold text-xs uppercase tracking-wider transition-all shadow-xs hover:-translate-y-0.5 cursor-pointer"
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
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] border border-[#E2D7C7] font-bold text-xs uppercase tracking-wider transition-all"
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
