import React, { useState } from "react";
import { Cpu, CheckCircle2, Sparkles, FolderGit2 } from "lucide-react";
import { skillGroups, skillDetails, SkillDetail } from "../data/skills";

export const SkillInspector: React.FC = () => {
  const [selectedSkillName, setSelectedSkillName] = useState<string>("Java 17 LTS");

  const currentDetail: SkillDetail = skillDetails[selectedSkillName] || {
    name: selectedSkillName,
    category: "Ingeniería de Software",
    level: "Competencia Aplicada",
    description: `Dominio práctico de ${selectedSkillName} aplicado al diseño y construcción de arquitecturas de software eficientes.`,
    appliedIn: "Proyectos de Ingeniería",
    concepts: ["Buenas Prácticas", "Modularidad", "Rendimiento", "Mantenibilidad"]
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSPECTOR TÉCNICO INTERACTIVO</span>
        </div>
        <h3 className="text-2xl font-black text-[#2D2A24] uppercase">
          Matriz de Habilidades & Tecnologías
        </h3>
        <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed">
          Haz clic en cualquier habilidad para ver el nivel de dominio, el proyecto real donde fue implementada y los conceptos arquitectónicos que respalda.
        </p>
      </div>

      {/* Main Grid: Skills Pills on Left, Inspector on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Skill Pills Groups */}
        <div className="lg:col-span-7 space-y-4">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-2xl p-4.5 space-y-2.5 shadow-2xs"
            >
              <span className="text-xs font-mono font-bold text-[#5F5646] uppercase tracking-wider block">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => {
                  const isSelected = selectedSkillName === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSelectedSkillName(item)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#2D2A24] text-white shadow-xs scale-105"
                          : "bg-[#EAE0D2] hover:bg-[#E2D7C7] text-[#2D2A24] border border-[#E2D7C7]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Live Inspector Card */}
        <div className="lg:col-span-5 bg-[#FAF7F2] border-2 border-[#E2D7C7] rounded-3xl p-6 shadow-sm space-y-5 sticky top-28">
          <div className="flex items-center justify-between border-b border-[#E2D7C7] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF8400]">
                {currentDetail.category}
              </span>
              <h4 className="text-xl font-black text-[#2D2A24]">
                {currentDetail.name}
              </h4>
            </div>
            <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-[#2D2A24] text-white">
              {currentDetail.level}
            </span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5F5646]">
              DESCRIPCIÓN TÉCNICA:
            </span>
            <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed">
              {currentDetail.description}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#E2D7C7] flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#EAE0D2] text-[#FF8400] flex items-center justify-center shrink-0">
              <FolderGit2 className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-mono text-[#5F5646] block text-[10px] uppercase font-bold">
                Aplicado en producción:
              </span>
              <span className="font-bold text-[#2D2A24]">
                {currentDetail.appliedIn}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-1 border-t border-[#E2D7C7]">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#2D2A24]">
              <Cpu className="w-3.5 h-3.5 text-[#FF8400]" />
              <span>Conceptos de Ingeniería Dominados:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {currentDetail.concepts.map((concept) => (
                <span
                  key={concept}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-[#E2D7C7] text-[11px] font-mono font-semibold text-[#2D2A24]"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>{concept}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
