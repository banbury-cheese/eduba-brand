import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const REGISTRY_DIR = path.join(process.cwd(), "..", "..", "registry", "components");

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const name = slug.join("/").replace(/\.json$/, "");
  try {
    const filePath = path.join(REGISTRY_DIR, `${name}.json`);
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw);
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch {
    return NextResponse.json(
      { error: `Component "${name}" not found in registry` },
      { status: 404 },
    );
  }
}
