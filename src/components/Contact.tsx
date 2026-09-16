import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Phone, ArrowRight, ShieldCheck } from "lucide-react";
import { profile } from "../data/profile";
import { GithubIcon, LinkedinIcon } from "./icons";

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      formData.subject || `Contacto de ${formData.name}`
    )}&body=${encodeURIComponent(
      `Hola Lionel,\n\nMi nombre es ${formData.name} (${formData.email}).\n\nMensaje:\n${formData.message}`
    )}`;
    window.open(mailtoUrl, "_blank");
    setSubmitted(true);
  };

  return (
    <section id="contacto" className="py-20 md:py-28 relative bg-slate-950">
      {/* Glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Canales de Contacto</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Conversemos sobre tu próximo proyecto
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Disponible para integrarme en equipos de ingeniería de software, consultoría
                transaccional y desarrollo de aplicaciones móviles o web.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="space-y-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      WhatsApp Directo
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Correo Electrónico
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-cyan-300 transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 group-hover:scale-110 transition-transform">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Perfil Profesional
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-indigo-300 transition-colors">
                      Lionel Aguirre Gomero
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition-colors" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-600 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 group-hover:scale-110 transition-transform">
                    <GithubIcon className="w-4 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">
                      Código Abierto
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      github.com/lxionel
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-colors" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/40 p-3 rounded-xl border border-slate-800/60">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Respuesta garantizada en menos de 24 horas hábiles.</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-slate-900/50 border border-slate-800/80 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-2">
              Envía un Mensaje Directo
            </h3>
            <p className="text-xs text-slate-400 font-mono mb-6">
              El formulario estructurará tu mensaje para envío inmediato.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Mensaje Preparado
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Se ha abierto tu cliente de correo para despachar la consulta a{" "}
                  <span className="font-mono text-cyan-400">{profile.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 mt-2"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ej. Ing. Carlos Mendoza"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="carlos@empresa.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Asunto o Tipo de Proyecto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    placeholder="Ej. Desarrollo de sistema backend / app móvil"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Detalles del Requerimiento *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="Describe los requerimientos técnicos, plazos y objetivos del proyecto..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensaje</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};