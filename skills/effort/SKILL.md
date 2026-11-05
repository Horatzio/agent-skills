---
name: effort
description: Scale effort to the user's effort keywords and specifiers, and split multi-item prompts into individually tracked tasks. Use this skill whenever the user labels work with an effort keyword — Fast, Quick, Easy, Medium, Hard, Complex, or Comprehensive — as a prefix or label like [Quick], [Complex] or "Complex:", or with a specifier — Parallel, Think, Plan, Options, Automate, Draft, Visual, or Strict — or applies one to an item in a list, and whenever a prompt contains multiple action items labelled Task 1 / Item 1 / Action 1 or set out as a plain numbered list, even when no effort keyword appears. A keyword inside an idiom or describing an object ("quick question", "hard drive", "medium-rare") is not a label and does not trigger this skill by itself.
---

# Effort

The user steers how hard to work with keywords. The keyword is a budget: spending more than it buys is waste, spending less is under-delivery. Honour it literally.

## The effort scale

| Label | Depth | Behaviour anchors |
|---|---|---|
| **Fast / Quick / Easy** | Shallow | Small, self-contained, one pass — a small change to existing work, or a small fresh ask. No new research or sources, no plan, no re-verification beyond a sanity glance at the result itself. Reply briefly. |
| **Medium** (default) | Normal | One pass with discernment, plus one check of the load-bearing fact or result. A written plan only when the task has five or more steps. |
| **Hard / Complex / Comprehensive** | Deep | Plan first (write the plan down), then do the work, then iterate at least 2–3 times. Verify with a method independent of the one that produced the answer, and report what the verification showed. |

### What counts as a label

- A keyword used as a prefix or label (`[Complex]`, `Hard:`, "Task 2 (Quick)"), or plainly grading the work ("do this one quickly — it's just a rename").
- **Not a label:** the same word inside an idiom or fixed phrase ("quick question", "hard copy"), describing an object or a property ("a hard drive", "medium-rare steak", a clothing size), or naming a thing ("easyJet"). Bracketed or labelled keywords are always intentional; a bare inline keyword that reads either way is not a label.
- Matching is case-insensitive. If several whole-prompt depth keywords appear, the highest governs the prompt as a whole.

### Asking vs acting

- **Quick:** never ask. Act, and state any assumption afterwards.
- **Medium:** ask only when the answer would change the outcome.
- **Hard:** ask upfront when the scope is genuinely unclear — one focused question beats a deep run in the wrong direction.

### Scope and re-grading

- A label covers its message and the work it names. Follow-ups on the same work inherit the label; a new, unrelated ask resets to Medium.
- If work outgrows its tier mid-task — or turns out smaller than labelled — re-grade: say so in one line ("this needs more than a quick pass: …") and continue at the right level. Never silently upgrade or downgrade.

**Show, don't narrate.** Work at the level; don't explain the keyword system or announce which level or specifiers you're running at. A short plan line on Hard or multi-item work is fine — a commentary track about effort levels is not.

## Specifiers

A level sets **depth**; a specifier sets **shape**. Specifiers stack freely with levels and with each other: "Hard + Parallel + Automate" means deep work, fanned out, then turned into a reusable artifact. A prompt with no level defaults to Medium, whatever specifiers it carries.

