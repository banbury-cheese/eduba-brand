"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertTitle,
  AspectRatio,
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Badge,
  Banner,
  BannerTitle,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BrownBand,
  Button,
  ButtonGroup,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardDots,
  CardFooter,
  CardHeader,
  CardId,
  CardTitle,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  Checkbox,
  Chip,
  CodeBlock,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Combobox,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
  DashedFrame,
  DataTable,
  DatePicker,
  type DateRange,
  DateRangePicker,
  DescriptionItem,
  DescriptionList,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DirectionProvider,
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Empty,
  EmptyActions,
  EmptyDescription,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldLabel,
  FileUpload,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  H1,
  H2,
  H3,
  H4,
  HoldToConfirm,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  HoverParallax,
  ImageReveal,
  InlineCode,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  Kbd,
  KbdGroup,
  Label,
  Lead,
  Magnetic,
  Marquee,
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  Mono,
  MultiSelect,
  Muted,
  NativeSelect,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NumberTicker,
  P,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Rating,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  Reveal,
  ScrambleText,
  ScrollArea,
  SectionLabel,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  Skeleton,
  Slider,
  Small,
  Spinner,
  SplitText,
  Stagger,
  StaggerItem,
  Stat,
  Stepper,
  Switch,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TagInput,
  Textarea,
  Timeline,
  TimelineDescription,
  TimelineItem,
  TimelineTime,
  TimelineTitle,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  type TreeNode,
  TreeView,
  UnderlineDraw,
  navigationMenuTriggerStyle,
  toast,
} from "@eduba/ui";
import type { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { UI_VERSION } from "../lib/version";

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-border rounded-md p-5 sm:p-10 flex items-center justify-center min-h-[200px] sm:min-h-[240px] bg-card text-card-foreground relative overflow-hidden">
      {children}
    </div>
  );
}

/* Remounts its children so view/mount-triggered motion can be replayed. */
function ReplayFrame({ children }: { children: React.ReactNode }) {
  const [run, setRun] = React.useState(0);
  return (
    <div className="relative flex w-full flex-col items-center justify-center">
      <div key={run} className="flex w-full items-center justify-center">
        {children}
      </div>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="absolute -right-4 -top-6 inline-flex cursor-pointer items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3 w-3">
          <path
            d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5V4h-2.5"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        replay
      </button>
    </div>
  );
}

/* ----- data-table demo ----- */
interface Invoice {
  id: string;
  client: string;
  status: "paid" | "pending" | "overdue";
  amount: number;
}

const INVOICES: Invoice[] = [
  { id: "INV-014", client: "workloom", status: "paid", amount: 2400 },
  { id: "INV-013", client: "fieldnote", status: "pending", amount: 1150 },
  { id: "INV-012", client: "archive st.", status: "paid", amount: 3200 },
  { id: "INV-011", client: "hollow & co", status: "overdue", amount: 860 },
  { id: "INV-010", client: "marrow", status: "paid", amount: 1980 },
  { id: "INV-009", client: "outpost", status: "pending", amount: 540 },
];

const STATUS_BADGE: Record<Invoice["status"], "success" | "warning" | "destructive"> = {
  paid: "success",
  pending: "warning",
  overdue: "destructive",
};

