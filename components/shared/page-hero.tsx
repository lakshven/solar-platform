import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PageHero({
  eyebrow,
  title,
  description,
  ctaLabel = "Check Your Savings",
  ctaHref = "/check-your-savings",
  tone = "light",
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section className={dark ? "bg-charcoal text-cream" : ""}>
      <div className="container pt-16 pb-14 md:pt-20 md:pb-16">
        <p className={`eyebrow ${dark ? "text-leaf-light" : ""}`}>{eyebrow}</p>
        <h1 className="mt-3 max-w-2xl text-balance font-display text-4xl font-medium leading-[1.1] md:text-5xl">
          {title}
        </h1>
        <p className={`mt-4 max-w-xl text-lg ${dark ? "text-cream/70" : "text-muted-foreground"}`}>{description}</p>
        <Button asChild size="default" variant="accent" className="mt-8">
          <Link href={ctaHref}>
            {ctaLabel} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
