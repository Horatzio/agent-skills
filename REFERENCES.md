# Skill References

Skills referenced from other repositories — not vendored here. Each entry gives the
skill name, its source repository (with a link to the skill itself), and how to load it.

## Source repositories and how to load from them

| Repository | Licence | Load |
|---|---|---|
| [mattpocock/skills](https://github.com/mattpocock/skills) | MIT | Claude Code plugin (self-updating): `claude plugin install mattpocock-skills@claude-plugins-official` — then invoke a skill as `/<skill-name>`. Or use [skills.sh](https://skills.sh/mattpocock/skills) to copy editable files into a project. |
| [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | MIT | One skill: `npx skills add addyosmani/agent-skills --skill <skill-name>`. All skills: `npx skills add addyosmani/agent-skills`. Or in Claude Code: `/plugin marketplace add addyosmani/agent-skills` then `/plugin install agent-skills@addy-agent-skills`. |
| [anthropics/skills](https://github.com/anthropics/skills) | Apache-2.0 | In Claude Code: `/plugin marketplace add anthropics/skills`, then `/plugin install example-skills@anthropic-agent-skills`. Or copy the skill's folder into `.claude/skills/`. |

Short forms used in the tables below:

- **Matt Pocock:** plugin install above, invoke `/<skill-name>`
- **Addy Osmani:** `npx skills add addyosmani/agent-skills --skill <skill-name>`
- **Anthropic:** marketplace install above, or copy `skills/<skill-name>/` into `.claude/skills/`

## 1. Interviewing & intent clarification

| Skill | Repository | How to load |
|---|---|---|
| [interview-me](https://github.com/addyosmani/agent-skills/tree/main/skills/interview-me) | addyosmani/agent-skills | Addy Osmani short form |
| [grilling](https://github.com/mattpocock/skills/tree/main/skills/productivity/grilling) | mattpocock/skills | Matt Pocock short form |
| [grill-me](https://github.com/mattpocock/skills/tree/main/skills/productivity/grill-me) | mattpocock/skills | Matt Pocock short form |
| [grill-with-docs](https://github.com/mattpocock/skills/tree/main/skills/engineering/grill-with-docs) | mattpocock/skills | Matt Pocock short form |

## 2. Ideation, research & context

| Skill | Repository | How to load |
|---|---|---|
| [idea-refine](https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine) | addyosmani/agent-skills | Addy Osmani short form |
| [context-engineering](https://github.com/addyosmani/agent-skills/tree/main/skills/context-engineering) | addyosmani/agent-skills | Addy Osmani short form |
| [research](https://github.com/mattpocock/skills/tree/main/skills/engineering/research) | mattpocock/skills | Matt Pocock short form |

## 3. Handoffs & long-running goals

| Skill | Repository | How to load |
|---|---|---|
| [handoff](https://github.com/mattpocock/skills/tree/main/skills/productivity/handoff) | mattpocock/skills | Matt Pocock short form |
| [claude-handoff](https://github.com/mattpocock/skills/tree/main/skills/in-progress/claude-handoff) | mattpocock/skills (in-progress) | Matt Pocock short form |
| [chief-of-staff](https://github.com/mattpocock/skills/tree/main/skills/in-progress/chief-of-staff) | mattpocock/skills (in-progress) | Matt Pocock short form |

## 4. Build quality & prototyping

| Skill | Repository | How to load |
|---|---|---|
| [security-and-hardening](https://github.com/addyosmani/agent-skills/tree/main/skills/security-and-hardening) | addyosmani/agent-skills | Addy Osmani short form |
| [performance-optimization](https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization) | addyosmani/agent-skills | Addy Osmani short form |
| [code-simplification](https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification) | addyosmani/agent-skills | Addy Osmani short form |
| [prototype](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype) | mattpocock/skills | Matt Pocock short form |

## 5. Writing, docs & teaching

| Skill | Repository | How to load |
|---|---|---|
| [doc-coauthoring](https://github.com/anthropics/skills/tree/main/skills/doc-coauthoring) | anthropics/skills | Anthropic short form |
| [writing-for-agents](https://github.com/mattpocock/skills/tree/main/skills/productivity/writing-for-agents) | mattpocock/skills | Matt Pocock short form |
| [teach](https://github.com/mattpocock/skills/tree/main/skills/productivity/teach) | mattpocock/skills | Matt Pocock short form |
| [wait-what](https://github.com/mattpocock/skills/tree/main/skills/productivity/wait-what) | mattpocock/skills | Matt Pocock short form |

## 6. Artifacts, design & skill-building

| Skill | Repository | How to load |
|---|---|---|
| [web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | anthropics/skills | Anthropic short form |
| [theme-factory](https://github.com/anthropics/skills/tree/main/skills/theme-factory) | anthropics/skills | Anthropic short form |
| [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | anthropics/skills | Anthropic short form |
| [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) | anthropics/skills | Anthropic short form |

## 7. Session meta & guided setup

| Skill | Repository | How to load |
|---|---|---|
| [using-agent-skills](https://github.com/addyosmani/agent-skills/tree/main/skills/using-agent-skills) | addyosmani/agent-skills | Addy Osmani short form |
| [wizard](https://github.com/mattpocock/skills/tree/main/skills/engineering/wizard) | mattpocock/skills | Matt Pocock short form |
| [retro](https://github.com/mattpocock/skills/tree/main/skills/engineering/retro) | mattpocock/skills | Matt Pocock short form |
