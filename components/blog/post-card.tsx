import Link from "next/link";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/lib/blog/types";
import { getReadingTimeMinutes } from "@/lib/blog/utils";
import { cn } from "@/lib/utils";

export function PostCard({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <Link href={`/blog/${post.slug}`} className={cn("group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg", className)}>
      {post.coverImageUrl ? (
        <div className="relative h-32 w-full">
          <Image src={post.coverImageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        </div>
      ) : (
        <div className={cn("h-32 bg-gradient-to-br", post.heroGradient)} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <Badge variant="outline" className="w-fit text-[11px]">
          {post.category}
        </Badge>
        <h3 className="mt-3 font-display text-lg font-medium leading-snug transition-colors group-hover:text-leaf">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">{post.description}</p>
        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
          </time>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {getReadingTimeMinutes(post)} min read
          </span>
        </div>
      </div>
    </Link>
  );
}
