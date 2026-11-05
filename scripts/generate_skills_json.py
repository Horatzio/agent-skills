#!/usr/bin/env python3
"""Regenerate docs/skills.json from REFERENCES.md + skills/ on main.

Usage: python scripts/generate_skills_json.py   (run from the repo root)

Rules (see LOADING.md):
- Referenced skills come from the tables in REFERENCES.md: the skill name and
  tree URL from the Skill column, source_repo from the Repository column, and
  the load string from the How to load column. The raw URL is the tree URL
  converted to raw.githubusercontent.com form plus /SKILL.md.
- Local skills are every directory under skills/ containing a SKILL.md:
  type "local", source_repo "Horatzio/agent-skills", load via npx skills add.
- A local skill wins on a name clash with a reference.
- Output keys are sorted; formatting is json.dump with indent=2.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
REFERENCES = ROOT / "REFERENCES.md"
SKILLS_DIR = ROOT / "skills"
OUTPUT = ROOT / "docs" / "skills.json"

LOCAL_REPO = "Horatzio/agent-skills"

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


def main() -> int:
    skills = referenced_skills()
    skills.update(local_skills())  # local wins on a clash
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
    return 0


if __name__ == "__main__":
    sys.exit(main())
