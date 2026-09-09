import { useEffect, useRef, useCallback, useState } from 'react';
import ThemeToggle from './ThemeToggle';

const LINKS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'stack', label: 'Habilidades' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'contacto', label: 'Contacto' },
];

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  const navMenuRef = useRef(null);

  const scrollToSection = useCallback((id) => {
    setMenuOpen(false);
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
      setScrolled(window.scrollY > 40);

      const isAtBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 80);
      if (isAtBottom) {
        setActiveSection('contacto');
        return;
      }

      const scrollPos = window.scrollY + 140;
      const ids = ['inicio', 'proyectos', 'stack', 'sobre-mi', 'contacto'];
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

  const updatePill = useCallback(() => {
    const menu = navMenuRef.current;
    if (!menu) return;
    const active = menu.querySelector(`a[data-section="${activeSection}"]`);
    if (!active) { setPillStyle({ opacity: 0 }); return; }
    const mr = menu.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    setPillStyle({ left: ar.left - mr.left + 'px', width: ar.width + 'px', opacity: 1 });
  }, [activeSection]);

  useEffect(() => { updatePill(); }, [updatePill]);
  useEffect(() => {
    window.addEventListener('resize', updatePill, { passive: true });
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`nav${scrolled ? ' scrolled' : ''}`}
      id="nav"
    >
      <div className="container nav-inner">
        <a
          className="logo"
          href="#inicio"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('inicio');
          }}
          aria-label="Lionel Dev"
        >
          <img className="logo-mark" src={publicAsset('/img/logo.svg')} alt="" width="34" height="34"
            onError={e => { e.target.style.display='none'; }} />
          <span className="logo-text">Lionel<span>.dev</span></span>
        </a>

        <nav ref={navMenuRef} className={`nav-menu${menuOpen ? ' open' : ''}`} aria-label="Principal">
          <span className="nav-pill" style={pillStyle} aria-hidden="true" />
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              data-section={id}
              className={activeSection === id ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(id);
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <a
            className="btn btn-sm btn-primary"
            href="#contacto"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('contacto');
            }}
          >
            Contactar
          </a>
          <button
            className={`nav-toggle${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
