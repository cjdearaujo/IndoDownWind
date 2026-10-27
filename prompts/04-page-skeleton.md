# 04 Page skeleton

**Goal:** all six sections written as real, readable, semantic content with plain-language copy. No animation yet. It must make sense with CSS animation and JavaScript switched off.

**Files the assistant may edit:** `index.html`, `css/sections.css`

## Prompt

```text
Fill in the six sections of index.html with real content and layout. No JavaScript behaviour and no animation yet.

Use semantic HTML. Each section has an <h2>, an .eyebrow label, short paragraphs, and an empty placeholder element for its visual (listed below). Copy must be plain language; avoid jargon, and wrap each of these terms in <span class="term" data-term="..."> so tooltips can attach later: ENSO, La Niña, El Niño, PM2.5, boundary layer, stagnation, back-trajectory, hot semi-arid zone.

1. #hero: eyebrow "India · Winter air". h1: "Same emissions. Different air." Sub-line: "In two back-to-back winters, pollution moved from one half of India to the other. Emissions stayed broadly similar. The weather changed." A "Scroll" cue. Placeholder: <canvas id="haze" aria-hidden="true">.
2. #flip: h2 "Two winters, opposite outcomes". Under the h2, one line: "The two winters sat on opposite sides of a natural Pacific Ocean swing called ENSO." Two columns: "2022-23 · La Niña" (north India cleaner, down by up to 30%; Mumbai up 45%) and "2023-24 · El Niño" (Jaipur up about 50%, Delhi up over 10%; the peninsula cleaner). Line below: "Emissions and pollution-control policy did not change much over this period. The study finds an association with these weather patterns, not proof of cause." Under the line, a dim .haze-key line: "The haze behind this page follows north India's winter air: thinner in 2022-23, thicker in 2023-24. The peninsula moved the opposite way." Placeholder: .flip-figures.
3. #cities: h2 "City by city". Intro sentence, a pair of buttons (role="tablist") "Winter 2022-23" and "Winter 2023-24", a <figure> with <canvas id="city-chart"> and a <figcaption> noting "Percent change in PM2.5 vs the 2019-22 winter average. Approximate where marked." Also a <p id="city-chart-summary"> for a plain-text summary.
4. #weather: h2 "Why the weather decides". Four short blocks: Wind (strong winds disperse pollution; weak winds let it pile up), Rain and pressure (rain can wash pollution out, but high pressure can trap it, and in Jaipur, rain was tied to cleaner air in 2022-23 while in 2023-24 pressure mattered more and pollution spiked after rain), A shallow lid (a shallow boundary layer traps pollution near the ground), Where the air came from (Jaipur kept getting polluted northern air; Hyderabad got cleaner marine and southern air). Placeholder for each: .weather-visual. Under the four blocks, a dim note: "These are the mechanisms the study's authors describe. The study shows association, not proof of cause."
5. #zones: h2 "The map is shifting". Text: over 70 years the hot, dry zone in northwest India grew from about a quarter of the region to a third and pushed east into Uttar Pradesh, one of India's key farming regions, so the timing of sowing and harvesting needs watching. In the peninsula the dry zone shrank from about 30% to 16%, with rising rainfall in the south (attributed to the authors, not stated as fact). Placeholder: .zone-bars.
6. #meaning: h2 "What this means". Two short paragraphs: low local emissions do not guarantee clean air in a stagnant winter, and strong winds can hide high emissions; so plans need to look beyond a single city and a single year. A boxed "What this study does not show": it shows association, not proof of cause; the two winters were unusual; it does not say El Niño always worsens Delhi's air. Placeholder: #quiz-root.

7. Header and footer (already in the scaffold; keep them): a <header> holding the "IndoDownWind" wordmark link, absolutely positioned at the top over the hero, and a <footer> after <main> with the wordmark and one line naming the source and that approximate values are marked.

css/sections.css: mobile-first layouts. Hero is 100svh with centred text. The haze canvas is fixed and full-viewport behind all content (it already sits in index.html outside main). The flip section is two columns on desktop, stacked on phones. Generous vertical padding. Use only tokens from tokens.css.
```

## Acceptance checklist

- [ ] With JavaScript disabled the whole story reads correctly.
- [ ] Every number matches the key facts in `00-context.md`.
- [ ] Each jargon term is wrapped in `.term` with a `data-term`.
- [ ] The layout holds at 375 px width with no horizontal scroll.

**Commit message:** `Write page content and base layouts for all six sections`
