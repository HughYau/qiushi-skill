# nanobot 使用说明

`qiushi-skill` 在 nanobot 中以 skill 方式集成。核心做法是：将 `skills/` 目录复制到 nanobot 的工作区 skills 目录，nanobot 会自动发现并加载。

## 快速开始

1. 运行 `npx qiushi-skill install --target nanobot --scope user`。
2. nanobot 会在新会话中自动发现所有 skill。
3. 当任务匹配某个方法论时，agent 会按需加载对应 `SKILL.md`。

## 推荐映射

- 路由入口：`arming-thought`（每次会话自动出现在 skill 列表中）
- 按需方法：`skills/*/SKILL.md`（agent 判断适用时自动加载）
- 手动命令模板：`commands/*.md`（直接读取对应文件）

## 验证

Windows：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

如果宿主不支持命令目录，就直接打开对应 `commands/*.md` 或 `skills/*/SKILL.md` 使用。
