#!/usr/bin/env node

import path from "node:path";
import process from "node:process";
import { readFile } from "node:fs/promises";
import readline from "node:readline/promises";
import { fileURLToPath } from "node:url";
import {
  detectPlatforms,
  formatTargetPath,
  getPlatformById,
  isCopyPlatform,
  normalizeTargets,
} from "./lib/detect-platform.mjs";
import { installTargets, uninstallTarget } from "./lib/install.mjs";
import { runValidation } from "./lib/validate.mjs";

const binDir = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(binDir, "..");
const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8"));

function printHelp() {
  console.log(`qiushi-skill v${packageJson.version}

Usage:
  npx qiushi-skill
  npx qiushi-skill install [--target <platform>] [--scope user|project] [--no-hooks]
  npx qiushi-skill validate
  npx qiushi-skill uninstall --target <platform> [--scope user|project]
  npx qiushi-skill --help
  npx qiushi-skill --version

Platforms:
  claude-code   Copy plugin bundle into ~/.claude/plugins/qiushi-skill
  cursor        Copy plugin bundle into ~/.cursor/plugins/qiushi-skill
  codex         Copy skills into ~/.codex/skills
  opencode      Copy skills and commands into ~/.config/opencode
  openclaw      Copy skills into ~/.openclaw/skills/qiushi-skill
  hermes        Copy skills into ~/.hermes/skills/qiushi-skill
  nanobot       Copy skills into ~/.nanobot/workspace/skills
  all           Install all supported targets

Examples:
  npx qiushi-skill
  npx qiushi-skill install --target claude-code --scope user
  npx qiushi-skill install --target claude-code,cursor --scope project --no-hooks
  npx qiushi-skill validate
  npx qiushi-skill uninstall --target claude-code --scope user
`);
}

function parseArgs(argv) {
  const parsed = {
    command: null,
    targets: [],
    scope: "user",
    includeHooks: true,
  };

  const args = [...argv];
  while (args.length > 0) {
    const token = args.shift();
    switch (token) {
      case "install":
      case "validate":
      case "uninstall":
      case "help":
        parsed.command = token;
        break;
      case "--target":
      case "-t":
        parsed.targets.push(args.shift());
        break;
      case "--scope":
        parsed.scope = args.shift() ?? parsed.scope;
        break;
      case "--project":
        parsed.scope = "project";
        break;
      case "--user":
        parsed.scope = "user";
        break;
      case "--no-hooks":
        parsed.includeHooks = false;
        break;
      case "--help":
      case "-h":
        parsed.command = "help";
        break;
      case "--version":
      case "-v":
        parsed.command = "version";
        break;
      default:
        if (!parsed.command && !token.startsWith("-")) {
          parsed.command = token;
          break;
        }

        throw new Error(`Unknown argument: ${token}`);
    }
  }

  return parsed;
}

function isInteractive() {
  return Boolean(process.stdin.isTTY && process.stdout.isTTY);
}

function defaultTargetIndex(platforms) {
  const preferred = platforms.findIndex((platform) => platform.id === "claude-code");
  return preferred >= 0 ? preferred : 0;
}

async function promptInstallChoices(platforms) {
  const copyTargets = platforms.filter(isCopyPlatform);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    console.log("检测到或可接入的平台：");
    const allChoices = [...platforms, { id: "all", name: "全部平台", mode: "mixed", summary: "复制可管理目标，并打印其余平台指引" }];
    const defaultIndex = defaultTargetIndex(platforms) + 1;

    allChoices.forEach((platform, index) => {
      const suffix = platform.id === "all"
        ? platform.summary
        : isCopyPlatform(platform)
          ? `${platform.detected ? "detected, " : ""}${formatTargetPath(platform, "user")}`
          : `${platform.detected ? "detected, " : ""}manual setup`;
      console.log(`  ${index + 1}. ${platform.name} - ${suffix}`);
    });

    let selected = null;
    while (!selected) {
      const targetAnswer = (await rl.question(`选择目标 [${defaultIndex}]: `)).trim();
      const selectedIndex = Number(targetAnswer || defaultIndex) - 1;
      selected = allChoices[selectedIndex] ?? null;

      if (!selected) {
        console.log("请输入列表中的有效序号。");
      }
    }

    let scope = "user";
    let includeHooks = true;
    if (selected.id === "all" || isCopyPlatform(selected)) {
      const scopeAnswer = (await rl.question("安装范围 user/project [user]: ")).trim().toLowerCase();
      if (scopeAnswer === "project") {
        scope = "project";
      }

      if (copyTargets.length > 0) {
        const hooksAnswer = (await rl.question("同时复制 SessionStart hooks? [Y/n]: ")).trim().toLowerCase();
        includeHooks = hooksAnswer !== "n" && hooksAnswer !== "no";
      }
    }

    return {
      targets: selected.id === "all" ? ["all"] : [selected.id],
      scope,
      includeHooks,
    };
  } finally {
    rl.close();
  }
}

