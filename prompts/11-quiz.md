# 11 Quiz

**Goal:** a short, forgiving five-question check that reinforces the main ideas. First feature to cut if time is short.

**Files the assistant may create or edit:** `js/quiz.js`, `js/main.js`, `css/sections.css`

## Prompt

```text
Build js/quiz.js: export initQuiz({ quiz }), rendering into #quiz-root from data/quiz.json.

- Show one question at a time with a progress label ("Question 1 of 5").
- Options are real radio inputs in a fieldset with the question as the legend, so they work with keyboard and screen readers. A "Check" button becomes enabled once an option is selected.
- After checking: mark correct/incorrect with text and an icon (not colour alone), show the "explain" text, and show a "Next" button (or "See result" on the last question). Focus moves to the explanation (aria-live="polite").
- Final screen: score out of 5, a one-line kind message (no mocking tone), and a "Try again" button that resets.
- No external libraries. State lives in a small object in the module; no globals.
- Style with tokens only; large tap targets (minimum 44px).
```

## Acceptance checklist

- [ ] Whole quiz can be completed using only the keyboard.
- [ ] Right and wrong answers are distinguishable without colour.
- [ ] Explanations match facts in `00-context.md`.
- [ ] "Try again" resets cleanly.

**Commit message:** `Add five-question quiz`
