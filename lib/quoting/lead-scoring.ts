import type { CalculatorInput } from "@/lib/calculator/types";
import type { AdvancedScenario, LeadIntelligence } from "./types";

/**
 * Scores the visitor as a sales lead, not just a saving estimate. This is
 * the piece that should flow into your CRM/lead list so your team can
 * prioritise outreach — see app/api/calculate-savings/route.ts, which
 * persists leadScore and predictedRevenue directly onto the `leads` row.
 */
export function scoreLead(input: CalculatorInput, scenarios: AdvancedScenario[], recommended: AdvancedScenario): LeadIntelligence {
  const signals: string[] = [];
  let score = 0;

  // Bill size — bigger bills mean bigger potential savings, which
  // correlates strongly with conversion likelihood.
  const billBefore = recommended.annualBillBefore;
  if (billBefore > 2200) {
    score += 25;
    signals.push("High annual electricity bill — strong savings incentive");
  } else if (billBefore > 1400) {
    score += 15;
    signals.push("Above-average annual electricity bill");
  } else {
    score += 5;
  }

  // Multi-product intent — an EV or heat pump alongside solar is a much
  // bigger job than solar alone.
  let productLines = 1; // solar is always in play
  if (input.vehicle !== "none") {
    productLines++;
    score += 15;
    signals.push(`${input.vehicle === "ev" ? "Full EV" : "PHEV"} owner — EV charging bundle opportunity`);
  }
  if (input.heatingSystem !== "heat-pump") {
    score += 5; // still has an old system to potentially replace
  }
  if (recommended.components.heatPump !== "none") {
    productLines++;
    score += 15;
    signals.push("Heat pump included in recommended scenario — high-value bundle");
  }
  if (recommended.components.batteryKwh > 0) {
    productLines++;
    score += 10;
    signals.push("Battery storage included — stronger margin, stronger retention");
  }

  // Existing solar without a battery is a classic high-conversion
  // retrofit lead — smaller job, fast decision, proven interest already.
  if (input.hasExistingSolar && !input.hasExistingBattery) {
    score += 15;
    signals.push("Existing solar without a battery — strong retrofit-battery fit");
  }

  // Roof suitability confidence
  if (input.roofSuitability === "excellent" || input.roofSuitability === "good") {
    score += 10;
    signals.push("Good roof suitability — low technical risk to close");
  } else if (input.roofSuitability === "limited") {
    score -= 5;
    signals.push("Limited roof suitability — may need a more tailored design conversation");
  }

  // Priority clarity — someone who selected specific priorities has
  // thought about this more than someone who left the default.
  if (input.priorities.length >= 2) {
    score += 5;
    signals.push("Selected multiple clear priorities — engaged, considered enquiry");
  }

  score = Math.max(0, Math.min(100, Math.round(score)));
  const tier: LeadIntelligence["tier"] = score >= 65 ? "hot" : score >= 40 ? "warm" : "cold";

  const bundleScore = Math.min(100, Math.round((productLines / 4) * 100));

  // Predicted revenue: recommended scenario's price, nudged by how
  // likely the full bundle actually converts vs a smaller job.
  const conversionConfidence = 0.55 + (score / 100) * 0.35;
  const predictedRevenue = Math.round(recommended.installationPrice * conversionConfidence);

  return { leadScore: score, tier, bundleScore, predictedRevenue, signals };
}
