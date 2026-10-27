# AGENTS.md: instructions for the coding agent

You are building a one-page, scroll-driven explainer website. This folder (the project root) is self-contained: everything you need is here. Do not look for files outside it.

## The project
- **Site name:** IndoDownWind. Use it in the page `<title>`, a small wordmark in the header, the footer and the README. Keep the hero headline "Same emissions. Different air." as a slogan; everywhere else say "no major change" or "broadly similar" (the article never says identical)
- **Topic:** why India's winter PM2.5 flipped between regions in 2022-23 (La Niña) and 2023-24 (El Niño) with no major change in emissions, and how the hot semi-arid climate zone is moving east into Uttar Pradesh.
- **Source:** Times of India report, "Study traces how an El Niño changed the pollution map" (study: "Air quality in flux: The baffling ENSO transition in India", *Atmospheric Pollution Research*), plus an IMD/IITM climate-zone study.
- **Guiding question:** How should pollution and agriculture policy adapt when weather, not just emissions, drives outcomes?
- **Audience:** the general public. Plain language, phone-first, visually striking and atmospheric (editorial look, night-blue background, a haze canvas that thickens and clears as you scroll).
- **Required content:** a city-wise PM2.5 change view for both winters, a section on climate-zone shifts, glossary tooltips, and a short quiz (the quiz is the first thing to cut if time runs short). The study's caveats must be visible on the page.

## Stack and rules
- Plain HTML, CSS and vanilla JavaScript (ES modules). No frameworks, no build step.
- CDN libraries only: GSAP + ScrollTrigger, Chart.js (already linked in `index.html`).
- Run it with a local server (`python -m http.server`), because `fetch` of the JSON files fails on `file://`.
- Pragmatic Programmer principles: **DRY** (facts, text and colours defined once: JSON and CSS variables), **orthogonality** (separate files for data, style and each JS behaviour; modules talk only through `js/main.js`), **small iterations** (one working step, one commit), **clear documentation** (README, prompt log, comments only where the reason is not obvious).
- Accessibility: semantic HTML, contrast of at least 4.5:1, keyboard operable, `prefers-reduced-motion` respected, the page readable with JavaScript off.

## Honesty rules (do not break these)
- All facts live in `data/`. **Never invent numbers.** `data/evidence.json` holds the article's facts with ids E1 to E17.
- In `data/pm25.json` only three city values are **stated** in the article text (Mumbai 2022-23: +45%; Jaipur 2023-24: about +50%; Delhi 2023-24: over +10%). All other city values are **approximate** (measured from the printed chart, about 5 points of error). The UI must label approximate values as approximate, and show the qualifiers ("about", "over", "up to").
- Never say El Niño or La Niña *causes* a pollution outcome, or that the pattern will repeat. The authors say the correlations do not establish causation, cannot be extrapolated, and that the two winters were unusual.
- The rain and pressure finding is about **Jaipur** only.
- Do not claim anything about crop yields or sowing dates: the article does not report them.
- Do not change `data/*.json` numbers without asking.

## What is already scaffolded
- `index.html` with all six sections and real copy; `css/tokens.css`, `css/base.css`, `css/sections.css`; `js/data.js` and `js/main.js`; and the four data files plus `data/evidence.json`.
- Prompts steps 01 to 04 describe work that is already done in basic form. Verify each against its acceptance checklist and fix gaps; do not recreate files.

## How to work
0. If this folder is not a git repository, run `git init -b main` and commit the scaffold as "Initial scaffold" before starting. Every step below commits, and step 15 deploys from this repository.
1. Read `prompts/00-context.md`, then follow `prompts/00-README.md` (the index) step by step, from the verification of 01 to 04 through step 15.
2. For each step: do only what the step says, touch only the files it names, check its acceptance checklist, commit with the commit message given in the step, and fill the log row in `prompts/00-README.md`.
3. If something breaks, revert to the last commit and retry with a narrower change.
4. If time is short, cut in this order: quiz (11), wind animation in 08, haze polish in 05. Keep the city chart (07) and the caveat (12).

## Definition of done
- Runs from a local server with no console errors; deployed on GitHub Pages.
- All six sections work on a 375 px phone and on desktop; keyboard and reduced-motion behaviour checked.
- Every number traces to `data/` and approximate values are labelled.
- `README.md` completed (step 15) and the prompt log filled in.
