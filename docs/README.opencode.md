# OpenCode 使用说明

`qiushi-skill` 在 OpenCode 中使用原生 `skills/` 与 `commands/` 目录。CLI 会把方法论 skills 和 slash command 模板安装到 OpenCode 的全局或项目配置目录。

## 快速开始

1. 运行 `npx qiushi-skill install --target opencode --scope user`。
2. 重启 OpenCode 或开启新会话。
3. 检查 `arming-thought` 是否出现在可用 skills 中。
4. 需要手动触发方法时，使用安装后的 slash command。

## 推荐映射

- 路由入口：`skills/arming-thought/SKILL.md`
- 单项方法：`skills/*/SKILL.md`
- 手动命令：`~/.config/opencode/commands/*.md` 或 `.opencode/commands/*.md`

## 验证

优先执行：

```bash
npx qiushi-skill validate
```

如果当前环境没有 Node.js，再在 Windows 上执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

如果宿主不支持命令目录，就直接打开对应 `commands/*.md` 或 `skills/*/SKILL.md` 使用。
