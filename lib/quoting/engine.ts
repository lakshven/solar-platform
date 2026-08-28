import type { CalculatorInput, ScenarioId } from "@/lib/calculator/types";
import type { AdvancedQuoteResult, AdvancedScenario, PriorityWeights } from "./types";
import { geocodePostcode } from "./geocode";
import { getDnoInfo } from "./dno";
import { getIrradiance } from "./irradiance";
import { getAvailableTariffs, selectBestTariff } from "./tariffs";
import { generateSatelliteAnalysis } from "./satellite";
import { sizeSolar } from "./system-design";
import { computePriorityWeights } from "./behavioural";
import { calculateEconomics, financeMonthlyEstimate } from "./economics";
import { buildExplainability } from "./explainability";
import { scoreLead } from "./lead-scoring";
import type { SatelliteAnalysis, LocationIntelligence } from "./types";

const GRID_CARBON_KG_PER_KWH = 0.19;
const HEAT_PUMP_COST = { airToAir: { cost: 5500, grant: 0 }, airToWater: { cost: 12500, grant: 7500 } };
const EV_CHARGER_COST = 1100;

interface ScenarioDef {
  id: ScenarioId;
  label: string;
  icon: string;
  includeBattery: boolean;
  includeEv: boolean;
  includeVehicleLoad: boolean;
  heatPump: "none" | "air-to-air" | "air-to-water";
}

const SCENARIO_DEFS: ScenarioDef[] = [
  { id: "solar", label: "Solar", icon: "☀️", includeBattery: false, includeEv: false, includeVehicleLoad: false, heatPump: "none" },
  { id: "solar-battery", label: "Solar + Battery", icon: "☀️🔋", includeBattery: true, includeEv: false, includeVehicleLoad: false, heatPump: "none" },
  { id: "solar-battery-phev", label: "Solar + Battery + PHEV", icon: "☀️🔋🚙", includeBattery: true, includeEv: true, includeVehicleLoad: true, heatPump: "none" },
  { id: "solar-battery-ev", label: "Solar + Battery + EV", icon: "☀️🔋🚗", includeBattery: true, includeEv: true, includeVehicleLoad: true, heatPump: "none" },
  { id: "solar-battery-ata-hp", label: "Solar + Battery + Air-to-Air Heat Pump", icon: "☀️🔋💨", includeBattery: true, includeEv: false, includeVehicleLoad: false, heatPump: "air-to-air" },
  { id: "solar-battery-atw-hp", label: "Solar + Battery + Air-to-Water Heat Pump", icon: "☀️🔋♨️", includeBattery: true, includeEv: false, includeVehicleLoad: false, heatPump: "air-to-water" },
  { id: "complete-home-energy", label: "Complete Home Energy", icon: "☀️🔋🚗♨️", includeBattery: true, includeEv: true, includeVehicleLoad: true, heatPump: "air-to-water" },
];

function selfConsumptionFor(hasBattery: boolean, hasHighLoad: boolean): number {
  if (hasBattery && hasHighLoad) return 0.72;
  if (hasBattery) return 0.6;
  return 0.35;
}

function priorityScoreFor(scenario: Pick<AdvancedScenario, "annualSaving" | "carbonReductionKg" | "components">, weights: PriorityWeights, maxSaving: number, maxCarbon: number): number {
  const costScore = maxSaving > 0 ? (scenario.annualSaving / maxSaving) * 100 : 0;
  const sustainabilityScore = maxCarbon > 0 ? (scenario.carbonReductionKg / maxCarbon) * 100 : 0;
  const independenceScore = scenario.components.batteryKwh > 0 ? Math.min(100, 40 + scenario.components.batteryKwh * 4) : 20;
  const resilienceScore = scenario.components.batteryKwh > 0 ? Math.min(100, 50 + scenario.components.batteryKwh * 3) : 10;

  const totalWeight = weights.cost + weights.independence + weights.sustainability + weights.resilience;
  const weighted =
    (costScore * weights.cost + independenceScore * weights.independence + sustainabilityScore * weights.sustainability + resilienceScore * weights.resilience) /
    totalWeight;

  return Math.round(weighted);
}

