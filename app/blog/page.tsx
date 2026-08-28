import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BlogDashboard } from "@/components/blog/blog-dashboard";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getAllPosts, getReadingTimeMinutes, SITE_URL } from "@/lib/blog/utils";

export const metadata: Metadata = {
  title: "The BrightGrid Blog — Solar, Battery, EV & Heat Pump Guides",
  description:
    "Clear, practical guides on solar panel costs, battery storage, heat pumps, EV charging and grants for UK homes and businesses.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "The BrightGrid Blog",
    description: "Clear, practical guides on solar, battery, heat pumps, EV charging and grants for UK homes and businesses.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export const revalidate = 0; // re-check Supabase for new/edited posts hourly, no redeploy needed

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <section className="pt-16 pb-4 md:pt-20">
        <div className="container">
          <p className="eyebrow">The BrightGrid blog</p>
          <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.1] md:text-5xl">
            Straight answers on solar, battery, heat pumps and EV charging.
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            No sales spin — just the numbers, the trade-offs, and what actually matters for your home or business.
          </p>
        </div>
      </section>

      {featured && (
        <section className="pb-16 pt-8">
          <div className="container">
            <Link
              href={`/blog/${featured.slug}`}
              className={`group grid overflow-hidden rounded-3xl border border-border md:grid-cols-2`}
            >
              {featured.coverImageUrl ? (
                <div className="relative h-56 w-full md:h-full">
                  <Image src={featured.coverImageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" priority />
                </div>
              ) : (
                <div className={`h-56 bg-gradient-to-br md:h-full ${featured.heroGradient}`} />
              )}
              <div className="flex flex-col justify-center p-8 md:p-10">
                <Badge variant="leaf" className="w-fit">
                  Featured
                </Badge>
                <h2 className="mt-3 text-balance font-display text-2xl font-medium leading-snug transition-colors group-hover:text-leaf md:text-3xl">
                  {featured.title}
                </h2>
                <p className="mt-3 text-muted-foreground">{featured.description}</p>
                <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
                  <time dateTime={featured.publishedAt}>
                    {new Date(featured.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {getReadingTimeMinutes(featured)} min read
                  </span>
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                  Read the full guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="container">
          <BlogDashboard posts={rest.length > 0 ? rest : posts} />
        </div>
      </section>

      <CtaBanner title="Ready to see your own numbers?" description="Two minutes of questions, seven system options, no obligation." />
    </>
  );
}
