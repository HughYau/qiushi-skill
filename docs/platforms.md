# 平台支持

本项目的核心资产仍然是 `skills/`、`commands/`、`hooks/`，但从 `v1.3.0` 起，安装链路分成两层：

1. **标准入口**：`npx qiushi-skill install|validate|uninstall`
2. **平台原生入口**：Claude Code / OpenClaw / Hermes 各自的官方机制

| 平台 | 自动注入 | 手动命令 | 安装入口 | 推荐验证 |
|------|---------|---------|---------|---------|
| Claude Code | 支持 SessionStart hook | 支持 | `.claude-plugin/` + `.claude-plugin/marketplace.json` + `marketplace/claude` | `npx qiushi-skill validate` |
| Cursor | 支持插件元数据与 hook 文件 | 支持 | `.cursor-plugin/` 或 `npx qiushi-skill install --target cursor` | `npx qiushi-skill validate` |
| OpenClaw | 通过 Claude bundle 兼容层支持 | 支持 | `.openclaw/INSTALL.md` | `openclaw plugins list` + `npx qiushi-skill validate` |
| Hermes Agent | 通过原生 skills 目录支持 | 由 Hermes skills 暴露 | `.hermes/INSTALL.md` | `hermes skills list` + `npx qiushi-skill validate` |
| Codex | 不依赖插件壳 | 视宿主能力而定 | `.codex/INSTALL.md` | 按文档自检 |
| OpenCode | 不依赖插件壳 | 视宿主能力而定 | `.opencode/INSTALL.md` | 按文档自检 |
| nanobot | 通过工作区 skills 目录自动发现 | 视宿主能力而定 | `.nanobot/INSTALL.md` | 按文档自检 |
| 其他宿主 | 手动集成 | 视宿主能力而定 | 直接复用 `skills/` 和 `commands/` | 手动检查 |

## Claude Code

- 仓库根提供 `.claude-plugin/marketplace.json`
- 官方安装链路：
  - `/plugin marketplace add HughYau/qiushi-skill`
  - `/plugin install qiushi-skill@qiushi-skill`
- 仍保留源码方式：`claude --plugin-dir .`

## Cursor

- 可直接使用 `npx qiushi-skill install --target cursor`
- 也可手动复制 bundle 到你的 Cursor 插件目录
- `.cursor-plugin/plugin.json` 提供平台识别元数据

## OpenClaw

按 **2026-04-14** 查阅到的官方文档，OpenClaw 已支持把 Claude / Cursor / Codex bundles 映射成原生插件，并允许直接从 GitHub 仓库读取 marketplace。`qiushi-skill` 因此复用现有 `.claude-plugin/` 结构，不额外维护第二套插件元数据。

推荐命令：

```bash
openclaw plugins marketplace list HughYau/qiushi-skill
openclaw plugins install qiushi-skill --marketplace HughYau/qiushi-skill
openclaw plugins enable qiushi-skill
openclaw gateway restart
```

更多说明见 [README.openclaw.md](README.openclaw.md)。

## Hermes Agent

按 **2026-04-14** 查阅到的官方文档，Hermes 已提供原生 `skills` 目录与 `--toolsets "skills"` 机制。因此 `qiushi-skill` 在 Hermes 上采用标准 skills 安装，而不是把全部内容塞进常驻 prompt。

推荐步骤：

1. 复制 `skills/` 到 `~/.hermes/skills/qiushi-skill/`
2. 运行 `hermes skills list`
3. 启动：`hermes chat --toolsets "skills,terminal"`

更多说明见 [README.hermes.md](README.hermes.md)。

## nanobot

nanobot 通过工作区 skills 目录自动发现并加载 skill。将 `skills/` 目录复制到 nanobot 工作区即可完成接入。

推荐步骤：

1. 复制 `skills/` 到 `~/.nanobot/workspace/skills/`
   ```bash
   mkdir -p ~/.nanobot/workspace/skills
   cp -r skills/* ~/.nanobot/workspace/skills/
   ```
2. 新会话中 nanobot 会自动发现所有 skill
3. 当任务匹配某个方法论时，agent 会按需加载对应 `SKILL.md`

更多说明见 [README.nanobot.md](README.nanobot.md)。

## Windows

- `hooks/run-hook.cmd` 会优先执行 `hooks/session-start.ps1`
- 不再要求用户额外安装 Git Bash / WSL
- PowerShell 是 `SessionStart` 自动注入的首选路径

## macOS / Linux

- 使用 `hooks/session-start`
- 仅在直接运行 hook 或 legacy 验证脚本时需要可用的 `bash` 或 `sh`

## 命令层

- 仓库提供 `commands/*.md` 手动入口
- 支持 Markdown slash commands 的宿主可直接使用
- 不支持命令目录的宿主，可直接读取同名文件中的指令内容

## 验证建议

首选：

```bash
npx qiushi-skill validate
```

兜底：

```bash
bash tests/validate.sh
# 或 Windows
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```
