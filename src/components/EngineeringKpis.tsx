import React from "react";
import { Database, Smartphone, ShieldCheck } from "lucide-react";

export const EngineeringKpis: React.FC = () => {
  const kpis = [
    {
      metric: "100%",
      label: "Offline-First",
      tag: "Kotlin & Room DB",
      icon: Smartphone,
      description: "Persistencia local reactiva sin dependencia de servicios en la nube, garantizando disponibilidad total de los datos en movilidad.",
    },
    {
      metric: "ACID",
      label: "Integridad Atómica",
      tag: "Java 17 & SQL Server",
      icon: Database,
      description: "Control riguroso de transacciones mediante procedimientos almacenados y aislamiento estricto contra inconsistencias en stock y caja.",
    },
    {
      metric: "CIA",
      label: "Seguridad por Diseño",
      tag: "Cisco Certified",
      icon: ShieldCheck,
      description: "Confidencialidad, integridad y disponibilidad validadas formalmente, priorizando sanitización de entradas y defensa en profundidad.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="font-mono text-xs uppercase font-bold tracking-wider text-[#FF8400]">
            ESTÁNDAR DE INGENIERÍA
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2D2A24] uppercase tracking-tight">
            Pilares de Arquitectura & Calidad
          </h2>
          <p className="text-sm text-[#5F5646] font-medium">
            Principios técnicos no negociables aplicados en cada solución desarrollada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="group relative bg-[#EAE0D2]/60 hover:bg-[#EAE0D2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-7 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#E2D7C7] group-hover:bg-[#FF8400] text-[#2D2A24] group-hover:text-white flex items-center justify-center transition-colors shadow-2xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5F5646] bg-[#E2D7C7]/80 px-2.5 py-1 rounded-md">
                      {kpi.tag}
                    </span>
                  </div>

                  <div className="space-y-1 mb-3">
                    <div className="text-4xl sm:text-5xl font-black text-[#2D2A24] tracking-tight group-hover:text-[#FF8400] transition-colors font-sans">
                      {kpi.metric}
                    </div>
                    <h3 className="text-base font-bold text-[#2D2A24]">
                      {kpi.label}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed">
                    {kpi.description}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[#E2D7C7]/80 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-[11px] font-mono text-[#5F5646] font-medium">
                    Validado en Producción
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
