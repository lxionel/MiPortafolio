import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import { useTheme } from './hooks/useTheme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';

function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          if (window.__lenis) {
            window.__lenis.scrollTo(el, { offset: -70 });
          } else {
            const top = el.getBoundingClientRect().top + window.pageYOffset - 70;
            window.scrollTo({ top, behavior: 'smooth' });
          }
        }, 60);
        return;
      }
    }
    if (pathname === '/') {
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function SectionRedirect({ toSection }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/#${toSection}`, { replace: true });
  }, [navigate, toSection]);
  return null;
}

function AppInner({ theme, toggleTheme }) {
  return (
    <>
      <ScrollReset />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portafolio" element={<SectionRedirect toSection="proyectos" />} />
        <Route path="/sobre-mi" element={<SectionRedirect toSection="sobre-mi" />} />
        <Route path="/nosotros" element={<SectionRedirect toSection="sobre-mi" />} />
        <Route path="/contacto" element={<SectionRedirect toSection="contacto" />} />
        <Route path="*" element={<SectionRedirect toSection="inicio" />} />
      </Routes>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    window.__lenis = lenis;
    let rafId;
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf); };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return (
    <BrowserRouter basename={basename || undefined}>
      <AppInner theme={theme} toggleTheme={toggleTheme} />
    </BrowserRouter>
  );
}
