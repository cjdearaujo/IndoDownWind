# 10 Glossary tooltips

**Goal:** plain-language definitions on demand, accessible to keyboard, touch and screen-reader users.

**Files the assistant may create or edit:** `js/tooltips.js`, `js/main.js`, `css/sections.css`

## Prompt

```text
Build js/tooltips.js: export initTooltips({ glossary }).

- For every .term element with data-term, look up the matching entry in glossary.json (match case-insensitively; log a console warning for any term with no entry).
- Make each term focusable (tabindex="0", role="button", aria-describedby pointing to a single shared tooltip element) with a subtle dotted underline.
- One shared tooltip <div role="tooltip"> appended to body. It appears on hover, on keyboard focus, and on tap (toggle). Escape closes it. Tapping elsewhere closes it.
- Position near the term and keep it inside the viewport (flip above or below, clamp horizontally). Max width 280px, readable size, tokens only.
- No tooltip should cover the term it describes.
- When a term appears more than once, only underline the first occurrence in each section to avoid clutter.
- Works without GSAP.

Do not edit glossary.json.
```

## Acceptance checklist

- [ ] Hover, focus and tap all show the right definition.
- [ ] Escape closes it; screen reader announces the description.
- [ ] No console warnings about missing terms.
- [ ] Tooltips stay within the screen on a 375 px phone.

**Commit message:** `Add accessible glossary tooltips`
