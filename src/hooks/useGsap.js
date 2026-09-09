import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

export function useGsap(fn, deps = []) {
  const scope = useRef(null);
  useEffect(() => {
    if (reduceMotion) return;
    const ctx = gsap.context(() => fn(gsap, ScrollTrigger), scope);
    return () => ctx.revert();
  }, deps);
  return scope;
}

export function setupPageAnimations(gsap, ScrollTrigger) {
  const st = (trigger, extra = {}) => ({
    trigger,
    start: 'top 88%',
    toggleActions: 'play none none none',
    ...extra,
  });

  gsap.fromTo('.pagehead .crumbs',
    { opacity: 0, x: -20 },
    { opacity: 1, x: 0, duration: .6, ease: 'power3.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });
  gsap.fromTo('.pagehead h1',
    { opacity: 0, y: 36, clipPath: 'inset(0 0 100% 0)' },
    { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)',
      duration: .9, ease: 'expo.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });
  gsap.fromTo('.pagehead p',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: .7, delay: .15, ease: 'power3.out',
      scrollTrigger: st('.pagehead', { start: 'top 95%' }) });

  gsap.utils.toArray('.section-head .eyebrow').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -18 },
      { opacity: 1, x: 0, duration: .6, ease: 'power3.out', scrollTrigger: st(el) });
  });
  gsap.utils.toArray('.section-head .section-title, .section-head h2').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 32, clipPath: 'inset(0 0 100% 0)' },
      { opacity: 1, y: 0,  clipPath: 'inset(0 0 0% 0)',
        duration: .9, ease: 'expo.out', scrollTrigger: st(el) });
  });
  gsap.utils.toArray('.section-head .lead').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: .65, ease: 'power3.out',
        scrollTrigger: st(el, { start: 'top 91%' }) });
  });

  const groups = [
    { wrap: '.values', item: '.value', stagger: .10 },
    { wrap: '.steps', item: '.step', stagger: .10 },
    { wrap: '.price-grid', item: '.price-card', stagger: .13 },
    { wrap: '.addons', item: '.addon', stagger: .08 },
    { wrap: '.contact-channels', item: '.channel', stagger: .09 },
    { wrap: '.work-live-grid', item: '.work-live', stagger: .11 },
    { wrap: '.features', item: 'li', stagger: .05 },
  ];
  groups.forEach(({ wrap, item, stagger }) => {
    gsap.utils.toArray(wrap).forEach(container => {
      const items = container.querySelectorAll(item);
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 44, scale: .97 },
        { opacity: 1, y: 0, scale: 1,
          stagger, duration: .8, ease: 'back.out(1.3)',
          scrollTrigger: st(container) });
    });
  });

  gsap.utils.toArray('.svc-detail').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: st(el) });
  });

  gsap.utils.toArray('.faq details').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, x: -22 },
      { opacity: 1, x: 0, duration: .55, ease: 'power3.out', delay: i * .04,
        scrollTrigger: st(el, { start: 'top 92%' }) });
  });

  const aboutVisual = document.querySelector('.about-portrait');
  const aboutBody = document.querySelector('.about-body');
  if (aboutVisual && aboutBody) {
    gsap.fromTo(aboutVisual,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: st('.about-hero') });
    gsap.fromTo(aboutBody,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: st('.about-hero') });
  }

  gsap.utils.toArray('.value').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 36, scale: .96 },
      { opacity: 1, y: 0, scale: 1,
        duration: .75, ease: 'back.out(1.4)',
        delay: i * .09,
        scrollTrigger: st(el, { start: 'top 90%' }) });
  });

  gsap.utils.toArray('.img-frame').forEach(frame => {
    gsap.fromTo(frame,
      { opacity: 0, clipPath: 'inset(0 0 100% 0)', scale: 1.04 },
      { opacity: 1, clipPath: 'inset(0 0 0% 0)', scale: 1,
        duration: 1, ease: 'expo.inOut', scrollTrigger: st(frame) });
  });

  const form = document.querySelector('.form');
  if (form) {
    gsap.fromTo(form,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
        scrollTrigger: st(form) });
  }

  gsap.utils.toArray('.addon').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: .6, ease: 'power3.out', delay: i * .07,
        scrollTrigger: st(el, { start: 'top 92%' }) });
  });

  const ctaBand = document.querySelector('.cta-band__inner');
  if (ctaBand) {
    gsap.fromTo(ctaBand,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: .9, ease: 'expo.out',
        scrollTrigger: st(ctaBand, { start: 'top 85%' }) });
  }

  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.btn-primary, .btn-light').forEach(btn => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) * .25;
        const dy = (e.clientY - (r.top + r.height / 2)) * .25;
        gsap.to(btn, { x: dx, y: dy, duration: .35, ease: 'power2.out' });
      };
      const onLeave = () => gsap.to(btn, { x: 0, y: 0, duration: .55, ease: 'elastic.out(1,.5)' });
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
    });
  }
}

