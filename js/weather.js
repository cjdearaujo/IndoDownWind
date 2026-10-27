// Four explanatory diagrams for #weather, drawn as inline SVG. They illustrate ideas, not data, so they carry no numbers.
// Motion is CSS-driven; base.css switches animations and transitions off under reduced motion, leaving static states.
const NS = 'http://www.w3.org/2000/svg';
const W = 300, H = 140, GROUND = 120;

// Seeded random so the diagrams look the same on every load.
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647); }

function svg(label, desc) {
  const el = document.createElementNS(NS, 'svg');
  el.setAttribute('viewBox', `0 0 ${W} ${H}`);
  el.setAttribute('role', 'img');
  el.setAttribute('aria-label', label);
  el.innerHTML = `<desc>${desc}</desc>`;
  return el;
}

function add(parent, tag, attrs) {
  const el = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  parent.append(el);
  return el;
}

function city(parent, x0, x1) {
  const r = rng(7);
  for (let x = x0; x < x1; x += 18) { const h = 12 + r() * 22; add(parent, 'rect', { class: 'wx-city', x, y: GROUND - h, width: 14, height: h }); }
  add(parent, 'line', { class: 'wx-ground', x1: 0, y1: GROUND, x2: W, y2: GROUND });
}

function caption(root, text) {
  const p = document.createElement('p');
  p.className = 'wx-caption';
  p.textContent = text;
  root.append(p);
}

function wind(root) {
  const fig = svg('Diagram: wind and a city', 'Strong wind carries pollution dots out of the frame; weak wind lets them pile up over the city.');
  city(fig, 100, 200);
  const r = rng(3);
  const dots = Array.from({ length: 26 }, (_, i) => {
    // The group holds the resting position (transitioned); the circle inside carries the drift animation.
    const dot = add(fig, 'g', { class: 'wx-pos' });
    add(dot, 'circle', { class: 'wx-dot', r: 3.5 }).style.animationDelay = `${-r() * 3}s`;
    // Two resting places per dot: a streak across the frame (strong) or a heap above the city (weak).
    dot.strong = { x: (i / 26) * W, y: 30 + r() * 60 };
    const a = r() * Math.PI, d = Math.sqrt(r());
    dot.weak = { x: 150 + Math.cos(a) * 55 * d, y: GROUND - 40 - Math.sin(a) * 45 * d };
    return dot;
  });
  const streaks = add(fig, 'g', { class: 'wx-streaks' });
  for (let y = 25; y < 100; y += 22) add(streaks, 'line', { class: 'wx-streak', x1: 10, y1: y, x2: 290, y2: y });

  const group = document.createElement('div');
  group.className = 'wx-toggles';
  group.setAttribute('role', 'group');
  group.setAttribute('aria-label', 'Wind strength');
  const buttons = ['Strong wind', 'Weak wind'].map((text, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'wx-toggle';
    b.textContent = text;
    b.addEventListener('click', () => set(i === 0));
    group.append(b);
    return b;
  });
  function set(strong) {
    root.classList.toggle('is-strong', strong);
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String((i === 0) === strong)));
    fig.setAttribute('aria-label', strong ? 'Diagram: strong wind streams pollution dots past the city and out of the frame' : 'Diagram: weak wind lets pollution dots pile up and linger above the city');
    dots.forEach((dot) => { const p = strong ? dot.strong : dot.weak; dot.style.transform = `translate(${p.x}px, ${p.y}px)`; });
  }
  root.append(group, fig);
  set(true);
}

function rainPanel(title, pressure) {
  const fig = svg(title, pressure
    ? 'High pressure pushes down on the air, pressing pollution dots toward the ground even while rain falls.'
    : 'Raindrops fall through the air and pollution dots fade away as they are washed out.');
  add(fig, 'text', { class: 'wx-label', x: 10, y: 18 }).textContent = pressure ? 'High pressure' : 'Rain';
  const r = rng(pressure ? 11 : 5);
  for (let i = 0; i < 14; i++) {
    const drop = add(fig, 'line', { class: 'wx-drop', x1: 0, y1: 0, x2: -2, y2: 8 });
    drop.style.setProperty('--x', `${20 + r() * 260}px`);
    drop.style.animationDelay = `${-r() * 1.4}s`;
  }
  for (let i = 0; i < 22; i++) {
    const y = pressure ? GROUND - 6 - r() * 16 : 35 + r() * 75;
    const dot = add(fig, 'circle', { class: pressure ? 'wx-dot' : 'wx-dot wx-washout', cx: 15 + r() * 270, cy: y, r: 3.5 });
    dot.style.animationDelay = `${-r() * 4}s`;
  }
  if (pressure) {
    add(fig, 'path', { class: 'wx-arrow', d: 'M150 24 V70 M138 58 L150 72 L162 58' });
  }
  add(fig, 'line', { class: 'wx-ground', x1: 0, y1: GROUND, x2: W, y2: GROUND });
  return fig;
}

