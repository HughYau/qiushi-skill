# 平台接入

核心资产只有三样：`skills/`、`commands/`、`hooks/`。任何能读 Markdown skill 的宿主都能用；下面只说每个平台把文件放到哪里。

## 一条命令装到任何平台

```bash
npx qiushi-skill                      # 交互式，自动检测已安装的宿主
npx qiushi-skill install --target <platform> --scope user|project
npx qiushi-skill uninstall --target <platform>
npx qiushi-skill validate
```

| `--target` | 复制内容 | 用户级目标目录 |
|---|---|---|
| `claude-code` | 完整 plugin bundle（skills、commands、agents、hooks） | `~/.claude/plugins/qiushi-skill` |
| `cursor` | 完整 plugin bundle | `~/.cursor/plugins/qiushi-skill` |
| `codex` | `skills/*` | `~/.codex/skills`（或 `$CODEX_HOME/skills`） |
| `opencode` | `skills/*` + `commands/*.md` | `~/.config/opencode/skills` 与 `~/.config/opencode/commands` |
| `openclaw` | `skills/*` | `~/.openclaw/skills/qiushi-skill` |
| `hermes` | `skills/*` | `~/.hermes/skills/qiushi-skill` |
| `nanobot` | `skills/*` | `~/.nanobot/workspace/skills` |
| `all` | 以上全部 | |

`--scope project` 改为写入当前目录下对应的 `.claude/`、`.cursor/`、`.codex/`、`.opencode/`、`.hermes/`、`.nanobot/` 或 `skills/`。每个目标目录都会写入 `.qiushi-skill-install.json`，卸载时只删除 CLI 管理过的文件。

## 平台原生入口

- **Claude Code**：`/plugin marketplace add HughYau/qiushi-skill` 然后 `/plugin install qiushi-skill@qiushi-skill`；源码方式 `claude --plugin-dir .`。SessionStart hook 会自动注入入口 skill。
- **OpenClaw**：也可走其 marketplace：`openclaw plugins install qiushi-skill --marketplace HughYau/qiushi-skill`，然后 `openclaw plugins enable qiushi-skill`。
- **Hermes Agent**：安装后 `hermes skills list` 确认，启动时带上 `--toolsets "skills,terminal"`。
- **其他宿主**：把 `skills/` 下的目录复制到宿主的 skills 目录即可；支持 Markdown slash command 的宿主再复制 `commands/`。

## 没有 Node.js 时

直接复制目录即可：

```bash
cp -R skills/* <宿主的 skills 目录>/
```

Windows 上 `hooks/run-hook.cmd` 会优先执行 `hooks/session-start.ps1`，不需要 Git Bash 或 WSL。仓库自检可用 `tests/validate.sh` 或 `tests/validate.ps1`。
