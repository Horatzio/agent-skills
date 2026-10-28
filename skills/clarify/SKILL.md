---
name: clarify
description: Turn a vague idea, ambiguous statement, or unclear request into a confirmed goal brief and a plan. Use when the user invokes /clarify, says "clarify this" or "help me pin this down", or hands over an idea whose objective, audience, or deliverables are not clear enough to act on. Do not use when the request already has a concrete goal and deliverables (just do the work), or when the user wants options and variations generated (that is idea-refine).
---

# Clarify

A vague prompt is not a brief. Clarify converts one into a **goal brief** the user has confirmed, plus a **plan** for achieving it — by answering its own questions first, and only bothering the user with the ones it genuinely cannot answer.

## The core mechanic: answer first, ask below 70%

Work from the user's initial prompt and everything legitimately available (the conversation, files, prior work, the environment). For **every** question in the rubric below:

1. **Draft an answer yourself.** Facts are never asked — look them up (files, tools, sub-agents). Only judgements and preferences belong to the user.
2. **Attach a confidence level (0–100%)** to each drafted answer: how likely it is to be what the user actually means. Every field of the draft brief carries a number — load-bearing fields included; "assumed" without a figure is not a confidence level.
3. **Confidence ≥ 70%:** the answer goes into the draft brief as-is. The user sees it in the brief and can correct it there — do not spend a question on it.
4. **Confidence < 70%:** the question goes to the user, in a question round, **with your best guess attached as the recommended answer** — "yes" accepts it.

Calibrate honestly. A confidence figure you inflate to avoid asking is worse than asking: a wrong assumption baked into a brief costs more than one question.

## Process

1. **Restate the idea** in one crisp "How Might We…" sentence — what is actually being solved. If you cannot write that sentence, that is your first sub-70% question.
2. **Draft the brief.** Fill every field of the brief template (below) by working the rubric: draft answers + confidence for each question.
3. **Ask the sub-70% questions in rounds.** Batch each round's questions together, numbered, each with its recommended answer. Respect the frontier: a question whose answer depends on another question still open belongs to a later round. One round is often enough; never drip questions one per message.
4. **Present the full draft brief** — including the ≥70% answers — for confirmation or correction. Load-bearing fields (**goal, deliverables, verification**) must be explicitly confirmed even at high confidence; nothing in them may rest on an unconfirmed guess.
5. **Save the confirmed brief** as a file (default `docs/briefs/<idea-slug>.md`, or the project's existing home for such docs). The brief is the artifact later work — and the grill skill — operates on.
6. **Write the plan.** Steps in order, each step mapped to the deliverable it produces, the final step being the brief's verification method. Present the plan for confirmation. Clarify ends there: do not start executing the plan under this skill.

**Stop rule:** every rubric question is answered at ≥70% *and* user-confirmed (directly, or via brief confirmation), and the brief is confirmed as a whole. If the user says "enough" earlier, mark unconfirmed fields as assumptions in the brief and stop.

## The rubric

Work every category. The example questions are starting points — adapt the wording to the idea, and add a category-specific question when the idea demands one.

### 1. Outcome & why
- What changes when this is done?
- Why now — what makes this the moment?
- What happens if we don't do it?

### 2. Audience & judge
- Who is this for, specifically? (A named person or group beats a demographic.)
- Who else will use, see, or be affected by it?
- Whose approval makes it "done"?

### 3. Deliverables & format
- Name the exact artifacts that will exist at the end.
- What format, length, and structure for each?
- Point at an example of the kind of thing meant — an existing artifact, a link, a prior piece of work. (An example anchors more than any description.)

### 4. Scope & non-goals
- What is explicitly out?
- What is the smallest version that still counts as success?
- What good ideas are we deliberately not doing, and why?

### 5. Constraints
- Deadline, or date it must be true by?
- Budget or effort ceiling?
- Tools, platforms, access, or approaches that must be used — or must be avoided?

### 6. Success & verification
- How will you know it's right / good?
- What would make you reject the result?
- Can it be checked mechanically, or is it judgement? If judgement — whose?

### 7. Context & prior art
- What has been tried before, and what happened?
- What already exists that this builds on or replaces?
- What do you know about this that I cannot look up?

## Brief template

```markdown
# Goal Brief: <name>

**Goal:** <one sentence — the outcome, not the activity>
**Why now:** <the trigger or stakes>

## Audience & judge
<who it's for; who accepts it>

## Deliverables
- <artifact — format>

## Scope
**In:** <…>  **Out:** <…>  **Smallest success:** <…>

## Constraints
<deadline, budget, must-use / must-avoid>

## Verification
<how the result gets checked, and by whom/what>

## Assumptions & open risks
- <anything unconfirmed or bet-on, marked as such>
```

## Boundaries and anti-patterns

- **Converge, don't diverge.** Never generate variations or alternatives — if the user wants options, hand off to idea-refine and clarify the chosen direction afterwards.
- **Never ask a fact.** If it can be read, searched, or inspected, it is your job, not a question.
- **Don't interrogate.** If the prompt already answers a rubric question at ≥70%, drafting silently is the whole job — a clarify run on a nearly-clear prompt may need zero questions, just a brief to confirm.
- **No plan before a confirmed brief.** A plan built on unconfirmed load-bearing fields is fiction.
- **Confidence is a gate, not decoration.** If you cannot defend the number, it is below 70% — ask.
