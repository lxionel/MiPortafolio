import { useState, useEffect, useCallback } from 'react';
import { useGsap, setupLandingAnimations } from '../hooks/useGsap';
import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const CODE_SNIPPETS = {
  java: {
    title: 'PedidoDAOImpl.java',
    tag: 'Java 17 · Patrón DAO · Transacciones ACID',
    code: `// Capa de Acceso a Datos con JDBC Transaccional
public class PedidoDAOImpl implements PedidoDAO {
    private final ConnectionPool pool;

    @Override
    public boolean registrarVenta(Venta venta, List<DetalleVenta> items) throws SQLException {
        String sqlVenta = "INSERT INTO Ventas (cliente_id, total, fecha) VALUES (?, ?, ?)";
        String sqlDetalle = "INSERT INTO DetalleVentas (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)";

        try (Connection conn = pool.getConnection()) {
            conn.setAutoCommit(false); // Transacción atómica
            try (PreparedStatement psVenta = conn.prepareStatement(sqlVenta, Statement.RETURN_GENERATED_KEYS)) {
                psVenta.setInt(1, venta.getClienteId());
                psVenta.setBigDecimal(2, venta.getTotal());
                psVenta.setTimestamp(3, Timestamp.valueOf(LocalDateTime.now()));
                psVenta.executeUpdate();

                ResultSet rs = psVenta.getGeneratedKeys();
                if (rs.next()) {
                    int ventaId = rs.getInt(1);
                    try (PreparedStatement psDet = conn.prepareStatement(sqlDetalle)) {
                        for (DetalleVenta item : items) {
                            psDet.setInt(1, ventaId);
                            psDet.setInt(2, item.getProductoId());
                            psDet.setInt(3, item.getCantidad());
                            psDet.setBigDecimal(4, item.getPrecioUnitario());
                            psDet.addBatch();
                        }
                        psDet.executeBatch();
                    }
                }
                conn.commit(); // Confirmación de transacción
                return true;
            } catch (SQLException ex) {
                conn.rollback(); // Rollback estricto ante excepciones
                throw ex;
            }
        }
    }
}`,
    desc: 'Arquitectura desacoplada en Java para sistemas POS. Garantiza atomicidad y persistencia consistente en base de datos relacional sin riesgo de transacciones huérfanas.',
  },
  sql: {
    title: 'sp_ProcesarPedidoPOS.sql',
    tag: 'Microsoft SQL Server · T-SQL · Integridad Transaccional',
    code: `-- Procedimiento Almacenado con Bloque Transaccional ACID
CREATE OR ALTER PROCEDURE dbo.sp_ProcesarPedidoPOS
    @ClienteId INT,
    @Total DECIMAL(10,2),
    @MetodoPago VARCHAR(50),
    @VentaId INT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;
    SET XACT_ABORT ON; -- Cancela y hace rollback automático ante error severo

    BEGIN TRY
        BEGIN TRANSACTION;

        -- 1. Inserción en cabecera de ventas
        INSERT INTO dbo.Ventas (ClienteId, FechaHora, Total, MetodoPago, Estado)
        VALUES (@ClienteId, SYSDATETIME(), @Total, @MetodoPago, 'COMPLETADO');

        SET @VentaId = SCOPE_IDENTITY();

        -- 2. Registro en bitácora de auditoría
        INSERT INTO dbo.AuditoriaTransacciones (VentaId, Accion, Usuario, Fecha)
        VALUES (@VentaId, 'REGISTRO_VENTA_POS', SYSTEM_USER, SYSDATETIME());

        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        THROW;
    END CATCH
END;`,
    desc: 'Procedimiento almacenado en SQL Server diseñado para operaciones concurrentes en puntos de venta, con control de errores TRY...CATCH y auditoría.',
  },
  kotlin: {
    title: 'MetaAhorroViewModel.kt',
    tag: 'Android · Kotlin · MVVM & Corrutinas',
    code: `// ViewModel con Corrutinas y Flujo de Estado Reactivo
class MetaAhorroViewModel(
    private val repository: MetaRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow<MetaUiState>(MetaUiState.Initial)
    val uiState: StateFlow<MetaUiState> = _uiState.asStateFlow()

    fun calcularProyeccion(montoObjetivo: Double, plazoMeses: Int, aporteMensual: Double) {
        viewModelScope.launch(Dispatchers.Default) {
            val resultado = repository.calcularProyeccionAhorro(
                montoObjetivo, 
                plazoMeses, 
                aporteMensual
            )
            _uiState.value = MetaUiState.Success(resultado)
        }
    }

    fun guardarMeta(meta: MetaEntity) = viewModelScope.launch(Dispatchers.IO) {
        repository.insertarMeta(meta)
    }
}`,
    desc: 'Patrón MVVM en Android con StateFlow reactivo. Los cálculos pesados de proyección financiera se ejecutan en subprocesos en segundo plano.',
  },
  react: {
    title: 'useOrdersSync.js',
    tag: 'React · Hooks · Webhooks & Mensajería',
    code: `// Sincronización reactiva del carrito y generación de orden
export function useOrdersSync(cartItems, deliveryInfo) {
  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  }, [cartItems]);

  const despacharPedido = useCallback(() => {
    const lineas = [
      '*NUEVO PEDIDO DESDE CARTA WEB*',
      \`Cliente: \${deliveryInfo.nombre}\`,
      \`Dirección: \${deliveryInfo.direccion}\`,
      \`Total: S/ \${total.toFixed(2)}\`,
      '--- Detalle ---',
      ...cartItems.map(i => \`• \${i.cantidad}x \${i.nombre} - S/ \${(i.precio * i.cantidad).toFixed(2)}\`)
    ].join('\\n');

    window.open(wspUrl(lineas), '_blank');
  }, [cartItems, deliveryInfo, total]);

  return { total, despacharPedido };
}`,
    desc: 'Hook de React que transforma el estado de la carta interactiva de pedidos en un payload estructurado para recepción inmediata en WhatsApp.',
  },
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [projectFilter, setProjectFilter] = useState('all');
  const [activeSnippet, setActiveSnippet] = useState('java');
  const [copiedCode, setCopiedCode] = useState(false);
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

  // Interactive mouse spotlight handler
  const handleSpotlight = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const copyEmailToClipboard = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText('lioneldavora1@gmail.com');
    showToast('Correo lioneldavora1@gmail.com copiado al portapapeles');
  };

  const copySnippetCode = () => {
    const code = CODE_SNIPPETS[activeSnippet].code;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    showToast('Fragmento de código copiado al portapapeles');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!nombre.trim() && !mensaje.trim()) {
      setFeedback('Por favor ingresa al menos tu nombre y un mensaje.');
      return;
    }

    const lines = [
      'Hola Lionel, te contacto desde la landing page de tu portafolio.',
      nombre ? `Nombre: ${nombre}` : '',
      contacto ? `Contacto / Correo: ${contacto}` : '',
      motivo ? `Motivo: ${motivo}` : '',
      mensaje ? `\nMensaje:\n${mensaje}` : '',
    ].filter(Boolean).join('\n');

    window.open(wspUrl(lines), '_blank', 'noopener,noreferrer');
    setFeedback('Mensaje preparado en WhatsApp.');
    showToast('Abriendo WhatsApp con tu mensaje');
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Contacto Portafolio - ${motivo} (${nombre || 'Interesado'})`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nContacto: ${contacto}\nMotivo: ${motivo}\n\nMensaje:\n${mensaje}`
    );
    window.location.href = `mailto:lioneldavora1@gmail.com?subject=${subject}&body=${body}`;
    setFeedback('Abriendo cliente de correo electrónico.');
    showToast('Abriendo tu cliente de correo');
  };

  return (
    <div ref={scope}>
      {/* ── BARRA SUPERIOR DE PROGRESO DE LECTURA ── */}
      <div
        className="scroll-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* ── SECCIÓN 1: HERO (INICIO) ── */}
      <section className="hero-pro" id="inicio">
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
              <a
                className="btn btn-primary"
                href="#proyectos"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('proyectos');
                }}
              >
                Ver proyectos desarrollados
              </a>
              <a
                className="btn btn-secondary"
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contacto');
                }}
              >
                Contactar
              </a>
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
                onClick={copyEmailToClipboard}
                title="Hacer clic para copiar correo"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>lioneldavora1@gmail.com</span>
              </a>
            </div>
          </div>

          <div
            className="engineer-card spotlight-card"
            onMouseMove={handleSpotlight}
          >
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

        {/* ── CINTA DE MÉTRICAS DE INGENIERÍA ── */}
        <div className="container">
          <div className="metrics-ribbon">
            <div className="metric-card spotlight-card" onMouseMove={handleSpotlight}>
              <div className="metric-card__val">
                +3 <span>Sistemas</span>
              </div>
              <div className="metric-card__label">Desarrollados y probados en escenarios reales</div>
            </div>

            <div className="metric-card spotlight-card" onMouseMove={handleSpotlight}>
              <div className="metric-card__val">
                100<span>%</span>
              </div>
              <div className="metric-card__label">Integridad de datos con arquitectura relacional SQL</div>
            </div>

            <div className="metric-card spotlight-card" onMouseMove={handleSpotlight}>
              <div className="metric-card__val">
                Java <span>17+</span>
              </div>
              <div className="metric-card__label">Lógica de negocio desacoplada con patrones DAO/MVC</div>
            </div>

            <div className="metric-card spotlight-card" onMouseMove={handleSpotlight}>
              <div className="metric-card__val">
                Nativo <span>Android</span>
              </div>
              <div className="metric-card__label">Desarrollo móvil enfocado en rendimiento y APKs limpios</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: PROYECTOS DESARROLLADOS CON FILTRO INTERACTIVO ── */}
      <section className="section-pro" id="proyectos">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Proyectos Desarrollados</span>
            <h2 className="pro-header__title">Sistemas Reales y Funcionales</h2>
            <p className="pro-header__desc">
              Software construido desde el diseño de la base de datos relacional y la lógica de negocio hasta la entrega en producción.
            </p>
          </div>

          {/* Filtro interactivo de proyectos */}
          <div className="project-filter-row">
            <button
              className={`filter-tab ${projectFilter === 'all' ? 'active' : ''}`}
              onClick={() => setProjectFilter('all')}
            >
              Todos los proyectos (3)
            </button>
            <button
              className={`filter-tab ${projectFilter === 'mobile' ? 'active' : ''}`}
              onClick={() => setProjectFilter('mobile')}
            >
              Móvil / Android (1)
            </button>
            <button
              className={`filter-tab ${projectFilter === 'backend' ? 'active' : ''}`}
              onClick={() => setProjectFilter('backend')}
            >
              Backend / POS Java (1)
            </button>
            <button
              className={`filter-tab ${projectFilter === 'web' ? 'active' : ''}`}
              onClick={() => setProjectFilter('web')}
            >
              Web en Vivo (1)
            </button>
          </div>

          <div className="work-bento">
            {/* CARD 1 (MAIN VERTICAL): METABIT */}
            {(projectFilter === 'all' || projectFilter === 'mobile') && (
              <div
                className="work-card work-card--main spotlight-card"
                onMouseMove={handleSpotlight}
              >
                <div className="work-card__inner">
                  <div className="work-card__header">
                    <span className="work-card__cat">Móvil · Finanzas Personales</span>
                    <h3 className="work-card__title">App Móvil "MetaBit"</h3>
                    <p className="work-card__desc">
                      Aplicación Android nativa para cálculo y proyección de metas de ahorro financiero personal. Desarrollada con persistencia local, algoritmos de proyección periódica e interfaz táctil optimizada.
                    </p>
                    <div className="engineer-pills" style={{ marginTop: 12 }}>
                      <span className="engineer-pill">Android SDK</span>
                      <span className="engineer-pill">Kotlin</span>
                      <span className="engineer-pill">Room / SQLite</span>
                      <span className="engineer-pill">APK Compilado</span>
                    </div>
                  </div>
                  <div className="work-card__preview work-card__preview--phone-main">
                    <div className="mock-phone mock-phone--hero">
                      <div className="mock-phone-notch" />
                      <img src={publicAsset('/img/metabit-app.jpg')} alt="App Móvil MetaBit" loading="lazy"/>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2 (HORIZONTAL): SISTEMA POS PERIPOLLOS */}
            {(projectFilter === 'all' || projectFilter === 'backend') && (
              <div
                className="work-card spotlight-card"
                onMouseMove={handleSpotlight}
              >
                <div className="work-card__inner">
                  <div className="work-card__header">
                    <span className="work-card__cat">Backend & Escritorio · Sistema POS</span>
                    <h3 className="work-card__title">Sistema de Gestión "Peripollos"</h3>
                    <p className="work-card__desc">
                      Software de escritorio en Java conectado con SQL Server para control de comandas, facturación y stock en pollería. Sincronización mediante webhooks y chatbot de atención integrado.
                    </p>
                    <div className="engineer-pills" style={{ marginTop: 12 }}>
                      <span className="engineer-pill">Java 17</span>
                      <span className="engineer-pill">SQL Server</span>
                      <span className="engineer-pill">JDBC Transaccional</span>
                      <span className="engineer-pill">Webhooks</span>
                    </div>
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
              </div>
            )}

            {/* CARD 3 (HORIZONTAL): PLATAFORMA WEB PERIPOLLOS */}
            {(projectFilter === 'all' || projectFilter === 'web') && (
              <div
                className="work-card spotlight-card"
                onMouseMove={handleSpotlight}
              >
                <div className="work-card__inner">
                  <div className="work-card__header">
                    <span className="work-card__cat">Web · En Vivo (Netlify)</span>
                    <h3 className="work-card__title">Plataforma Web "Peripollos"</h3>
                    <p className="work-card__desc">
                      Carta digital interactiva y sistema de pedidos directo por WhatsApp. Proyecto desplegado y operativo en producción sobre Netlify.
                    </p>
                    <div style={{ marginTop: 14 }}>
                      <a
                        className="btn btn-sm btn-secondary"
                        href="https://peripollos.netlify.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                      >
                        <span>Abrir sitio web en vivo</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                          <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-7h-2v7H5V7h7V5H5z"/>
                        </svg>
                      </a>
                    </div>
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
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: STACK TÉCNICO Y EXPLORADOR DE CÓDIGO INTERACTIVO ── */}
      <section className="section-pro section-pro--alt" id="stack">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Competencias Técnicas</span>
            <h2 className="pro-header__title">Stack Tecnológico & Ingeniería</h2>
            <p className="pro-header__desc">
              Herramientas y lenguajes aplicados en proyectos funcionales y diseño de sistemas.
            </p>
          </div>

          <div className="skills-grid">
            <div className="skill-card spotlight-card" onMouseMove={handleSpotlight}>
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

            <div className="skill-card spotlight-card" onMouseMove={handleSpotlight}>
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

            <div className="skill-card spotlight-card" onMouseMove={handleSpotlight}>
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

            <div className="skill-card spotlight-card" onMouseMove={handleSpotlight}>
              <div className="skill-card__header">
                <div className="skill-card__icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                </div>
                <h3 className="skill-card__title">Frontend & Herramientas</h3>
              </div>
              <div className="skill-card__tech">React · JavaScript · Git / GitHub · Vite</div>
              <p className="skill-card__desc">
                Desarrollo de interfaces web reactivas, maquetación responsive, control de versiones con Git, despliegue continuo y optimización de rendimiento.
              </p>
            </div>
          </div>

          {/* ── VISOR INTERACTIVO DE ARQUITECTURA & CÓDIGO ── */}
          <div className="code-explorer">
            <div className="code-explorer__header">
              <div className="code-explorer__tabs">
                <button
                  className={`code-explorer__tab ${activeSnippet === 'java' ? 'active' : ''}`}
                  onClick={() => setActiveSnippet('java')}
                >
                  <span>Java 17 (Capa DAO)</span>
                </button>
                <button
                  className={`code-explorer__tab ${activeSnippet === 'sql' ? 'active' : ''}`}
                  onClick={() => setActiveSnippet('sql')}
                >
                  <span>SQL Server (SP Transaccional)</span>
                </button>
                <button
                  className={`code-explorer__tab ${activeSnippet === 'kotlin' ? 'active' : ''}`}
                  onClick={() => setActiveSnippet('kotlin')}
                >
                  <span>Android Kotlin (MVVM)</span>
                </button>
                <button
                  className={`code-explorer__tab ${activeSnippet === 'react' ? 'active' : ''}`}
                  onClick={() => setActiveSnippet('react')}
                >
                  <span>React (Hooks & Integración)</span>
                </button>
              </div>

              <button
                className="code-explorer__copy-btn"
                onClick={copySnippetCode}
                title="Copiar código fuente"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                <span>{copiedCode ? '¡Copiado!' : 'Copiar código'}</span>
              </button>
            </div>

            <div className="code-explorer__content">
              <div className="code-explorer__meta">
                <span className="code-explorer__tag">{CODE_SNIPPETS[activeSnippet].tag}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'monospace' }}>
                  {CODE_SNIPPETS[activeSnippet].title}
                </span>
              </div>

              <pre className="code-explorer__pre">
                <code>{CODE_SNIPPETS[activeSnippet].code}</code>
              </pre>

              <p className="code-explorer__desc">
                {CODE_SNIPPETS[activeSnippet].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 4: SOBRE MÍ Y TRAYECTORIA ── */}
      <section className="section-pro" id="sobre-mi">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Trayectoria y Perfil</span>
            <h2 className="pro-header__title">Desarrollo con Enfoque de Ingeniería</h2>
            <p className="pro-header__desc">
              Compromiso con el código limpio, la consistencia de datos y la resolución práctica de necesidades.
            </p>
          </div>

          <div className="about-pro-grid">
            <div
              className="about-profile-card spotlight-card"
              onMouseMove={handleSpotlight}
            >
              <div className="about-photo-wrap">
                <img
                  src={publicAsset('/img/lionel.png')}
                  alt="Lionel Aguirre Gomero — Desarrollador de Software"
                  loading="lazy"
                />
              </div>
              <div className="about-profile-name">Lionel Aguirre Gomero</div>
              <div className="about-profile-role">Ingeniería de Sistemas · Software Dev</div>
              <div className="about-meta-list">
                <div className="about-meta-item">
                  <span>Ubicación:</span>
                  <span>Chimbote, Perú</span>
                </div>
                <div className="about-meta-item">
                  <span>Enfoque principal:</span>
                  <span>Backend & Móvil</span>
                </div>
                <div className="about-meta-item">
                  <span>Modalidad:</span>
                  <span>Remoto / Híbrido</span>
                </div>
                <div className="about-meta-item">
                  <span>Disponibilidad:</span>
                  <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Inmediata</span>
                </div>
              </div>
            </div>

            <div className="about-narrative">
              <h3>Ingeniería de software aplicada a problemas reales.</h3>
              <p>
                Me encuentro en formación y constante especialización en la carrera de <strong>Ingeniería de Sistemas</strong>. Mi trabajo se centra en diseñar y programar soluciones tecnológicas que optimicen procesos comerciales y operativos.
              </p>
              <p>
                En lugar de quedarme únicamente en la superficie visual, pongo especial atención en el modelado de datos en <strong>SQL Server</strong>, la arquitectura modular en <strong>Java</strong> y la estabilidad de aplicaciones nativas en <strong>Android</strong>. Creo firmemente que un buen sistema se define por la robustez de sus cimientos.
              </p>
              <p>
                Busco colaborar en equipos y proyectos donde pueda aplicar disciplina técnica, escribir código mantenible y continuar aprendiendo las mejores prácticas de la industria.
              </p>

              <div className="about-narrative-actions">
                <a
                  className="btn btn-primary"
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contacto');
                  }}
                >
                  Contactar conmigo
                </a>
                <a
                  className="btn btn-secondary"
                  href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver trayectoria en LinkedIn
                </a>
              </div>
            </div>
          </div>

          {/* Criterios y Principios de Ingeniería */}
          <div className="principles-grid">
            <div className="principle-card spotlight-card" onMouseMove={handleSpotlight}>
              <span className="principle-card__num">01</span>
              <h3 className="principle-card__title">Integridad y Seguridad de Datos</h3>
              <p className="principle-card__desc">
                Cada tabla y relación se concibe con reglas de integridad referencial, asegurando que los datos no se corrompan ante operaciones concurrentes y validando siempre las entradas.
              </p>
            </div>

            <div className="principle-card spotlight-card" onMouseMove={handleSpotlight}>
              <span className="principle-card__num">02</span>
              <h3 className="principle-card__title">Código Modular y Mantenible</h3>
              <p className="principle-card__desc">
                Separación clara entre capas de presentación, lógica de negocio y acceso a datos. Código estructurado para facilitar la depuración, auditoría y escalabilidad futura.
              </p>
            </div>

            <div className="principle-card spotlight-card" onMouseMove={handleSpotlight}>
              <span className="principle-card__num">03</span>
              <h3 className="principle-card__title">Soluciones para Necesidades Reales</h3>
              <p className="principle-card__desc">
                Enfoque pragmático en resolver problemas operativos reales: control de comandas, facturación comercial, proyecciones financieras y toma de pedidos digital.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 5: CONTACTO DIRECTO ── */}
      <section className="section-pro section-pro--alt" id="contacto">
        <div className="container">
          <div className="pro-header">
            <span className="pro-header__eyebrow">Comunicación Directa</span>
            <h2 className="pro-header__title">¿Tienes un proyecto o consulta técnica? Conversemos.</h2>
            <p className="pro-header__desc">
              Disponible para oportunidades laborales, desarrollo backend o proyectos de software independientes.
            </p>
          </div>

          <div className="contact-grid">
            <div>
              <div className="contact-channels">
                <a
                  className="channel spotlight-card"
                  href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleSpotlight}
                >
                  <span className="channel-ico ico-call">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                  </span>
                  <div>
                    <b>LinkedIn</b>
                    <span className="val">Lionel Aguirre Gomero</span>
                    <br />
                    <span className="hint">Perfil profesional y red</span>
                  </div>
                </a>

                <a
                  className="channel spotlight-card"
                  href="https://github.com/lxionel"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleSpotlight}
                >
                  <span className="channel-ico ico-call">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </span>
                  <div>
                    <b>GitHub</b>
                    <span className="val">@lxionel</span>
                    <br />
                    <span className="hint">Código y repositorios</span>
                  </div>
                </a>

                <div
                  className="channel spotlight-card"
                  onMouseMove={handleSpotlight}
                  style={{ cursor: 'pointer' }}
                  onClick={copyEmailToClipboard}
                >
                  <span className="channel-ico ico-mail">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </span>
                  <div style={{ flex: 1 }}>
                    <b>Correo Electrónico</b>
                    <span className="val">lioneldavora1@gmail.com</span>
                    <br />
                    <button className="channel-copy-btn" onClick={copyEmailToClipboard}>
                      Hacer clic para copiar correo
                    </button>
                  </div>
                </div>

                <a
                  className="channel spotlight-card"
                  href={wspUrl('Hola Lionel, vi tu portafolio y me gustaría ponerme en contacto contigo')}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleSpotlight}
                >
                  <span className="channel-ico ico-wsp">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
                    </svg>
                  </span>
                  <div>
                    <b>WhatsApp Directo</b>
                    <span className="val">+51 952 102 805</span>
                    <br />
                    <span className="hint">Respuesta rápida</span>
                  </div>
                </a>
              </div>
            </div>

            <div>
              <form className="form" onSubmit={handleSendWhatsApp}>
                <div className="field">
                  <label htmlFor="landing-name">Tu nombre o empresa</label>
                  <input
                    id="landing-name"
                    type="text"
                    placeholder="Ej. Carlos Mendoza"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="landing-contact">Correo electrónico o teléfono</label>
                  <input
                    id="landing-contact"
                    type="text"
                    placeholder="Ej. carlos@empresa.com o +51 987..."
                    value={contacto}
                    onChange={(e) => setContacto(e.target.value)}
                  />
                </div>

                <div className="field">
                  <label>Motivo de contacto</label>
                  <div className="motive-pills">
                    {[
                      'Oportunidad laboral',
                      'Desarrollo de sistema',
                      'Consulta técnica',
                      'Colaboración',
                    ].map((m) => (
                      <button
                        key={m}
                        type="button"
                        className={`motive-pill ${motivo === m ? 'active' : ''}`}
                        onClick={() => setMotivo(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="landing-msg">Mensaje</label>
                  <textarea
                    id="landing-msg"
                    placeholder="Detalla tu requerimiento, propuesta o consulta..."
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    required
                  />
                </div>

                <div className="contact-actions-row">
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Enviar vía WhatsApp
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={handleSendMail}
                  >
                    Enviar por Correo
                  </button>
                </div>

                {feedback && <div className="form-feedback">{feedback}</div>}
                <p className="form-note">
                  Los mensajes se envían directamente a mi canal personal de atención.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── TOAST NOTIFICATION FLOTANTE ── */}
      {toastMessage && (
        <div className="toast-notification">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#3B82F6">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
