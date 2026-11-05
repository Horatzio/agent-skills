# Skillbook: ThreeJS interactive visualizer — a net of stars in space

Skills for building a ThreeJS interactive visualizer: a net of stars in space, shifting and moving around. Aesthetic: glory, misty.

## ThreeJS/WebGL scene setup & rendering

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [threejs-fundamentals](https://github.com/CloudAI-X/threejs-skills/tree/main/skills/threejs-fundamentals) | Scene, fog, cameras, renderer/tone mapping, animation loop, cleanup — verified against three@0.186.1 | `npx skills add CloudAI-X/threejs-skills --skill threejs-fundamentals` | CloudAI-X/threejs-skills | 95 |
| [threejs-particle-canvas](https://github.com/dcs-scd/claude-code-minoan/blob/HEAD/skills/design-media/threejs-particle-canvas/SKILL.md) | Interactive particle canvases — star fields, connection threads, fog, narrative phase cycles — as one self-contained HTML file. Cosmic preset (nebula → collapse → ignition → orbit → expansion); `starCount`, `threadCount`, `fogDensity` | Copy the SKILL.md into your skills directory | dcs-scd/claude-code-minoan | 84 |
| [source-driven-development](https://github.com/addyosmani/agent-skills/tree/main/skills/source-driven-development) | Ground Three.js version/API choices (fog, PointsMaterial, additive blending) in the official docs, with citations, instead of recalled API | `npx skills add addyosmani/agent-skills --skill source-driven-development` | addyosmani/agent-skills | 82 |
| [interactive-3d-web](https://github.com/washingtoneimae-dot/agent/blob/HEAD/skills-library/creative/interactive-3d-web/SKILL.md) | Full production 3D stack — Three.js v170+, GLSL shaders, physics — with a self-contained-HTML pattern | Copy the SKILL.md into your skills directory | washingtoneimae-dot/agent | 79 |
| [incremental-implementation](https://github.com/addyosmani/agent-skills/tree/main/skills/incremental-implementation) | Build in thin vertical slices (scene → stars → motion → fog/glow → interaction), verifying each | `npx skills add addyosmani/agent-skills --skill incremental-implementation` | addyosmani/agent-skills | 76 |
| [threejs](https://github.com/mvmsolo/mvmcmd/blob/HEAD/.grok/skills/threejs/SKILL.md) | Vendors the official Three.js LLM docs pack (llms-full.txt) — guards against outdated APIs. Written for a TanStack Start + React workspace; translate patterns for standalone HTML | Copy the SKILL.md into your skills directory | mvmsolo/mvmcmd | 72 |
| [webgl](https://github.com/lteemu/agentic-workshop/blob/HEAD/.opencode/skills/webgl/SKILL.md) | Scene setup, ShaderMaterial, UnrealBloomPass, GPU particles, hard performance budget (draw calls <100, 60fps) | Copy the SKILL.md into your skills directory | LTeemu/agentic-workshop | 71 |

## Creative/generative visuals

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [threejs-animation](https://github.com/CloudAI-X/threejs-skills/tree/main/skills/threejs-animation) | Keyframes, AnimationMixer, skeletal/morph animation, blending — the shifting/moving layer | `npx skills add CloudAI-X/threejs-skills --skill threejs-animation` | CloudAI-X/threejs-skills | 87 |
| [algorithmic-art](https://github.com/anthropics/skills/tree/main/skills/algorithmic-art) | Seeded generative art with p5.js — the generative approach to star fields and motion | Anthropic short form (marketplace install, or copy `skills/algorithmic-art/` into `.claude/skills/`) | anthropics/skills | 84 |
| [particle-system](https://github.com/iart-ai/webgl-animation-skills/tree/main/skills/particle-system) | Flow fields, curl noise, connected-dot networks, GPU Points shaders. "Build a connected-dot constellation background that stays fast with 2000 particles" — literally the star-net | `npx skills add iart-ai/webgl-animation-skills --skill particle-system` | iart-ai/webgl-animation-skills | 83 |
| [idea-refine](https://github.com/addyosmani/agent-skills/tree/main/skills/idea-refine) | "Glory, misty" is a vibe, not a spec — sharpen the visual direction (palette, density, drift) before building | `npx skills add addyosmani/agent-skills --skill idea-refine` | addyosmani/agent-skills | 82 |
| [globe-particles](https://github.com/MengTo/Skills/blob/bdf0e83c5d12c84229b4f9c6524900aca65e44b8/agent-skills/web-design/globe-particles/SKILL.md) | Dense luminous spherical particle core + orbital ring, additive blending, pointer-driven tilt. Scoped to globe visuals — a pattern to adapt, not a drop-in star-net | Copy the SKILL.md into your skills directory | MengTo/Skills | 74 |

## Shaders & effects (fog, bloom, glow, mist)

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [threejs-shaders](https://github.com/CloudAI-X/threejs-skills/tree/main/skills/threejs-shaders) | Custom GLSL vertex/fragment shaders, ShaderMaterial, shader chunks, TSL/node materials — the glow/fog implementation layer | `npx skills add CloudAI-X/threejs-skills --skill threejs-shaders` | CloudAI-X/threejs-skills | 94 |
| [threejs-postprocessing](https://github.com/CloudAI-X/threejs-skills/tree/main/skills/threejs-postprocessing) | EffectComposer, built-in renderer effects, WebGPU RenderPipeline — the bloom/glow engine behind the "glory" look | `npx skills add CloudAI-X/threejs-skills --skill threejs-postprocessing` | CloudAI-X/threejs-skills | 91 |
| [webgl-experience](https://github.com/nexu-io/open-design/tree/main/design-templates/webgl-experience) | Single self-contained `index.html`, real-time WebGL2, fragment-shader fields (domain-warped fbm noise, flow fields), aurora-field reference — the closest match to "misty". Raw WebGL, not Three.js: a complementary route | `npx skills add nexu-io/open-design/webgl-experience` | nexu-io/open-design | 81 |
| [shader-dev](https://github.com/amirrezafarnamtaheri/penguin-harness-fork/blob/HEAD/.agents/skills/shader-dev/SKILL.md) | 36 GLSL techniques incl. volumetric fog/clouds, bloom, particle systems, atmospheric scattering — the "misty/glory" effects, with WebGL2 adaptation rules | Copy the SKILL.md into your skills directory | AmirrezaFarnamTaheri/penguin-harness-fork | 77 |
| [frontend-design](https://github.com/anthropics/skills/tree/main/skills/frontend-design) | Distinctive UI visual design and typography for the page around the canvas | Anthropic short form (marketplace install, or copy `skills/frontend-design/` into `.claude/skills/`) | anthropics/skills | 75 |

## Interaction

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [threejs-interaction](https://github.com/CloudAI-X/threejs-skills/tree/main/skills/threejs-interaction) | Raycasting, camera controls, transform gizmos, drag/box selection, pointer events and hover states | `npx skills add CloudAI-X/threejs-skills --skill threejs-interaction` | CloudAI-X/threejs-skills | 88 |
| [frontend-ui-engineering](https://github.com/addyosmani/agent-skills/tree/main/skills/frontend-ui-engineering) | The interactive chrome around the canvas — responsive layout, controls, accessibility | `npx skills add addyosmani/agent-skills --skill frontend-ui-engineering` | addyosmani/agent-skills | 77 |

## Publishing as a web artifact/page

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [web-artifacts-builder](https://github.com/anthropics/skills/tree/main/skills/web-artifacts-builder) | Builds multi-component HTML artifacts with React/Tailwind — the publishing route | Anthropic short form (marketplace install, or copy `skills/web-artifacts-builder/` into `.claude/skills/`) | anthropics/skills | 87 |
| [browser-testing-with-devtools](https://github.com/addyosmani/agent-skills/tree/main/skills/browser-testing-with-devtools) | Test the live visualizer in a real browser and profile frame rate via DevTools | `npx skills add addyosmani/agent-skills --skill browser-testing-with-devtools` | addyosmani/agent-skills | 80 |
| [webapp-testing](https://github.com/anthropics/skills/tree/main/skills/webapp-testing) | Verify the finished artifact actually renders, via Playwright screenshots | Anthropic short form (marketplace install, or copy `skills/webapp-testing/` into `.claude/skills/`) | anthropics/skills | 77 |
| [prototype](https://github.com/mattpocock/skills/tree/main/skills/engineering/prototype) | Throwaway prototype to answer a design question before committing to the full build | Matt short form (`claude plugin install mattpocock-skills@claude-plugins-official`, invoke `/prototype`) | mattpocock/skills | 74 |

## Performance & code quality

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [performance-optimization](https://github.com/addyosmani/agent-skills/tree/main/skills/performance-optimization) | Measure-first performance optimisation, incl. Core Web Vitals — the frame-rate discipline for a 60fps visualizer | `npx skills add addyosmani/agent-skills --skill performance-optimization` | addyosmani/agent-skills | 81 |
| [three-best-practices](https://github.com/goriant-studio/goriant-blog/blob/HEAD/.agents/skills/three-best-practices/SKILL.md) | 120+ prioritised Three.js performance rules (three 0.182.0), incl. shader, TSL, and selective-bloom post-processing rules | Copy the SKILL.md into your skills directory | goriant-studio/goriant-blog | 76 |
| [diagnosing-bugs](https://github.com/mattpocock/skills/tree/main/skills/engineering/diagnosing-bugs) | The loop for when the animation stutters, stars vanish, or frame rate tanks | Matt short form (`claude plugin install mattpocock-skills@claude-plugins-official`, invoke `/diagnosing-bugs`) | mattpocock/skills | 76 |
| [code-simplification](https://github.com/addyosmani/agent-skills/tree/main/skills/code-simplification) | Simplify code for clarity without changing behaviour | `npx skills add addyosmani/agent-skills --skill code-simplification` | addyosmani/agent-skills | 70 |
| [code-review-and-quality](https://github.com/addyosmani/agent-skills/tree/main/skills/code-review-and-quality) | Multi-axis code review before the visualizer ships | `npx skills add addyosmani/agent-skills --skill code-review-and-quality` | addyosmani/agent-skills | 70 |
