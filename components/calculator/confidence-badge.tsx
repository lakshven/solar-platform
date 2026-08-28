import { ShieldCheck, ShieldAlert, ShieldQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Explainability } from "@/lib/quoting/types";

const BAND_STYLES: Record<Explainability["confidenceBand"], { classes: string; icon: typeof ShieldCheck; label: string }> = {
  high: { classes: "bg-leaf-light text-leaf", icon: ShieldCheck, label: "High confidence" },
  medium: { classes: "bg-solar-light text-solar", icon: ShieldQuestion, label: "Medium confidence" },
  low: { classes: "bg-destructive/10 text-destructive", icon: ShieldAlert, label: "Low confidence" },
};

export function ConfidenceBadge({ explainability, className }: { explainability: Explainability; className?: string }) {
  const style = BAND_STYLES[explainability.confidenceBand];
  const Icon = style.icon;

  return (
    <div className={cn("inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium", style.classes, className)}>
      <Icon className="h-3.5 w-3.5" />
      {style.label} · {explainability.confidenceScore}%
    </div>
  );
}
