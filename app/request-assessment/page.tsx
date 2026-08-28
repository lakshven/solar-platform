"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BatteryCharging,
  Building2,
  Car,
  CheckCircle2,
  Factory,
  FileText,
  MapPin,
  PanelsTopLeft,
  School,
  Send,
  ShieldCheck,
  Sun,
  Tractor,
  Zap,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { CtaBanner } from "@/components/shared/cta-banner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SITE_TYPES = [
  {
    id: "warehouse",
    label: "Warehouse / Logistics",
    icon: Building2,
  },
  {
    id: "school",
    label: "School / Trust",
    icon: School,
  },
  {
    id: "industrial",
    label: "Industrial",
    icon: Factory,
  },
  {
    id: "retail",
    label: "Retail / Car Park",
    icon: Car,
  },
  {
    id: "portfolio",
    label: "Property Portfolio",
    icon: PanelsTopLeft,
  },
  {
    id: "farm",
    label: "Farm / Agricultural",
    icon: Tractor,
  },
  {
    id: "other",
    label: "Other Commercial",
    icon: Building2,
  },
];

const INTERESTS = [
  {
    id: "solar",
    label: "Solar PV",
    icon: Sun,
  },
  {
    id: "battery",
    label: "Battery Storage",
    icon: BatteryCharging,
  },
  {
    id: "ev",
    label: "EV Charging",
    icon: Zap,
  },
  {
    id: "ppa",
    label: "Power Purchase Agreement",
    icon: FileText,
  },
];

