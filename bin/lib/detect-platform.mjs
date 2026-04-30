import os from "node:os";
import path from "node:path";
import { access } from "node:fs/promises";

export const PACKAGE_NAME = "qiushi-skill";
export const REPOSITORY = "HughYau/qiushi-skill";
export const GITHUB_BLOB_BASE = "https://github.com/HughYau/qiushi-skill/blob/main";

async function exists(targetPath) {
  try {
    await access(targetPath);
    return true;
  } catch {
    return false;
  }
}

export function getPlatformCatalog({ cwd = process.cwd(), homeDir = os.homedir(), env = process.env } = {}) {
  const codexHome = env.CODEX_HOME || path.join(homeDir, ".codex");
  const opencodeConfig = env.XDG_CONFIG_HOME
    ? path.join(env.XDG_CONFIG_HOME, "opencode")
    : path.join(homeDir, ".config", "opencode");

  return [
    {
      id: "claude-code",
      name: "Claude Code",
      mode: "copy",
      installKind: "bundle",
      summary: "复制 Claude 插件 bundle 到标准 plugins 目录",
      assets: ["skills", "commands", "agents", "hooks", ".claude-plugin"],
      paths: {
        user: path.join(homeDir, ".claude", "plugins", PACKAGE_NAME),
        project: path.join(cwd, ".claude", "plugins", PACKAGE_NAME),
      },
      markers: [path.join(homeDir, ".claude"), path.join(cwd, ".claude")],
    },
    {
      id: "cursor",
      name: "Cursor",
      mode: "copy",
      installKind: "bundle",
      summary: "复制 Cursor 插件元数据与方法论资产到标准 plugins 目录",
      assets: ["skills", "commands", "agents", "hooks", ".cursor-plugin"],
      paths: {
        user: path.join(homeDir, ".cursor", "plugins", PACKAGE_NAME),
        project: path.join(cwd, ".cursor", "plugins", PACKAGE_NAME),
      },
      markers: [path.join(homeDir, ".cursor"), path.join(cwd, ".cursor")],
      note: "如果你的 Cursor 使用了自定义插件目录，请把目标路径改为你的实际配置路径。",
    },
    {
      id: "codex",
      name: "Codex",
      mode: "copy",
      installKind: "skills",
      summary: "复制 skills 到 Codex 可发现的 skills 目录",
      paths: {
        user: path.join(codexHome, "skills"),
        project: path.join(cwd, ".codex", "skills"),
      },
      markers: [codexHome, path.join(cwd, ".codex")],
      docUrl: `${GITHUB_BLOB_BASE}/.codex/INSTALL.md`,
    },
    {
      id: "opencode",
      name: "OpenCode",
      mode: "copy",
      installKind: "skills-commands",
      summary: "复制 skills 与 Markdown slash commands 到 OpenCode 配置目录",
      paths: {
        user: path.join(opencodeConfig, "skills"),
        project: path.join(cwd, ".opencode", "skills"),
      },
      commandPaths: {
        user: path.join(opencodeConfig, "commands"),
        project: path.join(cwd, ".opencode", "commands"),
      },
      markers: [opencodeConfig, path.join(cwd, ".opencode")],
      docUrl: `${GITHUB_BLOB_BASE}/.opencode/INSTALL.md`,
    },
    {
      id: "openclaw",
      name: "OpenClaw",
      mode: "copy",
      installKind: "skills",
      summary: "复制 skills 到 OpenClaw managed/workspace skill root；仍可改用 GitHub marketplace",
      paths: {
        user: path.join(homeDir, ".openclaw", "skills", PACKAGE_NAME),
        project: path.join(cwd, "skills", PACKAGE_NAME),
      },
      markers: [path.join(homeDir, ".openclaw"), path.join(cwd, ".openclaw")],
      docUrl: `${GITHUB_BLOB_BASE}/.openclaw/INSTALL.md`,
      note: `也可以使用 OpenClaw marketplace：openclaw plugins install ${PACKAGE_NAME}@${REPOSITORY}`,
    },
    {
      id: "hermes",
      name: "Hermes Agent",
      mode: "copy",
      installKind: "skills",
      summary: "复制 skills 到 Hermes skills 目录的 qiushi-skill 分组下",
      paths: {
        user: path.join(homeDir, ".hermes", "skills", PACKAGE_NAME),
        project: path.join(cwd, ".hermes", "skills", PACKAGE_NAME),
      },
      markers: [path.join(homeDir, ".hermes"), path.join(cwd, ".hermes")],
      docUrl: `${GITHUB_BLOB_BASE}/.hermes/INSTALL.md`,
      note: "Hermes 默认扫描 ~/.hermes/skills；project scope 需要在 Hermes 配置中加入对应 external_dirs。",
    },
    {
      id: "nanobot",
      name: "nanobot",
      mode: "copy",
      installKind: "skills",
      summary: "复制 skills 到 nanobot workspace skills 目录",
      paths: {
        user: path.join(homeDir, ".nanobot", "workspace", "skills"),
        project: path.join(cwd, ".nanobot", "workspace", "skills"),
      },
      markers: [path.join(homeDir, ".nanobot"), path.join(cwd, ".nanobot")],
      docUrl: `${GITHUB_BLOB_BASE}/.nanobot/INSTALL.md`,
      note: "如你的 nanobot workspace 不在默认位置，请把安装后的 skills 目录同步到实际 workspace。",
    },
  ];
}

export async function detectPlatforms(options = {}) {
  const catalog = getPlatformCatalog(options);
  const results = [];

  for (const platform of catalog) {
    let detected = false;

    for (const marker of platform.markers ?? []) {
      if (await exists(marker)) {
        detected = true;
        break;
      }
    }

    results.push({ ...platform, detected });
  }

  return results;
}

export function getPlatformById(platformId, options = {}) {
  return getPlatformCatalog(options).find((platform) => platform.id === platformId) ?? null;
}

export function formatTargetPath(platform, scope = "user") {
  if (!platform?.paths) {
    return null;
  }

  return platform.paths[scope] ?? null;
}

export function isCopyPlatform(platform) {
  return platform?.mode === "copy";
}

export function normalizeTargets(input, options = {}) {
  const catalog = getPlatformCatalog(options);
  const allIds = catalog.map((platform) => platform.id);

  if (!input || input.length === 0) {
    return [];
  }

  const expanded = [];
  for (const value of input) {
    for (const item of String(value).split(",")) {
      const normalized = item.trim().toLowerCase();
      if (!normalized) {
        continue;
      }

      if (normalized === "all") {
        return allIds;
      }

      expanded.push(normalized);
    }
  }

  return [...new Set(expanded)];
}
