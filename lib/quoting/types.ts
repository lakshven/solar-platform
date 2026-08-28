import type { CalculatorInput, ScenarioId } from "@/lib/calculator/types";

// ---------------------------------------------------------------------
// 1. Satellite geometry
// ---------------------------------------------------------------------
export interface RoofFacet {
  id: string;
  label: string; // "Main roof — south-facing", "Rear extension", etc.
  areaSqm: number;
  pitchDegrees: number;
  azimuthDegrees: number; // 0 = north, 90 = east, 180 = south, 270 = west
  shadingPct: number; // 0–1, share of the facet's output lost to shading
  usable: boolean;
  maxPanels: number;
  maxKwp: number;
  yieldFactor: number; // 0–1 relative to a perfect south-facing, unshaded facet
}

export interface SatelliteAnalysis {
  facets: RoofFacet[];
  totalUsableAreaSqm: number;
  maxInstallableKwp: number;
  bestFacetAzimuth: number;
  averageShadingPct: number;
  source: "simulated" | "google-solar-api";
  confidence: number; // 0–1
}

// ---------------------------------------------------------------------
// 2. Location intelligence
// ---------------------------------------------------------------------
export interface AddressIntel {
  postcode: string;
  latitude: number;
  longitude: number;
  region: string;
  adminDistrict: string;
  resolved: boolean; // false if we fell back to a national default
}

export interface IrradianceData {
  annualKwhPerKwp: number;
  source: "pvgis" | "regional-lookup";
}

export interface DnoInfo {
  licenceArea: string;
  operator: string;
  singlePhaseExportLimitKw: number;
  g98NotificationOnly: boolean; // true if system is small enough to skip full G99 application
  typicalApprovalWeeks: number;
}

export interface TariffOption {
  id: string;
  name: string;
  provider: string;
  type: "standard" | "time-of-use" | "ev";
  importRatePeakPence: number;
  importRateOffPeakPence?: number;
  offPeakWindow?: string; // e.g. "23:30–05:30"
  exportRatePence: number;
  standingChargePenceDay: number;
  bestFor: string[]; // e.g. ["battery", "ev"]
}

export interface LocationIntelligence {
  address: AddressIntel;
  irradiance: IrradianceData;
  dno: DnoInfo;
  availableTariffs: TariffOption[];
  recommendedTariffId: string;
}

// ---------------------------------------------------------------------
// 3 + 5. System + economic intelligence (per scenario)
// ---------------------------------------------------------------------
export interface AdvancedScenario {
  id: ScenarioId;
  label: string;
  icon: string;
  components: {
    solarKwp: number;
    panelCount: number;
    batteryKwh: number;
    inverterType: "string" | "hybrid";
    evCharger: boolean;
    heatPump: "none" | "air-to-air" | "air-to-water";
  };
  installationPrice: number;
  grantApplied: number;
  estimatedAnnualGenerationKwh: number;
  selfConsumptionPct: number;
  exportedKwh: number;
  annualBillBefore: number;
  annualBillAfter: number;
  annualSaving: number;
  exportIncome: number;
  tariffArbitrageIncome: number;
  paybackYears: number | null;
  roi10Year: number; // % return over 10 years
  npv10Year: number; // GBP, discounted
  carbonReductionKg: number;
  financeMonthlyEstimate: number;
  priorityScore: number; // 0–100, this scenario's fit against the visitor's stated priorities
  reasoning: string[]; // human-readable, scenario-specific
}

// ---------------------------------------------------------------------
// 4. Behavioural intelligence
// ---------------------------------------------------------------------
export interface PriorityWeights {
  cost: number;
  independence: number;
  sustainability: number;
  resilience: number;
}

// ---------------------------------------------------------------------
// 6. Explainability
// ---------------------------------------------------------------------
export interface Explainability {
  confidenceScore: number; // 0–100
  confidenceBand: "high" | "medium" | "low";
  reasoning: string[];
  dataSources: { label: string; status: "live" | "estimated" | "fallback" }[];
}

// ---------------------------------------------------------------------
// 7. Lead intelligence
// ---------------------------------------------------------------------
export interface LeadIntelligence {
  leadScore: number; // 0–100
  tier: "hot" | "warm" | "cold";
  bundleScore: number; // 0–100, how many product lines are in play together
  predictedRevenue: number; // GBP, expected installation value
  signals: string[]; // human-readable factors that drove the score
}

// ---------------------------------------------------------------------
// Orchestrated output
// ---------------------------------------------------------------------
export interface AdvancedQuoteResult {
  input: CalculatorInput;
  address: AddressIntel;
  satellite: SatelliteAnalysis;
  location: LocationIntelligence;
  currentAnnualBill: number;
  scenarios: AdvancedScenario[];
  recommendedScenarioId: ScenarioId;
  explainability: Explainability;
  leadIntelligence: LeadIntelligence;
  generatedAt: string;
}
