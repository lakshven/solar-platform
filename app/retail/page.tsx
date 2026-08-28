import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  CircleDollarSign,
  CloudSun,
  Gauge,
  Leaf,
  LineChart,
  MapPin,
  ParkingSquare,
  PlugZap,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Sun,
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
  title: "Retail & Car Park Solar — BrightGrid Energy",
  description:
    "Solar car parks, rooftop solar, EV charging and battery storage for retail parks, supermarkets, shopping centres and commercial parking estates.",
};

const RETAIL_USE_CASES = [
  {
    icon: ShoppingBag,
    title: "Retail stores",
    description:
      "Generate electricity on-site and use it across stores, refrigeration, lighting, HVAC and other operational loads.",
  },
  {
    icon: ParkingSquare,
    title: "Large car parks",
    description:
      "Turn underused parking areas into productive energy infrastructure with solar canopies and EV charging.",
  },
  {
    icon: Building2,
    title: "Retail parks",
    description:
      "Coordinate solar across buildings, parking areas, customer charging and shared electrical infrastructure.",
  },
  {
    icon: Car,
    title: "EV charging",
    description:
      "Combine solar generation with workplace, customer, fleet and destination EV charging.",
  },
];

const ENERGY_STACK = [
  {
    icon: Sun,
    number: "01",
    title: "Solar generation",
    description:
      "Rooftops and car parks can become generation assets, producing electricity where customers and businesses already operate.",
  },
  {
    icon: PlugZap,
    number: "02",
    title: "EV charging",
    description:
      "Use the parking estate to support customer, staff and fleet charging while connecting charging demand to the wider energy strategy.",
  },
  {
    icon: BatteryCharging,
    number: "03",
    title: "Battery storage",
    description:
      "Store suitable surplus generation and strategically manage electricity flows across the site.",
  },
  {
    icon: Gauge,
    number: "04",
    title: "Energy management",
    description:
      "Monitor generation, consumption, charging and storage so the infrastructure can be managed as one connected system.",
  },
];

const CARPARK_FEATURES = [
  "Solar canopies over selected parking bays",
  "Integrated EV charging infrastructure",
  "Optional battery storage",
  "Lighting and electrical infrastructure integration",
  "Customer and staff charging",
  "Fleet charging capability",
  "Accessible maintenance routes",
  "Drainage and structural considerations",
  "Future charging expansion",
  "Site-wide energy monitoring",
];

const RETAIL_LOADS = [
  "Lighting",
  "Refrigeration",
  "HVAC",
  "Air conditioning",
  "Security systems",
  "Escalators",
  "Food preparation",
  "IT infrastructure",
  "EV charging",
  "Building services",
];

const PROJECT_FLOW = [
  {
    number: "01",
    title: "Map the estate",
    description:
      "We identify rooftops, car parks, electrical infrastructure, access routes and potential generation areas.",
  },
  {
    number: "02",
    title: "Understand demand",
    description:
      "We look at how the site actually consumes electricity across trading hours, seasonal periods and operational loads.",
  },
  {
    number: "03",
    title: "Build the energy architecture",
    description:
      "Solar, EV charging, batteries and grid interaction are considered together rather than as disconnected projects.",
  },
  {
    number: "04",
    title: "Model the opportunity",
    description:
      "The project can be assessed against energy savings, generation, charging requirements, capital structure and potential export.",
  },
  {
    number: "05",
    title: "Develop the project",
    description:
      "Design, engineering, approvals, procurement and construction are coordinated around the operating retail environment.",
  },
  {
    number: "06",
    title: "Operate & optimise",
    description:
      "Monitoring and ongoing maintenance help keep the energy infrastructure performing throughout its operating life.",
  },
];

const BUSINESS_MODELS = [
  {
    title: "Customer-funded",
    description:
      "The retail business or property owner funds the infrastructure and retains ownership of the energy assets.",
    icon: CircleDollarSign,
  },
  {
    title: "PPA structure",
    description:
      "An external asset owner can potentially fund the system while the business purchases electricity under an agreed long-term structure.",
    icon: LineChart,
  },
  {
    title: "Portfolio deployment",
    description:
      "Multiple retail locations can be assessed and prioritised as part of a wider estate-wide energy programme.",
    icon: Building2,
  },
];

