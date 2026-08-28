import type { CalculatorInput } from "@/lib/calculator/types";
import type { SatelliteAnalysis } from "./types";

export interface SystemComponents {
  solarKwp: number;
  panelCount: number;
  batteryKwh: number;
  inverterType: "string" | "hybrid";
  evChargerIncluded: boolean;
  reasoning: string[];
}

const PANEL_WATT = 440;

/**
 * Sizes solar against the smaller of (a) what the roof can physically
 * hold and (b) what the household's usage justifies — oversizing a
 * system beyond the roof's real capacity, or beyond what the home can
 * plausibly use plus a sensible export margin, wastes the visitor's
 * money either way.
 */
export function sizeSolar(input: CalculatorInput, satellite: SatelliteAnalysis, includeBattery: boolean, includeEv: boolean, includeHeatPump: boolean): SystemComponents {
  const reasoning: string[] = [];

  if (input.hasExistingSolar) {
    const kwp = input.existingSolarKwp ?? 4;
    reasoning.push(`Using your existing ${kwp}kWp array rather than resizing it.`);
    return {
      solarKwp: kwp,
      panelCount: Math.round((kwp * 1000) / PANEL_WATT),
      batteryKwh: sizeBattery(input, kwp, includeEv, includeHeatPump, reasoning),
      inverterType: includeBattery ? "hybrid" : "string",
      evChargerIncluded: includeEv,
      reasoning,
    };
  }

  const roofCapKwp = satellite.maxInstallableKwp;
  // Extra load from an EV or heat pump justifies sizing solar larger,
  // up to the roof's physical limit.
  const usageDrivenKwp = (input.annualUsageKwh + (includeEv ? 2600 : 0) + (includeHeatPump ? 3200 : 0)) / 950;
  const targetKwp = Math.min(roofCapKwp, Math.max(2, usageDrivenKwp));
  const solarKwp = Math.round(targetKwp * 5) / 5;

  if (roofCapKwp > 0 && targetKwp >= roofCapKwp - 0.2) {
    reasoning.push(`Sized to your roof's usable capacity (${roofCapKwp}kWp) — your usage could support more, but the roof is the limiting factor.`);
  } else {
    reasoning.push(`Sized to your usage rather than maxing out the roof — ${solarKwp}kWp comfortably covers your annual consumption without excessive export.`);
  }

  return {
    solarKwp,
    panelCount: Math.round((solarKwp * 1000) / PANEL_WATT),
    batteryKwh: sizeBattery(input, solarKwp, includeEv, includeHeatPump, reasoning),
    inverterType: includeBattery ? "hybrid" : "string",
    evChargerIncluded: includeEv,
    reasoning,
  };
}

/**
 * Battery sizing against estimated evening/overnight demand rather than
 * a flat default — a household with high evening usage (EV, heat pump)
 * gets a bigger battery; a low-usage home doesn't get sold capacity it
 * can't discharge on a typical night.
 */
function sizeBattery(input: CalculatorInput, solarKwp: number, includeEv: boolean, includeHeatPump: boolean, reasoning: string[]): number {
  const dailyUsageKwh = input.annualUsageKwh / 365;
  // Roughly 55% of a home's daily usage falls in the evening/overnight
  // window that a battery actually serves.
  let eveningLoadKwh = dailyUsageKwh * 0.55;
  if (includeEv) eveningLoadKwh += 7; // typical overnight top-up share
  if (includeHeatPump) eveningLoadKwh += 4;

  const target = Math.min(16, Math.max(4, Math.round(eveningLoadKwh)));
  reasoning.push(`Battery sized to your estimated ${Math.round(eveningLoadKwh)}kWh evening/overnight load, not a flat default.`);
  return target;
}
