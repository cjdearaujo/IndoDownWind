# IndoDownWind

*Same emissions. Different air.*

## Project summary

IndoDownWind is a one-page, scroll-driven explainer on why India's winter PM2.5 flipped between north India and the peninsula from 2022-23 (La Niña) to 2023-24 (El Niño), with no major change in emissions. It also shows how the hot semi-arid climate zone has moved east into Uttar Pradesh, and asks how pollution and farming policy should adapt when weather, not just emissions, drives the outcome.

## Live site

Live link: _(add the GitHub Pages URL here once Pages is on)_

## Problem and audience

Winter air quality is usually discussed as a question of emissions alone. The study reported here shows that two back-to-back winters with broadly similar emissions had opposite pollution maps. The site is for the general public: plain language, phone-first, no assumed science, with glossary tooltips for the few technical terms.

## Tech stack and why

- **Plain HTML, CSS and vanilla JavaScript (ES modules).** There's no build step and no framework, so the code is easy to read and runs anywhere.
- **GSAP + ScrollTrigger (CDN)** for scroll reveals, the pinned two-winters section and the count-up figures.
- **Chart.js (CDN)** for the city-wise bar chart.
- **GitHub Pages** for hosting static files.
- Everything runs in the browser: no GPU, no server code, no API keys. The haze is a 2D canvas.

## Folder structure

```
index.html            All six sections with complete text (readable without JavaScript)
css/
  tokens.css          Colours, type scale, spacing: the only place colours are defined
  base.css            Reset, typography, focus ring, utilities, reduced-motion switch
  sections.css        Layout and styling for each section and component
js/
  main.js             Entry point: loads data and wires every module (modules never import each other)
  data.js             Fetches the four data files in parallel
  haze.js             Particle haze canvas (level and wind setters)
  scroll.js           Staggered reveals and section-linked haze levels
  flip.js             Two-winters section: stated figures, pinned highlight, haze flip
  charts.js           City chart, winter tabs, generated text summary, text fallback
  weather.js          Four inline-SVG diagrams (wind, rain vs pressure, lid, air origins)
  zones.js            Climate-zone bars, places that moved, farming note
  tooltips.js         Accessible glossary tooltips
  quiz.js             Five-question quiz
data/
  pm25.json           City PM2.5 change per winter, each labelled stated or approximate
  climate_zones.json  Climate-zone shares with qualifiers
  glossary.json       Plain-language definitions
  quiz.json           Quiz questions and explanations
  evidence.json       The article's facts, E1 to E17
prompts/              Build prompts 01 to 15, context, master prompt and the prompt log
```

## Data and honesty

- **Stated in the article text:** Mumbai +45% (2022-23); Jaipur about +50% and Delhi over +10% (2023-24); north India down by up to 30% (2022-23). These appear as solid bars and as the four headline figures, with their qualifiers ("up to", "about", "over").
- **Approximate:** the other 23 city values were measured from the article's printed chart and rounded to the nearest 5 points. The chart draws them as striped bars, the tooltip and text summary prefix them with "approx.", and values too small to read are labelled "about 0 (too small to read)".
- The temperate-zone change is shown as words only ("from about a quarter to less than a fifth") because the article gives no exact later value.
- The site never says El Niño or La Niña causes a pollution outcome. The caveat panel states that the study shows association, not proof of cause, that the two winters were unusual, and that it does not say El Niño always worsens air in Delhi or north India. The rain and pressure finding is presented for Jaipur only, and the farming note states that the article does not report effects on yields.

## Design principles, with examples

- **DRY:** every number comes from `data/*.json`. For example, the flip figures are rendered from `pm25.json` `meta.stated_figures`, and the chart summary text is generated from the same records as the bars. Colours exist only in `css/tokens.css`; the haze and chart read them with `getComputedStyle`.
- **Orthogonality:** each behaviour is its own module, and modules talk only through `main.js`. For example, `flip.js` and `scroll.js` both move the haze, but only through the object `createHaze()` returns (`setLevel`, `setWind`, `getState`).
- **Small iterations:** one step per commit (see `git log` and the prompt log in `prompts/00-README.md`).
- **Documentation:** this README, the prompt log, and comments only where the reason is not obvious (for example, why the city chart gets its own sizing box).
- **Progressive enhancement:** `index.html` holds the whole story as text. Reveal animations hide content only after GSAP is confirmed running. If Chart.js fails, the chart becomes its text summary, and if a data file fails, each affected section shows a short visible note.

## Accessibility notes

- Semantic landmarks, one `h1`, headings in order, a skip link, and every section named by its heading.
- Everything is keyboard operable: the chart tabs (arrow keys, Home, End), the glossary terms (Enter, Space, Escape), the wind toggle, the lid slider and the quiz (radio buttons in a fieldset).
- The chart has a generated `aria-label` and a text summary that update on toggle. The SVG diagrams have `role="img"` with labels and descriptions, and the haze canvas is `aria-hidden`.
- Text contrast is at least 4.5:1 (ink 16.96:1, dim ink 8.84:1 on the night background). Quiz results use text and ✓/✗ marks, not colour alone.
- `prefers-reduced-motion` turns off the haze motion, reveals, count-ups, pinning, section snapping and the diagram animations.
- Tested at 375 px, 320 px and the equivalent of 200% zoom. The Lighthouse accessibility score was 100 during the audit.

## How to run locally

```
python -m http.server
```

Then open http://localhost:8000. A local server is needed because `fetch` of the JSON files fails on `file://`.

## Limitations and future work

- City values other than the three stated ones are approximate readings of a printed chart. Real CPCB monitoring data would replace them.
- A Hindi version.
- An interactive map of cities and climate zones.

## Credits

- Times of India report, "Study traces how an El Niño changed the pollution map".
- The study "Air quality in flux: The baffling ENSO transition in India", *Atmospheric Pollution Research*.
- The IMD/IITM study of India's climate zones, 1951-2020, as reported by the Times of India.
