---
"@eduba/ui": patch
---

Fix a packaging regression where importing anything from the main barrel forced consumers to install `recharts`, `@tanstack/react-table`, and `react-hook-form`. `chart`, `data-table`, and `form` are no longer re-exported from `@eduba/ui` — a bare `import { FrameShell } from "@eduba/ui"` no longer drags in a charting + forms stack. These three remain available via their subpaths (`@eduba/ui/chart`, `@eduba/ui/data-table`, `@eduba/ui/form`), restoring the pre-0.0.5 behavior. If you imported `Chart*`, `DataTable`, or `Form*` from the barrel, switch those imports to the matching subpath.