const INVOICE_COLUMNS: ColumnDef<Invoice>[] = [
  { accessorKey: "id", header: "invoice" },
  { accessorKey: "client", header: "client" },
  {
    accessorKey: "status",
    header: "status",
    cell: ({ row }) => (
      <Badge variant={STATUS_BADGE[row.original.status]}>{row.original.status}</Badge>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <span className="block text-right">amount</span>,
    cell: ({ row }) => (
      <span className="block text-right tabular-nums">${row.original.amount.toLocaleString()}</span>
    ),
  },
];

function DataTableDemo() {
  return (
    <div className="w-full max-w-xl">
      <DataTable columns={INVOICE_COLUMNS} data={INVOICES} />
    </div>
  );
}

/* ----- chart demo ----- */
const CHART_DATA = [
  { month: "jan", studio: 186, product: 80 },
  { month: "feb", studio: 305, product: 200 },
  { month: "mar", studio: 237, product: 120 },
  { month: "apr", studio: 73, product: 190 },
  { month: "may", studio: 209, product: 130 },
  { month: "jun", studio: 214, product: 140 },
];

const CHART_CONFIG = {
  studio: { label: "studio", color: "var(--color-primary)" },
  product: { label: "product", color: "var(--eb-light-pink)" },
} satisfies ChartConfig;

function ChartDemo() {
  return (
    <ChartContainer config={CHART_CONFIG} className="h-56 w-full max-w-xl aspect-auto">
      <AreaChart data={CHART_DATA} margin={{ left: 4, right: 4 }}>
        <CartesianGrid vertical={false} strokeDasharray="4 4" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="font-mono uppercase tracking-[0.08em]"
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
        <Area
          dataKey="product"
          type="natural"
          fill="var(--color-product)"
          fillOpacity={0.35}
          stroke="var(--color-product)"
          strokeWidth={2}
        />
        <Area
          dataKey="studio"
          type="natural"
          fill="var(--color-studio)"
          fillOpacity={0.25}
          stroke="var(--color-studio)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  );
}

/* ----- direction demo ----- */
function DirectionDemo() {
  const [dir, setDir] = React.useState<"ltr" | "rtl">("ltr");
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <ToggleGroup type="single" value={dir} onValueChange={(v) => v && setDir(v as "ltr" | "rtl")}>
        <ToggleGroupItem value="ltr">ltr</ToggleGroupItem>
        <ToggleGroupItem value="rtl">rtl</ToggleGroupItem>
      </ToggleGroup>
      <DirectionProvider dir={dir}>
        <div
          dir={dir}
          className="flex w-full flex-col gap-4 rounded-md border border-border bg-background p-4"
        >
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">work</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>workloom</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <NativeSelect className="w-full">
            <option>Diatype</option>
            <option>IBM Plex Mono</option>
          </NativeSelect>
          <div className="flex gap-2">
            <Button size="sm">primary</Button>
            <Button size="sm" variant="outline">
              secondary
            </Button>
          </div>
        </div>
      </DirectionProvider>
    </div>
  );
}

/* ----- sidebar demo (framed, non-fixed) ----- */
function SidebarDemo() {
  const [active, setActive] = React.useState("components");
  const NAV = [
    { id: "overview", label: "overview" },
    { id: "components", label: "components" },
    { id: "tokens", label: "design tokens" },
    { id: "themes", label: "themes" },
  ];
  return (
    <SidebarProvider className="min-h-0 h-80 w-full max-w-2xl overflow-hidden rounded-md border border-border bg-background">
      <Sidebar collapsible="none" className="h-auto">
        <SidebarHeader className="border-b border-border">
          <div className="flex items-center gap-2 px-1 py-0.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold uppercase text-primary-foreground">
              eb
            </span>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.08em]">
              eduba/ui
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>library</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {NAV.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={active === item.id}
                      onClick={() => setActive(item.id)}
                    >
                      {item.label}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Mono className="text-[10px] text-muted-foreground">v{UI_VERSION} · paper</Mono>
        </SidebarFooter>
      </Sidebar>
      <div className="flex min-w-0 flex-1 flex-col gap-2 p-5">
        <Mono className="text-muted-foreground">{active}</Mono>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
    </SidebarProvider>
  );
}

/* ----- form demo ----- */
function FormDemo() {
  const form = useForm<{ email: string }>({ defaultValues: { email: "" }, mode: "onTouched" });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(() =>
          toast.success("subscribed", { description: "check your inbox" }),
        )}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "email is required",
            pattern: { value: /.+@.+\..+/, message: "enter a valid email" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="hello@eduba.io" {...field} />
              </FormControl>
              <FormDescription>We&apos;ll never share this.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="self-start">
          subscribe
        </Button>
      </form>
    </Form>
  );
}

/* ----- multi-select demo ----- */
const TYPEFACE_OPTIONS = [
  { value: "diatype", label: "Diatype" },
  { value: "plex", label: "IBM Plex Mono" },
  { value: "grotesk", label: "Space Grotesk" },
  { value: "editorial", label: "Editorial New" },
  { value: "system", label: "System UI" },
];

function MultiSelectDemo() {
  const [value, setValue] = React.useState<string[]>(["diatype", "plex"]);
  return (
    <MultiSelect
      className="w-72"
      options={TYPEFACE_OPTIONS}
      value={value}
      onValueChange={setValue}
      placeholder="pick typefaces"
    />
  );
}

/* ----- tag-input demo ----- */
function TagInputDemo() {
  const [tags, setTags] = React.useState<string[]>(["brand", "editorial"]);
  return <TagInput className="w-72" value={tags} onValueChange={setTags} placeholder="add a tag" />;
}

/* ----- file-upload demo ----- */
function FileUploadDemo() {
  const [files, setFiles] = React.useState<File[]>([]);
  return (
    <FileUpload
      className="w-full max-w-md"
      value={files}
      onValueChange={setFiles}
      accept="image/*,.pdf"
      maxSize={5 * 1024 * 1024}
    />
  );
}

/* ----- date-range-picker demo ----- */
function DateRangePickerDemo() {
  const [range, setRange] = React.useState<DateRange | undefined>();
  return <DateRangePicker className="w-72" value={range} onValueChange={setRange} />;
}

