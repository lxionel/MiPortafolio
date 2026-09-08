import { Link } from 'react-router-dom';
import { wspUrl } from '../utils/whatsapp';

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="logo" to="/">
            <img className="logo-mark" src={publicAsset('/img/logo.svg')} alt="" />
            <span className="logo-text">Lionel<span>.dev</span></span>
          </Link>
          <p>Desarrollador de software enfocado en backend, bases de datos y aplicaciones móviles.</p>
        </div>
        <div className="footer-col">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/portafolio">Proyectos</Link>
          <Link to="/sobre-mi">Sobre mí</Link>
          <Link to="/contacto">Contacto</Link>
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
