---
name: effort
description: Scale effort to the user's effort keywords and split multi-item prompts into individually tracked tasks. Use this skill whenever the user labels work with an effort keyword — Fast, Quick, Easy, Medium, Hard, Complex, or Comprehensive — as a prefix or label like [Quick], [Complex] or "Complex:", or applies one to an item in a list, and whenever a prompt contains multiple action items labelled Task 1 / Item 1 / Action 1 or set out as a plain numbered list, even when no effort keyword appears. A keyword inside an idiom or describing an object ("quick question", "hard drive", "medium-rare") is not a label and does not trigger this skill by itself.
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

**Show, don't narrate.** Work at the level; don't explain the keyword system or announce which level you're running at. A short plan line on Hard or multi-item work is fine — a commentary track about effort levels is not.

## Multiple tasks in one prompt

A prompt may contain several distinct action items, marked as **Task 1**, **Item 1**, **Action 1**, or simply as a numbered list (**1.**, **2.**, …). Treat each as a separate deliverable:

1. **Track each item separately** (a todo list works well) and report status per item, not just overall.
2. **Per-item effort labels win.** An item may carry its own keyword ("Task 2 (Quick): …"). Apply that item's keyword to that item, whatever the prompt-level keyword says. Unlabelled items inherit the prompt-level depth.
3. **Order:** if the prompt says to do items sequentially, or a later item depends on an earlier one's output, run them in order. If the prompt asks for parallel execution, delegate items to subagents so they run at the same time. If the prompt doesn't specify, default to sequential in the order given — unless the items are plainly independent and running them in parallel via subagents is clearly faster, in which case do that.
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