const STEPS = [
  {
    number: "01",
    title: "Tell us about your site",
    description:
      "Give us the basic details about your building, property or portfolio.",
  },
  {
    number: "02",
    title: "Share your energy goals",
    description:
      "Tell us whether your priority is solar, batteries, EV charging, a PPA or a combination.",
  },
  {
    number: "03",
    title: "We assess the opportunity",
    description:
      "We'll determine the appropriate technical and commercial next steps.",
  },
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UK_PHONE_REGEX = /^(?:(?:\+44\s?|0)\d[\d\s-]{8,12})$/;
const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

export default function RequestAssessmentPage() {
  const [siteType, setSiteType] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [postcodeLoading, setPostcodeLoading] = useState(false);
  const [postcodeMessage, setPostcodeMessage] = useState("");

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  async function findPostcode(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const form = event.currentTarget.form;
    const postcode = String(new FormData(form ?? undefined).get("postcode") ?? "")
      .trim()
      .toUpperCase();

    setErrors((current) => ({ ...current, postcode: "" }));
    setPostcodeMessage("");

    if (!UK_POSTCODE_REGEX.test(postcode)) {
      setErrors((current) => ({
        ...current,
        postcode: "Enter a valid UK postcode.",
      }));
      return;
    }

    setPostcodeLoading(true);

    try {
      const response = await fetch(
        `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`
      );

      if (!response.ok) {
        throw new Error("Postcode not found.");
      }

      const result = await response.json();
      const location = result.result;
      const address = [
        location.admin_ward,
        location.admin_district,
        location.region,
        location.postcode,
      ]
        .filter(Boolean)
        .join(", ");

      const addressInput = form?.elements.namedItem("address");
      if (addressInput instanceof HTMLInputElement) {
        addressInput.value = address;
      }

      setPostcodeMessage("Postcode found. Please add the full site address.");
    } catch (error) {
      setErrors((current) => ({
        ...current,
        postcode:
          error instanceof Error ? error.message : "Postcode lookup failed.",
      }));
    } finally {
      setPostcodeLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const nextErrors: Record<string, string> = {};

    if (!siteType) nextErrors.siteType = "Choose a property type.";
    if (interests.length === 0) nextErrors.interests = "Choose at least one interest.";
    if (!name) nextErrors.name = "Enter your name.";
    if (!company) nextErrors.company = "Enter your company or organisation.";
    if (!email) nextErrors.email = "Enter your work email.";
    else if (!EMAIL_REGEX.test(email)) nextErrors.email = "Enter a valid email address.";
    if (phone && !UK_PHONE_REGEX.test(phone.replace(/[()]/g, ""))) {
      nextErrors.phone = "Enter a valid UK phone number.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      source: "commercial_assessment",

      siteType,
      interests,

      name,
      company,
      role: formData.get("role"),

      email,
      phone,

      address: formData.get("address"),
      sites: formData.get("sites"),
      consumption: formData.get("consumption"),

      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Form submission error:", error);

      setErrors({ form: error instanceof Error ? error.message : "Something went wrong. Please try again." });
    }
  }

  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Commercial energy assessment"
        title="Let's understand what your site could do."
        description="Tell us about your property, energy use and priorities. We'll help identify whether solar, battery storage, EV charging, a PPA or a combination makes sense for your site."
        ctaLabel="Start your assessment"
        ctaHref="#assessment"
      />

      {/* INTRO */}
      <section className="section">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow">A site-led approach</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                Not every commercial building needs the same energy system.
              </h2>

              <p className="mt-5 max-w-xl text-muted-foreground">
                A warehouse, school, retail park, factory and property
                portfolio can have completely different energy requirements.
                That's why we start with the site rather than a predefined
                package.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: MapPin,
                  title: "Site intelligence",
                  text: "Understand the building, roof, parking areas and available space.",
                },
                {
                  icon: Zap,
                  title: "Energy demand",
                  text: "Look at how your organisation actually consumes electricity.",
                },
                {
                  icon: BatteryCharging,
                  title: "Future requirements",
                  text: "Consider batteries, EVs, electrification and changing demand.",
                },
                {
                  icon: ShieldCheck,
                  title: "Commercial structure",
                  text: "Explore purchase, finance or PPA options where appropriate.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <Card
                    key={item.title}
                    className="p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex size-11 items-center justify-center rounded-xl bg-secondary">
                      <Icon className="size-5" />
                    </div>

                    <h3 className="mt-5 font-display text-lg font-medium">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {item.text}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section bg-secondary/50">
        <div className="container">
          <div className="max-w-2xl">
            <p className="eyebrow">How it works</p>

            <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
              A simple starting point for a complex energy project.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className="border-t-2 border-primary pt-5"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {step.number}
                </span>

                <h3 className="mt-5 font-display text-xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ASSESSMENT FORM */}
      <section id="assessment" className="section scroll-mt-24">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
            {/* FORM INTRO */}
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Request an assessment</p>

              <h2 className="mt-3 text-balance font-display text-3xl font-medium md:text-5xl">
                Tell us about your project.
              </h2>

              <p className="mt-5 text-muted-foreground">
                You don't need to have everything ready. Start with what you
                know and we can work through the details with you.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "No obligation assessment",
                  "Site-specific approach",
                  "Solar, battery, EV & PPA options",
                  "Commercial and portfolio projects welcome",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-4 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* FORM */}
            <Card className="overflow-hidden border-border/70 shadow-xl">
              <div className="border-b bg-secondary/40 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-background">
                    <PanelsTopLeft className="size-5" />
                  </div>

                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      Project enquiry
                    </p>

                    <h3 className="mt-1 font-display text-xl font-medium">
                      Commercial energy assessment
                    </h3>
                  </div>
                </div>
              </div>

              {submitted ? (
                <div className="p-8 md:p-10">
                  <div className="flex size-14 items-center justify-center rounded-2xl bg-secondary">
                    <CheckCircle2 className="size-7" />
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-medium">
                    Thanks — your assessment request has been received.
                  </h3>

                  <p className="mt-3 max-w-xl text-muted-foreground">
                    We'll review the information you've provided and determine
                    the appropriate next steps for your project.
                  </p>

                  <Button asChild variant="outline" className="mt-7">
                    <Link href="/commercial">
                      Back to commercial
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-8 p-6 md:p-8"
                >
                  {/* SITE TYPE */}
                  <div>
                    <Label className="text-base font-medium">
                      What type of property is this?
                    </Label>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose the option that best describes your project.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {SITE_TYPES.map((type) => {
                        const Icon = type.icon;
                        const selected = siteType === type.id;

                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => setSiteType(type.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                              selected
                                ? "border-primary bg-secondary shadow-sm"
                                : "border-border hover:border-primary/50 hover:bg-secondary/50"
                            }`}
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                              <Icon className="size-5" />
                            </span>

                            <span className="text-sm font-medium">
                              {type.label}
                            </span>

                            {selected && (
                              <CheckCircle2 className="ml-auto size-4 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {errors.siteType && (
                      <p className="mt-2 text-sm text-destructive">{errors.siteType}</p>
                    )}
                  </div>

                  {/* INTEREST */}
                  <div>
                    <Label className="text-base font-medium">
                      What are you interested in?
                    </Label>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Select everything you're considering.
                    </p>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {INTERESTS.map((interest) => {
                        const Icon = interest.icon;
                        const selected = interests.includes(interest.id);

                        return (
                          <button
                            key={interest.id}
                            type="button"
                            onClick={() => toggleInterest(interest.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                              selected
                                ? "border-primary bg-secondary shadow-sm"
                                : "border-border hover:border-primary/50 hover:bg-secondary/50"
                            }`}
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                              <Icon className="size-5" />
                            </span>

                            <span className="text-sm font-medium">
                              {interest.label}
                            </span>

                            {selected && (
                              <CheckCircle2 className="ml-auto size-4 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    {errors.interests && (
                      <p className="mt-2 text-sm text-destructive">{errors.interests}</p>
                    )}
                  </div>

                  {/* CONTACT DETAILS */}
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="name">Your name</Label>

                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        className="mt-2"
                      />
                      {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="company">Company / organisation</Label>

                        <Input
                          id="company"
                          name="company"
                          required
                          placeholder="Company name"
                          className="mt-2"
                        />
                        {errors.company && <p className="mt-1 text-sm text-destructive">{errors.company}</p>}
                      </div>

                      <div>
                        <Label htmlFor="role">Your role</Label>

                        <Input
                          id="role"
                          name="role"
                          placeholder="e.g. Facilities Manager"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="email">Work email</Label>

                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="you@company.com"
                          autoComplete="email"
                          className="mt-2"
                        />
                        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone</Label>

                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+44"
                          autoComplete="tel"
                          className="mt-2"
                        />
                        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* SITE DETAILS */}
                  <div className="space-y-5">
                    <div>
                      <Label htmlFor="postcode">Postcode</Label>

                      <div className="mt-2 flex gap-2">
                        <Input
                          id="postcode"
                          name="postcode"
                          placeholder="e.g. SW1A 1AA"
                          autoComplete="postal-code"
                          aria-invalid={Boolean(errors.postcode)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={findPostcode}
                          disabled={postcodeLoading}
                        >
                          {postcodeLoading ? "Finding..." : "Find postcode"}
                        </Button>
                      </div>
                      {errors.postcode && <p className="mt-1 text-sm text-destructive">{errors.postcode}</p>}
                      {postcodeMessage && <p className="mt-1 text-sm text-muted-foreground">{postcodeMessage}</p>}
                    </div>

                    <div>
                      <Label htmlFor="address">Site address</Label>

                      <Input
                        id="address"
                        name="address"
                        placeholder="Full property address"
                        className="mt-2"
                      />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="sites">
                          Number of sites
                        </Label>

                        <Input
                          id="sites"
                          name="sites"
                          type="number"
                          min="1"
                          placeholder="1"
                          className="mt-2"
                        />
                      </div>

                      <div>
                        <Label htmlFor="consumption">
                          Annual electricity use
                        </Label>

                        <Input
                          id="consumption"
                          name="consumption"
                          placeholder="If known, e.g. 500,000 kWh"
                          className="mt-2"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">
                        Tell us about the project
                      </Label>

                      <Textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about the site, roof, electricity use, parking areas, future plans or anything else that may be relevant."
                        className="mt-2 resize-none"
                      />
                    </div>
                  </div>

                  {/* FILE / FUTURE */}
                  <div className="rounded-2xl border border-dashed border-border bg-secondary/30 p-5">
                    <div className="flex gap-4">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background">
                        <FileText className="size-5" />
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          Have drawings or energy information?
                        </p>

                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          You can provide electricity bills, site plans, roof
                          drawings or other project information during the
                          assessment process.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* SUBMIT */}
                  <div className="border-t pt-6">
                    {errors.form && <p className="mb-4 text-sm text-destructive">{errors.form}</p>}
                    <Button
                      type="submit"
                      variant="accent"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Request assessment
                      <Send className="ml-2 size-4" />
                    </Button>

                    <p className="mt-4 text-xs leading-5 text-muted-foreground">
                      By submitting this form, you are requesting an initial
                      commercial energy assessment. Any technical, financial
                      or PPA proposal would be subject to further assessment
                      and agreed commercial terms.
                    </p>
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="section bg-black text-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow text-white/60">After you submit</p>

              <h2 className="mt-3 max-w-xl text-balance font-display text-3xl font-medium md:text-5xl">
                The assessment is only the beginning.
              </h2>

              <p className="mt-5 max-w-xl text-white/60">
                Once we understand your site, we can determine which technical
                and commercial pathways are worth exploring.
              </p>
            </div>

            <div className="grid gap-3">
              {[
                "Initial project review",
                "Site and energy information assessment",
                "Solar and storage opportunity",
                "EV charging requirements",
                "Grid and export considerations",
                "Purchase, finance or PPA options",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <span className="font-mono text-xs text-white/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Not ready to submit a full assessment?"
        description="Explore our commercial solutions first and come back when you're ready."
        href="/commercial"
        cta="Explore commercial solar"
      />
    </>
  );
}