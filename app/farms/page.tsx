import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  CheckCircle2,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  Map,
  PiggyBank,
  ShieldCheck,
  Sun,
  Tractor,
  Warehouse,
  Zap,
} from "lucide-react";
import Image from "next/image";

import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata = {
  title: "Solar for Farms & Agriculture | BrightGrid Energy",
  description:
    "Commercial solar, battery storage and energy systems designed for farms, agricultural buildings, irrigation, refrigeration, processing and rural businesses.",
};

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2200&q=85",

  solarFarm:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85",

  farmBuilding:
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=1800&q=85",

  agriculture:
    "https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?auto=format&fit=crop&w=1800&q=85",

  battery:
    "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1800&q=85",

  carport:
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1800&q=85",
};

const USE_CASES = [
  {
    icon: Warehouse,
    title: "Farm buildings",
    description:
      "Make productive use of large agricultural roofs, barns, workshops, stores and other suitable buildings.",
  },
  {
    icon: Zap,
    title: "High daytime demand",
    description:
      "Generate electricity when your farm is operating pumps, refrigeration, machinery, processing or other equipment.",
  },
  {
    icon: Gauge,
    title: "Irrigation & pumping",
    description:
      "Solar can help offset electricity used by irrigation systems, borehole pumps and water management equipment.",
  },
  {
    icon: Factory,
    title: "Processing",
    description:
      "Support energy-intensive agricultural processing, cooling, drying, packing and preparation.",
  },
  {
    icon: BatteryCharging,
    title: "Battery storage",
    description:
      "Store excess generation and use it later when the farm needs electricity.",
  },
  {
    icon: Tractor,
    title: "Electric farming",
    description:
      "Create an energy foundation for electric vehicles, machinery, charging and future farm technologies.",
  },
];

const BENEFITS = [
  "Reduce reliance on grid electricity",
  "Generate electricity on your own land or buildings",
  "Use more of your solar generation on-site",
  "Store surplus generation with battery storage",
  "Support irrigation, refrigeration and processing",
  "Prepare for future electric equipment and vehicles",
];

const FARM_ENERGY = [
  {
    number: "01",
    title: "Generate",
    description:
      "Solar panels generate electricity directly from your farm buildings or suitable land.",
  },
  {
    number: "02",
    title: "Use",
    description:
      "Electricity can power farm operations such as pumps, refrigeration, workshops and processing.",
  },
  {
    number: "03",
    title: "Store",
    description:
      "Excess generation can be directed into battery storage instead of being immediately exported.",
  },
  {
    number: "04",
    title: "Export",
    description:
      "Where appropriate, surplus electricity can be exported to the grid subject to connection and commercial arrangements.",
  },
];

const FARM_TYPES = [
  {
    icon: Tractor,
    title: "Arable farms",
    description:
      "Energy strategies for grain storage, drying, workshops, irrigation and agricultural machinery.",
  },
  {
    icon: Leaf,
    title: "Livestock farms",
    description:
      "Support milking, refrigeration, ventilation, water pumping and other continuous farm loads.",
  },
  {
    icon: Warehouse,
    title: "Agricultural buildings",
    description:
      "Large barns, sheds, workshops and storage buildings can provide valuable solar capacity.",
  },
  {
    icon: Factory,
    title: "Food & processing",
    description:
      "Reduce electricity costs associated with processing, refrigeration, packing and preparation.",
  },
];

