import React, { useState } from "react";
import { ShieldCheck, ZoomIn, X, MapPin, GraduationCap, FileText, ArrowRight } from "lucide-react";
import { profile } from "../data/profile";
import { certifications, Certification } from "../data/certifications";
import { PageId } from "../types";
import { SkillInspector } from "./SkillInspector";
import { EngineeringTimeline } from "./EngineeringTimeline";
import { CvModal } from "./CvModal";

interface AboutProps {
  onNavigate?: (page: PageId) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [isCvOpen, setIsCvOpen] = useState<boolean>(false);

  return (
    <section id="sobre-mi" className="py-20 md:py-28 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="relative space-y-3">
          <div className="inline-block">
            <span className="sticker-banner -rotate-2 text-xs tracking-wider uppercase">
              TRAYECTORIA & COMPETENCIAS TÉCNICAS
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#2D2A24] tracking-tight uppercase font-sans">
            SOBRE MÍ
          </h2>
          <p className="text-[#5F5646] text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
            Ingeniero de Sistemas e Informática con enfoque en desarrollo transaccional de alto rigor, arquitecturas móviles offline-first y seguridad defensiva.
          </p>
        </div>

        {/* Top Split: Bio Card & Cisco Credential */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Portrait & Education */}
          <div className="lg:col-span-5 space-y-6">
            {/* Identity Card */}
            <div className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-6 sm:p-7 shadow-2xs space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#EAE0D2] border border-[#E2D7C7] shrink-0">
                  <img
                    src={`${import.meta.env.BASE_URL}${profile.photoUrl}`}
                    alt={profile.name}
                    className="w-full h-full object-cover object-top filter contrast-105"
                  />
                </div>
                <div className="space-y-0.5">
                  <h3 className="text-xl font-black text-[#2D2A24]">
                    {profile.fullName}
                  </h3>
                  <span className="text-xs font-mono font-bold text-[#FF8400] block">
                    {profile.title}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#5F5646] font-medium pt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#FF8400]" />
                    <span>{profile.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed">
                {profile.shortBio}
              </p>

              {/* Education Box */}
              <div className="p-4 rounded-2xl bg-[#EAE0D2]/50 border border-[#E2D7C7] flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#E2D7C7] text-[#2D2A24] shrink-0">
                  <GraduationCap className="w-5 h-5 text-[#FF8400]" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-xs font-mono font-bold uppercase text-[#5F5646]">
                    FORMACIÓN PROFESIONAL
                  </span>
                  <h4 className="text-sm font-bold text-[#2D2A24]">
                    Universidad Tecnológica del Perú (UTP)
                  </h4>
                  <p className="text-xs text-[#5F5646]">
                    Ingeniería de Sistemas e Informática • En curso
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsCvOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#FF8400] group-hover:text-white" />
                  <span>Ver / Imprimir CV</span>
                </button>

                {onNavigate && (
                  <button
                    type="button"
                    onClick={() => onNavigate("contacto")}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] text-xs font-bold uppercase tracking-wider transition-colors border border-[#E2D7C7] cursor-pointer"
                  >
                    <span>Contactar</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Cisco Cybersecurity Credential Card */}
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-6 space-y-4 shadow-2xs hover:border-[#D3C5B2] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-[#EAE0D2] text-[#2D2A24]">
                      <ShieldCheck className="w-6 h-6 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#2D2A24]">
                        {cert.title}
                      </h4>
                      <span className="text-xs text-[#5F5646] font-medium block">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#5F5646] bg-[#EAE0D2] px-2.5 py-1 rounded-md">
                    {cert.date}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5F5646] leading-relaxed font-medium">
                  {cert.description}
                </p>

                <div className="pt-3 border-t border-[#E2D7C7] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-800 font-mono">
                      {cert.score} • Acreditado
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Ver Certificado</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Interactive Skill Inspector */}
          <div className="lg:col-span-7">
            <SkillInspector />
          </div>
        </div>

        {/* Engineering Timeline */}
        <EngineeringTimeline />
      </div>

      {/* Cisco Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2D2A24]/75 backdrop-blur-xs">
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 cursor-pointer"
          />

          <div className="relative z-10 max-w-3xl w-full bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2D7C7] bg-[#EAE0D2]">
              <div>
                <h3 className="font-bold text-[#2D2A24] text-sm sm:text-base">
                  {selectedCert.title} - {selectedCert.issuer}
                </h3>
                <span className="text-xs text-[#5F5646] font-mono">
                  ID: {selectedCert.verificationId}
                </span>
              </div>
              <button
                onClick={() => setSelectedCert(null)}
                className="p-2 rounded-xl text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#E2D7C7] transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-5 sm:p-7 flex flex-col items-center justify-center bg-[#FAF7F2]">
              <img
                src={`${import.meta.env.BASE_URL}${selectedCert.image}`}
                alt={selectedCert.title}
                className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-md border border-[#E2D7C7]"
              />
              <span className="text-xs text-[#5F5646] font-mono font-medium mt-4">
                {selectedCert.verificationNote} • Calificación Oficial: {selectedCert.score}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CV Modal */}
      <CvModal isOpen={isCvOpen} onClose={() => setIsCvOpen(false)} />
    </section>
  );
};