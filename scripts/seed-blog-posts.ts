/**
 * Pushes every post in lib/blog/posts/ into Supabase's `blog_posts` table.
 * Safe to re-run — it upserts on `slug`, so editing a post's TypeScript
 * file and re-running this script updates the existing row rather than
 * duplicating it.
 *
 * Requires the service-role key (bypasses RLS — blog_posts has no public
 * write policy on purpose). Reads it from .env.local automatically.
 *
 * Usage:
 *   npm run seed:blog
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { ALL_POSTS } from "@/lib/blog/posts";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local.\n" +
      "Copy .env.local.example to .env.local and fill in your Supabase project's values first."
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

async function main() {
  console.log(`Seeding ${ALL_POSTS.length} blog post(s) into Supabase...\n`);

  for (const post of ALL_POSTS) {
    const row = {
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      tags: post.tags,
      published_at: post.publishedAt,
      updated_at: post.updatedAt ?? null,
      author_name: post.author.name,
      author_role: post.author.role,
      author_initials: post.author.initials,
      hero_gradient: post.heroGradient,
      cover_image_url: post.coverImageUrl ?? null,
      content: post.content,
      faq: post.faq ?? null,
      featured: post.featured ?? false,
      published: true,
    };

    const { error } = await supabase.from("blog_posts").upsert(row, { onConflict: "slug" });

    if (error) {
      console.error(`✗ ${post.slug} — ${error.message}`);
    } else {
      console.log(`✓ ${post.slug}`);
    }
  }

  console.log("\nDone. Visit /blog — it now reads from Supabase instead of the bundled fallback.");
}

main();
