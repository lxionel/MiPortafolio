import React, { useState } from "react";
import { ShieldCheck, ZoomIn, X } from "lucide-react";
import { profile } from "../data/profile";
import { skillGroups } from "../data/skills";
import { certifications, Certification } from "../data/certifications";

export const About: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  return (
    <section id="perfil" className="py-24 md:py-32 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Summary & Cisco Credential */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight uppercase">
                Perfil Técnico
              </h2>
              <p className="text-sm sm:text-base text-[#5F5646] font-medium leading-relaxed">
                {profile.shortBio}
              </p>
            </div>

            {/* Cisco Cybersecurity Credential Card */}
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="bg-[#EAE0D2]/60 border border-[#E2D7C7] rounded-2xl p-5 space-y-3 shadow-2xs hover:border-[#D3C5B2] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-[#E2D7C7] text-[#2D2A24]">
                      <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#2D2A24]">
                        {cert.title}
                      </h4>
                      <span className="text-xs text-[#5F5646] font-medium block">
                        {cert.issuer}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#5F5646] bg-[#E2D7C7] px-2 py-0.5 rounded">
                    {cert.date}
                  </span>
                </div>

                <p className="text-xs text-[#5F5646] leading-relaxed">
                  {cert.description}
                </p>

                <div className="pt-2 border-t border-[#E2D7C7] flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 font-mono">
                    {cert.score}
                  </span>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Ver Certificado</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Categorized Skills Matrix */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-black text-[#2D2A24] uppercase">
              Habilidades & Tecnologías
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skillGroups.map((group) => (
                <div
                  key={group.category}
                  className="bg-[#EAE0D2]/60 border border-[#E2D7C7] rounded-2xl p-5 space-y-3 shadow-2xs hover:border-[#D3C5B2] transition-colors"
                >
                  <h4 className="text-sm font-black text-[#2D2A24] uppercase tracking-wide">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md bg-[#E2D7C7] text-xs font-mono font-bold text-[#2D2A24]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Warm Certificate Modal */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2D2A24]/70 backdrop-blur-xs">
          <div
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0"
          />

          <div className="relative z-10 max-w-3xl w-full bg-[#F5EFE6] border border-[#E2D7C7] rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
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
                className="p-2 rounded-xl text-[#5F5646] hover:text-[#2D2A24] hover:bg-[#E2D7C7] transition-colors"
                aria-label="Cerrar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-auto p-5 flex flex-col items-center justify-center bg-[#F5EFE6]">
              <img
                src={`${import.meta.env.BASE_URL}${selectedCert.image}`}
                alt={selectedCert.title}
                className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-md border border-[#E2D7C7]"
              />
              <span className="text-xs text-[#5F5646] font-mono font-medium mt-3">
                {selectedCert.verificationNote} • {selectedCert.score}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};