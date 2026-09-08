import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CtaBand from '../components/CtaBand';
import HeroParticles from '../components/HeroParticles';
import { wspUrl } from '../utils/whatsapp';

gsap.registerPlugin(ScrollTrigger);

const MARQUEE_ROW_1 = [
  { src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&q=70&auto=format&fit=crop', label: 'Restaurantes' },
  { src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=70&auto=format&fit=crop', label: 'Cafeterías' },
  { src: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=70&auto=format&fit=crop', label: 'Comercios' },
  { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&q=70&auto=format&fit=crop', label: 'Salones' },
  { src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=70&auto=format&fit=crop', label: 'Gimnasios' },
  { src: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=500&q=70&auto=format&fit=crop', label: 'Salud' },
];
const MARQUEE_ROW_2 = [
  { src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=500&q=70&auto=format&fit=crop', label: 'Pastelerías' },
  { src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500&q=70&auto=format&fit=crop', label: 'Boutiques' },
  { src: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&q=70&auto=format&fit=crop', label: 'Fitness' },
  { src: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=500&q=70&auto=format&fit=crop', label: 'Educación' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=70&auto=format&fit=crop', label: 'Bares' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=70&auto=format&fit=crop', label: 'Servicios' },
];

const SERVICES = [
  { num: '01', title: 'Plataformas Web', desc: 'Sitios de alto rendimiento construidos desde cero. SEO técnico, velocidad y conversión garantizados.', tags: ['UI/UX', 'React', 'SEO', '5 días'], img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&auto=format&fit=crop' },
  { num: '02', title: 'Sistemas & POS', desc: 'Software de gestión y punto de venta a medida. Base de datos relacional, inventario, reportes en tiempo real.', tags: ['Java', 'SQL Server', 'Seguro'], img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop' },
  { num: '03', title: 'Apps Móviles', desc: 'Aplicaciones Android nativas con diseño propio. Funcionan sin internet y se entregan como APK lista para instalar.', tags: ['Android', 'APK', 'Kotlin'], img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80&auto=format&fit=crop' },
  { num: '04', title: 'Backend & APIs', desc: 'Arquitectura escalable, endpoints seguros, webhooks y automatizaciones para conectar todo tu stack.', tags: ['REST API', 'Webhooks', 'Java'], img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&auto=format&fit=crop' },
];

const FLOATS = [
  {
    id: 'laptop', depth: 0.25,
    style: { top: '9%', right: '7%' },
    content: (
      <div className="f-laptop">
        <div className="f-laptop__screen">
          <div className="f-win-bar"><span/><span/><span/></div>
          <div className="f-code">
            <div className="f-code__ln" style={{width:'65%',background:'#4A80CC'}}/>
            <div className="f-code__ln" style={{width:'80%',background:'#374151',marginLeft:14}}/>
            <div className="f-code__ln" style={{width:'45%',background:'#2554A0',marginLeft:28}}/>
            <div className="f-code__ln" style={{width:'70%',background:'#374151',marginLeft:14}}/>
            <div className="f-code__ln" style={{width:'55%',background:'#4A80CC'}}/>
            <div className="f-code__ln" style={{width:'35%',background:'#1B3A6B',marginLeft:28}}/>
            <div className="f-code__ln" style={{width:'60%',background:'#374151'}}/>
          </div>
        </div>
        <div className="f-laptop__chin"/>
      </div>
    )
  },
  {
    id: 'phone', depth: 0.45,
    style: { bottom: '12%', right: '9%' },
    content: (
      <div className="f-phone">
        <div className="f-phone__notch"/>
        <div className="f-phone__screen">
          <div className="f-phone__bar" style={{width:'80%',height:8,background:'#1B3A6B',borderRadius:4,marginBottom:6}}/>
          <div className="f-phone__bar" style={{width:'100%',height:60,background:'linear-gradient(135deg,#1B3A6B,#2554A0)',borderRadius:6,marginBottom:6}}/>
          <div className="f-phone__bar" style={{width:'60%',height:6,background:'#374151',borderRadius:3,marginBottom:4}}/>
          <div className="f-phone__bar" style={{width:'80%',height:6,background:'#374151',borderRadius:3,marginBottom:4}}/>
          <div className="f-phone__bar" style={{width:'50%',height:6,background:'#374151',borderRadius:3,marginBottom:8}}/>
          <div className="f-phone__bar" style={{width:'100%',height:28,background:'#1B3A6B',borderRadius:5}}/>
        </div>
      </div>
    )
  },
  {
    id: 'code', depth: 0.55,
    style: { top: '14%', left: '5%' },
    content: (
      <div className="f-glass-card">
        <div className="f-card__head">
          <span className="f-card__dot" style={{background:'#1B3A6B'}}/>
          <span style={{color:'rgba(255,255,255,.4)',fontSize:'.68rem',fontFamily:'monospace'}}>StudioZero.java</span>
        </div>
        <pre className="f-card__code">
          <span style={{color:'#4A80CC'}}>public class</span> <span style={{color:'#fff'}}>StudioZero</span> {'{'}<br/>
          {'  '}<span style={{color:'#6B9FE0'}}>String</span> <span style={{color:'#9EC0F0'}}>client</span> <span style={{color:'rgba(255,255,255,.4)'}}>=</span> <span style={{color:'#7AC080'}}>"TuNegocio"</span>;<br/>
          {'  '}<span style={{color:'#4A80CC'}}>void</span> <span style={{color:'#9EC0F0'}}>build</span>() {'{'}<br/>
          {'    '}<span style={{color:'rgba(255,255,255,.3)'}}></span><br/>
          {'  }'}<br/>
          {'}'}
        </pre>
      </div>
    )
  },
  {
    id: 'api', depth: 0.35,
    style: { top: '38%', left: '3%' },
    content: (
      <div className="f-glass-card f-glass-card--sm">
        <div className="f-api__method">POST</div>
        <div className="f-api__endpoint">/api/pedidos</div>
        <div className="f-api__status">
          <span className="f-api__dot" style={{background:'#22C55E'}}/>
          <span style={{color:'#22C55E',fontSize:'.72rem',fontWeight:700}}>200 OK</span>
        </div>
        <div style={{marginTop:8,fontSize:'.65rem',color:'rgba(255,255,255,.3)',fontFamily:'monospace'}}>
          {'{'} "id": 1842, "status": "ok" {'}'}
        </div>
      </div>
    )
  },
  {
    id: 'stats', depth: 0.6,
    style: { bottom: '22%', left: '5%' },
    content: (
      <div className="f-glass-card f-glass-card--sm">
        <div className="f-stat">
          <span className="f-stat__num">5</span>
          <span className="f-stat__label">días entrega</span>
        </div>
        <div className="f-stat__bar-wrap">
          <div className="f-stat__bar"/>
        </div>
        <div className="f-stat" style={{marginTop:12}}>
          <span className="f-stat__num">100<small>%</small></span>
          <span className="f-stat__label">mobile ready</span>
        </div>
      </div>
    )
  },
  {
    id: 'badges', depth: 0.4,
    style: { top: '60%', right: '4%' },
    content: (
      <div style={{display:'flex',flexDirection:'column',gap:7}}>
        {['React','Java','SQL Server','Android','Node.js'].map((b,i) => (
          <span key={i} className="f-badge">{b}</span>
        ))}
      </div>
    )
  },
  {
    id: 'db', depth: 0.5,
    style: { top: '38%', right: '3%' },
    content: (
      <div className="f-glass-card f-glass-card--xs">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{marginBottom:6}}>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#4A80CC" strokeWidth="1.5"/>
          <path d="M3 5v6c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="#4A80CC" strokeWidth="1.5"/>
          <path d="M3 11v6c0 1.657 4.03 3 9 3s9-1.343 9-3v-6" stroke="#4A80CC" strokeWidth="1.5"/>
        </svg>
        <span style={{color:'rgba(255,255,255,.6)',fontSize:'.7rem',fontWeight:600}}>SQL Server</span>
        <div style={{fontSize:'.6rem',color:'rgba(255,255,255,.25)',marginTop:2}}>Seguro · Escalable</div>
      </div>
    )
  },
];

export default function Home() {
  const heroRef      = useRef(null);
  const titleRef     = useRef(null);
  const marquee1Ref  = useRef(null);
  const marquee2Ref  = useRef(null);
  const svcImgRef    = useRef(null);

  useEffect(() => {
    document.title = 'Studio Zero — Desarrollo de Software y Web · Chimbote';
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
      gsap.fromTo('.gallery__head', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .75, ease: 'power3.out', scrollTrigger: st('.gallery__head') });
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

  useEffect(() => {
    [marquee1Ref, marquee2Ref].forEach(ref => {
      const el = ref.current;
      if (!el || el.dataset.duped) return;
      el.innerHTML += el.innerHTML;
      el.dataset.duped = '1';
    });
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
            <pre className="hz__code-pre"><span style={{color:'rgba(255,255,255,.35)'}}>const </span><span style={{color:'rgba(255,255,255,.7)'}}>result</span><span style={{color:'rgba(255,255,255,.35)'}}> = await </span><span style={{color:'rgba(255,255,255,.85)'}}>studioZero</span><span style={{color:'rgba(255,255,255,.35)'}}>.</span><span style={{color:'rgba(255,255,255,.75)'}}>execute</span><span style={{color:'rgba(255,255,255,.35)'}}>{'();'}</span></pre>
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
              <span className="hz__studio">STUDIO</span>
            </div>
            <div className="hz__title-overflow">
              <span className="hz__zero">ZERO</span>
            </div>
          </h1>
          <p className="hz__sub">
            Desarrollo de software premium.<br/>
            Código propio. Trato directo. Resultados reales.
          </p>
          <div className="hz__ctas">
            <a className="btn btn-light btn-lg" href={wspUrl('Hola Studio Zero, quiero cotizar el desarrollo de un sistema o web')} target="_blank" rel="noopener noreferrer">Empezar proyecto</a>
            <Link className="btn btn-outline-light btn-lg" to="/portafolio">Ver portafolio →</Link>
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
            <span className="eyebrow">Quién soy</span>
            <h2 className="section-title">Ingeniero de software con enfoque en <em>soluciones reales</em>.</h2>
            <p className="about-intro__desc">
              Soy desarrollador full-stack especializado en sistemas web, aplicaciones móviles y arquitectura backend. 
              Trabajo desde Chimbote, Perú, creando software a medida para negocios locales que quieren 
              digitalizar sus operaciones con código propio, seguro y escalable.
            </p>
            <p className="about-intro__desc">
              Cada proyecto lo construyo desde cero — sin plantillas, sin WordPress. 
              Trato directo, precio fijo, entrega en días.
            </p>
          </div>
          <div className="about-intro__stats">
            <div className="about-stat">
              <span className="about-stat__num">+5</span>
              <span className="about-stat__label">Años de experiencia en desarrollo</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">100%</span>
              <span className="about-stat__label">Código propio, sin plantillas</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">5</span>
              <span className="about-stat__label">Días de entrega promedio</span>
            </div>
            <div className="about-stat">
              <span className="about-stat__num">50/50</span>
              <span className="about-stat__label">Forma de pago sin riesgo</span>
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

      <section className="services-v2 section" id="servicios">
        <div className="container">
          <div className="services-v2__head">
            <div>
              <span className="eyebrow">Lo que hacemos</span>
              <h2 className="section-title">Soluciones que <em>resuelven problemas reales</em>.</h2>
            </div>
            <Link className="btn btn-ghost" to="/servicios">Ver todos →</Link>
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
            <span className="eyebrow">Portafolio</span>
            <h2 className="section-title">Ejemplos reales que <em>puedes probar</em>.</h2>
            <p className="lead">Demostraciones funcionales de los tipos de proyecto que entregamos.</p>
          </div>
          <div className="work-bento">
            <Link to="/portafolio" className="work-card work-card--main">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&q=80&auto=format&fit=crop" alt="Carta digital restaurante" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Restaurante</span>
                <h3 className="work-card__title">Carta digital con QR</h3>
                <p className="work-card__desc">Menú por categorías y pedido directo por WhatsApp.</p>
              </div>
            </Link>
            <Link to="/portafolio" className="work-card">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=700&q=80&auto=format&fit=crop" alt="Catálogo" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Comercio</span>
                <h3 className="work-card__title">Catálogo con pedidos</h3>
                <p className="work-card__desc">Vitrina en línea con carrito y cobro por Yape.</p>
              </div>
            </Link>
            <Link to="/portafolio" className="work-card">
              <div className="parallax-wrap" style={{position:'absolute',inset:0}}>
                <img className="parallax-img" src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80&auto=format&fit=crop" alt="Educación" loading="lazy"/>
              </div>
              <div className="work-card__overlay"/>
              <span className="work-card__arrow">↗</span>
              <div className="work-card__body">
                <span className="work-card__cat">Educación</span>
                <h3 className="work-card__title">Web con inscripción</h3>
                <p className="work-card__desc">Cursos, horarios y matrícula en línea.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="split-immersive">
        <div className="container split-immersive__inner">
          <div className="split-immersive__visual">
            <div className="split-immersive__frame">
              <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80&auto=format&fit=crop" alt="Trato directo" loading="lazy"/>
            </div>
            <div className="split-immersive__badge"><b>+5 años</b><span>experiencia en desarrollo</span></div>
          </div>
          <div className="split-immersive__body">
            <span className="eyebrow">Por qué elegirnos</span>
            <h2>Trato directo, trabajo a medida y <em>resultados claros</em>.</h2>
            <p>No somos una fábrica de plantillas. Cada proyecto se diseña desde cero según tu marca y tu rubro. Hablas siempre con la persona que construye tu sitio.</p>
            <ul className="checklist">
              {['Diseño exclusivo adaptado a tu identidad y colores.','Optimizado para celular y para aparecer en Google.','Precio fijo acordado por escrito, sin sorpresas.','La propiedad del sitio queda a tu nombre.'].map((item, i) => (
                <li key={i}>
                  <span className="check-icon"><svg viewBox="0 0 24 24"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"/></svg></span>
                  {item}
                </li>
              ))}
            </ul>
            <Link className="btn btn-primary" to="/nosotros">Conocer el estudio →</Link>
          </div>
        </div>
      </section>

      <section className="gallery" aria-label="Rubros">
        <div className="gallery__head container">
          <span className="eyebrow">Para todo tipo de negocio</span>
          <h2 className="section-title">Diseñamos para rubros <em>como el tuyo</em>.</h2>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-row" ref={marquee1Ref}>
            {MARQUEE_ROW_1.map((item, i) => (<figure key={i} className="gimg"><img src={item.src} alt={item.label} loading="lazy"/><span>{item.label}</span></figure>))}
          </div>
          <div className="marquee-row marquee-row--rev" ref={marquee2Ref}>
            {MARQUEE_ROW_2.map((item, i) => (<figure key={i} className="gimg"><img src={item.src} alt={item.label} loading="lazy"/><span>{item.label}</span></figure>))}
          </div>
        </div>
      </section>

      <section className="stats-dark" aria-label="Números clave">
        <div className="stats-dark__glow stats-dark__glow--1" aria-hidden="true"/>
        <div className="stats-dark__glow stats-dark__glow--2" aria-hidden="true"/>
        <div className="container stats-grid">
          {[
            { val:'5', suffix:'días', label:'Entrega promedio', count:'5' },
            { val:'100', suffix:'%', label:'Adaptado a celular', count:'100' },
            { val:'50', suffix:'/50', label:'Forma de pago sin riesgo', count:null },
            { val:'24', suffix:'h', label:'Tiempo de respuesta', count:null },
          ].map((s,i) => (
            <div key={i} className="stat-block">
              <div style={{display:'flex',alignItems:'baseline',gap:4,justifyContent:'center'}}>
                <span className="stat-block__num" data-count={s.count||undefined}>{s.val}</span>
                <span style={{color:'rgba(255,255,255,.5)',fontFamily:'var(--head)',fontSize:'clamp(1.2rem,2vw,2rem)',fontWeight:700}}>{s.suffix}</span>
              </div>
              <span className="stat-block__label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <CtaBand
        title="¿Listo para que tu negocio <em>se vea profesional</em>?"
        subtitle="Conversemos sobre tu proyecto. Te respondemos el mismo día, sin compromiso."
        primaryText="Escribir por WhatsApp"
        primaryMsg="Hola Studio Zero, quiero conversar sobre un proyecto"
        secondaryText="Llamar: 952 102 805"
        secondaryLink="tel:+51952102805"
      />
    </div>
  );
}
