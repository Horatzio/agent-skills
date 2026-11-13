# Skillbook: Hosting simple websites with login on Cloudflare

Skills for hosting a simple static website on Cloudflare with a login in front of it — Pages hosting, Access login, Wrangler deploys, domains and TLS, security hardening, edge dynamics, and monitoring.

## Host a static site on Cloudflare Pages

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [cloudflare](https://github.com/cloudflare/skills) | Official platform router: discover and choose Cloudflare products, routes to the product skill. | copy `skills/cloudflare/` into `.claude/skills/` | cloudflare/skills | 91 |
| [cloudflare-deploy](https://github.com/openai/skills) | Deploy apps/infra to Cloudflare via Workers/Pages; 28k stars; per-skill LICENSE.txt, no repo licence. | copy `skills/.curated/cloudflare-deploy/` into `.claude/skills/` | openai/skills | 86 |
| [cloudflare-pages](https://github.com/aAAaqwq/AGI-Super-Team) | Deploy static sites to Pages with custom domains, CI/CD and rollbacks; 119 stars. | copy `skills/cloudflare-pages/` into `.claude/skills/` | aAAaqwq/AGI-Super-Team | 86 |
| [frameworks-on-cloudflare](https://github.com/cloudflare/skills) | Framework/SPA apps on Cloudflare via Workers Static Assets; thin router at 36 lines. | copy `skills/frameworks-on-cloudflare/` into `.claude/skills/` | cloudflare/skills | 84 |
| [cloudflare-pages-deploy](https://github.com/Mfrostbutter/claude-skills) | Headless Pages deploys with token auth, branch prod/preview, four gotchas; pushed Nov 2026. | copy `skills/cloudflare-pages-deploy/` into `.claude/skills/` | Mfrostbutter/claude-skills | 81 |
| [cloudflare-pages-ops](https://github.com/bm629/agent-skills) | Drive Pages hosting directly, CLI-first on Wrangler with REST fallback; headless, never wrangler login. | copy `skills/cloudflare-pages-ops/` into `.claude/skills/` | bm629/agent-skills | 81 |
| [cloudflare-static-site](https://github.com/dreamers-laboratory/useful-skills-playbook) | Plan/provision/deploy/audit a static site on Pages incl. DNS, redirects, S3→Pages moves. | copy `infrastructure/cloudflare-static-site/` into `.claude/skills/` | dreamers-laboratory/useful-skills-playbook | 81 |
| [cloudflare](https://github.com/flowcopilot/skills) | Modified vendored official router (inlined references, works standalone); 1 star. | copy `skills/cloudflare/` into `.claude/skills/` | flowcopilot/skills | 78 |
| [cloudflare](https://github.com/tdimino/claude-code-minoan) | Platform management via Wrangler/Agents SDK/Browser Rendering; Agents-SDK-heavy, Pages is a small part. | copy `skills/integration-automation/cloudflare/` into `.claude/skills/` | tdimino/claude-code-minoan | 74 |
| [smb-free-website](https://github.com/SMBexcel/free-ai-tools) | Scaffold/build/deploy a free static site, but Astro 6-specific; user has plain HTML. | copy `claude-skills/smb-free-website/` into `.claude/skills/` | SMBexcel/free-ai-tools | 74 |
| [cloudflare](https://github.com/johnnycuongn/mvp-stack-plugin) | Cloudflare as the $0 commercial MVP stack (Workers/Pages/D1/R2/KV, Wrangler, cost caps). | copy `skills/cloudflare/` into `.claude/skills/` | johnnycuongn/mvp-stack-plugin | 72 |
| [cloudflare-deploy](https://github.com/amsdamsgram/claude-skills) | Publish a static site to Pages behind an Access email login — the exact shape of the user's ask; no licence. | copy `plugins/cloudflare-deploy/skills/cloudflare-deploy/` into `.claude/skills/` | amsdamsgram/claude-skills | 72 |
| [cloudflare-commerce-deploy](https://github.com/jack-arturo/skillissue) | General Cloudflare app delivery (Pages/Workers, DNS, domains, secrets); commerce/AutoHub framing. | copy `skills/cloudflare-commerce-deploy/` into `.claude/skills/` | jack-arturo/skillissue | 71 |
| [Cloudflare](https://github.com/Steffen025/pai-opencode) | Deploy Workers/Pages via PAI skill; repo ARCHIVED Jun 2026; localhost-notify flag passed to safety. | copy `.opencode/skills/Utilities/Cloudflare/` into `.claude/skills/` | Steffen025/pai-opencode | 70 |

## Lock it with Cloudflare Access

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [cloudflare-one](https://github.com/cloudflare/skills) | Official Zero Trust / Access: design, configure, troubleshoot Access, incl. service tokens. | copy `skills/cloudflare-one/` into `.claude/skills/` | cloudflare/skills | 93 |
| [publishing-behind-cloudflare-access](https://github.com/wormeyman/wormeyman-skills) | Password-protect a static page/site for named people via Access; fail-closed, preview-URL coverage; pushed today. | copy `skills/publishing-behind-cloudflare-access/` into `.claude/skills/` | wormeyman/wormeyman-skills | 87 |
| [build-cloudflare-access-sso](https://github.com/yigitkonur/skills-by-yigitkonur) | Protect a subdomain with Access + Google SSO; lock the origin against Access bypass. | copy `skills/build-cloudflare-access-sso/` into `.claude/skills/` | yigitkonur/skills-by-yigitkonur | 83 |
| [cloudflare-one-migrations](https://github.com/cloudflare/skills) | Migration planning from VPN/SWG/SASE to Cloudflare One; user starts fresh, not migrating. | copy `skills/cloudflare-one-migrations/` into `.claude/skills/` | cloudflare/skills | 80 |
| [cloudflare-zt](https://github.com/chrishuffman5/domain-expert) | Broad Zero Trust expert (Access, Gateway, CASB, DLP); Access is one part; licence in frontmatter only. | copy `plugins/security/skills/cloudflare-zt/` into `.claude/skills/` | chrishuffman5/domain-expert | 75 |

## Deploy and manage with Wrangler

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [wrangler](https://github.com/cloudflare/skills) | Official Wrangler CLI: deploys, dev, previews, resource management. | copy `skills/wrangler/` into `.claude/skills/` | cloudflare/skills | 90 |
| [cf-cli](https://github.com/cloudflare/skills) | Official cf CLI (beta): API + Workers commands, DNS, zones, D1/KV/R2; choosing cf vs Wrangler. | copy `skills/cf-cli/` into `.claude/skills/` | cloudflare/skills | 86 |
| [cloudflare-app-bootstrap](https://github.com/cloudflare/skills) | Get a Workers app to a working local request (bindings, secrets, data); thin at 47 lines; not Pages/static. | copy `skills/cloudflare-app-bootstrap/` into `.claude/skills/` | cloudflare/skills | 80 |
| [cloudflare-deploy](https://github.com/nicolasdao/tattle) | Workers deploy + CI/CD (Actions / Workers Builds, deploy hooks); BSD-3-Clause. | copy `.agents/skills/cloudflare-deploy/` into `.claude/skills/` | nicolasdao/tattle | 74 |
| [cloudflare-deploy](https://github.com/SwapnilPopat/ai-assistant-skills) | Safe Wrangler 4.x deploys incl. Pages, gradual rollouts, one-command rollback; pushed May 2026. | copy `skills/api-key-required/cloudflare/cloudflare-deploy/` into `.claude/skills/` | SwapnilPopat/ai-assistant-skills | 73 |
| [wrangler](https://github.com/Dicklesworthstone/agent_flywheel_clawdbot_skills_and_integrations) | Wrangler deploy/manage for Workers, Pages, R2, D1, KV; 204 lines; no licence detected. | copy `skills/wrangler/` into `.claude/skills/` | Dicklesworthstone/agent_flywheel_clawdbot_skills_and_integrations | 72 |

## Domains, DNS and TLS

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [cloudflare-api](https://github.com/jezweb/claude-skills) | Cloudflare REST API directly: bulk DNS, custom hostnames, WAF rules, zone settings; 1111 stars. | copy `archive/plugins/cloudflare/skills/cloudflare-api/` into `.claude/skills/` | jezweb/claude-skills | 87 |
| [domains-dns](https://github.com/ericrisco/rsc-harness) | Point a domain at a host / fix broken HTTPS: nameservers, records, apex vs www, TLS cutover. | copy `skills/domains-dns/` into `.claude/skills/` | ericrisco/rsc-harness | 85 |
| [cloudflare-api](https://github.com/modbender/skill-library-mcp) | Cloudflare API for DNS/tunnels/zones via curl/jq; frontmatter name is `cloudflare`, not `cloudflare-api`. | copy `data/cloudflare-api/` into `.claude/skills/` | modbender/skill-library-mcp | 75 |
| [cloudflare-domains](https://github.com/zot24/skills) | Domain from search to serving on Cloudflare via the cf CLI (DNS, DNSSEC, HTTPS, redirects); no licence. | copy `skills/cloudflare-domains/skills/cloudflare-domains/` into `.claude/skills/` | zot24/skills | 70 |

## Secure the site

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [cloudflare-hardening](https://github.com/GoldenWing-360/claude-security-skills) | End-to-end hardening: DNS, origin-IP protection, WAF, bots, rate limiting, headers, Access for admin paths. | copy `cloudflare-hardening/` into `.claude/skills/` | GoldenWing-360/claude-security-skills | 84 |
| [cloudflare-workers-security](https://github.com/DrMxrcy/secaudit) | Deep security audit for Workers/Pages Functions: secrets, Access JWT verification, headers; 661 lines. | copy `skills/cloudflare-workers-security/` into `.claude/skills/` | DrMxrcy/secaudit | 83 |
| [turnstile-spin](https://github.com/cloudflare/skills) | Turnstile bot verification incl. server-side Siteverify; optional layer for a login-protected static site. | copy `skills/turnstile-spin/` into `.claude/skills/` | cloudflare/skills | 83 |
| [cloudflare-waf](https://github.com/chrishuffman5/domain-expert) | WAF expert: managed/custom rules, rate limiting, bot management, API Shield; licence in frontmatter only. | copy `plugins/security/skills/cloudflare-waf/` into `.claude/skills/` | chrishuffman5/domain-expert | 80 |
| [cloudflare-waf](https://github.com/tomz/agent-skills) | WAF and security: custom/managed rules, rate limiting, bot management, Turnstile; licence in frontmatter only. | copy `cloudflare-waf/` into `.claude/skills/` | tomz/agent-skills | 72 |
| [cloudflare-security](https://github.com/orocsy/dev-pipeline) | WAF custom rules, Bot Fight Mode, rate limiting, Page Rules, DNS, Authenticated Origin Pulls; no licence. | copy `skills/cloudflare-security/` into `.claude/skills/` | orocsy/dev-pipeline | 70 |

## Add dynamic behaviour on the edge

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [cloudflare](https://github.com/ericrisco/rsc-harness) | Edge platform skill: wrangler.jsonc bindings, storage choice, Worker/SPA via Static Assets. | copy `skills/cloudflare/` into `.claude/skills/` | ericrisco/rsc-harness | 85 |
| [workers-best-practices](https://github.com/cloudflare/skills) | Workers production best practices (writing, reviewing, configuring); 68 lines. | copy `skills/workers-best-practices/` into `.claude/skills/` | cloudflare/skills | 83 |
| [cloudflare-worker-builder](https://github.com/jezweb/claude-skills) | Scaffold/deploy Workers with Hono, Vite plugin, Static Assets; framework-flavoured. | copy `archive/plugins/cloudflare/skills/cloudflare-worker-builder/` into `.claude/skills/` | jezweb/claude-skills | 80 |
| [durable-objects](https://github.com/cloudflare/skills) | Durable Objects for persistent state/coordination; optional for a static site. | copy `skills/durable-objects/` into `.claude/skills/` | cloudflare/skills | 80 |
| [cloudflare-email-service](https://github.com/cloudflare/skills) | Email Sending/Routing implementation; official and complete, but email is not hosting or login. | copy `skills/cloudflare-email-service/` into `.claude/skills/` | cloudflare/skills | 77 |
| [cloudflare-workers](https://github.com/tenequm/skills) | Rapid Workers development (APIs, full-stack, edge, background jobs); archived location, internal:true. | copy `archive/cloudflare-workers/` into `.claude/skills/` | tenequm/skills | 76 |
| [cloudflare-durable-objects](https://github.com/secondsky/claude-skills) | Durable Objects for stateful coordination/realtime; optional for a static site. | copy `plugins/cloudflare-durable-objects/skills/cloudflare-durable-objects/` into `.claude/skills/` | secondsky/claude-skills | 74 |
| [cloudflare-cron-triggers](https://github.com/secondsky/claude-skills) | Cron Triggers for scheduled Workers; scheduling primitive, not site hosting. | copy `plugins/cloudflare-cron-triggers/skills/cloudflare-cron-triggers/` into `.claude/skills/` | secondsky/claude-skills | 72 |
| [cloudflare-d1](https://github.com/secondsky/claude-skills) | D1 serverless SQLite on the edge; optional backend for a static site. | copy `plugins/cloudflare-d1/skills/cloudflare-d1/` into `.claude/skills/` | secondsky/claude-skills | 72 |
| [cloudflare-kv](https://github.com/secondsky/claude-skills) | Workers KV global key-value storage; optional backend for a static site. | copy `plugins/cloudflare-kv/skills/cloudflare-kv/` into `.claude/skills/` | secondsky/claude-skills | 72 |
| [cloudflare-r2](https://github.com/secondsky/claude-skills) | R2 S3-compatible object storage; optional backend for a static site. | copy `plugins/cloudflare-r2/skills/cloudflare-r2/` into `.claude/skills/` | secondsky/claude-skills | 72 |
| [cloudflare-workflows](https://github.com/secondsky/claude-skills) | Workflows for durable long-running execution; optional backend for a static site. | copy `plugins/cloudflare-workflows/skills/cloudflare-workflows/` into `.claude/skills/` | secondsky/claude-skills | 72 |
| [web-artifacts-builder](https://github.com/anthropics/skills) | Builds HTML artifacts for claude.ai, not Cloudflare hosting; in on mechanicals only — relevance is the lowest finalist. | marketplace install, or copy `skills/web-artifacts-builder/` into `.claude/skills/` | anthropics/skills | 71 |

## Monitor, debug and roll back

| Skill | What to use it for | How to load | Source | Fit |
|---|---|---|---|---|
| [workers-development](https://github.com/cloudflare/skills) | Run/inspect/debug Workers locally and in production; thin at 25 lines, retrieval-based. | copy `skills/workers-development/` into `.claude/skills/` | cloudflare/skills | 81 |
| [web-perf](https://github.com/cloudflare/skills) | Performance audit, Core Web Vitals, Lighthouse; adjacent to monitoring, not hosting. | copy `skills/web-perf/` into `.claude/skills/` | cloudflare/skills | 80 |
| [performance-optimization](https://github.com/addyosmani/agent-skills) | Performance optimisation incl. Core Web Vitals; adjacent — performance of a hosted site, not hosting. | `npx skills add addyosmani/agent-skills --skill performance-optimization` | addyosmani/agent-skills | 78 |
| [workers-profiling](https://github.com/cloudflare/skills) | Profile/debug CPU and memory in deployed Workers/DOs; niche for a static site. | copy `skills/workers-profiling/` into `.claude/skills/` | cloudflare/skills | 78 |
| [webapp-testing](https://github.com/anthropics/skills) | Tests local web apps with Playwright; adjacent — useful for checking a deployed site, not hosting it. | marketplace install, or copy `skills/webapp-testing/` into `.claude/skills/` | anthropics/skills | 73 |
| [oc-deploy-ops](https://github.com/ainatx/opchain) | Deploy pipeline (audit gate, staging, prod, monitor) for Workers + D1 + Pages; built for the acme-core monorepo. | copy `skills/oc-deploy-ops/` into `.claude/skills/` | ainatx/opchain | 71 |
| [cloudflare-pages-gotchas](https://github.com/jackson2w/claude-code-skills) | Four real Pages + Wrangler gotchas: Images binding, env blocks, PBKDF2 cap, _redirects vs Functions. | copy `cloudflare-pages-gotchas/` into `.claude/skills/` | jackson2w/claude-code-skills | 70 |
