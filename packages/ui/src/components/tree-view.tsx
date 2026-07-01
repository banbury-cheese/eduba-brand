"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface TreeNode {
  id: string;
  /** Row content — a string, or any node (colored text, a badge, a fading "new" dot). */
  label: React.ReactNode;
  children?: TreeNode[];
  /** Override the leaf/branch glyph for this node. Wins over the global `icons` prop. */
  icon?: React.ReactNode;
  /** Uncontrolled initial open state for this branch. Ignored when the TreeView is controlled via `expandedIds`. */
  defaultExpanded?: boolean;
}

/** Swap the built-in glyphs app-wide. A node's own `icon` still takes precedence. */
export interface TreeViewIcons {
  /** Leaf (no children) glyph. */
  file?: React.ReactNode;
  /** Branch (has children) glyph. */
  folder?: React.ReactNode;
  /** Disclosure glyph; receives whether the branch is currently open. */
  chevron?: (open: boolean) => React.ReactNode;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  data: TreeNode[];
  /** Controlled selected node id. */
  selectedId?: string;
  onSelect?: (id: string, node: TreeNode) => void;
  /**
   * Controlled list of expanded (open) branch ids. When provided, the TreeView
   * no longer manages its own open state — you own it via `onExpandedChange`.
   * Use this to merge in new nodes and auto-reveal them by adding their
   * ancestor ids (see `getTreeAncestorIds`).
   */
  expandedIds?: string[];
  /**
   * Uncontrolled initial expanded branch ids. Ignored when `expandedIds` is set.
   * If omitted, the legacy default applies: depth-0 branches (and any branch with
   * `defaultExpanded`) start open.
   */
  defaultExpandedIds?: string[];
  /** Called with the next expanded-id list whenever a branch opens or closes. */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Swap the default file / folder / chevron glyphs app-wide. Per-node `icon` still wins. */
  icons?: TreeViewIcons;
}

/**
 * Ids of every ancestor of `targetId`, root-first (excluding the target itself).
 * Add these to a controlled TreeView's `expandedIds` to reveal a nested node:
 *   setExpanded((ids) => [...new Set([...ids, ...getTreeAncestorIds(data, fileId)])]);
 * Returns [] if the id isn't found.
 */
export function getTreeAncestorIds(data: TreeNode[], targetId: string): string[] {
  let found: string[] | null = null;
  const walk = (nodes: TreeNode[], trail: string[]) => {
    for (const node of nodes) {
      if (found) return;
      if (node.id === targetId) {
        found = trail;
        return;
      }
      if (node.children?.length) walk(node.children, [...trail, node.id]);
    }
  };
  walk(data, []);
  return found ?? [];
}

/** Legacy uncontrolled default: a branch starts open if `defaultExpanded ?? depth === 0`. */
function collectDefaultExpanded(nodes: TreeNode[], depth = 0, acc: string[] = []): string[] {
  for (const node of nodes) {
    if (node.children?.length) {
      if (node.defaultExpanded ?? depth === 0) acc.push(node.id);
      collectDefaultExpanded(node.children, depth + 1, acc);
    }
  }
  return acc;
}

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className={cn(
      "h-3 w-3 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-press)] ease-out",
      open && "rotate-90",
    )}
  >
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
  >
    <path
      d="M1.5 4.5A1 1 0 0 1 2.5 3.5h3l1.2 1.5h5.8a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-10a1 1 0 0 1-1-1v-8Z"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

const FileIcon = () => (
  <svg
    viewBox="0 0 16 16"
    aria-hidden="true"
    className="h-3.5 w-3.5 shrink-0 text-muted-foreground"
  >
    <path
      d="M9 1.8H4.5a1 1 0 0 0-1 1v10.4a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V5.3L9 1.8Z"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinejoin="round"
    />
    <path
      d="M9 1.8V5.3h3.5"
      stroke="currentColor"
      strokeWidth="1.3"
      fill="none"
      strokeLinejoin="round"
    />
  </svg>
);

function TreeBranch({
  node,
  depth,
  selectedId,
  onSelect,
  expanded,
  onToggle,
  icons,
}: {
  node: TreeNode;
  depth: number;
  selectedId?: string;
  onSelect?: (id: string, node: TreeNode) => void;
  expanded: Set<string>;
  onToggle: (id: string) => void;
  icons?: TreeViewIcons;
}) {
  const hasChildren = !!node.children?.length;
  const open = hasChildren && expanded.has(node.id);
  const selected = selectedId === node.id;

  return (
    <li>
      <button
        type="button"
        data-selected={selected}
        aria-expanded={hasChildren ? open : undefined}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) onToggle(node.id);
          onSelect?.(node.id, node);
        }}
        className={cn(
          "flex w-full items-center gap-1.5 rounded-sm py-1.5 pr-2 text-left",
          "font-sans text-[13px] text-foreground outline-none",
          "transition-colors duration-[var(--duration-press)] ease-out",
          "hover:bg-accent/50",
          "data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-ring",
        )}
      >
        {/* Fixed-width disclosure slot so a custom chevron can't shift alignment. */}
        <span className="flex w-3 shrink-0 items-center justify-center">
          {hasChildren ? (icons?.chevron?.(open) ?? <Chevron open={open} />) : null}
        </span>
        {/* Fixed-width, centered icon slot so labels line up regardless of the
            icon's own size (a small custom glyph won't shift the label). */}
        <span className="flex w-3.5 shrink-0 items-center justify-center">
          {node.icon ??
            (hasChildren ? (icons?.folder ?? <FolderIcon />) : (icons?.file ?? <FileIcon />))}
        </span>
        <span className="truncate">{node.label}</span>
      </button>
      {hasChildren && open ? (
        <ul>
          {node.children?.map((child) => (
            <TreeBranch
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              expanded={expanded}
              onToggle={onToggle}
              icons={icons}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  (
    {
      className,
      data,
      selectedId,
      onSelect,
      expandedIds,
      defaultExpandedIds,
      onExpandedChange,
      icons,
      ...props
    },
    ref,
  ) => {
    const isControlled = expandedIds !== undefined;
    const [internal, setInternal] = React.useState<Set<string>>(
      () => new Set(defaultExpandedIds ?? collectDefaultExpanded(data)),
    );
    // Keep a ref in sync so the toggle handler reads the latest set without stale closures.
    const internalRef = React.useRef(internal);
    internalRef.current = internal;

    const expanded = isControlled ? new Set(expandedIds) : internal;

    const onToggle = React.useCallback(
      (id: string) => {
        const current = expandedIds !== undefined ? new Set(expandedIds) : internalRef.current;
        const next = new Set(current);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        onExpandedChange?.(Array.from(next));
        if (expandedIds === undefined) setInternal(next);
      },
      [expandedIds, onExpandedChange],
    );

    return (
      <ul ref={ref} role="tree" className={cn("w-full", className)} {...props}>
        {data.map((node) => (
          <TreeBranch
            key={node.id}
            node={node}
            depth={0}
            selectedId={selectedId}
            onSelect={onSelect}
            expanded={expanded}
            onToggle={onToggle}
            icons={icons}
          />
        ))}
      </ul>
    );
  },
);
TreeView.displayName = "TreeView";
