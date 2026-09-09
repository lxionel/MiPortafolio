import { wspUrl } from '../utils/whatsapp';

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
    <footer className="heckhoff-footer">
      <div className="heckhoff-footer-inner">
        <div className="heckhoff-footer-left">
          <span>&copy; {new Date().getFullYear()} Lionel Aguirre Gomero — Desarrollador de Software.</span>
        </div>
        <div className="heckhoff-footer-right">
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('inicio');
            }}
          >
            Volver arriba
          </a>
          <a
            href="https://www.linkedin.com/in/lionel-aguirre-gomero-53a7052a9"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/lxionel"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href={wspUrl('Hola Lionel, vi tu portafolio y me gustaria conversar.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </footer>
  );
}
