#!/usr/bin/env python3
"""Regenerate docs/skills.json and docs/skillbooks.json from REFERENCES.md,
skills/ and skillbooks/ on main.

Usage: python scripts/generate_skills_json.py   (run from the repo root)

Rules (see LOADING.md):
- Referenced skills come from the tables in REFERENCES.md: the skill name and
  tree URL from the Skill column, source_repo from the Repository column, and
  the load string from the How to load column. The raw URL is the tree URL
  converted to raw.githubusercontent.com form plus /SKILL.md.
- Local skills are every directory under skills/ containing a SKILL.md:
  type "local", source_repo "Horatzio/agent-skills", load via npx skills add.
- A local skill wins on a name clash with a reference.
- Every entry gets an "emoji" from the EMOJI map below (shown on the skill
  cards in docs/load.html). Unmapped names get a sparkle and a warning so
  the gap is visible at generation time — add the emoji here, not in
  skills.json by hand, or the next regeneration wipes it.
- Skillbooks are every skillbooks/*.md except README.md: name from the
  filename, title and description from the file ("# Skillbook: <area>" plus
  the first non-empty line after it), url the GitHub blob URL.
- Output keys are sorted; formatting is json.dump with indent=2.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REFERENCES = ROOT / "REFERENCES.md"
SKILLS_DIR = ROOT / "skills"
SKILLBOOKS_DIR = ROOT / "skillbooks"
OUTPUT = ROOT / "docs" / "skills.json"
BOOKS_OUTPUT = ROOT / "docs" / "skillbooks.json"

LOCAL_REPO = "Horatzio/agent-skills"

# One emoji per skill, shown on the cards in docs/load.html. Covers the
# current registry plus skills with open PRs (redpen, i-have-adhd) so they
# get an emoji as soon as the registry regenerates after their merge.
EMOJI = {
    "algorithmic-art": "🎨",
    "chief-of-staff": "🗂️",
    "clarify": "🔍",
    "claude-handoff": "🤝",
    "code-simplification": "✂️",
    "context-engineering": "🧩",
    "doc-coauthoring": "✍️",
    "effort": "⚡",
    "grill": "🔥",
    "grill-me": "❓",
    "grill-with-docs": "📄",
    "grilling": "🍖",
    "handoff": "📤",
    "i-have-adhd": "🧠",
    "idea-refine": "💡",
    "interview-me": "🎤",
    "lay-foundation": "🧱",
    "performance-optimization": "🚀",
    "prototype": "🧪",
    "redpen": "🖊️",
  "reminder": "🔔",
    "research": "🔬",
    "retro": "🔄",
    "security-and-hardening": "🛡️",
    "skill-creator": "🛠️",
    "skill-scout": "🧭",
    "system1-rubric": "📋",
    "teach": "🎓",
    "theme-factory": "🌌",
    "using-agent-skills": "📖",
    "wait-what": "🤔",
    "web-artifacts-builder": "🏗️",
    "wizard": "🧙",
    "writing-for-agents": "📝",
}

# A skill row: | [name](https://github.com/<owner>/<repo>/tree/<branch>/<path>) | <repo> | <load> |
ROW_RE = re.compile(
    r"^\|\s*\[(?P<name>[^\]]+)\]\((?P<url>https://github\.com/[^)]+/tree/[^)]+)\)"
    r"\s*\|\s*(?P<repo>[^|]+?)\s*\|\s*(?P<load>[^|]+?)\s*\|"
)


def tree_to_raw(url: str) -> str:
    """https://github.com/o/r/tree/BRANCH/path -> https://raw.githubusercontent.com/o/r/BRANCH/path/SKILL.md"""
    m = re.match(r"https://github\.com/(?P<owner>[^/]+)/(?P<repo>[^/]+)/tree/(?P<branch>[^/]+)/(?P<path>.+)$", url)
    if not m:
        raise ValueError(f"Not a tree URL: {url}")
    return (
        f"https://raw.githubusercontent.com/{m['owner']}/{m['repo']}/"
        f"{m['branch']}/{m['path']}/SKILL.md"
    )


def referenced_skills() -> dict:
    skills = {}
    for line in REFERENCES.read_text().splitlines():
        m = ROW_RE.match(line.strip())
        if not m:
            continue
        name = m["name"].strip()
        source_url = m["url"].strip()
        skills[name] = {
            "type": "reference",
            "source_repo": m["repo"].strip(),
            "source_url": source_url,
            "raw_url": tree_to_raw(source_url),
            "load": m["load"].strip(),
        }
    return skills


def local_skills() -> dict:
    skills = {}
    for d in sorted(SKILLS_DIR.iterdir()):
        if not d.is_dir() or not (d / "SKILL.md").exists():
            continue
        name = d.name
        skills[name] = {
            "type": "local",
            "source_repo": LOCAL_REPO,
            "source_url": f"https://github.com/{LOCAL_REPO}/tree/main/skills/{name}",
            "raw_url": f"https://raw.githubusercontent.com/{LOCAL_REPO}/main/skills/{name}/SKILL.md",
            "load": f"npx skills add {LOCAL_REPO} --skill {name}",
        }
    return skills


def skillbooks() -> dict:
    books = {}
    if not SKILLBOOKS_DIR.is_dir():
        return books
    for f in sorted(SKILLBOOKS_DIR.glob("*.md")):
        if f.name == "README.md":
            continue
        lines = [ln.strip() for ln in f.read_text().splitlines()]
        title = next((ln[12:].strip() for ln in lines if ln.startswith("# Skillbook: ")), f.stem)
        try:
            h1 = next(i for i, ln in enumerate(lines) if ln.startswith("# Skillbook: "))
        except StopIteration:
            h1 = 0
        desc = next((ln for ln in lines[h1 + 1:] if ln), "")
        books[f.stem] = {
            "title": title,
            "description": desc,
            "url": f"https://github.com/{LOCAL_REPO}/blob/main/skillbooks/{f.name}",
        }
    return books


def main() -> int:
    skills = referenced_skills()
    skills.update(local_skills())  # local wins on a clash
    for name, entry in skills.items():
        if name not in EMOJI:
            print(f"WARNING: no emoji for {name} (using ✨; add it to EMOJI)", file=sys.stderr)
        entry["emoji"] = EMOJI.get(name, "✨")
    registry = {
        "version": 1,
        "generated_from": f"REFERENCES.md + skills/ on main of {LOCAL_REPO}",
        "note": "Local skills win on name clashes (see LOADING.md). Regenerate when REFERENCES.md or skills/ changes.",
        "skills": {name: skills[name] for name in sorted(skills)},
    }
    OUTPUT.write_text(json.dumps(registry, indent=2) + "\n")
    n_ref = sum(1 for s in skills.values() if s["type"] == "reference")
    n_local = sum(1 for s in skills.values() if s["type"] == "local")
    print(f"Wrote {OUTPUT} ({len(skills)} skills: {n_local} local, {n_ref} referenced)")
    books = skillbooks()
    books_doc = {
        "version": 1,
        "generated_from": f"skillbooks/ on main of {LOCAL_REPO}",
        "note": "One entry per skillbook file (README.md excluded). Regenerate when skillbooks/ changes.",
        "skillbooks": {name: books[name] for name in sorted(books)},
    }
    BOOKS_OUTPUT.write_text(json.dumps(books_doc, indent=2) + "\n")
    print(f"Wrote {BOOKS_OUTPUT} ({len(books)} skillbooks)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
