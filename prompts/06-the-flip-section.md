# 06 The flip section

**Goal:** a dramatic "two winters, opposite outcomes" moment, with headline figures counting up and the haze visibly flipping.

**Files the assistant may create or edit:** `js/flip.js`, `js/main.js`, `css/sections.css`

## Prompt

```text
Build the flip section interaction.

js/flip.js: export initFlip({ data, haze }).
- Read the figures from data (pm25.json meta.stated_figures; the four stated figures); do not hard-code numbers in JS.
- Fill .flip-figures with four large figure cards: Mumbai +45% (2022-23), North India down by up to 30% (2022-23), Jaipur +about 50% (2023-24), Delhi +over 10% (2023-24). Show the qualifier words ("up to", "about", "over") in small text next to each number so nothing is overstated.
- Count each number up from 0 when its card enters view (GSAP, 1.2s, ease-out), then keep the final formatted value in the DOM (so it reads correctly if animation is skipped). Respect reduced motion by showing the final number immediately.
- Pin the section for a short scroll distance (about 120% of viewport height) with ScrollTrigger. In the first half, the La Niña column is highlighted and haze is set to level 0.25 with wind 0.9 flowing north to south (setWind positive). In the second half, the El Niño column is highlighted and haze goes to 0.8 with wind 0.1. The haze stands for north India's air only (the .haze-key line in #flip says so); never describe it as all-India air, because the peninsula moved the opposite way. #flip has no data-haze, so flip.js is the only thing setting the haze while the section is in view. Dim the inactive column with opacity.
- On phones (width < 700) do not pin; stack the columns and trigger the same highlight as each enters view.

Wire it in main.js. Do not change haze.js or scroll.js except to expose what you need through their existing return values.
```

## Acceptance checklist

- [ ] Numbers count up once and end on the correct values with qualifiers visible.
- [ ] Haze thins for 2022-23 and thickens for 2023-24, and the .haze-key line says it shows north India's air.
- [ ] No pinning on phones; the content still reads in order.
- [ ] Figures all trace to `pm25.json` `meta.stated_figures`.

**Commit message:** `Add two-winters flip section with count-up figures`
