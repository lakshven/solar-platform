import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "./marquee";
import { ReviewCard } from "./review-card";
import { StatCounter } from "./stat-counter";
import { StarRating } from "./star-rating";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews-data";

export function ReviewsMarqueeSection() {
  const rowOne = REVIEWS.slice(0, 4);
  const rowTwo = REVIEWS.slice(4, 8);

  return (
    <section className="section overflow-hidden bg-secondary/40">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Trusted across London, Surrey & the South East</p>
            <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-medium md:text-4xl">
              What homeowners and businesses actually say.
            </h2>
          </div>
          <Link href="/reviews" className="group flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline">
            Read all reviews
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <StarRating rating={5} className="[&>svg]:h-5 [&>svg]:w-5" />
            <span className="font-display text-lg font-medium">{REVIEW_STATS.averageRating}</span>
            <span className="text-sm text-muted-foreground">from {REVIEW_STATS.totalReviews} reviews</span>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-4">
        <Marquee speedSeconds={48}>
          {rowOne.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Marquee>
        <Marquee speedSeconds={54} reverse>
          {rowTwo.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Marquee>
      </div>

      <div className="container mt-14 grid grid-cols-2 gap-8 border-t border-border pt-10 md:grid-cols-4">
        <StatCounter value={REVIEW_STATS.averageRating} decimals={1} label="Average rating" />
        <StatCounter value={REVIEW_STATS.totalReviews} label="Verified reviews" />
        <StatCounter value={1400} suffix="+" label="Installations completed" />
        <StatCounter value={REVIEW_STATS.yearsOperating} label="Years operating" />
      </div>
    </section>
  );
}
