# 14 Performance and fallbacks

**Goal:** a fast, resilient page that degrades gracefully if a library fails or the device is slow.

**Files the assistant may edit:** `index.html`, `js/main.js`, `js/haze.js`, `js/charts.js`, `css/sections.css`

## Prompt

```text
Make the site resilient and fast.

1. Failure handling: if Chart.js fails to load, replace the chart canvas with the generated plain-text summary and a message "The chart could not load; here is the data as text." If GSAP fails, everything stays visible and static (no hidden [data-reveal] content stuck at opacity 0: reveal styles must only apply when JS and GSAP are confirmed running, for example by adding a "js-anim" class to <html> at that moment). If a JSON fetch fails, show a short visible error message in the affected section.
2. Performance: preconnect to the font and CDN origins; add font-display swap; defer scripts; avoid layout shift by reserving the chart and canvas heights in CSS; throttle resize handlers; make the haze lighter automatically if the frame time stays above 24 ms for 2 seconds (reduce particle count by half).
3. Print a short report: total transferred size, number of requests, and the largest asset. Suggest any quick wins but do not add new libraries.
4. Add a <noscript> notice that explains the interactive parts need JavaScript but the text is complete without it.

Do not change any content or numbers.
```

## Acceptance checklist

- [ ] Blocking the Chart.js URL in dev tools shows the text fallback.
- [ ] Blocking GSAP leaves all content visible.
- [ ] No content jumps while loading.
- [ ] Haze lightens on a throttled CPU.

**Commit message:** `Add fallbacks and performance safeguards`
