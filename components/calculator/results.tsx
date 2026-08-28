"use client";

import { useState } from "react";
import { Sun, BatteryCharging, TrendingDown, Leaf, Wallet, ArrowRight, LineChart, ArrowUpRight } from "lucide-react";
import type { AdvancedQuoteResult } from "@/lib/quoting/types";
import { ScenarioCard } from "./scenario-card";
import { RoofAnalysisCard } from "./roof-analysis-card";
import { LocationIntelligenceCard } from "./location-intelligence-card";
import { ExplainabilityPanel } from "./explainability-panel";
import { EnergyCard } from "@/components/shared/energy-card";
import { Button } from "@/components/ui/button";
import { formatGBP, formatKwh } from "@/lib/utils";

export function Results({ output, onGetQuote }: { output: AdvancedQuoteResult; onGetQuote: (scenarioId: string) => void }) {
  const [selectedId, setSelectedId] = useState(output.recommendedScenarioId);
  const selected = output.scenarios.find((s) => s.id === selectedId) ?? output.scenarios[0];

  return (
    <div>
      <div className="rounded-3xl bg-secondary/70 p-6 md:p-10">
        <p className="eyebrow">We&apos;ve modelled your home</p>
        <div className="mt-3 flex flex-wrap items-end gap-x-10 gap-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Your current home</p>
            <p className="font-display text-3xl font-medium text-muted-foreground line-through decoration-2">
              {formatGBP(output.currentAnnualBill)}
              <span className="text-sm font-sans font-normal">/year</span>
            </p>
          </div>
          <ArrowRight className="mb-2 h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-sm text-muted-foreground">With {selected.label.toLowerCase()}</p>
            <p className="font-display text-4xl font-medium text-leaf">
              {formatGBP(selected.annualBillAfter)}
              <span className="text-sm font-sans font-normal text-muted-foreground">/year</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <RoofAnalysisCard satellite={output.satellite} />
        <LocationIntelligenceCard location={output.location} />
      </div>

      <p className="mt-10 text-sm font-medium text-muted-foreground">Compare your options — tap a card</p>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {output.scenarios.map((s) => (
          <ScenarioCard
            key={s.id}
            scenario={s}
            isRecommended={s.id === output.recommendedScenarioId}
            isSelected={s.id === selected.id}
            onSelect={() => setSelectedId(s.id)}
          />
        ))}
      </div>

      <div className="mt-8">
        <ExplainabilityPanel explainability={output.explainability} />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        <EnergyCard icon={Sun} label="Annual generation" value={formatKwh(selected.estimatedAnnualGenerationKwh)} accent="solar" />
        <EnergyCard icon={BatteryCharging} label="Self-consumption" value={`${Math.round(selected.selfConsumptionPct * 100)}%`} accent="leaf" />
        <EnergyCard icon={TrendingDown} label="Estimated payback" value={selected.paybackYears ? `${selected.paybackYears} years` : "—"} accent="volt" />
        <EnergyCard icon={Leaf} label="CO₂ reduction" value={`${selected.carbonReductionKg} kg/yr`} accent="default" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <EnergyCard icon={ArrowUpRight} label="Export income" value={`${formatGBP(selected.exportIncome)}/yr`} accent="volt" />
        <EnergyCard icon={LineChart} label="Tariff arbitrage" value={selected.tariffArbitrageIncome > 0 ? `${formatGBP(selected.tariffArbitrageIncome)}/yr` : "—"} accent="leaf" />
        <EnergyCard icon={TrendingDown} label="10-year ROI" value={`${selected.roi10Year}%`} accent="solar" />
        <EnergyCard icon={Wallet} label="10-year net value" value={formatGBP(selected.npv10Year)} accent="default" />
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-card p-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-solar-light text-solar">
            <Wallet className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium">From {formatGBP(selected.financeMonthlyEstimate)}/month</p>
            <p className="text-xs text-muted-foreground">
              Indicative finance estimate, {formatGBP(selected.installationPrice)} spread over 10 years — subject to eligibility.
            </p>
          </div>
        </div>
        <Button size="lg" variant="accent" onClick={() => onGetQuote(selected.id)}>
          Get my detailed quote <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        Figures are modelled from your actual postcode, roof details and usage — see &ldquo;Why we recommended
        this&rdquo; above for exactly which data is live versus estimated. Your detailed quote will confirm exact
        pricing after a survey.
      </p>
    </div>
  );
}
