// Scroll engine: reveals [data-reveal] elements and moves the haze to each section's data-haze / data-wind.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function initScroll({ haze }) {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Blocks are hidden only here, once GSAP is known to work, so a failed load leaves everything visible.
  // One batch per section, so blocks in a section arrive one after another.
  if (!reduceMotion) {
    document.querySelectorAll('section').forEach((section) => {
      const items = section.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 16 });
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.12 }),
      });
    });
  }

  // A proxy object so GSAP can tween plain numbers that haze reads through its setters.
  const state = { level: 0.5, wind: 0.1 };
  const apply = () => { haze.setLevel(state.level); haze.setWind(state.wind); };

  document.querySelectorAll('section[data-haze]').forEach((section) => {
    const target = { level: Number(section.dataset.haze), wind: Number(section.dataset.wind || 0) };
    const go = () => {
      // Start from wherever the haze is now; another module may have moved it.
      Object.assign(state, haze.getState());
      if (reduceMotion) { Object.assign(state, target); apply(); return; }
      gsap.to(state, { ...target, duration: 1.2, ease: 'power1.inOut', overwrite: true, onUpdate: apply });
    };
    ScrollTrigger.create({ trigger: section, start: 'top center', end: 'bottom center', onEnter: go, onEnterBack: go });
  });
}
