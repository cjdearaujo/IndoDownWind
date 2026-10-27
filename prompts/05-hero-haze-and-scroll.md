# 05 Hero haze and scroll engine

**Goal:** the signature visual: a canvas of drifting particles ("haze") whose density and colour follow the story as you scroll, plus a shared scroll-reveal system.

**Files the assistant may create or edit:** `js/haze.js`, `js/scroll.js`, `js/main.js`, `css/sections.css`, `index.html` (only to add `data-reveal` attributes)

## Prompt

```text
Build two independent modules and wire them in main.js.

1. js/haze.js: export createHaze(canvas) returning { setLevel(n), setWind(x), destroy() }.
   - Full-viewport particle field drawn with requestAnimationFrame. Particles are soft circles with low alpha.
   - setLevel(n), n from 0 to 1, controls particle count/opacity (0 = nearly clear air, 1 = thick haze) and colour, interpolating from --clean through --haze-mid to --haze-heavy (read the CSS variables with getComputedStyle; do not hard-code colours).
   - setWind(x), x from -1 to 1, sets horizontal drift speed and direction. Strong wind stretches particles slightly into streaks and moves them faster.
   - Cap particles at 220 on desktop and 80 when window.innerWidth < 700. Pause the loop when the tab is hidden (the canvas is fixed, so it is never off screen).
   - If prefers-reduced-motion is set, draw one static frame and do not animate.
   - Handle resize and devicePixelRatio (cap at 2).

2. js/scroll.js: export initScroll({ haze }).
   - Register ScrollTrigger. Add a generic reveal: any element with [data-reveal] fades and rises 24px into view once.
   - Link haze to sections using data attributes on the section elements: data-haze="0.2" data-wind="0.8". On entering a section, tween haze level and wind to those values over 1.2s. Use these values: hero 0.5 / 0.1, flip: none (#flip deliberately has no data-haze; step 06 drives the haze there, so scroll.js must skip any section without data-haze), cities 0.5 / 0.0, weather 0.6 / 0.0, zones 0.2 / 0.3, meaning 0.25 / 0.0.
   - If GSAP failed to load (typeof gsap === "undefined"), skip silently and leave the page static.
   - If prefers-reduced-motion, skip all tweens.

3. main.js: await DOMContentLoaded, create the haze on #haze, call initScroll, add data-reveal to the right elements in index.html, and check that every section except #flip has data-haze / data-wind (they are already in index.html).

Keep each module free of references to the other: they communicate only through main.js.
```

## Acceptance checklist

- [ ] The hero shows drifting haze; no console errors.
- [ ] Scrolling changes haze density and colour smoothly.
- [ ] Phone width uses far fewer particles; frame rate stays smooth.
- [ ] With reduced motion enabled in the OS or dev tools, nothing animates.
- [ ] Blocking the GSAP script leaves a readable static page.

**Commit message:** `Add haze canvas and scroll engine`