/* ----- stepper demo ----- */
const STEPPER_STEPS = [
  { label: "brief", description: "scope & goals" },
  { label: "design", description: "explore" },
  { label: "build", description: "ship it" },
];

function StepperDemo() {
  // value can reach STEPPER_STEPS.length — one past the last step — which marks
  // every step (including "build") complete with a tick.
  const [step, setStep] = React.useState(1);
  const done = step >= STEPPER_STEPS.length;
  return (
    <div className="flex w-full max-w-md flex-col gap-7">
      <Stepper steps={STEPPER_STEPS} value={step} onValueChange={setStep} />
      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={step === 0}
          onClick={() => setStep((s) => s - 1)}
        >
          prev
        </Button>
        <Button size="sm" disabled={done} onClick={() => setStep((s) => s + 1)}>
          {step >= STEPPER_STEPS.length - 1 ? "finish" : "next"}
        </Button>
      </div>
    </div>
  );
}

/* ----- rating demo ----- */
function RatingDemo() {
  const [value, setValue] = React.useState(3);
  return <Rating value={value} onValueChange={setValue} size="lg" />;
}

/* ----- chip demo ----- */
const CHIP_FILTERS = ["branding", "web", "product", "editorial", "motion"];

function ChipDemo() {
  const [active, setActive] = React.useState<string[]>(["web", "product"]);
  return (
    <div className="flex max-w-md flex-wrap justify-center gap-2">
      {CHIP_FILTERS.map((f) => {
        const on = active.includes(f);
        return (
          <Chip
            key={f}
            selected={on}
            onClick={() => setActive((a) => (on ? a.filter((x) => x !== f) : [...a, f]))}
          >
            {f}
          </Chip>
        );
      })}
    </div>
  );
}

