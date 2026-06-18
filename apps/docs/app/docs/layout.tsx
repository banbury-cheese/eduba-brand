import { SectionLabel } from "@eduba/ui";
import Link from "next/link";
import { COMPONENTS, PRIMITIVES } from "../../components/catalog";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-8 px-5 py-8 sm:px-8 md:grid md:grid-cols-12 md:gap-x-10 md:gap-y-6 md:px-12 md:py-10 lg:px-16">
      <aside className="col-span-12 min-w-0 border-b border-dashed border-[currentColor]/15 pb-6 md:col-span-4 md:border-b-0 md:border-r md:pb-0 md:pr-6 lg:col-span-3">
        <div className="md:sticky md:top-0 md:max-h-[calc(100svh-3rem)] md:-mr-6 md:overflow-y-auto md:pr-6">
          <SectionLabel index="030" label="components" className="mb-3 text-[12px]" />
          <ul className="mb-8 grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3 md:flex md:flex-col md:gap-0.5">
            {COMPONENTS.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/docs/${slug}`}
                  className="block truncate py-0.5 font-sans text-[13px] opacity-70 transition-opacity hover:opacity-100"
                >
                  {slug}
                </Link>
              </li>
            ))}
          </ul>
          <SectionLabel index="031" label="primitives" className="mb-3 text-[12px]" />
          <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 sm:grid-cols-3 md:flex md:flex-col md:gap-0.5">
            {PRIMITIVES.map((slug) => (
              <li key={slug}>
                <Link
                  href={`/docs/${slug}`}
                  className="block truncate py-0.5 font-sans text-[13px] opacity-70 transition-opacity hover:opacity-100"
                >
                  {slug}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <article className="col-span-12 min-w-0 md:col-span-8 lg:col-span-9">{children}</article>
    </div>
  );
}
