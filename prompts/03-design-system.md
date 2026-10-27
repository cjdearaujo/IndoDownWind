# 03 Design system

**Goal:** the visual identity, defined once as CSS variables and a small set of base styles.

**Files the assistant may edit:** `css/tokens.css`, `css/base.css`

## Prompt

```text
Write the design system. No section-specific layout yet.

css/tokens.css (on :root):
- Colours: --night (#070d1a), --night-2 (#0e1a33), --ink (#eaf0fa), --ink-dim (#9fb0cc), --clean (cool teal, around #35d0c0), --haze-mid (amber, around #f0a84a), --haze-heavy (red-orange, around #e5553b), --accent-line (rgba white 0.12).
- Type: --font-display ('Fraunces', serif), --font-body ('Inter', system-ui, sans-serif). A fluid scale with clamp(): --step--1 to --step-5, where body is at least 1.125rem and the hero headline reaches about 5rem on desktop.
- Spacing scale --space-1 to --space-8, radii, and --ease-out cubic-bezier(.2,.7,.2,1).
- A prefers-color-scheme is NOT needed; the story is always dark.

css/base.css:
- Reset, box-sizing, smooth scroll disabled when prefers-reduced-motion is set.
- Body: background var(--night), colour var(--ink), body font, line-height 1.6.
- Headings in display font with tight line-height; max-width 62ch for paragraphs.
- Links, focus-visible ring (2px, teal, offset 3px) on all interactive elements.
- .visually-hidden utility, .skip-link that appears on focus.
- .container with padding-inline 16px on phones, centred max-width 1100px.
- A .eyebrow utility: small uppercase tracked label.
- @media (prefers-reduced-motion: reduce) turns off all transitions and animations globally.

Check that --ink on --night and --ink-dim on --night both meet 4.5:1 contrast and report the ratios.
```

## Acceptance checklist

- [ ] Colours exist only in `tokens.css` (search the CSS for stray hex codes).
- [ ] Contrast ratios reported and both are at least 4.5:1.
- [ ] Tabbing through the page shows a visible focus ring.

**Commit message:** `Add design tokens and base styles`
