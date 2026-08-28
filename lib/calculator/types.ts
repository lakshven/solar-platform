export type PropertyType = "detached" | "semi-detached" | "terraced" | "bungalow" | "flat";

export type RoofSuitability = "excellent" | "good" | "limited" | "unknown";

export type HeatingSystem = "gas-boiler" | "oil-boiler" | "electric" | "heat-pump" | "other";

export type VehicleType = "none" | "phev" | "ev";

export type EnergyPriority = "lower-bills" | "energy-independence" | "sustainability" | "backup-power";

export interface CalculatorInput {
  postcode: string;
  propertyType: PropertyType;
  annualUsageKwh: number; // kWh/year
  currentTariffPencePerKwh: number; // p/kWh, standard variable ~ 24.5
  roofSuitability: RoofSuitability;
  hasExistingSolar: boolean;
  existingSolarKwp?: number;
  hasExistingBattery: boolean;
  vehicle: VehicleType;
  annualMileage?: number; // only relevant if vehicle !== 'none'
  heatingSystem: HeatingSystem;
  priorities: EnergyPriority[];
}

export type ScenarioId =
  | "solar"
  | "solar-battery"
  | "solar-battery-phev"
  | "solar-battery-ev"
  | "solar-battery-ata-hp"
  | "solar-battery-atw-hp"
  | "complete-home-energy";

export interface ScenarioResult {
  id: ScenarioId;
  label: string;
  icon: string; // emoji, used as a lightweight visual marker
  components: {
    solarKwp: number;
    batteryKwh: number;
    evCharger: boolean;
    heatPump: "none" | "air-to-air" | "air-to-water";
  };
  installationPrice: number; // GBP, after applicable grants
  grantApplied: number; // GBP
  estimatedAnnualGenerationKwh: number;
  selfConsumptionPct: number; // 0-1
  exportedKwh: number;
  annualBillBefore: number; // GBP
  annualBillAfter: number; // GBP
  annualSaving: number; // GBP
  paybackYears: number | null;
  carbonReductionKg: number;
  financeMonthlyEstimate: number; // GBP/month over 10 years, indicative
}

export interface CalculatorOutput {
  input: CalculatorInput;
  currentAnnualBill: number;
  scenarios: ScenarioResult[];
  recommendedScenarioId: ScenarioId;
  generatedAt: string;
}
