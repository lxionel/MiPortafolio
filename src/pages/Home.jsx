import { useEffect, useState, useCallback } from 'react';
import { useGsap, setupLandingAnimations } from '../hooks/useGsap';
import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState('');

  // Form state
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [motivo, setMotivo] = useState('Oportunidad laboral');
  const [mensaje, setMensaje] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    document.title = 'Lionel Aguirre Gomero — Desarrollador de Software';
  }, []);

  // Top scroll progress listener
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (window.scrollY / total) * 100)));
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // GSAP Entrance & ScrollTrigger animations
  const scope = useGsap((gsap, ScrollTrigger) => {
    setupLandingAnimations(gsap, ScrollTrigger);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const copyEmailToClipboard = (e) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('lioneldavora1@gmail.com');
    showToast('Correo lioneldavora1@gmail.com copiado al portapapeles');
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!nombre.trim() && !mensaje.trim()) {
      setFeedback('Por favor ingresa al menos tu nombre y un mensaje.');
      return;
    }

    const lines = [
      'Hola Lionel, te contacto desde tu portafolio.',
      nombre ? `Nombre: ${nombre}` : '',
      contacto ? `Contacto: ${contacto}` : '',
      motivo ? `Motivo: ${motivo}` : '',
      mensaje ? `\nMensaje:\n${mensaje}` : '',
    ].filter(Boolean).join('\n');

    window.open(wspUrl(lines), '_blank', 'noopener,noreferrer');
    setFeedback('Mensaje preparado en WhatsApp.');
    showToast('Abriendo WhatsApp...');
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contacto Portafolio — ${motivo} (${nombre || 'Interesado'})`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nContacto: ${contacto}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`
    );
    window.location.href = `mailto:lioneldavora1@gmail.com?subject=${subject}&body=${body}`;
    setFeedback('Abriendo cliente de correo electrónico.');
    showToast('Abriendo tu cliente de correo...');
  };

  return (
    <div ref={scope} className="editorial-page">
      {/* ── LÍNEA DE PROGRESO DE LECTURA ── */}
      <div
        className="editorial-progress-line"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* ── SECCIÓN 1: HERO EDITORIAL ── */}
      <section className="editorial-hero" id="inicio">
        <div className="container">
          <div className="editorial-hero__meta">
            <span className="editorial-kicker">Ingeniería de Sistemas · Chimbote, Perú</span>
            <span className="editorial-availability">
              <span className="availability-dot" aria-hidden="true" />
              Disponible para proyectos & desarrollo
            </span>
          </div>

          <h1 className="editorial-hero__title">
            Lionel Aguirre Gomero
          </h1>

          <p className="editorial-hero__headline">
            Desarrollo de Software enfocado en Backend, Bases de Datos Relacionales y Aplicaciones Móviles.
          </p>

          <div className="editorial-hero__body-grid">
            <p className="editorial-hero__lead">
              Construyo sistemas con <strong>Java</strong>, <strong>Microsoft SQL Server</strong>, <strong>Android nativo</strong> y <strong>React</strong>. Mi prioridad es la estabilidad de la lógica de negocio, la integridad referencial en bases de datos y la resolución práctica de necesidades comerciales reales, sin artificios ni dependencias innecesarias.
            </p>

            <div className="editorial-hero__actions">
              <div className="editorial-btn-group">
                <a
                  className="editorial-btn editorial-btn--primary"
                  href="#proyectos"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('proyectos');
                  }}
                >
                  Explorar sistemas desarrollados
                </a>
                <a
                  className="editorial-btn editorial-btn--secondary"
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                  }}
                >
                  Iniciar contacto
                </a>
              </div>

              <div className="editorial-hero__links">
                <a
                  href="https://github.com/lxionel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-text-link"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-text-link"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>

                <button
                  onClick={copyEmailToClipboard}
                  className="editorial-text-link editorial-text-link--btn"
                  title="Copiar correo electrónico"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>lioneldavora1@gmail.com</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: PROYECTOS / MONOGRAFÍAS DE INGENIERÍA ── */}
      <section className="editorial-section" id="proyectos">
        <div className="container">
          <div className="editorial-section__header">
            <span className="editorial-section__num">01</span>
            <div className="editorial-section__title-block">
              <h2 className="editorial-section__title">Sistemas Desarrollados</h2>
              <p className="editorial-section__desc">
                Proyectos reales estructurados con criterio de ingeniería, atendiendo la arquitectura de persistencia, control transaccional y experiencia de uso.
              </p>
            </div>
          </div>

          <div className="editorial-projects-list">
            {/* ── CASO 01: POS PERIPOLLOS (JAVA 17 + SQL SERVER) ── */}
            <article className="project-case">
              <div className="project-case__meta-bar">
                <div className="project-case__index">Caso 01 / 03</div>
                <div className="project-case__type">Sistema de Escritorio & Backend Transaccional</div>
              </div>

              <div className="project-case__layout">
                <div className="project-case__info">
                  <h3 className="project-case__title">Sistema POS para Gestión Comercial y Facturación Local</h3>
                  <p className="project-case__subtitle">
                    Control operativo de comandas, mesas, facturación y caja diaria para restaurante de alta rotación.
                  </p>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">El Problema</h4>
                    <p className="detail-block__text">
                      En entornos gastronómicos con alta concurrencia, la toma manual de comandas genera extravíos de pedidos, desajustes en el inventario y lentitud en el cuadre de caja al cierre del turno. Adicionalmente, las caídas del servicio de internet impiden operar sistemas que dependen exclusivamente de la nube.
                    </p>
                  </div>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">Solución & Arquitectura</h4>
                    <p className="detail-block__text">
                      Se diseñó una aplicación de escritorio autónoma construida sobre <strong>Java 17</strong> y <strong>Microsoft SQL Server</strong>. Opera de forma completamente local, garantizando disponibilidad total aún sin conexión externa.
                    </p>
                    <ul className="project-case__features">
                      <li>
                        <strong>Arquitectura por capas con Patrón DAO:</strong> Desacoplamiento total entre la lógica del negocio, las pantallas de usuario y el acceso a datos mediante JDBC nativo.
                      </li>
                      <li>
                        <strong>Transacciones ACID en SQL Server:</strong> Procedimientos almacenados con control atómico para garantizar que el registro de una venta, la emisión del comprobante y el descuento de stock ocurran como una única unidad indivisible.
                      </li>
                      <li>
                        <strong>Monitoreo de mesas en tiempo real:</strong> Matriz visual interactiva para apertura de mesas, adición de pedidos y consolidación inmediata de cuentas.
                      </li>
                    </ul>
                  </div>

                  <div className="project-case__tech-tags">
                    <span className="case-tag">Java 17</span>
                    <span className="case-tag">Microsoft SQL Server</span>
                    <span className="case-tag">Transacciones ACID</span>
                    <span className="case-tag">Patrón DAO</span>
                    <span className="case-tag">JDBC</span>
                    <span className="case-tag">Arquitectura por Capas</span>
                  </div>
                </div>

                <div className="project-case__visual">
                  <div className="mockup-frame mockup-frame--desktop">
                    <div className="mockup-frame__bar">
                      <div className="mockup-frame__dots">
                        <span className="dot dot--red" />
                        <span className="dot dot--yellow" />
                        <span className="dot dot--green" />
                      </div>
                      <span className="mockup-frame__title">Sistema POS — Java 17 / Microsoft SQL Server</span>
                    </div>
                    <div className="mockup-frame__screen">
                      <img
                        src={publicAsset('/img/peripollos-pos.png')}
                        alt="Captura completa del Sistema POS Peripollos desarrollado en Java y SQL Server"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <span className="project-case__caption">
                    Interfaz de ventas y comandas del sistema POS. Captura real de la aplicación de escritorio en ejecución.
                  </span>
                </div>
              </div>
            </article>

            {/* ── CASO 02: METABIT (ANDROID NATIVO) ── */}
            <article className="project-case">
              <div className="project-case__meta-bar">
                <div className="project-case__index">Caso 02 / 03</div>
                <div className="project-case__type">Aplicación Móvil Nativa (Android)</div>
              </div>

              <div className="project-case__layout">
                <div className="project-case__info">
                  <h3 className="project-case__title">App Móvil "MetaBit" — Planificación Financiera Personal</h3>
                  <p className="project-case__subtitle">
                    Cálculo algorítmico de metas de ahorro con persistencia local y funcionamiento offline-first.
                  </p>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">El Problema</h4>
                    <p className="detail-block__text">
                      Las aplicaciones convencionales de finanzas personales exigen registros forzosos en servidores externos, envían información privada a la nube y dejan de funcionar cuando el usuario no tiene conexión de datos o cobertura móvil.
                    </p>
                  </div>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">Solución & Arquitectura</h4>
                    <p className="detail-block__text">
                      Desarrollo nativo para el ecosistema <strong>Android</strong> orientado a la privacidad y la inmediatez. La aplicación almacena y procesa la totalidad de la información directamente en el dispositivo móvil.
                    </p>
                    <ul className="project-case__features">
                      <li>
                        <strong>Persistencia local con Room Database / SQLite:</strong> Modelado relacional interno con entidades estructuradas y consultas asíncronas para garantizar que los datos estén siempre accesibles.
                      </li>
                      <li>
                        <strong>Patrón MVVM (Model-View-ViewModel):</strong> Desacoplamiento estricto de la interfaz gráfica respecto a las operaciones lógicas, optimizando el ciclo de vida de la aplicación ante rotaciones o pausas de pantalla.
                      </li>
                      <li>
                        <strong>Algoritmo de cálculo de cuotas y plazos:</strong> Proyecciones dinámicas que determinan el ritmo de ahorro mensual necesario para alcanzar metas dentro de plazos definidos.
                      </li>
                    </ul>
                  </div>

                  <div className="project-case__tech-tags">
                    <span className="case-tag">Android SDK</span>
                    <span className="case-tag">Kotlin</span>
                    <span className="case-tag">Room DB / SQLite</span>
                    <span className="case-tag">Arquitectura MVVM</span>
                    <span className="case-tag">Offline-First</span>
                    <span className="case-tag">APK Compilado</span>
                  </div>
                </div>

                <div className="project-case__visual">
                  <div className="mockup-frame mockup-frame--phone">
                    <div className="mockup-phone-shell">
                      <div className="mockup-phone-camera" />
                      <div className="mockup-phone-screen">
                        <img
                          src={publicAsset('/img/metabit.png')}
                          alt="Captura vertical completa de la aplicación móvil MetaBit en Android"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                  <span className="project-case__caption">
                    Pantalla vertical completa de MetaBit. Se aprecia el formulario de meta, plazos y visualización de progreso.
                  </span>
                </div>
              </div>
            </article>

            {/* ── CASO 03: PLATAFORMA WEB PERIPOLLOS (REACT EN VIVO) ── */}
            <article className="project-case">
              <div className="project-case__meta-bar">
                <div className="project-case__index">Caso 03 / 03</div>
                <div className="project-case__type">Plataforma Web en Producción (Netlify)</div>
              </div>

              <div className="project-case__layout">
                <div className="project-case__info">
                  <h3 className="project-case__title">Plataforma Web "PeriPollos" — Carta Digital & Despacho</h3>
                  <p className="project-case__subtitle">
                    Canal interactivo de pedidos en línea desplegado en producción con conexión a WhatsApp.
                  </p>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">El Problema</h4>
                    <p className="detail-block__text">
                      Las plataformas de delivery tradicionales cobran comisiones significativas por cada orden. El negocio requería un canal directo, ligero y accesible desde cualquier navegador móvil sin forzar la descarga de una app externa.
                    </p>
                  </div>

                  <div className="project-case__detail-block">
                    <h4 className="detail-block__label">Solución & Arquitectura</h4>
                    <p className="detail-block__text">
                      Construcción de una aplicación web responsiva en <strong>React</strong>, optimizada para tiempos de carga mínimos y alojada en <strong>Netlify</strong> con canal de entrega continuo.
                    </p>
                    <ul className="project-case__features">
                      <li>
                        <strong>Estado reactivo para el carrito:</strong> Adición de platos, complementos y promociones con cálculo instantáneo de totales en memoria.
                      </li>
                      <li>
                        <strong>Generador de payload para WhatsApp:</strong> Estructura el resumen de la comanda con precios y cantidades para despacharlo directamente al chat del restaurante.
                      </li>
                      <li>
                        <strong>Diseño responsivo móvil:</strong> Interfaz adaptada con precisión tanto para teléfonos inteligentes como para computadoras de escritorio.
                      </li>
                    </ul>
                  </div>

                  <div className="project-case__actions">
                    <a
                      className="editorial-btn editorial-btn--primary"
                      href="https://peripollos.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Abrir sitio web en vivo</span>
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
                        <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7H5V7h7V5H5z"/>
                      </svg>
                    </a>
                  </div>

                  <div className="project-case__tech-tags">
                    <span className="case-tag">React</span>
                    <span className="case-tag">JavaScript ES6+</span>
                    <span className="case-tag">Netlify Hosting</span>
                    <span className="case-tag">API WhatsApp</span>
                    <span className="case-tag">Responsive Design</span>
                  </div>
                </div>

                <div className="project-case__visual">
                  <div className="mockup-frame mockup-frame--desktop">
                    <div className="mockup-frame__bar">
                      <div className="mockup-frame__dots">
                        <span className="dot dot--red" />
                        <span className="dot dot--yellow" />
                        <span className="dot dot--green" />
                      </div>
                      <span className="mockup-frame__url">peripollos.netlify.app</span>
                    </div>
                    <div className="mockup-frame__screen">
                      <img
                        src={publicAsset('/img/peripollos-web.png')}
                        alt="Captura completa de la carta digital de PeriPollos desplegada en Netlify"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <span className="project-case__caption">
                    Carta digital interactiva en producción. Despliegue activo en la red de Netlify.
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: COMPETENCIAS TÉCNICAS & METODOLOGÍA ── */}
      <section className="editorial-section editorial-section--alt" id="stack">
        <div className="container">
          <div className="editorial-section__header">
            <span className="editorial-section__num">02</span>
            <div className="editorial-section__title-block">
              <h2 className="editorial-section__title">Competencias Técnicas</h2>
              <p className="editorial-section__desc">
                Criterios de ingeniería y tecnologías aplicadas en la solución de problemas de software.
              </p>
            </div>
          </div>

          <div className="editorial-stack-grid">
            <div className="stack-card">
              <div className="stack-card__num">01</div>
              <h3 className="stack-card__title">Sistemas Backend & Escritorio</h3>
              <p className="stack-card__lead">
                Java 17+ · Patrón DAO · Arquitectura MVC · JDBC · Manejo de Excepciones
              </p>
              <p className="stack-card__desc">
                Desarrollo orientado a objetos con tipado estricto. Construcción de capas de acceso a datos modulares, control estructurado de fallas y lógica transaccional para sistemas que requieran continuidad operativa.
              </p>
            </div>

            <div className="stack-card">
              <div className="stack-card__num">02</div>
              <h3 className="stack-card__title">Bases de Datos Relacionales</h3>
              <p className="stack-card__lead">
                Microsoft SQL Server · T-SQL · Normalización 3NF · Transacciones ACID
              </p>
              <p className="stack-card__desc">
                Diseño de esquemas relacionales con integridad referencial estricta. Creación de procedimientos almacenados, prevención activa de inyecciones SQL y optimización de consultas para consistencia total en operaciones críticas.
              </p>
            </div>

            <div className="stack-card">
              <div className="stack-card__num">03</div>
              <h3 className="stack-card__title">Desarrollo Móvil Nativo</h3>
              <p className="stack-card__lead">
                Android SDK · Kotlin · Room Database · SQLite · Arquitectura MVVM
              </p>
              <p className="stack-card__desc">
                Aplicaciones para Android que respetan el ciclo de vida del sistema operativo. Implementación de bases de datos locales para funcionamiento autónomo (offline-first) y compilación de paquetes APK funcionales.
              </p>
            </div>

            <div className="stack-card">
              <div className="stack-card__num">04</div>
              <h3 className="stack-card__title">Frontend & Herramientas de Entorno</h3>
              <p className="stack-card__lead">
                React · JavaScript Moderno · Vite · Git / GitHub · Netlify CI/CD
              </p>
              <p className="stack-card__desc">
                Desarrollo de interfaces web reactivas y adaptables a cualquier dispositivo. Control riguroso de versiones con Git, automatización de compilaciones y despliegues continuos en plataformas de producción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4: SOBRE MÍ & TRAYECTORIA ── */}
      <section className="editorial-section" id="sobre-mi">
        <div className="container">
          <div className="editorial-section__header">
            <span className="editorial-section__num">03</span>
            <div className="editorial-section__title-block">
              <h2 className="editorial-section__title">Trayectoria & Perfil</h2>
              <p className="editorial-section__desc">
                Formación académica, enfoque personal de trabajo y compromiso profesional.
              </p>
            </div>
          </div>

          <div className="editorial-about-grid">
            <div className="editorial-portrait-card">
              <div className="editorial-portrait-frame">
                <img
                  src={publicAsset('/img/lionel.png')}
                  alt="Lionel Aguirre Gomero — Desarrollador de Software"
                  loading="lazy"
                />
              </div>
              <div className="editorial-portrait-info">
                <h3 className="portrait-name">Lionel Aguirre Gomero</h3>
                <p className="portrait-spec">Estudiante de Ingeniería de Sistemas</p>
                <div className="portrait-meta-rows">
                  <div className="meta-row">
                    <span>Ubicación:</span>
                    <span>Chimbote, Perú</span>
                  </div>
                  <div className="meta-row">
                    <span>Enfoque principal:</span>
                    <span>Backend & Móvil</span>
                  </div>
                  <div className="meta-row">
                    <span>Disponibilidad:</span>
                    <span className="meta-row__highlight">Inmediata</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="editorial-bio-content">
              <h3 className="bio-title">Ingeniería de software aplicada a necesidades reales.</h3>
              <p className="bio-paragraph">
                Mi nombre es Lionel Aguirre Gomero. Curso la carrera de <strong>Ingeniería de Sistemas</strong> y me dedico al diseño y programación de aplicaciones orientadas a optimizar operaciones comerciales y de gestión.
              </p>
              <p className="bio-paragraph">
                Lejos de enfocarme únicamente en la apariencia visual, pongo especial atención en las bases de un sistema: cómo se modelan las tablas en <strong>SQL Server</strong> para que la información nunca se corrompa, cómo se organiza el código en <strong>Java</strong> para que sea mantenible con los años, y cómo se concibe una aplicación móvil en <strong>Android</strong> para que responda con fluidez aún sin internet.
              </p>
              <p className="bio-paragraph">
                No ofrezco fórmulas mágicas ni soluciones infladas con palabras de moda. Mi objetivo es ejercer la programación con disciplina técnica, aprender de los desafíos de cada proyecto y colaborar con equipos que valoren la calidad del código y la seriedad profesional.
              </p>

              <div className="editorial-bio-principles">
                <div className="bio-principle">
                  <span className="principle-number">I</span>
                  <div>
                    <h4>Integridad sobre artificio</h4>
                    <p>Las bases de datos deben garantizar transaccionalidad estricta antes de priorizar efectos cosméticos.</p>
                  </div>
                </div>
                <div className="bio-principle">
                  <span className="principle-number">II</span>
                  <div>
                    <h4>Código legible y desacoplado</h4>
                    <p>Separar capas de datos, negocio y presentación facilita la auditoría, depuración y mantenimiento a futuro.</p>
                  </div>
                </div>
                <div className="bio-principle">
                  <span className="principle-number">III</span>
                  <div>
                    <h4>Soluciones prácticas y medibles</h4>
                    <p>El software debe resolver un problema operativo concreto: agilizar cobros, controlar comandas o proyectar ahorros.</p>
                  </div>
                </div>
              </div>

              <div className="editorial-bio-actions">
                <a
                  className="editorial-btn editorial-btn--primary"
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                  }}
                >
                  Contactar conmigo
                </a>
                <a
                  className="editorial-btn editorial-btn--secondary"
                  href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver trayectoria en LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 5: CONTACTO DIRECTO ── */}
      <section className="editorial-section editorial-section--alt" id="contacto">
        <div className="container">
          <div className="editorial-section__header">
            <span className="editorial-section__num">04</span>
            <div className="editorial-section__title-block">
              <h2 className="editorial-section__title">Comunicación Directa</h2>
              <p className="editorial-section__desc">
                Disponible para oportunidades laborales, desarrollo de sistemas de software o colaboraciones técnicas.
              </p>
            </div>
          </div>

          <div className="editorial-contact-grid">
            <div className="contact-channels-column">
              <a
                className="editorial-channel-card"
                href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="channel-icon-wrap">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div>
                  <span className="channel-label">LinkedIn Profesional</span>
                  <strong className="channel-value">Lionel Aguirre Gomero</strong>
                  <span className="channel-hint">Perfil y red de contactos</span>
                </div>
              </a>

              <a
                className="editorial-channel-card"
                href="https://github.com/lxionel"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="channel-icon-wrap">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <span className="channel-label">Repositorios & Código</span>
                  <strong className="channel-value">@lxionel</strong>
                  <span className="channel-hint">Proyectos en GitHub</span>
                </div>
              </a>

              <div
                className="editorial-channel-card editorial-channel-card--copy"
                onClick={copyEmailToClipboard}
              >
                <div className="channel-icon-wrap">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <div style={{ flex: 1 }}>
                  <span className="channel-label">Correo Electrónico</span>
                  <strong className="channel-value">lioneldavora1@gmail.com</strong>
                  <span className="channel-hint">Clic para copiar al portapapeles</span>
                </div>
              </div>

              <a
                className="editorial-channel-card"
                href={wspUrl('Hola Lionel, vi tu portafolio y me gustaría ponerme en contacto contigo.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="channel-icon-wrap channel-icon-wrap--wsp">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                  </svg>
                </div>
                <div>
                  <span className="channel-label">WhatsApp Directo</span>
                  <strong className="channel-value">+51 952 102 805</strong>
                  <span className="channel-hint">Respuesta rápida</span>
                </div>
              </a>
            </div>

            <div className="contact-form-column">
              <form className="editorial-form" onSubmit={handleSendWhatsApp}>
                <div className="form-field">
                  <label htmlFor="ed-name">Tu nombre o empresa</label>
                  <input
                    id="ed-name"
                    type="text"
                    placeholder="Ej. Carlos Mendoza"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="ed-contact">Correo o teléfono de contacto</label>
                  <input
                    id="ed-contact"
                    type="text"
                    placeholder="Ej. carlos@empresa.com o +51 987..."
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  />
                </div>

                <div className="form-field">
                  <label>Motivo de comunicación</label>
                  <div className="motive-chips">
                    {[
                      'Oportunidad laboral',
                      'Desarrollo de software',
                      'Consulta técnica',
                      'Colaboración',
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`motive-chip ${motivo === m ? 'motive-chip--active' : ''}`}
                        onClick={() => setMotivo(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="ed-msg">Mensaje</label>
                  <textarea
                    id="ed-msg"
                    rows="4"
                    placeholder="Describe tu propuesta, requerimiento técnico o consulta..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  />
                </div>

                <div className="form-actions-row">
                  <button type="submit" className="editorial-btn editorial-btn--primary">
                    Enviar a WhatsApp
                  </button>
                  <button
                    type="button"
                    className="editorial-btn editorial-btn--secondary"
                    onClick={handleSendMail}
                  >
                    Enviar por Correo
                  </button>
                </div>

                {feedback && <div className="editorial-form-feedback">{feedback}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOAST NOTIFICATION ── */}
      {toastMessage && (
        <div className="editorial-toast">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
