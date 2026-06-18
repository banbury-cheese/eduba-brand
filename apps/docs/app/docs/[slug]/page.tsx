import { H1, Lead, Mono } from "@eduba/ui";
import { notFound } from "next/navigation";
import { ALL_SLUGS, CATALOG } from "../../../components/catalog";
import { ComponentPreview } from "../../../components/component-preview";

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = CATALOG[slug];
  if (!meta) notFound();

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Mono className="text-muted-foreground">{meta.kind}</Mono>
        <H1>{slug}</H1>
        <Lead>{meta.description}</Lead>
      </header>
      <ComponentPreview slug={slug} />
    </div>
  );
}
