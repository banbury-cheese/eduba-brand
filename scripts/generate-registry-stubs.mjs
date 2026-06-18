#!/usr/bin/env node
/**
 * Walks packages/ui/src/{components,primitives}/*.tsx, infers dependencies from
 * import statements, and writes a stub registry/components/<name>.json for each
 * (only when one does not already exist).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SOURCE_DIRS = [
  { dir: "packages/ui/src/components", kind: "component" },
  { dir: "packages/ui/src/primitives", kind: "primitive" },
];
const OUT_DIR = path.join(ROOT, "registry", "components");

const IGNORE_DEPS = new Set(["react", "react-dom"]);
const ALWAYS_DEPS = ["clsx", "tailwind-merge"];

async function generate() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  let created = 0;
  let skipped = 0;

  for (const { dir, kind } of SOURCE_DIRS) {
    const fullDir = path.join(ROOT, dir);
    const files = await fs.readdir(fullDir).catch(() => []);

    for (const file of files) {
      if (!file.endsWith(".tsx") && !file.endsWith(".ts")) continue;
      const name = path.basename(file, path.extname(file));
      const outFile = path.join(OUT_DIR, `${name}.json`);

      try {
        await fs.access(outFile);
        skipped++;
        continue;
      } catch {
        // not exists — create it
      }

      const sourcePath = path.join(dir, file);
      const content = await fs.readFile(path.join(ROOT, sourcePath), "utf-8");
      const importMatches = [...content.matchAll(/from\s+["']([^"']+)["']/g)];
      const deps = new Set(ALWAYS_DEPS);
      for (const m of importMatches) {
        const dep = m[1];
        if (!dep || dep.startsWith(".") || dep.startsWith("@/") || dep.startsWith("/")) continue;
        if (IGNORE_DEPS.has(dep)) continue;
        const scoped = dep.startsWith("@")
          ? dep.split("/").slice(0, 2).join("/")
          : dep.split("/")[0];
        if (scoped) deps.add(scoped);
      }

      const def = {
        $schema: "https://ui.shadcn.com/schema/registry-item.json",
        name,
        type: "registry:ui",
        description: `Eduba ${kind} — ${name}.`,
        dependencies: [...deps].sort(),
        registryDependencies: [],
        files: [
          {
            path: `ui/${name}.tsx`,
            type: "registry:ui",
            source: sourcePath,
          },
        ],
      };

      await fs.writeFile(outFile, JSON.stringify(def, null, 2) + "\n");
      created++;
    }
  }
  console.log(`Registry stubs: ${created} created, ${skipped} skipped (already existed).`);
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
