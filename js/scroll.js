// Scroll engine: reveals [data-reveal] elements and moves the haze to each section's data-haze / data-wind.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScroll({ haze }) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  if (!reduceMotion) {
    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      gsap.from(el, { opacity: 0, y: 24, duration: 0.9, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });
  }

  // A proxy object so GSAP can tween plain numbers that haze reads through its setters.
  const state = { level: 0.5, wind: 0.1 };
  const apply = () => { haze.setLevel(state.level); haze.setWind(state.wind); };

  document.querySelectorAll('section[data-haze]').forEach((section) => {
    const target = { level: Number(section.dataset.haze), wind: Number(section.dataset.wind || 0) };
    const go = () => {
      if (reduceMotion) { Object.assign(state, target); apply(); return; }
      gsap.to(state, { ...target, duration: 1.2, ease: 'power1.inOut', overwrite: true, onUpdate: apply });
    };
    ScrollTrigger.create({ trigger: section, start: 'top center', end: 'bottom center', onEnter: go, onEnterBack: go });
  });
}
