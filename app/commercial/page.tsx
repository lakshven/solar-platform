import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  Map,
  PanelsTopLeft,
  School,
  ShieldCheck,
  Sparkles,
  Sun,
  Tractor,
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
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Commercial Solar — BrightGrid Energy",
  description:
    "Commercial solar, battery storage and EV charging designed around your building, energy profile and operational needs.",
};

/*
|--------------------------------------------------------------------------
| Immersive imagery
|--------------------------------------------------------------------------
| Direct Unsplash Source URLs.
| These can be used directly inside next/image.
|
| If your next.config.ts blocks remote images, add:
|
| images: {
|   remotePatterns: [
|     {
|       protocol: "https",
|       hostname: "images.unsplash.com",
|     },
|   ],
| }
|--------------------------------------------------------------------------
*/

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=2400&q=85",

  solarRoof:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=2200&q=85",

  industrial:
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=2200&q=85",

  warehouse:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=2200&q=85",

  school:
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=2200&q=85",

  farm:
    "https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=2200&q=85",

  carport:
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=2200&q=85",

  ev:
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=2200&q=85",

  battery:
    "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=2200&q=85",

  office:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2200&q=85",

  aerial:
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=2200&q=85",
};

const PROCESS = [
  "Assessment",
  "Design",
  "Approvals",
  "Procurement",
  "Installation",
  "Commissioning",
  "Monitoring",
  "Maintenance",
];

const SECTORS = [
  {
    title: "Warehouses",
    description:
      "Large roof areas, daytime operations and significant electricity demand.",
    size: "Typical 500 kW–2 MW",
    icon: Building2,
    image: IMAGES.warehouse,
  },
  {
    title: "Schools",
    description:
      "Portfolio-scale solar designed around teaching hours, estates and long-term energy planning.",
    size: "Multi-site deployment",
    icon: School,
    image: IMAGES.school,
  },
  {
    title: "Farms",
    description:
      "Solar for pumps, refrigeration, irrigation, workshops and agricultural processing.",
    size: "Load-led design",
    icon: Tractor,
    image: IMAGES.farm,
  },
  {
    title: "Retail",
    description:
      "Rooftop and carport solar combined with EV charging and battery storage.",
    size: "Solar + EV + battery",
    icon: Car,
    image: IMAGES.carport,
  },
  {
    title: "Hotels",
    description:
      "Designed around HVAC, kitchens, laundry and other continuous operational loads.",
    size: "High daytime demand",
    icon: Building2,
    image: IMAGES.office,
  },
  {
    title: "Industrial",
    description:
      "Energy-intensive operations where generation and load matching can create significant value.",
    size: "Load-profile driven",
    icon: Factory,
    image: IMAGES.industrial,
  },
];

const MODEL_DEPLOYMENTS = [
  {
    eyebrow: "MODEL DEPLOYMENT",
    title: "Industrial rooftop",
    description:
      "A large commercial rooftop designed around roof geometry, operational demand and grid constraints.",
    metrics: ["1–3 MW", "Daytime load", "Roof-led design"],
    icon: Factory,
    image: IMAGES.industrial,
    href: "#industrial-model",
  },
  {
    eyebrow: "MODEL DEPLOYMENT",
    title: "School portfolio",
    description:
      "A multi-site deployment model combining consistent design standards with site-by-site assessment.",
    metrics: ["20–50 sites", "Portfolio model", "Central reporting"],
    icon: School,
    image: IMAGES.school,
    href: "#school-model",
  },
  {
    eyebrow: "MODEL DEPLOYMENT",
    title: "Solar carport + EV",
    description:
      "Parking infrastructure transformed into productive energy infrastructure with solar and charging.",
    metrics: ["Carport solar", "EV charging", "Optional battery"],
    icon: Car,
    image: IMAGES.carport,
    href: "#carport-model",
  },
];

const ENERGY_SYSTEMS = [
  {
    title: "Solar generation",
    description:
      "Generate electricity on-site and prioritise it against the building's actual consumption.",
    icon: Sun,
  },
  {
    title: "Battery storage",
    description:
      "Store excess generation and use energy strategically when demand or tariffs make it valuable.",
    icon: BatteryCharging,
  },
  {
    title: "EV charging",
    description:
      "Integrate workplace, fleet or customer charging into the wider energy strategy.",
    icon: Zap,
  },
  {
    title: "Energy management",
    description:
      "Monitor generation, consumption, battery behaviour and site performance from one system.",
    icon: Gauge,
  },
];

const PPA_FEATURES = [
  "No need to fund the entire solar installation upfront",
  "Long-term energy pricing structure",
  "Generation matched against customer demand",
  "Optional battery and EV integration",
  "Performance monitoring throughout the agreement",
];

