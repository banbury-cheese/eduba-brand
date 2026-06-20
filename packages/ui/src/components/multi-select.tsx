"use client";

import * as React from "react";
import { cn } from "../lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

export interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  /** Collapse selected tokens to "N selected" past this count. Default 4. */
  maxDisplay?: number;
  className?: string;
  disabled?: boolean;
}

export function MultiSelect({
  options,
  value,
  onValueChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  emptyMessage = "No results.",
  maxDisplay = 4,
  className,
  disabled,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [internal, setInternal] = React.useState<string[]>([]);
  const selected = value ?? internal;

  const commit = (next: string[]) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const toggle = (v: string) =>
    commit(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v]);

  const labelFor = (v: string) => options.find((o) => o.value === v)?.label ?? v;
  const collapsed = selected.length > maxDisplay;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "flex min-h-10 w-full cursor-pointer items-center justify-between gap-2 rounded-md border border-border bg-background px-2.5 py-1.5",
            "font-sans text-[length:var(--eb-fs-body-sm)] text-foreground shadow-card",
            "transition-[border-color,box-shadow] duration-[var(--duration-tooltip)] ease-out",
            "hover:border-primary/40",
            "focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
        >
          <span className="flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden">
            {selected.length === 0 ? (
              <span className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                {placeholder}
              </span>
            ) : collapsed ? (
              <span className="px-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground">
                {selected.length} selected
              </span>
            ) : (
              selected.map((v) => (
                <span
                  key={v}
                  className="inline-flex items-center gap-1 rounded-sm border border-border bg-muted px-1.5 py-0.5 font-sans text-[12px] text-foreground"
                >
                  {labelFor(v)}
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`Remove ${labelFor(v)}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(v);
                    }}
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
                  </span>
                </span>
              ))
            )}
          </span>
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className={cn(
              "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-[var(--duration-dropdown)] ease-out",
              open && "rotate-180",
            )}
          >
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isOn = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={() => toggle(option.value)}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-[3px] border",
                        isOn
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border",
                      )}
                    >
                      {isOn ? (
                        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
                          <path
                            d="M3 8.5l3.5 3L13 4.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      ) : null}
                    </span>
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
