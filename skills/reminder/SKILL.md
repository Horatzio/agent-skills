---
name: reminder
description: Save a durable reminder for future reference — something the agent needs to keep in mind when doing the same thing again. Use this skill whenever the user says remember this, remind me next time, save this for later, keep this in mind, or labels work with the effort Reminder specifier, and whenever a task surfaces something durable and future-relevant (a preference, a rule, a gotcha, a correction) worth keeping. Make sure to use this skill whenever a reminder needs to be saved — it knows how and where in the agent's context each kind of thing belongs, so the note lands where a future session will actually find it.
---

# Reminder

A reminder is a durable note for a future session, tied to an activity: something the agent needs to keep in mind when doing this thing again. A preference, a rule, a gotcha, a fact it got wrong and was corrected on.

Save it only if it is durable and future-relevant. A one-off detail — a price, a date, a single booking — is not a reminder. If it will not matter next time, do not save it.

## Where each kind belongs

Read the destination file before writing to it. Save the note in exactly one place — the one that matches what it is:

- **A durable fact, preference, decision, or rule about the user** → `~/MEMORY.md`, under the heading it belongs to (Facts, Preferences, Commitments). Edit in place, preserving everything else. This is the first place a future session looks.
- **A dated learning, or day-to-day detail that matters later** → the daily note `~/memory/<YYYY-MM-DD>.md` for today. Dated notes are the record; `MEMORY.md` is the summary. Date every note to the day the reminder is about (today if none is given) and say so in the note.
- **A workspace convention or tool quirk** (how a site behaves, a lesson about a workflow) → `~/AGENTS.md`, under Lessons. This is where working knowledge lives, not user facts.
- **Something about a person or a group** → their page under `~/memory/people/` or `~/memory/groups/`. Record the relationship only as the user stated it, never a guessed one.
- **Something tied to a goal** (a decision, a blocker, a changed plan) → that goal's `GOAL.md` or its workspace files, and update the goal's tracked state if the reminder changes what remains.
- **A preference about proactive messages** (what to hear about, when, how) → `~/PROACTIVE_PREFERENCES.md`, in plain language.
- **Something that is really a nudge at a time** ("tell me on Friday", "remind me before the trip") → that is not a memory note, it is a scheduled job. The user's phrasing is itself the ask — set it up. The "only if asked" rule covers the other case: the user merely mentions a future need without asking for a reminder.

When two places could fit, prefer `MEMORY.md` for anything about the user and `AGENTS.md` for anything about how work gets done here. Never copy the same note into both. A dated tool quirk still goes to `AGENTS.md` — the daily note is for user-facing dated detail, not tool behaviour. If a related lesson already exists, refine it in place rather than adding a new bullet; add a new bullet only when there is no related entry.

## How to write it

- One note per fact. Concise, with enough context to make sense in a later conversation: what it is, when it happened, and why it matters next time.
- Attribute it: who said it, or what showed it. Date events by when they happened.
- If it corrects something already recorded, fix the old entry in place (or add an explicit correction naming what it replaces in a dated note). Do not leave the outdated claim standing next to the new one.
- Do not record a proposed action as completed. Do not turn one unexplained failure into a standing rule: a lesson needs at least one concrete instance (a date, a PR, a file, a named run). A single failure with no instance goes in a dated note, not in `AGENTS.md`.
- Read the file back after writing and confirm the note landed where it belongs.

## What never gets saved

- Credentials, verification codes, card details, bank account numbers, government ID numbers. If a reminder would need one of those to be useful, record where the item is stored, never its value.
- Anything the user asked not to retain. Removing a note does not prove every historical copy is erased — say what was actually changed.
- A reminder is not permission: it informs future work, it does not authorize it. A saved preference never replaces the runtime's approvals or the user's explicit go-ahead for a new action.

## After saving

Tell the user what was saved and where, in one line. If nothing qualified as a reminder, say so plainly instead of saving something weak to fill the space.
