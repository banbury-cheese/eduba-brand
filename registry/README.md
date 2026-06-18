# Eduba shadcn-compatible registry

Per-component definitions used by the shadcn CLI when consumers run
`npx shadcn@latest add https://ui.eduba.io/r/<name>`.

The `apps/docs` Next.js app serves these JSON files via its `/r/[...slug]/route.ts`
handler. The directory layout is:

```
registry/
├── registry.json                # index, served at /r/index
└── components/
    └── <name>.json              # per-component def, served at /r/<name>
```

Each component file follows the shadcn registry schema:

```json
{
  "name": "button",
  "type": "registry:ui",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "registryDependencies": [],
  "files": [
    {
      "path": "ui/button.tsx",
      "content": "...",
      "type": "registry:ui"
    }
  ],
  "tailwind": {},
  "cssVars": {}
}
```

The component `content` is the actual source. For first iteration, this directory
contains stubs that reference the package source; a build step (`pnpm build:registry`)
will inline content at deploy time.
