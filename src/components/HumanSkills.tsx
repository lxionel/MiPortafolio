import React from "react";
import { Users, Lightbulb, Compass, CheckCircle, MessageCircle, RefreshCw } from "lucide-react";

export const HumanSkills: React.FC = () => {
  const softSkills = [
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Me adapto y colaboro con compañeros de forma respetuosa. Sé escuchar ideas, dar sugerencias constructivas y sumar esfuerzos para que el proyecto salga adelante.",
    },
    {
      icon: Lightbulb,
      title: "Resolución de Problemas",
      description: "Cuando algo no funciona, mantengo la calma, analizo el problema con paciencia y busco diferentes alternativas hasta encontrar la solución correcta.",
    },
    {
      icon: Compass,
      title: "Ganas de Aprender",
      description: "Tengo mucha curiosidad por la tecnología. Me gusta investigar por mi propia cuenta, leer documentación y aprender constantemente de los demás.",
    },
    {
      icon: CheckCircle,
      title: "Responsabilidad",
      description: "Me comprometo con lo que hago, cuido los detalles de mis tareas y me esfuerzo para que lo que entregue esté bien hecho y a tiempo.",
    },
    {
      icon: MessageCircle,
      title: "Comunicación Transparente",
      description: "Me gusta hablar con claridad y honestidad sobre lo que sé, lo que estoy aprendiendo y el estado real de los proyectos.",
    },
    {
      icon: RefreshCw,
      title: "Adaptabilidad",
      description: "Tengo buena disposición para adaptarme a nuevas herramientas, dinámicas de trabajo y retos que se presenten en el camino.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#F5EFE6] border-b border-[#E2D7C7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FF8400]">
            HABILIDADES HUMANAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#2D2A24] tracking-tight">
            Cómo soy y cómo trabajo
          </h2>
          <p className="text-sm sm:text-base text-[#5F5646] font-normal leading-relaxed">
            Más allá de las herramientas técnicas, valoro el respeto, la buena comunicación y el compromiso al trabajar con otras personas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="bg-[#FAF7F2] border border-[#E2D7C7] hover:border-[#D3C5B2] rounded-3xl p-6 transition-all duration-300 shadow-2xs hover:shadow-md flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#EAE0D2] text-[#FF8400] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#2D2A24]">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-[#5F5646] leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span className="text-xs font-mono text-[#5F5646]">Valor personal</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
