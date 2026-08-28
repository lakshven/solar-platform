import { Quote } from "lucide-react";
import { StarRating } from "./star-rating";
import { Badge } from "@/components/ui/badge";
import type { Review } from "@/lib/reviews-data";

export function FeaturedReview({ review }: { review: Review }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-12 text-cream md:px-14 md:py-16">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-solar/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-leaf/20 blur-3xl" />

      <Quote className="h-10 w-10 text-solar" />
      <p className="relative mt-6 max-w-2xl text-balance font-display text-2xl font-medium leading-snug md:text-3xl">
        &ldquo;{review.quote}&rdquo;
      </p>

      <div className="relative mt-8 flex items-center gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br ${review.gradient} text-sm font-semibold text-white`}>
          {review.initials}
        </span>
        <div>
          <p className="font-medium">{review.name}</p>
          <p className="text-sm text-cream/60">{review.location}</p>
        </div>
        <div className="ml-auto flex flex-col items-end gap-1.5">
          <StarRating rating={review.rating} />
          <Badge variant="outline" className="border-cream/30 text-cream/80">{review.system}</Badge>
        </div>
      </div>
    </div>
  );
}
