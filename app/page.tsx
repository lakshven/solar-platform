import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Car,
  Factory,
  Gauge,
  LineChart,
  Map,
  School,
  ShieldCheck,
  Sun,
  Tractor,
} from "lucide-react";

import { CtaBanner } from "@/components/shared/cta-banner";
import { CommercialEnergyFlow } from "@/components/commercial/commercial-energy-flow";

export const metadata = {
  title: "How It Works — Commercial Solar | BrightGrid Energy",
  description:
    "Commercial solar, battery storage, EV charging and energy management designed around your site, energy demand and long-term objectives.",
};

/* -------------------------------------------------------------------------- */
/* IMAGE URLS                                                                 */
/* -------------------------------------------------------------------------- */

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2400&q=90",

  warehouse:
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=2400&q=90",

  solar:
    "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=2400&q=90",

  panels:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2000&q=85",

  farm:
    "https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=2400&q=90",

  final:
    "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=2400&q=90",
};

/* -------------------------------------------------------------------------- */
/* SOLUTIONS                                                                  */
/* -------------------------------------------------------------------------- */

const SOLUTIONS = [
  {
    href: "/commercial",
    icon: Sun,
    title: "Commercial Solar",
    desc: "Rooftop and ground-mounted solar engineered around usable area, energy demand and grid requirements.",
  },
  {
    href: "/battery",
    icon: BatteryCharging,
    title: "Battery Storage",
    desc: "Store surplus generation, shift energy use and reduce exposure to peak electricity periods.",
  },
  {
    href: "/ev-charging",
    icon: Car,
    title: "EV Infrastructure",
    desc: "Workplace, fleet and customer charging integrated with your wider energy strategy.",
  },
  {
    href: "/commercial/ppa",
    icon: LineChart,
    title: "Power Purchase Agreements",
    desc: "Explore long-term renewable electricity structures without treating solar as a simple equipment purchase.",
  },
  {
    href: "/commercial",
    icon: Building2,
    title: "Property Portfolios",
    desc: "Assess multiple buildings, prioritise opportunities and create a repeatable deployment programme.",
  },
  {
    href: "/farms",
    icon: Tractor,
    title: "Agriculture & Farms",
    desc: "Solar designed around refrigeration, pumps, irrigation, processing and other agricultural loads.",
  },
];

/* -------------------------------------------------------------------------- */
/* INTELLIGENCE                                                               */
/* -------------------------------------------------------------------------- */

const INTELLIGENCE = [
  {
    icon: Map,
    title: "Site intelligence",
    description:
      "Roof geometry, usable area, orientation, system placement and site constraints.",
  },
  {
    icon: LineChart,
    title: "Load analysis",
    description:
      "Understand when electricity is actually being consumed and how solar generation can match it.",
  },
  {
    icon: Gauge,
    title: "Grid strategy",
    description:
      "Consider connection requirements, export, import and future electricity demand.",
  },
  {
    icon: BatteryCharging,
    title: "Storage modelling",
    description:
      "Assess whether batteries can improve self-consumption, peak management or energy flexibility.",
  },
];

/* -------------------------------------------------------------------------- */
/* PROCESS                                                                    */
/* -------------------------------------------------------------------------- */

const PROCESS = [
  {
    number: "01",
    title: "Understand the site",
    description:
      "We start with the building, operation, electricity consumption and your commercial objectives.",
  },
  {
    number: "02",
    title: "Model the opportunity",
    description:
      "Solar generation, roof capacity, load matching, battery storage and export are assessed together.",
  },
  {
    number: "03",
    title: "Build the system",
    description:
      "The preferred configuration is developed into a technical design and commercial proposal.",
  },
  {
    number: "04",
    title: "Manage delivery",
    description:
      "Approvals, procurement, installation, commissioning and grid coordination are managed through delivery.",
  },
  {
    number: "05",
    title: "Monitor performance",
    description:
      "Generation, consumption, battery behaviour and system performance can be monitored after commissioning.",
  },
];

/* -------------------------------------------------------------------------- */
/* SECTORS                                                                    */
/* -------------------------------------------------------------------------- */

