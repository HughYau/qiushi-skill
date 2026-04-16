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

Non-interactive examples:

```bash
npx qiushi-skill install --target claude-code --scope user
npx qiushi-skill install --target claude-code,cursor --scope project
npx qiushi-skill install --target openclaw
npx qiushi-skill validate
npx qiushi-skill uninstall --target claude-code --scope user
```

The CLI is zero-dependency and does four things:

- installs standard plugin bundles only for Claude Code and Cursor
- prints setup guidance for OpenClaw, Hermes, Codex, and OpenCode instead of pretending to auto-install them
- validates the current checkout or published bundle with one Node-based code path
- keeps `install`, `validate`, and `uninstall` under one stable entrypoint

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

### Platform Notes

- Claude Code: use the GitHub marketplace flow above, or `npx qiushi-skill install --target claude-code`.
- Cursor: use `npx qiushi-skill install --target cursor`, or copy the bundle to your configured plugins directory.
- Codex: see [`.codex/INSTALL.md`](.codex/INSTALL.md).
- OpenCode: see [`.opencode/INSTALL.md`](.opencode/INSTALL.md).
- OpenClaw: see [`.openclaw/INSTALL.md`](.openclaw/INSTALL.md).
- Hermes Agent: see [`.hermes/INSTALL.md`](.hermes/INSTALL.md).

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
- presence of CLI files, hooks, commands, packaged platform guides, and the isolated marketplace bundle
- frontmatter completeness for skills, commands, and agents
- local Markdown link integrity

## How to Use It

The session-start entry skill is `skills/arming-thought/SKILL.md`. Its job is intentionally narrow:

1. enforce `seeking truth from facts`
2. choose downstream skills only when they clearly help
3. avoid loading every method by default

Manual command entrypoints live in `commands/*.md` for hosts that support Markdown slash commands.

## Platforms

- Claude Code: official marketplace + automatic SessionStart injection + commands
- Cursor: bundle metadata + commands + standard CLI install path
- OpenClaw: can map Claude/Cursor/Codex bundles into native OpenClaw plugins
- Hermes Agent: native `skills` directory and CLI/toolset workflow
- Codex: document-based setup
- OpenCode: document-based setup
- Generic hosts: reuse `skills/` and `commands/`

## Project Layout

```text
qiushi-skill/
├── .claude-plugin/
│   ├── marketplace.json
│   └── plugin.json
├── .cursor-plugin/plugin.json
├── .codex/INSTALL.md
├── .opencode/INSTALL.md
├── .openclaw/INSTALL.md
├── .hermes/INSTALL.md
├── bin/
├── skills/
├── commands/
├── hooks/
├── agents/
├── docs/
├── CHANGELOG.md
├── README.md
└── README.en.md
```

## License

MIT
