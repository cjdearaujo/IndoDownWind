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
import { initQuiz } from './quiz.js';

// Placeholders that depend on data/*.json; each gets a visible note if loading fails. The text copy stays readable.
function showDataError() {
  ['#flip .flip-figures', '#city-panel', '#zones .zone-bars', '#quiz-root'].forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) el.innerHTML = '<p class="data-error" role="status">This part could not load its data. The text on this page is still complete.</p>';
  });
}

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
    initQuiz({ quiz: data.quiz });
  } catch (err) {
    console.error(err);
    showDataError();
  }
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
else start();
