import { useEffect, useState, useCallback } from 'react';
import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const PROJECTS = [
  {
    id: 'pos',
    title: 'Sistema POS PeriPollos',
    category: 'Sistema de Escritorio & Backend Transaccional',
    badge: 'Java 17 · SQL Server · ACID',
    image: publicAsset('/img/peripollos-pos.png'),
    description: 'Punto de venta e inventario transaccional con persistencia en tiempo real, control de comandas, facturación y arqueos de caja sin desfases.',
    problem: 'En restaurantes de alta rotación, la comanda manual provoca pérdidas de pedidos, desfases de inventario y lentitud en el arqueo de caja. Las caídas de red impiden el uso de sistemas que dependen exclusivamente de la nube.',
    solution: 'Aplicación de escritorio autónoma construida sobre Java 17 y Microsoft SQL Server. Funciona de manera 100% local, garantizando alta disponibilidad sin requerir conexión continua a internet.',
    features: [
      'Arquitectura modular desacoplada mediante Patrón DAO y acceso a datos con JDBC nativo.',
      'Procedimientos almacenados en SQL Server con transacciones ACID para asegurar la atomicidad de ventas, emisión de boletas y descarga de inventario.',
      'Módulo visual de control de mesas y comandas con actualización reactiva.',
      'Generación de reportes de auditoría y arqueos diarios de caja.'
    ],
    tags: ['Java 17', 'Microsoft SQL Server', 'Transacciones ACID', 'Patrón DAO', 'JDBC', 'Arquitectura por Capas'],
    links: [
      { label: 'Repositorio en GitHub', url: 'https://github.com/lxionel' },
      { label: 'Consultar por WhatsApp', url: wspUrl('Hola Lionel, me gustaria conocer mas sobre el Sistema POS PeriPollos.') }
    ]
  },
  {
    id: 'metabit',
    title: 'MetaBit — Planificación Financiera',
    category: 'Aplicación Móvil Nativa (Android)',
    badge: 'Kotlin · Android · Room DB',
    image: publicAsset('/img/metabit-app.jpg'),
    description: 'Aplicación nativa para Android con arquitectura MVVM y persistencia local offline-first con Room DB para planificación y metas de ahorro.',
    problem: 'La mayoría de aplicaciones financieras comerciales imponen registros obligatorios en servidores externos, comprometen la privacidad y no funcionan sin cobertura de datos móviles.',
    solution: 'Desarrollo nativo para el ecosistema Android con Kotlin y base de datos local SQLite / Room DB, garantizando privacidad total y funcionamiento inmediato en cualquier circunstancia.',
    features: [
      'Persistencia local reactiva con Room Database / SQLite y consultas asíncronas seguras.',
      'Patrón de arquitectura MVVM (Model-View-ViewModel) para aislar la interfaz gráfica del ciclo de vida y los datos.',
      'Algoritmo matemático de cálculo y proyección de cuotas de ahorro con visualización de avance.',
      'Compilación directa en paquete APK optimizado.'
    ],
    tags: ['Android SDK', 'Kotlin', 'Room DB / SQLite', 'MVVM', 'Offline-First', 'Clean Architecture'],
    links: [
      { label: 'Repositorio en GitHub', url: 'https://github.com/lxionel' },
      { label: 'Consultar por WhatsApp', url: wspUrl('Hola Lionel, me gustaria conocer mas sobre la app MetaBit Android.') }
    ]
  },
  {
    id: 'web',
    title: 'PeriPollos Web & Pedidos',
    category: 'Plataforma Web en Producción (Netlify)',
    badge: 'React · Netlify · WhatsApp API',
    image: publicAsset('/img/peripollos-web.png'),
    description: 'Carta digital interactiva y canal de pedidos directos hacia WhatsApp desplegado en producción con Netlify CI/CD.',
    problem: 'Las comisiones de las aplicaciones de delivery tradicionales reducen el margen comercial y exigen descargas adicionales al cliente final.',
    solution: 'Aplicación web ágil y responsiva creada en React, optimizada para carga veloz desde cualquier smartphone y alojada en Netlify con despliegue continuo.',
    features: [
      'Gestión de estado reactivo para carrito de compras con cómputo instantáneo de totales.',
      'Generador estructurado de pedido para despacho directo al canal de WhatsApp del negocio.',
      'Diseño responsivo optimizado para navegación en teléfonos móviles y computadoras.',
      'Canal de despliegue continuo CI/CD configurado en Netlify.'
    ],
    tags: ['React', 'JavaScript ES6+', 'Netlify Hosting', 'WhatsApp API', 'Responsive Web'],
    links: [
      { label: 'Ver sitio web en vivo', url: 'https://peripollos.netlify.app/' },
      { label: 'Repositorio en GitHub', url: 'https://github.com/lxionel' }
    ]
  }
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState('');

  // Form State
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');
  const [motivo, setMotivo] = useState('Oportunidad laboral');
  const [mensaje, setMensaje] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    document.title = 'Lionel Aguirre Gomero — Desarrollador de Software';
  }, []);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
      setFeedback('Por favor completa tu nombre y un mensaje.');
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
    setFeedback('Abriendo cliente de correo.');
    showToast('Abriendo cliente de correo...');
  };

  return (
    <main>
      {/* ── SECCIÓN 1: HERO (Hero.vue David Heckhoff) ── */}
      <section className="heckhoff-hero container" id="inicio">
        <div className="heckhoff-hero-meta">
          <span className="heckhoff-live-indicator" aria-hidden="true" />
          <span>Ingeniería de Sistemas · Chimbote, Perú · Disponible</span>
        </div>

        <div className="heckhoff-hero-title-wrap">
          <h1 className="heckhoff-hero-title">
            Lionel<br />Aguirre
          </h1>
          <div className="heckhoff-banner heckhoff-hero-banner size-md">
            <div className="heckhoff-banner-bg" />
            <span className="heckhoff-banner-text">Desarrollador de Software</span>
          </div>
        </div>

        <p className="heckhoff-hero-bio">
          Especializado en backend transaccional con Java y SQL Server, arquitectura de persistencia, desarrollo móvil nativo en Android y aplicaciones web con React.
        </p>

        <div className="heckhoff-hero-actions">
          <a
            className="heckhoff-btn heckhoff-btn-accent size-lg"
            href="#proyectos"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('proyectos');
            }}
          >
            Ver Proyectos
          </a>
          <a
            className="heckhoff-btn heckhoff-btn-border size-lg"
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contacto');
            }}
          >
            Iniciar Contacto
          </a>
        </div>
      </section>

      {/* ── SECCIÓN 2: PROYECTOS (Projects.vue & PreviewCard.vue David Heckhoff) ── */}
      <section className="heckhoff-section container" id="proyectos">
        <div className="heckhoff-section-header">
          <div className="heckhoff-banner heckhoff-section-banner size-sm">
            <div className="heckhoff-banner-bg" />
            <span className="heckhoff-banner-text">Selección</span>
          </div>
          <h2 className="heckhoff-section-title">Proyectos</h2>
          <p className="heckhoff-section-desc">
            Sistemas reales diseñados con rigor de ingeniería, control transaccional, persistencia atómica y valor operativo directo. Haz clic en cada proyecto para inspeccionar detalles y capturas completas.
          </p>
        </div>

        <div className="heckhoff-projects-grid">
          {PROJECTS.map((proj) => (
            <article
              key={proj.id}
              className="heckhoff-preview-card"
              onClick={() => setSelectedProject(proj)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedProject(proj);
                }
              }}
              aria-label={`Ver detalles del proyecto ${proj.title}`}
            >
              <div className="heckhoff-card-top">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="heckhoff-card-image"
                  loading="lazy"
                />
                <div className="heckhoff-card-edge">
                  <div className="heckhoff-card-button" aria-hidden="true">
                    <svg
                      className="heckhoff-card-arrow"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="heckhoff-card-content">
                <div className="heckhoff-card-tags">
                  <span className="heckhoff-card-tag">{proj.badge}</span>
                </div>
                <h3 className="heckhoff-card-title">{proj.title}</h3>
                <p className="heckhoff-card-desc">{proj.description}</p>
              </div>
            </article>
          ))}

          {/* 4th Card: Empty "Start a Project" (matching David Heckhoff PreviewCard empty state) */}
          <div
            className="heckhoff-card-empty"
            onClick={() => {
              window.open(wspUrl('Hola Lionel, tengo una consulta sobre un nuevo proyecto de software.'), '_blank', 'noopener,noreferrer');
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.open(wspUrl('Hola Lionel, tengo una consulta sobre un nuevo proyecto de software.'), '_blank', 'noopener,noreferrer');
              }
            }}
            aria-label="Proponer un nuevo proyecto por WhatsApp"
          >
            <div className="heckhoff-empty-icon">+</div>
            <div>
              <h3 className="heckhoff-card-title">¿Tienes un proyecto en mente?</h3>
              <p className="heckhoff-card-desc">Conversemos directamente por WhatsApp o correo sobre cómo construirlo.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: SOBRE MÍ / DOSSIER TÉCNICO (About.vue David Heckhoff) ── */}
      <section className="heckhoff-section container" id="sobre-mi">
        <div className="heckhoff-section-header">
          <div className="heckhoff-banner heckhoff-section-banner size-sm">
            <div className="heckhoff-banner-bg" />
            <span className="heckhoff-banner-text">Perfil</span>
          </div>
          <h2 className="heckhoff-section-title">Sobre Mí</h2>
          <p className="heckhoff-section-desc">
            Formación académica, enfoque personal de ingeniería y competencias técnicas aplicadas.
          </p>
        </div>

        <div className="heckhoff-about-grid">
          {/* Columna Izquierda: Ficha y Fotografía */}
          <div className="heckhoff-dossier-card">
            <div className="heckhoff-portrait-wrap">
              <img
                src={publicAsset('/img/lionel.png')}
                alt="Lionel Aguirre Gomero"
                className="heckhoff-portrait-img"
                loading="lazy"
              />
            </div>
            <div className="heckhoff-dossier-meta">
              <div className="heckhoff-meta-item">
                <span>Nombre</span>
                <span className="heckhoff-meta-val">Lionel Aguirre Gomero</span>
              </div>
              <div className="heckhoff-meta-item">
                <span>Carrera</span>
                <span className="heckhoff-meta-val">Ing. de Sistemas</span>
              </div>
              <div className="heckhoff-meta-item">
                <span>Ubicación</span>
                <span className="heckhoff-meta-val">Chimbote, Perú</span>
              </div>
              <div className="heckhoff-meta-item">
                <span>Enfoque</span>
                <span className="heckhoff-meta-val">Backend & Móvil</span>
              </div>
              <div className="heckhoff-meta-item">
                <span>Disponibilidad</span>
                <span className="heckhoff-meta-val" style={{ color: '#22c55e' }}>Inmediata</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Filosofía y Habilidades */}
          <div className="heckhoff-about-content">
            <h3 className="heckhoff-lead-quote">
              Ingeniería de software orientada a la estabilidad de datos y la resolución práctica de necesidades comerciales.
            </h3>

            <p className="heckhoff-bio-text">
              Mi objetivo es ejercer la disciplina técnica en cada etapa del desarrollo: modelar esquemas en <strong>Microsoft SQL Server</strong> que preserven la integridad referencial y atomicidad (ACID), estructurar el código en <strong>Java</strong> bajo patrones modulares como DAO y MVC para que sea auditable y escalable, y construir aplicaciones móviles en <strong>Android</strong> con Kotlin y arquitectura offline-first con Room DB.
            </p>

            <div className="heckhoff-principles-grid">
              <div className="heckhoff-principle-card">
                <div className="heckhoff-principle-num">PRINCIPIO 01</div>
                <h4 className="heckhoff-principle-title">Integridad Transaccional</h4>
                <p className="heckhoff-principle-desc">
                  Prioridad a la consistencia de datos y control atómico antes de cualquier efecto superficial.
                </p>
              </div>

              <div className="heckhoff-principle-card">
                <div className="heckhoff-principle-num">PRINCIPIO 02</div>
                <h4 className="heckhoff-principle-title">Desacoplamiento Estricto</h4>
                <p className="heckhoff-principle-desc">
                  Separación clara entre capas de presentación, lógica de negocio y persistencia para facilitar el mantenimiento.
                </p>
              </div>

              <div className="heckhoff-principle-card">
                <div className="heckhoff-principle-num">PRINCIPIO 03</div>
                <h4 className="heckhoff-principle-title">Utilidad Operativa Real</h4>
                <p className="heckhoff-principle-desc">
                  Software concebido para solucionar cuellos de botella comerciales: ventas, inventarios y arqueos limpios.
                </p>
              </div>
            </div>

            {/* Competencias Técnicas */}
            <div className="heckhoff-skills-section">
              <h4 className="heckhoff-skills-title">Competencias de Ingeniería</h4>
              <div className="heckhoff-skills-grid">
                <span className="heckhoff-skill-chip">Java 17</span>
                <span className="heckhoff-skill-chip">Microsoft SQL Server</span>
                <span className="heckhoff-skill-chip">Transacciones ACID</span>
                <span className="heckhoff-skill-chip">Patrón DAO</span>
                <span className="heckhoff-skill-chip">JDBC Nativo</span>
                <span className="heckhoff-skill-chip">Android SDK</span>
                <span className="heckhoff-skill-chip">Kotlin</span>
                <span className="heckhoff-skill-chip">Room DB / SQLite</span>
                <span className="heckhoff-skill-chip">Arquitectura MVVM</span>
                <span className="heckhoff-skill-chip">React</span>
                <span className="heckhoff-skill-chip">JavaScript ES6+</span>
                <span className="heckhoff-skill-chip">Vite</span>
                <span className="heckhoff-skill-chip">Git & GitHub</span>
                <span className="heckhoff-skill-chip">Netlify CI/CD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4: CONTACTO (Contact.vue & Social.vue David Heckhoff) ── */}
      <section className="heckhoff-contact-section" id="contacto">
        <div className="container">
          <div className="heckhoff-contact-grid">
            {/* Columna Izquierda: Titular y Redes Sociales */}
            <div>
              <div className="heckhoff-banner heckhoff-section-banner size-sm">
                <div className="heckhoff-banner-bg" />
                <span className="heckhoff-banner-text">Contacto</span>
              </div>
              <h2 className="heckhoff-contact-title">
                ¿Trabajamos<br />Juntos?
              </h2>
              <p className="heckhoff-contact-desc">
                Estoy disponible para oportunidades laborales, desarrollo de sistemas a medida y proyectos de software. Conectemos por el canal de tu preferencia.
              </p>

              {/* Botones Sociales Circulares (Social.vue style) */}
              <div className="heckhoff-social-row">
                <a
                  href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heckhoff-social-link"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>

                <a
                  href="https://github.com/lxionel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heckhoff-social-link"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>

                <a
                  href={wspUrl('Hola Lionel, vi tu portafolio y me gustaria conversar contigo.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="heckhoff-social-link"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg viewBox="0 0 24 24" fill="#25D366">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                  </svg>
                </a>

                <button
                  onClick={copyEmailToClipboard}
                  className="heckhoff-social-link"
                  aria-label="Copiar correo"
                  title="Copiar lioneldavora1@gmail.com"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </button>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-text-300)' }}>
                Correo: <strong>lioneldavora1@gmail.com</strong>
              </div>
            </div>

            {/* Columna Derecha: Tarjeta de Contacto Directo */}
            <div className="heckhoff-contact-card">
              <h3 className="heckhoff-form-title">Envía un mensaje directo</h3>

              <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="heckhoff-input-group">
                  <label htmlFor="form-nombre" className="heckhoff-label">Nombre o Empresa</label>
                  <input
                    id="form-nombre"
                    type="text"
                    className="heckhoff-input"
                    placeholder="Ej. Carlos Mendoza"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="heckhoff-input-group">
                  <label htmlFor="form-contacto" className="heckhoff-label">Correo o Teléfono</label>
                  <input
                    id="form-contacto"
                    type="text"
                    className="heckhoff-input"
                    placeholder="Ej. correo@ejemplo.com o +51..."
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  />
                </div>

                <div className="heckhoff-input-group">
                  <label htmlFor="form-motivo" className="heckhoff-label">Motivo</label>
                  <select
                    id="form-motivo"
                    className="heckhoff-input"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                  >
                    <option value="Oportunidad laboral">Oportunidad laboral</option>
                    <option value="Desarrollo de sistema">Desarrollo de sistema</option>
                    <option value="Consulta técnica">Consulta técnica</option>
                    <option value="Colaboración profesional">Colaboración profesional</option>
                  </select>
                </div>

                <div className="heckhoff-input-group">
                  <label htmlFor="form-mensaje" className="heckhoff-label">Mensaje</label>
                  <textarea
                    id="form-mensaje"
                    className="heckhoff-textarea"
                    placeholder="Detalla tu requerimiento o propuesta..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '8px' }}>
                  <button type="submit" className="heckhoff-btn heckhoff-btn-accent size-md">
                    Enviar a WhatsApp
                  </button>
                  <button
                    type="button"
                    className="heckhoff-btn heckhoff-btn-theme size-md"
                    onClick={handleSendMail}
                  >
                    Enviar por Correo
                  </button>
                </div>

                {feedback && (
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-orange-400)', marginTop: '4px' }}>
                    {feedback}
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MODAL DE DETALLE DE PROYECTO (IMÁGENES COMPLETAS) ── */}
      {selectedProject && (
        <div
          className="heckhoff-modal-overlay"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="heckhoff-modal-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="heckhoff-modal-close"
              onClick={() => setSelectedProject(null)}
              aria-label="Cerrar modal"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="heckhoff-modal-header">
              <div className="heckhoff-modal-meta">{selectedProject.category}</div>
              <h3 className="heckhoff-modal-title">{selectedProject.title}</h3>
              <div className="heckhoff-card-tags">
                <span className="heckhoff-card-tag">{selectedProject.badge}</span>
              </div>
            </div>

            {/* Imagen Completa sin recortar */}
            <div className="heckhoff-modal-image-wrap">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="heckhoff-modal-image"
              />
            </div>

            <div className="heckhoff-modal-grid">
              <div className="heckhoff-modal-block">
                <div className="heckhoff-modal-block-label">El Problema</div>
                <p className="heckhoff-modal-block-text">{selectedProject.problem}</p>
              </div>

              <div className="heckhoff-modal-block">
                <div className="heckhoff-modal-block-label">Solución & Arquitectura</div>
                <p className="heckhoff-modal-block-text">{selectedProject.solution}</p>
                <ul className="heckhoff-modal-features">
                  {selectedProject.features.map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="heckhoff-modal-actions">
              {selectedProject.links.map((lnk, i) => (
                <a
                  key={i}
                  href={lnk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`heckhoff-btn ${i === 0 ? 'heckhoff-btn-accent' : 'heckhoff-btn-theme'} size-md`}
                >
                  {lnk.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TOAST NOTIFICACIÓN ── */}
      {toastMessage && (
        <div className="heckhoff-toast" role="status" aria-live="polite">
          <span>{toastMessage}</span>
        </div>
      )}
    </main>
  );
}
