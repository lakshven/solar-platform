import { createClient } from "@/lib/supabase/server";
import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatGBP } from "@/lib/utils";

export const metadata = { title: "Case Studies — BrightGrid Energy" };

// Shown if Supabase has no rows yet / isn't configured, so the page always
// renders something meaningful rather than an empty state.
const FALLBACK = [
  { id: "1", slug: "surrey-homeowner", title: "A Surrey semi, six months on solar and battery", category: "homeowner", summary: "6 kWp solar + 10 kWh battery, self-consumption up from 34% to 71%.", annual_saving_gbp: 890 },
  { id: "2", slug: "kingston-retrofit", title: "Turning wasted export into real savings", category: "existing-solar", summary: "A 2019 solar install retrofitted with a Pylontech battery.", annual_saving_gbp: 540 },
  { id: "3", slug: "epsom-ev-family", title: "Charging the family EV from the roof", category: "ev", summary: "Solar + battery + EV, tariff-optimised overnight top-ups.", annual_saving_gbp: 1120 },
  { id: "4", slug: "reigate-heat-pump", title: "Replacing a 15-year-old gas boiler", category: "heat-pump", summary: "Solar + battery + air-to-water heat pump with BUS grant applied.", annual_saving_gbp: 760 },
  { id: "5", slug: "surrey-hills-farm", title: "250kWp on a working Surrey Hills farm", category: "farm", summary: "Sized around refrigeration and irrigation load, not roof maximum.", annual_saving_gbp: 41000 },
  { id: "6", slug: "10-property-portfolio", title: "A 10-property rental portfolio, one contract", category: "landlord", summary: "Phased installation across a single landlord's portfolio.", annual_saving_gbp: 6200 },
];

export default async function CaseStudiesPage() {
  let studies = FALLBACK;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("case_studies").select("*").eq("published", true).limit(12);
    if (data && data.length > 0) studies = data as unknown as typeof FALLBACK;
  } catch {
    // Supabase not configured yet in this environment — fallback content covers it.
  }

  return (
    <>
      <PageHero eyebrow="Case studies" title="Real installations, real numbers." description="Before, design, installation and results — across homes, farms and portfolios." />

      <section className="section pt-0">
        <div className="container grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {studies.map((s) => (
            <Card key={s.id}>
              <CardHeader>
                <Badge variant="leaf" className="w-fit capitalize">{s.category.replace(/-/g, " ")}</Badge>
                <CardTitle className="mt-2">{s.title}</CardTitle>
                <CardDescription>{s.summary}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-display text-xl font-medium text-leaf">
                  {formatGBP(s.annual_saving_gbp ?? 0)}
                  <span className="text-xs font-sans font-normal text-muted-foreground"> /year saved</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CtaBanner title="Your home could be next." description="See your own numbers, not just an average." />
    </>
  );
}
