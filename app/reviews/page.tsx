import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Marquee } from "@/components/reviews/marquee";
import { ReviewCard } from "@/components/reviews/review-card";
import { ReviewsGrid } from "@/components/reviews/reviews-grid";
import { FeaturedReview } from "@/components/reviews/featured-review";
import { StatCounter } from "@/components/reviews/stat-counter";
import { StarRating } from "@/components/reviews/star-rating";
import { REVIEWS, REVIEW_STATS } from "@/lib/reviews-data";

export const metadata = { title: "Reviews — BrightGrid Energy" };

export default function ReviewsPage() {
  const featured = REVIEWS.find((r) => r.featured) ?? REVIEWS[0];
  const marqueeRow = [...REVIEWS].reverse();

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What it's actually like to install with us."
        description="Verified reviews from homeowners, farms, landlords and businesses across London, Surrey and the South East."
        ctaLabel="Check Your Savings"
      />

      <section className="pb-4">
        <div className="container flex flex-wrap items-center gap-3">
          <StarRating rating={5} className="[&>svg]:h-5 [&>svg]:w-5" />
          <span className="font-display text-xl font-medium">{REVIEW_STATS.averageRating} out of 5</span>
          <span className="text-sm text-muted-foreground">based on {REVIEW_STATS.totalReviews} verified reviews</span>
        </div>
      </section>

      <section className="overflow-hidden pb-16 pt-8">
        <Marquee speedSeconds={60}>
          {marqueeRow.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </Marquee>
      </section>

      <section className="container">
        <FeaturedReview review={featured} />
      </section>

      <section className="section">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4">
          <StatCounter value={REVIEW_STATS.averageRating} decimals={1} label="Average rating" />
          <StatCounter value={REVIEW_STATS.totalReviews} label="Verified reviews" />
          <StatCounter value={1400} suffix="+" label="Installations completed" />
          <StatCounter value={REVIEW_STATS.yearsOperating} label="Years operating" />
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <p className="eyebrow">Browse by system</p>
          <h2 className="mt-3 font-display text-3xl font-medium">All reviews</h2>
          <div className="mt-8">
            <ReviewsGrid />
          </div>
        </div>
      </section>

      <CtaBanner title="See what your home could become." description="Two minutes of questions, seven system options, no obligation." />
    </>
  );
}
