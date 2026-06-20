"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  /** Override the leaf/branch glyph with custom content. */
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
}

export interface TreeViewProps extends Omit<React.HTMLAttributes<HTMLUListElement>, "onSelect"> {
  data: TreeNode[];
  /** Controlled selected node id. */
  selectedId?: string;
  onSelect?: (id: string, node: TreeNode) => void;
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
}: {
  node: TreeNode;
  depth: number;
  selectedId?: string;
  onSelect?: (id: string, node: TreeNode) => void;
}) {
  const hasChildren = !!node.children?.length;
  const [open, setOpen] = React.useState(node.defaultExpanded ?? depth === 0);
  const selected = selectedId === node.id;

  return (
    <li>
      <button
        type="button"
        data-selected={selected}
        aria-expanded={hasChildren ? open : undefined}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => {
          if (hasChildren) setOpen((o) => !o);
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
        {hasChildren ? <Chevron open={open} /> : <span className="w-3 shrink-0" />}
        {node.icon ?? (hasChildren ? <FolderIcon /> : <FileIcon />)}
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
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export const TreeView = React.forwardRef<HTMLUListElement, TreeViewProps>(
  ({ className, data, selectedId, onSelect, ...props }, ref) => (
    <ul ref={ref} role="tree" className={cn("w-full", className)} {...props}>
      {data.map((node) => (
        <TreeBranch
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </ul>
  ),
);
TreeView.displayName = "TreeView";
