import { cn, formatGBP, formatKwh } from "@/lib/utils";
import type { AdvancedScenario } from "@/lib/quoting/types";
import { Badge } from "@/components/ui/badge";

export function ScenarioCard({
  scenario,
  isRecommended,
  isSelected,
  onSelect,
}: {
  scenario: AdvancedScenario;
  isRecommended: boolean;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "flex w-full flex-col rounded-2xl border p-5 text-left transition-all",
        isSelected ? "border-primary bg-primary text-primary-foreground shadow-md" : "border-border bg-card hover:border-primary/40"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-2xl leading-none">{scenario.icon}</span>
        {isRecommended && (
          <Badge variant={isSelected ? "outline" : "leaf"} className={isSelected ? "border-cream/40 text-cream" : ""}>
            Recommended
          </Badge>
        )}
      </div>

      <h3 className="mt-3 font-display text-base font-medium leading-snug">{scenario.label}</h3>

      <p className={cn("mt-3 font-display text-2xl font-medium", isSelected ? "text-accent" : "")}>
        {formatGBP(scenario.annualSaving)}
        <span className={cn("ml-1 text-xs font-sans font-normal", isSelected ? "text-cream/70" : "text-muted-foreground")}>
          /year saved
        </span>
      </p>

      <dl className={cn("mt-4 space-y-1.5 text-xs", isSelected ? "text-cream/75" : "text-muted-foreground")}>
        <Row label="Installation" value={formatGBP(scenario.installationPrice)} />
        <Row label="Annual generation" value={formatKwh(scenario.estimatedAnnualGenerationKwh)} />
        <Row label="Payback" value={scenario.paybackYears ? `${scenario.paybackYears} yrs` : "—"} />
        <Row label="Fit for your priorities" value={`${scenario.priorityScore}/100`} />
      </dl>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
