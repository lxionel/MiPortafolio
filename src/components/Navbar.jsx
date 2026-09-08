import { useEffect, useRef, useCallback, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { wspUrl } from '../utils/whatsapp';

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/portafolio', label: 'Proyectos' },
  { to: '/sobre-mi', label: 'Sobre mí' },
  { to: '/contacto', label: 'Contacto' },
];

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState({ opacity: 0 });
  const navMenuRef = useRef(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const THRESHOLD = typeof window !== 'undefined'
      ? window.innerHeight * 0.75
      : 500;

    const onScroll = () => {
      setScrolled(window.scrollY > THRESHOLD);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const updatePill = useCallback(() => {
    const menu = navMenuRef.current;
    if (!menu) return;
    const active = menu.querySelector('a.active');
    if (!active) { setPillStyle({ opacity: 0 }); return; }
    const mr = menu.getBoundingClientRect();
    const ar = active.getBoundingClientRect();
    setPillStyle({ left: ar.left - mr.left + 'px', width: ar.width + 'px', opacity: 1 });
  }, []);

  useEffect(() => { updatePill(); }, [location.pathname, updatePill]);
  useEffect(() => {
    window.addEventListener('resize', updatePill, { passive: true });
    return () => window.removeEventListener('resize', updatePill);
  }, [updatePill]);

  const closeMenu = () => setMenuOpen(false);
  const hidden = isHome && !scrolled;

  return (
    <header
      className={`nav${scrolled ? ' scrolled' : ''}${hidden ? ' nav--hero-hidden' : ''}`}
      id="nav"
    >
      <div className="container nav-inner">
        <Link className="logo" to="/" onClick={closeMenu} aria-label="Lionel Dev">
          <img className="logo-mark" src={publicAsset('/img/logo.svg')} alt="" width="34" height="34"
            onError={e => { e.target.style.display='none'; }} />
          <span className="logo-text">Lionel<span>.dev</span></span>
        </Link>

        <nav ref={navMenuRef} className={`nav-menu${menuOpen ? ' open' : ''}`} aria-label="Principal">
          <span className="nav-pill" style={pillStyle} aria-hidden="true" />
          {LINKS.map(({ to, label, end }) => (
            <NavLink key={to} to={to} end={end} onClick={closeMenu}>{label}</NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <Link
            className="btn btn-sm btn-primary"
            to="/contacto"
            onClick={closeMenu}
          >
            Contactar
          </Link>
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
