# Codex 使用说明

`qiushi-skill` 在 Codex 中不依赖 Claude/Cursor 插件壳。CLI 会把 `skills/*` 安装到 Codex 会扫描的 skills 目录。

## 快速开始

1. 运行 `npx qiushi-skill install --target codex --scope user`。
2. 重启 Codex 或开启新会话。
3. 检查 `arming-thought` 是否出现在可用 skills 中。
4. 当任务明显匹配某个方法时，再按需加载对应的 `skills/*/SKILL.md`。

## 推荐使用方式

- 自动入口：`skills/arming-thought/SKILL.md`
- 手动方法：`skills/<skill>/SKILL.md`
- 可选命令模板：`commands/*.md`

## 验证

优先执行：

```bash
npx qiushi-skill validate
```

如果当前环境没有 Node.js，再在 Windows 上执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

这能确保仓库内的 hook、commands、frontmatter 和文档链接没有明显损坏。
