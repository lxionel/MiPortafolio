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
    <section id="contacto" className="py-20 md:py-28 relative bg-[#090a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono text-xs">
                <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                <span>Canales de Comunicación</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Conversemos sobre tu proyecto
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Disponible para integrarme en equipos de ingeniería de software, proyectos
                transaccionales backend y desarrollo de aplicaciones móviles o web.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              <a
                href={profile.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#11141c] border border-white/10 hover:border-emerald-500/40 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      WhatsApp Directo
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-emerald-300 transition-colors">
                      {profile.phone}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="p-4 rounded-2xl bg-[#11141c] border border-white/10 hover:border-white/20 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      Correo Electrónico
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      {profile.email}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>

              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#11141c] border border-white/10 hover:border-white/20 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:scale-105 transition-transform">
                    <LinkedinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      LinkedIn
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      {profile.fullName}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>

              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#11141c] border border-white/10 hover:border-white/20 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 group-hover:scale-105 transition-transform">
                    <GithubIcon className="w-4 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">
                      GitHub
                    </span>
                    <span className="font-semibold text-slate-200 text-sm group-hover:text-white transition-colors">
                      github.com/lxionel
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-white/[0.02] p-3.5 rounded-2xl border border-white/5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Respuesta garantizada en menos de 24 horas hábiles.</span>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 pro-card rounded-3xl p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white mb-1.5">
              Envía un Mensaje Directo
            </h3>
            <p className="text-xs text-slate-500 font-mono mb-6">
              El formulario estructurará tu requerimiento técnico para despacho inmediato.
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Mensaje Preparado
                </h4>
                <p className="text-xs sm:text-sm text-slate-300">
                  Se ha abierto tu cliente de correo para despachar la consulta a{" "}
                  <span className="font-mono text-emerald-400">{profile.email}</span>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-slate-300 mt-2 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0f] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                      className="w-full px-4 py-3 rounded-xl bg-[#090a0f] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0f] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
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
                    className="w-full px-4 py-3 rounded-xl bg-[#090a0f] border border-white/10 focus:border-white/30 focus:ring-1 focus:ring-white/20 text-sm text-slate-200 outline-none transition-all placeholder:text-slate-600 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-200 text-slate-950 font-bold text-sm transition-all shadow-lg"
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