# 12 Caveat and closing

**Goal:** a closing section that lands the message and keeps every claim honest. Do not skip this, even if time is short.

**Files the assistant may edit:** `index.html` (only `#meaning`), `css/sections.css`, `js/scroll.js` (only to add a haze level for this section if not already set)

## Prompt

```text
Polish the #meaning section.

1. Keep the h2 "Plan for the weather, not just the smokestacks" with the eyebrow "What this means". Rewrite the two paragraphs so they say: a clean winter does not prove a policy worked, and a dirty one does not prove it failed, because weather moves pollution around; low local emissions do not guarantee clean air when the wind stalls; strong winds can hide high emissions; so air-quality and farm planning should look at whole regions and at more than one year. Plain language, under 120 words total. Present this as the site's own takeaway (start with "Our takeaway:"), not as a claim the study makes.
2. Keep the boxed "What this study does not show" as a visually distinct panel with an icon and three bullets: it shows an association, not proof of cause; the two winters studied were unusual and the pattern should not be assumed to repeat; it does not say El Niño always worsens air in Delhi or north India.
3. Add a closing line linking back to the guiding question: "So how should pollution and farming policy adapt when weather, not just emissions, drives the outcome?" followed by a small "Source" block naming the Times of India report and the study "Air quality in flux: The baffling ENSO transition in India" (Atmospheric Pollution Research), without linking to any URL you are not sure of.
4. Make the haze calm and low (level 0.25) in this section so the page ends clear.

The planning takeaway in item 1 is intended; do not add any further recommendations or any new numbers.
```

## Acceptance checklist

- [ ] No sentence implies causation or that the pattern will repeat.
- [ ] The caveat panel is visually prominent, not buried.
- [ ] Source block names the report and study exactly.
- [ ] Haze clears at the end.

**Commit message:** `Polish closing section with caveat and sources`
