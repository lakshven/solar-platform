import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  Factory,
  Gauge,
  Leaf,
  LineChart,
  MapPin,
  PlugZap,
  School,
  ShieldCheck,
  Sun,
  Tractor,
  Truck,
  Zap,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";

export const metadata = {
  title: "Commercial EV Charging & Solar | BrightGrid Energy",
  description:
    "Commercial EV charging, solar generation, battery storage and intelligent energy management for workplaces, fleets, retail sites and commercial properties.",
};

const IMAGES = {
  hero:
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=2200&q=85",

  charging:
    "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1800&q=85",

  solar:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85",

  fleet:
    "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1800&q=85",

  workplace:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1800&q=85",

  warehouse:
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1800&q=85",

  farm:
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1800&q=85",
};

const SOLUTIONS = [
  {
    icon: PlugZap,
    title: "Workplace charging",
    description:
      "Give employees and visitors convenient charging while integrating electricity demand with the wider energy strategy of the building.",
  },
  {
    icon: Truck,
    title: "Fleet charging",
    description:
      "Build charging infrastructure around fleet size, vehicle schedules, dwell times and operational requirements.",
  },
  {
    icon: Building2,
    title: "Commercial & retail",
    description:
      "Turn car parks into useful energy infrastructure with customer charging, solar canopies and intelligent load management.",
  },
  {
    icon: Sun,
    title: "Solar-powered charging",
    description:
      "Generate electricity on site and use your solar generation to support EV charging and reduce imported electricity.",
  },
  {
    icon: BatteryCharging,
    title: "Battery-supported charging",
    description:
      "Use battery storage to manage demand, store surplus generation and help reduce the impact of high-power charging.",
  },
  {
    icon: Gauge,
    title: "Smart energy management",
    description:
      "Coordinate solar, batteries, chargers, building demand and grid electricity as one connected system.",
  },
];

const SECTORS = [
  {
    icon: Building2,
    title: "Workplaces",
    description:
      "Employee and visitor charging designed around working hours and building electricity demand.",
  },
  {
    icon: Truck,
    title: "Fleet & logistics",
    description:
      "Charging infrastructure designed around vehicle movements, operating windows and fleet electrification.",
  },
  {
    icon: Factory,
    title: "Industrial",
    description:
      "Combine large electrical loads with solar generation, storage and EV infrastructure.",
  },
  {
    icon: School,
    title: "Schools & trusts",
    description:
      "EV charging integrated into wider estate decarbonisation and energy programmes.",
  },
  {
    icon: Tractor,
    title: "Farms",
    description:
      "Solar, storage and EV infrastructure designed around agricultural operations and future electrification.",
  },
  {
    icon: Car,
    title: "Retail & car parks",
    description:
      "Create charging destinations while making better use of available parking and roof space.",
  },
];

const BENEFITS = [
  "Reduce reliance on grid electricity for vehicle charging",
  "Use on-site solar generation to support EV demand",
  "Store surplus solar generation for later use",
  "Manage charging around site electricity demand",
  "Prepare infrastructure for growing electric fleets",
  "Create a scalable charging strategy for future expansion",
];

const PROCESS = [
  {
    number: "01",
    title: "Understand your vehicles",
    description:
      "We look at vehicle numbers, charging requirements, routes, dwell times and when your vehicles are actually on site.",
  },
  {
    number: "02",
    title: "Understand the site",
    description:
      "We assess available parking, electrical capacity, solar potential, building demand and potential charging locations.",
  },
  {
    number: "03",
    title: "Model the energy system",
    description:
      "Solar, EV charging, batteries, import and export are considered together rather than designing each system independently.",
  },
  {
    number: "04",
    title: "Design the infrastructure",
    description:
      "We develop the preferred charging configuration, electrical design and wider energy architecture.",
  },
  {
    number: "05",
    title: "Install & commission",
    description:
      "The installation, commissioning and integration of the charging and energy infrastructure are coordinated through delivery.",
  },
];