export default function CommercialPage() {
  return (
    <>
      {/* ================================================================
          HERO
      ================================================================ */}

      <section className="relative min-h-[760px] overflow-hidden bg-black text-white">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero})` }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-end px-6 pb-20 pt-32 md:px-10 lg:px-12">
          <div className="max-w-4xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-10 bg-white/60" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                Commercial & industrial energy
              </p>
            </div>

            <h1 className="max-w-4xl text-balance font-display text-5xl font-medium leading-[0.98] tracking-tight md:text-7xl lg:text-8xl">
              Energy infrastructure built around your business.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              Solar, battery storage, EV charging and energy management —
              engineered around what your site actually uses, how it operates
              and where energy creates the most value.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="default" variant="accent">
                <Link href="/commercial#assessment">
                  Request a commercial assessment
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Link
                href="#systems"
                className="inline-flex items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium backdrop-blur transition hover:bg-white/15"
              >
                Explore the energy system
                <ArrowDownIcon />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 hidden max-w-xs rounded-2xl border border-white/15 bg-black/30 p-5 backdrop-blur-md lg:block">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/45">
            BrightGrid approach
          </p>

          <p className="mt-2 text-sm leading-6 text-white/75">
            We design around the operation first — then work backwards to the
            technology.
          </p>
        </div>
      </section>

      {/* ================================================================
          PROCESS STRIP
      ================================================================ */}

      <section className="border-b bg-background">
        <div className="container py-10">
          <div className="grid gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {PROCESS.map((step, i) => (
              <div key={step} className="border-t-2 border-primary pt-3">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <p className="mt-1 text-sm font-medium">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          INTRO / IMMERSIVE IMAGE
      ================================================================ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Site intelligence</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-4xl font-medium md:text-6xl">
                We don't size a system from the roof alone.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                A commercial energy system needs to understand the building,
                the roof, electricity demand, operating hours, grid constraints
                and future energy requirements.
              </p>

              <Button asChild variant="accent" className="mt-8">
                <Link href="/commercial#assessment">
                  Explore your site
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem]">
              <img
                src={IMAGES.solarRoof}
                alt="Commercial solar installation"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div className="absolute bottom-7 left-7 right-7 text-white">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                  Site + energy + grid
                </p>

                <p className="mt-2 max-w-md font-display text-2xl font-medium">
                  The physical site is only one part of the calculation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          INTELLIGENCE CARDS
      ================================================================ */}

      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Map,
                title: "Site & roof",
                text: "Roof geometry, orientation, usable area and system layout.",
              },
              {
                icon: LineChart,
                title: "Energy profile",
                text: "Consumption patterns, operating hours and load matching.",
              },
              {
                icon: Gauge,
                title: "Grid & export",
                text: "Connection considerations, export strategy and constraints.",
              },
              {
                icon: Sparkles,
                title: "Future demand",
                text: "Battery storage, EV charging and changing energy requirements.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="border-0 bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <CardContent className="p-7">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-7 font-display text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          LARGE STATEMENT IMAGE
      ================================================================ */}

      <section className="relative min-h-[620px] overflow-hidden bg-black text-white">
        <img
          src={IMAGES.aerial}
          alt="Renewable energy infrastructure"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 py-24 md:px-10">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Beyond panels
            </p>

            <h2 className="mt-5 text-balance font-display text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
              Turn your building into an energy asset.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/65">
              Generate electricity, store it, charge vehicles and understand
              how energy moves through your business.
            </p>

            <div className="mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
              {[
                "Generate",
                "Store",
                "Optimise",
              ].map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
                >
                  <span className="font-mono text-xs text-white/40">
                    0{index + 1}
                  </span>

                  <p className="mt-3 font-display text-xl font-medium">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          MODEL DEPLOYMENTS
      ================================================================ */}

      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Model deployments</p>

            <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
              Different buildings need different energy architecture.
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              These are illustrative deployment models designed to show how
              BrightGrid approaches different commercial environments.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {MODEL_DEPLOYMENTS.map((project) => {
              const Icon = project.icon;

              return (
                <Link
                  key={project.title}
                  href={project.href}
                  className="group relative min-h-[560px] overflow-hidden rounded-[2rem] bg-black text-white"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/5" />

                  <div className="relative z-10 flex min-h-[560px] flex-col justify-end p-7">
                    <div className="mb-auto">
                      <span className="inline-flex rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] backdrop-blur">
                        ILLUSTRATIVE
                      </span>
                    </div>

                    <div>
                      <div className="flex size-12 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
                        <Icon className="size-5" />
                      </div>

                      <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/45">
                        {project.eyebrow}
                      </p>

                      <h3 className="mt-2 font-display text-3xl font-medium">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {project.description}
                      </p>

                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.metrics.map((metric) => (
                          <span
                            key={metric}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-xs backdrop-blur"
                          >
                            {metric}
                          </span>
                        ))}
                      </div>

                      <div className="mt-7 flex items-center text-sm font-medium">
                        View model
                        <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          ENERGY SYSTEM
      ================================================================ */}

      <section id="systems" className="section bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Integrated energy systems</p>

            <h2 className="mx-auto mt-3 max-w-4xl text-balance font-display text-4xl font-medium md:text-6xl">
              One energy strategy. Multiple technologies.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              Solar doesn't have to operate as a standalone installation.
              Combine generation, storage, charging and monitoring around the
              way your business actually consumes energy.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {ENERGY_SYSTEMS.map((system, index) => {
              const Icon = system.icon;

              return (
                <div
                  key={system.title}
                  className="rounded-2xl border border-border bg-background p-7 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>

                  <div className="mt-7 flex size-12 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {system.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {system.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          BATTERY / EV IMAGE BAND
      ================================================================ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-5 lg:grid-cols-2">
            <ImmersivePanel
              image={IMAGES.battery}
              eyebrow="Battery storage"
              title="Store the energy your site generates."
              description="Capture surplus renewable generation and use it when the building needs it."
              href="/battery"
            />

            <ImmersivePanel
              image={IMAGES.ev}
              eyebrow="EV infrastructure"
              title="Make parking part of the energy strategy."
              description="Combine solar carports, workplace charging, fleet infrastructure and optional storage."
              href="/ev-charging"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          PPA
      ================================================================ */}

      <section className="relative overflow-hidden bg-black text-white">
        <img
          src={IMAGES.solarRoof}
          alt="Commercial solar installation"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />

        <div className="relative z-10">
          <div className="container py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.8fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
                  Power Purchase Agreement
                </p>

                <h2 className="mt-4 max-w-3xl text-balance font-display text-4xl font-medium md:text-6xl">
                  Solar without treating the project like a traditional
                  equipment purchase.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
                  A PPA can provide a long-term structure for on-site renewable
                  generation, allowing a business to access solar electricity
                  without necessarily funding the entire installation upfront.
                </p>

                <Button
                  asChild
                  variant="outline"
                  className="mt-8 border-white/20 bg-white text-black hover:bg-white/90"
                >
                  <Link href="/commercial/ppa">
                    Explore PPAs
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                  Illustrative structure
                </p>

                <h3 className="mt-3 font-display text-2xl font-medium">
                  A different way to fund renewable infrastructure.
                </h3>

                <div className="mt-8 space-y-4">
                  {PPA_FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 border-b border-white/10 pb-4 last:border-0 last:pb-0"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />

                      <span className="text-sm leading-6 text-white/70">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CASE MODEL DETAILS
      ================================================================ */}

      <section className="section">
        <div className="container">
          <div className="grid gap-6 lg:grid-cols-3">
            <ModelDetail
              id="industrial-model"
              icon={Factory}
              title="Industrial rooftop model"
              description="A typical large commercial roof with substantial daytime electricity demand."
              focus="Solar generation + load matching + export strategy."
            />

            <ModelDetail
              id="school-model"
              icon={School}
              title="School portfolio model"
              description="A multi-site approach for trusts and education estates."
              focus="Portfolio prioritisation + repeatable deployment."
            />

            <ModelDetail
              id="carport-model"
              icon={Car}
              title="Solar carport model"
              description="Modular parking infrastructure combining solar and EV charging."
              focus="Solar + EV charging + optional battery storage."
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTORS
      ================================================================ */}

      <section className="section bg-black text-white">
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Sectors we serve
            </p>

            <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
              Different buildings. Different energy strategies.
            </h2>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((sector) => {
              const Icon = sector.icon;

              return (
                <Link
                  key={sector.title}
                  href="/commercial#assessment"
                  className="group relative min-h-[360px] overflow-hidden rounded-3xl"
                >
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="relative z-10 flex min-h-[360px] flex-col justify-end p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-5 font-display text-2xl font-medium">
                      {sector.title}
                    </h3>

                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/60">
                      {sector.description}
                    </p>

                    <div className="mt-5 flex items-center justify-between">
                      <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] backdrop-blur">
                        {sector.size}
                      </span>

                      <ArrowUpRight className="size-5 text-white/60 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          FARMS
      ================================================================ */}

      <section id="farms" className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[620px]">
            <img
              src={IMAGES.farm}
              alt="Agricultural farm"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-black/25" />

            <div className="absolute bottom-8 left-8 rounded-2xl border border-white/20 bg-black/30 p-5 text-white backdrop-blur-md">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Agriculture
              </p>

              <p className="mt-2 font-display text-xl font-medium">
                Energy designed around the farm.
              </p>
            </div>
          </div>

          <div className="flex items-center bg-secondary/50 px-6 py-20 md:px-12 lg:px-20">
            <div className="max-w-xl">
              <p className="eyebrow">Solar for farms</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                Generate renewable energy for your farm — and use it where it
                creates the most value.
              </h2>

              <p className="mt-6 text-lg leading-8 text-muted-foreground">
                Agricultural electricity use varies enormously by operation.
                We look at the actual energy profile rather than relying on a
                generic commercial assumption.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Refrigeration",
                  "Pumps",
                  "Irrigation",
                  "Milking",
                  "Workshops",
                  "Grain drying",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <Button asChild variant="accent" className="mt-9">
                <Link href="/farms">
                  Explore farm solar
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          LANDLORDS
      ================================================================ */}

      <section id="landlords" className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Landlords & property managers</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                One strategy across an entire property portfolio.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
                Identify which properties should be prioritised, compare
                opportunities and create a consistent deployment programme.
              </p>

              <Button asChild variant="accent" className="mt-8">
                <Link href="/commercial#assessment">
                  Get a portfolio assessment
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                "Single rental property",
                "Multiple properties",
                "Portfolio installations",
                "Volume pricing",
                "Battery retrofits",
                "Portfolio reporting",
              ].map((item) => (
                <Card key={item}>
                  <CardContent className="flex items-center gap-3 p-5 text-sm font-medium">
                    <CheckCircle2 className="size-4 shrink-0" />
                    {item}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TRANSPARENCY
      ================================================================ */}

      <section className="section bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-background p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <ShieldCheck className="size-6" />
              </div>

              <div className="max-w-2xl">
                <p className="eyebrow">Transparent by design</p>

                <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                  Clear about what is illustrative.
                </h2>

                <p className="mt-5 text-sm leading-7 text-muted-foreground">
                  Project examples on this page are model deployments designed
                  to demonstrate how we approach different commercial
                  environments. They are not presented as completed customer
                  projects unless explicitly identified as such.
                </p>
              </div>

              <div className="md:ml-auto md:max-w-xs">
                <p className="text-sm font-medium">Why this matters</p>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Your proposal should be based on your actual site, energy
                  profile, technical requirements and commercial objectives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          ASSESSMENT
      ================================================================ */}

      <section id="assessment" className="section">
        <div className="container">
          <Card className="mx-auto max-w-4xl overflow-hidden">
            <CardHeader className="p-8 md:p-12">
              <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-secondary">
                <PanelsTopLeft className="size-5" />
              </div>

              <CardTitle className="font-display text-3xl md:text-5xl">
                Request a commercial assessment
              </CardTitle>

              <CardDescription className="max-w-2xl text-base leading-7">
                Tell us about your site and we'll come back with the most
                appropriate next steps — whether that's solar, battery, EV
                charging, a PPA structure or a combination.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-10 md:px-12">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Site details",
                  "Energy consumption",
                  "Your priorities",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-xl border bg-secondary/40 p-5"
                  >
                    <span className="font-mono text-xs text-muted-foreground">
                      0{index + 1}
                    </span>

                    <p className="mt-2 text-sm font-medium">{item}</p>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant="accent"
                size="default"
                className="mt-8 w-full sm:w-auto"
              >
                <Link href="/commercial/assessment">
                  Start your assessment
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Ready to talk about your site?"
        description="We'll scope the assessment around your business, not a template proposal."
        href="/commercial/assessment"
        cta="Request assessment"
      />
    </>
  );
}

/* =========================================================================
   SUPPORTING COMPONENTS
========================================================================= */

function ImmersivePanel({
  image,
  eyebrow,
  title,
  description,
  href,
}: {
  image: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative min-h-[520px] overflow-hidden rounded-[2rem] bg-black text-white"
    >
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />

      <div className="relative z-10 flex min-h-[520px] flex-col justify-end p-8">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          {eyebrow}
        </p>

        <h3 className="mt-3 max-w-lg font-display text-3xl font-medium md:text-4xl">
          {title}
        </h3>

        <p className="mt-3 max-w-lg text-sm leading-6 text-white/65">
          {description}
        </p>

        <div className="mt-7 flex items-center text-sm font-medium">
          Explore
          <ArrowUpRight className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  );
}

function ModelDetail({
  id,
  icon: Icon,
  title,
  description,
  focus,
}: {
  id: string;
  icon: typeof Factory;
  title: string;
  description: string;
  focus: string;
}) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader className="p-7">
        <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-secondary">
          <Icon className="size-5" />
        </div>

        <CardTitle className="text-xl">{title}</CardTitle>

        <CardDescription className="leading-6">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-7 pb-7">
        <div className="rounded-xl bg-secondary p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
            Model focus
          </p>

          <p className="mt-2 text-sm font-medium">{focus}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function ArrowDownIcon() {
  return (
    <svg
      className="ml-2 size-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}