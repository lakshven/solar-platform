import type { EnergyPriority } from "@/lib/calculator/types";
import type { PriorityWeights } from "./types";

const BASE_WEIGHTS: PriorityWeights = { cost: 1, independence: 1, sustainability: 1, resilience: 1 };

const PRIORITY_BOOSTS: Record<EnergyPriority, Partial<PriorityWeights>> = {
  "lower-bills": { cost: 2.2 },
  "energy-independence": { independence: 2.2, resilience: 1.2 },
  sustainability: { sustainability: 2.2 },
  "backup-power": { resilience: 2.4 },
};

/**
 * Converts the visitor's selected priority chips into a weight vector.
 * An empty selection defaults to "lower-bills" — the safest assumption
 * for someone who hasn't expressed a preference. Used by both the
 * per-scenario priority score (economics.ts) and the final
 * recommendation ranking (engine.ts).
 */
export function computePriorityWeights(priorities: EnergyPriority[]): PriorityWeights {
  const active: EnergyPriority[] = priorities.length > 0 ? priorities : ["lower-bills"];
  const weights = { ...BASE_WEIGHTS };

  for (const p of active) {
    const boost = PRIORITY_BOOSTS[p];
    for (const key of Object.keys(boost) as (keyof PriorityWeights)[]) {
      weights[key] = Math.max(weights[key], boost[key]!);
    }
  }

  return weights;
}
