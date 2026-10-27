// Entry point. Each behaviour lives in its own module (haze, scroll, flip, charts, weather, zones, tooltips, quiz)
// and talks to the others only through this file.
import { loadAll } from './data.js';
import { createHaze } from './haze.js';
import { initScroll } from './scroll.js';
import { initFlip } from './flip.js';
import { initCityChart } from './charts.js';
import { initWeather } from './weather.js';
import { initZones } from './zones.js';
import { initTooltips } from './tooltips.js';

async function start() {
  const haze = createHaze(document.getElementById('haze'));
  initScroll({ haze });
  try {
    const data = await loadAll();
    initFlip({ data, haze });
    initCityChart({ data });
    initWeather();
    initZones({ data });
    initTooltips({ glossary: data.glossary });
  } catch (err) {
    console.error(err);
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
