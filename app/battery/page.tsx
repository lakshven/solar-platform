import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Battery,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Home,
  Leaf,
  LineChart,
  MapPin,
  Network,
  ShieldCheck,
  Sun,
  Tractor,
  Zap,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Battery Storage & Energy Flexibility — BrightGrid Energy",
  description:
    "Battery storage for homes, farms and commercial sites. Store excess solar, use energy when you need it and explore energy flexibility opportunities.",
};

/* -------------------------------------------------------------------------- */
/* IMAGES                                                                     */
/* -------------------------------------------------------------------------- */

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=2200&q=85",

  battery:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=85",

  solar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85",

  commercial:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85",

  farm:
    "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1800&q=85",

  ev:
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1800&q=85",

  grid:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1800&q=85",

  warehouse:
    "https://images.unsplash.com/photo-1586528116493-da8b2c5e6e5a?auto=format&fit=crop&w=1800&q=85",
};

/* -------------------------------------------------------------------------- */
/* DATA                                                                       */
/* -------------------------------------------------------------------------- */

const BATTERY_LOCATIONS = [
  {
    icon: Building2,
    title: "Existing battery systems",
    description:
      "Where technically compatible, additional storage can be assessed alongside an existing battery installation.",
  },
  {
    icon: Sun,
    title: "Solar system upgrades",
    description:
      "Capture more of the electricity your solar system generates instead of sending every surplus unit to the grid.",
  },
  {
    icon: Car,
    title: "Carports & parking",
    description:
      "Suitable accessible areas around carports and parking infrastructure can be considered for additional battery capacity.",
  },
  {
    icon: Building2,
    title: "Commercial sites",
    description:
      "Warehouses, farms, offices and other commercial properties may have space and electricity profiles suited to larger storage systems.",
  },
];

const FLEXIBILITY = [
  {
    icon: Sun,
    title: "Store surplus generation",
    description:
      "When solar production exceeds immediate demand, available battery capacity can store some of that energy.",
  },
  {
    icon: Zap,
    title: "Use energy later",
    description:
      "Stored electricity can be used when the site needs it, reducing reliance on electricity imported from the grid.",
  },
  {
    icon: Network,
    title: "Support the wider grid",
    description:
      "Eligible batteries can potentially provide flexibility services that help balance electricity supply and demand.",
  },
  {
    icon: CircleDollarSign,
    title: "Explore revenue",
    description:
      "Eligible systems may participate in flexibility or energy-market programmes. Revenue depends on the specific programme and agreement.",
  },
];

const SUITABILITY = [
  "Existing solar installation",
  "Existing battery system",
  "Available physical space",
  "Suitable electrical infrastructure",
  "Compatible inverter and battery architecture",
  "Appropriate metering",
  "Suitable grid connection",
  "Potential flexibility participation",
];

