import {
  BrownBand,
  Button,
  Card,
  CardContent,
  CardDots,
  CardFooter,
  CardHeader,
  CardId,
  CardTitle,
  Magnetic,
  Marquee,
  Mono,
  NumberTicker,
  Reveal,
  ScrambleText,
  SectionLabel,
  SplitText,
  UnderlineDraw,
} from "@eduba/ui";
import Link from "next/link";
import { highlight } from "../lib/highlight";

const PHASES: {
  id: string;
  label: string;
  count: number;
  theme?: "paper" | "wine";
  description: string;
}[] = [
  {
    id: "01",
    label: "foundations",
    count: 11,
    description: "Typography, Button, Field, Badge, Avatar — the visual contract.",
  },
  {
    id: "02",
    label: "form controls",
    count: 15,
    description: "Input, Select, Combobox, Calendar, Switch — and every flavor between.",
  },
  {
    id: "03",
    label: "overlays & feedback",
    count: 11,
    theme: "wine",
    description: "Dialog, Drawer, Tooltip, Toast — origin-aware, precision-timed.",
  },
  {
    id: "04",
    label: "navigation",
    count: 11,
    description: "Tabs, Accordion, Command, Sidebar — page-level scaffolding.",
  },
  {
    id: "05",
    label: "layout & data",
    count: 10,
    description: "Card, Carousel, Table, Resizable — composition surfaces.",
  },
  {
    id: "06",
    label: "motion primitives",
    count: 13,
    theme: "wine",
    description: "Scramble, SplitText, Reveal, Stagger, HoldToConfirm — the brand layer.",
  },
];

const STATS: { label: string; value: number }[] = [
  { label: "components", value: 73 },
  { label: "primitives", value: 13 },
  { label: "themes", value: 2 },
  { label: "phases", value: 6 },
];

const META: { label: string; value: string }[] = [
  { label: "stack", value: "radix · tailwind v4" },
  { label: "type", value: "diatype · plex mono" },
  { label: "license", value: "mit" },
];

const STACK = [
  "DIATYPE",
  "IBM PLEX MONO",
  "RADIX UI",
  "TAILWIND v4",
  "GSAP",
  "VAUL",
  "SONNER",
  "CMDK",
  "EMBLA",
  "TANSTACK TABLE",
  "RECHARTS",
  "SHIKI",
];

