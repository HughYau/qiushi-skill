import path from "node:path";
import os from "node:os";
import { chmod, cp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { PACKAGE_NAME, formatTargetPath, getPlatformById, isCopyPlatform } from "./detect-platform.mjs";

const MANIFEST_FILE = ".qiushi-skill-install.json";

function normalizePath(targetPath) {
  return path.resolve(targetPath).replace(/[\\\/]+$/, "").toLowerCase();
}

async function exists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function assertManagedTarget(platform, scope, targetPath, options = {}) {
  const expectedTarget = formatTargetPath(platform, scope);
  if (!expectedTarget) {
    throw new Error(`Platform '${platform.id}' does not define a managed install target.`);
  }

  const normalizedTarget = normalizePath(targetPath);
  const normalizedExpected = normalizePath(expectedTarget);

  if (normalizedTarget !== normalizedExpected) {
    throw new Error(`Refusing to touch unexpected target path: ${targetPath}`);
  }

  if ((platform.installKind ?? "bundle") === "bundle" && path.basename(targetPath) !== PACKAGE_NAME) {
    throw new Error(`Refusing to touch unexpected bundle path: ${targetPath}`);
  }

  return options.cwd ?? process.cwd();
}

async function copyAsset(packageRoot, targetRoot, asset) {
  const source = path.join(packageRoot, asset);
  const destination = path.join(targetRoot, path.basename(asset));

  await rm(destination, { recursive: true, force: true });
  await cp(source, destination, { force: true, recursive: true });
}

export function getAssetsForPlatform(platform, { includeHooks = true } = {}) {
  const assets = [...(platform.assets ?? [])];

  if (!includeHooks) {
    return assets.filter((asset) => asset !== "hooks");
  }

  return assets;
}

async function readManifest(targetRoot) {
  const manifestPath = path.join(targetRoot, MANIFEST_FILE);
  if (!(await exists(manifestPath))) {
    return {
      packageName: PACKAGE_NAME,
      version: 1,
      entries: [],
    };
  }

  try {
    const parsed = JSON.parse(await readFile(manifestPath, "utf8"));
    return {
      packageName: parsed.packageName,
      version: parsed.version,
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    };
  } catch (error) {
    throw new Error(`Invalid install manifest at ${manifestPath}: ${error.message}`);
  }
}

async function writeManifest(targetRoot, entries) {
  const manifest = {
    packageName: PACKAGE_NAME,
    version: 1,
    entries: entries.sort((left, right) => left.path.localeCompare(right.path)),
  };

  await writeFile(path.join(targetRoot, MANIFEST_FILE), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
}

function assertRelativeEntry(entryName) {
  if (!entryName || entryName.includes("/") || entryName.includes("\\") || entryName === "." || entryName === "..") {
    throw new Error(`Refusing to install invalid entry name: ${entryName}`);
  }
}

async function assertManagedEntry(targetRoot, entryName, manifestEntries) {
  assertRelativeEntry(entryName);

  const destination = path.join(targetRoot, entryName);
  const normalizedRoot = `${normalizePath(targetRoot)}${path.sep}`;
  const normalizedDestination = normalizePath(destination);

  if (!normalizedDestination.startsWith(normalizedRoot)) {
    throw new Error(`Refusing to touch path outside managed install root: ${destination}`);
  }

  if ((await exists(destination)) && !manifestEntries.has(entryName)) {
    throw new Error(`Refusing to overwrite unmanaged path: ${destination}`);
  }
}

async function copyDirectoryChildren(packageRoot, sourceDir, targetRoot) {
  const sourceRoot = path.join(packageRoot, sourceDir);
  await mkdir(targetRoot, { recursive: true });

  const manifest = await readManifest(targetRoot);
  const manifestEntries = new Set(manifest.entries.map((entry) => entry.path));
  const sourceEntries = await readdir(sourceRoot, { withFileTypes: true });
  const installedEntries = [];

  for (const entry of sourceEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    await assertManagedEntry(targetRoot, entry.name, manifestEntries);
    const source = path.join(sourceRoot, entry.name);
    const destination = path.join(targetRoot, entry.name);
    await rm(destination, { recursive: true, force: true });
    await cp(source, destination, { force: true, recursive: true });
    installedEntries.push({ path: entry.name, type: "directory", source: sourceDir });
  }

  await writeManifest(targetRoot, installedEntries);
  return installedEntries.map((entry) => `${sourceDir}/${entry.path}`);
}

async function copyFiles(packageRoot, sourceDir, targetRoot, extension = ".md") {
  const sourceRoot = path.join(packageRoot, sourceDir);
  await mkdir(targetRoot, { recursive: true });

  const manifest = await readManifest(targetRoot);
  const manifestEntries = new Set(manifest.entries.map((entry) => entry.path));
  const sourceEntries = await readdir(sourceRoot, { withFileTypes: true });
  const installedEntries = [];

  for (const entry of sourceEntries) {
    if (!entry.isFile() || !entry.name.endsWith(extension)) {
      continue;
    }

    await assertManagedEntry(targetRoot, entry.name, manifestEntries);
    const source = path.join(sourceRoot, entry.name);
    const destination = path.join(targetRoot, entry.name);
    await rm(destination, { force: true });
    await cp(source, destination, { force: true });
    installedEntries.push({ path: entry.name, type: "file", source: sourceDir });
  }

  await writeManifest(targetRoot, installedEntries);
  return installedEntries.map((entry) => `${sourceDir}/${entry.path}`);
}

async function removeManagedEntries(targetRoot) {
  const manifestPath = path.join(targetRoot, MANIFEST_FILE);
  const manifest = await readManifest(targetRoot);

  if (manifest.entries.length === 0) {
    if (await exists(manifestPath)) {
      await rm(manifestPath, { force: true });
    }
    return [];
  }

  const removed = [];
  for (const entry of manifest.entries) {
    assertRelativeEntry(entry.path);
    await rm(path.join(targetRoot, entry.path), { recursive: true, force: true });
    removed.push(entry.path);
  }

  await rm(manifestPath, { force: true });
  return removed;
}

export async function installTarget(platformId, options = {}) {
  const { packageRoot, scope = "user", includeHooks = true, cwd = process.cwd(), homeDir = os.homedir() } = options;
  const platform = getPlatformById(platformId, { cwd, homeDir });

  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }

  if (!isCopyPlatform(platform)) {
    return {
      platform,
      kind: "guide",
      commands: platform.guide ?? [],
    };
  }

  const installKind = platform.installKind ?? "bundle";
  const targetRoot = formatTargetPath(platform, scope);
  assertManagedTarget(platform, scope, targetRoot, { cwd });

  if (installKind === "skills" || installKind === "skills-commands") {
    const assets = await copyDirectoryChildren(packageRoot, "skills", targetRoot);
    const targetRoots = [targetRoot];

    if (installKind === "skills-commands") {
      const commandRoot = platform.commandPaths?.[scope];
      if (!commandRoot) {
        throw new Error(`Platform '${platform.id}' does not define a command install target for scope '${scope}'.`);
      }

      assets.push(...await copyFiles(packageRoot, "commands", commandRoot));
      targetRoots.push(commandRoot);
    }

    return {
      platform,
      kind: "copied",
      scope,
      targetRoot,
      targetRoots,
      assets,
    };
  }

  await mkdir(targetRoot, { recursive: true });

  const assets = getAssetsForPlatform(platform, { includeHooks });
  for (const asset of assets) {
    await copyAsset(packageRoot, targetRoot, asset);
  }

  if (assets.includes("hooks")) {
    const hookPath = path.join(targetRoot, "hooks", "session-start");
    await chmod(hookPath, 0o755).catch(() => {});
  }

  return {
    platform,
    kind: "copied",
    scope,
    targetRoot,
    assets,
  };
}

export async function installTargets(targets, options = {}) {
  const results = [];

  for (const target of targets) {
    results.push(await installTarget(target, options));
  }

  return results;
}

export async function uninstallTarget(platformId, options = {}) {
  const { scope = "user", cwd = process.cwd(), homeDir = os.homedir() } = options;
  const platform = getPlatformById(platformId, { cwd, homeDir });

  if (!platform) {
    throw new Error(`Unknown platform: ${platformId}`);
  }

  if (!isCopyPlatform(platform)) {
    return {
      platform,
      kind: "guide",
    };
  }

  const installKind = platform.installKind ?? "bundle";
  const targetRoot = formatTargetPath(platform, scope);
  assertManagedTarget(platform, scope, targetRoot, { cwd });

  if (installKind === "skills" || installKind === "skills-commands") {
    const removed = await removeManagedEntries(targetRoot);
    const targetRoots = [targetRoot];

    if (installKind === "skills-commands") {
      const commandRoot = platform.commandPaths?.[scope];
      if (commandRoot) {
        removed.push(...await removeManagedEntries(commandRoot));
        targetRoots.push(commandRoot);
      }
    }

    return {
      platform,
      kind: "removed",
      targetRoot,
      targetRoots,
      removed,
    };
  }

  await rm(targetRoot, { recursive: true, force: true });

  return {
    platform,
    kind: "removed",
    targetRoot,
  };
}
