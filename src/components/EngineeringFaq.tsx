import React, { useState } from "react";
import { HelpCircle, ChevronDown, ShieldCheck, Database, FileCode, Clock, MessageSquare } from "lucide-react";
import { profile } from "../data/profile";

interface FaqItem {
  id: string;
  category: "arquitectura" | "seguridad" | "entregables" | "disponibilidad";
  icon: React.ComponentType<{ className?: string }>;
  question: string;
  answer: string;
  keyPoints: string[];
}

const FAQS: FaqItem[] = [
  {
    id: "arquitectura",
    category: "arquitectura",
    icon: Database,
    question: "¿Qué estándares de arquitectura y calidad aplicas en el desarrollo de software?",
    answer: "Aplico arquitecturas limpias y desacopladas según el tipo de solución. En sistemas backend implemento transacciones ACID estrictas con procedimientos almacenados en Microsoft SQL Server para asegurar atomicidad y consistencia en caja y stock. En aplicaciones móviles utilizo Kotlin nativo con Jetpack Room bajo arquitectura MVVM y filosofía 100% Offline-First.",
    keyPoints: ["Transacciones ACID Atómicas", "Arquitectura MVVM Desacoplada", "Persistencia Local Offline-First"],
  },
  {
    id: "seguridad",
    category: "seguridad",
    icon: ShieldCheck,
    question: "¿Cómo garantizas la seguridad y protección de los datos en tus sistemas?",
    answer: "Alineado con los estándares acreditados por Cisco Networking Academy, implemento seguridad por diseño fundamentada en la tríada CIA (Confidencialidad, Integridad y Disponibilidad). Esto incluye sanitización estricta de parámetros contra inyecciones SQL y ataques XSS, principio de mínimo privilegio en perfiles de base de datos y validación de integridad.",
    keyPoints: ["Acreditación Cisco Oficial (94.7%)", "Sanitización Estricta contra SQLi / XSS", "Principio de Mínimo Privilegio"],
  },
  {
    id: "entregables",
    category: "entregables",
    icon: FileCode,
    question: "¿Cuáles son los entregables técnicos incluidos en cada proyecto?",
    answer: "Cada desarrollo se entrega con repositorio de código fuente estructurado en GitHub o control de versiones corporativo, scripts DDL/DML de base de datos con stored procedures normalizados, documentación de arquitectura técnica y pruebas de integración para puesta en marcha transparente.",
    keyPoints: ["Repositorio Git Limpio", "Scripts SQL Normalizados", "Ficha de Arquitectura & Configuración"],
  },
  {
    id: "disponibilidad",
    category: "disponibilidad",
    icon: Clock,
    question: "¿Cuál es tu disponibilidad y modalidad de trabajo?",
    answer: "Opero en modalidad remota desde Lima, Perú (zona horaria UTC-5). Cuento con disponibilidad para proyectos integrales por hitos, consultoría técnica en arquitectura transaccional o incorporación formal a equipos de ingeniería de software con comunicación ágil continua.",
    keyPoints: ["Remoto (Lima UTC-5)", "Respuesta ágil en horario laboral", "Flexibilidad por Hitos o Incorporación"],
  },
];

export const EngineeringFaq: React.FC = () => {
  const [openId, setOpenId] = useState<string>("arquitectura");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? "" : id);
  };

  const filteredFaqs = selectedFilter === "all"
    ? FAQS
    : FAQS.filter((f) => f.category === selectedFilter);

  return (
    <div className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-6 sm:p-9 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PREGUNTAS FRECUENTES DE INGENIERÍA</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A24] tracking-tight uppercase">
            Criterios de Desarrollo & Metodología
          </h3>
          <p className="text-xs sm:text-sm text-[#5F5646] font-medium max-w-2xl leading-relaxed">
            Respuestas directas sobre estándares de calidad, arquitectura transaccional, seguridad y forma de trabajo.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-auto">
          <button
            onClick={() => setSelectedFilter("all")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-[#2D2A24] text-white"
                : "bg-[#EAE0D2] text-[#5F5646] hover:bg-[#E2D7C7]"
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setSelectedFilter("arquitectura")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedFilter === "arquitectura"
                ? "bg-[#2D2A24] text-white"
                : "bg-[#EAE0D2] text-[#5F5646] hover:bg-[#E2D7C7]"
            }`}
          >
            Arquitectura
          </button>
          <button
            onClick={() => setSelectedFilter("seguridad")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedFilter === "seguridad"
                ? "bg-[#2D2A24] text-white"
                : "bg-[#EAE0D2] text-[#5F5646] hover:bg-[#E2D7C7]"
            }`}
          >
            Seguridad
          </button>
          <button
            onClick={() => setSelectedFilter("disponibilidad")}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
              selectedFilter === "disponibilidad"
                ? "bg-[#2D2A24] text-white"
                : "bg-[#EAE0D2] text-[#5F5646] hover:bg-[#E2D7C7]"
            }`}
          >
            Disponibilidad
          </button>
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          const Icon = faq.icon;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? "bg-white border-[#2D2A24]/30 shadow-xs"
                  : "bg-white/60 hover:bg-white border-[#E2D7C7]"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleOpen(faq.id)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? "bg-[#2D2A24] text-white"
                        : "bg-[#EAE0D2] text-[#5F5646]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#2D2A24]">
                    {faq.question}
                  </h4>
                </div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-[#EAE0D2]" : "bg-transparent text-[#5F5646]"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 space-y-4 border-t border-[#E2D7C7]/50 text-xs sm:text-sm text-[#5F5646] leading-relaxed">
                  <p>{faq.answer}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {faq.keyPoints.map((point) => (
                      <span
                        key={point}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#EAE0D2]/70 text-[#2D2A24] font-mono font-bold text-xs"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF8400]"></span>
                        <span>{point}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Callout */}
      <div className="p-5 rounded-2xl bg-[#EAE0D2]/60 border border-[#E2D7C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-0.5">
          <span className="text-xs font-mono font-bold text-[#2D2A24] uppercase">
            ¿Tienes una consulta técnica específica que no figura aquí?
          </span>
          <p className="text-xs text-[#5F5646]">
            Conversemos directamente sobre los detalles de tu arquitectura.
          </p>
        </div>

        <a
          href={profile.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Consultar por WhatsApp</span>
        </a>
      </div>
    </div>
  );
};
