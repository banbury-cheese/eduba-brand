import type { ReactNode } from "react";
import { Code } from "./code";

/* =============================================================================
   Build-time, syntax-highlighted previews.

   These render in Server Components (Shiki needs Node), then get passed as props
   into the *client* <ComponentPreview> / <ComponentGallery>. Keyed by component
   slug; when an entry exists it overrides the client-rendered demo. Add an entry
   here for any component whose preview is best produced at build time.
   ============================================================================= */

const USAGE_TSX = `import { Button, Stat } from "@eduba/ui";

export function Dashboard({ themes }: { themes: string[] }) {
  return (
    <section className="grid gap-4">
      <Stat label="themes" value={themes.length} />
      <Button onClick={() => console.log("ship it")}>
        Deploy
      </Button>
    </section>
  );
}`;

export const SERVER_PREVIEWS: Record<string, ReactNode> = {
  "code-block": (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Code lang="tsx" filename="dashboard.tsx" code={USAGE_TSX} />
      <Code lang="bash" filename="install" showDots={false} code="pnpm add @eduba/ui" />
    </div>
  ),
};
