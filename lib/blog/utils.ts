import type { BlogPost, ContentBlock, FaqItem, BlogCategory } from "./types";
import { createPublicClient } from "@/lib/supabase/public";
import type { Database } from "@/types/database";

export const SITE_URL = "https://www.brightgridenergy.co.uk";

type BlogPostRow = Database["public"]["Tables"]["blog_posts"]["Row"];

function mapRowToPost(row: BlogPostRow): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    description: row.description,
    category: row.category as BlogCategory,
    tags: row.tags ?? [],
    publishedAt: row.published_at,
    updatedAt: row.updated_at ?? undefined,
    author: {
      name: row.author_name,
      role: row.author_role,
      initials: row.author_initials,
    },
    heroGradient: row.hero_gradient,
    coverImageUrl: row.cover_image_url ?? undefined,
    content: (row.content as unknown as ContentBlock[]) ?? [],
    faq: (row.faq as unknown as FaqItem[] | null) ?? undefined,
    featured: row.featured,
  };
}

/**
 * Reads published blog posts directly from Supabase.
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map(mapRowToPost);
  } catch {
    return [];
  }
}

/**
 * Reads a single published blog post directly from Supabase.
 */
export async function getPostBySlug(
  slug: string
): Promise<BlogPost | undefined> {
  try {
    const supabase = createPublicClient();

    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) {
      return undefined;
    }

    return mapRowToPost(data);
  } catch {
    return undefined;
  }
}

/**
 * Takes an already-fetched post list so pages don't re-query
 * Supabase for each related post.
 */
export function getRelatedPosts(
  allPosts: BlogPost[],
  post: BlogPost,
  limit = 3
): BlogPost[] {
  const sameCategory = allPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );

  const others = allPosts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );

  return [...sameCategory, ...others].slice(0, limit);
}

function blockWordCount(block: ContentBlock): number {
  switch (block.type) {
    case "paragraph":
    case "heading2":
    case "heading3":
      return block.text.split(/\s+/).filter(Boolean).length;

    case "list":
      return block.items.join(" ").split(/\s+/).filter(Boolean).length;

    case "quote":
      return block.text.split(/\s+/).filter(Boolean).length;

    case "callout":
      return block.text.split(/\s+/).filter(Boolean).length;

    case "table":
      return block.rows.flat().join(" ").split(/\s+/).filter(Boolean).length;

    case "cta":
      return block.description.split(/\s+/).filter(Boolean).length;

    default:
      return 0;
  }
}

export function getReadingTimeMinutes(post: BlogPost): number {
  const words = post.content.reduce(
    (sum, block) => sum + blockWordCount(block),
    0
  );

  return Math.max(1, Math.round(words / 200));
}

export function getHeadings(post: BlogPost) {
  return post.content.filter(
    (
      b
    ): b is Extract<
      ContentBlock,
      { type: "heading2" | "heading3" }
    > => b.type === "heading2" || b.type === "heading3"
  );
}

export function buildArticleJsonLd(post: BlogPost) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "BrightGrid Energy",
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.category,
    keywords: post.tags.join(", "),
  };
}

export function buildFaqJsonLd(post: BlogPost) {
  if (!post.faq?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function buildBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}