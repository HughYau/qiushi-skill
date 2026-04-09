# Codex 使用说明

`hongqi-skill` 在 Codex 中不依赖 Claude/Cursor 插件壳。核心做法是：把 `skills/` 当作方法论技能库，把 `commands/` 当作可选的手动命令模板。

## 快速开始

1. 克隆仓库到本地。
2. 让 Codex 读取 [`.codex/INSTALL.md`](../.codex/INSTALL.md)。
3. 在新会话开始时加载 [`skills/arming-thought/SKILL.md`](../skills/arming-thought/SKILL.md)。
4. 当任务明显匹配某个方法时，再加载对应的 `skills/*/SKILL.md`。

## 推荐使用方式

- 自动入口：`skills/arming-thought/SKILL.md`
- 手动方法：`skills/<skill>/SKILL.md`
- 手动命令模板：`commands/*.md`

## 验证

在 Windows 上执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

这能确保仓库内的 hook、commands、frontmatter 和文档链接没有明显损坏。
