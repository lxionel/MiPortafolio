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
      description: "Desarrollo aplicaciones nativas en Kotlin para celulares. Me gusta que funcionen de forma rápida y que puedan guardar tus datos de forma local y segura, como mi proyecto MetaBit.",
      tags: ["Kotlin", "Android Studio", "Base de Datos Local"],
      projectLink: "proyectos",
    },
    {
      icon: Database,
      title: "Sistemas & Bases de Datos",
      description: "Creación de software de escritorio con Java y Microsoft SQL Server para administrar ventas, inventarios y clientes de forma ordenada, como el sistema POS de PeriPollos.",
      tags: ["Java", "SQL Server", "Control de Stock", "Ventas"],
      projectLink: "proyectos",
    },
    {
      icon: Globe,
      title: "Desarrollo Web Frontend",
      description: "Construyo páginas web interactivas y adaptadas a cualquier pantalla usando React y TypeScript. Creé la carta digital de PeriPollos que genera pedidos automáticos a WhatsApp.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Web Responsive"],
      projectLink: "proyectos",
    },
    {
      icon: ShieldCheck,
      title: "Ciberseguridad Básica",
      description: "Tengo certificación oficial de Cisco Networking Academy en fundamentos de seguridad, enfocado en cuidar la privacidad de los datos y aplicar buenas prácticas al programar.",
      tags: ["Certificación Cisco", "Protección de Datos", "Buenas Prácticas"],
      projectLink: "sobre-mi",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
            ÁREAS DE ENFOQUE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight">
            Lo que me gusta construir
          </h2>
          <p className="text-sm sm:text-base text-[#5F5646] font-normal leading-relaxed">
            Me enfoco en crear software práctico, entendible y que resuelva problemas del día a día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => {
            const Icon = area.icon;
            return (
              <div
                key={area.title}
                className="bg-[#FAF7F2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-7 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAE0D2] text-[#2D2A24] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#FF8400]" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#2D2A24]">
                      {area.title}
                    </h3>
                    <p className="text-sm text-[#5F5646] leading-relaxed">
                      {area.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2D7C7]/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {area.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-[#EAE0D2] text-[11px] font-mono font-medium text-[#2D2A24]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate(area.projectLink as PageId)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#2D2A24] hover:text-[#FF8400] transition-colors cursor-pointer"
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
