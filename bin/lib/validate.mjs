import path from "node:path";
import { chmod, readFile, readdir, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const REQUIRED_JSON_FILES = [
  ".claude-plugin/plugin.json",
  ".claude-plugin/marketplace.json",
  ".cursor-plugin/plugin.json",
  "hooks/hooks.json",
  "package.json",
];

const REQUIRED_FILES = [
  "bin/qiushi-skill.mjs",
  "bin/lib/detect-platform.mjs",
  "bin/lib/install.mjs",
  "bin/lib/validate.mjs",
  "hooks/run-hook.cmd",
  "hooks/session-start",
  "hooks/session-start.ps1",
  "skills/arming-thought/SKILL.md",
  ".codex/INSTALL.md",
  ".opencode/INSTALL.md",
  ".openclaw/INSTALL.md",
  ".hermes/INSTALL.md",
  ".nanobot/INSTALL.md",
  "README.md",
  "README.en.md",
  "docs/README.codex.md",
  "docs/README.opencode.md",
  "docs/README.openclaw.md",
  "docs/README.hermes.md",
  "docs/README.nanobot.md",
  "docs/platforms.md",
];

const MARKDOWN_FILES = [
  "README.md",
  "README.en.md",
  "docs/README.codex.md",
  "docs/README.opencode.md",
  "docs/README.openclaw.md",
  "docs/README.hermes.md",
  "docs/README.nanobot.md",
  "docs/platforms.md",
];

const COMMANDS = [
  "contradiction-analysis",
  "practice-cognition",
  "investigation-first",
  "mass-line",
  "criticism-self-criticism",
  "protracted-strategy",
  "concentrate-forces",
  "spark-prairie-fire",
  "overall-planning",
  "workflows",
];

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function walkFiles(targetPath, matcher, files = []) {
  const entries = await readdir(targetPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(targetPath, entry.name);
    if (entry.isDirectory()) {
      await walkFiles(fullPath, matcher, files);
      continue;
    }

    if (matcher(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(content, filePath) {
  const normalized = content.replace(/^\uFEFF/, "");
  const lines = normalized.split(/\r?\n/);

  if (lines[0] !== "---") {
    throw new Error(`Missing frontmatter: ${filePath}`);
  }

  const terminatorIndex = lines.indexOf("---", 1);
  if (terminatorIndex < 1) {
    throw new Error(`Missing frontmatter terminator: ${filePath}`);
  }

  const frontmatter = lines.slice(1, terminatorIndex).join("\n");
  if (!/^name:\s*.+$/m.test(frontmatter)) {
    throw new Error(`Missing 'name' in frontmatter: ${filePath}`);
  }
  if (!/^description:\s*\|$/m.test(frontmatter)) {
    throw new Error(`Missing block 'description' in frontmatter: ${filePath}`);
  }
}

function readJson(text, filePath) {
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error(`Invalid JSON: ${filePath}\n${error.message}`);
  }
}

async function validateMarkdownLinks(repoRoot, relativePath, errors) {
  const fullPath = path.join(repoRoot, relativePath);
  const content = await readFile(fullPath, "utf8");
  const matches = content.matchAll(/!\[[^\]]*\]\(([^)]+)\)|\[[^\]]+\]\(([^)]+)\)/g);

  for (const match of matches) {
    const rawTarget = (match[1] ?? match[2] ?? "").trim();
    if (!rawTarget) {
      continue;
    }

    const [targetWithoutFragment] = rawTarget.split("#");
    if (!targetWithoutFragment || /^[a-z]+:/i.test(targetWithoutFragment)) {
      continue;
    }

    const resolved = path.resolve(path.dirname(fullPath), targetWithoutFragment);
    if (!(await exists(resolved))) {
      errors.push(`Broken local markdown target '${rawTarget}' in ${relativePath}`);
    }
  }
}

function validateTextIncludes(content, expected, label, errors) {
  if (!content.includes(expected)) {
    errors.push(`${label} is missing '${expected}'`);
  }
}

