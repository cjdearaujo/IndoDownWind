# 09 Climate zones

**Goal:** show the shifting hot semi-arid zone clearly and tie it to farming without claiming more than the article says.

**Files the assistant may create or edit:** `js/zones.js`, `js/main.js`, `css/sections.css`

## Prompt

```text
Build the climate-zone visual in js/zones.js: export initZones({ data }), rendering into .zone-bars from data/climate_zones.json.

- Two blocks, "Northwest India" and "Peninsular India".
- Northwest: a pair of horizontal stacked-style bars for 1951-60 and 1991-2020 showing the hot semi-arid share (about a quarter, then a third). Animate the bar width from 0 when it enters view. Add a small "about" marker. Beneath, a text note: "An area equal to roughly 7% of the region moved into the drier zone." Also show the temperate zone as text only ("from about a quarter to less than a fifth"), using the qualifier string, because the article gives no exact value for the later period.
- Peninsula: a pair of bars for before and after (about 30% to 16%), with the note "Most of that land moved into the tropical savannah zone, which now covers about three-quarters of the peninsula, a change the authors attribute to rising rainfall over southern India."
- A short list "Places that moved" from the notes: Uttar Pradesh (the dry zone pushed east into it), Marathwada and west Vidarbha (into the hot semi-arid zone), the Konkan coast, coastal Karnataka and Kerala (the tropical monsoon zone extended).
- A "Why farmers care" callout: Uttar Pradesh is one of India's key farming regions, and the timing of sowing and harvesting needs to be watched closely. Do NOT state or imply any change in crop yields, specific crops, or specific dates; the article does not say this. Add a small line "The article does not report effects on yields."
- Percent labels carry their qualifiers ("about", "less than"). Each bar has an aria-label with the same text. Reduced motion shows final widths immediately.

Do not hard-code numbers in JS.
```

## Acceptance checklist

- [ ] Bars show about a quarter to a third (northwest) and about 30% to 16% (peninsula).
- [ ] Qualifiers are visible; no invented numbers for the temperate zone.
- [ ] No claim about crop yields or sowing dates anywhere.
- [ ] Readable at 375 px.

**Commit message:** `Add climate-zone shift visual with farming note`
