import React, { useState } from "react";
import { GraduationCap, ShieldCheck, Smartphone, Database, Globe, Calendar } from "lucide-react";

interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  highlights: string[];
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "2024 - Presente",
    title: "Ingeniería de Sistemas e Informática",
    institution: "Universidad Tecnológica del Perú (UTP)",
    category: "Formación Profesional",
    icon: GraduationCap,
    description: "Formación universitaria de pregrado enfocada en diseño y arquitectura de software, estructuras de datos avanzadas, modelado relacional y metodologías de ingeniería.",
    highlights: ["Sistemas de Bases de Datos Relacionales", "Ingeniería de Requerimientos", "Arquitectura de Software"],
  },
  {
    year: "2024",
    title: "Certificación Oficial en Ciberseguridad",
    institution: "Cisco Networking Academy",
    category: "Acreditación de Seguridad",
    icon: ShieldCheck,
    description: "Certificación oficial aprobada con calificación sobresaliente (94.7%). Dominio de la tríada de seguridad CIA (Confidencialidad, Integridad, Disponibilidad) y mitigación de vulnerabilidades.",
    highlights: ["Nota: 94.7% / 100", "Auditoría de Integridad de Datos", "Defensa en Profundidad"],
  },
  {
    year: "2024 - 2025",
    title: "MetaBit: Arquitectura Móvil Offline-First",
    institution: "Proyecto Propio / Android SDK",
    category: "Desarrollo Móvil",
    icon: Smartphone,
    description: "Investigación e implementación de persistencia local reactiva con Android Jetpack Room (SQLite). Desarrollo en Kotlin puro bajo arquitectura limpia MVVM.",
    highlights: ["100% Funcional sin Internet", "Kotlin Coroutines & Flow", "Cero Dependencia Cloud"],
  },
  {
    year: "2025",
    title: "Sistema POS PeriPollos (Java 17 & SQL Server)",
    institution: "Sistema Transaccional en Producción",
    category: "Backend & Persistencia",
    icon: Database,
    description: "Construcción integral de un punto de venta y gestión de stock. Implementación de transacciones atómicas ACID mediante procedimientos almacenados en Microsoft SQL Server.",
    highlights: ["Transacciones ACID Atómicas", "Procedimientos Almacenados T-SQL", "JDBC Concurrency Pool"],
  },
  {
    year: "2025",
    title: "PeriPollos Web & Pedidos Online",
    institution: "Despliegue Global en Netlify",
    category: "Frontend & Jamstack",
    icon: Globe,
    description: "Desarrollo de aplicación web SPA optimizada para dispositivos móviles con React y TypeScript, integrando pedidos en tiempo real con la API de WhatsApp.",
    highlights: ["Score Lighthouse 98/100", "Carga en menos de 0.8s", "CI/CD Automatizado"],
  },
];

export const EngineeringTimeline: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  return (
    <section className="py-14 border-t border-[#E2D7C7]">
      <div className="space-y-3 mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>TRAYECTORIA & HITOS TÉCNICOS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A24] tracking-tight uppercase">
          Evolución de Aprendizaje & Producción
        </h3>
        <p className="text-xs sm:text-sm text-[#5F5646] font-medium max-w-2xl leading-relaxed">
          Recorrido cronológico desde la formación académica formal en UTP hasta la implementación de sistemas en producción y certificaciones internacionales.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timeline Navigation List */}
        <div className="lg:col-span-5 space-y-3">
          {TIMELINE_EVENTS.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedIdx(idx)}
                className={`w-full text-left p-4.5 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? "bg-[#2D2A24] text-white border-[#2D2A24] shadow-md -translate-y-0.5"
                    : "bg-[#FAF7F2] hover:bg-[#EAE0D2] text-[#2D2A24] border-[#E2D7C7]"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? "bg-[#FF8400] text-white" : "bg-[#E2D7C7] text-[#2D2A24]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-bold uppercase tracking-wider ${
                        isSelected ? "text-[#FF8400]" : "text-[#5F5646]"
                      }`}
                    >
                      {item.year}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        isSelected ? "bg-white/10 text-slate-300" : "bg-[#EAE0D2] text-[#5F5646]"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold truncate">
                    {item.title}
                  </h4>
                  <p
                    className={`text-xs truncate ${
                      isSelected ? "text-slate-300" : "text-[#5F5646]"
                    }`}
                  >
                    {item.institution}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Event Detail Card */}
        <div className="lg:col-span-7 bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-7 sm:p-9 shadow-sm space-y-6">
          {(() => {
            const active = TIMELINE_EVENTS[selectedIdx];
            const Icon = active.icon;
            return (
              <>
                <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF8400] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider block">
                        {active.year} • {active.category}
                      </span>
                      <h4 className="text-xl sm:text-2xl font-black text-[#2D2A24] uppercase">
                        {active.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F5646]">
                    ORGANIZACIÓN / CONTEXTO:
                  </span>
                  <p className="text-sm font-bold text-[#2D2A24]">
                    {active.institution}
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#5F5646]">
                    DETALLE DEL HITO:
                  </span>
                  <p className="text-sm text-[#5F5646] font-medium leading-relaxed">
                    {active.description}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-[#E2D7C7]">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
                    RESULTADOS & APRENDIZAJES CLAVE:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {active.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-white border border-[#E2D7C7] text-xs font-mono font-bold text-[#2D2A24] flex items-center gap-2"
                      >
                        <span className="w-2 h-2 rounded-full bg-[#FF8400] shrink-0"></span>
                        <span className="leading-tight">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
};