export default function CommercialEVPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[760px] overflow-hidden bg-black text-white">
        <Image
          src={IMAGES.hero}
          alt="Electric vehicle charging infrastructure"
          fill
          priority
          className="object-cover opacity-55"
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />

        <div className="container relative z-10 flex min-h-[760px] items-center">
          <div className="max-w-4xl py-28">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
              Commercial EV infrastructure
            </p>

            <h1 className="max-w-4xl text-balance font-display text-5xl font-medium leading-[1.02] md:text-7xl lg:text-8xl">
              Charge your vehicles with energy you generate.
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
              EV charging doesn't have to sit separately from your energy
              strategy. Combine solar, battery storage and intelligent charging
              to create a commercial energy system built around your vehicles,
              buildings and future demand.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#assessment"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Plan your EV infrastructure
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
              >
                See how it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">EV + energy</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                EV charging is becoming part of the building's energy system.
              </h2>
            </div>

            <div className="max-w-2xl space-y-5 text-muted-foreground">
              <p>
                Adding EV chargers can significantly increase electricity
                demand at a commercial site. That makes the relationship
                between charging, solar generation, battery storage and the
                grid increasingly important.
              </p>

              <p>
                Instead of treating the charger as an isolated piece of
                equipment, BrightGrid can design the wider energy system
                around it.
              </p>

              <p>
                The result is an infrastructure strategy that can support
                today's vehicles while preparing the site for more electric
                transport in the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE IMAGE */}
      <section className="px-4 md:px-6">
        <div className="relative mx-auto h-[520px] max-w-[1600px] overflow-hidden rounded-[2rem]">
          <Image
            src={IMAGES.charging}
            alt="Commercial electric vehicle charging"
            fill
            className="object-cover"
            sizes="(max-width: 1600px) 100vw, 1600px"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />

          <div className="relative z-10 flex h-full items-center">
            <div className="max-w-xl px-8 text-white md:px-16">
              <p className="text-sm uppercase tracking-[0.18em] text-white/60">
                Designed around demand
              </p>

              <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
                More chargers. Smarter energy.
              </h2>

              <p className="mt-5 max-w-lg leading-7 text-white/70">
                Your charging infrastructure should work with the building,
                not compete with it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOLAR + EV */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[500px] overflow-hidden rounded-3xl">
              <Image
                src={IMAGES.solar}
                alt="Commercial solar panels"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="lg:pl-8">
              <p className="eyebrow">Solar-powered mobility</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Generate electricity on your roof. Use it in your vehicles.
              </h2>

              <p className="mt-6 leading-7 text-muted-foreground">
                Commercial buildings often have two valuable assets: large
                roof areas and vehicles sitting on the site for hours at a
                time.
              </p>

              <p className="mt-5 leading-7 text-muted-foreground">
                Solar can generate electricity during the day while vehicles
                are parked and charging. Instead of importing all of that
                electricity from the grid, your site can use its own generation
                where practical.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Solar generation",
                  "EV charging",
                  "Battery storage",
                  "Smart charging",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border p-4"
                  >
                    <CheckCircle2 className="size-5 shrink-0" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ENERGY FLOW */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">One connected system</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              Solar. Battery. EVs. Building. Grid.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              The value comes from understanding how all of these elements
              interact.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-5">
            {[
              {
                icon: Sun,
                title: "Solar",
                text: "Generate electricity on site.",
              },
              {
                icon: BatteryCharging,
                title: "Battery",
                text: "Store surplus energy.",
              },
              {
                icon: PlugZap,
                title: "Charging",
                text: "Power electric vehicles.",
              },
              {
                icon: Building2,
                title: "Building",
                text: "Serve everyday demand.",
              },
              {
                icon: Zap,
                title: "Grid",
                text: "Import or export when required.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-border bg-background p-6 text-center"
                >
                  <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.text}
                  </p>

                  {index < 4 && (
                    <ArrowRight className="absolute -right-3 top-1/2 z-10 hidden size-5 -translate-y-1/2 text-muted-foreground md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Commercial EV solutions</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Charging infrastructure for the way your business operates.
            </h2>

            <p className="mt-5 text-muted-foreground">
              From a small workplace installation to a large electric fleet,
              we can design the infrastructure around your operational
              requirements.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SOLUTIONS.map((solution) => {
              const Icon = solution.icon;

              return (
                <div
                  key={solution.title}
                  className="group rounded-3xl border border-border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="size-5" />
                    </div>

                    <ArrowUpRight className="size-5 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>

                  <h3 className="mt-7 font-display text-xl font-medium">
                    {solution.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {solution.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FLEET FEATURE */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="relative min-h-[520px] overflow-hidden rounded-3xl">
              <Image
                src={IMAGES.fleet}
                alt="Commercial fleet vehicles"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/50">
                Fleet electrification
              </p>

              <h2 className="mt-4 text-balance font-display text-4xl font-medium md:text-6xl">
                Your fleet is changing. Your energy infrastructure should be
                ready.
              </h2>

              <p className="mt-6 leading-7 text-white/60">
                Electrifying a fleet can introduce a significant new
                electricity requirement. The right infrastructure needs to
                consider vehicles, charging windows, electrical capacity,
                solar generation and storage together.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Understand fleet charging demand",
                  "Plan around vehicle schedules",
                  "Assess electrical capacity",
                  "Coordinate solar and battery storage",
                  "Create infrastructure that can expand",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-white/70" />
                    <span className="text-sm text-white/70">{item}</span>
                  </div>
                ))}
              </div>

              <Link
                href="#assessment"
                className="mt-9 inline-flex items-center text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Plan your fleet infrastructure
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Why integrate EV + solar?</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Build infrastructure that works harder.
              </h2>

              <p className="mt-5 max-w-lg text-muted-foreground">
                The objective isn't simply to install chargers. It is to
                create an energy system that supports your business today and
                gives you options as electricity demand changes.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {BENEFITS.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-4 rounded-2xl border border-border p-5"
                >
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0" />

                  <span className="text-sm leading-6">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SMART CHARGING */}
      <section className="px-4 md:px-6">
        <div className="relative mx-auto max-w-[1600px] overflow-hidden rounded-[2rem]">
          <div className="relative min-h-[620px]">
            <Image
              src={IMAGES.workplace}
              alt="Commercial workplace environment"
              fill
              className="object-cover"
              sizes="(max-width: 1600px) 100vw, 1600px"
            />

            <div className="absolute inset-0 bg-black/60" />

            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-5xl items-center justify-center px-6 py-20 text-center text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-white/50">
                  Smart charging
                </p>

                <h2 className="mt-4 font-display text-4xl font-medium md:text-6xl">
                  Charge when the energy makes sense.
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/65">
                  Charging doesn't necessarily need to happen at maximum
                  power all the time. A smarter strategy can consider site
                  demand, solar generation, battery availability and charging
                  requirements.
                </p>

                <div className="mt-9 flex flex-wrap justify-center gap-3">
                  {[
                    "Solar availability",
                    "Building demand",
                    "Battery state",
                    "Vehicle requirements",
                  ].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">Where we work</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              EV infrastructure for different commercial environments.
            </h2>
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

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {sector.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {sector.description}
                  </p>

                  <Link
                    href="#assessment"
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

      {/* FUTURE ENERGY */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Future-ready infrastructure</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Don't design today's charger for tomorrow's fleet.
              </h2>

              <p className="mt-6 leading-7 text-muted-foreground">
                Your EV requirements may grow. More employees may switch to
                electric vehicles. Your fleet may expand. New vehicles may
                require faster charging.
              </p>

              <p className="mt-5 leading-7 text-muted-foreground">
                We can help you think beyond the first installation and create
                an infrastructure strategy that leaves room for expansion.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <LineChart className="size-5" />
                  <h3 className="mt-4 font-medium">Plan demand</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Understand how electricity demand could change.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-background p-5">
                  <BatteryCharging className="size-5" />
                  <h3 className="mt-4 font-medium">Create flexibility</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Consider storage and smart charging options.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative min-h-[500px] overflow-hidden rounded-3xl">
              <Image
                src={IMAGES.warehouse}
                alt="Commercial warehouse"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="how-it-works" className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white/40">
                From assessment to operation
              </p>

              <h2 className="mt-4 text-balance font-display text-3xl font-medium md:text-5xl">
                A structured approach to commercial EV infrastructure.
              </h2>

              <p className="mt-5 max-w-md leading-7 text-white/55">
                We bring the vehicle, electrical, solar, storage and commercial
                requirements together before developing the solution.
              </p>

              <Link
                href="#assessment"
                className="mt-7 inline-flex items-center text-sm font-medium text-white underline-offset-4 hover:underline"
              >
                Start an assessment
                <ArrowRight className="ml-2 size-4" />
              </Link>
            </div>

            <div>
              {PROCESS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[60px_1fr] gap-5 border-t border-white/10 py-7 last:border-b"
                >
                  <span className="font-mono text-xs text-white/35">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-display text-xl font-medium">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-7 text-white/55">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENCY */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-3xl border border-border bg-secondary/50 p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background">
                <ShieldCheck className="size-6" />
              </div>

              <div>
                <p className="eyebrow">Designed around your site</p>

                <h2 className="mt-3 font-display text-2xl font-medium md:text-4xl">
                  EV charging shouldn't be a black box.
                </h2>

                <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
                  We consider the available electrical capacity, charging
                  demand, vehicle requirements, solar generation, storage
                  potential and future expansion before recommending an
                  infrastructure strategy.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-4">
                    <MapPin className="size-5" />
                    <p className="mt-3 text-sm font-medium">Site</p>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4">
                    <Gauge className="size-5" />
                    <p className="mt-3 text-sm font-medium">Demand</p>
                  </div>

                  <div className="rounded-xl border border-border bg-background p-4">
                    <LineChart className="size-5" />
                    <p className="mt-3 text-sm font-medium">Economics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="assessment">
        <CtaBanner
          title="Ready to electrify your site?"
          description="Tell us about your vehicles, building, parking area and electricity demand. We'll help you understand what an integrated EV, solar and battery strategy could look like."
          href="/commercial#assessment"
          cta="Request a commercial EV assessment"
        />
      </section>
    </>
  );
}