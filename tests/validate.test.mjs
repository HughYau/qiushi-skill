import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { runValidation } from "../bin/lib/validate.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function captureStream() {
  let output = "";
  return {
    stream: {
      write(chunk) {
        output += String(chunk);
      },
    },
    output() {
      return output;
    },
  };
}

async function withCopiedRepo(run) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "qiushi-skill-validate-"));
  const packageRoot = path.join(tempRoot, "package");

  try {
    await cp(repoRoot, packageRoot, {
      recursive: true,
      filter(source) {
        const relative = path.relative(repoRoot, source);
        return !relative.startsWith(".git")
          && !relative.includes(`${path.sep}node_modules${path.sep}`);
      },
    });
    await run(packageRoot);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

test("validate succeeds in a published package without docs directory", async () => {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), "qiushi-skill-published-"));
  const packageRoot = path.join(tempRoot, "package");
  const stdout = captureStream();
  const stderr = captureStream();

  try {
    await cp(repoRoot, packageRoot, {
      recursive: true,
      filter(source) {
        const relative = path.relative(repoRoot, source);
        return !relative.startsWith(".git")
          && !relative.startsWith("docs")
          && !relative.includes(`${path.sep}node_modules${path.sep}`)
          && !relative.startsWith("tests");
      },
    });

    const result = await runValidation({
      repoRoot: packageRoot,
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    assert.equal(result.ok, true, stderr.output());
    assert.match(
      await readFile(path.join(packageRoot, "README.md"), "utf8"),
      /https:\/\/github\.com\/HughYau\/qiushi-skill\/blob\/main\/docs\/assets\/tangping_editorial_perspective\.md/
    );
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
});

test("validate rejects a command file that is not listed in COMMANDS", async () => {
  await withCopiedRepo(async (packageRoot) => {
    const stdout = captureStream();
    const stderr = captureStream();

    // A file that exists on disk but is absent from the hard-coded COMMANDS
    // list must not pass silently, otherwise the list can drift unnoticed.
    await writeFile(
      path.join(packageRoot, "commands", "not-listed.md"),
      "---\nname: not-listed\ndescription: |\n  placeholder\n---\n",
      "utf8"
    );

    const result = await runValidation({
      repoRoot: packageRoot,
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    assert.equal(result.ok, false, "expected validation to fail for an unlisted command");
    assert.ok(
      result.errors.some((error) => error.includes("commands/not-listed.md")),
      `expected an error mentioning the unlisted command, got: ${JSON.stringify(result.errors)}`
    );
  });
});

test("validate reports a missing hook instead of throwing", async () => {
  await withCopiedRepo(async (packageRoot) => {
    const stdout = captureStream();
    const stderr = captureStream();

    // Removing the shell hook used to make the validator throw an uncaught
    // ENOENT and discard every error collected so far.
    await rm(path.join(packageRoot, "hooks", "session-start"));

    const result = await runValidation({
      repoRoot: packageRoot,
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    assert.equal(result.ok, false, "expected validation to fail when the hook is missing");
    assert.ok(
      result.errors.some((error) => error.includes("hooks/session-start")),
      `expected an error mentioning the missing hook, got: ${JSON.stringify(result.errors)}`
    );
  });
});

test("validate checks local links inside skill markdown files", async () => {
  await withCopiedRepo(async (packageRoot) => {
    const stdout = captureStream();
    const stderr = captureStream();

    // skills/*/SKILL.md carry cross references (e.g. original-texts.md) that
    // were outside link validation entirely; a broken one must be reported.
    // Keep the frontmatter intact so only link validation is exercised.
    const skillPath = path.join(packageRoot, "skills", "mass-line", "SKILL.md");
    const original = await readFile(skillPath, "utf8");
    await writeFile(skillPath, `${original}\nSee [the missing](does-not-exist.md).\n`, "utf8");

    const result = await runValidation({
      repoRoot: packageRoot,
      stdout: stdout.stream,
      stderr: stderr.stream,
    });

    assert.equal(result.ok, false, "expected validation to fail for a broken skill link");
    assert.ok(
      result.errors.some(
        (error) => error.includes("does-not-exist.md") && error.includes(`skills${path.sep}mass-line${path.sep}SKILL.md`)
      ),
      `expected an error for the broken skill link, got: ${JSON.stringify(result.errors)}`
    );
  });
});

test("validate passes with all current skill markdown links", async () => {
  const stdout = captureStream();
  const stderr = captureStream();

  // The repository itself must stay green: every current local link in
  // skills/commands/agents resolves, so the expanded coverage changes nothing.
  const result = await runValidation({
    repoRoot,
    stdout: stdout.stream,
    stderr: stderr.stream,
  });

  assert.equal(result.ok, true, stderr.output());
});
