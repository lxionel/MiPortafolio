import React, { useState } from "react";
import { Mail, Phone, Send, CheckCircle2, ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";
import { PageId } from "../types";
import { LimaClockWidget } from "./LimaClockWidget";
import { ProjectProposalBuilder } from "./ProjectProposalBuilder";

interface ContactProps {
  onNavigate?: (page: PageId) => void;
}

export const Contact: React.FC<ContactProps> = ({ onNavigate: _onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Contacto desde Portafolio - ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hola Lionel,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 bg-[#F5EFE6]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="relative space-y-3">
          <div className="inline-block">
            <span className="sticker-banner -rotate-2 text-xs tracking-wider uppercase">
              CANALES DE COMUNICACIÓN & ALCANCE
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A24] tracking-tight uppercase font-sans">
            CONTACTO
          </h2>
          <p className="text-[#5F5646] text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            Disponible para desarrollo de software transaccional, aplicaciones móviles nativas, consultoría de arquitectura o integración profesional.
          </p>
        </div>

        {/* Top Grid: Direct Channels & Time Widget on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Channels & Lima Clock */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#2D2A24] uppercase">
                Canales Directos
              </h3>
              <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed">
                Elige el canal más cómodo para iniciar una conversación técnica.
              </p>
            </div>

            {/* Lima Live Timezone Widget */}
            <LimaClockWidget />

            {/* Direct Channel Cards */}
            <div className="space-y-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-2xl p-4 flex items-center justify-between group transition-all hover:border-[#D3C5B2] shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#5F5646] uppercase block">
                      WhatsApp Directo
                    </span>
                    <span className="text-sm font-bold text-[#2D2A24]">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5F5646] group-hover:text-[#2D2A24] transition-colors" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-2xl p-4 flex items-center justify-between group transition-all hover:border-[#D3C5B2] shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#EAE0D2] text-[#2D2A24]">
                    <Mail className="w-5 h-5 text-[#FF8400]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#5F5646] uppercase block">
                      Correo Electrónico
                    </span>
                    <span className="text-sm font-bold text-[#2D2A24]">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5F5646] group-hover:text-[#2D2A24] transition-colors" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-2xl p-4 flex items-center justify-between group transition-all hover:border-[#D3C5B2] shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#EAE0D2] text-[#2D2A24]">
                    <LinkedinIcon className="w-5 h-5 text-[#2D2A24]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#5F5646] uppercase block">
                      LinkedIn
                    </span>
                    <span className="text-sm font-bold text-[#2D2A24]">
                      {profile.fullName}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5F5646] group-hover:text-[#2D2A24] transition-colors" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-2xl p-4 flex items-center justify-between group transition-all hover:border-[#D3C5B2] shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#EAE0D2] text-[#2D2A24]">
                    <GithubIcon className="w-5 h-5 text-[#2D2A24]" />
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-[#5F5646] uppercase block">
                      GitHub
                    </span>
                    <span className="text-sm font-bold text-[#2D2A24]">
                      github.com/lxionel
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#5F5646] group-hover:text-[#2D2A24] transition-colors" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-6 sm:p-8 shadow-sm">
            <h3 className="text-xl font-black text-[#2D2A24] uppercase mb-1">
              Enviar Mensaje Directo
            </h3>
            <p className="text-xs text-[#5F5646] mb-6">
              El formulario estructurará tu mensaje para envío inmediato por correo.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-[#EAE0D2] border border-[#D3C5B2] text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#2D2A24]">
                  Mensaje Preparado
                </h4>
                <p className="text-xs text-[#5F5646]">
                  Se ha abierto tu cliente de correo para enviar a {profile.email}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-5 py-2 rounded-full bg-[#2D2A24] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#FF8400] transition-colors shadow-xs cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2D2A24] mb-1.5 uppercase tracking-wider font-mono">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Ing. Carlos Mendoza"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C7] focus:border-[#2D2A24] focus:ring-1 focus:ring-[#2D2A24] text-sm text-[#2D2A24] outline-none transition-all placeholder:text-[#5F5646]/60 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A24] mb-1.5 uppercase tracking-wider font-mono">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@empresa.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C7] focus:border-[#2D2A24] focus:ring-1 focus:ring-[#2D2A24] text-sm text-[#2D2A24] outline-none transition-all placeholder:text-[#5F5646]/60 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2D2A24] mb-1.5 uppercase tracking-wider font-mono">
                    Mensaje / Consulta *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detalles del requerimiento, proyecto o propuesta..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C7] focus:border-[#2D2A24] focus:ring-1 focus:ring-[#2D2A24] text-sm text-[#2D2A24] outline-none transition-all placeholder:text-[#5F5646]/60 resize-none font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Section: Interactive Project Scope / Proposal Builder */}
        <ProjectProposalBuilder />
      </div>
    </section>
  );
};