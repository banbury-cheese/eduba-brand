#!/usr/bin/env node
/**
 * Build shadcn-compatible registry JSON files by inlining component source.
 *
 * Reads:  registry/components/<name>.json  (declarative stubs)
 * Writes: registry/dist/<name>.json        (with `content` populated)
 *
 * Consumed by apps/docs/app/r/[...slug]/route.ts at request time, or used as
 * deployable static JSON for a CDN-backed registry.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "registry", "components");
const OUT_DIR = path.join(ROOT, "registry", "dist");

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const files = await fs.readdir(COMPONENTS_DIR);
  let built = 0;

  for (const filename of files) {
    if (!filename.endsWith(".json")) continue;
    const filePath = path.join(COMPONENTS_DIR, filename);
    const raw = await fs.readFile(filePath, "utf-8");
    const def = JSON.parse(raw);

    for (const entry of def.files ?? []) {
      if (!entry.source) continue;
      try {
        const sourcePath = path.join(ROOT, entry.source);
        entry.content = await fs.readFile(sourcePath, "utf-8");
        delete entry.source;
      } catch (err) {
        console.warn(`! Could not inline ${entry.source}:`, err.message);
      }
    }

    await fs.writeFile(path.join(OUT_DIR, filename), JSON.stringify(def, null, 2) + "\n");
    built++;
  }

  console.log(`Registry: ${built} component(s) built into ${path.relative(ROOT, OUT_DIR)}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