function printInstallResults(results) {
  for (const result of results) {
    if (result.kind === "copied") {
      const targetLabel = result.targetRoots?.length > 1
        ? result.targetRoots.join(", ")
        : result.targetRoot;
      console.log(`✓ ${result.platform.name} 已安装到 ${targetLabel}`);
      console.log(`  Included: ${result.assets.join(", ")}`);
      if (result.platform.note) {
        console.log(`  Note: ${result.platform.note}`);
      }
      continue;
    }

    console.log(`ℹ ${result.platform.name}: ${result.platform.summary}`);
    for (const command of result.commands ?? []) {
      console.log(`  ${command}`);
    }
    if (result.platform.docUrl) {
      console.log(`  Docs: ${result.platform.docUrl}`);
    }
  }

  console.log("✓ 运行 `npx qiushi-skill validate` 自检当前 checkout 或已发布 bundle。");
}

async function runInstall(parsed) {
  const detected = await detectPlatforms();
  const interactiveChoices = !parsed.targets.length && isInteractive()
    ? await promptInstallChoices(detected)
    : parsed;

  const requestedTargets = normalizeTargets(interactiveChoices.targets, { cwd: process.cwd() });
  if (requestedTargets.length === 0) {
    throw new Error("No install target provided. Use --target or run in an interactive terminal.");
  }

  const results = await installTargets(requestedTargets, {
    packageRoot,
    scope: interactiveChoices.scope,
    includeHooks: interactiveChoices.includeHooks,
    cwd: process.cwd(),
  });
  printInstallResults(results);
}

async function runUninstall(parsed) {
  let targets = normalizeTargets(parsed.targets, { cwd: process.cwd() });

  if (targets.length === 0) {
    if (!isInteractive()) {
      throw new Error("uninstall requires --target in non-interactive mode.");
    }

    const choices = await detectPlatforms();
    const copyChoices = choices.filter(isCopyPlatform);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    try {
      console.log("可卸载的平台：");
      copyChoices.forEach((platform, index) => {
        console.log(`  ${index + 1}. ${platform.name} - ${formatTargetPath(platform, parsed.scope)}`);
      });
      const answer = (await rl.question("选择目标 [1]: ")).trim();
      const selected = copyChoices[Number(answer || "1") - 1];
      if (!selected) {
        throw new Error("Invalid selection.");
      }
      targets = [selected.id];
    } finally {
      rl.close();
    }
  }

  for (const target of targets) {
    const platform = getPlatformById(target, { cwd: process.cwd() });
    if (!platform) {
      throw new Error(`Unknown platform: ${target}`);
    }
    if (!isCopyPlatform(platform)) {
      throw new Error(`Platform '${target}' is guidance-only and cannot be uninstalled by this CLI.`);
    }

    const result = await uninstallTarget(target, {
      scope: parsed.scope,
      cwd: process.cwd(),
    });
    const targetLabel = result.targetRoots?.length > 1
      ? result.targetRoots.join(", ")
      : result.targetRoot;
    console.log(`✓ Removed ${result.platform.name} from ${targetLabel}`);
  }
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2));
  const command = parsed.command ?? "install";

  if (command === "help") {
    printHelp();
    return;
  }

  if (command === "version") {
    console.log(packageJson.version);
    return;
  }

  if (command === "validate") {
    const result = await runValidation({ repoRoot: packageRoot });
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command === "install") {
    await runInstall(parsed);
    return;
  }

  if (command === "uninstall") {
    await runUninstall(parsed);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

try {
  await main();
} catch (error) {
  console.error(`ERROR: ${error.message}`);
  process.exitCode = 1;
}
