import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
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
