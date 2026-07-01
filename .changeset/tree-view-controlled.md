---
"@eduba/ui": patch
---

TreeView: controlled expansion and richer customization.

- Controlled/uncontrolled expansion via `expandedIds`, `defaultExpandedIds`, and `onExpandedChange`, plus a `getTreeAncestorIds(data, id)` helper to reveal a nested node by expanding its ancestor path.
- `TreeNode.label` now accepts a `ReactNode` (colored text, badges, a "new" pill, ...), not just a string.
- New `icons={{ file, folder, chevron }}` prop (`TreeViewIcons`) to swap the default glyphs app-wide; a node's own `icon` still takes precedence.
- Fix: the chevron and icon now sit in fixed-width slots, so custom glyphs of any size no longer shift label alignment.

Existing usage (string labels, uncontrolled expansion, no `icons`) is unchanged.
