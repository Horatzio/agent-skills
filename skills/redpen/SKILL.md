---
name: redpen
description: "Review agent-written content (docs, descriptions, other documents) and flag meta-commentary for removal. Use this skill whenever the user hands you text an agent wrote and asks for a review, a cleanup, or what to cut — pasted text or a file path — even if they don't name the skill. It runs two passes: a red-pen scan that flags meta-commentary by category, then a defense pass that argues for keeping anything load-bearing, so only truly dead weight lands on the cut list. It never rewrites or edits the document; it reports what to cut and what survived and why."
---

# Redpen

Agents pad their own writing with commentary about the writing instead of the subject: disclaimers about sources, narration of the document's structure, hedging about who said what. Redpen reopens finished agent-written content and cuts that dead weight out — but only the dead weight. Anything the reader genuinely needs survives, and you see why it survived.

## Input

The content arrives as pasted text or a file path. If it is a file path, read the file first and review its full contents. If it is pasted text, review exactly what was pasted. Never review from memory or from a summary — always work from the text itself.

## Pass 1 — Red-pen scan

Read the whole document once, flagging every passage that talks about the document, its sources, or its own production instead of its subject. Sort each flag into one category:

1. **Source disclaimers** — statements about what the sources do or don't say, rather than the subject itself. Example: "this is not defined in the sources", "the sources do not specify a date".
2. **Structural narration** — the text narrating its own layout instead of letting the layout speak. Example: "are open questions described below", "as discussed in the next section", "this document covers three topics".
3. **Attribution hedging** — distancing the claim from its source instead of stating the claim or the attribution cleanly. Example: "relayed by John in the meeting notes", "according to the notes, it was suggested that…".
4. **Process narration** — the agent describing how it produced the text. Example: "based on the sources provided", "I have compiled the following summary", "as an AI".
5. **Uncertainty dumping** — open questions or gaps raised and then abandoned, with no answer and no action for the reader. Example: "it is unclear whether the venue is licensed for this", left hanging with nothing following it.

Flag whole sentences or clauses, never single words. Quote each flagged passage exactly as it appears — never paraphrase it.

## Pass 2 — Defense

For each flagged passage, argue for keeping it before you condemn it. A passage survives the defense — and stays out of the cut list — if any of these hold:

- **The reader needs the uncertainty.** The gap is real, the reader would act differently knowing about it, and the passage says what to do about it (check, confirm, decide). An abandoned question fails this; a flagged unknown with a next step passes it.
- **The attribution carries the trust.** Removing it would leave a claim the reader can't verify or shouldn't take on faith — a quote, a disputed fact, a decision owned by a named person.
- **The structure genuinely needs signposting.** The reader would get lost without it — a long document where a forward reference orients them, not a short one where the heading already does the job.
- **Removing it changes the facts.** If the cut would alter what the document asserts, keep the passage.

When genuinely torn between cutting and keeping, keep it and say why it's borderline. A false keep costs the reader one sentence; a false cut costs them information they can't get back.

## Output format

Report in this exact structure. Never rewrite or edit the document itself — report what to cut and let the user apply it.

```markdown
## Cut list

| Passage (exact quote) | Category | Why it goes | Confidence |
|---|---|---|---|
| "…" | Source disclaimer | … | High / Medium / Low |

## Defended — kept

| Passage (exact quote) | Why it stays |
|---|---|
| "…" | … |

## Summary
- Flagged: N passages
- Cut: N (categories: …)
- Kept: N
```

If nothing deserves cutting, say so plainly — "Nothing to cut" — and still list anything that came close, under Defended, so the user can see the scan actually ran.

## Rules

- Quote exactly. A paraphrased quote is a different passage and can't be found or cut.
- Never rewrite, rephrase, or edit the document. The cut list is the deliverable.
- Never cut a fact, a figure, a date, or a decision — only commentary about the text itself.
- Confidence is honest: High means the passage is pure meta-commentary; Low means it only just lost the defense.
- Review the document you were given, not the kind of document you expect. Short descriptions get the same two passes as long docs.

## Examples

**Example 1 — Source disclaimer**
Input: "The venue opens at 6pm. The exact closing time is not defined in the sources."
Output: cut list — "The exact closing time is not defined in the sources." | Source disclaimer | Says nothing about the venue, only about the sources | High.

**Example 2 — Genuine uncertainty survives**
Input: "Whether the venue's licence covers the outdoor area is still unconfirmed — check with the venue before advertising outdoor hours."
Output: defended — kept, because the reader would advertise the wrong hours without it and the passage gives the next step.

**Example 3 — Attribution hedging**
Input: "The budget was approved. This was relayed by John in the meeting notes."
Output: cut list — "This was relayed by John in the meeting notes." | Attribution hedging | The approval is the fact; the relay adds nothing unless who relayed it matters | High.

## Out of scope

- Code and code comments — this skill reviews prose documents.
- Rewriting for style, tone, or brevity beyond removing meta-commentary. If the user wants a rewrite, that is a different task.
- Fact-checking the document's claims against outside sources. Redpen judges the text on its own terms.
