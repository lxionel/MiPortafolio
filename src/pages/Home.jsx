import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBand from '../components/CtaBand';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Home() {
  useEffect(() => {
    document.title = 'Lionel Aguirre Gomero — Desarrollador de Software';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* ── HERO PROFESIONAL ── */}
      <section className="hero-pro">
        <div className="container hero-pro__grid">
          <div>
            <div className="hero-status">
              <span className="hero-status__dot" aria-hidden="true" />
              <span>Disponible para desarrollo de software</span>
            </div>

            <h1 className="hero-name">Lionel Aguirre Gomero</h1>
            <p className="hero-title">Desarrollador de Software · Backend & Móvil</p>

            <p className="hero-bio">
              Formación en Ingeniería de Sistemas. Me especializo en la arquitectura y construcción
              de sistemas con <strong>Java</strong>, bases de datos relacionales en <strong>SQL Server</strong> y aplicaciones móviles nativas para <strong>Android</strong>.
            </p>

            <div className="hero-actions">
              <Link className="btn btn-primary" to="/portafolio">
                Ver proyectos desarrollados
              </Link>
              <Link className="btn btn-secondary" to="/contacto">
                Contactar
              </Link>
            </div>

            <div className="hero-socials">
              <a
                className="hero-social-link"
                href="https://github.com/lxionel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub / lxionel</span>
              </a>

              <a
                className="hero-social-link"
                href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                className="hero-social-link"
                href="mailto:lioneldavora1@gmail.com"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>lioneldavora1@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="engineer-card">
            <div className="engineer-portrait-wrap">
              <img
                src={publicAsset('/img/lionel.png')}
                alt="Lionel Aguirre Gomero — Desarrollador de Software"
                loading="eager"
              />
            </div>
            <div className="engineer-card-details">
              <h2 className="engineer-card-name">Lionel Aguirre Gomero</h2>
              <p className="engineer-card-spec">Ingeniería de Sistemas · Chimbote, Perú</p>
              <div className="engineer-pills">
                <span className="engineer-pill">Java 17</span>
                <span className="engineer-pill">SQL Server</span>
                <span className="engineer-pill">Android (Kotlin)</span>
                <span className="engineer-pill">React</span>
                <span className="engineer-pill">REST APIs</span>
                <span className="engineer-pill">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROYECTOS DESTACADOS (BENTO GRID CON MOCKUPS) ── */}
      <section className="section-pro" id="portafolio">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Proyectos Desarrollados</span>
            <h2 className="pro-header__title">Sistemas Reales y Funcionales</h2>
            <p className="pro-header__desc">
              Software construido desde el diseño de la base de datos relacional y la lógica de negocio hasta la entrega en producción.
            </p>
          </div>

          <div className="work-bento">
            {/* CARD 1 (MAIN VERTICAL): METABIT */}
            <Link to="/portafolio" className="work-card work-card--main">
              <div className="work-card__inner">
                <div className="work-card__header">
                  <span className="work-card__cat">Móvil · Finanzas</span>
                  <h3 className="work-card__title">App Móvil "MetaBit"</h3>
                  <p className="work-card__desc">
                    Aplicación Android nativa para cálculo y proyección de metas de ahorro financiero personal. Desarrollada con persistencia local, algoritmos de proyección periódica e interfaz táctil optimizada.
                  </p>
                </div>
                <div className="work-card__preview work-card__preview--phone-main">
                  <div className="mock-phone mock-phone--hero">
                    <div className="mock-phone-notch" />
                    <img src={publicAsset('/img/metabit-app.jpg')} alt="App Móvil MetaBit" loading="lazy"/>
                  </div>
                </div>
              </div>
            </Link>

            {/* CARD 2 (HORIZONTAL): SISTEMA POS PERIPOLLOS */}
            <Link to="/portafolio" className="work-card">
              <div className="work-card__inner">
                <div className="work-card__header">
                  <span className="work-card__cat">Backend & Escritorio · Sistema POS</span>
                  <h3 className="work-card__title">Sistema de Gestión "Peripollos"</h3>
                  <p className="work-card__desc">
                    Software de escritorio en Java conectado con SQL Server para control de comandas, facturación y stock en pollería. Sincronización mediante webhooks y chatbot de atención integrado.
                  </p>
                </div>
                <div className="work-card__preview">
                  <div className="mock-window">
                    <div className="mock-window-bar">
                      <span className="mock-dot mock-dot--red" />
                      <span className="mock-dot mock-dot--yellow" />
                      <span className="mock-dot mock-dot--green" />
                      <span className="mock-window-title">peripollos_pos_v2.0 — Java / SQL Server</span>
                    </div>
                    <div className="mock-window-screen">
                      <img src={publicAsset('/img/peripollos-pos.png')} alt="Sistema POS Peripollos" loading="lazy"/>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* CARD 3 (HORIZONTAL): PLATAFORMA WEB PERIPOLLOS */}
            <Link to="/portafolio" className="work-card">
              <div className="work-card__inner">
                <div className="work-card__header">
                  <span className="work-card__cat">Web · En Vivo (Netlify)</span>
                  <h3 className="work-card__title">Plataforma Web "Peripollos"</h3>
                  <p className="work-card__desc">
                    Carta digital interactiva y sistema de pedidos directo por WhatsApp. Proyecto desplegado y operativo en producción sobre Netlify.
                  </p>
                </div>
                <div className="work-card__preview">
                  <div className="mock-window">
                    <div className="mock-window-bar">
                      <span className="mock-dot mock-dot--red" />
                      <span className="mock-dot mock-dot--yellow" />
                      <span className="mock-dot mock-dot--green" />
                      <span className="mock-browser-url">peripollos.netlify.app</span>
                    </div>
                    <div className="mock-window-screen">
                      <img src={publicAsset('/img/peripollos-web.png')} alt="Plataforma Web Peripollos" loading="lazy"/>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── STACK TÉCNICO Y COMPETENCIAS ── */}
      <section className="section-pro section-pro--alt">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Competencias Técnicas</span>
            <h2 className="pro-header__title">Stack Tecnológico & Ingeniería</h2>
            <p className="pro-header__desc">
              Herramientas y lenguajes aplicados en proyectos funcionales y diseño de sistemas.
            </p>
          </div>

          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-card__header">
                <div className="skill-card__icon">
                  <svg viewBox="0 0 24 24"><path d="M4 6h16v12H4zm2 2v8h12V8z"/></svg>
                </div>
                <h3 className="skill-card__title">Backend & Arquitectura</h3>
              </div>
              <div className="skill-card__tech">Java 17+ · POO · MVC · REST APIs</div>
              <p className="skill-card__desc">
                Desarrollo de lógica orientada a objetos, arquitectura por capas, control riguroso de excepciones, consumo e integración de webhooks y servicios automatizados.
              </p>
            </div>

            <div className="skill-card">
              <div className="skill-card__header">
                <div className="skill-card__icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zm0 2c4.42 0 8 1.34 8 2.5S16.42 9 12 9 4 7.66 4 6.5 7.58 4 12 4zm0 16c-4.42 0-8-1.34-8-2.5V14.8c1.88 1.11 4.74 1.7 8 1.7s6.12-.59 8-1.7v2.7c0 1.16-3.58 2.5-8 2.5zm0-5c-4.42 0-8-1.34-8-2.5V9.8c1.88 1.11 4.74 1.7 8 1.7s6.12-.59 8-1.7v2.7c0 1.16-3.58 2.5-8 2.5z"/></svg>
                </div>
                <h3 className="skill-card__title">Bases de Datos Relacionales</h3>
              </div>
              <div className="skill-card__tech">Microsoft SQL Server · T-SQL · Normalización</div>
              <p className="skill-card__desc">
                Diseño relacional riguroso (ER, 3NF), consultas optimizadas, procedimientos almacenados, integridad referencial y prevención activa de inyecciones SQL.
              </p>
            </div>

            <div className="skill-card">
              <div className="skill-card__header">
                <div className="skill-card__icon">
                  <svg viewBox="0 0 24 24"><path d="M17 1H7c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V5h10v14z"/></svg>
                </div>
                <h3 className="skill-card__title">Desarrollo Móvil</h3>
              </div>
              <div className="skill-card__tech">Android Nativo · Kotlin · Persistencia</div>
              <p className="skill-card__desc">
                Construcción de aplicaciones nativas para Android, control del ciclo de vida de componentes, algoritmos de cálculo local y compilación de APKs listos para distribución.
              </p>
            </div>

            <div className="skill-card">
              <div className="skill-card__header">
                <div className="skill-card__icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3 className="skill-card__title">Frontend & Herramientas</h3>
              </div>
              <div className="skill-card__tech">React · JavaScript · Git / GitHub · Vite</div>
              <p className="skill-card__desc">
                Desarrollo de interfaces web reactivas, maquetación responsive, control de versiones con Git, despliegue continuo en Netlify y optimización de rendimiento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRINCIPIOS DE INGENIERÍA ── */}
      <section className="section-pro">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Filosofía Técnica</span>
            <h2 className="pro-header__title">Criterios de Desarrollo</h2>
            <p className="pro-header__desc">
              Principios que aplico en el diseño y programación de cada sistema.
            </p>
          </div>

          <div className="principles-grid">
            <div className="principle-card">
              <span className="principle-card__num">01</span>
              <h3 className="principle-card__title">Integridad y Seguridad de Datos</h3>
              <p className="principle-card__desc">
                Cada tabla y relación se concibe con reglas de integridad referencial, asegurando que los datos no se corrompan ante operaciones concurrentes y validando siempre las entradas.
              </p>
            </div>

            <div className="principle-card">
              <span className="principle-card__num">02</span>
              <h3 className="principle-card__title">Código Modular y Mantenible</h3>
              <p className="principle-card__desc">
                Separación clara entre capas de presentación, lógica de negocio y acceso a datos. Código estructurado para facilitar la depuración, auditoría y escalabilidad futura.
              </p>
            </div>

            <div className="principle-card">
              <span className="principle-card__num">03</span>
              <h3 className="principle-card__title">Soluciones para Necesidades Reales</h3>
              <p className="principle-card__desc">
                Enfoque pragmático en resolver problemas operativos reales: control de comandas, facturación comercial, proyecciones financieras y toma de pedidos digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Tienes un proyecto o buscas un desarrollador para tu equipo?"
        subtitle="Conversemos sobre retos técnicos, requerimientos de software o futuras colaboraciones."
        primaryText="Enviar mensaje de contacto"
        primaryLink="/contacto"
        secondaryText="Ver repositorio en GitHub"
        secondaryLink="https://github.com/lxionel"
      />
    </div>
  );
}
