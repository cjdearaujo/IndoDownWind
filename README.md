# Website track: weather, pollution and shifting climate zones

A scroll-driven explainer for the general public, built with a coding agent. This folder is self-contained.

## What is here

| Path | Purpose |
| --- | --- |
| `AGENTS.md`, `CLAUDE.md`, `.github/copilot-instructions.md` | Instructions for the coding agent (project, stack, honesty rules, method) |
| `prompts/` | Numbered build prompts (01 to 15), a context preamble, a prompt log, and `MASTER-PROMPT.md` |
| `index.html`, `css/`, `js/` | The scaffold: six sections with real copy, design tokens, base styles, data loader |
| `data/` | All facts: `pm25.json` (city values), `climate_zones.json`, `glossary.json`, `quiz.json`, `evidence.json` |

## How to use it

1. Open this folder in your coding agent (Copilot, Claude Code, Cursor or similar).
2. Paste `prompts/MASTER-PROMPT.md`, or work through the numbered prompts yourself.
3. Run locally: `python -m http.server`, then open http://localhost:8000.
4. Deploy: push to GitHub and enable Pages for the main branch (step 15 has the clicks).

## Data honesty

Only three city values are stated in the article text (Mumbai +45% in 2022-23, Jaipur about +50% and Delhi over +10% in 2023-24). All other city values were measured from the printed chart, rounded to the nearest 5 points, and are labelled approximate. See `data/pm25.json`.

## Status

Scaffold complete and tested for loading. The interactive build (steps 05 to 15) is for the coding agent. Fill in the prompt log and the final README when done.
