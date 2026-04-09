# OpenCode 使用说明

`hongqi-skill` 在 OpenCode 中建议以“手动加载 skill 文件”的方式使用，避免把平台差异隐藏在文档承诺里。

## 快速开始

1. 克隆仓库到本地。
2. 让 OpenCode 读取 [`.opencode/INSTALL.md`](../.opencode/INSTALL.md)。
3. 把 [`skills/arming-thought/SKILL.md`](../skills/arming-thought/SKILL.md) 作为会话起始方法论入口。
4. 针对具体问题，再按需加载对应的 skill 或 command 文件。

## 推荐映射

- 路由入口：`skills/arming-thought/SKILL.md`
- 单项方法：`skills/*/SKILL.md`
- 手动命令：`commands/*.md`

## 验证

Windows：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

如果宿主不支持命令目录，就直接打开对应 `commands/*.md` 或 `skills/*/SKILL.md` 使用。
