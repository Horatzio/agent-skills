---
name: lay-foundation
description: "Lay the foundation for a complex plan or workflow before executing it: examine the prompt, identify the simple, singular things it needs, find or write the skills and scripts for each, create subagents where needed, record everything in a TOOLSET.md, and rewrite the plan to reference those tools. Use when the user hands over a complex plan, a multi-step workflow, or a big build and wants it refined into a grounded, executable plan first, or says 'lay the foundation', 'refine this plan', or 'what do I need to build this'. This is a refinement step only — it never executes the improved plan. Make sure to use this skill whenever the user gives you a complex plan or workflow and the work has not yet been grounded in real tools."
---

# Lay Foundation

Given a complex plan or workflow, lay its foundation before anyone executes
it: decompose the prompt into atomic things, find or write the tool for each,
record the toolset, and rewrite the plan so every step references a real tool.
The output is a refined plan. It is never the execution of that plan.

## Pipeline

```
prompt → clarify gate → capabilities → atomic things
       → tool assignment → toolset/ (write) → TOOLSET.md
       → improved plan → self-check
```

### Stage 0 — Clarify gate

- Run `clarify` first whenever the prompt is missing load-bearing inputs
  (dates, budgets, platforms, counts, the thing the plan is for).
  Pre-answer with confidence; ask only below 70%.
- Do this BEFORE decomposing. Decomposing first and discovering the
  dependency afterwards wastes the decomposition.
- When there is no user to ask (a subagent run, a background pass), do not
  stall: convert every open clarify into a gate or check in the improved
  plan, with the assumption stated and the fallback named.
- Everything downstream reads from the confirmed brief, never from the raw
  prompt.

### Stage 1 — Capabilities

- Derive the capability list from the brief: the distinct things the work
  needs (usually 4–10, each one sentence). This is the skill-scout Stage 1
  pattern.
- Capabilities first, tools second. Searching for tools first lets the
  available tools shape the capabilities instead of the requirements
  shaping the search.
- Read the environment and the data before finalising the list: the repo,
  the data files, the tools the plan assumes. An audit can reshape the work
  — in one run, reading the CSV cut the research load from 37 places to 5.

### Stage 2 — Atomic decomposition

- One atomic thing per capability need. Test each candidate: one clear
  input, one clear output, no internal branching.
- The atomic thing is the unit of delegation, not the unit of work: a
  subagent task may branch internally, which is exactly why it is a
  subagent task rather than a main-agent step.
- A 1:1 capability-to-atomic mapping is a sign the decomposition is right.
  If one capability needs three atomics, say so; if two capabilities
  collapse into one atomic, they were one capability.
- Do not guess load-bearing facts. Send them to the clarify gate, or
  surface them as checks in the plan. A settled decision is not work: if
  the user already ruled something out, it is not a gap and gets no
  subagent.

### Stage 3 — Tool assignment

For each atomic thing, choose in this order: existing skill, script,
write a skill, subagent as the execution shape.

- **Existing skill first.** If a named skill does the atomic thing, use it.
  Do not rebuild it. Verify it against the real file (read the SKILL.md,
  grep the catalog) before listing it.
- **Script** when the work is a deterministic transform: a fixed sequence
  with no judgement in it, or the same operation that must run identically
  in two places. A skill would add only words.
- **Write a skill** when the gap is tribal knowledge worth remembering
  (conventions that live only in memory). Test it this way: would the next
  agent find it by reading the code in under a minute? If yes, do not write
  the skill. Do not write one that duplicates a script, or that encodes
  values the prompt never states. Check the licence before vendoring
  anything.
- **Subagent** when the atomic thing is a multi-step, context-heavy job
  that would pull the main agent off-track; when several atomic things are
  independent and can run in parallel; or when there are more than ~4
  atomic things. The count says subagents are due, not that every atomic
  becomes one — the dependency split decides which, and a small step on a
  clean seam stays on the main agent.
- What stays on the main agent: user-facing steps (clarify), final
  judgement and synthesis, single tool invocations, cheap read-only steps.
  Delegating synthesis just moves the context; it does not protect it.
- **Foundation vs execution fan-out.** Keep the foundation in-session when
  each thing builds on the last. Fan out at execution when things are
  independent. Decide the subagent split from dependencies, not just count:
  sequential when B needs A; parallel only when the seams are defined
  first (module seams before parallel implementation, or the parallel work
  becomes a conflict generator).
