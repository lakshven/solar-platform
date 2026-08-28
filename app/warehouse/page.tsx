import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  Gauge,
  Grid3X3,
  LineChart,
  Map,
  MonitorCog,
  Package,
  PanelsTopLeft,
  ShieldCheck,
  Sun,
  Warehouse,
  Wrench,
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
  title: "Warehouse Solar & Energy Systems — BrightGrid Energy",
  description:
    "Commercial solar for warehouses, distribution centres and logistics sites. Combine rooftop solar, battery storage, EV charging, PPAs and intelligent energy management.",
};

const ENERGY_CHALLENGES = [
  {
    icon: Sun,
    title: "Large roof opportunity",
    description:
      "Large warehouse roofs can provide significant space for solar generation when structure, orientation, shading and planning requirements are suitable.",
  },
  {
    icon: Zap,
    title: "High electricity demand",
    description:
      "Lighting, refrigeration, automation, HVAC, conveyors and warehouse equipment can create substantial electricity demand.",
  },
  {
    icon: BatteryCharging,
    title: "Energy outside solar hours",
    description:
      "Battery storage can help shift available solar generation into periods when the site needs electricity.",
  },
  {
    icon: Car,
    title: "Fleet electrification",
    description:
      "Electric vans, cars and commercial vehicles can turn a warehouse into a much larger electricity consumer over time.",
  },
];

const SYSTEM_COMPONENTS = [
  {
    number: "01",
    icon: Sun,
    title: "Rooftop solar",
    description:
      "Generate electricity directly where the warehouse consumes it, subject to roof suitability and grid requirements.",
  },
  {
    number: "02",
    icon: BatteryCharging,
    title: "Battery storage",
    description:
      "Store surplus generation and strategically use stored energy during suitable periods.",
  },
  {
    number: "03",
    icon: Car,
    title: "EV charging",
    description:
      "Support employee, delivery, fleet and visitor charging as transport becomes increasingly electrified.",
  },
  {
    number: "04",
    icon: MonitorCog,
    title: "Energy management",
    description:
      "Monitor generation, consumption, battery operation and charging behaviour across the site.",
  },
];

const ROOF_ASSESSMENT = [
  "Usable roof area",
  "Roof orientation",
  "Roof pitch",
  "Shading",
  "Roof condition",
  "Structural considerations",
  "Access requirements",
  "Electrical infrastructure",
];

const ENERGY_ASSESSMENT = [
  "Half-hourly electricity consumption",
  "Operating hours",
  "Peak demand",
  "Daytime consumption",
  "Seasonal demand",
  "Export requirements",
  "Future electricity demand",
  "EV charging requirements",
];

const WAREHOUSE_USE_CASES = [
  {
    icon: Package,
    title: "Distribution centres",
    description:
      "Solar designed around logistics operations, warehouse automation and extended operating hours.",
  },
  {
    icon: Factory,
    title: "Industrial warehouses",
    description:
      "Combine rooftop generation with battery storage and high-demand industrial equipment.",
  },
  {
    icon: Building2,
    title: "Multi-tenant warehouses",
    description:
      "Explore energy strategies for landlord-owned buildings with multiple occupiers.",
  },
  {
    icon: Car,
    title: "Logistics & fleet hubs",
    description:
      "Combine solar generation with EV charging infrastructure for increasingly electrified fleets.",
  },
];

const COMMERCIAL_OPTIONS = [
  {
    icon: CircleDollarSign,
    title: "Buy the system",
    description:
      "The business funds the installation and owns the energy asset, subject to the agreed project structure.",
  },
  {
    icon: LineChart,
    title: "Explore a PPA",
    description:
      "An externally funded structure may allow the business to use on-site renewable electricity without purchasing the complete system upfront.",
  },
  {
    icon: BatteryCharging,
    title: "Add battery storage",
    description:
      "Increase the flexibility of the energy system and potentially improve how solar generation is used.",
  },
];

