# 02 Data model

**Goal:** every number, term and quiz question lives in JSON with a source label. Nothing numeric is hard-coded in HTML or JS later.

**Files the assistant may create:** `data/pm25.json`, `data/climate_zones.json`, `data/glossary.json`, `data/quiz.json`, `js/data.js`

**Already scaffolded:** `data/*.json` and `js/data.js` exist. Verify them against the checklist below, and fix gaps instead of recreating. Approximate city values were measured from the printed chart and are already filled in. If you need to re-check them, read the next paragraph.

**Re-checking the values (optional):** open the article's printed chart ("A year apart and poles apart") and read each city's bar for both winters. Write the values down. If you cannot read a value, leave it as `null`.

## Prompt

```text
Create the data layer. Do not write any UI.

1. data/pm25.json: an object { "meta": {...}, "records": [...] }; each record has fields
   { "city": string, "region": "north" | "peninsula", "winter": "2022-23" | "2023-24", "pct": number | null, "source": "stated" | "approximate" | "missing", "qualifier": string | null }
   Cities, north: Noida, Rohtak, Greater Noida, Bahadurgarh, Delhi, Jaipur, Ballabgarh. Peninsula: Hyderabad, Vapi, Mumbai, Pune, Chennai, Thiruvananthapuram.
   Fill ONLY these as source "stated":
   - Mumbai, 2022-23: 45
   - Jaipur, 2023-24: 50, qualifier "about"
   - Delhi, 2023-24: 10, qualifier "over"
   Every other record has source "approximate" and the pct value already measured from the printed chart (see the scaffolded data/pm25.json; keep those values unless told otherwise). Use source "missing" with pct null only where a value truly cannot be read.
   Also add a top-level "meta" object, including "stated_figures" (structured list of the four article-stated figures: North India 2022-23 -30 "up to", Mumbai 2022-23 45, Jaipur 2023-24 50 "about", Delhi 2023-24 10 "over"): baseline "2019-22 average", phases { "2022-23": "La Niña", "2023-24": "El Niño" }, and a note: "Percent change in PM2.5 vs the 2019-22 winter average. Values marked approximate are read from the article's chart."
2. data/climate_zones.json with these exact facts, each with a qualifier field where the article says "about" or "less than":
   northwest: hot_semi_arid { "1951-60": 25, "1991-2020": 33 } (percent of region area, about a quarter to a third), temperate { "1951-60": 25, "1991-2020": null } with qualifier "from about a quarter to less than a fifth" (the 1991-2020 value is not a number in the article, so keep it null and show the qualifier text instead), area_moved_to_drier_zone 7 (about, percent of region).
   peninsula: hot_semi_arid { "before": 30, "after": 16 }, tropical_savannah_share_now 75 (three-quarters, about).
   Also notes: the hot semi-arid zone pushed east into Uttar Pradesh; Marathwada and west Vidarbha moved into the hot semi-arid zone; the tropical monsoon zone extended along the Konkan coast, coastal Karnataka and Kerala. Include the source label "Times of India report on IMD/IITM study".
3. data/glossary.json: array of { "term", "plain" } for ENSO, La Niña, El Niño, PM2.5, boundary layer, stagnation, back-trajectory, hot semi-arid zone. "plain" is one sentence a 14-year-old understands.
4. data/quiz.json: 5 multiple-choice questions, each { "q", "options": [4 strings], "answer": index, "explain": string }, grounded ONLY in the key facts from the context. Cover: what changed between the two winters, Jaipur rain versus pressure, why Delhi can stay polluted even with low local emissions, the climate-zone shift, and what the study does NOT show. Vary which option is correct.
5. js/data.js: export async function loadAll() that fetches the four files in parallel and returns one object; throw a clear error if any fetch fails.

Do not add any numbers beyond those listed.
```

## Acceptance checklist

- [ ] All four JSON files validate (paste into any JSON validator).
- [ ] Only three `pm25` records are `stated`; every other record is `approximate` with a value.
- [ ] `loadAll()` returns all four datasets with no errors (check in the console).
- [ ] The approximate values in `data/pm25.json` are labelled `approximate` and match the scaffold.

**Commit message:** `Add data layer with source-labelled values`
