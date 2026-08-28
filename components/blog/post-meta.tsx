import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BlogPost } from "@/lib/blog/types";

export function AuthorBio({ author }: { author: BlogPost["author"] }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-5">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-charcoal text-sm font-semibold text-white">
        {author.initials}
      </span>
      <div>
        <p className="text-sm font-medium">{author.name}</p>
        <p className="text-xs text-muted-foreground">{author.role} at BrightGrid Energy</p>
      </div>
    </div>
  );
}

export function Breadcrumbs({ items, dark = false }: { items: { name: string; href: string }[]; dark?: boolean }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-1.5 text-xs ${dark ? "text-cream/60" : "text-muted-foreground"}`}
    >
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight className="h-3 w-3" />}
          {i === items.length - 1 ? (
            <span className={`font-medium ${dark ? "text-cream" : "text-foreground"}`}>{item.name}</span>
          ) : (
            <Link href={item.href} className={dark ? "hover:text-cream" : "hover:text-foreground"}>
              {item.name}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
