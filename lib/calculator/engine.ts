import type {
  CalculatorInput,
  CalculatorOutput,
  EnergyPriority,
  ScenarioId,
  ScenarioResult,
} from "./types";

/**
 * ASSUMPTIONS — this is the single place that should change when your
 * costs, grants or tariff model change. Everything below is indicative
 * (UK, 2026) and should be reviewed by your commercial team before use
 * in a live quote. Nothing here is a binding price.
 */
export const ASSUMPTIONS = {
  solar: {
    costPerKwp: 1550, // GBP installed, blended for 4-6kWp systems
    generationPerKwpPerYear: 950, // kWh/kWp/year, South East England
    maxRoofKwp: { excellent: 8, good: 6, limited: 3.5, unknown: 5 },
  },
  battery: {
    costPerKwh: 620, // GBP installed
    roundTripEfficiency: 0.9,
    defaultSizeKwh: 10,
  },
  evCharger: { cost: 1100 },
  heatPump: {
    airToAir: { cost: 5500, grant: 0 },
    airToWater: { cost: 12500, grant: 7500 }, // Boiler Upgrade Scheme-style grant
  },
  tariff: {
    importPencePerKwh: 24.5, // fallback if user doesn't supply their own
    exportPencePerKwh: 15, // smart export guarantee style rate
    standingChargeGbpPerYear: 110,
  },
  carbon: { gridKgCo2PerKwh: 0.19 },
  finance: { apr: 0.069, termYears: 10 },
  ev: { kwhPer1000Miles: 300, phevElectricShare: 0.55 },
} as const;

