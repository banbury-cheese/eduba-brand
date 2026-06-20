"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface FileUploadProps {
  /** Controlled list of files. Omit for uncontrolled use. */
  value?: File[];
  onValueChange?: (files: File[]) => void;
  /** `accept` attribute for the file input, e.g. "image/*,.pdf". */
  accept?: string;
  /** Allow multiple files. Default true. */
  multiple?: boolean;
  /** Max number of files kept (older ones drop when exceeded). */
  maxFiles?: number;
  /** Max size per file in bytes; oversized files are rejected. */
  maxSize?: number;
  disabled?: boolean;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  value,
  onValueChange,
  accept,
  multiple = true,
  maxFiles,
  maxSize,
  disabled,
  className,
}: FileUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internal, setInternal] = React.useState<File[]>([]);
  const [dragging, setDragging] = React.useState(false);
  const files = value ?? internal;

  const commit = (next: File[]) => {
    const capped = maxFiles ? next.slice(-maxFiles) : next;
    if (value === undefined) setInternal(capped);
    onValueChange?.(capped);
  };

  const add = (incoming: FileList | null) => {
    if (!incoming || disabled) return;
    let list = Array.from(incoming);
    if (maxSize) list = list.filter((f) => f.size <= maxSize);
    commit(multiple ? [...files, ...list] : list.slice(0, 1));
  };

  const removeAt = (i: number) => commit(files.filter((_, idx) => idx !== i));

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        data-dragging={dragging}
        className={cn(
          "group flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-md px-6 py-8 text-center",
          "border border-dashed border-border bg-background",
          "transition-[border-color,background-color] duration-[var(--duration-tooltip)] ease-out",
          "hover:border-primary/50 hover:bg-muted/40",
          "data-[dragging=true]:border-primary data-[dragging=true]:bg-accent/40",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 text-muted-foreground">
          <path
            d="M12 16V4M8 8l4-4 4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 16v2.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V16"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-sans text-[length:var(--eb-fs-body-sm)] text-foreground">
          <span className="font-medium text-primary">drag &amp; drop</span> or browse
        </span>
        <span className="font-mono uppercase tracking-[0.08em] text-[9px] text-muted-foreground">
          {accept ? accept.replaceAll(",", " · ") : "any file type"}
          {maxSize ? ` · up to ${formatBytes(maxSize)}` : ""}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
      </button>

      {files.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {files.map((file, i) => (
            <li
              key={`${file.name}-${file.size}-${i}`}
              className="flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2"
            >
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 text-muted-foreground"
              >
                <path
                  d="M9 1.5H4.5A1.5 1.5 0 0 0 3 3v10a1.5 1.5 0 0 0 1.5 1.5h7A1.5 1.5 0 0 0 13 13V5.5L9 1.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinejoin="round"
                />
                <path
                  d="M9 1.5V5.5H13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="min-w-0 flex-1 truncate font-sans text-[13px] text-foreground">
                {file.name}
              </span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground">
                {formatBytes(file.size)}
              </span>
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label={`Remove ${file.name}`}
                className="shrink-0 cursor-pointer rounded-sm p-0.5 text-muted-foreground transition-colors hover:text-destructive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5">
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