export default function RetailCarParksPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        tone="dark"
        eyebrow="Retail & car parks"
        title="Turn your car park into an energy asset."
        description="Solar canopies, rooftop generation, EV charging, battery storage and intelligent energy management — designed together around the way your retail site operates."
        ctaLabel="Assess my retail site"
        ctaHref="#assessment"
      />

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">The opportunity</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Your roof is only one part of the opportunity.
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground">
              <p>
                Retail properties can have a combination of large rooftops,
                extensive parking areas and significant electricity demand.
                That creates an opportunity to connect generation directly with
                the places where electricity is being consumed.
              </p>

              <p>
                Solar car parks can transform parking infrastructure into
                productive energy assets while creating an ideal location for
                EV charging.
              </p>

              <p>
                When combined with rooftop solar, battery storage and energy
                management, the result can become a coordinated energy system
                rather than a collection of individual technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMMERSIVE ENERGY SYSTEM */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/50">
                Retail energy architecture
              </p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                One site. Four connected energy layers.
              </h2>

              <p className="mt-5 max-w-lg text-white/55">
                Instead of treating solar, EV charging and batteries as
                separate projects, we can design them around the same
                electrical infrastructure and operating requirements.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {[
                  "Generate",
                  "Charge",
                  "Store",
                  "Optimise",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {ENERGY_STACK.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="group bg-[#0b0c0d] p-7 transition-colors hover:bg-white/[0.04]"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex size-11 items-center justify-center rounded-xl bg-white/5">
                        <Icon className="size-5" />
                      </div>

                      <span className="font-mono text-xs text-white/25">
                        {item.number}
                      </span>
                    </div>

                    <h3 className="mt-7 font-display text-xl font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CAR PARK HERO CONCEPT */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="overflow-hidden rounded-[2rem] border border-border bg-background">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[420px] overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary">
                {/* Stylised car park illustration */}
                <div className="absolute inset-0">
                  <div className="absolute left-[10%] top-[18%] h-px w-[80%] bg-border" />
                  <div className="absolute left-[10%] top-[42%] h-px w-[80%] bg-border" />
                  <div className="absolute left-[10%] top-[66%] h-px w-[80%] bg-border" />

                  <div className="absolute left-[15%] top-[8%] h-[78%] w-px bg-border" />
                  <div className="absolute left-[37%] top-[8%] h-[78%] w-px bg-border" />
                  <div className="absolute left-[59%] top-[8%] h-[78%] w-px bg-border" />
                  <div className="absolute left-[81%] top-[8%] h-[78%] w-px bg-border" />
                </div>

                <div className="absolute left-[8%] right-[8%] top-[18%] h-[49%] rounded-xl border border-border bg-background/50 shadow-inner backdrop-blur-sm">
                  <div className="grid h-full grid-cols-4 gap-3 p-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                      <div
                        key={index}
                        className="relative rounded-md border border-border bg-secondary/60"
                      >
                        <div className="absolute inset-x-2 top-1/2 h-5 -translate-y-1/2 rounded bg-background shadow-sm" />

                        {index % 3 === 0 && (
                          <div className="absolute -right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background">
                            <PlugZap className="size-2.5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-8 left-8 rounded-xl border border-border bg-background/90 px-4 py-3 shadow-lg backdrop-blur">
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-secondary">
                      <Sun className="size-4" />
                    </div>

                    <div>
                      <p className="text-xs font-medium">
                        Solar car park
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        Illustrative concept
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <p className="eyebrow">Solar car parks</p>

                <h2 className="mt-3 font-display text-3xl font-medium md:text-4xl">
                  Parking space becomes productive infrastructure.
                </h2>

                <p className="mt-5 leading-7 text-muted-foreground">
                  A solar canopy can provide shade and weather protection for
                  vehicles while generating electricity above the parking
                  estate.
                </p>

                <div className="mt-8 space-y-3">
                  {CARPARK_FEATURES.slice(0, 6).map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <Button asChild variant="accent" className="mt-8">
                  <Link href="#assessment">
                    Explore a car park
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EV CHARGING */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Solar + EV charging</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Charge vehicles where the energy is being generated.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                Retail car parks can become natural charging destinations.
                Solar generation can be connected to the site's wider
                electrical strategy while charging infrastructure serves
                customers, employees or fleets.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {[
                  "Customer charging",
                  "Staff charging",
                  "Fleet charging",
                  "Destination charging",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-border p-4 text-sm"
                  >
                    <Car className="size-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Card className="overflow-hidden">
              <div className="border-b border-border bg-secondary/50 p-7">
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-background">
                    <PlugZap className="size-5" />
                  </div>

                  <Badge variant="leaf">Illustrative</Badge>
                </div>

                <h3 className="mt-6 font-display text-2xl font-medium">
                  Charging ecosystem
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  The charging strategy can be designed alongside solar,
                  battery and site demand.
                </p>
              </div>

              <CardContent className="p-7">
                <div className="space-y-3">
                  {[
                    ["Solar", "Generate on-site"],
                    ["Battery", "Store suitable surplus"],
                    ["EV", "Charge vehicles"],
                    ["Grid", "Manage imports & exports"],
                  ].map(([label, description], index) => (
                    <div
                      key={label}
                      className="relative flex items-center gap-4 rounded-xl border border-border p-4"
                    >
                      <div className="flex size-9 items-center justify-center rounded-lg bg-secondary font-mono text-xs">
                        0{index + 1}
                      </div>

                      <div>
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-xs text-muted-foreground">
                          {description}
                        </p>
                      </div>

                      {index < 3 && (
                        <ArrowDownRight className="absolute -bottom-3 left-7 z-10 size-4 bg-background text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* RETAIL DEMAND */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="eyebrow">Understand the building</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Retail energy demand doesn't stop at the lights.
              </h2>

              <p className="mt-5 text-muted-foreground">
                Refrigeration, HVAC, lighting, security and customer services
                can all contribute to the site's electricity profile.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {RETAIL_LOADS.map((load, index) => (
                <div
                  key={load}
                  className="flex items-center justify-between rounded-xl border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-secondary font-mono text-[10px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="text-sm font-medium">{load}</span>
                  </div>

                  <Zap className="size-4 text-muted-foreground" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RETAIL USE CASES */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Retail environments</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Designed for the way retail properties actually work.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RETAIL_USE_CASES.map((item) => {
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

      {/* CAR PARK ASSESSMENT */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-white/50">
                Car park intelligence
              </p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                A car park is more complicated than a row of panels.
              </h2>

              <p className="mt-5 max-w-lg text-white/50">
                Before designing a canopy system, we consider parking
                configuration, access, structures, electrical infrastructure,
                drainage, traffic movement, planning requirements and future
                charging demand.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
              {[
                {
                  icon: MapPin,
                  title: "Parking layout",
                  text: "Bay arrangement, circulation and usable parking areas.",
                },
                {
                  icon: Building2,
                  title: "Structures",
                  text: "Canopy configuration, foundations and structural requirements.",
                },
                {
                  icon: PlugZap,
                  title: "Electrical capacity",
                  text: "Existing infrastructure and charging requirements.",
                },
                {
                  icon: ShieldCheck,
                  title: "Safety & access",
                  text: "Maintenance access, clearances and operational safety.",
                },
                {
                  icon: CloudSun,
                  title: "Solar resource",
                  text: "Orientation, shading and expected generation.",
                },
                {
                  icon: BatteryCharging,
                  title: "Future flexibility",
                  text: "Battery storage and changing EV demand.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-[#080909] p-6"
                  >
                    <Icon className="size-5 text-white/60" />

                    <h3 className="mt-5 font-display text-lg font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/45">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECT FLOW */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">From parking estate to energy asset</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              One coordinated process from first assessment to operation.
            </h2>
          </div>

          <div className="mx-auto mt-12 max-w-5xl">
            {PROJECT_FLOW.map((step, index) => (
              <div
                key={step.number}
                className="grid gap-5 border-t border-border py-7 md:grid-cols-[70px_260px_1fr] md:items-start"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {step.number}
                </span>

                <h3 className="font-display text-xl font-medium">
                  {step.title}
                </h3>

                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}

            <div className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* BUSINESS MODELS */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Commercial structures</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Different ways to fund and operate the infrastructure.
            </h2>

            <p className="mt-4 text-muted-foreground">
              The best structure depends on the property owner, energy
              profile, capital strategy and long-term objectives.
            </p>
          </div>

          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            {BUSINESS_MODELS.map((model) => {
              const Icon = model.icon;

              return (
                <Card
                  key={model.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-7">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-6 font-display text-xl font-medium">
                      {model.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {model.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-background p-6">
            <div className="flex items-start gap-4">
              <CircleDollarSign className="mt-0.5 size-5 shrink-0" />

              <div>
                <p className="font-medium">
                  Looking for a PPA?
                </p>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  A Power Purchase Agreement can potentially allow a business
                  to access on-site renewable generation without funding the
                  entire installation upfront. Commercial terms, pricing,
                  ownership and responsibilities depend on the project.
                </p>

                <Link
                  href="/ppa"
                  className="mt-4 inline-flex items-center text-sm font-medium underline-offset-4 hover:underline"
                >
                  Explore PPAs
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="eyebrow">Retail portfolios</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                One strategy across multiple stores and parking estates.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                Retail groups can assess multiple locations, prioritise the
                strongest opportunities and create a repeatable deployment
                programme rather than treating every property as an isolated
                project.
              </p>

              <Button asChild variant="accent" className="mt-7">
                <Link href="#assessment">
                  Assess my portfolio
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                    <LineChart className="size-5" />
                  </div>

                  <Badge variant="outline">Portfolio model</Badge>
                </div>

                <CardTitle className="mt-5">
                  Estate prioritisation
                </CardTitle>

                <CardDescription>
                  Compare locations using consistent technical and commercial
                  criteria.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  {[
                    "Roof opportunity",
                    "Car park opportunity",
                    "Energy demand",
                    "EV charging demand",
                    "Grid considerations",
                    "Commercial potential",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center justify-between rounded-lg bg-secondary/50 px-4 py-3 text-sm"
                    >
                      <span>{item}</span>

                      <span className="font-mono text-[10px] text-muted-foreground">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-background">
              <Leaf className="size-6" />
            </div>

            <p className="eyebrow mt-6">Beyond electricity savings</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Make the parking estate part of your sustainability strategy.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Solar car parks can combine renewable generation, EV
              infrastructure and visible sustainability improvements in a
              location customers interact with every day.
            </p>

            <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
              {[
                "Visible renewable infrastructure",
                "EV-ready customer experience",
                "More productive use of parking land",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-background p-5"
                >
                  <CheckCircle2 className="size-4" />

                  <p className="mt-4 text-sm font-medium">
                    {item}
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
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-black p-8 text-white md:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <ParkingSquare className="size-6" />
                </div>

                <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Retail & car park assessment
                </p>

                <h2 className="mt-3 font-display text-3xl font-medium">
                  Find out what your site could support.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  Start with the property, the parking estate and the energy
                  demand. From there we can explore the right combination of
                  solar, EV charging and storage.
                </p>
              </div>

              <CardContent className="p-8 md:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Retail site",
                    "Car park size",
                    "Annual electricity use",
                    "EV charging requirement",
                    "Existing solar",
                    "Future expansion",
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
                  Initial assessments are indicative. Final system capacity,
                  structural requirements, planning, grid connection, EV
                  charging capacity and commercial returns require detailed
                  site-specific assessment.
                </p>

                <Button
                  asChild
                  variant="accent"
                  size="default"
                  className="mt-7 w-full"
                >
                  <Link href="/commercial/assessment">
                    Start my retail assessment
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Your car park could be doing more."
        description="Explore solar canopies, EV charging, battery storage and a complete energy strategy for your retail site."
        href="/commercial/assessment"
        cta="Assess my retail site"
      />
    </>
  );
}