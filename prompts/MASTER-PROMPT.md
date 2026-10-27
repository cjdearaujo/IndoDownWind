# Master prompt (paste into your coding agent to build the whole site)

Use this when you want the agent to run the whole build with minimal back-and-forth. To work step by step instead, paste `00-context.md` and then one step file at a time.

```text
Read AGENTS.md and prompts/00-context.md in this folder. They contain the project, the stack, the honesty rules and the working method. This folder is self-contained.

Build the whole website by following prompts/00-README.md step by step.

0. If this folder is not a git repository, run `git init -b main` and commit the current files as "Initial scaffold". Every step below commits.

1. First verify steps 01 to 04 against their acceptance checklists (they are already scaffolded). Fix anything that fails. Run a local server and confirm the page loads and the data loads with no console errors.
2. Then execute steps 05 to 15 in order. For every step: do only what that step's prompt says, touch only the files it names, check its acceptance checklist, commit with the commit message given in the step, and add a row to the prompt log in prompts/00-README.md.
3. Stop and show me the page after step 07 (the city chart works) and after step 12 (the full story is complete). Wait for my feedback at those two points, then continue.
4. Never invent numbers; use only data/. Label approximate values as approximate. Never claim causation. Never change data/*.json numbers without asking.
5. If you are unsure about something, make the smallest safe choice, note it in the log, and keep going.

When finished, give me: the list of steps completed, anything skipped and why, the files changed, and anything you were unsure about.
```
