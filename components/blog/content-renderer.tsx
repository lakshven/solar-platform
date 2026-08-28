import Image from "next/image";
import Link from "next/link";
import { Info, Lightbulb, TriangleAlert, ArrowRight } from "lucide-react";
import type { ContentBlock } from "@/lib/blog/types";
import { cn } from "@/lib/utils";

const CALLOUT_STYLES = {
  info: { icon: Info, classes: "border-volt/30 bg-volt-light/60 text-volt" },
  tip: { icon: Lightbulb, classes: "border-leaf/30 bg-leaf-light/60 text-leaf" },
  warning: { icon: TriangleAlert, classes: "border-solar/40 bg-solar-light/60 text-solar" },
} as const;

export function ContentRenderer({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i} className="leading-relaxed text-foreground/90">
                {block.text}
              </p>
            );

          case "heading2":
            return (
              <h2 key={i} id={block.id} className="scroll-mt-28 pt-4 font-display text-2xl font-medium">
                {block.text}
              </h2>
            );

          case "heading3":
            return (
              <h3 key={i} id={block.id} className="scroll-mt-28 pt-2 font-display text-lg font-medium">
                {block.text}
              </h3>
            );

          case "list":
            return block.style === "number" ? (
              <ol key={i} className="list-inside list-decimal space-y-2 pl-1 text-foreground/90">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <ul key={i} className="list-inside list-disc space-y-2 pl-1 text-foreground/90">
                {block.items.map((item, j) => (
                  <li key={j} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote key={i} className="border-l-2 border-primary pl-5 italic text-foreground/80">
                {block.text}
                {block.attribution && <footer className="mt-1.5 text-sm not-italic text-muted-foreground">— {block.attribution}</footer>}
              </blockquote>
            );

          case "callout": {
            const style = CALLOUT_STYLES[block.tone ?? "info"];
            const Icon = style.icon;
            return (
              <div key={i} className={cn("flex gap-3 rounded-2xl border p-5", style.classes)}>
                <Icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="font-medium text-foreground">{block.title}</p>
                  <p className="mt-1 text-sm text-foreground/80">{block.text}</p>
                </div>
              </div>
            );
          }

          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full text-left text-sm">
                  <thead className="bg-secondary">
                    <tr>
                      {block.headers.map((h) => (
                        <th key={h} className="px-4 py-3 font-medium">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {block.rows.map((row, r) => (
                      <tr key={r}>
                        {row.map((cell, c) => (
                          <td key={c} className="px-4 py-3 text-foreground/90">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "image":
            return (
              <figure key={i} className="overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-[16/9] w-full bg-secondary">
                  <Image src={block.url} alt={block.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 672px" />
                </div>
                {block.caption && (
                  <figcaption className="border-t border-border bg-secondary/50 px-4 py-2.5 text-center text-xs text-muted-foreground">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "cta":
            return (
              <div key={i} className="rounded-2xl bg-charcoal px-6 py-8 text-cream md:px-8">
                <h3 className="font-display text-xl font-medium">{block.title}</h3>
                <p className="mt-2 text-sm text-cream/70">{block.description}</p>
                <Link
                  href={block.href}
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:bg-accent/90"
                >
                  {block.label} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