const COMMUNITY_POINTS = [
  "Store renewable electricity when generation is high",
  "Use stored electricity when demand increases",
  "Reduce unnecessary renewable-energy curtailment",
  "Shift electricity consumption to useful times",
  "Support a more flexible electricity network",
  "Potentially earn revenue through flexibility services",
];

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function BatteryPage() {
  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* HERO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative min-h-[720px] overflow-hidden bg-black text-white">
        <img
          src={IMAGES.hero}
          alt="Solar panels and renewable energy infrastructure"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        <div className="container relative z-10 flex min-h-[720px] items-end pb-20 pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur-md">
                Battery storage & flexibility
              </span>
            </div>

            <h1 className="max-w-4xl text-balance font-display text-5xl font-medium leading-[0.95] sm:text-6xl lg:text-8xl">
              Your battery can do more than store your solar.
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Store excess renewable energy, use it when your site needs it
              and explore whether your battery could become part of a smarter,
              more flexible electricity system.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="#assessment"
                className="inline-flex items-center rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-black transition-transform hover:-translate-y-0.5"
              >
                Explore battery flexibility
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                How it works
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-white/15 pt-7 sm:grid-cols-4">
              <HeroStat value="Solar" label="Capture surplus" />
              <HeroStat value="Battery" label="Store energy" />
              <HeroStat value="Grid" label="Flexibility" />
              <HeroStat value="Value" label="Potential revenue" />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* INTRO                                                               */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="eyebrow">The opportunity</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                Turn stored energy into flexibility.
              </h2>
            </div>

            <div className="space-y-5 text-base leading-8 text-muted-foreground">
              <p>
                Solar generation and electricity demand rarely line up
                perfectly. A battery creates a bridge between the moment energy
                is generated and the moment it is actually needed.
              </p>

              <p>
                That means your battery can potentially do more than simply
                provide backup or increase solar self-consumption. Depending on
                the system and commercial arrangement, it can become an active
                part of your site's energy strategy.
              </p>

              <p>
                BrightGrid can assess your existing infrastructure, available
                space, electricity profile and grid connection to determine
                whether additional storage or flexibility participation makes
                sense.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* IMMERSIVE BATTERY SECTION                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="relative overflow-hidden bg-black text-white">
        <div className="absolute inset-0">
          <img
            src={IMAGES.battery}
            alt="Renewable electricity infrastructure"
            className="h-full w-full object-cover opacity-30"
          />

          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="container relative z-10 py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/50">
                Battery architecture
              </p>

              <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium md:text-6xl">
                Add storage around the infrastructure you already have.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                A battery doesn't necessarily mean starting again. Depending
                on the architecture, additional storage can potentially be
                integrated alongside an existing solar and battery system.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                  <BatteryCharging className="size-6" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-white/40">
                    System concept
                  </p>

                  <p className="mt-1 font-display text-xl">
                    Solar + storage + flexibility
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <EnergyBar
                  label="Solar generation"
                  value="High"
                  width="86%"
                />

                <EnergyBar
                  label="Battery capacity"
                  value="Available"
                  width="68%"
                />

                <EnergyBar
                  label="Site demand"
                  value="Balanced"
                  width="52%"
                />

                <EnergyBar
                  label="Grid flexibility"
                  value="Ready"
                  width="74%"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* LOCATIONS                                                           */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Flexible deployment</p>

            <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
              Storage can work across different environments.
            </h2>

            <p className="mt-5 text-muted-foreground">
              The right location depends on safety, access, electrical
              infrastructure, environmental conditions and the purpose of the
              storage system.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {BATTERY_LOCATIONS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-border bg-background p-8 transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <span className="absolute right-7 top-7 font-mono text-xs text-muted-foreground/50">
                    0{index + 1}
                  </span>

                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary transition group-hover:scale-105">
                    <Icon className="size-6" />
                  </div>

                  <h3 className="mt-8 font-display text-2xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>

                  <ArrowUpRight className="absolute bottom-8 right-8 size-5 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* HOW IT WORKS                                                       */}
      {/* ------------------------------------------------------------------ */}

      <section id="how-it-works" className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow">How the system works</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                Energy moves when it makes sense.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-muted-foreground">
                Instead of treating your battery as a static piece of
                equipment, the system can respond to generation, demand,
                pricing and, where applicable, flexibility signals.
              </p>
            </div>

            <div className="space-y-3">
              <FlowStep
                number="01"
                icon={Sun}
                title="Generate"
                description="Solar produces electricity during available daylight hours."
              />

              <FlowStep
                number="02"
                icon={BatteryCharging}
                title="Store"
                description="Surplus energy can be directed into available battery capacity."
              />

              <FlowStep
                number="03"
                icon={Building2}
                title="Use"
                description="Stored energy can later support the property's electricity demand."
              />

              <FlowStep
                number="04"
                icon={Network}
                title="Flex"
                description="Eligible systems can potentially respond to wider electricity-system requirements."
              />

              <FlowStep
                number="05"
                icon={CircleDollarSign}
                title="Create value"
                description="Depending on the arrangement, flexibility participation may create an additional revenue stream."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FLEXIBILITY                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section className="section bg-black text-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              Battery flexibility
            </p>

            <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
              One battery. Multiple jobs.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/55">
              Storage can support your own electricity needs while potentially
              becoming part of a larger flexibility network.
            </p>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {FLEXIBILITY.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group bg-black p-8 transition hover:bg-white/[0.03] md:p-10"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-7 text-white/50">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* IMMERSIVE COMMERCIAL IMAGE                                         */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <div className="relative min-h-[600px] overflow-hidden rounded-[2rem]">
            <img
              src={IMAGES.commercial}
              alt="Modern commercial building"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/10" />

            <div className="relative z-10 flex min-h-[600px] items-end p-8 md:p-14">
              <div className="max-w-2xl text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Commercial energy
                </p>

                <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
                  Your building can become part of a smarter energy network.
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                  For businesses with solar, substantial electricity demand or
                  suitable infrastructure, battery storage can become another
                  layer of the site's energy strategy.
                </p>

                <Link
                  href="/commercial"
                  className="mt-8 inline-flex items-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-black"
                >
                  Explore commercial energy
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* MONEY + COMMUNITY                                                  */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="overflow-hidden rounded-3xl">
              <div className="p-8 md:p-10">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                  <CircleDollarSign className="size-6" />
                </div>

                <h2 className="mt-7 font-display text-3xl font-medium md:text-4xl">
                  Could your battery earn money?
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Potentially. Some batteries can participate in flexibility
                  services where an aggregator or energy provider coordinates
                  their operation in response to market or grid requirements.
                </p>

                <div className="mt-8 grid gap-2 sm:grid-cols-2">
                  {[
                    "Battery capacity",
                    "Location",
                    "Grid connection",
                    "Metering",
                    "Technical compatibility",
                    "Market programme",
                    "Contract terms",
                    "Operating requirements",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 rounded-xl bg-secondary/50 px-4 py-3 text-sm"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <p className="mt-7 text-xs leading-5 text-muted-foreground">
                  Revenue is not guaranteed. Eligibility and payments depend on
                  the flexibility provider, market conditions, technical
                  requirements and contract.
                </p>
              </div>
            </Card>

            <div className="relative min-h-[500px] overflow-hidden rounded-3xl">
              <img
                src={IMAGES.solar}
                alt="Solar panels generating renewable electricity"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/60" />

              <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white md:p-10">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Leaf className="size-6" />
                </div>

                <h2 className="mt-7 font-display text-3xl font-medium md:text-4xl">
                  Help build a more flexible energy system.
                </h2>

                <p className="mt-5 max-w-xl leading-7 text-white/65">
                  More flexible storage can make it easier to integrate
                  renewable generation and manage changing electricity demand.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {COMMUNITY_POINTS.slice(0, 4).map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-2 text-sm text-white/70"
                    >
                      <Leaf className="mt-0.5 size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* VIRTUAL POWER NETWORK                                             */}
      {/* ------------------------------------------------------------------ */}

      <section className="section bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow">From battery to network</p>

            <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
              One battery is small. Thousands can become powerful.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
              Connected batteries across homes, farms, businesses and other
              sites can collectively provide a much larger flexible energy
              resource.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { icon: Home, label: "Homes" },
              { icon: Building2, label: "Businesses" },
              { icon: Tractor, label: "Farms" },
              { icon: Car, label: "Carports" },
              { icon: Network, label: "Grid" },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="relative rounded-2xl border border-border bg-background p-7 text-center"
                >
                  <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-secondary">
                    <Icon className="size-6" />
                  </div>

                  <p className="mt-5 text-sm font-medium">{item.label}</p>

                  {index < 4 && (
                    <ArrowRight className="absolute -right-3 top-1/2 hidden size-5 -translate-y-1/2 text-muted-foreground lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* SUITABILITY                                                        */}
      {/* ------------------------------------------------------------------ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Battery suitability</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                First, we work out whether your site can support it.
              </h2>

              <p className="mt-6 leading-7 text-muted-foreground">
                Adding batteries isn't simply a question of finding an empty
                wall. We assess the technical, physical and commercial picture
                together.
              </p>

              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-border bg-secondary/40 p-5">
                <ShieldCheck className="size-5 shrink-0" />

                <p className="text-sm leading-6 text-muted-foreground">
                  Battery placement and integration are subject to technical,
                  safety, fire, electrical and regulatory requirements.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SUITABILITY.map((item, index) => (
                <div
                  key={item}
                  className="group flex items-start gap-4 rounded-2xl border border-border p-5 transition hover:border-primary/30 hover:shadow-md"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0" />

                    <span className="text-sm leading-6">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* DASHBOARD                                                          */}
      {/* ------------------------------------------------------------------ */}

      <section className="section bg-[#111315] text-white">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#181a1d]">
              <div className="flex flex-col gap-4 border-b border-white/10 p-7 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Illustrative flexibility dashboard
                  </p>

                  <h3 className="mt-2 font-display text-2xl font-medium">
                    Battery operating status
                  </h3>
                </div>

                <Badge variant="leaf">Flexibility enabled</Badge>
              </div>

              <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardItem
                  icon={BatteryCharging}
                  label="Battery"
                  value="82%"
                />

                <DashboardItem
                  icon={Sun}
                  label="Solar"
                  value="Generating"
                />

                <DashboardItem
                  icon={Zap}
                  label="Grid"
                  value="Balanced"
                />

                <DashboardItem
                  icon={LineChart}
                  label="Flexibility"
                  value="Available"
                />
              </div>

              <div className="p-7">
                <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-white/30">
                      Current system state
                    </p>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[82%] rounded-full bg-white" />
                    </div>
                  </div>

                  <p className="text-xs leading-5 text-white/35 lg:max-w-xs">
                    Illustrative interface only. Actual telemetry, controls and
                    flexibility participation depend on the battery, inverter,
                    metering and service provider.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* ASSESSMENT                                                         */}
      {/* ------------------------------------------------------------------ */}

      <section id="assessment" className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-[2rem] bg-black text-white">
            <img
              src={IMAGES.grid}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-25"
            />

            <div className="absolute inset-0 bg-black/70" />

            <div className="relative z-10 grid gap-12 p-8 md:p-14 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Battery assessment
                </p>

                <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
                  Already have batteries? Let's see what else they could do.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                  Tell us what you have today, where it is installed and what
                  you're trying to achieve. We'll assess whether additional
                  storage or flexibility participation is worth exploring.
                </p>

                <div className="mt-9 grid gap-3 sm:grid-cols-3">
                  {[
                    "Existing system",
                    "Available space",
                    "Energy objectives",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <span className="font-mono text-xs text-white/30">
                        0{index + 1}
                      </span>

                      <p className="mt-2 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/commercial#assessment"
                className="inline-flex h-fit items-center justify-center rounded-xl bg-white px-6 py-4 text-sm font-medium text-black transition hover:-translate-y-0.5"
              >
                Assess my battery opportunity
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* FINAL CTA                                                          */}
      {/* ------------------------------------------------------------------ */}

      <CtaBanner
        title="Make your battery work harder."
        description="Store more renewable energy, support a more flexible electricity system and explore whether your battery could participate in energy flexibility."
        href="#assessment"
        cta="Explore battery flexibility"
      />
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                */
/* -------------------------------------------------------------------------- */

function HeroStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="font-display text-lg font-medium">{value}</p>
      <p className="mt-1 text-xs text-white/40">{label}</p>
    </div>
  );
}

function EnergyBar({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-white/45">{label}</span>
        <span className="text-white/70">{value}</span>
      </div>

      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white/70"
          style={{ width }}
        />
      </div>
    </div>
  );
}

function FlowStep({
  number,
  icon: Icon,
  title,
  description,
}: {
  number: string;
  icon: typeof Sun;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex gap-5 rounded-2xl border border-border bg-background p-5 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
        <Icon className="size-5" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-muted-foreground">
            {number}
          </span>

          <h3 className="font-display text-lg font-medium">{title}</h3>
        </div>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      <ArrowUpRight className="size-4 text-muted-foreground opacity-0 transition group-hover:opacity-100" />
    </div>
  );
}

function DashboardItem({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BatteryCharging;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#181a1d] p-7">
      <Icon className="size-5 text-white/50" />

      <p className="mt-6 text-xs text-white/30">{label}</p>

      <p className="mt-1 font-display text-xl">{value}</p>
    </div>
  );
}