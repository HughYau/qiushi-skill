#!/usr/bin/env bash
# macOS / Linux 验证脚本，功能对齐 validate.ps1
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0

fail() {
  echo "FAIL: $1" >&2
  ERRORS=$((ERRORS + 1))
}

# --- JSON 文件校验 ---
echo "Validating JSON files..."
for f in \
  .claude-plugin/plugin.json \
  .cursor-plugin/plugin.json \
  hooks/hooks.json \
  package.json
do
  path="$REPO_ROOT/$f"
  if [ ! -f "$path" ]; then
    fail "Missing JSON file: $f"
  elif ! python3 -c "import json,sys; json.load(open(sys.argv[1]))" "$path" 2>/dev/null; then
    fail "Invalid JSON: $f"
  fi
done

# --- 必要文件校验 ---
echo "Validating required files..."
for f in \
  hooks/session-start \
  hooks/session-start.ps1 \
  hooks/run-hook.cmd \
  skills/arming-thought/SKILL.md \
  .codex/INSTALL.md \
  .opencode/INSTALL.md \
  docs/README.codex.md \
  docs/README.opencode.md \
  docs/platforms.md
do
  [ -f "$REPO_ROOT/$f" ] || fail "Missing required file: $f"
done

# --- Frontmatter 校验 ---
echo "Validating frontmatter..."
check_frontmatter() {
  local file="$1"
  local first_line
  first_line=$(head -1 "$file" | tr -d '\r' | sed 's/^\xEF\xBB\xBF//')
  if [ "$first_line" != "---" ]; then
    fail "Missing frontmatter: $file"; return
  fi
  local terminator
  terminator=$(tail -n +2 "$file" | grep -n '^---$' | head -1 | cut -d: -f1)
  if [ -z "$terminator" ]; then
    fail "Missing frontmatter terminator: $file"; return
  fi
  local fm
  fm=$(sed -n "2,$((terminator))p" "$file")
  echo "$fm" | grep -qE '^name:\s*.+' || fail "Missing 'name' in frontmatter: $file"
  echo "$fm" | grep -qE '^description:\s*\|$' || fail "Missing block 'description' in frontmatter: $file"
}

while IFS= read -r -d '' f; do
  check_frontmatter "$f"
done < <(find "$REPO_ROOT/skills" -name "SKILL.md" -print0)

while IFS= read -r -d '' f; do
  check_frontmatter "$f"
done < <(find "$REPO_ROOT/agents" -name "*.md" -print0 2>/dev/null || true)

while IFS= read -r -d '' f; do
  check_frontmatter "$f"
done < <(find "$REPO_ROOT/commands" -name "*.md" -print0 2>/dev/null || true)

# --- Command 覆盖校验 ---
echo "Validating command coverage..."
for cmd in \
  contradiction-analysis \
  practice-cognition \
  investigation-first \
  mass-line \
  criticism-self-criticism \
  protracted-strategy \
  concentrate-forces \
  spark-prairie-fire \
  overall-planning \
  workflows
do
  [ -f "$REPO_ROOT/commands/$cmd.md" ] || fail "Missing command file: commands/$cmd.md"
done

# --- Markdown 本地链接校验 ---
echo "Validating markdown links..."
check_md_links() {
  local file="$1"
  local dir
  dir=$(dirname "$file")
  local targets
  targets=$(grep -oE '\[([^]]*)\]\(([^)]+)\)' "$file" | grep -oE '\(([^)]+)\)' | tr -d '()' || true)
  [ -z "$targets" ] && return
  while IFS= read -r target; do
    case "$target" in
      \#*|http://*|https://*) continue ;;
    esac
    [ -e "$dir/$target" ] || fail "Broken link '$target' in $file"
  done <<< "$targets"
}

for f in \
  README.md \
  docs/README.codex.md \
  docs/README.opencode.md \
  docs/platforms.md
do
  [ -f "$REPO_ROOT/$f" ] && check_md_links "$REPO_ROOT/$f"
done

# --- Bash hook 冒烟测试 ---
echo "Running bash hook smoke test..."
HOOK="$REPO_ROOT/hooks/session-start"
if [ -x "$HOOK" ] || chmod +x "$HOOK"; then
  hook_output=$(CLAUDE_PLUGIN_ROOT="$REPO_ROOT" "$HOOK" 2>/dev/null) || fail "Bash hook exited with error"
  if [ -n "$hook_output" ]; then
    if ! echo "$hook_output" | python3 -c "import json,sys; json.load(sys.stdin)" 2>/dev/null; then
      fail "Bash hook output is not valid JSON"
    elif ! echo "$hook_output" | grep -q "hongqi:arming-thought"; then
      fail "Bash hook payload missing skill context"
    fi
  else
    fail "Bash hook produced no output"
  fi
fi

# --- 结果 ---
if [ "$ERRORS" -gt 0 ]; then
  echo "Validation FAILED with $ERRORS error(s)."
  exit 1
fi

echo "Validation passed."
