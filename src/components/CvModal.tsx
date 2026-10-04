import React, { useEffect } from "react";
import { X, Printer, MapPin, Mail, Phone, ShieldCheck } from "lucide-react";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { certifications } from "../data/certifications";
import { GithubIcon, LinkedinIcon } from "./icons";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#2D2A24]/75 backdrop-blur-xs overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 cursor-pointer" />

      {/* Modal Dialog */}
      <div className="relative z-10 max-w-4xl w-full bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Top Action Bar */}
        <div className="px-6 py-4 bg-[#EAE0D2] border-b border-[#E2D7C7] flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#5F5646] uppercase tracking-wider">
              CURRICULUM VITAE PROFESIONAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF8400] hover:bg-[#2D2A24] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#E2D7C7] text-[#2D2A24] hover:bg-[#D8CDBE] transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Document */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 bg-white text-[#2D2A24] font-sans printable-cv">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight uppercase font-sans">
                {profile.fullName}
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#FF8400]">
                {profile.title} • UTP
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#5F5646] pt-1 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#FF8400]" />
                  <span>{profile.location}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#FF8400]" />
                  <span>{profile.email}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-[#FF8400]" />
                  <span>{profile.phone}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 no-print">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Perfil Profesional */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              PERFIL PROFESIONAL
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              Estudiante de Ingeniería de Sistemas e Informática en la Universidad Tecnológica del Perú (UTP). Apasionado por el desarrollo de aplicaciones prácticas y bien estructuradas, con experiencia construyendo aplicaciones móviles nativas para Android en Kotlin, sistemas con bases de datos en Java y SQL Server, y aplicaciones web con React y TypeScript. Me caracterizo por mi responsabilidad, iniciativa de aprendizaje continuo, buena comunicación y capacidad para colaborar efectivamente en equipo.
            </p>
          </div>

          {/* Competencias y Habilidades */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              COMPETENCIAS & HABILIDADES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-[#2D2A24] block">Desarrollo & Bases de Datos</span>
                <span className="text-slate-600 leading-relaxed block">
                  Java, Microsoft SQL Server, Consultas SQL, Procedimientos Almacenados, Git, GitHub.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-[#2D2A24] block">Móvil & Web</span>
                <span className="text-slate-600 leading-relaxed block">
                  Kotlin (Android Studio), SQLite local, React, TypeScript, HTML5, CSS3, Tailwind CSS.
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-[#2D2A24] block">Habilidades Humanas</span>
                <span className="text-slate-600 leading-relaxed block">
                  Trabajo en equipo, resolución de problemas, ganas de aprender, responsabilidad y adaptabilidad.
                </span>
              </div>
            </div>
          </div>

          {/* Proyectos Relevantes */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              PROYECTOS DESARROLLADOS
            </h2>
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#2D2A24]">{proj.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 font-bold text-slate-700">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.tags.map((t) => (
                      <span key={t} className="text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Formación & Certificaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                EDUCACIÓN
              </h2>
              <div>
                <span className="text-sm font-bold text-[#2D2A24] block">
                  Ingeniería de Sistemas e Informática
                </span>
                <span className="text-xs text-[#5F5646] block">
                  Universidad Tecnológica del Perú (UTP)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  En curso • Formación Universitaria
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                CERTIFICACIONES
              </h2>
              {certifications.map((c) => (
                <div key={c.id}>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-sm font-bold text-[#2D2A24]">{c.title}</span>
                  </div>
                  <span className="text-xs text-[#5F5646] block">
                    {c.issuer} • {c.date}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-700 font-medium block">
                    ID de Acreditación: {c.verificationId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
