# Website build prompts

> **This folder is self-contained.** Everything the build needs is inside this folder: facts in `data/`, rules in `AGENTS.md`, prompts here. To have a coding agent build the whole site in one go, give it `MASTER-PROMPT.md`.
>
> **Already scaffolded** (verify, don't recreate): step 01 (`index.html`, CDN scripts, CSS and JS files), step 02 (all four `data/*.json` files, with city values already filled in), step 03 (`css/tokens.css`, `css/base.css`), and step 04 (all six sections with real copy). Start the real build at step 05, but first run the acceptance checklists of steps 01 to 04 and fix anything that fails.

One numbered file per step. Paste `00-context.md` at the start of every new assistant session, then paste the **Prompt** block from the step file. After each step, tick the acceptance checklist, commit, and fill in the log below.

## Index

| Step | File | Result | Plan time |
| --- | --- | --- | --- |
| 01 | `01-project-setup.md` | Folder structure, CDN scripts, empty six-section page | 0:15 to 0:40 |
| 02 | `02-data-model.md` | JSON data files with source labels | |
| 03 | `03-design-system.md` | Colour tokens, type scale, base styles | |
| 04 | `04-page-skeleton.md` | All six sections with real copy, readable with no JavaScript | |
| 05 | `05-hero-haze-and-scroll.md` | Haze canvas and scroll engine | 0:40 to 1:30 |
| 06 | `06-the-flip-section.md` | Two-winters split with animated figures | |
| 07 | `07-city-chart.md` | City-wise PM2.5 toggle chart | |
| 08 | `08-weather-mechanisms.md` | Wind, rain versus pressure, boundary layer, trajectories | 1:30 to 2:10 |
| 09 | `09-climate-zones.md` | Climate-zone shift and farming note | |
| 10 | `10-glossary-tooltips.md` | Accessible glossary tooltips | 2:10 to 2:35 |
| 11 | `11-quiz.md` | Five-question quiz | |
| 12 | `12-caveat-and-closing.md` | What it means, and what the study does not show | |
| 13 | `13-accessibility-responsive.md` | Accessibility and phone-width audit | 2:35 to 3:00 |
| 14 | `14-performance-and-fallbacks.md` | Performance, reduced motion, CDN-failure fallbacks | |
| 15 | `15-deploy-and-docs.md` | GitHub Pages, README, screenshots | |

If time runs short, cut in this order: 11 (quiz), the wind animation in 08, haze polish in 05. Keep 07 and 12.

## Rules that apply to every step

- Touch only the files named in the step.
- Never invent numbers. Use values from `data/*.json` (including `data/evidence.json`) only.
- Keep colours, text and facts defined once (CSS variables and JSON).
- If the assistant breaks something, revert to the last commit and re-prompt with a narrower request.

## Prompt log

Record every prompt actually used, including follow-ups. This log is part of the deliverables.

| Step | Prompt used (or "as written") | Follow-up prompts | Result | Commit |
| --- | --- | --- | --- | --- |
| 01 | Verified (scaffold) | | Checklist passed; page and data load, no console errors | abfecbd |
| 02 | Verified (scaffold) | | JSON valid; 3 stated, 23 approximate; loadAll() OK | abfecbd |
| 03 | Verified (scaffold) | | No stray colours; contrast ink 16.96:1, ink-dim 8.84:1 on --night | abfecbd |
| 04 | Verified (scaffold) | | Copy and terms OK. Unsure: #cities/#zones/#meaning use the prompt titles as eyebrows with editorial h2s; kept as scaffolded | abfecbd |
| 05 | As written (via MASTER-PROMPT) | Raised haze alpha so it reads on the night background | Haze + scroll engine; reduced motion sets haze values instantly, no tweens | see git log |
| 06 | As written | Added haze.getState() (read by scroll.js and flip.js) so tweens start from the current haze; pin uses refreshPriority so later triggers include pin spacing; columns dim their children because the reveal tween owns the column opacity | Flip pinned on desktop, per-column triggers on phones and reduced motion | see git log |
| 07 | | | | |
| 08 | | | | |
| 09 | | | | |
| 10 | | | | |
| 11 | | | | |
| 12 | | | | |
| 13 | | | | |
| 14 | | | | |
| 15 | | | | |
