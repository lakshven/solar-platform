import type { CalculatorInput } from "@/lib/calculator/types";
import type { AddressIntel, RoofFacet, SatelliteAnalysis } from "./types";

/**
 * IMPORTANT — honest limitation: true per-roof satellite/LiDAR analysis
 * (individual facet outlines, real obstruction shadows, actual ridge
 * lines) requires a paid imagery API such as Google's Solar API or
 * EagleView, which needs an API key and billing account this project
 * doesn't have configured. This module simulates realistic, *consistent*
 * roof geometry from the address and property details already collected
 * — same postcode and property type always produce the same result, so
 * a visitor re-running the calculator sees stable numbers, and the
 * output shape is identical to what a real imagery API would return.
 *
 * To go live with real satellite data: implement `analyseRoofFromImagery`
 * below against your chosen provider, and swap the call in
 * `lib/quoting/engine.ts` — every downstream consumer (system design,
 * economics, explainability) already reads the same SatelliteAnalysis
 * shape, so nothing else needs to change.
 */

// Small deterministic hash → seeded RNG, so "same address, same inputs"
// always produces the same roof rather than a different one every visit.
function seedFromString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BASE_ROOF_AREA_SQM: Record<CalculatorInput["propertyType"], number> = {
  detached: 95,
  "semi-detached": 62,
  terraced: 48,
  bungalow: 70,
  flat: 0, // flats generally don't have exclusive roof access — flagged separately
};

const SUITABILITY_MULTIPLIER: Record<CalculatorInput["roofSuitability"], number> = {
  excellent: 1.15,
  good: 1.0,
  limited: 0.55,
  unknown: 0.85,
};

const PANEL_AREA_SQM = 1.9; // typical residential panel footprint including gaps
const PANEL_WATT = 440; // typical current panel rating

function yieldFactorFor(azimuthDegrees: number, pitchDegrees: number, shadingPct: number): number {
  // Peak yield at true south (180°) and a 30–40° pitch; falls off toward
  // east/west and flattens further from that pitch band.
  const azimuthPenalty = Math.cos(((azimuthDegrees - 180) * Math.PI) / 180);
  const azimuthFactor = 0.75 + 0.25 * Math.max(0, azimuthPenalty);
  const pitchFactor = 1 - Math.min(0.15, Math.abs(pitchDegrees - 35) / 200);
  return Math.max(0.35, azimuthFactor * pitchFactor * (1 - shadingPct));
}

export function generateSatelliteAnalysis(input: CalculatorInput, address: AddressIntel): SatelliteAnalysis {
  const rng = mulberry32(seedFromString(`${address.postcode}|${input.propertyType}|${input.roofSuitability}`));

  if (input.propertyType === "flat") {
    return {
      facets: [],
      totalUsableAreaSqm: 0,
      maxInstallableKwp: 0,
      bestFacetAzimuth: 180,
      averageShadingPct: 0,
      source: "simulated",
      confidence: 0.9,
    };
  }

  const baseArea = BASE_ROOF_AREA_SQM[input.propertyType] * SUITABILITY_MULTIPLIER[input.roofSuitability];
  const areaVariance = 0.85 + rng() * 0.3; // ±15% realistic variance between similar homes
  const totalRoofArea = baseArea * areaVariance;

  // Most UK pitched roofs are a two-facet gable — split into a primary
  // (usually the larger, better-oriented face) and secondary facet.
  const primaryShare = 0.52 + rng() * 0.1;
  const primaryAzimuth = Math.round(150 + rng() * 60); // biased toward south-ish, 150–210°
  const secondaryAzimuth = (primaryAzimuth + 180) % 360;

  const baseShading = input.roofSuitability === "limited" ? 0.22 : input.roofSuitability === "excellent" ? 0.03 : 0.1;
  const primaryShading = Math.min(0.45, Math.max(0, baseShading + (rng() - 0.5) * 0.08));
  const secondaryShading = Math.min(0.5, Math.max(0, baseShading + 0.05 + (rng() - 0.5) * 0.08));

  const pitch = Math.round(28 + rng() * 14); // 28–42°

  function buildFacet(id: string, label: string, share: number, azimuth: number, shading: number): RoofFacet {
    const areaSqm = Math.round(totalRoofArea * share);
    const yieldFactor = yieldFactorFor(azimuth, pitch, shading);
    const usable = yieldFactor > 0.4 && areaSqm > 8;
    const maxPanels = usable ? Math.floor(areaSqm / PANEL_AREA_SQM) : 0;
    const maxKwp = Math.round(((maxPanels * PANEL_WATT) / 1000) * 10) / 10;

    return { id, label, areaSqm, pitchDegrees: pitch, azimuthDegrees: azimuth, shadingPct: Math.round(shading * 100) / 100, usable, maxPanels, maxKwp, yieldFactor: Math.round(yieldFactor * 100) / 100 };
  }

  const facets = [
    buildFacet("primary", "Main roof face", primaryShare, primaryAzimuth, primaryShading),
    buildFacet("secondary", "Opposite roof face", 1 - primaryShare, secondaryAzimuth, secondaryShading),
  ];

  const usableFacets = facets.filter((f) => f.usable);
  const totalUsableAreaSqm = Math.round(usableFacets.reduce((s, f) => s + f.areaSqm, 0));
  const maxInstallableKwp = Math.round(usableFacets.reduce((s, f) => s + f.maxKwp, 0) * 10) / 10;
  const bestFacet = [...facets].sort((a, b) => b.yieldFactor - a.yieldFactor)[0];
  const averageShadingPct = Math.round(((facets[0].shadingPct + facets[1].shadingPct) / 2) * 100) / 100;

  return {
    facets,
    totalUsableAreaSqm,
    maxInstallableKwp,
    bestFacetAzimuth: bestFacet.azimuthDegrees,
    averageShadingPct,
    source: "simulated",
    confidence: input.roofSuitability === "unknown" ? 0.55 : 0.75,
  };
}