- **Whole-job tool.** When the prompt IS an existing skill's job (a
  skill-scout run, a clarify run), record the skill as the whole-job tool
  at the top of TOOLSET.md AND decompose into its pipeline stages as the
  atomic things. Collapsing to a one-line toolset defeats the purpose.
  When only half of a skill's job matches an atomic thing, use the skill
  as the tool for that atomic and apply the matching part — do not force
  the whole-job rule, and do not ignore the skill either.
  When a verified, load-bearing gap needs discovery, propose the full
  skill-scout run with the honest fallback (thin skillbook → proceed on
  general skills).

### Stage 4 — Write (toolset/ subfolder)

- Skills and scripts you write go in a NEW SUBFOLDER of the task workspace
  called `toolset/` — not the global skills directory, not the repo.
- Scripts must be run, not just written. A tool that was never run is a
  guess, not a tool. Test each script against a real or fixture input, and
  record the result — prefer a real input when one exists; a fixture proves
  the shape. Fixtures prove a check: a bad input must fail, a good
  input must pass.
- A skill draft written here gets validated with `quick_validate.py` when
  one is available.
- Decide schemas before scripts: the data format a script consumes is
  written down first, and the script is written against it.

### Stage 5 — TOOLSET.md

One file, next to the plan in the task workspace. Header (title, the
original prompt, the grounding statement), then the capability table, then
one section per atomic thing.

```markdown
# TOOLSET.md — <what the plan is for>

Prompt: "<the original prompt>"

<grounding statement: every tool below is real — it exists in the repo, in
the catalog, or was written into toolset/ during this pass. Gaps are marked
as gaps.>

## Capabilities

| # | Capability | Atomic things |
|---|---|---|
| C1 | <one sentence> | A1, A2 |

## A1 — <name>

- **Tool:** <skill name + load line | script path | subagent — name>
- **What it does:** <one line>
- **Inputs:** <…> **Outputs:** <…>
- **Why this tool:** <one line — the skill-vs-script test, in the open>
```

- Name the subagents in TOOLSET.md (R-weird, V, L-flights) so the improved
  plan references names, not re-descriptions.
- Subagent entries carry the brief, or a pointer to the brief file. Put
  critical instructions verbatim in the brief — quality depends on the
  brief saying it, not on the step description implying it.
- Verification lives where the evidence is: inside the subagent brief that
  produces the candidate, or as its own atomic thing with a different code
  path from the thing it checks. Prove a check with fixtures.
- Shared files are context pointers, not pasted output: fetch once, hand
  the path to every reader.

### Stage 6 — Improved plan

- Rewrite the plan so every step names its TOOLSET.md tool. A step with no
  tool is a step that was not grounded — decompose it further or mark the
  gap.
- State the parallel batches explicitly: a batch table (batch / members /
  join condition) makes the dependency structure scannable.
- Order does real work: seams before parallel implementation, curation
  before expensive lookups, verification passes at the time their inputs
  exist.

### Stage 7 — Self-check

Before delivering, check:

- Every tool in TOOLSET.md exists (skill file read, script run, subagent
  brief written) or is marked as an explicit gap.
- Every step of the improved plan references a TOOLSET.md tool by name.
- Every gap is marked as a gap, with the fallback stated.
- Nothing in the improved plan was executed.

## Output

In the task workspace:

- `TOOLSET.md`
- `toolset/` — the skills and scripts written during the pass
- `improved-plan.md` — the refined plan

## Grounding

- The capability pattern is skill-scout Stage 1 (capabilities first, then
  discovery per capability). Call skill-scout itself only when a capability
  needs a full external skillbook.
- Delegation follows chief-of-staff: all work in subagents, protect the
  main agent's context, communicate through context pointers, shape the
  environment so the next task succeeds.

## Boundaries

- Never execute the improved plan. No bookings, no builds, no sending, no
  running the workflow's steps. Writing a script or a skill draft into
  `toolset/` is foundation work, not execution.
- Never invent a tool. A gap is a gap entry with a fallback, not a
  fabricated skill.
- Never guess a load-bearing fact. Clarify it, or surface it as a check.
