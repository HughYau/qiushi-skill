[CmdletBinding()]
param(
    [switch]$SmokeInstall
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot

function Assert-True {
    param(
        [bool]$Condition,
        [string]$Message
    )

    if (-not $Condition) {
        throw $Message
    }
}

function Read-JsonFile {
    param([string]$Path)
    Get-Content -LiteralPath $Path -Raw -Encoding UTF8 | ConvertFrom-Json | Out-Null
}

function Join-ProcessOutput {
    param([object[]]$Output)

    (@($Output) -join [Environment]::NewLine).Trim()
}

function Test-AsciiOnly {
    param([string]$Value)

    foreach ($char in $Value.ToCharArray()) {
        if ([int][char]$char -gt 127) {
            return $false
        }
    }

    return $true
}

function Get-FrontMatter {
    param([string]$Path)

    $lines = Get-Content -LiteralPath $Path -Encoding UTF8
    if ($lines.Count -eq 0) {
        throw "Empty file: $Path"
    }

    if ([int][char]$lines[0][0] -eq 65279) {
        $lines[0] = $lines[0].Substring(1)
    }

    if ($lines[0] -ne "---") {
        throw "Missing frontmatter: $Path"
    }

    $terminatorIndex = [Array]::IndexOf($lines, "---", 1)
    if ($terminatorIndex -lt 1) {
        throw "Missing frontmatter terminator: $Path"
    }

    $frontMatter = ($lines[1..($terminatorIndex - 1)] -join "`n")
    if (-not ($frontMatter -match '(?m)^name:\s*.+$')) {
        throw "Missing 'name' in frontmatter: $Path"
    }
    if (-not ($frontMatter -match '(?m)^description:\s*\|$')) {
        throw "Missing block 'description' in frontmatter: $Path"
    }
}

function Test-MarkdownLocalTargets {
    param([string]$Path)

    $content = Get-Content -LiteralPath $Path -Raw -Encoding UTF8
    $matches = [regex]::Matches($content, '!\[[^\]]*\]\((?<target>[^)]+)\)|\[[^\]]+\]\((?<target>[^)]+)\)')

    foreach ($match in $matches) {
        $target = $match.Groups["target"].Value.Trim()
        if (-not $target -or $target.StartsWith("#") -or $target -match '^[a-z]+://') {
            continue
        }

        $resolved = Join-Path (Split-Path -Parent $Path) $target
        Assert-True (Test-Path -LiteralPath $resolved) "Broken local markdown target '$target' in $Path"
    }
}

Write-Host "Validating JSON files..."
$jsonFiles = @(
    (Join-Path $repoRoot ".claude-plugin\plugin.json"),
    (Join-Path $repoRoot ".cursor-plugin\plugin.json"),
    (Join-Path $repoRoot "hooks\hooks.json"),
    (Join-Path $repoRoot "package.json")
)

foreach ($file in $jsonFiles) {
    Assert-True (Test-Path -LiteralPath $file) "Missing JSON file: $file"
    Read-JsonFile -Path $file
}

Write-Host "Validating required files..."
$requiredFiles = @(
    "hooks\run-hook.cmd",
    "hooks\session-start",
    "hooks\session-start.ps1",
    "skills\arming-thought\SKILL.md",
    ".codex\INSTALL.md",
    ".opencode\INSTALL.md",
    "docs\README.codex.md",
    "docs\README.opencode.md",
    "docs\platforms.md"
) | ForEach-Object { Join-Path $repoRoot $_ }

foreach ($file in $requiredFiles) {
    Assert-True (Test-Path -LiteralPath $file) "Missing required file: $file"
}

Write-Host "Validating frontmatter..."
$frontMatterFiles = @()
$frontMatterFiles += Get-ChildItem -LiteralPath (Join-Path $repoRoot "skills") -Recurse -Filter "SKILL.md" | Select-Object -ExpandProperty FullName
$frontMatterFiles += Get-ChildItem -LiteralPath (Join-Path $repoRoot "agents") -File -Filter "*.md" | Select-Object -ExpandProperty FullName
$frontMatterFiles += Get-ChildItem -LiteralPath (Join-Path $repoRoot "commands") -File -Filter "*.md" | Select-Object -ExpandProperty FullName

foreach ($file in $frontMatterFiles) {
    Get-FrontMatter -Path $file
}

Write-Host "Validating command coverage..."
$expectedCommands = @(
    "contradiction-analysis",
    "practice-cognition",
    "investigation-first",
    "mass-line",
    "criticism-self-criticism",
    "protracted-strategy",
    "concentrate-forces",
    "spark-prairie-fire",
    "overall-planning",
    "workflows"
)

foreach ($command in $expectedCommands) {
    $path = Join-Path $repoRoot "commands\$command.md"
    Assert-True (Test-Path -LiteralPath $path) "Missing command file: $path"
}

Write-Host "Validating markdown links..."
$markdownFiles = @(
    (Join-Path $repoRoot "README.md"),
    (Join-Path $repoRoot "docs\README.codex.md"),
    (Join-Path $repoRoot "docs\README.opencode.md"),
    (Join-Path $repoRoot "docs\platforms.md")
)

foreach ($file in $markdownFiles) {
    Test-MarkdownLocalTargets -Path $file
}

Write-Host "Running PowerShell hook smoke test..."
$originalClaudePluginRoot = $env:CLAUDE_PLUGIN_ROOT
$originalCursorPluginRoot = $env:CURSOR_PLUGIN_ROOT

try {
    $env:CLAUDE_PLUGIN_ROOT = $repoRoot
    Remove-Item Env:CURSOR_PLUGIN_ROOT -ErrorAction SilentlyContinue

    $psHookOutput = Join-ProcessOutput (& powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File (Join-Path $repoRoot "hooks\session-start.ps1"))
    Assert-True (Test-AsciiOnly $psHookOutput) "PowerShell hook output must stay ASCII-only so Windows PowerShell can consume it across code pages"
    $psHookJson = $psHookOutput | ConvertFrom-Json
    Assert-True ($null -ne $psHookJson.hookSpecificOutput) "PowerShell hook did not emit Claude-compatible payload"
    Assert-True ($psHookJson.hookSpecificOutput.additionalContext -match "hongqi:arming-thought") "PowerShell hook payload missing skill context"

    $cmdHookOutput = Join-ProcessOutput (& cmd.exe /d /c "set CLAUDE_PLUGIN_ROOT=$repoRoot && `"$repoRoot\hooks\run-hook.cmd`" session-start")
    Assert-True (Test-AsciiOnly $cmdHookOutput) "run-hook.cmd output must stay ASCII-only so cmd and Windows PowerShell decode it consistently"
    $cmdHookJson = $cmdHookOutput | ConvertFrom-Json
    Assert-True ($null -ne $cmdHookJson.hookSpecificOutput) "run-hook.cmd did not emit Claude-compatible payload"
} finally {
    if ($null -ne $originalClaudePluginRoot) {
        $env:CLAUDE_PLUGIN_ROOT = $originalClaudePluginRoot
    } else {
        Remove-Item Env:CLAUDE_PLUGIN_ROOT -ErrorAction SilentlyContinue
    }

    if ($null -ne $originalCursorPluginRoot) {
        $env:CURSOR_PLUGIN_ROOT = $originalCursorPluginRoot
    } else {
        Remove-Item Env:CURSOR_PLUGIN_ROOT -ErrorAction SilentlyContinue
    }
}

if ($SmokeInstall) {
    Write-Host "Smoke install validation completed."
}

Write-Host "Validation passed."
