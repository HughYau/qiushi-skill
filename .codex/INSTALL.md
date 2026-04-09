# hongqi-skill for Codex

按下面步骤接入：

1. 确认仓库已克隆到本地。
2. 新会话开始时先读取 `skills/arming-thought/SKILL.md`，把它作为路由和方法论约束。
3. 针对具体任务，再按需读取下列文件：
   - `skills/contradiction-analysis/SKILL.md`
   - `skills/practice-cognition/SKILL.md`
   - `skills/investigation-first/SKILL.md`
   - `skills/mass-line/SKILL.md`
   - `skills/criticism-self-criticism/SKILL.md`
   - `skills/protracted-strategy/SKILL.md`
   - `skills/concentrate-forces/SKILL.md`
   - `skills/spark-prairie-fire/SKILL.md`
   - `skills/overall-planning/SKILL.md`
   - `skills/workflows/SKILL.md`
4. 如果宿主支持 Markdown commands，可额外加载 `commands/` 目录作为手动入口；不支持时，直接读取同名命令文件内容即可。
5. 在 Windows 上运行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

完成后，手动验证两点：
- 会话起始时能够成功读取 `arming-thought`
- 针对一个具体问题时，能够按需切换到对应 skill，而不是机械全调用
