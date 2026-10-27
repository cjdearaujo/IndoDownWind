# 01 Project setup

**Goal:** a clean skeleton that loads in a browser, with every library wired and six empty sections.

**Files the assistant may create:** `index.html`, `css/`, `js/`, `data/`, `.gitignore`

## Prompt

```text
Create the skeleton for the website described in the context.

1. Folder structure at the project root (the current folder): index.html, css/ (empty for now), js/ (empty for now), data/ (empty for now).
2. index.html: HTML5 doctype, lang="en", viewport meta, a descriptive <title> and meta description, and a skip-to-content link.
3. Load from CDN with defer: GSAP, GSAP ScrollTrigger, Chart.js. Load Google Fonts for one display serif (Fraunces) and one sans (Inter) with display=swap.
4. Link css/tokens.css, css/base.css, css/sections.css (create them empty with a one-line comment each).
5. Add <main id="content"> containing six <section> elements with ids: hero, flip, cities, weather, zones, meaning. Each has a visually-hidden <h2> placeholder for now.
6. At the bottom, load js/main.js as a module (create it with a single console.log).
7. Add a short README.md at the project root with the project name and how to open it locally (open index.html, or run: python -m http.server).

Do not add any styling, content or logic yet.
```

## Acceptance checklist

- [ ] Opening `index.html` shows no console errors.
- [ ] Network tab shows GSAP, ScrollTrigger, Chart.js and both fonts loading.
- [ ] Six sections exist with the specified ids.
- [ ] Skip link works with the keyboard.

**Commit message:** `Add website skeleton with CDN libraries and six sections`
