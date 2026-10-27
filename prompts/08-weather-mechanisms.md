# 08 Weather mechanisms

**Goal:** make four invisible ideas visible: wind, rain versus pressure, the boundary-layer "lid", and where the air came from.

**Files the assistant may create or edit:** `js/weather.js`, `js/main.js`, `css/sections.css`, `index.html` (only the four `.weather-visual` placeholders)

## Prompt

```text
Build four small illustrative visuals inside the .weather-visual placeholders in #weather. Use inline SVG, drawn by js/weather.js, no image files. They are explanatory diagrams, not data, so do not label them with numbers.

1. Wind: a row of small "city" blocks with particle dots. A two-state toggle button "Strong wind" / "Weak wind". Strong: dots stream through and out of the frame. Weak: dots pile up and linger above the city. Animate with CSS or GSAP; honour reduced motion by showing a static end state for each toggle.
2. Rain and pressure: two panels side by side. Panel A "Rain": raindrops falling and dots disappearing. Panel B "High pressure": a downward arrow from a "high pressure" label pressing dots toward the ground even when drops fall. Caption: "In Jaipur, rain was more tied to cleaner air in 2022-23. In 2023-24, pressure mattered more, and pollution spiked after rain."
3. The lid: a vertical slider (an input type=range, keyboard operable, labelled) that lowers a horizontal "lid" line over a city silhouette; as the lid lowers, the dot cloud beneath is compressed into a thinner, denser band. Label: "Shallow boundary layer".
4. Where the air came from: a simple map-free diagram with two arrows ending at two labelled dots, "Jaipur" and "Hyderabad". Jaipur's arrow comes from the north (labelled "polluted northern air"), Hyderabad's from the south and sea ("cleaner marine and southern air"). Caption notes this helps explain why the two moved in opposite directions in El Niño.

Each visual has an accessible name (role="img" with aria-label, or a labelled control) and a one-sentence text description for screen readers. Use only tokens from tokens.css. Add [data-reveal] so each fades in on scroll.
```

## Acceptance checklist

- [ ] Each of the four visuals is understandable without reading the paragraph.
- [ ] The slider and toggle work with the keyboard.
- [ ] Captions match the facts in `00-context.md` and make no causal claims about ENSO.
- [ ] With reduced motion, visuals show static states.

**Commit message:** `Add four weather-mechanism visuals`
