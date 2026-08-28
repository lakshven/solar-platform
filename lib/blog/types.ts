export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading2"; text: string; id: string }
  | { type: "heading3"; text: string; id: string }
  | { type: "list"; style: "bullet" | "number"; items: string[] }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; text: string; tone?: "info" | "tip" | "warning" }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; url: string; alt: string; caption?: string }
  | { type: "cta"; title: string; description: string; href: string; label: string };

export interface FaqItem {
  q: string;
  a: string;
}

export type BlogCategory = "Solar" | "Battery" | "Heat Pumps" | "EV Charging" | "Grants & Finance" | "Commercial & Farms";

export interface BlogPost {
  slug: string;
  title: string;
  /** 150–160 chars, used as <meta name="description"> and card blurb */
  description: string;
  category: BlogCategory;
  tags: string[];
  publishedAt: string; // ISO date
  updatedAt?: string; // ISO date
  author: { name: string; role: string; initials: string };
  heroGradient: string; // tailwind gradient classes, used as a fallback if no cover image
  coverImageUrl?: string; // Supabase Storage public URL — takes priority over heroGradient when set
  content: ContentBlock[];
  faq?: FaqItem[];
  featured?: boolean;
}
