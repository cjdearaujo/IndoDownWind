// Two-winters flip: stated figure cards that count up, plus a pinned scroll that highlights each winter and moves the haze.
// The haze stands for north India's air only (see .haze-key in index.html).
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAZE_BY_PHASE = [{ level: 0.25, wind: 0.9 }, { level: 0.8, wind: 0.1 }];

// "La Niña" -> "lanina", matching data-phase on the columns.
const phaseKey = (name) => name.normalize('NFD').replace(/[^a-zA-Z]/g, '').toLowerCase();
const formatPct = (n) => `${n > 0 ? '+' : n < 0 ? '−' : ''}${Math.abs(n)}%`;

function renderCards(root, meta) {
  root.innerHTML = '';
  return meta.stated_figures.map((fig) => {
    const card = document.createElement('div');
    card.className = 'figure-card';
    card.dataset.phase = phaseKey(meta.phases[fig.winter]);
    card.innerHTML = `
      <p class="figure-label">${fig.label} <span class="figure-winter">${fig.winter}</span></p>
      <p class="figure-value">${fig.qualifier ? `<span class="figure-qualifier">${fig.qualifier}</span> ` : ''}<span class="figure-number">${formatPct(fig.pct)}</span></p>`;
    root.append(card);
    return { card, fig };
  });
}

function countUp({ card, fig }) {
  const el = card.querySelector('.figure-number');
  const counter = { v: 0 };
  gsap.to(counter, {
    v: fig.pct, duration: 1.2, ease: 'power2.out',
    onUpdate: () => { el.textContent = formatPct(Math.round(counter.v)); },
    onComplete: () => { el.textContent = formatPct(fig.pct); },
    scrollTrigger: { trigger: card, start: 'top 85%', once: true },
  });
}

export function initFlip({ data, haze }) {
  const section = document.getElementById('flip');
  const root = section.querySelector('.flip-figures');
  const cards = renderCards(root, data.pm25.meta);
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const columns = [...section.querySelectorAll('.flip-col')];
  const hazeState = { ...haze.getState() };
  let current = -1;

  function setPhase(i) {
    if (i === current) return;
    current = i;
    const key = columns[i].dataset.phase;
    columns.forEach((col, j) => col.classList.toggle('is-dim', j !== i));
    cards.forEach(({ card }) => card.classList.toggle('is-dim', card.dataset.phase !== key));
    const target = HAZE_BY_PHASE[i];
    Object.assign(hazeState, haze.getState());
    const apply = () => { haze.setLevel(hazeState.level); haze.setWind(hazeState.wind); };
    if (reduceMotion) { Object.assign(hazeState, target); apply(); return; }
    gsap.to(hazeState, { ...target, duration: 1.2, ease: 'power1.inOut', overwrite: true, onUpdate: apply });
  }

  function clear() {
    current = -1;
    gsap.killTweensOf(hazeState);
    columns.forEach((col) => col.classList.remove('is-dim'));
    cards.forEach(({ card }) => card.classList.remove('is-dim'));
  }

  if (!reduceMotion) cards.forEach(countUp);

  ScrollTrigger.matchMedia({
    '(min-width: 700px) and (prefers-reduced-motion: no-preference)': () => {
      ScrollTrigger.create({
        trigger: section,
        // A section taller than the screen pins at its bottom so nothing is hidden.
        start: () => (section.offsetHeight > window.innerHeight ? 'bottom bottom' : 'top top'),
        end: '+=120%',
        pin: true,
        invalidateOnRefresh: true,
        refreshPriority: 1, // created after scroll.js triggers, but must measure first so they include the pin spacing
        onUpdate: (self) => setPhase(self.progress < 0.5 ? 0 : 1),
        onLeave: clear,
        onLeaveBack: clear,
      });
    },
    '(max-width: 699px), (prefers-reduced-motion: reduce)': () => {
      columns.forEach((col, i) => {
        ScrollTrigger.create({ trigger: col, start: 'top 60%', end: 'bottom 40%', onEnter: () => setPhase(i), onEnterBack: () => setPhase(i) });
      });
      ScrollTrigger.create({ trigger: section, start: 'top bottom', end: 'bottom top', onLeave: clear, onLeaveBack: clear });
    },
  });
  ScrollTrigger.sort();
  ScrollTrigger.refresh();
}
