import React from "react";
import { Smartphone, Database, Globe, ShieldCheck, ArrowRight } from "lucide-react";
import { PageId } from "../types";

interface WhatIDoProps {
  onNavigate?: (page: PageId) => void;
}

export const WhatIDo: React.FC<WhatIDoProps> = ({ onNavigate }) => {
  const areas = [
    {
      icon: Smartphone,
      title: "Aplicaciones Móviles Android",
      description: "Desarrollo aplicaciones nativas con Kotlin para celulares. Me gusta que sean rápidas, intuitivas y que puedan guardar los datos directamente en el teléfono sin depender de internet, como mi proyecto MetaBit.",
      tags: ["Kotlin", "Android Studio", "SQLite / Room Local"],
      iconBg: "bg-sky-50 text-sky-600 border-sky-100",
      projectLink: "proyectos",
    },
    {
      icon: Database,
      title: "Sistemas & Bases de Datos",
      description: "Creación de software de escritorio con Java y Microsoft SQL Server para administrar ventas, inventarios y clientes de forma ordenada, como el sistema POS de PeriPollos.",
      tags: ["Java", "SQL Server", "Consultas SQL", "Gestión de Stock"],
      iconBg: "bg-teal-50 text-teal-600 border-teal-100",
      projectLink: "proyectos",
    },
    {
      icon: Globe,
      title: "Desarrollo Web Frontend",
      description: "Construyo páginas web interactivas y adaptadas a cualquier pantalla usando React y TypeScript. Creé la carta digital interactiva de PeriPollos que genera comandas directas a WhatsApp.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Diseño Responsive"],
      iconBg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      projectLink: "proyectos",
    },
    {
      icon: ShieldCheck,
      title: "Ciberseguridad & Buenas Prácticas",
      description: "Cuento con certificación oficial de Cisco Networking Academy en fundamentos de seguridad, enfocado en cuidar la privacidad de la información y prevenir errores comunes al programar.",
      tags: ["Certificación Cisco", "Protección de Datos", "Buenas Prácticas"],
      iconBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      projectLink: "sobre-mi",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F0F4F8] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7]">
            ÁREAS DE ENFOQUE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Lo que me gusta construir
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Me enfoco en crear software práctico, entendible y que resuelva problemas reales del día a día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-7 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${area.iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      {area.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-mono font-medium text-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate(area.projectLink as PageId)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] hover:text-[#0369A1] transition-colors cursor-pointer"
                    >
                      <span>Ver más</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
