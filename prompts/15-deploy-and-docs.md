# 15 Deploy and documentation

**Goal:** a live link, a README that explains the approach, and screenshot evidence for the output deliverable.

**Files the assistant may edit:** `README.md`, `prompts/00-README.md` (log only)

## Prompt

```text
Write documentation for the website.

1. README.md at the project root with these sections: Project summary (two sentences); Live site (placeholder for the link); Problem and audience; Tech stack and why (vanilla JS, GSAP, Chart.js, GitHub Pages; browser only, no GPU, no server); Folder structure (a tree with one-line descriptions); Data and honesty (which numbers are stated in the article, which are approximate and how they are labelled); Design principles with a concrete example of each from this codebase (DRY, orthogonality, small iterations, documentation, progressive enhancement); Accessibility notes; How to run locally; Limitations and future work (real CPCB data, Hindi version, interactive map); Credits (the Times of India report and the study named in it).
2. Update the prompt log table in prompts/00-README.md from my notes below, leaving cells blank where I give no information.
3. List the screenshots I should capture, with file names for a screenshots/ folder: hero, flip, city chart in each winter (2), weather visuals, climate zones, quiz, closing, and the same hero and city chart on a 375 px phone.
4. Give me the exact steps and clicks to turn on GitHub Pages for the main branch root of this repo, and how to confirm the live URL works.

My notes for the log: <paste what you actually ran>
```

## Acceptance checklist

- [ ] The README claims only what the site actually does.
- [ ] GitHub Pages is on and the live URL loads, including data files and fonts.
- [ ] Screenshots captured and saved to `screenshots/`.
- [ ] Prompt log filled in and committed.

**Commit message:** `Add README, prompt log and deployment notes`
