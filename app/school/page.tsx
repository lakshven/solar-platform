import Link from "next/link";
import {
  ArrowRight,
  Award,
  BatteryCharging,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  CloudSun,
  GraduationCap,
  Gauge,
  Leaf,
  LineChart,
  Map,
  Monitor,
  Network,
  PanelsTopLeft,
  School,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
  WalletCards,
  Wrench,
  Zap,
  FileCheck2,
  Bell,
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
  title: "Solar for Schools & Academy Trusts — BrightGrid Energy",
  description:
    "Solar, battery storage, EV charging and energy management for schools, academies and education estates. Plan individual installations or coordinated multi-site programmes.",
};

const ESTATE_CHALLENGES = [
  {
    icon: WalletCards,
    title: "Energy costs",
    description:
      "Electricity is a significant ongoing operating cost. On-site generation can help reduce reliance on imported electricity where the site's demand profile supports it.",
  },
  {
    icon: Building2,
    title: "Multiple buildings",
    description:
      "Schools often have different roofs, buildings, orientations and electrical systems. Each site needs its own technical assessment.",
  },
  {
    icon: CalendarIcon,
    title: "Term-time demand",
    description:
      "School operating hours, holidays and seasonal changes make load matching particularly important when designing the energy system.",
  },
  {
    icon: Network,
    title: "Estate-wide planning",
    description:
      "A trust may have dozens of schools. A coordinated programme can help prioritise the strongest opportunities first.",
  },
];

const SOLUTIONS = [
  {
    icon: Sun,
    title: "Solar generation",
    description:
      "Use suitable roofs and other infrastructure to generate renewable electricity on-site.",
  },
  {
    icon: BatteryCharging,
    title: "Battery storage",
    description:
      "Store surplus generation and explore how storage can support the school's energy strategy.",
  },
  {
    icon: Zap,
    title: "EV charging",
    description:
      "Prepare for staff, visitor, fleet and future electric-vehicle charging requirements.",
  },
  {
    icon: Monitor,
    title: "Energy monitoring",
    description:
      "Understand generation, consumption and system performance across individual sites or an entire estate.",
  },
];

const TRUST_STEPS = [
  {
    number: "01",
    title: "Map the estate",
    description:
      "Build a picture of the schools, buildings, roofs, electricity use and existing energy infrastructure.",
  },
  {
    number: "02",
    title: "Screen every site",
    description:
      "Identify which schools appear most suitable for solar, battery storage, EV charging or other energy measures.",
  },
  {
    number: "03",
    title: "Prioritise opportunities",
    description:
      "Compare technical potential, electricity demand, site constraints and commercial considerations.",
  },
  {
    number: "04",
    title: "Create a deployment plan",
    description:
      "Develop a phased programme rather than trying to deliver every school simultaneously.",
  },
  {
    number: "05",
    title: "Deliver the first sites",
    description:
      "Detailed surveys, design, approvals, procurement and installation can begin on the highest-priority locations.",
  },
  {
    number: "06",
    title: "Monitor the portfolio",
    description:
      "Use consistent reporting to understand how the installed systems perform over time.",
  },
];

const SCHOOL_PRIORITIES = [
  "Reduce electricity costs",
  "Generate renewable electricity",
  "Improve energy resilience",
  "Support sustainability targets",
  "Create educational opportunities",
  "Prepare for EV charging",
  "Add battery storage",
  "Improve estate-wide energy visibility",
];

const FUNDING_OPTIONS = [
  {
    icon: WalletCards,
    title: "Capital purchase",
    description:
      "The school or trust funds the installation directly and owns the energy asset.",
  },
  {
    icon: FileContract,
    title: "PPA structure",
    description:
      "Where suitable, an externally funded solar project can be structured around the electricity generated on-site.",
  },
  {
    icon: Network,
    title: "Portfolio programme",
    description:
      "Multiple schools can be assessed and prioritised as part of a coordinated estate-wide deployment.",
  },
];

const EDUCATION_BENEFITS = [
  "Live solar generation data can support classroom learning",
  "Students can see renewable energy production on their own campus",
  "Energy projects can connect sustainability with STEM education",
  "Schools can use real operational data for projects and activities",
  "Visible infrastructure can demonstrate the school's environmental commitment",
];