| Specifier | Shape | Behaviour anchors |
|---|---|---|
| **Parallel** | Do the parts at the same time | Delegate items or sub-parts to subagents so they run concurrently; coordinate per the multi-item rule below. If there is nothing independent to split, proceed normally. |
| **Think** | Approach first, then wait | Before doing anything, work out the approach and state it in plain terms, then wait for a go-ahead. For ambiguous requests where the right way to proceed isn't clear even to the user. After the go-ahead, proceed at the stated level. Think answers "which way?"; Plan answers "in what steps?". |
| **Plan** | Steps first, then wait | Write the execution plan — steps, order, and what each step needs — and stop; wait for a go-ahead before doing anything. The direction is assumed known; what is missing is the plan itself. Unlike Hard, which plans and then proceeds, Plan always waits. |
| **Options** | Present, don't pick | Present at least 4 genuine options (exactly that number when the user specifies one), each with a one-line trade-off, then wait for the pick. Do not pad with near-duplicates; do not pick for the user. |
| **Automate** | Reusable artifact after success | After the request is successfully completed — never after a failure or partial completion — build a reusable tool or skill from the work and save it in the local custom-skills collection. Tell the user what was saved and where. If the work fails or only partly completes, build nothing and say what would be needed to succeed instead. |
| **Draft** | Prepare, don't commit | Do all the preparation, but change, send, publish, book, merge, or commit nothing. Show the result first and wait. |
| **Visual** | Show, don't just tell | The result includes a picture, diagram, or map inline in chat, not as an attachment. |
| **Strict** | Literal, no substitutes | Counts, scopes, and constraints are literal. No substitutes, no near-misses presented as matches, no bluffing a no-match: say plainly when something doesn't exist or falls short, and verify untouched parts are unchanged when the task says to leave them alone. |

### What counts as a specifier

