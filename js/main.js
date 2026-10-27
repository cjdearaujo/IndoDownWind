// Entry point. Each behaviour lives in its own module (haze, scroll, flip, charts, weather, zones, tooltips, quiz)
// and talks to the others only through this file.
import { loadAll } from './data.js';
import { createHaze } from './haze.js';
import { initScroll } from './scroll.js';

async function start() {
  const haze = createHaze(document.getElementById('haze'));
  initScroll({ haze });
  try {
    const data = await loadAll();
    console.log('Data loaded', Object.keys(data));
    // Later steps wire modules here, for example: initCityChart({ data });
  } catch (err) {
    console.error(err);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
