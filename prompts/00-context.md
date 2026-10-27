# Context preamble (paste at the start of every session)

```text
You are helping me build a one-page, scroll-driven explainer website for the general public.

TOPIC
Why India's winter PM2.5 can flip between regions from one year to the next with no change in emissions, and how shifting climate zones affect farming. Source: a study in Atmospheric Pollution Research reported in the Times of India ("Study traces how an El Niño changed the pollution map"), plus a related IMD/IITM climate-zone study.

KEY FACTS (use only these; never invent numbers)
- Winter 2022-23 was La Niña: north India was cleaner (PM2.5 down by up to 30% vs the 2019-22 average); Mumbai rose 45%.
- Winter 2023-24 was El Niño: the pattern reversed. Jaipur rose about 50%, Delhi over 10%; peninsular India got cleaner.
- Emissions and pollution-control policy did not change much in this period.
- La Niña: stronger winds dispersed north-Indian emissions and carried pollutants south. El Niño: weaker winds, stagnation, pollution accumulated.
- The study's authors say the findings are correlational, cannot be extrapolated to other years, and that the two years were unusual.
- The hot semi-arid zone in northwest India grew from about a quarter of the region (1951-60) to a third (1991-2020), pushing east into Uttar Pradesh.

AUDIENCE AND STYLE
General public. Plain language, no assumed science. Visually striking, editorial, atmospheric. Phone-first.

TECH RULES
- Plain HTML, CSS and vanilla JavaScript. No frameworks, no build step.
- External libraries only from CDN: GSAP + ScrollTrigger, Chart.js.
- Pragmatic Programmer principles: DRY (facts and colours defined once), orthogonality (separate files for data, style, and each JS behaviour), small iterations, clear documentation. Comments only where the reason is not obvious.
- Accessible by default: semantic HTML, contrast 4.5:1 minimum, keyboard operable, respects prefers-reduced-motion.
- The page must still be readable with JavaScript disabled.

HONESTY RULES
- Values that are not stated in the article text must be labelled "approximate" in the UI.
- Never say El Niño causes pollution, or that the pattern will repeat.

WORKING RULES
- Only change the files I list in each task.
- Do not add features I did not ask for.
- When finished, list the files you changed and anything you were unsure about.
```
