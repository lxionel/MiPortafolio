import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';
import CtaBand from '../components/CtaBand';
import { useGsap, setupPageAnimations } from '../hooks/useGsap';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Nosotros() {
  useEffect(() => {
    document.title = 'Sobre mí — Lionel Aguirre Gomero | Desarrollador de Software';
    window.scrollTo(0, 0);
  }, []);

  const scope = useGsap((gsap, ScrollTrigger) => {
    setupPageAnimations(gsap, ScrollTrigger);
  }, []);

  return (
    <div ref={scope}>
      <section className="pagehead">
        <div className="container">
          <p className="crumbs"><Link to="/">Inicio</Link> / Sobre mí</p>
          <h1>Desarrollo con visión técnica y fundamentos sólidos.</h1>
          <p>Conoce mi enfoque profesional, stack tecnológico y principios de ingeniería de software.</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-hero">
          <div className="about-portrait">
            <div className="img-frame">
              <img
                src={publicAsset('/img/lionel.png')}
                alt="Lionel Aguirre Gomero — Desarrollador de Software"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            <div className="badge">
              <b>Lionel Aguirre Gomero</b>
              <span>Software Developer</span>
            </div>
          </div>

          <div className="about-body">
            <span className="eyebrow">Ingeniería y Desarrollo</span>
            <h2>Hola, soy Lionel Aguirre Gomero.</h2>
            <p>
              Desarrollador de software con formación en <strong>Ingeniería de Sistemas</strong>.
              Me apasiona construir aplicaciones sólidas, con arquitecturas escalables, código limpio
              y alta atención a la seguridad y optimización de datos.
            </p>
            <p style={{ marginTop: 14 }}>
              Cuento con experiencia en backend y desarrollo de sistemas empresariales con <strong>Java</strong> y bases de datos relacionales en <strong>SQL Server</strong>, además de creación de aplicaciones móviles en <strong>Android</strong> e interfaces web reactivas con <strong>React</strong>.
            </p>
            <p style={{ marginTop: 14 }}>
              Mi objetivo es aportar valor técnico real: desde la concepción del modelo relacional y la lógica de negocio hasta la entrega de un producto robusto y testeado.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
              <Link className="btn btn-primary" to="/contacto">
                Contactar conmigo
              </Link>
              <a
                className="btn btn-ghost"
                href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
              <Link className="btn btn-ghost" to="/portafolio">Ver proyectos destacados →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg-soft)' }}>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Principios de desarrollo</span>
            <h2 className="section-title">Pilares en cada sistema que construyo.</h2>
          </div>
          <div className="values">
            {[
              {
                icon: <path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>,
                title: 'Arquitectura & Seguridad',
                desc: 'Código estructurado, validación estricta de entradas y prevención de vulnerabilidades como inyecciones SQL.'
              },
              {
                icon: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
                title: 'Bases de Datos Relacionales',
                desc: 'Modelado relacional en SQL Server, normalización, optimización de consultas y consistencia transaccional.'
              },
              {
                icon: <path d="M20 7h-9m9 5H7m13 5H4"/>,
                title: 'Código Limpio y Mantenible',
                desc: 'Desacoplamiento, patrones de diseño y estándares legibles para que el software sea fácil de mantener y escalar.'
              },
              {
                icon: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
                title: 'Eficiencia y Rendimiento',
                desc: 'Optimización de recursos tanto en backend como frontend, garantizando tiempos de respuesta mínimos.'
              },
            ].map((v, i) => (
              <div key={i} className="value">
                <div className="v-ico">
                  <svg viewBox="0 0 24 24" fill="none">{v.icon}</svg>
                </div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-intro__tech">
          <div className="section-head center">
            <span className="eyebrow">Stack & Herramientas</span>
            <h2 className="section-title">Tecnologías principales.</h2>
          </div>
          <div className="about-tech-grid" style={{ justifyContent: 'center' }}>
            {[
              'Java',
              'SQL Server',
              'REST APIs',
              'Webhooks',
              'React',
              'JavaScript (ES6+)',
              'Android / Kotlin',
              'HTML5 & CSS3',
              'Git & GitHub',
              'Node.js',
            ].map(t => (
              <span key={t} className="about-tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="¿Hablamos sobre un proyecto o <em>reto técnico</em>?"
        subtitle="Disponible para nuevas oportunidades de desarrollo, proyectos de software y colaboración técnica."
        primaryText="Enviar un mensaje"
        primaryLink="/contacto"
        secondaryText="Ver portafolio"
        secondaryLink="/portafolio"
      />
    </div>
  );
}
