# qiushi-skill for nanobot

按下面步骤接入：

1. 确认仓库已克隆到本地。
2. 将 `skills/` 目录下的所有 skill 文件夹复制到 nanobot 工作区的 skills 目录：

   ```bash
   # 默认工作区路径为 ~/.nanobot/workspace
   mkdir -p ~/.nanobot/workspace/skills
   cp -r skills/* ~/.nanobot/workspace/skills/
   ```

3. nanobot 会自动发现新 skill。新会话开始时，`arming-thought` 的 name + description 会出现在 skill 列表中；当任务匹配某个方法论时，agent 会按需读取对应 `SKILL.md`。
4. 如果需要 `arming-thought` 在每次会话中自动全量加载（而非仅展示摘要），可以在 SKILL.md 的 frontmatter 中添加 `always: true`。
5. 在 Windows 上执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

完成后，验证：

- 在 nanobot 会话中检查 `arming-thought` 是否出现在可用 skill 列表中
- 针对一个具体问题时，agent 能按需调用对应 skill，而不是机械全调用
