import { H1, Lead, Mono } from "@eduba/ui";
import { ComponentGallery } from "../../components/component-preview";

export default function DocsIndexPage() {
  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-3">
        <Mono className="text-muted-foreground">all components</Mono>
        <H1>browse the library</H1>
        <Lead>
          Every component and motion primitive in @eduba/ui, in one scroll. Click{" "}
          <Mono>detail →</Mono> for the per-component page.
        </Lead>
      </header>
      <ComponentGallery />
    </div>
  );
}
