# How Skills Load

How skills from this repo get into an agent's context, and how to write
skills that load well.

Two kinds of skill are covered:

- **In-repo skills** — live here, at `skills/<skill-name>/SKILL.md`
- **Referenced skills** — listed in [REFERENCES.md](REFERENCES.md), loaded
  from their source repos, never copied here

## The loading model

A skill is a folder. The folder holds `SKILL.md` plus optional bundled
resources (`references/`, `scripts/`, `assets/`).

Loading happens in three stages (progressive disclosure):

| Stage | What loads | When |
|---|---|---|
| 1. Metadata | `name` + `description` from the YAML frontmatter | Always in context |
| 2. Body | The full `SKILL.md` body | Only when the description matches the current task |
| 3. Resources | Files in `references/`, `scripts/`, `assets/` | Only when the body points to them; scripts run without being read into context |

The description is the trigger surface. It is a **context pointer**: its
wording, not its target, decides whether the agent reaches for the skill,
and how reliably. A must-have skill behind a weakly worded description
will simply not fire.

## Loading a skill from this repo

1. **Install it** — pick one route:
   - `npx skills add Horatzio/agent-skills` (all skills), or add
     `--skill <skill-name>` for just one
   - Clone: `git clone https://github.com/Horatzio/agent-skills.git`
   - Copy: copy `skills/<skill-name>/` into your agent's skills directory,
     e.g. `.claude/skills/` (per project) or `~/.claude/skills/` (global)
2. **Restart / start a new session** — the agent discovers skill folders
   at startup and indexes their `name` + `description`.
3. **Use it** — two ways:
   - Automatic: the agent matches your task against the description and
     loads the body itself
   - Explicit: name it (e.g. `/<skill-name>`) to force the load

## Loading a referenced skill

Referenced skills are **not** in this repo. REFERENCES.md is an index,
not a copy.

1. Find the skill in [REFERENCES.md](REFERENCES.md).
2. Follow its "How to load" entry to install from the source repo
   (mattpocock/skills, addyosmani/agent-skills, or anthropics/skills).
3. The loading model is identical once installed: metadata first, body on
   trigger, resources on demand.

**Name clashes:** if a skill name exists both in this repo and upstream,
load this repo's version. It is the curated one; the upstream copy is the
fallback only when no in-repo version exists.

## Writing skills that load well

- **Description says what + when.** What the skill does AND the situations
  that should trigger it. All "when to use" information belongs in the
  description, not the body.
- **One skill = one job.** A skill that does two things triggers badly for
  both. Split it.
- **Keep `SKILL.md` lean.** Under 500 lines. It loads whole, every time it
  fires, so every line is paid for on every run.
- **Disclose, don't inline.** Detail that only some runs need goes in
  `references/` files, with a clear pointer in the body stating what the
  file holds and which branch of the work reaches for it. Inline what every
  run needs; point to the rest.
- **Single source of truth.** State each rule once. Duplicated content
  costs tokens, drifts out of sync, and inflates a rule's prominence past
  its real importance.
- **Don't teach the model what it knows.** Skip generic background the
  model already has. Keep the repo-specific, the non-obvious, and the
  gotchas — that's what earns the context.
- **Name = folder = frontmatter.** The folder name, the `name` field, and
  the invocation name must match exactly, in kebab-case.

## Context budget

Context is finite, and everything loaded displaces something else.

- Metadata is cheap but not free: every installed skill's description
  rides in context on every turn, whether it fires or not.
- Bodies are the expensive stage: a fat `SKILL.md` spends its full length
  on every triggered run and thins the agent's attention for the task.
- Resources cost nothing until reached — which is why detail belongs
  there, behind well-worded pointers.

Rule of thumb: install the skills you actually use, write descriptions
that fire precisely, and keep bodies short enough to stay legible at a
glance.
