---
name: system1-rubric
description: "Build a rubric a System 1 model uses to classify input: a set of questions the model answers, formulated from general directions and categories, plus a top-level prompt with examples. Use when the user asks for a rubric, a classification rubric, questions for a classifier or fast reviewer, 'how should a small model judge this', or wants to turn directions and categories into something a fast model can run. Two modes: review (gather directions and categories from the user first) and autonomous (propose them and build the rubric). Make sure to use this skill whenever the user mentions rubrics, classification questions, or getting a small/fast model to judge or label something, even if they don't say 'rubric'."
---

# System 1 Rubric

Build a rubric that a small, fast model (System 1: Haiku-class, GPT-mini-class, Gemini Flash-class, small open models) runs to classify input. A rubric is two things:

1. **A set of questions** the model answers about the input. The answers ARE the classification.
2. **A top-level prompt with examples** — the instruction the model gets, plus 2–3 worked examples.

## The shape of a rubric

```markdown
# Rubric: <what it classifies>

## Top-level prompt
<the instruction given to the model: what it is classifying, what the input looks like, how to answer>

## Examples
<2–3 worked examples: input → answers → classification. Cover the boundaries, not just the easy cases.>

## Questions
1. <question> — Answer: <fixed format: yes/no | one label from {…} | 0–2 score | short quote>
   Evidence: <what counts as evidence — quote the input, don't paraphrase>
...

## Classification rule
<how the answers map to the final label, e.g. "label X if Q1 = yes and Q3 ≥ 1; else Y">
```

## Modes

Pick the mode from what the user said. If they named one, use it. If they didn't, use autonomous when the task, the input shape, and the label set are all already concrete in the conversation; otherwise use review.

### Review mode

Gather the directions and categories from the user before building anything.

- Pre-answer what you can from the conversation (the task, the input shape, the labels) with a confidence level; ask only below 70%, with your best guess attached as the recommended answer.
- Confirm the load-bearing fields explicitly even at high confidence: the label set, the input format, and what "correct" means — what the label is used for downstream, and how correctness gets judged (e.g. spot-checking a first batch against the user's own labels).
- Ask the questions in the reply as a short numbered list — one per load-bearing field plus the directions and categories — each with its confidence level and recommended answer attached.
- Then formulate the questions from the confirmed directions and categories and build the rubric.

### Autonomous mode

Propose the directions and categories yourself from the task, then formulate the questions and build the rubric in one pass. Present the finished rubric with the proposed categories visible, so the user can see what was assumed and correct it.

## Question design rules

- **One question per decision.** Each question decides one thing; the answer format is fixed (yes/no, one label from a closed set, a 0–2 score, or a short quote). Never an open-ended answer — a small model rambles, and rambles can't be classified.
- **Ask what the model can see.** Every question must be answerable from the input alone: "does the input contain X?" not "is this good?" No world knowledge, no inference chains.
- **Every question must discriminate.** If two labels would answer it the same way, drop it or rewrite it.
- **No double-barrelled questions.** Two decisions in one question is two questions — split it.
- **Order cheap and decisive first.** An early question may short-circuit the rest only when its answer alone settles the label. If the rubric has a tie-breaker question, answer every question that could conflict with it first — you can't know there's a conflict if you stop early.
- **Name the evidence.** Each question says what counts as evidence, and the model quotes the input rather than paraphrasing it. The answered questions are the audit trail — keep them.
- **Keep it to 5–10 questions.** More questions cost more per input and add noise faster than they add signal.

## Calibration

A rubric nobody checked is a guess. After building, run it on 5–10 real inputs and compare the model's answers against human labels.

- Where they disagree, rewrite the question, not the model: sharpen the evidence rule, split a double-barrelled question, or add a boundary example.
- Report the agreement (how many matched) before trusting the rubric. Calibration may be deferred at build time — but then record "calibration: not run" in the rubric file, and the rubric stays untrusted until it is run.
- If a question is wrong more often than right, it is the question that is broken.

## Grounding

When building, load the relevant skills from the `system1-reviewers-classifiers` skillbook (`skillbooks/system1-reviewers-classifiers.md` in this repo): C1 for structured outputs (`prompt-engineering-patterns`, the `structured-output` skills, `anthropic-api`) and C4 for evaluation and calibration (`write-judge-prompt`, `validate-evaluator`, `eval-design`, `eval-harness-first`). Reading the skillbook rows is enough for the build — fetch a named skill's full SKILL.md only when its row doesn't answer a specific design question. If the skillbook isn't available, apply the principles in this file directly.

## Output

Save the rubric as a Markdown file (in `rubrics/` unless the user directs otherwise), show it, and note the model class it was built for and the calibration result if one was run.
