import { useEffect, useState, useCallback } from 'react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');

  const scrollToSection = useCallback((id) => {
    setActiveSection(id);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80);
      if (isAtBottom) {
        setActiveSection('contacto');
        return;
      }

      const scrollPos = window.scrollY + 140;
      const ids = ['inicio', 'proyectos', 'sobre-mi', 'contacto'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(ids[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`heckhoff-header${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="heckhoff-header-inner">
        <a
          className="heckhoff-header-logo"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('inicio');
          }}
          aria-label="Lionel Aguirre Gomero"
        >
          <span className="heckhoff-logo-mark">LA</span>
          <span className="heckhoff-logo-text">Lionel Aguirre</span>
        </a>

        <nav className="heckhoff-header-nav" aria-label="Navegacion principal">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`heckhoff-nav-link${activeSection === id ? ' active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="heckhoff-header-right">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            className="heckhoff-btn heckhoff-btn-accent size-sm"
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contacto');
            }}
          >
            Contactar
          </a>
        </div>
      </div>
    </header>
  );
}
