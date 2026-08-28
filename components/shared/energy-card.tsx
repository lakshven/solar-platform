import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface EnergyCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  accent?: "solar" | "leaf" | "volt" | "default";
  className?: string;
}

const ACCENTS: Record<NonNullable<EnergyCardProps["accent"]>, string> = {
  solar: "bg-solar-light text-solar",
  leaf: "bg-leaf-light text-leaf",
  volt: "bg-volt-light text-volt",
  default: "bg-secondary text-foreground",
};

export function EnergyCard({ icon: Icon, label, value, accent = "default", className }: EnergyCardProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <div className={cn("flex h-9 w-9 items-center justify-center rounded-full", ACCENTS[accent])}>
        <Icon className="h-4.5 w-4.5" />
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-2xl font-medium">{value}</p>
    </div>
  );
}