export default function FarmsPage() {
  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-[720px] overflow-hidden bg-black text-white">
        <Image
          src={IMAGES.hero}
          alt="Agricultural farmland"
          fill
          priority
          className="object-cover opacity-60"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

        <div className="container relative z-10 flex min-h-[720px] items-end pb-20 pt-32">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md">
              <Tractor className="size-4" />
              Agriculture & rural energy
            </div>

            <h1 className="max-w-4xl text-balance font-display text-5xl font-medium tracking-tight md:text-7xl lg:text-8xl">
              Power your farm from the land you already have.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
              Commercial solar, battery storage and intelligent energy
              infrastructure designed around the way your farm actually
              operates.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/commercial#assessment"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Assess my farm
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-medium backdrop-blur-md transition hover:bg-white/15"
              >
                Explore the system
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">Energy for agriculture</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                Your farm is already an energy business.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-muted-foreground">
              <p>
                Farms can have some of the most interesting commercial energy
                profiles. Refrigeration, pumps, irrigation, workshops,
                processing and storage can create substantial electricity
                demand.
              </p>

              <p>
                At the same time, agricultural buildings often have large
                roofs and significant areas of land. That creates an
                opportunity to generate electricity where it is actually
                needed.
              </p>

              <p>
                BrightGrid designs the system around your operation rather than
                simply trying to maximise the number of solar panels.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE IMAGE */}
      <section className="relative mx-4 overflow-hidden rounded-[2rem] md:mx-8">
        <div className="relative min-h-[580px]">
          <Image
            src={IMAGES.solarFarm}
            alt="Solar panels in an agricultural setting"
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-end">
            <div className="max-w-3xl p-8 text-white md:p-14">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/60">
                Solar + agriculture
              </p>

              <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
                Turn suitable roofs and land into productive energy assets.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
                From farm buildings to carefully selected ground-mounted
                systems, we look at the physical site and your electricity
                demand together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="section">
        <div className="container">
          <div className="max-w-3xl">
            <p className="eyebrow">Built around the farm</p>

            <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
              Solar where your operation needs energy.
            </h2>

            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              The best agricultural system isn't necessarily the biggest
              system. It is the system that works with the way your farm
              consumes electricity.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-3xl border border-border bg-background p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-7 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLAR + BATTERY */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
            <div className="relative min-h-[520px] overflow-hidden rounded-[2rem]">
              <Image
                src={IMAGES.farmBuilding}
                alt="Agricultural building and farmland"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

              <div className="absolute bottom-0 p-8 text-white md:p-10">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  On-site generation
                </p>

                <h3 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                  Generate electricity where your farm operates.
                </h3>
              </div>
            </div>

            <div className="flex flex-col justify-center rounded-[2rem] border border-border bg-background p-8 md:p-12">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary">
                <Sun className="size-6" />
              </div>

              <p className="eyebrow mt-7">Solar generation</p>

              <h2 className="mt-3 font-display text-4xl font-medium md:text-5xl">
                Use the electricity you generate.
              </h2>

              <p className="mt-5 leading-7 text-muted-foreground">
                Solar generation can be matched against your farm's electricity
                consumption. The more of your generation you can use on-site,
                the less electricity you may need to purchase from the grid.
              </p>

              <ul className="mt-8 space-y-4">
                {BENEFITS.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* BATTERY */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow">Solar + battery</p>

              <h2 className="mt-3 text-balance font-display text-4xl font-medium md:text-6xl">
                Don't let useful solar generation go to waste.
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Farms don't always consume electricity at exactly the same
                time that solar produces it. Battery storage can provide a
                bridge between generation and demand.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border p-6">
                  <BatteryCharging className="size-6" />

                  <h3 className="mt-5 font-display text-xl font-medium">
                    Store surplus
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Capture suitable excess generation for later use.
                  </p>
                </div>

                <div className="rounded-2xl border border-border p-6">
                  <LineChart className="size-6" />

                  <h3 className="mt-5 font-display text-xl font-medium">
                    Shift consumption
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Use stored energy when your farm needs it.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[500px] overflow-hidden rounded-[2rem]">
              <Image
                src={IMAGES.battery}
                alt="Energy storage equipment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <BatteryCharging className="size-7" />

                <p className="mt-4 text-sm leading-6 text-white/70">
                  Battery storage can become part of a wider farm energy
                  strategy alongside solar, EV charging and future electric
                  equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENERGY FLOW */}
      <section
        id="how-it-works"
        className="section bg-black text-white"
      >
        <div className="container">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
              How the system works
            </p>

            <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
              One energy system. Multiple ways to use it.
            </h2>

            <p className="mt-5 text-lg leading-8 text-white/60">
              Your farm doesn't have to choose between using solar electricity
              and exporting it. The right architecture can balance generation,
              consumption, storage and export.
            </p>
          </div>

          <div className="mt-14 grid gap-0 md:grid-cols-4">
            {FARM_ENERGY.map((item, index) => (
              <div
                key={item.number}
                className="relative border-t border-white/10 p-7 md:border-l md:border-t-0 md:first:border-l-0"
              >
                <span className="font-mono text-xs text-white/30">
                  {item.number}
                </span>

                <h3 className="mt-8 font-display text-2xl font-medium">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  {item.description}
                </p>

                {index < FARM_ENERGY.length - 1 && (
                  <ArrowRight className="absolute right-5 top-8 hidden size-5 text-white/20 md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FARM TYPES */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Agricultural applications</p>

            <h2 className="mx-auto mt-3 max-w-4xl text-balance font-display text-4xl font-medium md:text-6xl">
              Designed for different types of agricultural operations.
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {FARM_TYPES.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group flex gap-6 rounded-3xl border border-border p-7 transition hover:-translate-y-1 hover:shadow-xl md:p-9"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-3 leading-7 text-muted-foreground">
                      {item.description}
                    </p>

                    <Link
                      href="/commercial#assessment"
                      className="mt-5 inline-flex items-center text-sm font-medium"
                    >
                      Explore your site
                      <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FUTURE FARM */}
      <section className="relative mx-4 overflow-hidden rounded-[2rem] md:mx-8">
        <div className="relative min-h-[620px]">
          <Image
            src={IMAGES.agriculture}
            alt="Modern agricultural landscape"
            fill
            className="object-cover"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="relative z-10 flex min-h-[620px] items-center">
            <div className="container">
              <div className="max-w-3xl text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Build for what comes next
                </p>

                <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
                  Your energy system should grow with your farm.
                </h2>

                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
                  Solar can be the starting point. Battery storage, EV
                  charging, electric machinery and additional generation can
                  become part of a longer-term energy strategy.
                </p>

                <Link
                  href="/commercial#assessment"
                  className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black"
                >
                  Plan your farm's energy future
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-4xl rounded-[2rem] border border-border bg-secondary/50 p-8 md:p-12">
            <div className="flex flex-col gap-7 md:flex-row">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-background">
                <ShieldCheck className="size-6" />
              </div>

              <div>
                <p className="eyebrow">Designed around your operation</p>

                <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                  We don't assume every farm needs the same system.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  Your electricity profile, buildings, roof areas, land,
                  operational requirements, grid connection and future plans
                  all influence the right solution. We assess those factors
                  before recommending a system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CtaBanner
        title="Let's model your farm."
        description="Tell us about your buildings, electricity use and agricultural operation. We'll assess where solar, storage and energy infrastructure could fit."
        href="/commercial#assessment"
        cta="Request a farm assessment"
      />
    </main>
  );
}