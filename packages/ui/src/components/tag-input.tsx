"use client";

import * as React from "react";
import { cn } from "../lib/utils";

export interface TagInputProps {
  value?: string[];
  onValueChange?: (tags: string[]) => void;
  placeholder?: string;
  /** Cap the number of tags. */
  maxTags?: number;
  /** Reject duplicate tags (case-insensitive). Default true. */
  dedupe?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function TagInput({
  value,
  onValueChange,
  placeholder = "Add tag…",
  maxTags,
  dedupe = true,
  disabled,
  className,
  id,
}: TagInputProps) {
  const [internal, setInternal] = React.useState<string[]>([]);
  const [draft, setDraft] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);
  const tags = value ?? internal;

  const commit = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const addTag = (raw: string) => {
    const tag = raw.trim();
    if (!tag) return;
    if (maxTags && tags.length >= maxTags) return;
    if (dedupe && tags.some((t) => t.toLowerCase() === tag.toLowerCase())) {
      setDraft("");
      return;
    }
    commit([...tags, tag]);
    setDraft("");
  };

  const removeAt = (i: number) => commit(tags.filter((_, idx) => idx !== i));

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex min-h-10 w-full flex-wrap items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5",
        "shadow-card transition-[border-color,box-shadow] duration-[var(--duration-tooltip)] ease-out",
        "focus-within:border-primary focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        disabled && "cursor-not-allowed opacity-50",
        className,
      )}
    >
      {tags.map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="inline-flex items-center gap-1 rounded-sm border border-border bg-muted px-1.5 py-0.5 font-sans text-[12px] text-foreground"
        >
          {tag}
          <button
            type="button"
            disabled={disabled}
            onClick={(e) => {
              e.stopPropagation();
              removeAt(i);
            }}
            aria-label={`Remove ${tag}`}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-destructive"
          >
            <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        id={id}
        type="text"
        disabled={disabled || (maxTags ? tags.length >= maxTags : false)}
        value={draft}
        placeholder={tags.length === 0 ? placeholder : ""}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            addTag(draft);
          } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
            removeAt(tags.length - 1);
          }
        }}
        onBlur={() => addTag(draft)}
        className={cn(
          "min-w-[6ch] flex-1 bg-transparent px-1 py-0.5 font-sans text-[length:var(--eb-fs-body-sm)] text-foreground",
          "outline-none placeholder:font-mono placeholder:text-[10px] placeholder:font-semibold placeholder:uppercase placeholder:tracking-[0.08em] placeholder:text-muted-foreground",
          "disabled:cursor-not-allowed",
        )}
      />
    </div>
  );
}