function annuityMonthlyPayment(principal: number, apr: number, years: number) {
  if (principal <= 0) return 0;
  const r = apr / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

function solarSizeForRoof(input: CalculatorInput): number {
  const cap = ASSUMPTIONS.solar.maxRoofKwp[input.roofSuitability];
  // Size roughly to cover usage, capped by roof and rounded to nearest 0.2kWp.
  const usageDrivenKwp = input.annualUsageKwh / ASSUMPTIONS.solar.generationPerKwpPerYear;
  const sized = Math.min(cap, Math.max(2, usageDrivenKwp));
  return Math.round(sized * 5) / 5;
}

function selfConsumptionFor(hasBattery: boolean, hasEvOrHp: boolean): number {
  if (hasBattery && hasEvOrHp) return 0.72;
  if (hasBattery) return 0.6;
  return 0.35; // solar-only, exports the rest
}

function extraLoadKwh(input: CalculatorInput, includeVehicle: boolean, heatPump: "none" | "air-to-air" | "air-to-water") {
  let extra = 0;
  if (includeVehicle && input.vehicle !== "none" && input.annualMileage) {
    const kwh = (input.annualMileage / 1000) * ASSUMPTIONS.ev.kwhPer1000Miles;
    extra += input.vehicle === "phev" ? kwh * ASSUMPTIONS.ev.phevElectricShare : kwh;
  }
  if (heatPump !== "none") {
    // Rough uplift vs a gas boiler baseline already embedded in annualUsageKwh.
    extra += heatPump === "air-to-water" ? 3800 : 2600;
  }
  return extra;
}

function buildScenario(
  id: ScenarioId,
  label: string,
  icon: string,
  input: CalculatorInput,
  opts: {
    solarKwp: number;
    batteryKwh: number;
    evCharger: boolean;
    heatPump: "none" | "air-to-air" | "air-to-water";
    includeVehicleLoad: boolean;
  }
): ScenarioResult {
  const { solarKwp, batteryKwh, evCharger, heatPump, includeVehicleLoad } = opts;

  const generation = solarKwp * ASSUMPTIONS.solar.generationPerKwpPerYear;
  const totalDemand = input.annualUsageKwh + extraLoadKwh(input, includeVehicleLoad, heatPump);

  const selfConsumptionPct = selfConsumptionFor(batteryKwh > 0, evCharger || heatPump !== "none");
  const selfConsumedKwh = Math.min(generation * selfConsumptionPct, totalDemand);
  const exportedKwh = Math.max(0, generation - selfConsumedKwh);
  const importedKwh = Math.max(0, totalDemand - selfConsumedKwh);

  const importRate = input.currentTariffPencePerKwh || ASSUMPTIONS.tariff.importPencePerKwh;
  const standingCharge = ASSUMPTIONS.tariff.standingChargeGbpPerYear;

  const billBefore = (totalDemand * importRate) / 100 + standingCharge;
  const billAfter =
    (importedKwh * importRate) / 100 +
    standingCharge -
    (exportedKwh * ASSUMPTIONS.tariff.exportPencePerKwh) / 100;

  const solarCost = solarKwp * ASSUMPTIONS.solar.costPerKwp;
  const batteryCost = batteryKwh * ASSUMPTIONS.battery.costPerKwh;
  const evCost = evCharger ? ASSUMPTIONS.evCharger.cost : 0;
  const hpCostGross = heatPump === "air-to-air" ? ASSUMPTIONS.heatPump.airToAir.cost : heatPump === "air-to-water" ? ASSUMPTIONS.heatPump.airToWater.cost : 0;
  const hpGrant = heatPump === "air-to-water" ? ASSUMPTIONS.heatPump.airToWater.grant : 0;

  const installationPrice = Math.round(solarCost + batteryCost + evCost + hpCostGross - hpGrant);
  const annualSaving = Math.max(0, billBefore - billAfter);
  const paybackYears = annualSaving > 0 ? Math.round((installationPrice / annualSaving) * 10) / 10 : null;
  const carbonReductionKg = Math.round(selfConsumedKwh * ASSUMPTIONS.carbon.gridKgCo2PerKwh);

  const financeMonthlyEstimate = Math.round(
    annuityMonthlyPayment(installationPrice, ASSUMPTIONS.finance.apr, ASSUMPTIONS.finance.termYears)
  );

  return {
    id,
    label,
    icon,
    components: { solarKwp, batteryKwh, evCharger, heatPump },
    installationPrice,
    grantApplied: hpGrant,
    estimatedAnnualGenerationKwh: Math.round(generation),
    selfConsumptionPct,
    exportedKwh: Math.round(exportedKwh),
    annualBillBefore: Math.round(billBefore),
    annualBillAfter: Math.round(billAfter),
    annualSaving: Math.round(annualSaving),
    paybackYears,
    carbonReductionKg,
    financeMonthlyEstimate,
  };
}

function recommend(input: CalculatorInput, scenarios: ScenarioResult[]): ScenarioId {
  const priorities: EnergyPriority[] = input.priorities?.length ? input.priorities : ["lower-bills"];

  if (priorities.includes("energy-independence") || priorities.includes("backup-power")) {
    return input.vehicle !== "none" ? "solar-battery-ev" : "solar-battery";
  }
  if (priorities.includes("sustainability") && input.heatingSystem !== "heat-pump") {
    return "solar-battery-atw-hp";
  }
  // Default: best £/year saving relative to install cost, i.e. shortest payback.
  const ranked = [...scenarios].sort((a, b) => (a.paybackYears ?? 99) - (b.paybackYears ?? 99));
  return ranked[0]?.id ?? "solar-battery";
}

export function runCalculator(input: CalculatorInput): CalculatorOutput {
  const solarKwp = input.hasExistingSolar ? input.existingSolarKwp ?? 0 : solarSizeForRoof(input);
  const battery = ASSUMPTIONS.battery.defaultSizeKwh;

  const scenarios: ScenarioResult[] = [
    buildScenario("solar", "Solar", "☀️", input, { solarKwp, batteryKwh: 0, evCharger: false, heatPump: "none", includeVehicleLoad: false }),
    buildScenario("solar-battery", "Solar + Battery", "☀️🔋", input, { solarKwp, batteryKwh: battery, evCharger: false, heatPump: "none", includeVehicleLoad: false }),
    buildScenario("solar-battery-phev", "Solar + Battery + PHEV", "☀️🔋🚙", input, { solarKwp, batteryKwh: battery, evCharger: true, heatPump: "none", includeVehicleLoad: true }),
    buildScenario("solar-battery-ev", "Solar + Battery + EV", "☀️🔋🚗", input, { solarKwp, batteryKwh: battery, evCharger: true, heatPump: "none", includeVehicleLoad: true }),
    buildScenario("solar-battery-ata-hp", "Solar + Battery + Air-to-Air Heat Pump", "☀️🔋💨", input, { solarKwp, batteryKwh: battery, evCharger: false, heatPump: "air-to-air", includeVehicleLoad: false }),
    buildScenario("solar-battery-atw-hp", "Solar + Battery + Air-to-Water Heat Pump", "☀️🔋♨️", input, { solarKwp, batteryKwh: battery, evCharger: false, heatPump: "air-to-water", includeVehicleLoad: false }),
    buildScenario("complete-home-energy", "Complete Home Energy", "☀️🔋🚗♨️", input, { solarKwp, batteryKwh: battery + 3, evCharger: input.vehicle !== "none", heatPump: "air-to-water", includeVehicleLoad: true }),
  ];

  const currentAnnualBill = Math.round(
    (input.annualUsageKwh * (input.currentTariffPencePerKwh || ASSUMPTIONS.tariff.importPencePerKwh)) / 100 +
      ASSUMPTIONS.tariff.standingChargeGbpPerYear
  );

  return {
    input,
    currentAnnualBill,
    scenarios,
    recommendedScenarioId: recommend(input, scenarios),
    generatedAt: new Date().toISOString(),
  };
}
