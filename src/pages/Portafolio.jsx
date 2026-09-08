import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Portafolio() {
  useEffect(() => {
    document.title = 'Proyectos — Lionel | Desarrollador de Software';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  return (
    <div ref={scope}>
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Proyectos</p>
          <h1>Proyectos y sistemas reales.</h1>
          <p>Casos prácticos de desarrollo de software, arquitectura de backend, bases de datos y aplicaciones móviles.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="container">
          <div className="work-live-grid">

            <article className="work-live">
              <div className="work-live-frame work-live-frame--phone reveal-img">
                <div className="mock-phone mock-phone--lg">
                  <div className="mock-phone-notch" />
                  <img
                    src={publicAsset('/img/metabit-app.jpg')}
                    alt="Aplicación Móvil MetaBit"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="work-live-body">
                <span className="eyebrow">Aplicación Móvil · Finanzas</span>
                <h2>App Móvil "MetaBit"</h2>
                <p>
                  Desarrollo de una aplicación móvil enfocada en la automatización y proyección
                  de metas de ahorro financiero. El proyecto abarcó desde el diseño de la interfaz (UI)
                  y la identidad visual, hasta la programación de la lógica interna y la compilación del APK funcional.
                </p>
                <ul className="checklist">
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Algoritmos de cálculo para proyección de ahorros periódicos.</li>
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Desarrollo de interfaz Android nativa e intuitiva.</li>
                </ul>
              </div>
            </article>

            <article className="work-live">
              <div className="work-live-frame reveal-img">
                <div className="mock-window">
                  <div className="mock-window-bar">
                    <span className="mock-dot mock-dot--red" />
                    <span className="mock-dot mock-dot--yellow" />
                    <span className="mock-dot mock-dot--green" />
                    <span className="mock-window-title">peripollos_pos_v2.0 — Java / SQL Server</span>
                  </div>
                  <div className="mock-window-screen">
                    <img
                      src={publicAsset('/img/peripollos-pos.png')}
                      alt="Sistema POS Peripollos en Java"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="work-live-body">
                <span className="eyebrow">Desarrollo Backend · Sistema POS</span>
                <h2>Sistema de Gestión "Peripollos" (POS)</h2>
                <p>
                  Desarrollo completo de un sistema de Punto de Venta (POS) programado en{' '}
                  <strong>Java</strong> con conexión a base de datos{' '}
                  <strong>SQL Server</strong>. Diseñado para optimizar la toma de pedidos,
                  inserción de datos en tiempo real y comunicación automatizada mediante
                  Webhooks y un Chatbot integrado.
                </p>
                <ul className="checklist">
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Arquitectura robusta en Java y consultas SQL optimizadas.</li>
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Integración de Webhooks y lógica de Chatbot para atención.</li>
                </ul>
              </div>
            </article>

            <article className="work-live">
              <div className="work-live-frame reveal-img">
                <div className="mock-window">
                  <div className="mock-window-bar">
                    <span className="mock-dot mock-dot--red" />
                    <span className="mock-dot mock-dot--yellow" />
                    <span className="mock-dot mock-dot--green" />
                    <span className="mock-browser-url">peripollos.netlify.app</span>
                  </div>
                  <div className="mock-window-screen">
                    <img
                      src={publicAsset('/img/peripollos-web.png')}
                      alt="Plataforma Web Peripollos en Vivo"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              <div className="work-live-body">
                <span className="eyebrow">Desarrollo Web · Carta Digital & Pedidos</span>
                <h2>Plataforma Web "Peripollos"</h2>
                <p>
                  Plataforma web con carta digital interactiva, navegación fluida, diseño responsivo y sistema de pedidos directo por WhatsApp. Proyecto en producción y disponible para navegar en vivo.
                </p>
                <ul className="checklist">
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Diseño de interfaz UI/UX atractivo y optimizado para móviles.</li>
                  <li><span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>Desplegado y funcionando en producción con Netlify.</li>
                </ul>
                <div style={{ marginTop: 20 }}>
                  <a
                    className="btn btn-primary"
                    href="https://peripollos.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ver sitio en vivo (peripollos.netlify.app) ↗
                  </a>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      <CtaBand
        title="¿Te gustaría conocer más sobre <em>estos desarrollos</em>?"
        subtitle="Conversemos sobre la arquitectura, el código o posibles colaboraciones técnicas."
        primaryText="Contactar"
        primaryLink="/contacto"
        secondaryText="Ver mi GitHub"
        secondaryLink="https://github.com/lxionel"
      />
    </div>
  );
}
