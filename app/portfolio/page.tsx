import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  CloudSun,
  FileBarChart,
  Gauge,
  Layers3,
  LineChart,
  Map,
  MapPin,
  Network,
  PlugZap,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Sun,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Commercial Property Portfolios — BrightGrid Energy",
  description:
    "Portfolio-wide solar, battery storage, EV charging and energy infrastructure for landlords, property companies, asset managers and commercial property portfolios.",
};

const PORTFOLIO_TYPES = [
  {
    icon: Building2,
    title: "Commercial property portfolios",
    description:
      "Coordinate energy improvements across offices, warehouses, retail units, industrial buildings and mixed-use commercial estates.",
  },
  {
    icon: Layers3,
    title: "Property groups",
    description:
      "Assess multiple buildings together and create a prioritised programme instead of treating every property as a separate project.",
  },
  {
    icon: Map,
    title: "Multi-site estates",
    description:
      "Build a consistent energy strategy across properties located in different regions, grid areas and operating environments.",
  },
  {
    icon: WalletCards,
    title: "Investment portfolios",
    description:
      "Understand where renewable energy and electrification can potentially improve asset performance and long-term property value.",
  },
];

const PORTFOLIO_INTELLIGENCE = [
  {
    icon: MapPin,
    title: "Property mapping",
    description:
      "Create a portfolio-level view of buildings, roofs, car parks, energy assets and potential development opportunities.",
  },
  {
    icon: Sun,
    title: "Solar potential",
    description:
      "Assess roof area, orientation, shading, usable space and indicative generation potential across the estate.",
  },
  {
    icon: LineChart,
    title: "Energy demand",
    description:
      "Compare electricity consumption, operating hours and load profiles between properties.",
  },
  {
    icon: PlugZap,
    title: "Electrification",
    description:
      "Identify opportunities for EV charging, heat pumps, electric equipment and future energy demand.",
  },
  {
    icon: BatteryCharging,
    title: "Storage opportunity",
    description:
      "Identify sites where battery storage could complement solar generation or changing electricity demand.",
  },
  {
    icon: Network,
    title: "Grid strategy",
    description:
      "Consider connection capacity, export requirements and the electrical infrastructure needed at each property.",
  },
];

const PORTFOLIO_STAGES = [
  {
    number: "01",
    title: "Discover",
    description:
      "Build a complete picture of the estate — properties, energy use, roofs, parking areas, existing systems and future requirements.",
  },
  {
    number: "02",
    title: "Screen",
    description:
      "Use technical and commercial criteria to identify the strongest opportunities and eliminate unsuitable sites early.",
  },
  {
    number: "03",
    title: "Prioritise",
    description:
      "Rank properties according to energy opportunity, project complexity, investment requirements and strategic importance.",
  },
  {
    number: "04",
    title: "Design",
    description:
      "Develop site-specific concepts for solar, battery storage, EV charging and other energy infrastructure.",
  },
  {
    number: "05",
    title: "Fund",
    description:
      "Compare ownership, capital investment, PPA and other commercial structures for the portfolio.",
  },
  {
    number: "06",
    title: "Deploy",
    description:
      "Create a phased programme that can be delivered property by property while maintaining portfolio-wide standards.",
  },
  {
    number: "07",
    title: "Operate",
    description:
      "Monitor generation, consumption, system performance and maintenance across the installed estate.",
  },
];

const ASSET_TYPES = [
  {
    icon: Building2,
    title: "Offices",
    description:
      "Rooftop solar, EV charging, batteries and electrification for office buildings and business parks.",
  },
  {
    icon: Building2,
    title: "Warehouses",
    description:
      "Large rooftop opportunities combined with significant daytime electricity demand.",
  },
  {
    icon: PlugZap,
    title: "Retail",
    description:
      "Rooftop solar, solar car parks, customer EV charging and battery storage.",
  },
  {
    icon: Layers3,
    title: "Industrial",
    description:
      "Energy-intensive operations where generation, storage and electrification can be assessed together.",
  },
  {
    icon: Map,
    title: "Business parks",
    description:
      "Estate-wide energy strategies across multiple occupiers and buildings.",
  },
  {
    icon: Sparkles,
    title: "Mixed portfolios",
    description:
      "One framework for portfolios containing different property types and energy profiles.",
  },
];

