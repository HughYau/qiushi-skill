<p align="center">
  <img src="https://raw.githubusercontent.com/HughYau/qiushi-skill/main/assets/logo_main.png" width="400"/>
</p>

# Qiushi Skill: 'Seeking Truth' Skills for AI Agents

<p align="center">
  <strong>Languages</strong>:
  <a href="./README.md">简体中文</a> |
  <a href="./README.en.md">English</a>
</p>

> Build agents that investigate first, focus on the main contradiction, validate in practice, and keep pushing until the work is actually done.

`qiushi-skill` is a collection of reusable methodology skills, commands, and session-start hooks. It turns a set of problem-solving methods into installable assets for Claude Code, Cursor, Codex, OpenCode, OpenClaw, Hermes Agent, and other prompt-driven hosts.

## Why This Exists

Many agents can generate text, but they still fail at disciplined work:

- they answer before collecting facts
- they scatter effort across too many tasks
- they stop at the first blocker
- they skip verification and call that "done"

`qiushi-skill` is meant to correct that with one core principle and nine concrete methods:

- `seeking truth from facts` as the governing principle
- contradiction analysis
- practice -> cognition -> practice iteration
- investigation first
- mass line feedback synthesis
- criticism and self-criticism
- protracted strategy
- concentrate forces
- spark a prairie fire
- overall planning


> Support author's other repo!: **[AcademicForge](https://github.com/HughYau/AcademicForge)**: **One Forge, All Skills.** An interactive, cross-platform tool to generate simple, one-click installation commands for multiple AI Agent Skills. 

## Install

### Preferred: `npx qiushi-skill`

```bash
npx qiushi-skill
```

Interactive by default: it detects installed hosts and copies into the right directories. Non-interactive:

```bash
npx qiushi-skill install --target claude-code --scope user
npx qiushi-skill install --target all --scope user
npx qiushi-skill uninstall --target claude-code
```

The CLI is zero-dependency, writes a `.qiushi-skill-install.json` manifest per target so uninstall only removes what it installed, and ships `validate` for self-checks.

### Claude Code Official Marketplace

This repository now ships `.claude-plugin/marketplace.json`, so Claude Code can discover it directly from GitHub:

```text
/plugin marketplace add HughYau/qiushi-skill
/plugin install qiushi-skill@qiushi-skill
```

### Source Install

```bash
git clone https://github.com/HughYau/qiushi-skill
cd qiushi-skill
claude --plugin-dir .
```

### Other Hosts

The same CLI targets Cursor, Codex, OpenCode, OpenClaw, Hermes Agent, and nanobot (`--target cursor|codex|opencode|openclaw|hermes|nanobot|all`). Any host that reads Markdown skills can also just copy the `skills/` directory. Target paths and native entrypoints are listed in [`docs/platforms.md`](https://github.com/HughYau/qiushi-skill/blob/main/docs/platforms.md).

## Validate

Preferred:

```bash
npx qiushi-skill validate
```

If you are working from a source checkout, legacy fallback scripts are also available:

```bash
bash tests/validate.sh
# or on Windows
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

Validation checks:

- JSON validity, including `.claude-plugin/marketplace.json`
- version consistency between `package.json` and marketplace metadata
- presence of CLI files, hooks, commands, and the marketplace bundle
- frontmatter completeness for skills, commands, and agents
- local Markdown link integrity

## How to Use It

The session-start entry skill is `skills/arming-thought/SKILL.md`, a ~50-line always-on kernel. Its job is intentionally narrow:

1. enforce `seeking truth from facts` through four hard rules: claims follow evidence, separate fact / inference / unknown, verified means done, diagnose before giving up
2. route to a downstream skill only when it clearly helps; direct-execution tasks trigger nothing
3. defer to the host's own plan / review / todo flows when they exist

Every method skill keeps only five sections: **use / don't use** (trigger boundary), **procedure** (concrete actions), **output template** (an observable artifact), **discipline** (hard constraints), and **handoff** (which skill usually comes next). Original quotations and lookup guides live in sibling files and are loaded on demand.

Two host-discoverable sub-agents live in `agents/`: `investigator` (read-only, returns a fact / inference / unknown ledger) and `self-critic` (fresh-context reviewer that reads artifacts, not narratives).

Manual command entrypoints live in `commands/*.md` for hosts that support Markdown slash commands.

## Project Layout

```text
qiushi-skill/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .cursor-plugin/plugin.json
├── bin/                 # npx qiushi-skill CLI
├── skills/              # entry kernel + nine method skills + workflows
├── commands/            # manual slash-command entrypoints
├── hooks/               # SessionStart injection (POSIX + PowerShell)
├── agents/              # investigator, self-critic
├── docs/                # site page + platforms.md
├── CHANGELOG.md
├── README.md
└── README.en.md
```

## License

MIT
