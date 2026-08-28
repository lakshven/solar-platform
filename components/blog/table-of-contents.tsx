"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ContentBlock } from "@/lib/blog/types";

export function TableOfContents({ headings }: { headings: Extract<ContentBlock, { type: "heading2" | "heading3" }>[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-100px 0px -70% 0px" }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">On this page</p>
      <ul className="mt-3 space-y-1 border-l border-border">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                h.type === "heading3" && "pl-7 text-[13px]",
                activeId === h.id
                  ? "border-primary font-medium text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