const INVESTMENT_MODELS = [
  {
    icon: WalletCards,
    title: "Asset owner funded",
    description:
      "The property owner funds the infrastructure and retains ownership of the energy assets.",
  },
  {
    icon: CircleDollarSign,
    title: "Power Purchase Agreement",
    description:
      "An external funding structure may allow the customer to purchase generated electricity without funding the full installation upfront.",
  },
  {
    icon: TrendingUp,
    title: "Phased investment",
    description:
      "Prioritise the strongest properties first and expand the programme as projects mature.",
  },
];

const PORTFOLIO_METRICS = [
  "Number of properties",
  "Annual electricity consumption",
  "Roof area",
  "Parking capacity",
  "Existing solar",
  "Existing batteries",
  "EV charging",
  "Grid connection",
  "Lease structure",
  "Occupier profile",
  "Capital strategy",
  "Future development",
];

export default function PropertyPortfoliosPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        tone="dark"
        eyebrow="Commercial property portfolios"
        title="One energy strategy for your entire property portfolio."
        description="Assess every property, identify the strongest opportunities and build a coordinated programme for solar, batteries, EV charging and future electrification across your commercial estate."
        ctaLabel="Assess my portfolio"
        ctaHref="#assessment"
      />

      {/* CORE IDEA */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Portfolio strategy</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Stop looking at buildings individually.
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground">
              <p>
                A commercial property portfolio can contain dozens or
                hundreds of buildings, each with different roofs, electricity
                demand, occupiers, leases, parking areas and grid
                infrastructure.
              </p>

              <p>
                That makes a property-by-property approach inefficient. A
                portfolio strategy allows the strongest opportunities to be
                identified first, while creating consistent standards for
                design, procurement, delivery and reporting.
              </p>

              <p>
                BrightGrid can help turn a collection of individual properties
                into a coordinated energy programme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO DASHBOARD */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-border bg-background shadow-sm">
            <div className="flex flex-col gap-5 border-b border-border p-6 md:flex-row md:items-center md:justify-between md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Illustrative portfolio intelligence
                </p>

                <h3 className="mt-2 font-display text-2xl font-medium">
                  Estate energy overview
                </h3>
              </div>

              <Badge variant="leaf">
                Portfolio assessment
              </Badge>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
              <PortfolioMetric
                icon={Building2}
                label="Properties"
                value="48"
              />

              <PortfolioMetric
                icon={Sun}
                label="Solar opportunities"
                value="31"
              />

              <PortfolioMetric
                icon={PlugZap}
                label="EV opportunities"
                value="22"
              />

              <PortfolioMetric
                icon={BatteryCharging}
                label="Storage opportunities"
                value="14"
              />
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-[1fr_0.8fr] md:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">
                    Illustrative opportunity pipeline
                  </span>

                  <span className="font-mono text-[10px] text-muted-foreground">
                    NOT A CUSTOMER PORTFOLIO
                  </span>
                </div>

                <div className="mt-5 h-3 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[68%] rounded-full bg-foreground" />
                </div>

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>Screened</span>
                  <span>68%</span>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-secondary/40 p-5">
                <div className="flex items-center gap-3">
                  <ScanSearch className="size-5" />

                  <p className="text-sm font-medium">
                    Portfolio screening
                  </p>
                </div>

                <p className="mt-3 text-xs leading-5 text-muted-foreground">
                  Example interface showing how multiple properties could be
                  screened and prioritised. Actual results require
                  site-specific data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO INTELLIGENCE */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Portfolio intelligence</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Understand every property before deciding where to invest.
            </h2>

            <p className="mt-4 text-muted-foreground">
              The objective isn't to install solar everywhere. It is to
              identify where energy infrastructure makes the most technical
              and commercial sense.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PORTFOLIO_INTELLIGENCE.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-6 font-display text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SCORING */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/50">
                Prioritisation engine
              </p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Find the properties that should come first.
              </h2>

              <p className="mt-5 max-w-lg text-white/50">
                A portfolio programme becomes more powerful when each property
                can be compared against the same technical and commercial
                framework.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c0d]">
              <div className="grid grid-cols-[1fr_80px_80px_80px] border-b border-white/10 px-5 py-4 text-[10px] uppercase tracking-widest text-white/30">
                <span>Property</span>
                <span>Solar</span>
                <span>EV</span>
                <span>Score</span>
              </div>

              {[
                ["Warehouse A", "High", "High", "92"],
                ["Retail Park B", "High", "High", "88"],
                ["Office C", "Medium", "High", "76"],
                ["Industrial D", "High", "Low", "74"],
                ["Retail E", "Medium", "Medium", "69"],
              ].map(([property, solar, ev, score], index) => (
                <div
                  key={property}
                  className="grid grid-cols-[1fr_80px_80px_80px] items-center border-b border-white/10 px-5 py-5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-white/25">
                      0{index + 1}
                    </span>

                    <span className="text-sm font-medium">
                      {property}
                    </span>
                  </div>

                  <span className="text-xs text-white/50">
                    {solar}
                  </span>

                  <span className="text-xs text-white/50">
                    {ev}
                  </span>

                  <span className="font-mono text-sm">
                    {score}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/10 bg-white/[0.03] p-5">
                <p className="text-xs leading-5 text-white/35">
                  Illustrative portfolio scoring interface. Scores shown are
                  examples only and do not represent actual site assessments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ASSET TYPES */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Across your estate</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              One framework. Different property types.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ASSET_TYPES.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                        <Icon className="size-5" />
                      </div>

                      <ArrowRight className="size-4 text-muted-foreground" />
                    </div>

                    <h3 className="mt-6 font-display text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROGRAMME */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow">Portfolio programme</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                From hundreds of buildings to one actionable roadmap.
              </h2>

              <p className="mt-5 max-w-lg text-muted-foreground">
                A portfolio strategy should create decisions, not just data.
                The objective is a clear pathway from discovery through
                investment and deployment.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center gap-3">
                  <FileBarChart className="size-5" />

                  <p className="font-medium">
                    Portfolio roadmap
                  </p>
                </div>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Prioritised properties, recommended technologies,
                  indicative project pathways and potential next steps.
                </p>
              </div>
            </div>

            <div>
              {PORTFOLIO_STAGES.map((stage) => (
                <div
                  key={stage.number}
                  className="grid gap-5 border-t border-border py-7 md:grid-cols-[65px_220px_1fr]"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {stage.number}
                  </span>

                  <h3 className="font-display text-xl font-medium">
                    {stage.title}
                  </h3>

                  <p className="text-sm leading-6 text-muted-foreground">
                    {stage.description}
                  </p>
                </div>
              ))}

              <div className="border-t border-border" />
            </div>
          </div>
        </div>
      </section>

      {/* TECHNOLOGY STACK */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">Portfolio energy system</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              The portfolio can evolve beyond solar.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Start with the strongest opportunities today while creating an
              energy architecture capable of supporting tomorrow's
              electrification.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-3 md:grid-cols-5">
            {[
              {
                icon: Sun,
                title: "Solar",
              },
              {
                icon: BatteryCharging,
                title: "Battery",
              },
              {
                icon: PlugZap,
                title: "EV charging",
              },
              {
                icon: Zap,
                title: "Electrification",
              },
              {
                icon: Gauge,
                title: "Energy management",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-border bg-background p-6 text-center"
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <p className="mt-4 text-sm font-medium">
                    {item.title}
                  </p>

                  {index < 4 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 bg-background text-muted-foreground md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/50">
                Investment & funding
              </p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Build the programme around your capital strategy.
              </h2>

              <p className="mt-5 max-w-lg text-white/50">
                Portfolio energy projects can be structured in different ways.
                The right model depends on ownership, capital availability,
                occupier arrangements and long-term objectives.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-3">
              {INVESTMENT_MODELS.map((model) => {
                const Icon = model.icon;

                return (
                  <div
                    key={model.title}
                    className="bg-[#080909] p-7"
                  >
                    <Icon className="size-5 text-white/60" />

                    <h3 className="mt-6 font-display text-xl font-medium">
                      {model.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {model.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PPA */}
      <section className="section">
        <div className="container">
          <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <div className="flex size-11 items-center justify-center rounded-xl bg-background">
                  <CircleDollarSign className="size-5" />
                </div>

                <p className="eyebrow mt-6">
                  Portfolio PPA
                </p>

                <h2 className="mt-3 max-w-2xl text-balance font-display text-3xl font-medium md:text-5xl">
                  Explore an externally funded route across multiple
                  properties.
                </h2>

                <p className="mt-5 max-w-xl text-muted-foreground">
                  A portfolio PPA can potentially allow eligible properties to
                  access renewable generation through an externally funded
                  structure, subject to site suitability, occupier arrangements
                  and commercial terms.
                </p>

                <Button asChild variant="accent" className="mt-7">
                  <Link href="/ppa">
                    Explore PPA structures
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-2xl border border-border bg-background p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Structure
                </p>

                <div className="mt-6 space-y-4">
                  {[
                    "Portfolio owner",
                    "Energy asset",
                    "Solar generation",
                    "Occupier electricity",
                    "Operations & maintenance",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4"
                    >
                      <span className="flex size-8 items-center justify-center rounded-lg bg-secondary font-mono text-[10px]">
                        0{index + 1}
                      </span>

                      <span className="text-sm font-medium">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  Final ownership, pricing, maintenance, insurance, contract
                  duration and end-of-term arrangements depend on the executed
                  agreements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO DATA */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">What we need</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Start with whatever portfolio information you already have.
              </h2>

              <p className="mt-5 max-w-lg text-muted-foreground">
                You don't need a perfect dataset before starting. Existing
                energy bills, property lists, floor plans and asset
                information can provide a starting point for portfolio
                screening.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {PORTFOLIO_METRICS.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-sm"
                >
                  <CheckCircle2 className="size-4 shrink-0" />

                  <span>{item}</span>

                  <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REPORTING */}
      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                  <BarChart3Icon />
                </div>

                <CardTitle className="mt-5">
                  Portfolio reporting
                </CardTitle>

                <CardDescription>
                  Keep decision-makers focused on the estate rather than
                  individual technical systems.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                  <Gauge className="size-5" />
                </div>

                <CardTitle className="mt-5">
                  Performance visibility
                </CardTitle>

                <CardDescription>
                  Monitor installed assets and compare operational performance
                  across the portfolio.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                  <ShieldCheck className="size-5" />
                </div>

                <CardTitle className="mt-5">
                  Consistent standards
                </CardTitle>

                <CardDescription>
                  Establish common technical and operational standards as the
                  portfolio programme grows.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section id="assessment" className="section">
        <div className="container">
          <Card className="mx-auto max-w-5xl overflow-hidden">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="bg-black p-8 text-white md:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <Layers3 className="size-6" />
                </div>

                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Portfolio assessment
                </p>

                <h2 className="mt-3 font-display text-3xl font-medium">
                  Let's map the opportunity across your estate.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  Whether you have five properties or several hundred, we can
                  start by understanding the portfolio and identifying where
                  deeper technical assessment should begin.
                </p>
              </div>

              <CardContent className="p-8 md:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Property portfolio",
                    "Number of buildings",
                    "Locations",
                    "Energy data",
                    "Roof information",
                    "Parking areas",
                    "Existing energy systems",
                    "Investment objectives",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border bg-secondary/40 p-4"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-2 text-sm font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-xs leading-5 text-muted-foreground">
                  Portfolio screening is indicative. Detailed engineering,
                  structural assessments, grid studies, planning requirements,
                  financial modelling and contractual arrangements require
                  property-specific investigation.
                </p>

                <Button
                  asChild
                  variant="accent"
                  size="default"
                  className="mt-7 w-full"
                >
                  <Link href="/commercial/assessment">
                    Start portfolio assessment
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Your portfolio is an energy opportunity."
        description="Map your properties, identify the strongest sites and build a phased strategy for solar, batteries, EV charging and future electrification."
        href="/commercial/assessment"
        cta="Assess my portfolio"
      />
    </>
  );
}

function PortfolioMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Building2;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-background p-6">
      <Icon className="size-5 text-muted-foreground" />

      <p className="mt-5 text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 font-display text-2xl font-medium">
        {value}
      </p>
    </div>
  );
}

function BarChart3Icon() {
  return <BarChart3 className="size-5" />;
}