# hongqi-skill for OpenCode

按下面步骤接入：

1. 确认仓库已克隆到本地。
2. 将 `skills/arming-thought/SKILL.md` 作为新会话的起始方法论入口。
3. 具体任务开始后，再按需读取对应 `skills/*/SKILL.md`。
4. 如果 OpenCode 支持命令目录，则一并加载 `commands/`；否则直接读取对应命令文件内容。
5. 在 Windows 上执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

完成后，检查：
- 入口 skill 只做路由和约束，不会压过宿主系统规则
- 命令文件与 skill 文件一一对应
- 文档中的平台说明与你的实际安装方式一致
