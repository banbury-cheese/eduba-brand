import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/components/*.{ts,tsx}",
    "src/primitives/*.{ts,tsx}",
    "src/lib/*.{ts,tsx}",
  ],
  format: ["esm"],
  dts: true,
  bundle: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "gsap", "recharts", "@tanstack/react-table", "react-hook-form"],
});
