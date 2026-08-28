"use client";

import { API_URL } from "@/lib/api-url";

import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CalculatorInput, EnergyPriority } from "@/lib/calculator/types";
import type { AdvancedQuoteResult } from "@/lib/quoting/types";

const Results = dynamic(
  () => import("./results").then((module) => module.Results),
  {
    loading: () => <div className="min-h-[420px] animate-pulse rounded-3xl bg-secondary/50" />,
  }
);

const TOTAL_STEPS = 3;

const UK_POSTCODE_REGEX = /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i;

const LOADING_STAGES = [
  "Resolving your postcode and location…",
  "Analysing your roof geometry…",
  "Checking irradiance and grid capacity for your area…",
  "Sizing your system and matching the best tariff…",
  "Scoring your options against your priorities…",
];

const PRIORITY_OPTIONS: { value: EnergyPriority; label: string }[] = [
  { value: "lower-bills", label: "Lower bills" },
  { value: "energy-independence", label: "Energy independence" },
  { value: "sustainability", label: "Sustainability" },
  { value: "backup-power", label: "Backup power" },
];

const emptyInput: CalculatorInput = {
  postcode: "",
  propertyType: "detached",
  annualUsageKwh: 4200,
  currentTariffPencePerKwh: 24.5,
  roofSuitability: "unknown",
  hasExistingSolar: false,
  hasExistingBattery: false,
  vehicle: "none",
  heatingSystem: "gas-boiler",
  priorities: ["lower-bills"],
};

type Stage = "form" | "loading" | "results" | "quote-sent";

