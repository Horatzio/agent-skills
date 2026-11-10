# Skillbook: Improving, clarifying and disambiguating a prompt for an agent

Skills for turning a vague, ambiguous or weak prompt for an agent into a clear, precise, executable brief — clarifying, disambiguating, eliciting, rewriting, interrogating, evaluating and optimizing.

## Clarify a vague request

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [clarify](https://github.com/Horatzio/agent-skills) | Turn a vague idea into a confirmed goal brief + plan via a 7-category rubric; asks only below 70% confidence. | `npx skills add Horatzio/agent-skills --skill clarify` | Horatzio/agent-skills | 93 |
| [spec-driven-development](https://github.com/addyosmani/agent-skills) | Turn unclear, ambiguous or vague requirements into a written spec as the shared source of truth. Also disambiguates and rewrites. | `npx skills add addyosmani/agent-skills --skill spec-driven-development` | addyosmani/agent-skills | 92 |
| [brainstorming](https://github.com/obra/superpowers) | Pre-work discovery — find what the requester actually wants and why before anything gets built. Also elicits. | `npx skills add obra/superpowers --skill brainstorming` | obra/superpowers | 91 |
| [idea-refine](https://github.com/addyosmani/agent-skills) | Turn a raw vague idea into a sharp actionable concept via divergent/convergent thinking. Also interrogates: stress-tests assumptions. | `npx skills add addyosmani/agent-skills --skill idea-refine` | addyosmani/agent-skills | 90 |
| [interview](https://github.com/hg-pyun/claude-code-marketplace) | Analyst agent surfaces ambiguities with per-dimension clarity scoring, resolves via questions, outputs a spec. | copy `plugins/dev-tools/skills/interview/` into `.claude/skills/` | hg-pyun/claude-code-marketplace | 84 |
| [prompt-improver](https://github.com/severity1/claude-code-prompt-improver) | Hook-driven enrichment of vague prompts: research, then 1–6 grounded questions, then clarify and execute. | `npx skills add severity1/claude-code-prompt-improver --skill prompt-improver` | severity1/claude-code-prompt-improver | 84 |
| [socratic-interview](https://github.com/hg-pyun/claude-code-marketplace) | One focused question at a time, options carrying their reasoning; elenchus surfaces contradictions. Also disambiguates. | copy `plugins/buddy/skills/socratic-interview/` into `.claude/skills/` | hg-pyun/claude-code-marketplace | 84 |
| [clarify-ask](https://github.com/zeniskui/Clarify-Ask) | Tiered structured interview replacing the guess with confirmed intent; 4 worked examples. | copy `SKILL.md` into `.claude/skills/clarify-ask/` | zeniskui/Clarify-Ask | 83 |
| [lay-foundation](https://github.com/Horatzio/agent-skills) | Clarify gate + atomic decomposition before executing a complex plan; clarification is the gate, not the whole job. | `npx skills add Horatzio/agent-skills --skill lay-foundation` | Horatzio/agent-skills | 80 |
| [swing-clarify](https://github.com/TheStack-ai/swing-skills) | Prevent premature execution on ambiguous requests: 5W1H decomposition, ambiguity scoring, max 3 questions. Also disambiguates. | `npx skills add TheStack-ai/swing-skills --skill swing-clarify` | TheStack-ai/swing-skills | 79 |
| [triage](https://github.com/mattpocock/skills) | Write agent-ready briefs as part of moving issues through triage; clarification is a side-effect. | plugin install, invoke `/triage` | mattpocock/skills | 79 |
| [skill-creator](https://github.com/anthropics/skills) | Create skills; includes a clarifying workflow for new skills — one small part of a large skill. | marketplace install, or copy `skills/skill-creator/` into `.claude/skills/` | anthropics/skills | 73 |
| [context-builder](https://github.com/JWhiteUX/ClaudeSkills-Library) | Structured context-gathering workflow that interviews the user before executing their prompt. | copy `context-builder/` into `.claude/skills/` | JWhiteUX/ClaudeSkills-Library | 72 |
| [ralph](https://github.com/aiskillstore/marketplace) | Specification-first dev; Socratic questioning exposes hidden assumptions, then Interview → Seed → Execute → Evaluate → Evolve. | copy `skills/supercent-io/ralph/` into `.claude/skills/` | aiskillstore/marketplace | 72 |
| [spec-rfc](https://github.com/NieHang/weather-for-poly) | Scattered information → unambiguous implementation-ready spec via multi-round clarification; 7-dimension mining. | copy `.cursor/skills/spec-rfc/` into `.claude/skills/` | NieHang/weather-for-poly | 71 |

## Disambiguate ambiguous instructions

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [ask-questions-if-underspecified](https://github.com/sickn33/antigravity-awesome-skills) | Ask the minimum clarifying questions when a request has multiple plausible interpretations. | `npx skills add sickn33/antigravity-awesome-skills --skill ask-questions-if-underspecified` | sickn33/antigravity-awesome-skills | 85 |
| [intent-analyzer](https://github.com/evolv3ai/context-cascade) | Probabilistic intent mapping: 3+ interpretations with probabilities, max 3 clarifying questions. Needs claude-flow@alpha hooks. | copy `skills/tooling/utilities/when-analyzing-user-intent-use-intent-analyzer/` into `.claude/skills/` | evolv3ai/context-cascade | 77 |

## Elicit missing requirements

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [interview-me](https://github.com/addyosmani/agent-skills) | One-question-at-a-time interview to surface what you actually want, to ~95% confidence about underlying intent. | `npx skills add addyosmani/agent-skills --skill interview-me` | addyosmani/agent-skills | 95 |
| [constraint-driven-development](https://github.com/addyosmani/agent-skills) | Interview the user on which quality dimensions matter and record the bar as an enforced written contract. | `npx skills add addyosmani/agent-skills --skill constraint-driven-development` | addyosmani/agent-skills | 84 |
| [to-questionnaire](https://github.com/mattpocock/skills) | Turn a decision you can't answer alone into a questionnaire for the person who holds the knowledge. | plugin install, invoke `/to-questionnaire` | mattpocock/skills | 82 |
| [babok-v3-software-requirements](https://github.com/pamontag-org-ghe/github-copilot-document-requirement-interviewer-agent) | Interview-driven elicitation per BABOK v3, with a disambiguation-rules table for vague words ("fast", "secure", "scalable"). Also disambiguates. | copy `.github/skills/babok-v3-software-requirements/` into `.claude/skills/` | pamontag-org-ghe/github-copilot-document-requirement-interviewer-agent | 70 |

## Rewrite and improve a prompt

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [improving-prompts](https://github.com/theultimate-dev/skills) | Rewrite a rough prompt into an engineered one; diagnoses gaps and lists techniques applied or rejected, with reasons. | copy `skills/prompt-engineering/improving-prompts/` into `.claude/skills/` | theultimate-dev/skills | 87 |
| [prompt-engineering](https://github.com/JosephSearle/skills) | Draft, restructure and harden a prompt from Anthropic's official techniques; success criteria first. | copy `catalog/prompt-engineering/` into `.claude/skills/` | JosephSearle/skills | 84 |
| [writing-for-agents](https://github.com/mattpocock/skills) | Sharpen the wording of documents agents consume — skills, AGENTS.md — where pointer wording decides reach. | plugin install, invoke `/writing-for-agents` | mattpocock/skills | 84 |
| [prompt-design](https://github.com/MaciWP/poneglyph) | Prompt quality in 4 contexts, incl. sharpening a vague user prompt and auditing agent-to-agent messages, with a 5-criteria rubric. Also covers multiple interpretations and rubric evaluation. | copy `.claude/skills/prompt-design/` into `.claude/skills/` | MaciWP/poneglyph | 83 |
| [prompt-engineering-patterns](https://github.com/wshobson/agents) | Advanced patterns incl. iterative optimization and A/B testing. | `npx skills add wshobson/agents --skill prompt-engineering-patterns` | wshobson/agents | 83 |
| [prompt-engineering-patterns-v2](https://github.com/paulpas/agent-skill-router) | Advanced techniques incl. evaluation rubrics; zero/one-shot design, verb-based instructions, structured output. | copy `skills/agent/prompt-engineering-patterns-v2/` into the agent's skills directory | paulpas/agent-skill-router | 82 |
| [prompt-writer](https://github.com/Londeren/claude-plugins) | Understand → type → template → audit → deliver; asks max 2–3 questions if the spec is vague. | copy `plugins/prompt-writer/skills/prompt-writer/` into `.claude/skills/` | Londeren/claude-plugins | 82 |
| [prompt-engineer](https://github.com/Jeffallan/claude-skills) | Write, refactor and evaluate prompts: templates, schemas, rubrics, test suites. | `npx skills add Jeffallan/claude-skills --skill prompt-engineer` | Jeffallan/claude-skills | 81 |
| [to-spec](https://github.com/mattpocock/skills) | Turn the current conversation into a spec; no interview, just synthesis of what you've already discussed. | plugin install, invoke `/to-spec` | mattpocock/skills | 79 |
| [prompt-master](https://github.com/nidhinjs/prompt-master) | Generate optimized prompts for AI tools; activates only on an explicit prompt-improvement ask. | copy `SKILL.md` into `.claude/skills/prompt-master/` | nidhinjs/prompt-master | 79 |
| [doc-coauthoring](https://github.com/anthropics/skills) | Three-stage co-authoring workflow (context gathering, refinement, reader testing) for specs and decision docs. | marketplace install, or copy `skills/doc-coauthoring/` into `.claude/skills/` | anthropics/skills | 77 |
| [kernel-angus](https://github.com/JWhiteUX/ClaudeSkills-Library) | Score prompts against the KERNEL framework (PASS/WEAK/FAIL) and rewrite them into TICO-V format. | copy `kernel-angus/` into `.claude/skills/` | JWhiteUX/ClaudeSkills-Library | 75 |
| [promptmaster](https://github.com/Jakeschincariol/promptmaster-skill) | Rewrite a raw request into an optimized prompt; audits against 35 credit-waste patterns; locked decisions. | copy `.claude/skills/promptmaster/` into `.claude/skills/` | Jakeschincariol/promptmaster-skill | 75 |
| [prompt-optimizer](https://github.com/materialofair/oh-my-antigravity) | Analyse a raw prompt, find intent and gaps, output a ready-to-paste optimized prompt. Antigravity/OMA-specific; advisory only. | copy `.agent/skills/local/prompt-optimizer/` into `.claude/skills/` | materialofair/oh-my-antigravity | 74 |
| [prompt-improvement](https://github.com/tomevault-io/tomes) | Meta-skill replicating Anthropic's Console prompt improver: 4-step workflow + decision trees. | copy `melodic-software--claude-code-plugins/skills/prompt-improvement/` into `.claude/skills/` | tomevault-io/tomes | 73 |
| [prompt-improver](https://github.com/ndpvt-web/prompt-improver) | Transform vague prompts into clear, specific, actionable ones; asks as many questions as needed first. | copy `SKILL.md` into `.claude/skills/prompt-improver/` | ndpvt-web/prompt-improver | 73 |
| [prompt-engineer](https://github.com/Sourabhj00/prompt-engineer) | 6-step analysis → context-gap questions → checklist → Master Prompt → reasoning summary. | copy `prompt-engineer/` into `.claude/skills/` | Sourabhj00/prompt-engineer | 72 |
| [prompt-engineering](https://github.com/dimitritholen/1337-claude) | Source-cited reference for writing, reviewing, debugging and improving prompts on current frontier LLMs. | `npx skills add dimitritholen/1337-claude --skill prompt-engineering` | dimitritholen/1337-claude | 72 |
| [prompt-improver](https://github.com/wagnersza/prompt-improver) | Diagnose and rewrite a draft prompt as a senior-partner question, tuned for Opus 5 / Sonnet 5. | copy `SKILL.md` into `.claude/skills/prompt-improver/` | wagnersza/prompt-improver | 72 |
| [improve-prompt](https://github.com/ckallum/calsuite) | Audit-and-rewrite loop against Anthropic's prompt engineering best practices; colleague test as the highest-yield check. | `npx skills add ckallum/calsuite --skill improve-prompt` | ckallum/calsuite | 71 |
| [prompt-engineering](https://github.com/miovrag/claude-skills) | Best-practice guidance for writing, refining and evaluating prompts, incl. iterative refinement and rubric testing. | copy `prompt-engineering/` into `.claude/skills/` | miovrag/claude-skills | 70 |
| [prompt-master](https://github.com/Chappygo-OS/claude-meta-skills) | Generate optimized prompts for any AI tool; convert brain dumps into structured prompts. Broad, incl. image/video AI. | `npx skills add Chappygo-OS/claude-meta-skills --skill prompt-master` | Chappygo-OS/claude-meta-skills | 70 |

## Interrogate a plan or brief

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [grill](https://github.com/Horatzio/agent-skills) | Interrogate a goal or plan across 9 axes for ambiguity, the implicit, the missing and the too-thin; returns a revised artifact. | `npx skills add Horatzio/agent-skills --skill grill` | Horatzio/agent-skills | 91 |
| [doubt-driven-development](https://github.com/addyosmani/agent-skills) | Fresh-context adversarial review cross-examining every assumption before a decision stands. | `npx skills add addyosmani/agent-skills --skill doubt-driven-development` | addyosmani/agent-skills | 90 |
| [grilling](https://github.com/mattpocock/skills) | Relentless multi-round interview mapping a plan as a decision tree until nothing is silently assumed. Also elicits. | plugin install, invoke `/grilling` | mattpocock/skills | 83 |
| [redpen](https://github.com/Horatzio/agent-skills) | Two-pass review of agent-written content flagging meta-commentary; never rewrites. | `npx skills add Horatzio/agent-skills --skill redpen` | Horatzio/agent-skills | 78 |
| [grill-me](https://github.com/mattpocock/skills) | Relentless interview to sharpen a plan or design. Router stub delegating to grilling. | plugin install, invoke `/grill-me` | mattpocock/skills | 71 |
| [grill-with-docs](https://github.com/mattpocock/skills) | Relentless interview to sharpen a plan or design, also creating ADRs and a glossary. Substance lives in the delegated skills. | plugin install, invoke `/grill-with-docs` | mattpocock/skills | 71 |

## Evaluate a prompt against a rubric

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [prompt-evaluation](https://github.com/JosephSearle/skills) | Define success criteria, build an eval dataset, grade, and feed results back into a revised prompt. | copy `catalog/prompt-evaluation/` into `.claude/skills/` | JosephSearle/skills | 85 |
| [system1-rubric](https://github.com/Horatzio/agent-skills) | Rubric as a question set the model answers to classify the input; top-level prompt with examples. | `npx skills add Horatzio/agent-skills --skill system1-rubric` | Horatzio/agent-skills | 84 |
| [advanced-evaluation](https://github.com/sickn33/agentic-awesome-skills) | LLM-as-judge rubrics, direct scores, pairwise comparisons, bias/calibration guidance. Evaluates outputs, not prompt text. | `npx skills add sickn33/agentic-awesome-skills --skill advanced-evaluation` | sickn33/agentic-awesome-skills | 79 |
| [evaluator-optimizer](https://github.com/mnzralee/claude-multi-agent-architecture) | Generator-plus-critic loop against an explicit rubric, with a seed eval set for regression-testing prompt changes. Also optimizes iteratively. | copy `.claude/skills/evaluator-optimizer/` into `.claude/skills/` | mnzralee/claude-multi-agent-architecture | 77 |
| [llm-as-judge](https://github.com/latestaiagents/agent-skills) | LLM-as-judge for open-ended outputs: rubrics, pairwise comparison, calibration, bias mitigation. Evaluates outputs, not prompt text. | copy `skills/evals/llm-as-judge/` into `.claude/skills/` | latestaiagents/agent-skills | 73 |
| [llm-evaluation](https://github.com/NiravRVaghasiya/ml-ai-skills) | Eval harness: eval set, overlap metrics, LLM-as-judge, faithfulness check; "regression test my prompt changes". Evaluates outputs, not prompt text. | copy `llm-evaluation/` into `.claude/skills/` | NiravRVaghasiya/ml-ai-skills | 71 |

## Optimize prompts iteratively

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [opik-optimize](https://github.com/comet-ml/opik-skills) | Metric-driven prompt optimization with held-out validation; the winner is saved as a new prompt version. Needs Opik + dataset + API key. Also evaluates. | `npx skills add comet-ml/opik-skills --skill opik-optimize` | comet-ml/opik-skills | 83 |
| [agentsop-dspy](https://github.com/agentsope/SkillAlchemy) | DSPy SOP: compile/optimize prompts with MIPRO, BootstrapFewShot, GEPA; cost guardrails, dilemma cases. | `npx skills add agentsope/SkillAlchemy --skill agentsop-dspy` | agentsope/SkillAlchemy | 80 |
| [prompt-optimization](https://github.com/thistleknot/skills) | Systematic prompt quality improvement via DSPy, TextGrad, OPRO, ProTeGi, APE. | copy `.skills/prompt-optimization/` into `.claude/skills/` | thistleknot/skills | 73 |
