import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostCard } from "@/components/blog/post-card";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getAllPosts, SITE_URL } from "@/lib/blog/utils";
import type { BlogCategory } from "@/lib/blog/types";

const CATEGORIES: BlogCategory[] = ["Solar", "Battery", "Heat Pumps", "EV Charging", "Grants & Finance", "Commercial & Farms"];

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} Guides — BrightGrid Blog`,
    description: `Every BrightGrid article about ${category.toLowerCase()}, in one place.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${encodeURIComponent(category)}` },
  };
}

export const revalidate = 3600;

export default async function BlogCategoryPage({ params }: { params: { category: string } }) {
  const category = decodeURIComponent(params.category) as BlogCategory;
  if (!CATEGORIES.includes(category)) notFound();

  const posts = (await getAllPosts()).filter((p) => p.category === category);

  return (
    <>
      <section className="pt-16 pb-10 md:pt-20">
        <div className="container">
          <p className="eyebrow">Blog · {category}</p>
          <h1 className="mt-3 font-display text-4xl font-medium">{category} guides</h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Every article we&apos;ve written about {category.toLowerCase()}, most recent first.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {posts.length === 0 && (
          <div className="container">
            <p className="text-sm text-muted-foreground">No articles in this category yet — check back soon.</p>
          </div>
        )}
      </section>

      <CtaBanner title="See what this means for your home." description="Two minutes of questions, seven system options, no obligation." />
    </>
  );
}
