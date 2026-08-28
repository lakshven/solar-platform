import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ContentRenderer } from "@/components/blog/content-renderer";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { AuthorBio, Breadcrumbs } from "@/components/blog/post-meta";
import { PostCard } from "@/components/blog/post-card";
import { FaqList } from "@/components/shared/faq-list";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getReadingTimeMinutes,
  getHeadings,
  buildArticleJsonLd,
  buildFaqJsonLd,
  buildBreadcrumbJsonLd,
  SITE_URL,
} from "@/lib/blog/utils";

export const revalidate = 0; // re-check Supabase for edits hourly, no redeploy needed

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | BrightGrid Energy`,
    description: post.description,
    alternates: { canonical: url },
    authors: [{ name: post.author.name }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const allPosts = await getAllPosts();
  const headings = getHeadings(post);
  const related = getRelatedPosts(allPosts, post);
  const readingTime = getReadingTimeMinutes(post);

  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.category, href: `/blog/category/${encodeURIComponent(post.category)}` },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  const jsonLd = [
    buildArticleJsonLd(post),
    buildFaqJsonLd(post),
    buildBreadcrumbJsonLd(breadcrumbItems.map((b) => ({ name: b.name, url: `${SITE_URL}${b.href}` }))),
  ].filter(Boolean);

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className={`relative overflow-hidden ${post.coverImageUrl ? "bg-charcoal" : `bg-gradient-to-br ${post.heroGradient}`}`}>
        {post.coverImageUrl && (
          <>
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url("${post.coverImageUrl}")`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/55 to-charcoal/20" />
          </>
        )}
        <div className="container relative pt-10 pb-14 md:pt-14 md:pb-16">
          <Breadcrumbs
            items={breadcrumbItems.map((b) => ({ name: b.name, href: b.href }))}
            dark={!!post.coverImageUrl}
          />
          <Badge
            variant="outline"
            className={`mt-5 w-fit ${post.coverImageUrl ? "border-cream/30 bg-white/10 text-cream" : "border-charcoal/20 bg-white/40 text-charcoal"}`}
          >
            {post.category}
          </Badge>
          <h1
            className={`mt-4 max-w-3xl text-balance font-display text-3xl font-medium leading-[1.15] md:text-5xl ${
              post.coverImageUrl ? "text-cream" : "text-charcoal"
            }`}
          >
            {post.title}
          </h1>
          <div className={`mt-5 flex flex-wrap items-center gap-4 text-sm ${post.coverImageUrl ? "text-cream/70" : "text-charcoal/70"}`}>
            <span className="font-medium">{post.author.name}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </time>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> {readingTime} min read
            </span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 lg:grid-cols-[220px_minmax(0,1fr)]">
          <TableOfContents headings={headings} />

          <article className="max-w-2xl">
            <ContentRenderer blocks={post.content} />

            {post.faq && (
              <div className="mt-2">
                <FaqList title="Frequently asked questions" items={post.faq.map((f) => ({ q: f.q, a: f.a }))} />
              </div>
            )}

            <div className="mt-10">
              <AuthorBio author={post.author} />
            </div>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-secondary/40">
          <div className="container">
            <p className="eyebrow">Keep reading</p>
            <h2 className="mt-3 font-display text-2xl font-medium">Related guides</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner title="See what this means for your home." description="Two minutes of questions, seven system options, modelled against your own numbers." />
    </>
  );
}