/* ----- tree-view demo ----- */
const TREE_DATA: TreeNode[] = [
  {
    id: "app",
    label: "app",
    defaultExpanded: true,
    children: [
      { id: "layout", label: "layout.tsx" },
      { id: "page", label: "page.tsx" },
      {
        id: "docs",
        label: "docs",
        children: [
          { id: "docs-layout", label: "layout.tsx" },
          { id: "docs-page", label: "page.tsx" },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "components",
    children: [
      { id: "catalog", label: "catalog.ts" },
      { id: "preview", label: "component-preview.tsx" },
    ],
  },
];

function TreeViewDemo() {
  const [sel, setSel] = React.useState("page");
  return (
    <TreeView
      className="max-w-xs"
      data={TREE_DATA}
      selectedId={sel}
      onSelect={(id) => setSel(id)}
    />
  );
}

const PREVIEWS: Record<string, React.ReactNode> = {
  // ----- Foundations -----
  typography: (
    <div className="flex flex-col gap-3 max-w-xl text-left items-start">
      <H1>heading one</H1>
      <H2>heading two</H2>
      <H3>heading three</H3>
      <H4>heading four</H4>
      <Lead>
        A lead paragraph for introducing a section with a slightly larger size and muted tone.
      </Lead>
      <P>
        Body paragraph. Diatype regular at 15px / 1.6 line-height — the default reading style across
        eduba surfaces.
      </P>
      <Muted>Muted secondary text for less important context or metadata.</Muted>
      <Mono>SECTION LABEL · MONO</Mono>
      <Small>Small caption text.</Small>
      <p>
        You can embed <InlineCode>inline code</InlineCode> right inside paragraphs.
      </p>
      <SectionLabel index={1} label="services" />
    </div>
  ),
  button: (
    <div className="flex flex-wrap gap-2 items-center">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="glow">Glow</Button>
    </div>
  ),
  "button-group": (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  ),
  label: (
    <Field>
      <Label htmlFor="lbl-demo">full name</Label>
      <Input id="lbl-demo" placeholder="Jane Doe" />
    </Field>
  ),
  field: (
    <Field className="w-full max-w-sm">
      <FieldLabel htmlFor="f-email">email</FieldLabel>
      <Input id="f-email" type="email" placeholder="hello@eduba.io" />
      <FieldDescription>We&apos;ll never share this.</FieldDescription>
    </Field>
  ),
  separator: (
    <div className="w-full max-w-sm flex flex-col gap-4">
      <div className="text-sm">Solid divider</div>
      <Separator />
      <div className="text-sm">Dashed divider</div>
      <Separator dashed />
    </div>
  ),
  skeleton: (
    <div className="w-full max-w-sm flex flex-col gap-3">
      <Skeleton className="h-4 w-1/3" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-4 w-full" />
    </div>
  ),
  spinner: (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
  kbd: (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>shift</Kbd>
      <Kbd>k</Kbd>
    </KbdGroup>
  ),
  badge: (
    <div className="flex flex-wrap gap-2">
      <Badge>default</Badge>
      <Badge variant="solid">solid</Badge>
      <Badge variant="secondary">secondary</Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="muted">muted</Badge>
      <Badge variant="success">success</Badge>
      <Badge variant="warning">warning</Badge>
      <Badge variant="destructive">destructive</Badge>
    </div>
  ),
  avatar: (
    <div className="flex gap-3">
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/80?img=12" alt="" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EB</AvatarFallback>
      </Avatar>
      <Avatar className="h-12 w-12">
        <AvatarFallback>04</AvatarFallback>
      </Avatar>
    </div>
  ),

  // ----- Form controls -----
  input: (
    <Field className="w-full max-w-sm">
      <Label htmlFor="i-email">email address</Label>
      <Input id="i-email" type="email" placeholder="hello@eduba.io" />
    </Field>
  ),
  "input-group": (
    <InputGroup className="w-full max-w-sm">
      <InputGroupAddon>https://</InputGroupAddon>
      <InputGroupInput placeholder="eduba.io" />
      <InputGroupAddon position="end">/path</InputGroupAddon>
    </InputGroup>
  ),
  "input-otp": (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
  textarea: (
    <Field className="w-full max-w-sm">
      <Label htmlFor="ta">message</Label>
      <Textarea id="ta" placeholder="Tell us about your project…" />
    </Field>
  ),
  checkbox: (
    <div className="flex flex-col gap-2">
      <Field orientation="horizontal">
        <Checkbox id="c1" />
        <Label htmlFor="c1">subscribe to updates</Label>
      </Field>
      <Field orientation="horizontal">
        <Checkbox id="c2" defaultChecked />
        <Label htmlFor="c2">already checked</Label>
      </Field>
    </div>
  ),
  "radio-group": (
    <RadioGroup defaultValue="b">
      <Field orientation="horizontal">
        <RadioGroupItem id="ra" value="a" />
        <Label htmlFor="ra">option a</Label>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="rb" value="b" />
        <Label htmlFor="rb">option b</Label>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem id="rc" value="c" />
        <Label htmlFor="rc">option c</Label>
      </Field>
    </RadioGroup>
  ),
  switch: (
    <Field orientation="horizontal">
      <Switch id="sw" defaultChecked />
      <Label htmlFor="sw">notifications</Label>
    </Field>
  ),
  slider: <Slider defaultValue={[40]} max={100} step={1} className="w-72" />,
  select: (
    <Select defaultValue="diatype">
      <SelectTrigger className="w-64">
        <SelectValue placeholder="pick a typeface" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>in use</SelectLabel>
          <SelectItem value="diatype">Diatype</SelectItem>
          <SelectItem value="plex">IBM Plex Mono</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>fallbacks</SelectLabel>
          <SelectItem value="grotesk">Space Grotesk</SelectItem>
          <SelectItem value="serif">Editorial New</SelectItem>
          <SelectItem value="system" disabled>
            System UI
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
  "native-select": (
    <NativeSelect defaultValue="diatype" className="w-64">
      <option value="diatype">Diatype</option>
      <option value="plex">IBM Plex Mono</option>
      <option value="grotesk">Space Grotesk</option>
      <option value="serif">Editorial New</option>
    </NativeSelect>
  ),
  toggle: <Toggle aria-label="toggle bold">bold</Toggle>,
  "toggle-group": (
    <ToggleGroup type="single" defaultValue="left">
      <ToggleGroupItem value="left">left</ToggleGroupItem>
      <ToggleGroupItem value="center">center</ToggleGroupItem>
      <ToggleGroupItem value="right">right</ToggleGroupItem>
    </ToggleGroup>
  ),
  combobox: (
    <Combobox
      className="w-64"
      options={[
        { value: "diatype", label: "Diatype" },
        { value: "plex", label: "IBM Plex Mono" },
        { value: "grotesk", label: "Space Grotesk" },
        { value: "serif", label: "Editorial New" },
      ]}
      placeholder="pick a typeface"
    />
  ),
  calendar: <Calendar mode="single" />,
  "date-picker": <DatePicker className="w-64" />,

  // ----- Overlays & feedback -----
  dialog: (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm action</DialogTitle>
          <DialogDescription>
            Centered modal — 300ms crossfade, scale from 0.96, never from zero.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  "alert-dialog": (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>This will permanently delete the project.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  sheet: (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Slides in with the drawer easing curve.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
  drawer: (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Drawer title</DrawerTitle>
          <DrawerDescription>Vaul-powered. Drag the handle to dismiss.</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  ),
  popover: (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm text-muted-foreground">
          Origin-aware popover — scales from the trigger, not the center.
        </p>
      </PopoverContent>
    </Popover>
  ),
  tooltip: (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent>skip-delay 300ms</TooltipContent>
    </Tooltip>
  ),
  "hover-card": (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@eduba</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback>EB</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-sans text-[15px] font-semibold lowercase leading-snug">
                eduba
              </span>
              <Mono className="text-[10px] text-muted-foreground">@eduba</Mono>
            </div>
          </div>
          <p className="font-sans text-[13px] leading-snug text-muted-foreground">
            Brand &amp; product studio. Editorial craft for the web — strategy, design, build.
          </p>
          <div className="flex items-center gap-2 border-t border-dashed border-border pt-2.5">
            <span className="eb-dot" />
            <Mono className="text-[10px] text-muted-foreground">
              accepting projects · est. 2021
            </Mono>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  ),
  alert: (
    <div className="w-full max-w-md flex flex-col gap-3">
      <Alert>
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 7.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="5.25" r="0.75" fill="currentColor" />
        </svg>
        <AlertTitle>heads up</AlertTitle>
        <AlertDescription>Default alert with editorial tone and an optional icon.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M5.5 8.25l1.75 1.75L10.75 6.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <AlertTitle>saved</AlertTitle>
        <AlertDescription>All changes synced to the workspace.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M8 2L14.5 13.5H1.5L8 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 6.5V9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
        </svg>
        <AlertTitle>error</AlertTitle>
        <AlertDescription>Something went wrong — the server could not be reached.</AlertDescription>
      </Alert>
    </div>
  ),
  toaster: (
    <div className="flex gap-2 flex-wrap">
      <Button onClick={() => toast("event scheduled", { description: "wednesday at 10:00" })}>
        default
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.success("saved", { description: "all changes synced" })}
      >
        success
      </Button>
      <Button
        variant="outline"
        onClick={() => toast.error("failed", { description: "couldn't reach the server" })}
      >
        error
      </Button>
    </div>
  ),
  progress: (
    <div className="w-72 flex flex-col gap-2">
      <Progress value={32} />
      <Progress value={67} />
      <Progress value={100} />
    </div>
  ),
  empty: (
    <Empty className="w-full max-w-md">
      <EmptyMedia>
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 10h18" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </EmptyMedia>
      <EmptyTitle>no projects yet</EmptyTitle>
      <EmptyDescription>
        Start by creating your first project — it&apos;ll appear here.
      </EmptyDescription>
      <EmptyActions>
        <Button>new project</Button>
      </EmptyActions>
    </Empty>
  ),

  // ----- Navigation -----
  tabs: (
    <Tabs defaultValue="overview" className="w-full max-w-md">
      <TabsList>
        <TabsTrigger value="overview">overview</TabsTrigger>
        <TabsTrigger value="specs">specs</TabsTrigger>
        <TabsTrigger value="usage">usage</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <P>Overview content. Underline indicator slides between tabs.</P>
      </TabsContent>
      <TabsContent value="specs">
        <P>Specs content.</P>
      </TabsContent>
      <TabsContent value="usage">
        <P>Usage content.</P>
      </TabsContent>
    </Tabs>
  ),
  accordion: (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="a" dashed>
        <AccordionTrigger iconVariant="plus">what is eduba?</AccordionTrigger>
        <AccordionContent>A brand and product studio focused on editorial craft.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b" dashed>
        <AccordionTrigger iconVariant="plus">how do we work?</AccordionTrigger>
        <AccordionContent>Strategy → design → build, kept tight and intentional.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c" dashed>
        <AccordionTrigger iconVariant="plus">what does it cost?</AccordionTrigger>
        <AccordionContent>Scoped per engagement — see services for ranges.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  breadcrumb: (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">work</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>workloom</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
  pagination: (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
  "navigation-menu": (
    <div className="flex min-h-[320px] w-full items-start justify-center pt-2">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>work</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-full grid-cols-1 gap-2 p-3 md:w-[480px] md:grid-cols-[200px_1fr]">
                <NavigationMenuLink
                  href="#"
                  className="flex h-full flex-col justify-end rounded-md bg-[image:var(--eb-brown-gradient)] p-4 text-[var(--eb-white)] hover:bg-accent/0 hover:text-[var(--eb-white)]"
                >
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-70">
                    featured
                  </span>
                  <span className="mt-1 font-sans text-[15px] font-semibold lowercase leading-snug">
                    workloom redesign
                  </span>
                  <span className="mt-1 font-sans text-[12px] leading-snug opacity-70">
                    Brand, site, and product in one engagement.
                  </span>
                </NavigationMenuLink>
                <div className="flex flex-col gap-1">
                  {[
                    ["recent projects", "The last six shipped engagements."],
                    ["case studies", "Long-form process write-ups."],
                    ["archive", "Everything else, back to 2021."],
                  ].map(([title, desc]) => (
                    <NavigationMenuLink key={title} href="#">
                      <span className="block font-sans text-[14px] font-semibold lowercase leading-snug">
                        {title}
                      </span>
                      <span className="mt-0.5 block font-sans text-[12.5px] leading-snug text-muted-foreground">
                        {desc}
                      </span>
                    </NavigationMenuLink>
                  ))}
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              services
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="#" className={navigationMenuTriggerStyle()}>
              studio
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
  menubar: (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>file</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            new <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>undo</MenubarItem>
          <MenubarItem>redo</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  sidebar: <SidebarDemo />,
  "dropdown-menu": (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>account</DropdownMenuLabel>
        <DropdownMenuItem>
          profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem>
          settings <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  "context-menu": (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="h-32 w-64 rounded-md border border-dashed border-border flex items-center justify-center text-muted-foreground">
          right-click here
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>cut</ContextMenuItem>
        <ContextMenuItem>copy</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>paste</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
  command: (
    <Command className="w-full max-w-md rounded-md border border-border bg-background shadow-card">
      <CommandInput placeholder="search…" />
      <CommandList>
        <CommandEmpty>no results.</CommandEmpty>
        <CommandGroup heading="suggestions">
          <CommandItem>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect
                x="2.5"
                y="2.5"
                width="11"
                height="11"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M8 5.5v5M5.5 8h5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            new project <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M8 2v2M8 12v2M2 8h2M12 8h2M3.8 3.8l1.4 1.4M10.8 10.8l1.4 1.4M12.2 3.8l-1.4 1.4M5.2 10.8l-1.4 1.4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            open settings <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="appearance">
          <CommandItem>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.5 9.5A5.5 5.5 0 1 1 6.5 2.5a4.5 4.5 0 0 0 7 7Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            switch theme <CommandShortcut>⌘T</CommandShortcut>
          </CommandItem>
          <CommandItem disabled>
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect
                x="2.5"
                y="3.5"
                width="11"
                height="9"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path d="M2.5 6.5h11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            export layout <CommandShortcut>soon</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  collapsible: (
    <Collapsible className="w-full max-w-md rounded-md border border-border bg-background">
      <div className="flex items-center justify-between px-4 py-3">
        <Mono className="text-[11px]">starred projects · 3</Mono>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="h-7 w-7 group/collapse">
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="h-3.5 w-3.5 transition-transform duration-[var(--duration-dropdown)] ease-out group-data-[state=open]/collapse:rotate-180"
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
            <span className="sr-only">toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="border-t border-border px-4 py-2.5 font-sans text-[14px]">workloom</div>
      <CollapsibleContent>
        <div className="border-t border-border px-4 py-2.5 font-sans text-[14px]">fieldnote</div>
        <div className="border-t border-border px-4 py-2.5 font-sans text-[14px]">archive st.</div>
      </CollapsibleContent>
    </Collapsible>
  ),

  // ----- Layout & data -----
  card: (
    <Card className="w-full max-w-sm">
      <CardHeader dashedDivider>
        <div className="flex items-center justify-between">
          <CardId>proj · 014</CardId>
          <CardDots />
        </div>
        <CardTitle>workloom redesign</CardTitle>
        <CardDescription>Brand, site, and product — one tight engagement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2.5">
          {[
            ["phase", "build"],
            ["timeline", "6 weeks"],
            ["team", "3 people"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between gap-4">
              <Mono className="text-[10px] text-muted-foreground">{k}</Mono>
              <span className="font-sans text-[length:var(--eb-fs-body-sm)]">{v}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost">cancel</Button>
        <Button className="ml-auto">save</Button>
      </CardFooter>
    </Card>
  ),
  item: (
    <div className="w-full max-w-md flex flex-col gap-1.5">
      {[
        ["projects", "Six engagements in flight across the studio."],
        ["components", "Everything in @eduba/ui, themed and documented."],
        ["design tokens", "Color, type, spacing, and motion as variables."],
      ].map(([title, desc], i) => (
        <Item key={title} variant="outline">
          <ItemMedia variant="icon">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <rect
                x="2"
                y="2"
                width="12"
                height="12"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{desc}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Badge variant="muted">0{i + 1}</Badge>
          </ItemActions>
        </Item>
      ))}
    </div>
  ),
  "aspect-ratio": (
    <div className="w-80">
      <AspectRatio ratio={16 / 9}>
        <div className="h-full w-full rounded-md bg-[image:var(--eb-brown-gradient)] flex items-center justify-center text-[var(--eb-white)] font-mono uppercase tracking-[0.1em]">
          16 / 9
        </div>
      </AspectRatio>
    </div>
  ),
  carousel: (
    <Carousel className="w-64">
      <CarouselContent>
        {Array.from({ length: 4 }).map((_, i) => (
          <CarouselItem key={i}>
            <div className="aspect-square rounded-md border border-border flex items-center justify-center text-3xl font-mono">
              {i + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
  "data-table": <DataTableDemo />,
  table: (
    <div className="w-full max-w-xl">
      <Table>
        <TableCaption>recent invoices · q2</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>invoice</TableHead>
            <TableHead>client</TableHead>
            <TableHead>status</TableHead>
            <TableHead className="text-right">amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(
            [
              ["INV-014", "workloom", "paid", "$2,400"],
              ["INV-013", "fieldnote", "pending", "$1,150"],
              ["INV-012", "archive st.", "paid", "$3,200"],
              ["INV-011", "hollow & co", "overdue", "$860"],
            ] as const
          ).map(([id, client, status, amount]) => (
            <TableRow key={id}>
              <TableCell>{id}</TableCell>
              <TableCell>{client}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    status === "paid" ? "success" : status === "pending" ? "warning" : "destructive"
                  }
                >
                  {status}
                </Badge>
              </TableCell>
              <TableCell className="text-right tabular-nums">{amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
  resizable: (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-80 h-32 rounded-md border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">left</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4 text-sm">right</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
  "scroll-area": (
    <ScrollArea className="h-40 w-64 rounded-md border border-border p-3">
      <div className="flex flex-col gap-2 text-sm">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i}>item {String(i + 1).padStart(2, "0")}</div>
        ))}
      </div>
    </ScrollArea>
  ),
  chart: <ChartDemo />,
  direction: <DirectionDemo />,

  // ----- Motion primitives -----
  "film-grain": (
    <Mono className="text-muted-foreground">
      FilmGrain is the canvas overlay on this entire page — look closely.
    </Mono>
  ),
  "scramble-text": (
    <div className="text-3xl font-semibold tracking-tight">
      <ScrambleText text="HOVER TO SCRAMBLE" trigger="hover" />
    </div>
  ),
  "split-text": (
    <ReplayFrame>
      <div className="text-3xl font-semibold tracking-tight max-w-md">
        <SplitText text="reveal one word at a time" mode="word" trigger="view" stagger={80} />
      </div>
    </ReplayFrame>
  ),
  "number-ticker": (
    <ReplayFrame>
      <div className="text-5xl font-semibold tabular-nums">
        <NumberTicker value={2046} trigger="view" duration={1600} />
      </div>
    </ReplayFrame>
  ),
  "underline-draw": (
    <div className="text-xl">
      <UnderlineDraw>hover the underline</UnderlineDraw>
    </div>
  ),
  reveal: (
    <ReplayFrame>
      <Reveal>
        <div className="p-6 border border-border rounded-md font-sans">
          I fade up into view when scrolled to.
        </div>
      </Reveal>
    </ReplayFrame>
  ),
  stagger: (
    <ReplayFrame>
      <Stagger trigger="view" gap={70} className="w-full max-w-xs">
        {["one", "two", "three", "four"].map((s) => (
          <StaggerItem key={s}>
            <div className="px-3 py-2 border border-border rounded-sm mb-2 font-mono uppercase tracking-[0.08em] text-sm">
              {s}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </ReplayFrame>
  ),
  magnetic: (
    <Magnetic strength={0.4}>
      <Button>magnetic — hover near me</Button>
    </Magnetic>
  ),
  "hover-parallax": (
    <HoverParallax intensity={10}>
      <div className="h-32 w-48 rounded-md bg-[image:var(--eb-brown-gradient)] flex items-center justify-center text-[var(--eb-white)] font-mono uppercase tracking-[0.1em]">
        tilt me
      </div>
    </HoverParallax>
  ),
  "dashed-frame": (
    <DashedFrame thickness={1} gap={6} className="p-6 rounded-md w-64">
      <div className="font-mono uppercase tracking-[0.08em] text-sm">dashed perimeter</div>
    </DashedFrame>
  ),
  marquee: (
    <Marquee speed={20} gap={48} className="w-full max-w-md py-2 border-y border-border">
      {["DIATYPE", "IBM PLEX MONO", "RADIX", "TAILWIND v4", "GSAP", "VAUL", "SONNER"].map((w) => (
        <span
          key={w}
          className="font-mono uppercase tracking-[0.16em] text-sm text-muted-foreground"
        >
          {w}
        </span>
      ))}
    </Marquee>
  ),
  "hold-to-confirm": (
    <HoldToConfirm
      hold={1500}
      className="px-4 py-2 rounded-sm border border-destructive text-destructive font-mono uppercase tracking-[0.08em] text-[11px] font-bold"
      onConfirm={() => toast.success("confirmed")}
    >
      hold to confirm
    </HoldToConfirm>
  ),
  "image-reveal": (
    <ReplayFrame>
      <ImageReveal direction="up" trigger="mount" className="rounded-md overflow-hidden">
        <div className="h-32 w-72 bg-[image:var(--eb-brown-gradient)] flex items-center justify-center text-[var(--eb-white)] font-mono uppercase tracking-[0.1em]">
          clip-path reveal
        </div>
      </ImageReveal>
    </ReplayFrame>
  ),

  // ----- added components -----
  form: <FormDemo />,
  "multi-select": <MultiSelectDemo />,
  "tag-input": <TagInputDemo />,
  "file-upload": <FileUploadDemo />,
  "date-range-picker": <DateRangePickerDemo />,
  "code-block": (
    <CodeBlock
      className="w-full max-w-md"
      filename="install.sh"
      code={`pnpm add @eduba/ui

# then, in your global stylesheet
@import "tailwindcss";
@import "@eduba/ui/styles.css";`}
    />
  ),
  stat: (
    <div className="grid w-full max-w-md grid-cols-2 gap-x-8 gap-y-6">
      <Stat label="components" value="66" delta="+8" direction="up" hint="this release" />
      <Stat label="bundle" value="0" delta="deps" direction="neutral" hint="tree-shaken" />
      <Stat label="themes" value="2" hint="paper · wine" />
      <Stat label="a11y score" value="100" delta="+4" direction="up" />
    </div>
  ),
  "description-list": (
    <DescriptionList className="w-full max-w-sm">
      <DescriptionItem term="stack">radix · tailwind v4</DescriptionItem>
      <DescriptionItem term="type">diatype · plex mono</DescriptionItem>
      <DescriptionItem term="themes">paper · wine</DescriptionItem>
      <DescriptionItem term="license">mit</DescriptionItem>
    </DescriptionList>
  ),

  // ----- tier 2: product patterns -----
  stepper: <StepperDemo />,
  rating: <RatingDemo />,
  chip: <ChipDemo />,
  "tree-view": (
    <div className="w-full max-w-xs rounded-md border border-border bg-background p-2">
      <TreeViewDemo />
    </div>
  ),
  "avatar-group": (
    <AvatarGroup max={4}>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=12" alt="" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>EB</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/64?img=32" alt="" />
        <AvatarFallback>AR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MK</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>ST</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>LW</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
  timeline: (
    <Timeline className="w-full max-w-sm">
      <TimelineItem active>
        <TimelineTime>jun 2026</TimelineTime>
        <TimelineTitle>v0.1 — public docs</TimelineTitle>
        <TimelineDescription>66 components, two themes, live on Vercel.</TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineTime>may 2026</TimelineTime>
        <TimelineTitle>motion primitives</TimelineTitle>
        <TimelineDescription>Scramble, SplitText, Reveal — the brand layer.</TimelineDescription>
      </TimelineItem>
      <TimelineItem last>
        <TimelineTime>apr 2026</TimelineTime>
        <TimelineTitle>foundations</TimelineTitle>
        <TimelineDescription>Tokens, type scale, and the Radix base.</TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
  banner: (
    <div className="w-full max-w-2xl overflow-hidden rounded-md">
      <Banner variant="info" dismissible>
        <BannerTitle>new</BannerTitle>
        <span>
          Tier-2 components just shipped — <a href="/docs">browse them →</a>
        </span>
      </Banner>
    </div>
  ),
};

// Reference BrownBand at module load so it survives tree-shaking checks.
void BrownBand;

export const PREVIEW_SLUGS = Object.keys(PREVIEWS);

export function ComponentPreview({
  slug,
  override,
}: {
  slug: string;
  /** Build-time, server-rendered preview (e.g. syntax-highlighted code). Wins over the client demo. */
  override?: React.ReactNode;
}) {
  const preview = override ?? PREVIEWS[slug];
  return (
    <div className="flex flex-col gap-3">
      <Mono className="text-muted-foreground">preview</Mono>
      <Frame>
        {preview ?? <Mono className="text-muted-foreground">no interactive preview yet</Mono>}
      </Frame>
    </div>
  );
}

export function ComponentGallery({
  serverPreviews,
}: {
  serverPreviews?: Record<string, React.ReactNode>;
}) {
  return (
    <div className="flex flex-col gap-12">
      {PREVIEW_SLUGS.map((slug) => (
        <section key={slug} id={slug} className="flex flex-col gap-3 scroll-mt-12">
          <div className="flex items-center justify-between border-b border-dashed border-border pb-2">
            <Mono>{slug}</Mono>
            <a
              href={`/docs/${slug}`}
              className="text-xs font-mono uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground"
            >
              detail →
            </a>
          </div>
          <Frame>{serverPreviews?.[slug] ?? PREVIEWS[slug]}</Frame>
        </section>
      ))}
    </div>
  );
}
