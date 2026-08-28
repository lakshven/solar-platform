import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PostCard } from "@/components/blog/post-card";
import { getAllPosts } from "@/lib/blog/utils";

export async function LatestPosts() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">From the blog</p>
            <h2 className="mt-3 max-w-lg text-balance font-display text-3xl font-medium md:text-4xl">
              Straight answers, no sales spin.
            </h2>
          </div>
          <Link href="/blog" className="group flex shrink-0 items-center gap-1.5 text-sm font-medium hover:underline">
            Read the blog
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
