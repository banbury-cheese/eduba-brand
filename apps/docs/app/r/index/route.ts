import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const REGISTRY_INDEX = path.join(process.cwd(), "..", "..", "registry", "registry.json");

export async function GET() {
  try {
    const raw = await fs.readFile(REGISTRY_INDEX, "utf-8");
    return NextResponse.json(JSON.parse(raw), {
      headers: { "Cache-Control": "public, max-age=300, s-maxage=300" },
    });
  } catch {
    return NextResponse.json({ error: "Registry not found" }, { status: 404 });
  }
}