export function Calculator() {
  const [step, setStep] = useState(1);
  const [stage, setStage] = useState<Stage>("form");
  const [input, setInput] = useState<CalculatorInput>(emptyInput);
  const [output, setOutput] = useState<AdvancedQuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [quoteForm, setQuoteForm] = useState({ fullName: "", email: "", phone: "" });
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [submittingQuote, setSubmittingQuote] = useState(false);
  const [loadingStageIndex, setLoadingStageIndex] = useState(0);
  const [postcodeError, setPostcodeError] = useState<string | null>(null);

  function set<K extends keyof CalculatorInput>(key: K, value: CalculatorInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function togglePriority(p: EnergyPriority) {
    setInput((prev) => ({
      ...prev,
      priorities: prev.priorities.includes(p) ? prev.priorities.filter((x) => x !== p) : [...prev.priorities, p],
    }));
  }

  async function runCalculation() {
    setStage("loading");
    setError(null);
    setLoadingStageIndex(0);

    const interval = setInterval(() => {
      setLoadingStageIndex((i) => Math.min(LOADING_STAGES.length - 1, i + 1));
    }, 900);

    try {
      const res = await fetch(`${API_URL}/api/calculate-savings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error("Could not calculate your savings. Please check your details and try again.");
      const data: AdvancedQuoteResult = await res.json();
      setOutput(data);
      setStage("results");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
      setStage("form");
    } finally {
      clearInterval(interval);
    }
  }

  async function submitQuoteRequest(scenarioId: string) {
    setSelectedScenarioId(scenarioId);
    setSubmittingQuote(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "check-your-savings",
          fullName: quoteForm.fullName,
          email: quoteForm.email,
          phone: quoteForm.phone,
          postcode: input.postcode,
          marketingOptIn: true,
          notes: `Requested scenario: ${scenarioId}. Lead score: ${output?.leadIntelligence.leadScore ?? "n/a"}.`,
        }),
      });

      if (!response.ok) {
        throw new Error("We couldn't send your quote request. Please try again.");
      }

      setStage("quote-sent");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "We couldn't send your quote request. Please try again."
      );
      setStage("results");
    } finally {
      setSubmittingQuote(false);
    }
  }

  if (stage === "results" && output) {
    return (
      <div>
        <Results output={output} onGetQuote={() => document.getElementById("get-quote")?.scrollIntoView({ behavior: "smooth" })} />
        <div id="get-quote" className="mt-14 rounded-2xl border border-border bg-card p-6 md:p-8">
          <h3 className="font-display text-xl font-medium">Get my detailed quote</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll follow up to confirm details and arrange a survey — no obligation.
          </p>
          {error && (
            <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
              {error}
            </p>
          )}
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="fullName">Full name</Label>
              <Input id="fullName" className="mt-1.5" value={quoteForm.fullName} onChange={(e) => setQuoteForm((f) => ({ ...f, fullName: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" className="mt-1.5" value={quoteForm.email} onChange={(e) => setQuoteForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" className="mt-1.5" value={quoteForm.phone} onChange={(e) => setQuoteForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
          </div>
          <Button
            size="lg"
            variant="accent"
            className="mt-6"
            disabled={
              submittingQuote || !quoteForm.fullName.trim() || !quoteForm.email.trim()
            }
            onClick={() => submitQuoteRequest(output.recommendedScenarioId)}
          >
            {submittingQuote && <Loader2 className="h-4 w-4 animate-spin" />}
            {submittingQuote ? "Sending..." : "Request my quote"}
          </Button>
        </div>
      </div>
    );
  }

  if (stage === "quote-sent") {
    return (
      <div className="flex flex-col items-center rounded-3xl bg-secondary/70 px-8 py-16 text-center">
        <CheckCircle2 className="h-10 w-10 text-leaf" />
        <h3 className="mt-4 font-display text-2xl font-medium">Thanks, {quoteForm.fullName.split(" ")[0]}.</h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          We&apos;ve got your details for the {selectedScenarioId?.replace(/-/g, " ")} system. A member of the team will
          be in touch within one working day to arrange your survey.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <Progress value={(step / TOTAL_STEPS) * 100} className="flex-1" />
        <span className="whitespace-nowrap text-xs text-muted-foreground">Step {step} of {TOTAL_STEPS}</span>
      </div>

      {error && <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">{error}</p>}

      {step === 1 && (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-medium">Tell us about your home</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Postcode">
              <Input
                placeholder="KT2 5AU"
                value={input.postcode}
                onChange={(e) => {
                  set("postcode", e.target.value.toUpperCase());
                  setPostcodeError(null);
                }}
                onBlur={() => {
                  if (input.postcode && !UK_POSTCODE_REGEX.test(input.postcode)) {
                    setPostcodeError("That doesn't look like a valid UK postcode — double check it?");
                  }
                }}
              />
              {postcodeError && <p className="mt-1.5 text-xs text-destructive">{postcodeError}</p>}
            </Field>
            <Field label="Home type">
              <Select value={input.propertyType} onValueChange={(v) => set("propertyType", v as CalculatorInput["propertyType"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="detached">Detached</SelectItem>
                  <SelectItem value="semi-detached">Semi-detached</SelectItem>
                  <SelectItem value="terraced">Terraced</SelectItem>
                  <SelectItem value="bungalow">Bungalow</SelectItem>
                  <SelectItem value="flat">Flat</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Annual electricity usage (kWh)">
              <Input type="number" value={input.annualUsageKwh} onChange={(e) => set("annualUsageKwh", Number(e.target.value))} />
            </Field>
            <Field label="Current tariff (p/kWh)">
              <Input type="number" step="0.1" value={input.currentTariffPencePerKwh} onChange={(e) => set("currentTariffPencePerKwh", Number(e.target.value))} />
            </Field>
            <Field label="Roof suitability">
              <Select value={input.roofSuitability} onValueChange={(v) => set("roofSuitability", v as CalculatorInput["roofSuitability"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">Excellent — large, south-facing, unshaded</SelectItem>
                  <SelectItem value="good">Good — some shading or a smaller roof</SelectItem>
                  <SelectItem value="limited">Limited — small, shaded or complex roof</SelectItem>
                  <SelectItem value="unknown">Not sure</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="mt-8 flex justify-end">
            <Button size="lg" onClick={() => setStep(2)} disabled={!input.postcode || !UK_POSTCODE_REGEX.test(input.postcode)}>
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8">
          <h2 className="font-display text-2xl font-medium">How do you use energy?</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Field label="Existing solar?">
              <ToggleRow value={input.hasExistingSolar} onChange={(v) => set("hasExistingSolar", v)} />
            </Field>
            <Field label="Existing battery?">
              <ToggleRow value={input.hasExistingBattery} onChange={(v) => set("hasExistingBattery", v)} />
            </Field>
            <Field label="Vehicle">
              <Select value={input.vehicle} onValueChange={(v) => set("vehicle", v as CalculatorInput["vehicle"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No EV or PHEV</SelectItem>
                  <SelectItem value="phev">Plug-in hybrid (PHEV)</SelectItem>
                  <SelectItem value="ev">Fully electric (EV)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            {input.vehicle !== "none" && (
              <Field label="Annual mileage">
                <Input type="number" value={input.annualMileage ?? ""} onChange={(e) => set("annualMileage", Number(e.target.value))} />
              </Field>
            )}
            <Field label="Heating system">
              <Select value={input.heatingSystem} onValueChange={(v) => set("heatingSystem", v as CalculatorInput["heatingSystem"])}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="gas-boiler">Gas boiler</SelectItem>
                  <SelectItem value="oil-boiler">Oil boiler</SelectItem>
                  <SelectItem value="electric">Electric heating</SelectItem>
                  <SelectItem value="heat-pump">Already have a heat pump</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>

          <div className="mt-6">
            <Label>Energy priorities</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRIORITY_OPTIONS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => togglePriority(p.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    input.priorities.includes(p.value) ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-secondary"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <Button size="lg" variant="outline" onClick={() => setStep(1)}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button size="lg" onClick={runCalculation}>
              See my results <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {stage === "loading" && (
        <div className="mt-16 flex flex-col items-center justify-center gap-5 py-16 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <div className="space-y-2">
            {LOADING_STAGES.map((label, i) => (
              <p
                key={label}
                className={
                  i < loadingStageIndex
                    ? "text-sm text-leaf"
                    : i === loadingStageIndex
                    ? "text-sm font-medium text-foreground"
                    : "text-sm text-muted-foreground/50"
                }
              >
                {i < loadingStageIndex ? "✓ " : ""}
                {label}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function ToggleRow({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onChange(true)}
        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium ${value ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-secondary"}`}
      >
        Yes
      </button>
      <button
        onClick={() => onChange(false)}
        className={`flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium ${!value ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-secondary"}`}
      >
        No
      </button>
    </div>
  );
}