function rain(root) {
  const pair = document.createElement('div');
  pair.className = 'wx-pair';
  pair.append(rainPanel('Diagram A: rain washing pollution out', false), rainPanel('Diagram B: high pressure trapping pollution near the ground', true));
  root.append(pair);
  caption(root, 'In Jaipur, rain was more tied to cleaner air in 2022-23. In 2023-24, pressure mattered more, and pollution spiked after rain.');
}

function lid(root) {
  const fig = svg('Diagram: the boundary layer as a lid over a city', 'Lowering the lid squeezes the same pollution dots into a thinner, denser band near the ground.');
  city(fig, 60, 250);
  const r = rng(9);
  const dots = Array.from({ length: 40 }, () => ({ el: add(fig, 'circle', { class: 'wx-dot', cx: 10 + r() * 280, r: 3 }), t: r() }));
  const line = add(fig, 'line', { class: 'wx-lid', x1: 0, x2: W });
  const label = add(fig, 'text', { class: 'wx-label', x: 10 });
  label.textContent = 'Shallow boundary layer';

  const id = 'lid-height';
  const control = document.createElement('div');
  control.className = 'wx-lid-control';
  control.innerHTML = `<label for="${id}">Lid height</label><input type="range" id="${id}" min="0" max="100" value="80" aria-orientation="vertical">`;
  const input = control.querySelector('input');
  function set() {
    const top = 15 + (1 - input.value / 100) * 63; // 15 (high lid) to 78 (low lid), just above the tallest roof
    line.setAttribute('y1', top); line.setAttribute('y2', top);
    label.setAttribute('y', top - 6);
    label.classList.toggle('is-hidden', input.value > 40);
    dots.forEach(({ el, t }) => el.setAttribute('cy', top + 5 + t * (GROUND - top - 8)));
    input.setAttribute('aria-valuetext', input.value > 40 ? 'Deep boundary layer: pollution spread out' : 'Shallow boundary layer: pollution squeezed near the ground');
  }
  input.addEventListener('input', set);
  const wrap = document.createElement('div');
  wrap.className = 'wx-lid-wrap';
  wrap.append(control, fig);
  root.append(wrap);
  set();
}

function trajectory(root) {
  const fig = svg('Diagram: where the air came from', 'An arrow of polluted northern air ends at Jaipur; an arrow of cleaner marine and southern air ends at Hyderabad.');
  add(fig, 'path', { class: 'wx-traj wx-traj-north', d: 'M70 8 C80 30 90 40 100 52', 'marker-end': 'url(#wx-head-n)' });
  add(fig, 'path', { class: 'wx-traj wx-traj-south', d: 'M285 132 C250 125 225 112 205 100', 'marker-end': 'url(#wx-head-s)' });
  const defs = add(fig, 'defs', {});
  for (const [mid, cls] of [['wx-head-n', 'wx-head-north'], ['wx-head-s', 'wx-head-south']]) {
    const m = add(defs, 'marker', { id: mid, viewBox: '0 0 10 10', refX: 8, refY: 5, markerWidth: 6, markerHeight: 6, orient: 'auto-start-reverse' });
    add(m, 'path', { class: cls, d: 'M0 0 L10 5 L0 10 z' });
  }
  add(fig, 'circle', { class: 'wx-place', cx: 105, cy: 58, r: 5 });
  add(fig, 'circle', { class: 'wx-place', cx: 198, cy: 96, r: 5 });
  add(fig, 'text', { class: 'wx-label wx-strong', x: 115, y: 62 }).textContent = 'Jaipur';
  add(fig, 'text', { class: 'wx-label wx-strong', x: 188, y: 100, 'text-anchor': 'end' }).textContent = 'Hyderabad';
  add(fig, 'text', { class: 'wx-label', x: 82, y: 14 }).textContent = 'polluted northern air';
  add(fig, 'text', { class: 'wx-label', x: 10, y: 132 }).textContent = 'cleaner marine and southern air';
  root.append(fig);
  caption(root, 'In the El Niño winter this helps explain why the two cities moved in opposite directions.');
}

const BUILDERS = { wind, rain, lid, trajectory };

export function initWeather() {
  document.querySelectorAll('#weather .weather-visual').forEach((root) => BUILDERS[root.dataset.visual]?.(root));
}
