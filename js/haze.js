// Haze particle field on a fixed full-viewport canvas. Level (0-1) sets density and colour; wind (-1-1) sets drift.
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function readColour(name) {
  const hex = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace('#', '');
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

export function createHaze(canvas) {
  const ctx = canvas.getContext('2d');
  const stops = [readColour('--clean'), readColour('--haze-mid'), readColour('--haze-heavy')];
  let level = 0.5, wind = 0.1, particles = [], w = 0, h = 0, frame = null;

  function maxParticles() { return window.innerWidth < 700 ? 80 : 220; }

  function makeParticle() {
    return { x: Math.random() * w, y: Math.random() * h, r: 20 + Math.random() * 60, vy: (Math.random() - 0.5) * 0.15, seed: Math.random() };
  }

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = maxParticles();
    while (particles.length < n) particles.push(makeParticle());
    particles.length = n;
    if (reduceMotion) draw();
  }

  function colour() {
    return level < 0.5 ? mix(stops[0], stops[1], level * 2) : mix(stops[1], stops[2], (level - 0.5) * 2);
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const [r, g, b] = colour();
    const visible = Math.round(particles.length * (0.15 + 0.85 * level));
    const alpha = 0.06 + 0.16 * level;
    const stretch = 1 + Math.abs(wind) * 1.5;
    for (let i = 0; i < visible; i++) {
      const p = particles[i];
      // Scale the context so the radial gradient itself stretches into a streak.
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.scale(stretch, 1);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.r);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function step() {
    const speed = 0.2 + wind * 2.5;
    for (const p of particles) {
      p.x += speed * (0.6 + p.seed);
      p.y += p.vy;
      if (p.x > w + p.r * 3) p.x = -p.r * 3;
      if (p.x < -p.r * 3) p.x = w + p.r * 3;
      if (p.y > h + p.r) p.y = -p.r;
      if (p.y < -p.r) p.y = h + p.r;
    }
    draw();
    frame = requestAnimationFrame(step);
  }

  function start() { if (!reduceMotion && frame === null) frame = requestAnimationFrame(step); }
  function stop() { if (frame !== null) cancelAnimationFrame(frame); frame = null; }
  function onVisibility() { document.hidden ? stop() : start(); }

  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  resize();
  draw();
  start();

  return {
    setLevel(n) { level = Math.max(0, Math.min(1, n)); if (reduceMotion) draw(); },
    setWind(x) { wind = Math.max(-1, Math.min(1, x)); if (reduceMotion) draw(); },
    destroy() {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      ctx.clearRect(0, 0, w, h);
    },
  };
}
