import React, { useState } from "react";
import { CheckCircle, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Project, projects } from "../data/projects";
import { PageId } from "../types";

interface ProjectStackComparatorProps {
  onSelectProject?: (project: Project) => void;
  onNavigate?: (page: PageId) => void;
}

const COMPARISON_ROWS = [
  {
    label: "Plataforma Objetivo",
    metabit: "Android Móvil Nativo (SDK)",
    pos: "Desktop / Entornos On-Premise",
    web: "Web SPA en Navegador Móvil & Desktop",
  },
  {
    label: "Motor de Persistencia",
    metabit: "SQLite vía Jetpack Room DB",
    pos: "Microsoft SQL Server",
    web: "Sesión reactiva en LocalStorage / State",
  },
  {
    label: "Garantía de Ingeniería",
    metabit: "100% Offline-First (Cero caída)",
    pos: "Transacciones ACID Atómicas",
    web: "Edge CDN & 98/100 Lighthouse",
  },
  {
    label: "Manejo de Concurrencia",
    metabit: "Kotlin Coroutines & StateFlow",
    pos: "Pool JDBC & Stored Procedures",
    web: "React Hooks & Event Loop Asíncrono",
  },
  {
    label: "Criterio de Resiliencia",
    metabit: "Persistencia reactiva en hilo I/O",
    pos: "Rollback atómico ante cualquier fallo",
    web: "Tree-shaking y carga bajo 1 segundo",
  },
];

export const ProjectStackComparator: React.FC<ProjectStackComparatorProps> = ({
  onSelectProject,
  onNavigate,
}) => {
  const [highlightedColumn, setHighlightedColumn] = useState<string | null>(null);

  const getProjectId = (key: string) => {
    if (key === "metabit") return "metabit";
    if (key === "pos") return "peripollos-pos";
    if (key === "web") return "peripollos-web";
    return "";
  };

  const handleOpenDetail = (key: string) => {
    const id = getProjectId(key);
    const p = projects.find((proj) => proj.id === id);
    if (p && onSelectProject) {
      onSelectProject(p);
    }
  };

  return (
    <section className="mt-20 pt-16 border-t border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>MATRIZ COMPARATIVA DE INGENIERÍA</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A24] tracking-tight uppercase">
              Contraste de Decisiones Técnicas
            </h3>
            <p className="text-xs sm:text-sm text-[#5F5646] font-medium max-w-2xl">
              Cada proyecto responde a requerimientos técnicos específicos. Compara cómo varían los motores de persistencia, la concurrencia y la tolerancia a fallos.
            </p>
          </div>

          <span className="text-[11px] font-mono text-[#5F5646] bg-[#EAE0D2] px-3 py-1 rounded-full border border-[#E2D7C7]">
            Interactúa sobre cada columna para inspeccionar
          </span>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-[#E2D7C7] bg-[#FAF7F2] shadow-xs">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-[#EAE0D2] border-b border-[#E2D7C7] text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
                <th className="py-4 px-6 w-1/4">Criterio Arquitectónico</th>
                <th
                  onMouseEnter={() => setHighlightedColumn("metabit")}
                  onMouseLeave={() => setHighlightedColumn(null)}
                  className={`py-4 px-6 w-1/4 transition-colors cursor-pointer ${
                    highlightedColumn === "metabit" ? "bg-[#E2D7C7]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>MetaBit (Móvil)</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#2D2A24] text-white">
                      Kotlin
                    </span>
                  </div>
                </th>
                <th
                  onMouseEnter={() => setHighlightedColumn("pos")}
                  onMouseLeave={() => setHighlightedColumn(null)}
                  className={`py-4 px-6 w-1/4 transition-colors cursor-pointer ${
                    highlightedColumn === "pos" ? "bg-[#E2D7C7]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>POS PeriPollos</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#2D2A24] text-white">
                      Java 17
                    </span>
                  </div>
                </th>
                <th
                  onMouseEnter={() => setHighlightedColumn("web")}
                  onMouseLeave={() => setHighlightedColumn(null)}
                  className={`py-4 px-6 w-1/4 transition-colors cursor-pointer ${
                    highlightedColumn === "web" ? "bg-[#E2D7C7]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>Web Pedidos</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#2D2A24] text-white">
                      React & TS
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2D7C7]/60 text-xs sm:text-[13px]">
              {COMPARISON_ROWS.map((row, idx) => (
                <tr
                  key={row.label}
                  className={`transition-colors ${
                    idx % 2 === 0 ? "bg-white/40" : "bg-[#FAF7F2]"
                  } hover:bg-[#EAE0D2]/40`}
                >
                  <td className="py-4 px-6 font-bold text-[#2D2A24] bg-white/20">
                    {row.label}
                  </td>
                  <td
                    className={`py-4 px-6 font-medium text-[#5F5646] transition-colors ${
                      highlightedColumn === "metabit" ? "bg-[#EAE0D2]/50 text-[#2D2A24] font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.metabit}</span>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 font-medium text-[#5F5646] transition-colors ${
                      highlightedColumn === "pos" ? "bg-[#EAE0D2]/50 text-[#2D2A24] font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.pos}</span>
                    </div>
                  </td>
                  <td
                    className={`py-4 px-6 font-medium text-[#5F5646] transition-colors ${
                      highlightedColumn === "web" ? "bg-[#EAE0D2]/50 text-[#2D2A24] font-semibold" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{row.web}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Row with Inspect Action */}
              <tr className="bg-[#EAE0D2]/30">
                <td className="py-4 px-6 font-bold text-[#2D2A24]">
                  Ficha Técnica
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleOpenDetail("metabit")}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF8400] hover:text-[#2D2A24] transition-colors cursor-pointer"
                  >
                    <span>Ver Arquitectura</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleOpenDetail("pos")}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF8400] hover:text-[#2D2A24] transition-colors cursor-pointer"
                  >
                    <span>Ver Arquitectura</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    onClick={() => handleOpenDetail("web")}
                    className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF8400] hover:text-[#2D2A24] transition-colors cursor-pointer"
                  >
                    <span>Ver Arquitectura</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Callout */}
        <div className="mt-8 p-6 rounded-3xl bg-[#EAE0D2] border border-[#E2D7C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
              ADAPTABILIDAD DE INGENIERÍA
            </span>
            <p className="text-sm font-bold text-[#2D2A24]">
              ¿Tienes requerimientos con condiciones técnicas específicas o alta concurrencia?
            </p>
          </div>
          {onNavigate && (
            <button
              onClick={() => onNavigate("contacto")}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#2D2A24] hover:bg-[#FF8400] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Plantear Requerimiento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
