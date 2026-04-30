import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { installTarget, uninstallTarget } from "../bin/lib/install.mjs";
import { normalizeTargets } from "../bin/lib/detect-platform.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

async function withTempHome(fn) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "qiushi-skill-test-"));
  const homeDir = path.join(tempRoot, "home");
  const cwd = path.join(tempRoot, "project");

  try {
    await fn({ tempRoot, homeDir, cwd });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function readInstalled(relativePath, context) {
  return readFile(path.join(context.homeDir, relativePath), "utf8");
}

test("codex installs skills directly into the Codex skills directory", async () => {
  await withTempHome(async (context) => {
    const result = await installTarget("codex", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "copied");
    assert.equal(result.targetRoot, path.join(context.homeDir, ".codex", "skills"));
    assert.match(
      await readInstalled(path.join(".codex", "skills", "arming-thought", "SKILL.md"), context),
      /name:\s*arming-thought/
    );
  });
});

test("opencode installs both skills and slash command files", async () => {
  await withTempHome(async (context) => {
    const result = await installTarget("opencode", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "copied");
    assert.deepEqual(result.targetRoots, [
      path.join(context.homeDir, ".config", "opencode", "skills"),
      path.join(context.homeDir, ".config", "opencode", "commands"),
    ]);
    assert.match(
      await readInstalled(path.join(".config", "opencode", "skills", "arming-thought", "SKILL.md"), context),
      /name:\s*arming-thought/
    );
    assert.match(
      await readInstalled(path.join(".config", "opencode", "commands", "contradiction-analysis.md"), context),
      /name:\s*contradiction-analysis/
    );
  });
});

test("all targets include nanobot and install into its workspace skills directory", async () => {
  await withTempHome(async (context) => {
    assert.ok(normalizeTargets(["all"], context).includes("nanobot"));

    const result = await installTarget("nanobot", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "copied");
    assert.equal(result.targetRoot, path.join(context.homeDir, ".nanobot", "workspace", "skills"));
    assert.match(
      await readInstalled(path.join(".nanobot", "workspace", "skills", "arming-thought", "SKILL.md"), context),
      /name:\s*arming-thought/
    );
  });
});

test("uninstall removes managed skill-directory installs without deleting the root", async () => {
  await withTempHome(async (context) => {
    await installTarget("codex", {
      packageRoot: repoRoot,
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    const result = await uninstallTarget("codex", {
      homeDir: context.homeDir,
      cwd: context.cwd,
    });

    assert.equal(result.kind, "removed");
    await assert.rejects(
      readInstalled(path.join(".codex", "skills", "arming-thought", "SKILL.md"), context),
      { code: "ENOENT" }
    );
  });
});