function buildScenario(def: ScenarioDef, input: CalculatorInput, satellite: SatelliteAnalysis, location: LocationIntelligence): AdvancedScenario {
  const reasoning: string[] = [];
  const system = sizeSolar(input, satellite, def.includeBattery, def.includeEv, def.heatPump !== "none");
  reasoning.push(...system.reasoning);

  const generation = system.solarKwp * location.irradiance.annualKwhPerKwp;

  let extraLoad = 0;
  if (def.includeVehicleLoad && input.vehicle !== "none" && input.annualMileage) {
    const kwh = (input.annualMileage / 1000) * 300;
    extraLoad += input.vehicle === "phev" ? kwh * 0.55 : kwh;
  }
  if (def.heatPump !== "none") {
    extraLoad += def.heatPump === "air-to-water" ? 3800 : 2600;
  }

  const totalDemand = input.annualUsageKwh + extraLoad;
  const selfConsumptionPct = selfConsumptionFor(def.includeBattery, def.includeEv || def.heatPump !== "none");
  const selfConsumedKwh = Math.min(generation * selfConsumptionPct, totalDemand);
  const exportedKwh = Math.max(0, generation - selfConsumedKwh);
  const importedKwh = Math.max(0, totalDemand - selfConsumedKwh);

  const tariff = def.includeBattery || def.includeEv ? selectBestTariff(input, def.includeBattery) : getAvailableTariffs()[0];

  const solarCost = system.solarKwp * 1550;
  const batteryCost = system.batteryKwh * 620;
  const evCost = system.evChargerIncluded ? EV_CHARGER_COST : 0;
  const hpCostGross = def.heatPump === "air-to-air" ? HEAT_PUMP_COST.airToAir.cost : def.heatPump === "air-to-water" ? HEAT_PUMP_COST.airToWater.cost : 0;
  const hpGrant = def.heatPump === "air-to-water" ? HEAT_PUMP_COST.airToWater.grant : 0;
  const installationPrice = Math.round(solarCost + batteryCost + evCost + hpCostGross - hpGrant);

  const economics = calculateEconomics({
    installationPrice,
    annualGenerationKwh: generation,
    totalDemandKwh: totalDemand,
    selfConsumedKwh,
    exportedKwh,
    importedKwh,
    hasBattery: def.includeBattery,
    tariff,
  });

  if (economics.tariffArbitrageIncome > 20) {
    reasoning.push(`On the ${tariff.name} tariff, overnight battery charging saves an estimated £${economics.tariffArbitrageIncome}/year versus charging at the peak rate.`);
  }
  if (hpGrant > 0) {
    reasoning.push(`Includes a £${hpGrant.toLocaleString()} Boiler Upgrade Scheme grant applied to the heat pump cost.`);
  }

  const carbonReductionKg = Math.round(selfConsumedKwh * GRID_CARBON_KG_PER_KWH);

  return {
    id: def.id,
    label: def.label,
    icon: def.icon,
    components: {
      solarKwp: system.solarKwp,
      panelCount: system.panelCount,
      batteryKwh: system.batteryKwh,
      inverterType: system.inverterType,
      evCharger: system.evChargerIncluded,
      heatPump: def.heatPump,
    },
    installationPrice,
    grantApplied: hpGrant,
    estimatedAnnualGenerationKwh: Math.round(generation),
    selfConsumptionPct,
    exportedKwh: Math.round(exportedKwh),
    annualBillBefore: economics.annualBillBefore,
    annualBillAfter: economics.annualBillAfter,
    annualSaving: economics.annualSaving,
    exportIncome: economics.exportIncome,
    tariffArbitrageIncome: economics.tariffArbitrageIncome,
    paybackYears: economics.paybackYears,
    roi10Year: economics.roi10Year,
    npv10Year: economics.npv10Year,
    carbonReductionKg,
    financeMonthlyEstimate: financeMonthlyEstimate(installationPrice),
    priorityScore: 0, // filled in once every scenario's saving/carbon range is known
    reasoning,
  };
}

export async function runAdvancedQuote(input: CalculatorInput): Promise<AdvancedQuoteResult> {
  const address = await geocodePostcode(input.postcode);
  const [irradiance, dno] = await Promise.all([getIrradiance(address, address.region), Promise.resolve(getDnoInfo(address))]);
  const satellite = generateSatelliteAnalysis(input, address);
  const availableTariffs = getAvailableTariffs();
  const recommendedTariffId = selectBestTariff(input, true).id;

  const location: LocationIntelligence = { address, irradiance, dno, availableTariffs, recommendedTariffId };

  const scenarios = SCENARIO_DEFS.map((def) => buildScenario(def, input, satellite, location));

  const weights = computePriorityWeights(input.priorities);
  const maxSaving = Math.max(...scenarios.map((s) => s.annualSaving));
  const maxCarbon = Math.max(...scenarios.map((s) => s.carbonReductionKg));

  for (const scenario of scenarios) {
    scenario.priorityScore = priorityScoreFor(scenario, weights, maxSaving, maxCarbon);
  }

  const recommended = [...scenarios].sort((a, b) => b.priorityScore - a.priorityScore)[0];

  const explainability = buildExplainability(address, irradiance, satellite, recommended);
  const leadIntelligence = scoreLead(input, scenarios, recommended);

  const currentAnnualBill = scenarios[0]?.annualBillBefore ?? 0;

  return {
    input,
    address,
    satellite,
    location,
    currentAnnualBill,
    scenarios,
    recommendedScenarioId: recommended.id,
    explainability,
    leadIntelligence,
    generatedAt: new Date().toISOString(),
  };
}
