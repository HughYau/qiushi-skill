# OpenClaw 使用说明

截至 **2026-04-30**，OpenClaw 官方文档支持 `~/.openclaw/skills` managed/local skills，也支持把 Claude / Cursor / Codex bundles 映射为原生 OpenClaw 插件。因此 `qiushi-skill` 默认用 CLI 安装 skills；需要 marketplace 时仍可复用现有 Claude bundle。

## 快速开始

1. 运行 `npx qiushi-skill install --target openclaw --scope user`。
2. 新开一个会话，检查 `arming-thought` 是否作为入口方法论被加载。
3. 如果你要使用插件 marketplace，改走 `openclaw plugins install qiushi-skill --marketplace HughYau/qiushi-skill`。

## 为什么仍保留 marketplace 文档

- 仓库已经有 `.claude-plugin/plugin.json`
- `v1.3.0` 新增 `.claude-plugin/marketplace.json`
- OpenClaw 现有 bundle 兼容层已经能消费这套结构
- 有些用户希望用 OpenClaw 自己的插件生命周期管理 bundle

CLI 直接安装 skills 是最短路径；marketplace 是平台原生插件管理路径。

## 验证

- `~/.openclaw/skills/qiushi-skill/arming-thought/SKILL.md` 存在，或 `openclaw plugins list` 能看到 `qiushi-skill`
- 用一个简单 case 触发方法论 skill
- 仓库级自检可运行 `npx qiushi-skill validate`

更多细节见 [`.openclaw/INSTALL.md`](../.openclaw/INSTALL.md)。
