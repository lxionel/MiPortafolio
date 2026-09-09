import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      if (window.__lenis) {
        window.__lenis.scrollTo(el, { offset: -70 });
      } else {
        const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a
            className="logo"
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
          >
            <img className="logo-mark" src={publicAsset('/img/logo.svg')} alt="" />
            <span className="logo-text">Lionel<span>.dev</span></span>
          </a>
          <p>Desarrollador de software enfocado en backend, bases de datos y aplicaciones móviles.</p>
        </div>
        <div className="footer-col">
          <h4>Navegación</h4>
          <a href="#inicio" onClick={(e) => { e.preventDefault(); scrollToSection('inicio'); }}>Inicio</a>
          <a href="#proyectos" onClick={(e) => { e.preventDefault(); scrollToSection('proyectos'); }}>Proyectos</a>
          <a href="#stack" onClick={(e) => { e.preventDefault(); scrollToSection('stack'); }}>Habilidades</a>
          <a href="#sobre-mi" onClick={(e) => { e.preventDefault(); scrollToSection('sobre-mi'); }}>Sobre mí</a>
          <a href="#contacto" onClick={(e) => { e.preventDefault(); scrollToSection('contacto'); }}>Contacto</a>
        </div>
        <div className="footer-col">
          <h4>Especialidades</h4>
          <span>Java & Backend</span>
          <span>SQL Server & Bases de Datos</span>
          <span>React & Frontend Moderno</span>
          <span>Android / Kotlin</span>
        </div>
        <div className="footer-col">
          <h4>Contacto</h4>
          <a href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/lxionel" target="_blank" rel="noopener noreferrer">GitHub / lxionel</a>
          <a href="mailto:lioneldavora1@gmail.com">lioneldavora1@gmail.com</a>
          <a href={wspUrl('Hola Lionel, vi tu portafolio y me gustaría conectar contigo')} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} Lionel Aguirre Gomero. Portafolio personal.</span>
        <span>Código propio con React & GSAP.</span>
      </div>
    </footer>
  );
}
