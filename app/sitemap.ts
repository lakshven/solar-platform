import type { MetadataRoute } from "next";
import { getAllPosts, SITE_URL } from "@/lib/blog/utils";

const STATIC_ROUTES = [
  "",
  "/solar",
  "/battery",
  "/battery/existing-solar",
  "/ev-charging",
  "/heat-pumps",
  "/commercial",
  "/maintenance",
  "/how-it-works",
  "/about",
  "/case-studies",
  "/reviews",
  "/faqs",
  "/check-your-savings",
  "/blog",
];

const CATEGORIES = ["Solar", "Battery", "Heat Pumps", "EV Charging", "Grants & Finance", "Commercial & Farms"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/check-your-savings" ? 0.9 : 0.7,
  }));

  const categoryEntries: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_URL}/blog/category/${encodeURIComponent(category)}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const postEntries: MetadataRoute.Sitemap = (await getAllPosts()).map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...postEntries];
}
