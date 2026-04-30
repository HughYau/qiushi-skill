# qiushi-skill for OpenClaw

按 **2026-04-30** 查阅到的 OpenClaw 官方文档，OpenClaw 可以直接扫描 `~/.openclaw/skills`，也可以把 Claude / Cursor / Codex bundles 映射成原生 OpenClaw 插件，并支持直接从 GitHub 仓库读取 marketplace。

## 推荐路径：直接安装 skills

```bash
npx qiushi-skill install --target openclaw --scope user
```

CLI 会复制到 `~/.openclaw/skills/qiushi-skill/` 分组下。

## 可选路径：走 GitHub marketplace

```bash
openclaw plugins marketplace list HughYau/qiushi-skill
openclaw plugins install qiushi-skill --marketplace HughYau/qiushi-skill
openclaw plugins enable qiushi-skill
openclaw gateway restart
```

如果你的安装已经默认启用插件，可跳过 `enable`；如果网关已在新版本中支持热更新，可按你的实际版本行为调整是否重启。

## 本仓库如何被 OpenClaw 识别

1. `.claude-plugin/marketplace.json` 让 GitHub 仓库可被 marketplace 直接发现。
2. `.claude-plugin/plugin.json` 和 `hooks/`、`commands/`、`skills/` 共同构成 Claude-compatible bundle。
3. OpenClaw 会把这类 bundle 映射到自己的插件模型中使用。

## 验证

1. 运行 `openclaw plugins list`，确认 `qiushi-skill` 已安装并启用。
2. 新开一个会话，检查入口 skill 是否把 `arming-thought` 注入到方法论路由中。
3. 用一个简单 case 验证方法论触发，例如：

```text
请用矛盾分析法拆解“如何把一个单人开源项目演进成成熟社区项目”。
```

4. 如需验证仓库本身是否完整，运行：

```bash
npx qiushi-skill validate
```