export default function WarehousePage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        tone="dark"
        eyebrow="Warehouse & logistics energy"
        title="Turn your warehouse roof into working energy infrastructure."
        description="Large roofs, significant electricity demand and growing fleet electrification can make warehouses powerful candidates for integrated solar, battery storage and EV charging."
        ctaLabel="Assess my warehouse"
        ctaHref="#assessment"
      />

      {/* INTRODUCTION */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow">The warehouse opportunity</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Your roof is only one part of the energy opportunity.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                A warehouse can combine a large usable roof, substantial
                electricity consumption, parking infrastructure and future EV
                demand.
              </p>
            </div>

            <div className="space-y-5 text-muted-foreground">
              <p>
                That means the strongest solution is rarely just a row of
                panels. The system should be designed around how the building
                operates and how its electricity requirements are expected to
                change.
              </p>

              <p>
                BrightGrid assesses the roof, electricity profile, grid
                connection, available space and future requirements before
                recommending a system architecture.
              </p>

              <p>
                The result can combine rooftop solar, battery storage, EV
                charging, energy monitoring and an appropriate commercial
                structure such as direct ownership or a PPA.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE WAREHOUSE VISUAL */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-background">
            <div className="absolute inset-0 opacity-40">
              <div className="absolute left-[10%] top-[15%] h-56 w-56 rounded-full border border-border" />
              <div className="absolute right-[8%] top-[25%] h-80 w-80 rounded-full border border-border" />
              <div className="absolute bottom-[-20%] left-[35%] h-72 w-72 rounded-full border border-border" />
            </div>

            <div className="relative grid min-h-[500px] gap-10 p-8 md:p-12 lg:grid-cols-[1fr_1fr] lg:p-16">
              <div className="flex flex-col justify-center">
                <Badge variant="outline" className="w-fit">
                  Warehouse energy architecture
                </Badge>

                <h2 className="mt-6 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                  From roof to grid connection — one connected system.
                </h2>

                <p className="mt-5 max-w-lg text-muted-foreground">
                  Instead of treating solar, batteries and EV charging as
                  separate projects, we can assess them as one energy
                  infrastructure strategy.
                </p>

                <Button asChild variant="accent" className="mt-7 w-fit">
                  <Link href="#assessment">
                    Explore your warehouse
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  {/* Roof */}
                  <div className="relative rounded-2xl border border-border bg-secondary p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        Roof generation
                      </span>

                      <Sun className="size-5" />
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      {Array.from({ length: 36 }).map((_, index) => (
                        <div
                          key={index}
                          className="aspect-[1.6/1] rounded-sm border border-border bg-background"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mx-auto h-8 w-px bg-border" />

                  {/* Energy stack */}
                  <div className="grid grid-cols-3 gap-3">
                    <EnergyNode
                      icon={BatteryCharging}
                      label="Battery"
                    />

                    <EnergyNode
                      icon={Gauge}
                      label="Building"
                    />

                    <EnergyNode
                      icon={Car}
                      label="EV fleet"
                    />
                  </div>

                  <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-medium shadow-sm">
                    <Grid3X3 className="size-4" />
                    Grid connection
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHALLENGES */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Why warehouses are different</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Large buildings create large energy questions.
            </h2>

            <p className="mt-4 text-muted-foreground">
              The right system depends on much more than the amount of roof
              available.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ENERGY_CHALLENGES.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="group p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-secondary transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROOF + ENERGY INTELLIGENCE */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* ROOF */}
            <div>
              <p className="eyebrow text-white/50">
                01 / Roof intelligence
              </p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                First, understand the roof.
              </h2>

              <p className="mt-5 max-w-xl text-white/55">
                A large roof does not automatically mean the entire surface
                can be covered with solar. We consider the usable area and the
                physical characteristics of the building.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {ROOF_ASSESSMENT.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-white/60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* ENERGY */}
            <div>
              <p className="eyebrow text-white/50">
                02 / Energy intelligence
              </p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Then understand what the building actually consumes.
              </h2>

              <p className="mt-5 max-w-xl text-white/55">
                Solar capacity should be considered alongside the site's
                electricity demand, operating schedule and future
                electrification requirements.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {ENERGY_ASSESSMENT.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/75"
                  >
                    <CheckCircle2 className="size-4 shrink-0 text-white/60" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Integrated architecture</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              Build the energy system around the warehouse.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Solar is the generator. Batteries provide flexibility. EV
              charging creates new demand. Monitoring connects everything.
            </p>
          </div>

          <div className="mt-12 grid gap-0 overflow-hidden rounded-3xl border border-border md:grid-cols-4">
            {SYSTEM_COMPONENTS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative border-b border-border p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.number}
                  </span>

                  <div className="mt-6 flex size-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>

                  {index < SYSTEM_COMPONENTS.length - 1 && (
                    <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-6 -translate-y-1/2 rounded-full bg-background p-1 text-muted-foreground md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EV + BATTERY */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden">
              <div className="border-b border-border bg-background p-7">
                <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                  <Car className="size-6" />
                </div>

                <h2 className="mt-6 font-display text-2xl font-medium md:text-3xl">
                  Your warehouse could become an EV energy hub.
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Distribution and logistics sites can increasingly become
                  important charging locations as fleets transition away from
                  combustion vehicles.
                </p>
              </div>

              <CardContent className="p-7">
                <div className="space-y-3">
                  {[
                    "Employee EV charging",
                    "Company vehicles",
                    "Delivery vans",
                    "Fleet charging",
                    "Visitor charging",
                    "Future charging expansion",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-secondary/60 p-3 text-sm"
                    >
                      <Zap className="size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="border-b border-border bg-background p-7">
                <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                  <BatteryCharging className="size-6" />
                </div>

                <h2 className="mt-6 font-display text-2xl font-medium md:text-3xl">
                  Add storage when flexibility creates value.
                </h2>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  Battery storage can help manage the difference between when
                  solar electricity is generated and when the warehouse needs
                  it.
                </p>
              </div>

              <CardContent className="p-7">
                <div className="space-y-3">
                  {[
                    "Capture surplus solar",
                    "Shift energy into later periods",
                    "Support EV charging",
                    "Manage demand peaks",
                    "Increase energy flexibility",
                    "Explore flexibility services",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-secondary/60 p-3 text-sm"
                    >
                      <BatteryCharging className="size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COMMERCIAL MODELS */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Commercial structures</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                The right project structure depends on your objectives.
              </h2>

              <p className="mt-5 text-muted-foreground">
                Some businesses want to own the system. Others prefer to
                explore an externally funded PPA. The technical opportunity can
                be assessed before deciding how the project should be financed.
              </p>

              <Button asChild variant="accent" className="mt-7">
                <Link href="#assessment">
                  Discuss your options
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {COMMERCIAL_OPTIONS.map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <CardContent className="flex gap-5 p-6">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                        <Icon className="size-5" />
                      </div>

                      <div>
                        <h3 className="font-display text-xl font-medium">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Warehouse environments</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Different warehouses. Different energy strategies.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {WAREHOUSE_USE_CASES.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-background">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* OPERATIONS DASHBOARD */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/50">
                Energy intelligence
              </p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Know what your energy system is doing.
              </h2>

              <p className="mt-5 max-w-md text-white/55">
                Monitoring can bring solar generation, consumption, battery
                behaviour and EV charging into one operational view.
              </p>

              <div className="mt-7 flex items-center gap-3 text-sm text-white/70">
                <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                  <ShieldCheck className="size-4" />
                </span>
                Built around measurable performance
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#151719]">
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Illustrative dashboard
                  </p>

                  <h3 className="mt-2 font-display text-xl font-medium">
                    Warehouse energy centre
                  </h3>
                </div>

                <Badge variant="leaf">
                  Live monitoring
                </Badge>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2">
                <DarkMetric
                  icon={Sun}
                  label="Solar"
                  value="Generating"
                  detail="Roof array"
                />

                <DarkMetric
                  icon={Building2}
                  label="Building"
                  value="Consuming"
                  detail="Warehouse load"
                />

                <DarkMetric
                  icon={BatteryCharging}
                  label="Battery"
                  value="Available"
                  detail="Energy storage"
                />

                <DarkMetric
                  icon={Car}
                  label="EV charging"
                  value="Active"
                  detail="Fleet infrastructure"
                />
              </div>

              <div className="border-t border-white/10 p-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">
                    System status
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="size-2 rounded-full bg-white" />
                    Operating normally
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-[76%] rounded-full bg-white/70" />
                </div>

                <div className="mt-2 flex justify-between font-mono text-[10px] text-white/30">
                  <span>0</span>
                  <span>Energy utilisation</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LANDLORD / MULTI SITE */}
      <section className="section">
        <div className="container">
          <div className="rounded-3xl border border-border bg-secondary/40 p-8 md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow">Warehouse portfolios</p>

                <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                  One energy strategy across multiple logistics sites.
                </h2>

                <p className="mt-5 max-w-xl text-muted-foreground">
                  If you manage a portfolio of warehouses, distribution
                  centres or industrial properties, each site can be assessed
                  individually while the wider programme follows a consistent
                  strategy.
                </p>

                <Button asChild variant="accent" className="mt-7">
                  <Link href="#assessment">
                    Explore a portfolio
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Site prioritisation",
                  "Roof assessments",
                  "Energy profiling",
                  "Portfolio reporting",
                  "PPA opportunities",
                  "Battery strategy",
                  "EV infrastructure",
                  "Phased deployment",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border bg-background p-4 text-sm font-medium"
                  >
                    <CheckCircle2 className="size-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">How we approach the project</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              From warehouse roof to operating energy system.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "01",
                  title: "Assess",
                  description:
                    "Understand the roof, site, electricity demand and future requirements.",
                },
                {
                  number: "02",
                  title: "Design",
                  description:
                    "Develop the appropriate combination of solar, storage and charging.",
                },
                {
                  number: "03",
                  title: "Structure",
                  description:
                    "Compare ownership, funding and PPA options where appropriate.",
                },
                {
                  number: "04",
                  title: "Operate",
                  description:
                    "Monitor, maintain and optimise the system throughout its operating life.",
                },
              ].map((item) => (
                <div
                  key={item.number}
                  className="bg-background p-7"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {item.number}
                  </span>

                  <h3 className="mt-5 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section id="assessment" className="section">
        <div className="container">
          <Card className="mx-auto max-w-4xl overflow-hidden">
            <div className="grid lg:grid-cols-[0.85fr_1.15fr]">
              <div className="bg-black p-8 text-white md:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <Warehouse className="size-6" />
                </div>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Warehouse assessment
                </p>

                <h2 className="mt-3 font-display text-3xl font-medium">
                  Let's understand your building.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/55">
                  Give us the basic information about your warehouse and we'll
                  identify the information required for the next stage of
                  assessment.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "Warehouse location",
                    "Approximate roof area",
                    "Electricity consumption",
                    "Operating hours",
                    "EV requirements",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/75"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <CardContent className="p-8 md:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Single warehouse",
                    "Multiple warehouses",
                    "Distribution centre",
                    "Industrial site",
                    "Landlord",
                    "Occupier",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border bg-secondary/40 p-4"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        0{index + 1}
                      </span>

                      <p className="mt-2 text-sm font-medium">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-xl border border-border p-5">
                  <div className="flex items-center gap-3">
                    <PanelsTopLeft className="size-5" />

                    <p className="font-medium">
                      What we can assess
                    </p>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Solar capacity, battery opportunity, EV charging,
                    electricity usage, export strategy, grid considerations and
                    potential commercial structures.
                  </p>
                </div>

                <Button
                  asChild
                  variant="accent"
                  size="default"
                  className="mt-7 w-full"
                >
                  <Link href="/commercial/assessment">
                    Start warehouse assessment
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>

                <p className="mt-4 text-center text-xs text-muted-foreground">
                  No commitment. Initial assessment is based on the information
                  available for your site.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Your warehouse can become more than a building."
        description="Explore rooftop solar, battery storage, EV charging and commercial funding options designed around your site's actual energy requirements."
        href="/commercial/assessment"
        cta="Assess my warehouse"
      />
    </>
  );
}

function EnergyNode({
  icon: Icon,
  label,
}: {
  icon: typeof BatteryCharging;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-background p-5 text-center shadow-sm">
      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
        <Icon className="size-5" />
      </div>

      <p className="mt-3 text-xs font-medium">{label}</p>
    </div>
  );
}

function DarkMetric({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Sun;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="bg-[#151719] p-6">
      <Icon className="size-5 text-white/50" />

      <p className="mt-5 text-xs text-white/35">
        {label}
      </p>

      <p className="mt-1 font-medium text-white">
        {value}
      </p>

      <p className="mt-1 text-xs text-white/30">
        {detail}
      </p>
    </div>
  );
}