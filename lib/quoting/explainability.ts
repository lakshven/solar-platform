import type { AddressIntel, IrradianceData, SatelliteAnalysis, AdvancedScenario, Explainability } from "./types";

export function buildExplainability(
  address: AddressIntel,
  irradiance: IrradianceData,
  satellite: SatelliteAnalysis,
  recommended: AdvancedScenario
): Explainability {
  const dataSources: Explainability["dataSources"] = [
    { label: "Postcode geocoding", status: address.resolved ? "live" : "fallback" },
    { label: "Solar irradiance", status: irradiance.source === "pvgis" ? "live" : "estimated" },
    { label: "Roof geometry", status: satellite.source === "google-solar-api" ? "live" : "estimated" },
    { label: "DNO & tariff data", status: "estimated" },
  ];

  // Confidence blends how many inputs were real/live vs estimated,
  // weighted toward the two that matter most for accuracy: address
  // resolution and roof geometry.
  let score = 50;
  score += address.resolved ? 20 : 0;
  score += irradiance.source === "pvgis" ? 15 : 5;
  score += satellite.confidence * 15;
  score = Math.min(97, Math.round(score));

  const confidenceBand: Explainability["confidenceBand"] = score >= 80 ? "high" : score >= 60 ? "medium" : "low";

  const reasoning: string[] = [];

  reasoning.push(
    address.resolved
      ? `Your postcode resolved to ${address.adminDistrict}, ${address.region} — irradiance and DNO data are matched to your actual location.`
      : `We couldn't fully resolve "${address.postcode}" — figures use a UK-average location until you confirm your exact postcode.`
  );

  reasoning.push(
    irradiance.source === "pvgis"
      ? `Generation is modelled from real satellite-derived irradiance data for your coordinates (${irradiance.annualKwhPerKwp} kWh/kWp/year).`
      : `Generation uses a regional irradiance estimate for your area (${irradiance.annualKwhPerKwp} kWh/kWp/year) — live data was unavailable.`
  );

  if (satellite.facets.length > 0) {
    const usable = satellite.facets.filter((f) => f.usable);
    reasoning.push(
      `Your roof was modelled as ${usable.length} usable face${usable.length === 1 ? "" : "s"} totalling ${satellite.totalUsableAreaSqm}m², ` +
        `best-oriented at ${satellite.bestFacetAzimuth}° with ${Math.round(satellite.averageShadingPct * 100)}% average shading — supporting up to ${satellite.maxInstallableKwp}kWp.`
    );
  } else {
    reasoning.push("Flats typically don't have exclusive roof access, so this quote assumes a shared or alternative installation route — a survey will confirm what's possible.");
  }

  reasoning.push(...recommended.reasoning);

  reasoning.push(
    `Recommended based on your stated priorities: this option scored highest (${recommended.priorityScore}/100) against what you told us matters most, not just the shortest payback.`
  );

  return { confidenceScore: score, confidenceBand, reasoning, dataSources };
}