const PAD = "px-5 sm:px-8 md:px-12 lg:px-16";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ============================================================ HERO */}
      <section
        className={`${PAD} border-b border-dashed border-[currentColor]/15 pt-10 pb-12 md:pb-16`}
      >
        <div className="mb-8 flex items-baseline justify-between md:mb-10">
          <SectionLabel index="000" label="overview" />
          <Mono className="hidden text-[10px] opacity-50 sm:block">v0.0.4 · brand-native</Mono>
        </div>

        <h1
          className="font-sans font-bold leading-[0.95] tracking-[-0.02em] sm:leading-[0.92]"
          style={{ fontSize: "clamp(30px, 8vw, 112px)" }}
        >
          <SplitText
            text={"a brand-native\ncomponent library."}
            mode="line"
            stagger={110}
            trigger="mount"
          />
        </h1>

        <div className="mt-10 grid items-start gap-8 md:mt-12 md:gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-7 lg:col-span-7">
            <p className="max-w-2xl font-sans text-[length:var(--eb-fs-body)] font-light leading-[var(--eb-lh-body)] text-muted-foreground">
              Built on Radix + Tailwind v4 with eduba&apos;s editorial DNA — fluid type, a warm
              earth palette, monospace labels, dashed focus rings, and motion held to a strict
              duration-and-easing budget. Light and dark themes, zero invented opinions.
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <Magnetic strength={0.25}>
                <Button size="lg" asChild>
                  <Link href="/docs">browse components</Link>
                </Button>
              </Magnetic>
              <Button size="lg" variant="outline" asChild>
                <Link href="/themes">view themes</Link>
              </Button>
            </div>
          </div>

          {/* Editorial spec sheet — fills the column with real metadata. */}
          <div className="lg:col-span-5 lg:pl-8">
            <div className="rounded-lg border border-dashed border-[currentColor]/25 bg-card/50 p-5 md:p-6">
              <div className="flex items-center justify-between border-b border-dashed border-[currentColor]/20 pb-3">
                <Mono className="text-[11px] opacity-70">index</Mono>
                <CardDots />
              </div>
              <dl className="grid grid-cols-2 gap-x-6">
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`flex items-baseline justify-between border-b border-[currentColor]/10 py-3 ${i >= STATS.length - 2 ? "border-b-0" : ""}`}
                  >
                    <dt>
                      <Mono className="text-[10px] font-semibold opacity-55">{stat.label}</Mono>
                    </dt>
                    <dd className="font-sans text-2xl font-semibold leading-none tabular-nums">
                      <NumberTicker value={stat.value} trigger="mount" duration={1100} />
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-3 flex flex-col gap-2 border-t border-dashed border-[currentColor]/20 pt-3">
                {META.map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-4">
                    <Mono className="text-[10px] font-semibold opacity-55">{m.label}</Mono>
                    <span className="truncate font-mono text-[11px] tracking-[0.04em] opacity-80">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= MARQUEE */}
      <section className="border-b border-dashed border-[currentColor]/15">
        <div className={`${PAD} py-5`}>
          <Marquee speed={26} gap={48} pauseOnHover>
            {STACK.map((label) => (
              <span
                key={label}
                className="inline-flex items-center gap-4 font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                <ScrambleText text={label} trigger="hover" />
                <span aria-hidden="true" className="text-[8px] opacity-40">
                  ◆
                </span>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ===================================================== PHASE GRID */}
      <section className={`${PAD} pt-14 pb-10`}>
        <div className="mb-8 flex items-baseline justify-between">
          <SectionLabel index="001" label="phases" />
          <Mono className="text-[10px] opacity-50">six layers, one library</Mono>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((phase, i) => (
            <Reveal key={phase.id} delay={i * 60} distance="24px" className="h-full">
              <Link href="/docs" className="group block h-full">
                <Card
                  theme={phase.theme}
                  className="flex h-full flex-col transition-[border-color,box-shadow,transform] duration-[var(--duration-press)] ease-out group-hover:-translate-y-0.5 group-hover:shadow-pop"
                >
                  <CardHeader dashedDivider>
                    <div className="flex items-center justify-between">
                      <CardId>{phase.id} · phase</CardId>
                      <CardDots />
                    </div>
                    <CardTitle>{phase.label}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed opacity-70">
                      {phase.description}
                    </p>
                  </CardContent>
                  <CardFooter className="items-center justify-between">
                    <span className="flex items-baseline gap-1.5">
                      <span className="font-sans text-3xl font-semibold leading-none tabular-nums">
                        <NumberTicker value={phase.count} trigger="view" />
                      </span>
                      <Mono className="text-[10px] opacity-50">components</Mono>
                    </span>
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm opacity-40 transition-[transform,opacity] duration-[var(--duration-press)] ease-out group-hover:translate-x-0.5 group-hover:opacity-90"
                    >
                      →
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================================================= INSTALL */}
      <section className={`${PAD} pt-6 pb-12`}>
        <div className="mb-8 flex items-baseline justify-between">
          <SectionLabel index="002" label="install" />
          <Mono className="text-[10px] opacity-50">one import</Mono>
        </div>
        <div className="grid items-start gap-8 md:grid-cols-12">
          <div className="md:col-span-7">
            <InstallCard
              id="via npm"
              title="install the package"
              blurb="Add the package, import the stylesheet once, wrap your app in the theme provider. Updates flow through your lockfile."
              file="terminal"
              lang="bash"
              code={`pnpm add @eduba/ui

# then, in your global stylesheet
@import "tailwindcss";
@import "@eduba/ui/styles.css";`}
            />
          </div>
          <dl className="flex flex-col gap-3 md:col-span-5 md:pl-2">
            {[
              ["peers", "react · react-dom"],
              ["chart", "+ recharts"],
              ["data-table", "+ @tanstack/react-table"],
              ["fonts", "self-host diatype"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-4 border-b border-dashed border-[currentColor]/15 pb-2.5"
              >
                <Mono className="text-[10px] font-semibold opacity-55">{k}</Mono>
                <span className="text-right font-mono text-[11px] tracking-[0.02em] opacity-80">
                  {v}
                </span>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============================================================ CTA */}
      <section className={`${PAD} pb-14`}>
        <BrownBand className="flex flex-col gap-8 p-9 md:flex-row md:items-end md:justify-between md:p-14">
          <div className="flex max-w-xl flex-col gap-3">
            <Mono className="text-[11px] opacity-70">003 · ready when you are</Mono>
            <h2
              className="font-sans font-semibold leading-[1.05]"
              style={{ fontSize: "clamp(30px, 3.6vw, 48px)" }}
            >
              <ScrambleText text="START BUILDING" trigger="view" />
            </h2>
            <p className="font-sans font-light leading-relaxed opacity-80">
              Open the components index, pull something off the shelf, drop it into your app.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button size="lg" variant="glow" asChild>
              <Link href="/docs">enter the docs</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-[var(--eb-cream)]/40 text-[var(--eb-cream)] hover:bg-[var(--eb-cream)]/10 hover:text-[var(--eb-cream)]"
              asChild
            >
              <Link href="/themes">try the themes</Link>
            </Button>
          </div>
        </BrownBand>
      </section>

      {/* ====================================================== FOOTER */}
      <footer
        className={`${PAD} flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[currentColor]/15 py-6`}
      >
        <Mono className="text-[10px] opacity-60">© eduba · 2026</Mono>
        <Mono className="flex items-center gap-2 text-[10px] opacity-60">
          <UnderlineDraw>made in editorial earth tones</UnderlineDraw>
        </Mono>
      </footer>
    </div>
  );
}

async function InstallCard({
  id,
  tag,
  title,
  blurb,
  file,
  code,
  lang = "bash",
}: {
  id: string;
  tag?: string;
  title: string;
  blurb: string;
  file: string;
  code: string;
  lang?: string;
}) {
  const html = await highlight(code, lang);
  return (
    <Card className="flex flex-col">
      <CardHeader dashedDivider>
        <div className="flex items-center justify-between">
          <CardId>{id}</CardId>
          {tag ? (
            <Mono className="rounded-sm border border-[currentColor]/20 px-1.5 py-0.5 text-[9px] opacity-60">
              {tag}
            </Mono>
          ) : null}
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <p className="font-sans text-[length:var(--eb-fs-body-sm)] leading-relaxed opacity-70">
          {blurb}
        </p>
        <div className="mt-auto overflow-hidden rounded-md border border-[currentColor]/12">
          <div className="flex items-center gap-2 border-b border-[currentColor]/12 bg-[var(--eb-muted-bg)] px-3 py-2">
            <CardDots />
            <Mono className="text-[9px] opacity-55">{file}</Mono>
          </div>
          <pre className="overflow-x-auto bg-[var(--eb-muted-bg)] px-4 py-3.5 font-mono text-[12px] leading-relaxed text-[var(--eb-fg)]">
            {/* biome-ignore lint/security/noDangerouslySetInnerHtml: build-time Shiki highlight output */}
            <code dangerouslySetInnerHTML={{ __html: html }} />
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}