- A specifier word used as a label or prefix (`[Think]`, `[Plan]`, `Options:`, "Task 2 (Draft)"), or plainly instructing how to do the work ("think through the approach first", "plan this first, don't start yet", "give me options", "what are my options for…", "do these in parallel", "make this reusable afterwards", "just draft it, don't send it", "show me what it looks like", "exactly 10, no substitutes").
- Combinations may be written with commas, plus signs, or "and": "Hard, Parallel, Options:", "Hard + Parallel", and "Quick and Strict" all mean the same combination. The same separators work inside per-item parentheses: "Task 2 (Quick, Draft)".
- **Not a specifier:** the word appearing in content about something else ("I think the dark theme is right" is the user's opinion, not Think; "the draft policy document"; "a business plan" as a document; "automatic updates"; "visual arts"), or describing a property of the thing itself. Bracketed or labelled specifiers are always intentional; a bare inline word that reads either way is not a specifier.
- Matching is case-insensitive.

### Combining levels and specifiers

- A specifier never changes the level's depth: Fast + Think is a quick approach sketch, not a deep analysis; Hard + Think is a deep one. The level still governs how much work each step gets.
- A specifier's explicit wait overrides the level's ask-vs-act rule for that step: Quick + Think still waits for the go-ahead, and Quick + Options still waits for the pick — the wait is the point of the specifier.
- Think + Options combined: a single wait — present the approach as the options (each with its trade-off) and wait for the pick, rather than waiting twice.
- Think + Plan run as two stages with a wait each: the approach is approved first, and the detailed plan is written only once the direction is agreed.
- Draft suppresses side effects: with Draft + Automate, build the artifact but present it as a draft; do not install it until the user approves.
- A specifier covers its message and the work it names, like a label. Per-item specifiers win for that item; follow-ups on the same work inherit them; a new, unrelated ask resets to Medium with no specifiers.

## Multiple tasks in one prompt

A prompt may contain several distinct action items, marked as **Task 1**, **Item 1**, **Action 1**, or simply as a numbered list (**1.**, **2.**, …). Treat each as a separate deliverable:

1. **Track each item separately** (a todo list works well) and report status per item, not just overall.
2. **Per-item effort labels win.** An item may carry its own keyword ("Task 2 (Quick): …"). Apply that item's keyword to that item, whatever the prompt-level keyword says. Unlabelled items inherit the prompt-level depth.
3. **Order:** if the prompt says to do items sequentially, or a later item depends on an earlier one's output, run them in order. If the prompt asks for parallel execution or carries the Parallel specifier, delegate items to subagents so they run at the same time. If the prompt doesn't specify, default to sequential in the order given — unless the items are plainly independent and running them in parallel via subagents is clearly faster, in which case do that. An item waiting on a go-ahead (Think, Plan, Options, or Draft) does not block independent items; those proceed and report while the waiting item stands.
4. **Coordination scales with the items.** Run the main session at **Hard** — planning, coordination, and a final check that every item landed — when any item is Medium or above, or when items depend on each other. If every item is Quick/Easy and there are four or fewer, coordination runs at **Medium**: track the items and report per item, but skip the ceremony.

## Examples

**Example 1 — Quick**
Input: "Quick: change the calendar event's title and add an emoji to it"
Behaviour: rename the event, add the emoji, confirm in one line. No research into other events, no plan, no follow-up offers.

**Example 2 — Complex**
Input: "Complex: search multiple places on the internet to find where I can buy indie art in London"
Behaviour: plan the search (sources, criteria), search, compare, iterate on the shortlist 2–3 times, verify claims with an independent check (e.g. the shop's own site, not just the listing that mentioned it) before presenting.

**Example 3 — Multiple items, mixed labels**
Input: "1. (Complex) Research three venues for the party. 2. (Quick) Rename the draft doc to 'Party plan'. Do them in parallel."
Behaviour: item 1 gets the full plan–iterate–verify treatment; item 2 is done as a single quick change; item 1 is delegated to a subagent so both proceed in parallel; the main session coordinates at Hard (an item is above Quick) and the final reply reports each item's status separately.

**Example 4 — Fast is the same shallow tier**
Input: "Fast: rename the draft doc to 'Party plan'"
Behaviour: rename it, confirm in one line. Same treatment as Quick: one pass, no plan, no extras.

**Example 5 — Not a label**
Input: "Quick question — how does a hard drive store data?"
Behaviour: neither word is a label here ("quick question" is an idiom; "hard drive" names an object). Answer at Medium, the default: one solid pass, no plan, no ceremony.

**Example 6 — Think waits**
Input: "Think: I want to reorganise my saved places but I'm not sure what structure makes sense"
Behaviour: work out 2–3 possible structures, state the recommended approach in plain terms, and wait for a go-ahead. Reorganise nothing yet.

**Example 7 — Options waits, at least 4**
Input: "Options: how should I back up my photos?"
Behaviour: present at least 4 genuine backup options, each with a one-line trade-off, and wait for the pick. Back up nothing yet, and do not pick for the user.

**Example 8 — Draft sends nothing**
Input: "Draft: write the email to the venue asking about a December date"
Behaviour: write the email and show it. Do not send it, and do not ask for anything else first.

**Example 9 — Strict is literal**
Input: "Strict: find me 10 rooftop bars in London"
Behaviour: exactly 10 rooftop bars — no pubs, cafés, or ground-floor bars substituted to fill the count. If fewer than 10 can be verified, say so plainly rather than padding the list.

**Example 10 — Combined specifiers**
Input: "Hard + Parallel + Automate: research three neighbourhoods for the trip, one per subagent, and make the comparison reusable"
Behaviour: plan the research, fan the three neighbourhoods out to subagents, iterate and verify the comparison, then — the work having succeeded — build a local skill from the comparison method and say what was saved and where.

**Example 11 — Not a specifier**
Input: "I think the Midnight Galaxy theme is the right one — apply it"
Behaviour: "think" here is the user's opinion, not the Think specifier: no approach statement, no wait. Apply the theme at the default Medium.

**Example 12 — Comma-separated combination**
Input: "Hard, Parallel, Options: plan a weekend trip to Brighton"
Behaviour: the commas mean the same as plus signs — Hard + Parallel + Options. Plan the research, fan transport, stay, and things to do out to subagents, iterate and verify, then present at least 4 trip options, each with a one-line trade-off, and wait for the pick.

**Example 13 — Plan waits, unlike Hard**
Input: "Plan: migrate my notes to the new system"
Behaviour: write the migration plan — steps, order, what each step needs — and stop. Migrate nothing until the go-ahead. (Hard would plan and then proceed; Plan always waits.)