export default function SchoolsPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        tone="dark"
        eyebrow="Schools & academy trusts"
        title="Turn your education estate into a smarter energy network."
        description="Solar, battery storage, EV charging and energy monitoring designed around schools, academies and multi-site education estates — from one campus to an entire trust."
        ctaLabel="Plan your school estate"
        ctaHref="#assessment"
      />

      {/* ESTATE INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">The education estate</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Every school is different. Your energy strategy shouldn't have
                to start from scratch.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                A school estate can contain classrooms, sports halls,
                administration buildings, kitchens, workshops, nurseries and
                other facilities — each with different energy requirements.
              </p>
            </div>

            <div className="space-y-5 text-muted-foreground">
              <p>
                The strongest approach is not simply to put as many panels as
                possible on every available roof. It is to understand how each
                school operates, how much electricity it uses and where energy
                infrastructure can create the greatest value.
              </p>

              <p>
                For academy trusts and larger education estates, that means
                moving from individual projects towards a coordinated energy
                programme.
              </p>

              <p>
                BrightGrid can help assess individual schools while creating a
                consistent framework for comparing opportunities across the
                wider estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ESTATE CHALLENGES */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Why schools need a different approach</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              Energy planning across an education estate is more than a
              rooftop exercise.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ESTATE_CHALLENGES.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardContent className="p-6">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
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

      {/* VISUAL ESTATE MAP */}
      <section className="section">
        <div className="container">
          <div className="overflow-hidden rounded-3xl border border-border bg-black text-white">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-8 md:p-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Illustrative trust energy network
                </p>

                <h2 className="mt-4 text-balance font-display text-3xl font-medium md:text-4xl">
                  One strategy. Multiple schools. One view.
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/55">
                  Imagine being able to understand the energy performance of
                  every participating school from one estate-level view.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    "School-by-school performance",
                    "Portfolio generation",
                    "Energy consumption",
                    "Battery status",
                    "Maintenance alerts",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 text-sm text-white/70"
                    >
                      <CheckCircle2 className="size-4 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[420px] overflow-hidden border-t border-white/10 bg-[#111315] lg:border-l lg:border-t-0">
                <div className="absolute inset-0 opacity-30">
                  <div
                    className="h-full w-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />
                </div>

                <div className="absolute left-[18%] top-[20%]">
                  <NetworkNode label="School A" status="Generating" />
                </div>

                <div className="absolute left-[58%] top-[15%]">
                  <NetworkNode label="School B" status="Generating" />
                </div>

                <div className="absolute left-[35%] top-[47%]">
                  <NetworkNode label="School C" status="Battery" />
                </div>

                <div className="absolute left-[68%] top-[61%]">
                  <NetworkNode label="School D" status="Monitoring" />
                </div>

                <div className="absolute left-[16%] top-[72%]">
                  <NetworkNode label="School E" status="Online" />
                </div>

                <div className="absolute left-[48%] top-[82%]">
                  <NetworkNode label="Trust" status="Portfolio" central />
                </div>

                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <line
                    x1="27"
                    y1="28"
                    x2="48"
                    y2="82"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="0.3"
                  />
                  <line
                    x1="66"
                    y1="23"
                    x2="48"
                    y2="82"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="0.3"
                  />
                  <line
                    x1="43"
                    y1="55"
                    x2="48"
                    y2="82"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="0.3"
                  />
                  <line
                    x1="76"
                    y1="69"
                    x2="48"
                    y2="82"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="0.3"
                  />
                  <line
                    x1="24"
                    y1="80"
                    x2="48"
                    y2="82"
                    stroke="currentColor"
                    strokeOpacity="0.2"
                    strokeWidth="0.3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">The energy system</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              Solar is the starting point. The bigger opportunity is the
              complete energy system.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Combine generation, storage, EV charging and monitoring around
              how the school actually uses electricity.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {SOLUTIONS.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative rounded-2xl border border-border bg-background p-6"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>

                  <div className="mt-6 flex size-11 items-center justify-center rounded-xl bg-secondary">
                    <Icon className="size-5" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-medium">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SCHOOL ENERGY PROFILE */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow">Load matching</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                A school has its own energy rhythm.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                School days, holidays, weekends and seasonal changes can
                create a very different electricity profile from a warehouse
                or factory.
              </p>

              <p className="mt-4 max-w-xl text-muted-foreground">
                We consider when electricity is actually being consumed when
                evaluating solar capacity, battery storage and potential
                export.
              </p>

              <Button asChild variant="accent" className="mt-7">
                <Link href="#assessment">
                  Analyse your school
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="rounded-3xl border border-border bg-secondary/40 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Illustrative energy profile
                  </p>

                  <h3 className="mt-2 font-display text-xl font-medium">
                    Typical school day
                  </h3>
                </div>

                <Badge variant="outline">Example</Badge>
              </div>

              <div className="mt-10 flex h-48 items-end gap-2">
                {[18, 20, 25, 32, 45, 58, 72, 82, 76, 70, 65, 58, 54, 49, 42, 35, 28, 22, 18, 15].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="group relative flex-1"
                    >
                      <div
                        className="absolute bottom-0 w-full rounded-t-sm bg-foreground/80 transition-all duration-300 group-hover:bg-foreground"
                        style={{ height: `${height}%` }}
                      />
                    </div>
                  ),
                )}
              </div>

              <div className="mt-4 flex justify-between text-[10px] font-mono text-muted-foreground">
                <span>06:00</span>
                <span>09:00</span>
                <span>12:00</span>
                <span>15:00</span>
                <span>18:00</span>
              </div>

              <p className="mt-6 text-xs leading-5 text-muted-foreground">
                Illustrative only. Actual electricity demand varies
                significantly by school, season, occupancy and equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST PROGRAMME */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow text-white/50">
                Academy trust programme
              </p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                From one school to an entire estate.
              </h2>

              <p className="mt-5 max-w-md text-white/55">
                A portfolio approach lets the trust understand where the best
                opportunities are before committing to a large deployment.
              </p>
            </div>

            <div>
              {TRUST_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[55px_1fr] gap-5 border-t border-white/10 py-7 last:border-b"
                >
                  <span className="font-mono text-xs text-white/35">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-display text-xl font-medium">
                      {step.title}
                    </h3>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/50">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITIES */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow">Your priorities</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Start with what the school or trust actually wants to achieve.
              </h2>

              <p className="mt-5 text-muted-foreground">
                There is no single reason for installing solar. Your objectives
                help determine the right technical and commercial strategy.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {SCHOOL_PRIORITIES.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-border bg-background p-5 text-sm font-medium"
                >
                  <CheckCircle2 className="size-4 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">Funding & commercial models</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              The project doesn't have to follow one funding model.
            </h2>

            <p className="mt-4 text-muted-foreground">
              Depending on the school, trust, project size and commercial
              circumstances, different structures may be considered.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {FUNDING_OPTIONS.map((item) => {
              const Icon = item.icon;

              return (
                <Card
                  key={item.title}
                  className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardHeader>
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="size-5" />
                    </div>

                    <CardTitle className="mt-4">{item.title}</CardTitle>

                    <CardDescription className="leading-6">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-background p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium">Not sure which model fits?</p>

                <p className="mt-1 text-sm text-muted-foreground">
                  We can assess the site first and discuss the appropriate
                  technical and commercial route afterwards.
                </p>
              </div>

              <Button asChild variant="outline">
                <Link href="#assessment">
                  Explore options
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION / STEM */}
      <section className="section">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="eyebrow">Energy meets education</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Turn the school's energy system into a learning resource.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                Solar infrastructure can be more than a cost-saving project.
                It can provide real-world data that helps students understand
                renewable energy, electricity, sustainability and technology.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex size-12 items-center justify-center rounded-xl bg-secondary">
                  <GraduationCap className="size-6" />
                </div>

                <div>
                  <p className="font-medium">A visible sustainability asset</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Energy generation becomes something students can see,
                    measure and understand.
                  </p>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Potential learning opportunities</CardTitle>
                <CardDescription>
                  Subject to the school's curriculum and chosen monitoring
                  platform.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {EDUCATION_BENEFITS.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Sparkles className="mt-0.5 size-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* OPERATIONS */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow">After installation</p>

            <h2 className="mx-auto mt-3 max-w-3xl text-balance font-display text-3xl font-medium md:text-5xl">
              The project continues after the panels go on the roof.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
              Monitoring, maintenance and performance visibility help protect
              the long-term value of the energy system.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Monitor,
                title: "Monitor",
                description: "Track generation and system status.",
              },
              {
                icon: Bell,
                title: "Alerts",
                description: "Identify potential performance issues.",
              },
              {
                icon: Wrench,
                title: "Maintain",
                description: "Coordinate planned maintenance.",
              },
              {
                icon: BarChart3,
                title: "Report",
                description: "Review energy performance over time.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <Card key={item.title}>
                  <CardContent className="p-6">
                    <Icon className="size-5" />

                    <h3 className="mt-5 font-display text-lg font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRUST DASHBOARD */}
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-border bg-black text-white shadow-2xl">
            <div className="border-b border-white/10 p-6 md:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Illustrative estate dashboard
                  </p>

                  <h3 className="mt-2 font-display text-xl font-medium">
                    Trust energy overview
                  </h3>
                </div>

                <Badge variant="leaf">Portfolio active</Badge>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              <PortfolioMetric
                icon={School}
                label="Schools"
                value="24"
              />

              <PortfolioMetric
                icon={Sun}
                label="Solar sites"
                value="18"
              />

              <PortfolioMetric
                icon={BatteryCharging}
                label="Battery sites"
                value="7"
              />

              <PortfolioMetric
                icon={Zap}
                label="EV charging"
                value="11"
              />
            </div>

            <div className="grid gap-8 border-t border-white/10 p-6 md:grid-cols-[1fr_auto] md:p-8">
              <div>
                <p className="text-xs text-white/40">
                  Illustrative portfolio generation
                </p>

                <div className="mt-6 flex h-32 items-end gap-1">
                  {[20, 28, 24, 38, 52, 64, 59, 72, 68, 81, 76, 88, 74, 69, 82, 90, 86, 72, 61, 49, 42, 35, 28, 23].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-sm bg-white/70"
                        style={{ height: `${height}%` }}
                      />
                    ),
                  )}
                </div>

                <div className="mt-3 flex justify-between font-mono text-[9px] text-white/30">
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                </div>
              </div>

              <div className="flex items-center gap-5 md:flex-col md:items-end md:justify-center">
                <div>
                  <p className="text-xs text-white/40">Performance</p>
                  <p className="mt-1 text-lg font-medium">Within target</p>
                </div>

                <div>
                  <p className="text-xs text-white/40">Alerts</p>
                  <p className="mt-1 text-lg font-medium">0 critical</p>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 p-6">
              <p className="text-xs leading-5 text-white/35">
                Dashboard figures are illustrative and do not represent an
                actual BrightGrid customer portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY BRIGHTGRID */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">A measured approach</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Build the programme around evidence, not assumptions.
              </h2>

              <p className="mt-5 text-muted-foreground">
                We believe a trust should be able to understand why a site is
                being recommended, what the system is expected to achieve and
                how the opportunity compares with other schools.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Map,
                  title: "Site assessment",
                  text: "Understand the physical opportunity.",
                },
                {
                  icon: LineChart,
                  title: "Energy analysis",
                  text: "Understand when and how electricity is consumed.",
                },
                {
                  icon: ClipboardCheck,
                  title: "Prioritisation",
                  text: "Compare sites using consistent criteria.",
                },
                {
                  icon: ShieldCheck,
                  title: "Transparent assumptions",
                  text: "Separate estimates from confirmed project information.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Card key={item.title}>
                    <CardContent className="p-6">
                      <Icon className="size-5" />

                      <h3 className="mt-5 font-display text-lg font-medium">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section id="assessment" className="section">
        <div className="container">
          <Card className="mx-auto max-w-4xl overflow-hidden">
            <div className="grid md:grid-cols-[0.7fr_1.3fr]">
              <div className="bg-black p-8 text-white md:p-10">
                <div className="flex size-12 items-center justify-center rounded-xl bg-white/10">
                  <School className="size-6" />
                </div>

                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                  School & trust assessment
                </p>

                <h2 className="mt-3 font-display text-3xl font-medium">
                  Start with one school or your entire estate.
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/50">
                  We can start with an individual site or discuss a portfolio
                  approach for a larger education estate.
                </p>
              </div>

              <CardContent className="p-8 md:p-10">
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "School or trust details",
                    "Existing energy information",
                    "Roof / site information",
                    "Current electricity costs",
                    "Future EV requirements",
                    "Battery interest",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border bg-secondary/30 p-4"
                    >
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-2 text-sm font-medium">{item}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-sm leading-6 text-muted-foreground">
                  Tell us whether you're looking at one school, several sites
                  or an entire trust estate. We'll shape the assessment around
                  the scale of the opportunity.
                </p>

                <Button
                  asChild
                  variant="accent"
                  size="default"
                  className="mt-7 w-full sm:w-auto"
                >
                  <Link href="/commercial/assessment">
                    Start school assessment
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <CtaBanner
        title="Ready to explore your education estate?"
        description="Start with one school, a group of schools or an entire academy trust. We'll help identify where solar, batteries and EV infrastructure could fit."
        href="/commercial/assessment"
        cta="Plan your school estate"
      />
    </>
  );
}

function NetworkNode({
  label,
  status,
  central = false,
}: {
  label: string;
  status: string;
  central?: boolean;
}) {
  return (
    <div
      className={`relative z-10 rounded-xl border px-3 py-2 shadow-xl backdrop-blur ${
        central
          ? "border-white/30 bg-white text-black"
          : "border-white/10 bg-white/5 text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        <span
          className={`size-2 rounded-full ${
            central ? "bg-black" : "bg-white/70"
          }`}
        />

        <span className="text-[10px] font-medium">{label}</span>
      </div>

      <p
        className={`mt-1 text-[9px] ${
          central ? "text-black/50" : "text-white/35"
        }`}
      >
        {status}
      </p>
    </div>
  );
}

function PortfolioMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof School;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#111315] p-6">
      <Icon className="size-5 text-white/50" />

      <p className="mt-5 text-xs text-white/35">{label}</p>

      <p className="mt-1 text-xl font-medium">{value}</p>
    </div>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return <ClipboardCheck className={className} />;
}

function FileContract({ className }: { className?: string }) {
  return <FileCheck className={className} />;
}

function FileCheck({ className }: { className?: string }) {
  return <FileCheck2 className={className} />;
}