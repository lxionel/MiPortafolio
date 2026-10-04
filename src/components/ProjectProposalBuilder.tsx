import React, { useState } from "react";
import { Sliders, MessageSquare, Send, CheckCircle2, Sparkles } from "lucide-react";
import { profile } from "../data/profile";

interface SolutionType {
  id: string;
  label: string;
  stack: string;
  badge: string;
}

const SOLUTION_TYPES: SolutionType[] = [
  {
    id: "backend",
    label: "Backend Transaccional & SQL",
    stack: "Java 17 LTS + Microsoft SQL Server (ACID)",
    badge: "Alta Concurrencia",
  },
  {
    id: "mobile",
    label: "App Móvil Nativa Offline-First",
    stack: "Kotlin Android SDK + Jetpack Room (SQLite)",
    badge: "100% Sin Internet",
  },
  {
    id: "web",
    label: "Plataforma Web SPA & Pedidos",
    stack: "React 19 + TypeScript + Tailwind CSS",
    badge: "Carga < 1s",
  },
  {
    id: "security",
    label: "Auditoría & Buenas Prácticas",
    stack: "Estándares Cisco CIA + Sanitización Defensiva",
    badge: "Seguridad por Diseño",
  },
];

const KEY_REQUIREMENTS = [
  "Atomicidad estricta y control de concurrencia en ventas / caja",
  "Operatividad 100% offline con persistencia local reactiva",
  "Rendimiento optimizado para alta conversión en dispositivos móviles",
  "Defensa en profundidad y sanitización de datos de entrada",
];

const TIMELINE_OPTIONS = [
  "Inmediato (< 2 semanas)",
  "Corto plazo (aprox. 1 mes)",
  "Medio plazo (2 a 3 meses)",
  "Por evaluar técnicamente",
];

export const ProjectProposalBuilder: React.FC = () => {
  const [selectedSolution, setSelectedSolution] = useState<string>("backend");
  const [selectedReq, setSelectedReq] = useState<string>(KEY_REQUIREMENTS[0]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[1]);
  const [clientName, setClientName] = useState<string>("");

  const activeSolutionObj = SOLUTION_TYPES.find((s) => s.id === selectedSolution) || SOLUTION_TYPES[0];

  const generateProposalMessage = () => {
    const greeting = clientName ? `Hola Lionel, soy ${clientName}.` : "Hola Lionel,";
    return `${greeting} Me interesa plantear una propuesta de ingeniería:\n\n- Tipo de Proyecto: ${activeSolutionObj.label}\n- Stack Sugerido: ${activeSolutionObj.stack}\n- Requisito Clave: ${selectedReq}\n- Plazo Estimado: ${selectedTimeline}\n\n¿Podemos coordinar una reunión técnica o conversar sobre este alcance?`;
  };

  const handleSendWhatsApp = () => {
    const text = encodeURIComponent(generateProposalMessage());
    window.open(`https://wa.me/51902377567?text=${text}`, "_blank");
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`Propuesta Técnica: ${activeSolutionObj.label}`);
    const body = encodeURIComponent(generateProposalMessage());
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, "_blank");
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#E2D7C7] rounded-3xl p-6 sm:p-9 shadow-sm space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF8400] uppercase tracking-wider">
          <Sliders className="w-3.5 h-3.5" />
          <span>CONFIGURADOR INTERACTIVO DE REQUERIMIENTOS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-[#2D2A24] tracking-tight uppercase">
          Estructura tu Propuesta de Proyecto
        </h3>
        <p className="text-xs sm:text-sm text-[#5F5646] font-medium leading-relaxed max-w-2xl">
          Selecciona los requerimientos técnicos de tu iniciativa para generar un alcance preliminar y enviarlo directamente con 1 clic.
        </p>
      </div>

      {/* Step 1: Solution Type */}
      <div className="space-y-3">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
          1. TIPO DE SOLUCIÓN TECNOLÓGICA:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SOLUTION_TYPES.map((sol) => {
            const isSelected = selectedSolution === sol.id;
            return (
              <button
                key={sol.id}
                type="button"
                onClick={() => setSelectedSolution(sol.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSelected
                    ? "bg-[#2D2A24] text-white border-[#2D2A24] shadow-md -translate-y-0.5"
                    : "bg-white hover:bg-[#EAE0D2]/50 text-[#2D2A24] border-[#E2D7C7]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">{sol.label}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isSelected ? "bg-[#FF8400] text-white" : "bg-[#EAE0D2] text-[#5F5646]"
                    }`}
                  >
                    {sol.badge}
                  </span>
                </div>
                <span
                  className={`text-xs font-mono ${
                    isSelected ? "text-slate-300" : "text-[#5F5646]"
                  }`}
                >
                  {sol.stack}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Key Requirement */}
      <div className="space-y-3">
        <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
          2. REQUISITO TÉCNICO PRIORITARIO:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {KEY_REQUIREMENTS.map((req) => {
            const isSelected = selectedReq === req;
            return (
              <button
                key={req}
                type="button"
                onClick={() => setSelectedReq(req)}
                className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                  isSelected
                    ? "bg-[#2D2A24] text-white border-[#2D2A24]"
                    : "bg-white hover:bg-[#EAE0D2]/50 text-[#2D2A24] border-[#E2D7C7]"
                }`}
              >
                <CheckCircle2
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? "text-[#FF8400]" : "text-[#5F5646]"
                  }`}
                />
                <span>{req}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Timeline & Name */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div className="sm:col-span-7 space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
            3. PLAZO ESTIMADO:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TIMELINE_OPTIONS.map((time) => {
              const isSelected = selectedTimeline === time;
              return (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTimeline(time)}
                  className={`p-2.5 rounded-xl border text-center text-xs font-mono font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#2D2A24] text-white border-[#2D2A24]"
                      : "bg-white hover:bg-[#EAE0D2]/50 text-[#5F5646] border-[#E2D7C7]"
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        <div className="sm:col-span-5 space-y-2">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#2D2A24]">
            TU NOMBRE O EMPRESA (OPCIONAL):
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ej. Carlos Mendoza"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E2D7C7] text-xs sm:text-sm text-[#2D2A24] focus:outline-none focus:border-[#2D2A24] font-medium"
          />
        </div>
      </div>

      {/* Live Preview Box */}
      <div className="p-5 rounded-2xl bg-[#EAE0D2]/50 border border-[#E2D7C7] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-[#FF8400]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALCANCE FORMATEADO PARA ENVÍO:</span>
          </div>
          <span className="text-[11px] font-mono text-[#5F5646]">
            Listo para enviar
          </span>
        </div>

        <pre className="text-xs font-mono text-[#2D2A24] bg-white p-4 rounded-xl border border-[#E2D7C7] whitespace-pre-wrap leading-relaxed">
          {generateProposalMessage()}
        </pre>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleSendWhatsApp}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enviar por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleSendEmail}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-[#2D2A24] hover:bg-[#FF8400] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Enviar por Correo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
