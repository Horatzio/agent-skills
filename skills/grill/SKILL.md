---
name: grill
description: Interrogate a goal or a plan across nine axes to find what is ambiguous, implicit, missing, or too thin — then hand back a stronger artifact. Use when the user invokes /grill, asks to "grill", "stress-test", or "poke holes in" a goal brief, plan, proposal, or design, or hands over a plan and asks what is wrong with it. Grill works on an existing artifact (for example a clarify goal brief); if there is no concrete artifact yet, use clarify first.
---

# Grill

Grilling a person produces answers. Grilling an **artifact** produces a better artifact. Grill takes a goal or plan as text, hunts for everything in it that is ambiguous, implicit, missing, or under-detailed, and returns the artifact revised — with every gap either resolved or converted into a named assumption.

## Inputs and outputs

- **Input:** an artifact — a goal brief, a plan, a proposal. In a file or pasted in chat. If the user hands over a vague idea with no concrete claims to interrogate, stop and route to clarify: there is nothing to grill yet.
- **Output:** the same artifact, revised in place, with a **Grill findings** section appended (see below). Never a separate findings file — one artifact, no drift.

## Finding classes

Classify every finding as exactly one of:

- **Ambiguous** — the text supports two or more readings, and they lead to different work.
- **Implicit** — something is assumed but never stated; a reader (or a future agent) would have to guess it.
- **Missing** — a necessary element is absent entirely.
- **Thin** — stated, but not actionable: no owner, no number, no date, no criterion.

## The nine axes

Sweep every axis against the artifact's actual text. For each finding, **quote the line under fire** — a finding without a quote is an opinion. The sample questions are starting points; the real questions come from what the artifact says and fails to say.

1. **Outcome** — Is the end-state observable? *"Done looks like what, measured how? Which sentence here is the goal, and which is background?"*
2. **Definitions** — Words doing double duty. *"'Soon', 'proper', 'enough', 'done' — define each, or replace it with a number/date/criterion."*
3. **Scope edges** — *"What adjacent thing will this be mistaken to include? Where exactly does it stop? What happens at the boundary?"*
4. **Deliverables & acceptance** — *"Per deliverable: what format, and who accepts it against what checklist?"*
5. **Assumptions & dependencies** — *"What must be true that isn't written? What is this relying on — people, systems, access, timing — that it doesn't control?"*
6. **Sequence & causality** — *"Why this order? What breaks if step 3 lands before step 2? What can run in parallel that the plan serialises, or vice versa?"*
7. **Failure modes & edge cases** — *"Step N fails, returns empty, or runs late — then what? What's the worst realistic input or day this meets?"*
8. **Resources & access** — *"Does it fit its time/budget with slack, or only if everything goes right? Which step needs a permission, asset, or person nobody has lined up?"*
9. **Verification & reversibility** — *"How is each step checked before the next one builds on it? Which step can't be undone — and is it gated on a confirmation?"*

## Proportionality

Scale the grilling to the stakes: the cost of the artifact failing × how irreversible its steps are.

- **High stakes** (expensive, public, hard to undo): sweep hard, question freely, use the fresh-context pass.
- **Low stakes** (small, cheap, fully reversible): expect few findings. Absorb minor findings into defaults instead of escalating them to questions — a trivial artifact should draw at most one question, and zero is a good outcome. If you are producing a long findings list for a four-step reversible plan, you are inflating, not grilling.
- **Respect established workflows.** If the artifact follows a known workflow (a branch that will be PR'd, a draft that will be reviewed), its normal endpoint is not a gap. Flag a step only when the artifact's *own* stated goal contradicts where it stops.

## Process

1. **Extract.** Read the artifact closely. List its load-bearing claims — the statements the whole thing stands on.
2. **Sweep the axes.** Generate findings per axis, each with: axis, class, the quoted text, the question it raises.
3. **Resolve before asking.** Facts are looked up, never asked. For each finding, draft a recommended fix and a confidence level. **≥70% confidence and not load-bearing:** propose the fix as the default in your report. **<70%, or the finding touches the goal, the deliverables, or an irreversible step:** it becomes a question to the user.
4. **Ask in batched rounds.** Group the open questions into rounds by frontier — a question that depends on another open question waits for the next round. Number every question; attach the recommended fix; "yes" accepts it.
5. **Revise the artifact.** Apply every resolution by editing the text — a finding is not resolved until the artifact says so. Rewrite the finding's quoted line; don't just append clarifications elsewhere.
6. **Append the Grill findings section** to the artifact:

```markdown
## Grill findings
- **[Axis / Class]** "<quoted line>" → <how it was resolved, or: ASSUMPTION — what is now being bet on, and why it's acceptable>
```

7. **Stop** when every axis has been swept and no load-bearing finding is unresolved. Cap: three rounds on a single axis — if it still produces substantive findings, escalate to the user; the artifact may not be ready, and that is itself the result.

## Optional: fresh-context pass (high stakes)

For plans whose failure is expensive or irreversible, after your own sweep, spawn a fresh-context sub-agent with the artifact and its goal/contract — **not** your findings or reasoning — instructed adversarially: find what is wrong, do not validate. Reconcile anything it surfaces against the artifact's text before adding it as a finding; discard what the text already answers.

## Boundaries and anti-patterns

- **Grill the text, not the person.** Every finding must trace to a quote or a demonstrable absence. If you cannot point at it, it is not a finding.
- **Don't re-plan.** Grill strengthens the artifact it's given. If the sweep shows the goal itself is wrong, say so and stop — re-clarifying is clarify's job.
- **No finding inflation.** A trivial wording nit is not a finding. If an axis genuinely produces nothing, record the axis as swept-clean in one line and move on.
- **Unresolved ≠ deleted.** Anything the user declines to settle becomes a named assumption in the findings section, never a silently dropped question.