const SECTORS = [
  {
    icon: Factory,
    title: "Industrial",
    description:
      "High daytime loads, large rooftops and energy-intensive operations.",
  },
  {
    icon: Building2,
    title: "Warehouses",
    description:
      "Large roof areas with significant daytime electricity demand.",
  },
  {
    icon: School,
    title: "Schools & Trusts",
    description:
      "Single-site and multi-site programmes for education estates.",
  },
  {
    icon: Tractor,
    title: "Farms",
    description:
      "Pumps, refrigeration, irrigation, workshops and processing.",
  },
  {
    icon: Car,
    title: "Retail & Car Parks",
    description:
      "Solar carports, EV charging and on-site energy generation.",
  },
  {
    icon: Building2,
    title: "Property Portfolios",
    description:
      "Prioritised solar programmes across multiple commercial buildings.",
  },
];

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function HowItWorksPage() {
  return (
    <>
      {/* ================================================================== */}
      {/* HERO                                                               */}
      {/* ================================================================== */}

      <section className="relative isolate min-h-[760px] overflow-hidden bg-black text-white">
        <img
          src={IMAGES.hero}
          alt="Commercial solar installation"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />

        <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="relative z-10 flex min-h-[760px] items-end">
          <div className="container pb-20 pt-32 md:pb-28">
            <div className="max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/60">
                Commercial energy
              </p>

              <h1 className="mt-5 max-w-5xl text-balance font-display text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl">
                A better way to design commercial solar.
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
                We don't start with a panel count. We start with your site,
                your electricity demand and what you want your energy
                infrastructure to achieve.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/commercial#assessment"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Request a commercial assessment
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="#process"
                  className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* POSITIONING                                                        */}
      {/* ================================================================== */}

      <section className="section">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Our approach</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Commercial solar should be designed around the business.
              </h2>
            </div>

            <div className="max-w-2xl space-y-5 text-muted-foreground">
              <p>
                A commercial solar project is not simply a matter of filling a
                roof with as many panels as possible. The right system depends
                on how the building operates, when electricity is consumed,
                how much can be exported and what your future energy needs
                look like.
              </p>

              <p>
                BrightGrid brings those factors together before recommending a
                system. Solar, battery storage, EV charging and energy
                management can then be evaluated as one connected energy
                strategy.
              </p>

              <p>
                The result is a proposal built around the economics and
                operational requirements of your site — rather than a
                one-size-fits-all package.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* IMMERSIVE SITE INTELLIGENCE                                        */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative min-h-[760px]">
          <img
            src={IMAGES.warehouse}
            alt="Commercial warehouse with solar infrastructure"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent" />

          <div className="relative z-10 container flex min-h-[760px] items-center py-24">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                01 — Site intelligence
              </p>

              <h2 className="mt-5 text-balance font-display text-4xl font-medium md:text-6xl">
                We look beyond the roof.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                The strongest commercial energy decisions come from combining
                physical site information with actual electricity demand.
              </p>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {INTELLIGENCE.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-black/45"
                    >
                      <div className="flex size-10 items-center justify-center rounded-xl border border-white/10 bg-white/10">
                        <Icon className="size-5" />
                      </div>

                      <h3 className="mt-5 font-display text-lg font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-white/55">
                        {item.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* ENERGY ARCHITECTURE                                                */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-black py-10 md:py-16">
        <img
          src={IMAGES.solar}
          alt="Renewable energy infrastructure"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10">
          <CommercialEnergyFlow />
        </div>
      </section>

      {/* ================================================================== */}
      {/* SOLUTIONS                                                           */}
      {/* ================================================================== */}

      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow">Commercial energy solutions</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                More than solar panels.
              </h2>
            </div>

            <p className="max-w-2xl text-muted-foreground">
              Build the energy system your site needs today while leaving room
              for tomorrow's electricity demand.
            </p>
          </div>

          {/* Large editorial image */}

          <div className="group relative mt-12 h-[460px] overflow-hidden rounded-[2rem]">
            <img
              src={IMAGES.panels}
              alt="Commercial solar panels"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-2xl p-8 text-white md:p-12">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Connected infrastructure
              </p>

              <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                Solar, storage, charging and energy management working
                together.
              </h3>
            </div>
          </div>

          {/* Solution cards */}

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon;

              return (
                <Link
                  key={solution.href + solution.title}
                  href={solution.href}
                  className="group"
                >
                  <div className="h-full rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                    <div className="flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                        <Icon className="size-5" />
                      </div>

                      <ArrowUpRight className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>

                    <h3 className="mt-6 font-display text-xl font-medium">
                      {solution.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {solution.desc}
                    </p>

                    <div className="mt-6 flex items-center text-sm font-medium">
                      Explore
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PROCESS                                                             */}
      {/* ================================================================== */}

      <section
        id="process"
        className="relative overflow-hidden bg-black text-white"
      >
        <div className="container py-24 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">
                From assessment to operation
              </p>

              <h2 className="mt-4 text-balance font-display text-3xl font-medium md:text-5xl">
                A structured process from first conversation to live system.
              </h2>

              <p className="mt-6 max-w-md leading-7 text-white/55">
                We coordinate the technical, commercial and delivery stages so
                you don't have to manage a collection of separate suppliers.
              </p>

              <Link
                href="/commercial#assessment"
                className="mt-8 inline-flex items-center text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Start a commercial assessment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>

            <div>
              {PROCESS.map((step, index) => (
                <div
                  key={step.number}
                  className="group grid grid-cols-[64px_1fr] gap-5 border-t border-white/10 py-9 last:border-b"
                >
                  <span className="font-mono text-xs text-white/30">
                    {step.number}
                  </span>

                  <div>
                    <div className="flex items-start justify-between gap-6">
                      <h3 className="font-display text-2xl font-medium">
                        {step.title}
                      </h3>

                      <span className="hidden text-white/20 transition-colors group-hover:text-white/60 sm:block">
                        <ArrowRight className="size-5" />
                      </span>
                    </div>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* SECTORS                                                             */}
      {/* ================================================================== */}

      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">Where we work</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Energy strategies for the way different businesses operate.
            </h2>

            <p className="mt-5 text-muted-foreground">
              Different buildings have different loads, operating patterns and
              energy priorities. The system should reflect that.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => {
              const Icon = sector.icon;

              return (
                <div
                  key={sector.title}
                  className="group rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 font-display text-xl font-medium">
                    {sector.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {sector.description}
                  </p>

                  <Link
                    href="/commercial"
                    className="mt-5 inline-flex items-center text-sm font-medium"
                  >
                    Explore
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FARM / AGRICULTURE IMMERSIVE SECTION                               */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative min-h-[700px]">
          <img
            src={IMAGES.farm}
            alt="Solar energy infrastructure across agricultural land"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />

          <div className="relative z-10 container flex min-h-[700px] items-center py-24">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Agriculture & farms
              </p>

              <h2 className="mt-5 text-balance font-display text-4xl font-medium md:text-6xl">
                Energy that works around the operation.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">
                From irrigation and refrigeration to workshops, processing and
                storage, agricultural energy systems need to work around the
                realities of the farm.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/commercial"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Explore farm solar
                  <ArrowRight className="ml-2 size-4" />
                </Link>

                <Link
                  href="/commercial#assessment"
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/10"
                >
                  Assess your site
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* TRANSPARENCY                                                        */}
      {/* ================================================================== */}

      <section className="section bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-background p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <ShieldCheck className="size-6" />
              </div>

              <div>
                <p className="eyebrow">Transparent by design</p>

                <h2 className="mt-3 font-display text-2xl font-medium md:text-3xl">
                  Every recommendation should be explainable.
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  We show the assumptions behind the recommendation rather
                  than presenting a black-box number. Site characteristics,
                  consumption, system size, generation, storage and commercial
                  priorities all contribute to the final design.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl bg-secondary/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Site
                    </p>
                    <p className="mt-2 font-medium">
                      Geometry & constraints
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Energy
                    </p>
                    <p className="mt-2 font-medium">
                      Demand & generation
                    </p>
                  </div>

                  <div className="rounded-xl bg-secondary/60 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Economics
                    </p>
                    <p className="mt-2 font-medium">
                      Commercial priorities
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* FINAL IMMERSIVE CTA                                                 */}
      {/* ================================================================== */}

      <section className="relative overflow-hidden bg-black text-white">
        <div className="relative min-h-[680px]">
          <img
            src={IMAGES.final}
            alt="Renewable energy landscape"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />

          <div className="relative z-10 container flex min-h-[680px] items-end pb-20 md:pb-28">
            <div className="max-w-4xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/50">
                Your site. Your energy. Your strategy.
              </p>

              <h2 className="mt-5 text-balance font-display text-4xl font-medium md:text-6xl lg:text-7xl">
                Let's model what your site could achieve.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
                Tell us about your building, electricity demand and objectives.
                We'll work from there.
              </p>

              <Link
                href="/commercial#assessment"
                className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Request a commercial assessment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================== */}
      {/* CTA                                                                 */}
      {/* ================================================================== */}

      <CtaBanner
        title="Let's model your site."
        description="Tell us about your building, electricity demand and objectives. We'll work from there."
        href="/commercial#assessment"
        cta="Request a commercial assessment"
      />
    </>
  );
}