import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaBand from '../components/CtaBand';
import HeroParticles from '../components/HeroParticles';
import { wspUrl } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  { num: '01', title: 'Backend & APIs REST', desc: 'Desarrollo de lógica de negocio, endpoints seguros, webhooks y arquitectura escalable.', tags: ['Java', 'REST API', 'Webhooks'], img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop' },
  { num: '02', title: 'Bases de Datos & SQL', desc: 'Modelado relacional, normalización y consultas optimizadas e íntegras en SQL Server.', tags: ['Java', 'SQL Server', 'Seguridad'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { num: '03', title: 'Aplicaciones Móviles', desc: 'Apps nativas en Android con diseño intuitivo, algoritmos eficientes y persistencia local.', tags: ['Android', 'Kotlin', 'APK'], img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop' },
  { num: '04', title: 'Desarrollo Frontend React', desc: 'Interfaces web modernas, responsivas, animadas con fluidez y optimizadas para rendimiento.', tags: ['React', 'JavaScript', 'GSAP'], img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop' },
];

const publicAsset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Home() {
  const heroRef   = useRef(null);
  const titleRef  = useRef(null);
  const svcImgRef = useRef(null);

  useEffect(() => {
    document.title = 'Lionel Aguirre Gomero — Desarrollador de Software';
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hz__studio, .hz__zero', { y: '105%' });
      gsap.set('.hz__sub, .hz__ctas, .hz__scroll', { opacity: 0, y: 20 });
      gsap.set('.hz__card', { opacity: 0, y: 24, scale: 0.93 });

      const tl = gsap.timeline({ delay: 0.15 });
      tl
        .to('.hz__studio', { y: '0%', duration: 1.0, ease: 'expo.out' })
        .to('.hz__zero',   { y: '0%', duration: 1.0, ease: 'expo.out' }, '-=0.82')
        .to('.hz__sub',    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.55')
        .to('.hz__ctas',   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        .to('.hz__card',   { opacity: 1, y: 0, scale: 1, stagger: 0.12, duration: 0.9, ease: 'back.out(1.3)' }, '-=0.6')
        .to('.hz__scroll', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3');
    }, heroRef);

    const timer = setTimeout(() => {
      if (!heroRef.current) return;
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: '10% top',
        end: '58% top',
        scrub: 2,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(['.hz__cards', '.hz__center'], { opacity: 1 - p, y: -28 * p });
        }
      });
    }, 1800);

    return () => { ctx.revert(); clearTimeout(timer); };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = (e.clientX / w - 0.5) * 2;
      const ny = (e.clientY / h - 0.5) * 2;
      hero.querySelectorAll('.hz__card').forEach(el => {
        const d = parseFloat(el.dataset.depth || 0.3);
        gsap.to(el, { x: nx * d * 28, y: ny * d * 20, duration: 1.6, ease: 'power2.out' });
      });
      if (titleRef.current) {
        gsap.to(titleRef.current, { x: nx * 5, y: ny * 2.5, duration: 1.9, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const img = svcImgRef.current;
    if (!img) return;
    const rows = document.querySelectorAll('.svc-row');
    const onEnter = (e) => {
      const src = e.currentTarget.dataset.img;
      const el = img.querySelector('img');
      if (el) el.src = src;
      img.classList.add('visible');
    };
    const onLeave = () => img.classList.remove('visible');
    const onMove = (e) => {
      gsap.to(img, { x: e.clientX + 24, y: e.clientY - img.offsetHeight / 2, duration: .55, ease: 'power3.out' });
    };
    rows.forEach(r => { r.addEventListener('mouseenter', onEnter); r.addEventListener('mouseleave', onLeave); });
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      rows.forEach(r => { r.removeEventListener('mouseenter', onEnter); r.removeEventListener('mouseleave', onLeave); });
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  useEffect(() => {
    const st = (trigger, extra = {}) => ({ trigger, start: 'top 88%', toggleActions: 'play none none none', ...extra });
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-intro__text', { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: .9, ease: 'power3.out', scrollTrigger: st('.about-intro__inner') });
      gsap.fromTo('.about-stat', { opacity: 0, y: 30, scale: .95 }, { opacity: 1, y: 0, scale: 1, stagger: .1, duration: .7, ease: 'back.out(1.2)', scrollTrigger: st('.about-intro__stats', { start: 'top 90%' }) });
      gsap.fromTo('.about-tech-tag', { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: .06, duration: .5, ease: 'power2.out', scrollTrigger: st('.about-tech-grid', { start: 'top 92%' }) });
      gsap.fromTo('.svc-row', { opacity: 0, x: -40 }, { opacity: 1, x: 0, stagger: .11, duration: .8, ease: 'power3.out', scrollTrigger: st('.services-v2__grid') });
      gsap.fromTo('.services-v2__head .section-title, .services-v2__head .eyebrow', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: .1, duration: .75, ease: 'power3.out', scrollTrigger: st('.services-v2__head') });
      gsap.fromTo('.work-card', { opacity: 0, y: 50, scale: .97 }, { opacity: 1, y: 0, scale: 1, stagger: .13, duration: .9, ease: 'expo.out', scrollTrigger: st('.work-bento', { start: 'top 85%' }) });
      document.querySelectorAll('.parallax-img').forEach(img => {
        gsap.fromTo(img, { y: '-7%' }, { y: '7%', ease: 'none', scrollTrigger: { trigger: img.closest('.work-card') || img, start: 'top bottom', end: 'bottom top', scrub: 1.6 } });
      });
      gsap.fromTo('.split-immersive__visual', { opacity: 0, x: -60, clipPath: 'inset(0 30% 0 0)' }, { opacity: 1, x: 0, clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'expo.out', scrollTrigger: st('.split-immersive__inner') });
      gsap.fromTo('.split-immersive__body', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 1.1, ease: 'expo.out', scrollTrigger: st('.split-immersive__inner') });
      gsap.fromTo('.checklist li', { opacity: 0, x: 24 }, { opacity: 1, x: 0, stagger: .09, duration: .6, ease: 'power3.out', scrollTrigger: st('.checklist', { start: 'top 90%' }) });
      document.querySelectorAll('.stat-block__num[data-count]').forEach(el => {
        const target = parseFloat(el.dataset.count);
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration: 2.4, ease: 'power3.out', snap: { val: 1 }, onUpdate: () => { el.textContent = Math.round(obj.val); }, scrollTrigger: st(el.closest('.stat-block'), { start: 'top 90%' }) });
        gsap.fromTo(el.closest('.stat-block'), { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: .75, ease: 'power3.out', scrollTrigger: st(el.closest('.stat-block'), { start: 'top 90%' }) });
      });
      gsap.utils.toArray('.section-head .section-title').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 34, clipPath: 'inset(0 0 100% 0)' }, { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)', duration: .9, ease: 'expo.out', scrollTrigger: st(el) });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      <section className="hv3" ref={heroRef}>

        <div className="hv3__bg" aria-hidden="true">
          <div className="hv3__noise"/>
          <div className="hv3__grid"/>
          <div className="hv3__glow hv3__glow--1"/>
          <div className="hv3__glow hv3__glow--2"/>
        </div>

        <div className="hz__edge hz__edge--l" aria-hidden="true"/>
        <div className="hz__edge hz__edge--r" aria-hidden="true"/>

        <HeroParticles />

        <div className="hz__cards" aria-hidden="true">
          <div className="hz__card hz__card--code" data-depth="0.3">
            <div className="hz__win-bar"><span/><span/><span/></div>
            <pre className="hz__code-pre"><span style={{color:'rgba(255,255,255,.35)'}}>const </span><span style={{color:'rgba(255,255,255,.7)'}}>developer</span><span style={{color:'rgba(255,255,255,.35)'}}> = await </span><span style={{color:'rgba(255,255,255,.85)'}}>LionelDev</span><span style={{color:'rgba(255,255,255,.35)'}}>.</span><span style={{color:'rgba(255,255,255,.75)'}}>init</span><span style={{color:'rgba(255,255,255,.35)'}}>{'();'}</span></pre>
          </div>

          <div className="hz__card hz__card--node" data-depth="0.45">
            <div className="hz__win-bar"><span/><span/><span/></div>
            <svg viewBox="0 0 130 90" fill="none" xmlns="http://www.w3.org/2000/svg" className="hz__node-svg">
              <circle cx="20" cy="45" r="7" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.25)" strokeWidth="1.2"/>
              <circle cx="65" cy="20" r="6" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
              <circle cx="65" cy="45" r="6" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
              <circle cx="65" cy="70" r="6" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.2)" strokeWidth="1.2"/>
              <circle cx="110" cy="20" r="5" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <circle cx="110" cy="45" r="5" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <circle cx="110" cy="70" r="5" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <path d="M27 45 L59 20" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
              <path d="M27 45 L59 45" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
              <path d="M27 45 L59 70" stroke="rgba(255,255,255,.2)" strokeWidth="1"/>
              <path d="M71 20 L105 20" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <path d="M71 45 L105 45" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
              <path d="M71 70 L105 70" stroke="rgba(255,255,255,.15)" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        <div className="container hz__center" ref={titleRef}>
          <h1 className="hz__title">
            <div className="hz__title-overflow">
              <span className="hz__studio">LIONEL</span>
            </div>
            <div className="hz__title-overflow">
              <span className="hz__zero">DEV</span>
            </div>
          </h1>
          <p className="hz__sub">
            Desarrollador de Software · Backend & Mobile.<br/>
            Ingeniería de sistemas, bases de datos y soluciones robustas.
          </p>
          <div className="hz__ctas">
            <Link className="btn btn-light btn-lg" to="/portafolio">Ver proyectos →</Link>
            <Link className="btn btn-outline-light btn-lg" to="/contacto">Contactar</Link>
          </div>
        </div>

        <div className="hz__scroll" aria-hidden="true">
          <svg width="24" height="38" viewBox="0 0 24 38" fill="none">
            <rect x="1" y="1" width="22" height="36" rx="11" stroke="rgba(255,255,255,.25)" strokeWidth="1.5"/>
            <rect className="hz__scroll-dot" x="10" y="7" width="4" height="7" rx="2" fill="rgba(255,255,255,.5)"/>
          </svg>
        </div>

      </section>

      <section className="about-intro section">
        <div className="container about-intro__inner">
          <div className="about-intro__text">
            <span className="eyebrow">Sobre mí</span>
            <h2 className="section-title">Ingeniería de software con enfoque en <em>soluciones robustas</em>.</h2>
            <p className="about-intro__desc">
              Soy Lionel, desarrollador de software con formación en Ingeniería de Sistemas. Me especializo en el desarrollo backend, diseño de bases de datos relacionales y creación de aplicaciones móviles.
            </p>
            <p className="about-intro__desc">
              Cada proyecto lo construyo con bases técnicas sólidas: consultas SQL Server optimizadas, lógica orientada a objetos en Java y desarrollo frontend interactivo y reactivo.
            </p>
          </div>
          <div className="about-intro__stats">
            <div className="about-stat">
              <span className="about-stat__num">Java</span>
              <span className="about-stat__label">Backend & Arquitectura</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">SQL</span>
              <span className="about-stat__label">SQL Server & Datos</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">Android</span>
              <span className="about-stat__label">Kotlin & Apps Móviles</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">React</span>
              <span className="about-stat__label">Frontend Reactivo</span>
            </div>
          </div>
        </div>
        <div className="container about-intro__tech">
          <span className="eyebrow">Stack tecnológico</span>
          <div className="about-tech-grid">
            {['Java', 'SQL Server', 'React', 'Node.js', 'Android / Kotlin', 'REST APIs', 'HTML / CSS', 'Git'].map(t => (
              <span key={t} className="about-tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="services-v2 section" id="especialidades">
        <div className="container">
          <div className="services-v2__head">
            <div>
              <span className="eyebrow">Especialidades</span>
              <h2 className="section-title">Áreas de enfoque y <em>capacidades</em>.</h2>
            </div>
            <Link className="btn btn-ghost" to="/sobre-mi">Ver perfil completo →</Link>
          </div>
          <div className="services-v2__grid">
            {SERVICES.map((s) => (
              <div key={s.num} className="svc-row" data-img={s.img}>
                <span className="svc-row__num">{s.num}</span>
                <span className="svc-row__title">{s.title}</span>
                <p className="svc-row__desc">{s.desc}</p>
                <div className="svc-row__tags">
                  {s.tags.map(t => <span key={t} className="svc-tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="svc-hover-img" ref={svcImgRef} aria-hidden="true">
        <img src={SERVICES[0].img} alt=""/>
      </div>

      <section className="work-showcase section" id="portafolio">
        <div className="container">
          <div className="section-head work-showcase__head">
            <span className="eyebrow">Proyectos</span>
            <h2 className="section-title">Sistemas reales <em>construidos desde cero</em>.</h2>
            <p className="lead">Demostraciones funcionales y arquitectura de software real.</p>
          </div>
          <div className="work-bento">
            <Link to="/portafolio" className="work-card work-card--main">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src={publicAsset('/img/peripollos-pos.png')} alt="Sistema POS Peripollos" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Backend · Sistema POS</span>
                <h3 className="work-card__title">Sistema de Gestión "Peripollos"</h3>
                <p className="work-card__desc">POS en Java con base de datos SQL Server, webhooks y chatbot integrado.</p>
              </div>
            </Link>
            <Link to="/portafolio" className="work-card">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src={publicAsset('/img/metabit-app.jpg')} alt="App Móvil MetaBit" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Móvil · Finanzas</span>
                <h3 className="work-card__title">App Móvil "MetaBit"</h3>
                <p className="work-card__desc">Aplicación Android nativa para cálculo y proyección de metas de ahorro.</p>
              </div>
            </Link>
            <Link to="/portafolio" className="work-card">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src={publicAsset('/img/peripollos-web.png')} alt="Plataforma Web Peripollos" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Web · En Vivo (Netlify)</span>
                <h3 className="work-card__title">Plataforma Web "Peripollos"</h3>
                <p className="work-card__desc">Carta digital interactiva y pedidos WhatsApp en producción.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="split-immersive">
        <div className="container split-immersive__inner">
          <div className="split-immersive__visual">
            <div className="split-immersive__frame">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop" alt="Código y arquitectura" loading="lazy"/>
            </div>
            <div className="split-immersive__badge"><b>Ingeniería</b><span>código propio y limpio</span></div>
          </div>
          <div className="split-immersive__body">
            <span className="eyebrow">Filosofía técnica</span>
            <h2>Bases de ingeniería, <em>código mantenible y seguridad</em>.</h2>
            <p>Entiendo el desarrollo como una disciplina de ingeniería: cada base de datos se modela con normalización y reglas de integridad, y cada componente de software se estructura de forma modular.</p>
            <ul className="checklist">
              {[
                'Modelado y diseño relacional riguroso en SQL Server.',
                'Backend estructurado en Java con control de excepciones y validaciones.',
                'Prevención activa contra inyecciones SQL y vulnerabilidades.',
                'Arquitecturas orientadas a escalabilidad y fácil mantenimiento.'
              ].map((item, i) => (
                <li key={i}>
                  <span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary" to="/sobre-mi">Conocer más sobre mí →</Link>
          </div>
        </div>
      </section>

      <section className="stats-dark" aria-label="Principios técnicos">
        <div className="stats-dark__glow stats-dark__glow--1" aria-hidden="true"/>
        <div className="stats-dark__glow stats-dark__glow--2" aria-hidden="true"/>
        <div className="container stats-grid">
          {[
            { val:'100', suffix:'%', label:'Código propio y estructurado', count:'100' },
            { val:'Java', suffix:'', label:'Arquitectura Backend y OOP', count:null },
            { val:'SQL', suffix:'', label:'Modelado Relacional Seguro', count:null },
            { val:'REST', suffix:'', label:'APIs e Integración de Servicios', count:null },
          ].map((s,i) => (
            <div key={i} className="stat-block">
              <div style={{display:'flex',alignItems:'baseline',gap:4,justifyContent:'center'}}>
                <span className="stat-block__num" data-count={s.count||undefined}>{s.val}</span>
                {s.suffix && <span style={{color:'rgba(255,255,255,.5)',fontFamily:'var(--head)',fontSize:'clamp(1.2rem,2vw,2rem)',fontWeight:700}}>{s.suffix}</span>}
              </div>
              <span className="stat-block__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="¿Buscas un desarrollador o quieres <em>conversar sobre un proyecto</em>?"
        subtitle="Conectemos para conversar sobre retos técnicos, requerimientos o futuras colaboraciones."
        primaryText="Enviar un mensaje"
        primaryLink="/contacto"
        secondaryText="Ver mi GitHub"
        secondaryLink="https://github.com/lxionel"
      />
    </div>
  );
}
