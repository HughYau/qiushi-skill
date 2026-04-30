# qiushi-skill for Hermes Agent

按 **2026-04-30** 查阅到的 Hermes Agent 官方文档，Hermes 已提供原生 `skills` 目录、`hermes skills list` 和 `--toolsets "skills"` 工作流。因此这里优先走 Hermes 标准能力，而不是把 qiushi-skill 退化成一大段手写 system prompt。

## 推荐路径：安装为 Hermes skills

```bash
npx qiushi-skill install --target hermes --scope user
```

CLI 会复制到 `~/.hermes/skills/qiushi-skill/` 分组下。

### macOS / Linux

```bash
mkdir -p ~/.hermes/skills/qiushi-skill
cp -R ./skills/* ~/.hermes/skills/qiushi-skill/
```

### Windows PowerShell

```powershell
$target = Join-Path $HOME ".hermes\skills\qiushi-skill"
New-Item -ItemType Directory -Force -Path $target | Out-Null
Copy-Item -LiteralPath ".\skills\*" -Destination $target -Recurse -Force
```

## 使用

1. 先确认技能已被 Hermes 发现：

```bash
hermes skills list
```

2. 启动会话时把 skills toolset 打开：

```bash
hermes chat --toolsets "skills,terminal"
```

3. 直接触发具体 skill，例如：

```text
Use contradiction-analysis to break down this product decision.
```

Hermes 会把已安装的技能暴露为 slash commands 和可调用 skill 资源。对于 `qiushi-skill`，推荐把 `arming-thought` 当成会话入口，再按需加载下游方法。

## 可选路径：加强 system prompt

如果你希望每次会话都更强地固定“实事求是”的总原则，可以把 `skills/arming-thought/SKILL.md` 中的核心约束提炼后，放进 Hermes 的会话 prompt 配置中；但仍建议保留 skill 目录安装，这样具体方法可以按需触发，而不是把所有内容都常驻在 prompt 里。

## 验证

1. `hermes skills list` 中能看到新增的 qiushi-skill 目录内容。
2. 在一个测试任务里，明确要求调用 `contradiction-analysis` 或 `investigation-first`。
3. 如需验证仓库本身是否完整，运行：

```bash
npx qiushi-skill validate
```
