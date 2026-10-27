# 13 Accessibility and responsive audit

**Goal:** find and fix real problems before submission. This is a review-and-fix step, not a feature step.

**Files the assistant may edit:** any file in the project except `data/*.json`

## Prompt

```text
Audit the whole site for accessibility and responsiveness, then fix what you find. Work in this order and report findings before making changes:

1. Structure: exactly one h1; headings in order; landmarks (header or main, no duplicate main); the skip link works; every section has an accessible name.
2. Keyboard: tab through the entire page. Everything interactive is reachable and has a visible focus ring; no keyboard trap; tooltips, chart tabs, wind toggle, lid slider and quiz all work with the keyboard.
3. Screen reader text: charts and SVG visuals have role="img" with aria-labels or text alternatives; the city chart summary updates on toggle; decorative canvas has aria-hidden.
4. Contrast: check text and key UI against 4.5:1 (3:1 for large text and graphical objects). List any failures.
5. Motion: with prefers-reduced-motion, nothing moves; the page is still complete.
6. Phone: at 375 px and 320 px wide, no horizontal scroll, no overlapping text, tap targets at least 44px, charts readable.
7. Zoom: at 200% browser zoom the layout still works.

Give me a table: issue, where, severity (high/medium/low), fix. Then apply the high and medium fixes and re-test. Do not change any numbers or copy meaning.
```

## Acceptance checklist

- [ ] Findings table delivered and high and medium issues fixed.
- [ ] Browser accessibility checker (for example Lighthouse accessibility) scores 90 or above, or remaining issues are explained.
- [ ] Tested at 375 px, 320 px and 200% zoom.

**Commit message:** `Fix accessibility and responsive issues from audit`
