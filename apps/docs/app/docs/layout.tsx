import { SectionLabel } from "@eduba/ui";
import Link from "next/link";
import { COMPONENTS, PRIMITIVES } from "../../components/catalog";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-8 md:px-12 lg:px-16 py-10 grid grid-cols-12 gap-x-10 gap-y-6">
      <aside className="col-span-12 md:col-span-4 lg:col-span-3 border-b md:border-b-0 md:border-r border-dashed border-[currentColor]/15 pb-6 md:pb-0 md:pr-6">
        <div className="md:sticky md:top-0 md:max-h-[calc(100svh-3rem)] md:overflow-y-auto md:-mr-6 md:pr-6">
          <SectionLabel index="030" label="components" className="text-[12px] mb-3" />
          <ul className="flex flex-col gap-0.5 mb-8">
            {COMPONENTS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/docs/${slug}`}
                  className="block py-0.5 font-sans text-[13px] opacity-70 hover:opacity-100 transition-opacity"
                >
                  {slug}
                </Link>
              </li>
            ))}
          </ul>
          <SectionLabel index="031" label="primitives" className="text-[12px] mb-3" />
          <ul className="flex flex-col gap-0.5">
            {PRIMITIVES.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/docs/${slug}`}
                  className="block py-0.5 font-sans text-[13px] opacity-70 hover:opacity-100 transition-opacity"
                >
                  {slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <article className="col-span-12 md:col-span-8 lg:col-span-9 min-w-0">{children}</article>
    </div>
  );
}
