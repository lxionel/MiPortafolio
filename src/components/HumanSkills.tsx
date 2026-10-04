import React from "react";
import { Users, Lightbulb, Compass, CheckCircle, MessageCircle, RefreshCw } from "lucide-react";

export const HumanSkills: React.FC = () => {
  const softSkills = [
    {
      icon: Users,
      title: "Trabajo en Equipo",
      description: "Me adapto y colaboro con compañeros de forma respetuosa. Sé escuchar ideas, dar sugerencias constructivas y sumar esfuerzos para que el proyecto salga adelante.",
      badgeColor: "bg-sky-50 text-sky-600 border-sky-100",
    },
    {
      icon: Lightbulb,
      title: "Resolución de Problemas",
      description: "Cuando algo no funciona, mantengo la calma, analizo el problema con paciencia y busco diferentes alternativas hasta encontrar la solución correcta.",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
    },
    {
      icon: Compass,
      title: "Ganas de Aprender",
      description: "Tengo mucha curiosidad por la tecnología. Me gusta investigar por mi propia cuenta, leer documentación y aprender constantemente de los demás.",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      icon: CheckCircle,
      title: "Responsabilidad & Compromiso",
      description: "Me comprometo con lo que hago, cuido los detalles de mis tareas y me esfuerzo para que lo que entregue esté bien hecho y a tiempo.",
      badgeColor: "bg-teal-50 text-teal-600 border-teal-100",
    },
    {
      icon: MessageCircle,
      title: "Comunicación Transparente",
      description: "Me gusta hablar con claridad y honestidad sobre lo que sé, lo que estoy aprendiendo y el estado real de los proyectos.",
      badgeColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    },
    {
      icon: RefreshCw,
      title: "Adaptabilidad",
      description: "Tengo buena disposición para adaptarme a nuevas herramientas, dinámicas de trabajo y retos que se presenten en el camino.",
      badgeColor: "bg-violet-50 text-violet-600 border-violet-100",
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#F0F4F8] border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12 space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0284C7]">
            HABILIDADES HUMANAS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Cómo soy y cómo trabajo
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Más allá de las herramientas técnicas, valoro el respeto, la buena comunicación y el compromiso al trabajar con otras personas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill) => {
            const Icon = skill.icon;
            return (
              <div
                key={skill.title}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-3xl p-6 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 ${skill.badgeColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {skill.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-mono text-slate-500">Valor personal</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
