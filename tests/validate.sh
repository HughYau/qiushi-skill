#!/usr/bin/env bash
# macOS / Linux 验证脚本，功能对齐 validate.ps1
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ERRORS=0

fail() {
  echo "FAIL: $1" >&2
  ERRORS=$((ERRORS + 1))
}

pick_json_runner() {
  if command -v node >/dev/null 2>&1; then
    echo "node"
    return
  fi

  if command -v python3 >/dev/null 2>&1 && python3 -c "import json" >/dev/null 2>&1; then
    echo "python3"
    return
  fi

  if command -v python >/dev/null 2>&1 && python -c "import json" >/dev/null 2>&1; then
    echo "python"
    return
  fi

  echo ""
}

JSON_RUNNER="$(pick_json_runner)"

json_validate_file() {
  local file_path="$1"

  case "$JSON_RUNNER" in
    python3|python)
      PYTHONUTF8=1 PYTHONIOENCODING=UTF-8 "$JSON_RUNNER" -c '
import json, sys
with open(sys.argv[1], "r", encoding="utf-8") as handle:
    json.load(handle)
' "$file_path" >/dev/null 2>&1
      ;;
    node)
      node -e "JSON.parse(require('fs').readFileSync(process.argv[1], 'utf8'))" "$file_path" >/dev/null 2>&1
      ;;
    *)
      return 1
      ;;
  esac
}

json_validate_stdin() {
  case "$JSON_RUNNER" in
    python3|python)
      PYTHONUTF8=1 PYTHONIOENCODING=UTF-8 "$JSON_RUNNER" -c '
import json, sys
json.load(sys.stdin)
' >/dev/null 2>&1
      ;;
    node)
      node -e "JSON.parse(require('fs').readFileSync(0, 'utf8'))" >/dev/null 2>&1
      ;;
    *)
      return 1
      ;;
  esac
}

# --- JSON 文件校验 ---
echo "Validating JSON files..."
if [ -z "$JSON_RUNNER" ]; then
  fail "No working JSON parser found (python3, python, or node)"
fi
for f in \
  .claude-plugin/plugin.json \
  .claude-plugin/marketplace.json \
  .cursor-plugin/plugin.json \
  hooks/hooks.json \
  package.json
do
  path="$REPO_ROOT/$f"
  if [ ! -f "$path" ]; then
    fail "Missing JSON file: $f"
  elif ! json_validate_file "$path"; then
    fail "Invalid JSON: $f"
  fi
done

# --- 必要文件校验 ---
echo "Validating required files..."
for f in \
  bin/qiushi-skill.mjs \
  bin/lib/detect-platform.mjs \
  bin/lib/install.mjs \
  bin/lib/validate.mjs \
  hooks/session-start \
  hooks/session-start.ps1 \
  hooks/run-hook.cmd \
  skills/arming-thought/SKILL.md \
  .codex/INSTALL.md \
  .opencode/INSTALL.md \
  .openclaw/INSTALL.md \
  .hermes/INSTALL.md \
  README.en.md \
  docs/README.codex.md \
  docs/README.opencode.md \
  docs/README.openclaw.md \
  docs/README.hermes.md \
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
  README.en.md \
  docs/README.codex.md \
  docs/README.opencode.md \
  docs/README.openclaw.md \
  docs/README.hermes.md \
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
    if ! printf '%s' "$hook_output" | json_validate_stdin; then
      fail "Bash hook output is not valid JSON"
    elif ! printf '%s' "$hook_output" | grep -q "qiushi:arming-thought"; then
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
