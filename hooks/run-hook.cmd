:; #
:; # Polyglot hook runner: this single file works as both a POSIX shell script
:; # (lines starting with `:;`) and a Windows .cmd batch file (the lines below
:; # the blank separator).
:; #
:; # On macOS / Linux, /bin/sh executes this file directly (the `.cmd` suffix
:; # is irrelevant on POSIX). The `:;` lines run normal shell commands; `:` is
:; # a no-op builtin and `;` separates statements, so anything after `:;` is
:; # plain sh code. We `exec` into the real hook script and never reach the
:; # Windows section.
:; #
:; # On Windows, cmd.exe parses lines beginning with `:` as labels and skips
:; # them during sequential execution, so the Windows logic below runs as if
:; # this header were not present.
:; #
:; SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
:; HOOK_NAME="${1:-}"
:; if [ -z "$HOOK_NAME" ]; then echo "Error: No hook name provided" >&2; exit 1; fi
:; shift
:; HOOK_PATH="$SCRIPT_DIR/$HOOK_NAME"
:; if [ ! -e "$HOOK_PATH" ]; then echo "Error: hook not found: $HOOK_PATH" >&2; exit 1; fi
:; if [ -x "$HOOK_PATH" ]; then exec "$HOOK_PATH" "$@"; fi
:; if command -v bash >/dev/null 2>&1; then exec bash "$HOOK_PATH" "$@"; fi
:; exec sh "$HOOK_PATH" "$@"
:; exit 1

@echo off
setlocal

:: Windows adapter for hook scripts
:: Usage: run-hook.cmd <hook-name>

set "SCRIPT_DIR=%~dp0"
set "HOOK_NAME=%~1"

if "%HOOK_NAME%"=="" (
    echo Error: No hook name provided
    exit /b 1
)

:: Prefer a native PowerShell implementation on Windows
if exist "%SCRIPT_DIR%%HOOK_NAME%.ps1" (
    where pwsh >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        pwsh -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%%HOOK_NAME%.ps1" %2 %3 %4 %5 %6 %7 %8 %9
        exit /b %ERRORLEVEL%
    )

    where powershell >nul 2>&1
    if %ERRORLEVEL% equ 0 (
        powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%%HOOK_NAME%.ps1" %2 %3 %4 %5 %6 %7 %8 %9
        exit /b %ERRORLEVEL%
    )
)

:: Fall back to POSIX shell hooks for non-Windows runtimes
where bash >nul 2>&1
if %ERRORLEVEL% equ 0 (
    bash "%SCRIPT_DIR%%HOOK_NAME%" %*
    exit /b %ERRORLEVEL%
)

where sh >nul 2>&1
if %ERRORLEVEL% equ 0 (
    sh "%SCRIPT_DIR%%HOOK_NAME%" %*
    exit /b %ERRORLEVEL%
)

echo Error: No PowerShell, bash, or sh runtime found for hook "%HOOK_NAME%".
exit /b 1
