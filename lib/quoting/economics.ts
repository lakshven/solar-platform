import type { TariffOption } from "./types";

export interface EconomicInputs {
  installationPrice: number;
  annualGenerationKwh: number;
  totalDemandKwh: number;
  selfConsumedKwh: number;
  exportedKwh: number;
  importedKwh: number;
  hasBattery: boolean;
  tariff: TariffOption;
}

export interface EconomicOutputs {
  annualBillBefore: number;
  annualBillAfter: number;
  annualSaving: number;
  exportIncome: number;
  tariffArbitrageIncome: number;
  paybackYears: number | null;
  roi10Year: number;
  npv10Year: number;
}

const DISCOUNT_RATE = 0.05; // used for the 10-year NPV estimate
const ELECTRICITY_INFLATION = 0.03; // assumed annual rise in grid electricity prices

function annuityMonthlyPayment(principal: number, apr: number, years: number) {
  if (principal <= 0) return 0;
  const r = apr / 12;
  const n = years * 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

export function calculateEconomics(inputs: EconomicInputs): EconomicOutputs {
  const { installationPrice, totalDemandKwh, exportedKwh, importedKwh, hasBattery, tariff } = inputs;

  const standingChargeAnnual = (tariff.standingChargePenceDay * 365) / 100;
  const flatBillBefore = (totalDemandKwh * tariff.importRatePeakPence) / 100 + standingChargeAnnual;

  let importCost: number;
  let tariffArbitrageIncome = 0;

  if (tariff.type !== "standard" && tariff.importRateOffPeakPence !== undefined && hasBattery) {
    // With a battery on a time-of-use tariff, assume the battery covers
    // most of the overnight top-up at the off-peak rate, and remaining
    // grid import happens at the peak rate. The "arbitrage income" is the
    // saving from charging cheap and displacing expensive peak import,
    // isolated from the plain self-consumption saving so it's visible on
    // its own line.
    const batteryChargeFromGridKwh = Math.min(importedKwh, 5.5); // typical nightly top-up
    const remainingImportKwh = Math.max(0, importedKwh - batteryChargeFromGridKwh);
    importCost =
      (batteryChargeFromGridKwh * tariff.importRateOffPeakPence) / 100 +
      (remainingImportKwh * tariff.importRatePeakPence) / 100;

    const arbitrageBaseline = (batteryChargeFromGridKwh * tariff.importRatePeakPence) / 100;
    const arbitrageActual = (batteryChargeFromGridKwh * tariff.importRateOffPeakPence) / 100;
    tariffArbitrageIncome = Math.max(0, arbitrageBaseline - arbitrageActual);
  } else {
    importCost = (importedKwh * tariff.importRatePeakPence) / 100;
  }

  const exportIncome = (exportedKwh * tariff.exportRatePence) / 100;
  const billAfter = importCost + standingChargeAnnual - exportIncome;
  const annualSaving = Math.max(0, flatBillBefore - billAfter);

  const paybackYears = annualSaving > 0 ? Math.round((installationPrice / annualSaving) * 10) / 10 : null;

  // 10-year NPV: saving grows with assumed electricity inflation, then
  // each year's saving is discounted back to present value.
  let npv = -installationPrice;
  for (let year = 1; year <= 10; year++) {
    const yearSaving = annualSaving * Math.pow(1 + ELECTRICITY_INFLATION, year - 1);
    npv += yearSaving / Math.pow(1 + DISCOUNT_RATE, year);
  }

  const totalNominalSaving10Year = Array.from({ length: 10 }, (_, i) => annualSaving * Math.pow(1 + ELECTRICITY_INFLATION, i)).reduce(
    (a, b) => a + b,
    0
  );
  const roi10Year = installationPrice > 0 ? Math.round(((totalNominalSaving10Year - installationPrice) / installationPrice) * 100) : 0;

  return {
    annualBillBefore: Math.round(flatBillBefore),
    annualBillAfter: Math.round(billAfter),
    annualSaving: Math.round(annualSaving),
    exportIncome: Math.round(exportIncome),
    tariffArbitrageIncome: Math.round(tariffArbitrageIncome),
    paybackYears,
    roi10Year,
    npv10Year: Math.round(npv),
  };
}

export function financeMonthlyEstimate(installationPrice: number, apr = 0.069, years = 10) {
  return Math.round(annuityMonthlyPayment(installationPrice, apr, years));
}
