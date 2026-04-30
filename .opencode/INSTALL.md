# qiushi-skill for OpenCode

推荐直接安装到 OpenCode 原生目录：

```bash
npx qiushi-skill install --target opencode --scope user
```

这会复制：

- `skills/*` 到 `~/.config/opencode/skills/`
- `commands/*.md` 到 `~/.config/opencode/commands/`

项目级安装可使用：

```bash
npx qiushi-skill install --target opencode --scope project
```

手动接入步骤：

1. 确认仓库已克隆到本地。
2. 将 `skills/arming-thought/SKILL.md` 作为新会话的起始方法论入口。
3. 具体任务开始后，再按需读取对应 `skills/*/SKILL.md`。
4. 如果 OpenCode 支持命令目录，则一并加载 `commands/`；否则直接读取对应命令文件内容。
5. 如果当前环境已安装Node.js，优先运行：

```bash
npx qiushi-skill validate
```

6. 如果当前环境没有 Node.js，检查当前的运行系统。

如果是Linux 或MacOS系统，执行：

```sh
bash tests/validate.sh
```

如果是Windows系统，执行：

```powershell
powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File tests/validate.ps1
```

完成后，检查：
- 入口 skill 只做路由和约束，不会压过宿主系统规则
- 命令文件与 skill 文件一一对应
- 文档中的平台说明与你的实际安装方式一致
