import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    document.title = 'Contacto — Lionel | Desarrollador de Software';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const lines = [
      `Hola Lionel, te contacto desde tu portafolio.`,
      `Mi nombre: ${nombre}`,
      email ? `Mi correo/contacto: ${email}` : '',
      motivo ? `Motivo: ${motivo}` : '',
      mensaje ? `\nMensaje:\n${mensaje}` : '',
    ].filter(Boolean).join('\n');

    window.open(wspUrl(lines), '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={scope}>
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Contacto</p>
          <h1>Conectemos.</h1>
          <p>¿Tienes una oportunidad laboral, una consulta sobre mis proyectos o buscas colaborar? Escríbeme por cualquiera de estos canales.</p>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="container contact-grid">

          <div>
            <span className="eyebrow">Canales directos</span>
            <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)' }}>
              Canales de comunicación.
            </h2>
            <div className="contact-channels">
              <a
                className="channel"
                href="https://github.com/lxionel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="channel-ico ico-call">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </span>
                <div>
                  <b>GitHub</b><span className="val">@lxionel</span>
                  <br />
                  <span className="hint">Ver código y repositorios</span>
                </div>
              </a>

              <a className="channel" href="mailto:lioneldavora1@gmail.com">
                <span className="channel-ico ico-mail">
                  <svg viewBox="0 0 24 24">
                    <path d="M4 6h16c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2zm0 2v.4l8 5 8-5V8H4zm0 2.3V16h16v-5.7l-8 5-8-5z"/>
                  </svg>
                </span>
                <div>
                  <b>Correo</b><span className="val">lioneldavora1@gmail.com</span>
                  <br />
                  <span className="hint">Contacto profesional</span>
                </div>
              </a>

              <a
                className="channel"
                href={wspUrl('Hola Lionel, vi tu portafolio y me gustaría ponerme en contacto contigo')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="channel-ico ico-wsp">
                  <svg viewBox="0 0 32 32">
                    <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.3 7L4 29l7.2-2.2c1.9 1 4 1.6 6.2 1.6 6.6 0 12-5.4 12-12S22.6 3 16 3zm0 21.8c-2 0-3.9-.6-5.5-1.6l-.4-.2-4.2 1.3 1.3-4.1-.3-.4C5.7 18.2 5.1 16.6 5.1 15 5.1 9 10 4.1 16 4.1S26.9 9 26.9 15 22 24.8 16 24.8zm6-7.4c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.2 1.3 3.4c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.5.3-.8.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/>
                  </svg>
                </span>
                <div>
                  <b>WhatsApp</b><span className="val">+51 952 102 805</span>
                  <br />
                  <span className="hint">Mensajes directos</span>
                </div>
              </a>
            </div>
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="cfNombre">Tu nombre</label>
              <input
                type="text"
                id="cfNombre"
                placeholder="Ej. Juan Pérez"
                autoComplete="name"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="cfEmail">Tu correo o contacto</label>
                <input
                  type="text"
                  id="cfEmail"
                  placeholder="tu@correo.com o teléfono"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="cfMotivo">Motivo</label>
                <select
                  id="cfMotivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option>Oportunidad laboral / Selección</option>
                  <option>Proyecto de software / Desarrollo</option>
                  <option>Consulta técnica o sobre un proyecto</option>
                  <option>Networking / Conectar</option>
                </select>
              </div>
            </div>
            <div className="field">
              <label htmlFor="cfMsg">Mensaje</label>
              <textarea
                id="cfMsg"
                placeholder="Cuéntame sobre la propuesta, el proyecto o la idea."
                required
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Enviar por WhatsApp
            </button>
            <p className="form-note">
              Se abrirá WhatsApp con el mensaje estructurado listo para enviar. También puedes escribirme directamente a <a href="mailto:lioneldavora1@gmail.com" style={{color:'var(--primary)'}}>lioneldavora1@gmail.com</a>.
            </p>
          </form>

        </div>
      </section>

      <section className="section section--elevated">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Información adicional</span>
            <h2 className="section-title">Preguntas frecuentes.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>¿En qué tecnologías te especializas?</summary>
              <p>Mi enfoque principal es el desarrollo backend con <strong>Java</strong> y bases de datos relacionales en <strong>SQL Server</strong>, creación de aplicaciones móviles en <strong>Android / Kotlin</strong>, e interfaces web modernas con <strong>React</strong>.</p>
            </details>
            <details>
              <summary>¿Estás disponible para trabajo remoto o presencial?</summary>
              <p>Sí, estoy disponible para oportunidades en modalidad 100% remota para cualquier lugar, así como para proyectos y reuniones presenciales en Chimbote y Nuevo Chimbote.</p>
            </details>
            <details>
              <summary>¿Dónde puedo ver más de tu código?</summary>
              <p>Puedes revisar mis repositorios y commits directamente en mi cuenta de GitHub: <a href="https://github.com/lxionel" target="_blank" rel="noopener noreferrer" style={{color:'var(--primary)'}}>github.com/lxionel</a>.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
}
