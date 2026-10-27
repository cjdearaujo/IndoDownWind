# 07 City chart

**Goal:** the centrepiece. A toggle chart of city-wise PM2.5 change for each winter, split into north and peninsula, honest about what is stated and what is approximate.

**Files the assistant may create or edit:** `js/charts.js`, `js/main.js`, `css/sections.css`

**Before you prompt:** `data/pm25.json` already holds all 26 city records (3 stated in the article text, 23 approximate values measured from the printed chart). Do not change them without approval.

## Prompt

```text
Build the city chart in js/charts.js: export initCityChart({ data }).

- Chart.js horizontal bar chart on #city-chart showing pct for the selected winter. Cities on the y axis, grouped north first then peninsula with a visible divider label for each group. Zero line clearly drawn; negative bars extend left in the "clean" colour, positive bars extend right in the haze colours (amber to red by magnitude). Read colours from the CSS variables.
- Two buttons (the tablist in #cities) switch between "2022-23" and "2023-24". Switching animates the bars (400 ms) instead of re-creating the chart (use chart.update()). Keep the y-axis order identical in both winters so the flip is easy to see.
- Record styling by source:
  - "stated": solid fill with a small label showing the value and qualifier (for example "about +50%").
  - "approximate": same colour but with a diagonal-stripe pattern fill (create a canvas pattern) and a tooltip prefix "approx.".
  - "missing" or null: no bar; a faint "no data" label.
  - "approximate" with pct 0: draw a hairline and label it "about 0 (too small to read)" instead of "0%".
- A legend row under the chart explains solid versus striped. Under the chart, keep the figcaption note visible.
- Write the plain-text summary into #city-chart-summary for each winter, generated from the data (which cities rose most and fell most, with their values and whether approximate). This is the accessible alternative to the chart. Set the canvas aria-label to a one-line summary and update it on toggle.
- Tabs are keyboard operable (arrow keys switch, aria-selected updated).
- Responsive: on phones, make the chart taller (about 60vh) and shrink label fonts; do not allow horizontal scroll.
- Do not hard-code any city values in JS.

Wire into main.js after the data loads.
```

## Acceptance checklist

- [ ] Toggling shows the clear flip: north bars negative then positive, peninsula the reverse.
- [ ] Stated bars solid, approximate bars striped, missing bars absent.
- [ ] The text summary updates and matches what the chart shows.
- [ ] Works with keyboard only and at 375 px width.

**Commit message:** `Add city-wise PM2.5 toggle chart with source styling`
