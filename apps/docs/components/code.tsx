import { CodeBlock, type CodeBlockProps } from "@eduba/ui";
import { highlight } from "../lib/highlight";

export interface CodeProps extends Omit<CodeBlockProps, "html"> {
  /** Language id for highlighting: tsx, ts, jsx, js, json, bash, css, html, md… */
  lang?: string;
}

/**
 * Server Component. Syntax-highlights `code` at build time with Shiki and renders
 * it through @eduba/ui's <CodeBlock>. Drop it into any Server Component — the
 * highlighting cost stays on the server and the client ships only the markup.
 *
 *   <Code lang="tsx" filename="button.tsx" code={`...`} />
 */
export async function Code({ code, lang = "tsx", ...rest }: CodeProps) {
  const html = await highlight(code, lang);
  return <CodeBlock code={code} html={html} {...rest} />;
}
