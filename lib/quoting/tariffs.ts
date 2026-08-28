import type { CalculatorInput } from "@/lib/calculator/types";
import type { TariffOption } from "./types";

/**
 * ASSUMPTIONS — illustrative UK tariff structures and 2026 indicative
 * rates, standing in for a live tariff-comparison API (e.g. an Ofgem or
 * supplier feed). Review with your commercial team before quoting these
 * rates directly to a customer; the point of this module is the
 * *selection logic* (which tariff type actually fits a given system),
 * which stays correct even if you plug in live rates later.
 */
export const TARIFF_CATALOGUE: TariffOption[] = [
  {
    id: "standard-variable",
    name: "Standard Variable",
    provider: "Typical supplier default",
    type: "standard",
    importRatePeakPence: 24.5,
    exportRatePence: 15,
    standingChargePenceDay: 30,
    bestFor: ["solar-only", "no-battery"],
  },
  {
    id: "time-of-use-flex",
    name: "Time-of-Use Flex",
    provider: "Typical time-of-use tariff",
    type: "time-of-use",
    importRatePeakPence: 27,
    importRateOffPeakPence: 9.5,
    offPeakWindow: "00:00–05:00",
    exportRatePence: 15,
    standingChargePenceDay: 32,
    bestFor: ["battery", "tariff-arbitrage"],
  },
  {
    id: "ev-overnight",
    name: "EV Overnight",
    provider: "Typical EV tariff",
    type: "ev",
    importRatePeakPence: 26,
    importRateOffPeakPence: 7.5,
    offPeakWindow: "23:30–05:30",
    exportRatePence: 15,
    standingChargePenceDay: 33,
    bestFor: ["ev", "battery"],
  },
];

/**
 * Picks the tariff that best matches what the household is actually
 * installing — the core of "tariff arbitrage" in the economics layer,
 * since a battery or EV is worth roughly double on a time-of-use tariff
 * versus a flat standard rate.
 */
export function selectBestTariff(input: CalculatorInput, hasBattery: boolean): TariffOption {
  if (input.vehicle !== "none") {
    return TARIFF_CATALOGUE.find((t) => t.id === "ev-overnight")!;
  }
  if (hasBattery) {
    return TARIFF_CATALOGUE.find((t) => t.id === "time-of-use-flex")!;
  }
  return TARIFF_CATALOGUE.find((t) => t.id === "standard-variable")!;
}

export function getAvailableTariffs(): TariffOption[] {
  return TARIFF_CATALOGUE;
}