async function validateHookStructure(repoRoot, hooksJson, errors) {
  const sessionStartEntries = hooksJson?.hooks?.SessionStart;
  if (!Array.isArray(sessionStartEntries) || sessionStartEntries.length === 0) {
    errors.push("hooks/hooks.json is missing hooks.SessionStart entries");
    return;
  }

  const [sessionStart] = sessionStartEntries;
  if (sessionStart.matcher !== "startup|clear|compact") {
    errors.push("hooks/hooks.json SessionStart matcher must stay 'startup|clear|compact'");
  }

  const command = sessionStart.hooks?.[0]?.command ?? "";
  if (!command.includes("run-hook.cmd") || !command.includes("session-start")) {
    errors.push("hooks/hooks.json SessionStart command must invoke run-hook.cmd session-start");
  }

  const shellHookPath = path.join(repoRoot, "hooks", "session-start");
  await chmod(shellHookPath, 0o755).catch(() => {});

  const shellHook = await readFile(shellHookPath, "utf8");
  validateTextIncludes(shellHook, "qiushi:arming-thought", "hooks/session-start", errors);
  validateTextIncludes(shellHook, "hookSpecificOutput", "hooks/session-start", errors);
  validateTextIncludes(shellHook, "additionalContext", "hooks/session-start", errors);
  validateTextIncludes(shellHook, "\"additional_context\"", "hooks/session-start", errors);
  validateTextIncludes(shellHook, "CURSOR_PLUGIN_ROOT", "hooks/session-start", errors);
  validateTextIncludes(shellHook, "CLAUDE_PLUGIN_ROOT", "hooks/session-start", errors);

  const psHook = await readFile(path.join(repoRoot, "hooks", "session-start.ps1"), "utf8");
  validateTextIncludes(psHook, "ConvertTo-AsciiJsonString", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "qiushi:arming-thought", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "hookSpecificOutput", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "additionalContext", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "\"additional_context\"", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "CURSOR_PLUGIN_ROOT", "hooks/session-start.ps1", errors);
  validateTextIncludes(psHook, "CLAUDE_PLUGIN_ROOT", "hooks/session-start.ps1", errors);

  const cmdHook = await readFile(path.join(repoRoot, "hooks", "run-hook.cmd"), "utf8");
  validateTextIncludes(cmdHook, "%HOOK_NAME%.ps1", "hooks/run-hook.cmd", errors);
  validateTextIncludes(cmdHook, "powershell -NoLogo -NoProfile -ExecutionPolicy Bypass -File", "hooks/run-hook.cmd", errors);
  validateTextIncludes(cmdHook, "bash \"%SCRIPT_DIR%%HOOK_NAME%\"", "hooks/run-hook.cmd", errors);
  validateTextIncludes(cmdHook, "sh \"%SCRIPT_DIR%%HOOK_NAME%\"", "hooks/run-hook.cmd", errors);
}

export async function runValidation({ repoRoot, stdout = process.stdout, stderr = process.stderr } = {}) {
  const root = repoRoot ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
  const errors = [];

  stdout.write("Validating JSON files...\n");
  const jsonObjects = new Map();
  for (const relativePath of REQUIRED_JSON_FILES) {
    const fullPath = path.join(root, relativePath);
    if (!(await exists(fullPath))) {
      errors.push(`Missing JSON file: ${relativePath}`);
      continue;
    }

    const content = await readFile(fullPath, "utf8");
    try {
      jsonObjects.set(relativePath, readJson(content, relativePath));
    } catch (error) {
      errors.push(error.message);
    }
  }

  const packageJson = jsonObjects.get("package.json");
  const marketplaceJson = jsonObjects.get(".claude-plugin/marketplace.json");
  if (packageJson && marketplaceJson) {
    const packageVersion = packageJson.version;
    const marketplaceVersion = marketplaceJson.metadata?.version;
    const pluginVersion = marketplaceJson.plugins?.[0]?.version;

    if (!packageJson.bin?.["qiushi-skill"]) {
      errors.push("package.json is missing bin.qiushi-skill");
    }
    for (const requiredPackageFile of [".nanobot", ".codex", ".opencode", ".openclaw", ".hermes"]) {
      if (!packageJson.files?.includes(requiredPackageFile)) {
        errors.push(`package.json files is missing '${requiredPackageFile}'`);
      }
    }
    if (marketplaceVersion !== packageVersion) {
      errors.push(`Version mismatch: package.json=${packageVersion}, marketplace metadata=${marketplaceVersion}`);
    }
    if (pluginVersion !== packageVersion) {
      errors.push(`Version mismatch: package.json=${packageVersion}, marketplace plugin=${pluginVersion}`);
    }
    if (marketplaceJson.plugins?.[0]?.source !== "./") {
      errors.push("marketplace plugin source must stay './' for GitHub marketplace installs");
    }
  }

  stdout.write("Validating required files...\n");
  for (const relativePath of REQUIRED_FILES) {
    if (!(await exists(path.join(root, relativePath)))) {
      errors.push(`Missing required file: ${relativePath}`);
    }
  }

  stdout.write("Validating frontmatter...\n");
  const frontmatterFiles = [
    ...(await walkFiles(path.join(root, "skills"), (filePath) => path.basename(filePath) === "SKILL.md")),
    ...(await walkFiles(path.join(root, "agents"), (filePath) => filePath.endsWith(".md"))),
    ...(await walkFiles(path.join(root, "commands"), (filePath) => filePath.endsWith(".md"))),
  ];

  for (const filePath of frontmatterFiles) {
    const content = await readFile(filePath, "utf8");
    try {
      parseFrontmatter(content, path.relative(root, filePath));
    } catch (error) {
      errors.push(error.message);
    }
  }

  stdout.write("Validating command coverage...\n");
  for (const command of COMMANDS) {
    const filePath = path.join(root, "commands", `${command}.md`);
    if (!(await exists(filePath))) {
      errors.push(`Missing command file: commands/${command}.md`);
    }
  }

  stdout.write("Validating markdown links...\n");
  for (const relativePath of MARKDOWN_FILES) {
    if (await exists(path.join(root, relativePath))) {
      await validateMarkdownLinks(root, relativePath, errors);
    }
  }

  stdout.write("Validating hook structure...\n");
  await validateHookStructure(root, jsonObjects.get("hooks/hooks.json"), errors);

  if (errors.length > 0) {
    for (const error of errors) {
      stderr.write(`FAIL: ${error}\n`);
    }

    stderr.write(`Validation FAILED with ${errors.length} error(s).\n`);
    return {
      ok: false,
      errors,
    };
  }

  stdout.write("Validation passed.\n");
  return {
    ok: true,
    errors: [],
  };
}
