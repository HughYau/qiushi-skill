[CmdletBinding()]
param()

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

function ConvertTo-AsciiJsonString {
    param([string]$Value)

    $builder = [System.Text.StringBuilder]::new()
    [void]$builder.Append('"')

    for ($i = 0; $i -lt $Value.Length; $i++) {
        $char = $Value[$i]
        $codePoint = [int][char]$char

        if ($codePoint -eq 34) {
            [void]$builder.Append('\"')
            continue
        }

        if ($codePoint -eq 92) {
            [void]$builder.Append('\\')
            continue
        }

        if ($codePoint -eq 8) {
            [void]$builder.Append('\b')
            continue
        }

        if ($codePoint -eq 12) {
            [void]$builder.Append('\f')
            continue
        }

        if ($codePoint -eq 10) {
            [void]$builder.Append('\n')
            continue
        }

        if ($codePoint -eq 13) {
            [void]$builder.Append('\r')
            continue
        }

        if ($codePoint -eq 9) {
            [void]$builder.Append('\t')
            continue
        }

        if ([char]::IsHighSurrogate($char) -and ($i + 1) -lt $Value.Length -and [char]::IsLowSurrogate($Value[$i + 1])) {
            [void]$builder.AppendFormat('\u{0:x4}\u{1:x4}', [int][char]$char, [int][char]$Value[$i + 1])
            $i++
            continue
        }

        if ($codePoint -lt 32 -or $codePoint -gt 126) {
            [void]$builder.AppendFormat('\u{0:x4}', $codePoint)
            continue
        }

        [void]$builder.Append($char)
    }

    [void]$builder.Append('"')
    $builder.ToString()
}

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$pluginRoot = Split-Path -Parent $scriptDir
$skillPath = Join-Path $pluginRoot "skills\arming-thought\SKILL.md"

if (-not (Test-Path -LiteralPath $skillPath)) {
    throw "Missing skill file: $skillPath"
}

$armingThoughtContent = Get-Content -LiteralPath $skillPath -Raw -Encoding UTF8
$sessionContext = @"
<HONGQI_SKILL>
已加载 hongqi:arming-thought。请先遵守用户指令、项目约束和宿主平台规则，再在明确适用时把这份方法论作为补充的路由与校验框架。

$armingThoughtContent

</HONGQI_SKILL>
"@

$sessionContextJson = ConvertTo-AsciiJsonString -Value $sessionContext

if ($env:CURSOR_PLUGIN_ROOT) {
    @"
{
  "additional_context": $sessionContextJson
}
"@
} elseif ($env:CLAUDE_PLUGIN_ROOT) {
    @"
{
  "hookSpecificOutput": {
    "hookEventName": "SessionStart",
    "additionalContext": $sessionContextJson
  }
}
"@
} else {
    @"
{
  "additional_context": $sessionContextJson
}
"@
}
