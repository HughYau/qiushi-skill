# Hermes Agent 使用说明

截至 **2026-04-30**，Hermes Agent 官方文档已经提供原生 `skills` 目录和 `hermes skills list` / `hermes chat --toolsets "skills"` 工作流。因此 `qiushi-skill` 在 Hermes 上不再以“没有 skills 系统”为前提，而是直接对接官方 skills 机制。

## 快速开始

1. 运行 `npx qiushi-skill install --target hermes --scope user`
2. 运行 `hermes skills list`，确认新技能被发现
3. 启动会话：`hermes chat --toolsets "skills,terminal"`
4. 先让会话吸收 `arming-thought` 的总原则，再按需触发具体方法论

## 推荐使用方式

- 入口 skill：`skills/arming-thought/SKILL.md`
- 单项方法：`skills/*/SKILL.md`
- 如果你只想在特定任务里使用，则直接点名对应 skill

## 为什么不优先塞进 system prompt

- Hermes 已有标准的 skills 目录与调用方式
- 把所有内容塞进常驻 prompt，会让上下文更重，也更容易机械化调用
- `arming-thought` 的设计目标本来就是“路由和约束”，更适合作为入口 skill，而不是整包常驻

## 验证

- `hermes skills list` 能看到 qiushi-skill 相关条目
- 用一个明确案例触发 `contradiction-analysis` 或 `investigation-first`
- 仓库级自检可运行 `npx qiushi-skill validate`

更多细节见 [`.hermes/INSTALL.md`](../.hermes/INSTALL.md)。
