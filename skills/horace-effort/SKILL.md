---
name: horace-effort
description: Scale effort to the user's effort keywords and split multi-item prompts into individually tracked tasks. Use this skill whenever the user's message contains an effort keyword — Fast, Quick, Easy, Medium, Hard, Complex, or Comprehensive — in any position, including a bracketed prefix like [Quick] or [Complex] or a label like "Complex:", and whenever a prompt contains multiple action items labelled Task 1 / Item 1 / Action 1 or set out as a plain numbered list, even when no effort keyword appears.
---

# Horace Effort

The user steers how hard to work with keywords. The keyword is a budget: spending more than it buys is waste, spending less is under-delivery. Honour it literally.

## The effort scale

| Keywords | What it means | How to behave |
|---|---|---|
| **Fast / Quick / Easy** | A small, single change to work already done. | Make the change and redo just that piece. No new research, no plan, no re-verification beyond the change itself. Reply briefly. |
| **Medium** (default) | No keyword given. | Normal discernment: judge how much thinking and checking the task needs and spend that. |
| **Hard / Complex / Comprehensive** | Something complicated. | Plan first (write the plan down), then do the work, then iterate at least 2–3 times, and devise a way to verify the result is correct — then apply it and report what the verification showed. |

Matching is case-insensitive. A keyword may appear anywhere: as a prefix (`[Complex]`, `Hard:`), inline ("quick fix to the title"), or attached to one item in a list (see below).

If several whole-prompt keywords appear, the highest one governs the prompt as a whole.

If a keyword plainly doesn't fit the task it's attached to — a [Quick] label on something that cannot honestly be done as one small change — don't silently upgrade. Flag it in one line ("this isn't a quick one because …"), then proceed at the level the task actually needs.

**Show, don't narrate.** Work at the level; don't explain the keyword system or announce which level you're running at. A short plan line on Hard or multi-item work is fine — a commentary track about effort levels is not.

## Multiple tasks in one prompt

A prompt may contain several distinct action items, marked as **Task 1**, **Item 1**, **Action 1**, or simply as a numbered list (**1.**, **2.**, …). Treat each as a separate deliverable:

1. **Track each item separately** (a todo list works well) and report status per item, not just overall.
2. **Per-item effort labels win.** An item may carry its own keyword ("Task 2 (Quick): …"). Apply that item's keyword to that item, whatever the prompt-level keyword says. Unlabelled items inherit the prompt-level effort.
3. **Order:** if the prompt says to do items sequentially, or a later item depends on an earlier one's output, run them in order. If the prompt asks for parallel execution, delegate items to subagents so they run at the same time. If the prompt doesn't specify, default to sequential in the order given — unless the items are plainly independent and running them in parallel via subagents is clearly faster, in which case do that.
4. **Multi-item prompts raise the floor.** When a prompt contains multiple items, run the main session itself at **Hard** — planning, coordination, and a final check that every item landed — even if individual items are labelled Quick. The items keep their own labels; the coordination around them does not get to be casual.

## Examples

**Example 1 — Quick**
Input: "Quick: change the calendar event's title and add an emoji to it"
Behaviour: rename the event, add the emoji, confirm in one line. No research into other events, no plan, no follow-up offers.

**Example 2 — Complex**
Input: "Complex: search multiple places on the internet to find where I can buy indie art in London"
Behaviour: plan the search (sources, criteria), search, compare, iterate on the shortlist 2–3 times, verify claims (e.g. that the shops are open / stock indie art) before presenting.

**Example 3 — Multiple items, mixed labels**
Input: "1. (Complex) Research three venues for the party. 2. (Quick) Rename the draft doc to 'Party plan'. Do them in parallel."
Behaviour: main session runs at Hard; item 1 gets the full plan–iterate–verify treatment; item 2 is done as a single quick change; item 1 is delegated to a subagent so both proceed in parallel; final reply reports each item's status separately.
