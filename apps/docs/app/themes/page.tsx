"use client";

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardDots,
  CardFooter,
  CardHeader,
  CardId,
  CardTitle,
  Field,
  Input,
  Label,
  Mono,
  SectionLabel,
  SplitText,
  Switch,
  useDarkMode,
} from "@eduba/ui";
import Link from "next/link";

export default function ThemesPage() {
  const { isDark, toggle } = useDarkMode();
  return (
    <div className="flex flex-col">
      <section className="border-b border-dashed border-[currentColor]/15 px-8 md:px-12 lg:px-16 pt-10 pb-12">
        <div className="flex items-baseline justify-between mb-8">
          <SectionLabel index="010" label="themes" />
          <Mono className="opacity-50 text-[10px]">two palettes · one switch</Mono>
        </div>
        <h1
          className="font-sans font-bold tracking-[-0.02em] leading-[0.95] max-w-3xl"
          style={{ fontSize: "clamp(40px, 6vw, 96px)" }}
        >
          <SplitText text="light. dark." mode="word" stagger={140} trigger="mount" />
        </h1>
        <p className="mt-6 font-sans font-light text-[length:var(--eb-fs-body)] leading-[var(--eb-lh-body)] opacity-80 max-w-2xl">
          eduba ships two themes — both fully contrast-balanced, both rooted in the brand palette.{" "}
          <em>Paper</em> for editorial light; <em>wine</em> for editorial dark. Pick one, or let{" "}
          <code className="font-mono text-[13px]">prefers-color-scheme</code> decide.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button onClick={toggle}>switch to {isDark ? "light" : "dark"}</Button>
          <Mono className="opacity-60 text-[10px]">
            current ·{" "}
            <span className="opacity-100 font-bold">
              {isDark ? "wine (dark)" : "paper (light)"}
            </span>
          </Mono>
        </div>
      </section>

      <section className="px-8 md:px-12 lg:px-16 pt-10 pb-8">
        <div className="flex items-baseline justify-between mb-6">
          <SectionLabel index="011" label="side by side" />
          <Mono className="opacity-50 text-[10px]">same components · two palettes</Mono>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <ThemeShowcase variant="paper" />
          <ThemeShowcase variant="wine" />
        </div>
      </section>

      <section className="px-8 md:px-12 lg:px-16 pt-8 pb-12">
        <div className="flex items-baseline justify-between mb-6">
          <SectionLabel index="012" label="palette tokens" />
          <Mono className="opacity-50 text-[10px]">active · {isDark ? "wine" : "paper"}</Mono>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(
            [
              ["background", "var(--color-background)"],
              ["foreground", "var(--color-foreground)"],
              ["card", "var(--color-card)"],
              ["card-fg", "var(--color-card-foreground)"],
              ["primary", "var(--color-primary)"],
              ["primary-fg", "var(--color-primary-foreground)"],
              ["muted", "var(--color-muted)"],
              ["accent", "var(--color-accent)"],
            ] as const
          ).map(([name, value]) => (
            <div key={name} className="border border-[currentColor]/15 rounded-sm overflow-hidden">
              <div
                className="aspect-[3/2] border-b border-[currentColor]/15"
                style={{ background: value }}
              />
              <div className="px-2 py-1.5 flex items-center justify-between bg-[var(--color-card)] text-[var(--color-card-foreground)]">
                <Mono className="text-[9px]">{name}</Mono>
                <Mono className="text-[9px] opacity-50">var</Mono>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-dashed border-[currentColor]/15 px-8 md:px-12 lg:px-16 py-6 flex items-center justify-between gap-4 flex-wrap">
        <Mono className="opacity-60">© eduba</Mono>
        <Link href="/docs">
          <Mono className="opacity-60 hover:opacity-100">browse components →</Mono>
        </Link>
      </footer>
    </div>
  );
}

function ThemeShowcase({ variant }: { variant: "paper" | "wine" }) {
  return (
    <div
      data-theme={variant}
      className="rounded-md border border-[currentColor]/10 overflow-hidden bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-[var(--duration-modal)]"
    >
      <div className="px-5 py-4 border-b border-dashed border-[currentColor]/20 flex items-center justify-between">
        <SectionLabel
          index={variant === "paper" ? "01" : "02"}
          label={variant}
          className="text-[10px]"
        />
        <Mono className="opacity-60 text-[9px]">
          {variant === "paper" ? "#FFFFFF · #5D3136" : "#2E1A1D · #FEFBF6"}
        </Mono>
      </div>
      <div className="p-6 flex flex-col gap-5">
        <Card>
          <CardHeader dashedDivider>
            <div className="flex items-center justify-between">
              <CardId>card · 001</CardId>
              <CardDots />
            </div>
            <CardTitle>{variant === "paper" ? "editorial light" : "editorial dark"}</CardTitle>
            <CardDescription>
              {variant === "paper"
                ? "Skin-tone surface against the white page."
                : "Brand-wine surface against the deeper dark page."}
            </CardDescription>
          </CardHeader>
          <CardContent indent>
            <p className="font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed">
              Body text with the first-line indent — the eduba editorial detail.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost">cancel</Button>
            <Button>save</Button>
          </CardFooter>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Badge>default</Badge>
          <Badge variant="solid">solid</Badge>
          <Badge variant="outline">outline</Badge>
          <Badge variant="muted">muted</Badge>
          <Badge variant="success">success</Badge>
          <Badge variant="destructive">danger</Badge>
        </div>

        <Field>
          <Label htmlFor={`theme-input-${variant}`}>email</Label>
          <Input id={`theme-input-${variant}`} placeholder="hello@eduba.io" />
        </Field>

        <Field orientation="horizontal">
          <Switch id={`theme-switch-${variant}`} defaultChecked />
          <Label htmlFor={`theme-switch-${variant}`}>receive updates</Label>
        </Field>
      </div>
    </div>
  );
}
