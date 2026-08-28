import { Quote } from "lucide-react";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Review } from "@/lib/reviews-data";

export function ReviewCard({ review, className }: { review: Review; className?: string }) {
  return (
    <div
      className={cn(
        "flex w-[340px] shrink-0 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <StarRating rating={review.rating} />
        <Quote className="h-5 w-5 text-border" />
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">&ldquo;{review.quote}&rdquo;</p>

      <div className="mt-6 flex items-center gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white",
            review.gradient
          )}
        >
          {review.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium">{review.name}</p>
          <p className="truncate text-xs text-muted-foreground">{review.location}</p>
        </div>
      </div>

      <Badge variant="outline" className="mt-4 w-fit text-[11px] font-medium text-muted-foreground">
        {review.system}
      </Badge>
    </div>
  );
}