export function setupLandingAnimations(gsap, ScrollTrigger) {
  const st = (trigger, extra = {}) => ({
    trigger,
    start: 'top 85%',
    toggleActions: 'play none none none',
    ...extra,
  });

  // 1. Hero Entrance Timeline
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  if (document.querySelector('.hero-status')) {
    heroTl.fromTo('.hero-status',
      { opacity: 0, y: -15, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6 }
    );
  }
  if (document.querySelector('.hero-name')) {
    heroTl.fromTo('.hero-name',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.3'
    );
  }
  if (document.querySelector('.hero-title')) {
    heroTl.fromTo('.hero-title',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }
  if (document.querySelector('.hero-bio')) {
    heroTl.fromTo('.hero-bio',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.4'
    );
  }
  if (document.querySelector('.hero-actions')) {
    heroTl.fromTo('.hero-actions .btn',
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
      '-=0.3'
    );
  }
  if (document.querySelector('.hero-socials')) {
    heroTl.fromTo('.hero-social-link',
      { opacity: 0, x: -15 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.5 },
      '-=0.3'
    );
  }
  if (document.querySelector('.engineer-card')) {
    heroTl.fromTo('.engineer-card',
      { opacity: 0, y: 35, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out' },
      '-=0.7'
    );
  }

  // 2. Metrics Ribbon Stagger
  if (document.querySelector('.metrics-ribbon')) {
    gsap.fromTo('.metric-card',
      { opacity: 0, y: 25, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6, ease: 'back.out(1.2)',
        scrollTrigger: st('.metrics-ribbon', { start: 'top 92%' }) }
    );
  }

  // 3. Section Headers
  gsap.utils.toArray('.pro-header').forEach((header) => {
    gsap.fromTo(header.querySelectorAll('.pro-header__eyebrow, .pro-header__title, .pro-header__desc'),
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out', scrollTrigger: st(header) }
    );
  });

  // 4. Cinematic Stacking Cards ScrollTrigger
  const cards = gsap.utils.toArray('.cinematic-project-card');
  if (cards.length > 0) {
    cards.forEach((card, i) => {
      // Entrance for each card
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out',
          scrollTrigger: st(card, { start: 'top 90%' }) }
      );

      // Stacking scroll effect when next card overlaps
      if (i < cards.length - 1 && cards[i + 1]) {
        ScrollTrigger.create({
          trigger: cards[i + 1],
          start: 'top 80%',
          end: 'top 15%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const scale = 1 - progress * 0.06;
            const brightness = 1 - progress * 0.45;
            const y = -progress * 25;
            gsap.set(card, {
              scale,
              y,
              filter: `brightness(${brightness})`,
              transformOrigin: 'top center',
            });
          },
        });
      }
    });
  }

  // 5. Skills Grid
  if (document.querySelector('.skills-grid')) {
    gsap.fromTo('.skill-card',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: st('.skills-grid') }
    );
  }

  // 6. Interactive Code Explorer
  if (document.querySelector('.code-explorer')) {
    gsap.fromTo('.code-explorer',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: st('.code-explorer') }
    );
  }

  // 7. About Grid
  if (document.querySelector('.about-pro-grid')) {
    gsap.fromTo('.about-profile-card',
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.about-pro-grid') }
    );
    gsap.fromTo('.about-narrative',
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: st('.about-pro-grid') }
    );
  }

  // 8. Principles Grid
  if (document.querySelector('.principles-grid')) {
    gsap.fromTo('.principle-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out',
        scrollTrigger: st('.principles-grid') }
    );
  }

  // 9. Contact Channels & Form
  if (document.querySelector('.contact-grid')) {
    gsap.fromTo('.contact-channels .channel',
      { opacity: 0, x: -25 },
      { opacity: 1, x: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: st('.contact-grid') }
    );
    gsap.fromTo('.contact-grid .form',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: st('.contact-grid') }
    );
  }
}
