import { Sparkles, Check } from "lucide-react";
import type { Explainability } from "@/lib/quoting/types";
import { Card } from "@/components/ui/card";
import { ConfidenceBadge } from "./confidence-badge";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Explainability["dataSources"][number]["status"], string> = {
  live: "bg-leaf-light text-leaf",
  estimated: "bg-volt-light text-volt",
  fallback: "bg-secondary text-muted-foreground",
};

export function ExplainabilityPanel({ explainability }: { explainability: Explainability }) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-solar" />
          <h3 className="font-display text-lg font-medium">Why we recommended this</h3>
        </div>
        <ConfidenceBadge explainability={explainability} />
      </div>

      <ul className="mt-5 space-y-2.5">
        {explainability.reasoning.map((line, i) => (
          <li key={i} className="flex gap-2.5 text-sm text-foreground/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf" />
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
        {explainability.dataSources.map((source) => (
          <span key={source.label} className={cn("rounded-full px-2.5 py-1 text-[11px] font-medium", STATUS_STYLES[source.status])}>
            {source.label} · {source.status}
          </span>
        ))}
      </div>
    </Card>
  );
}
