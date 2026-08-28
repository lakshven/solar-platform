import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata = { title: "About Us — BrightGrid Energy" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="We size systems around your home, not a sales target."
        description="Based in Surrey, working across London and the South East."
      />

      <section className="section pt-0">
        <div className="container max-w-2xl space-y-6 text-muted-foreground">
          <p>
            BrightGrid started with a simple frustration: most solar quotes are sized to hit a number, not to
            match how a household or business actually uses energy. We build our recommendations the other way
            round — starting from your usage, your roof, your tariff and your priorities, then showing the
            trade-offs transparently.
          </p>
          <p>
            Our engineers handle design, installation and aftercare directly rather than subcontracting the
            parts that matter. That's also why we built our own calculator instead of using an industry-standard
            estimate — the assumptions are ours, and we can explain every one of them.
          </p>
          <p>
            We work on homes, farms, warehouses, offices and rental portfolios across London, Surrey and the
            South East, and stand behind everything we install with Home Energy Care.
          </p>
        </div>
      </section>

      <CtaBanner title="See what we'd recommend for your home." description="No obligation, no pushy follow-up call." />
    </>
  );
}
