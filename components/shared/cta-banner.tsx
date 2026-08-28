import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBanner({
  eyebrow = "Ready when you are",
  title,
  description,
  href = "/check-your-savings",
  cta = "Check Your Savings",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <section className="section">
      <div className="container">
        <div className="rounded-3xl bg-charcoal px-8 py-14 text-cream md:px-16 md:py-16">
          <p className="eyebrow text-leaf-light">{eyebrow}</p>
          <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-cream/70">{description}</p>
          <Button asChild size="default" variant="accent" className="mt-8">
            <Link href={href}>
              {cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
