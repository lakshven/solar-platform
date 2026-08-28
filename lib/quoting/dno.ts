import type { AddressIntel, DnoInfo } from "./types";

// GB has 14 electricity distribution licence areas run by 6 DNO groups.
// Mapped here by postcode area (the letters before the first digit) —
// accurate for the large majority of addresses; a handful of postcode
// areas straddle a boundary and would need the full postcodes.io
// district data to disambiguate perfectly, which is a reasonable future
// enhancement rather than a blocker for a solar quote.
const DNO_BY_POSTCODE_AREA: Record<string, { operator: string; licenceArea: string }> = {
  // UK Power Networks
  E: { operator: "UK Power Networks", licenceArea: "London" },
  EC: { operator: "UK Power Networks", licenceArea: "London" },
  N: { operator: "UK Power Networks", licenceArea: "London" },
  NW: { operator: "UK Power Networks", licenceArea: "London" },
  SE: { operator: "UK Power Networks", licenceArea: "London" },
  SW: { operator: "UK Power Networks", licenceArea: "London" },
  W: { operator: "UK Power Networks", licenceArea: "London" },
  WC: { operator: "UK Power Networks", licenceArea: "London" },
  CM: { operator: "UK Power Networks", licenceArea: "Eastern" },
  CO: { operator: "UK Power Networks", licenceArea: "Eastern" },
  IP: { operator: "UK Power Networks", licenceArea: "Eastern" },
  NR: { operator: "UK Power Networks", licenceArea: "Eastern" },
  SG: { operator: "UK Power Networks", licenceArea: "Eastern" },
  BR: { operator: "UK Power Networks", licenceArea: "South East" },
  CT: { operator: "UK Power Networks", licenceArea: "South East" },
  DA: { operator: "UK Power Networks", licenceArea: "South East" },
  KT: { operator: "UK Power Networks", licenceArea: "South East" },
  ME: { operator: "UK Power Networks", licenceArea: "South East" },
  RH: { operator: "UK Power Networks", licenceArea: "South East" },
  TN: { operator: "UK Power Networks", licenceArea: "South East" },
  // Southern Electric Power Distribution (SSEN)
  SO: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  PO: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  GU: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  SP: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  BH: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  RG: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  OX: { operator: "Scottish and Southern Electricity Networks", licenceArea: "Southern" },
  // Western Power Distribution (National Grid)
  BA: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  BS: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  EX: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  PL: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  TR: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  TQ: { operator: "National Grid Electricity Distribution", licenceArea: "South West" },
  CF: { operator: "National Grid Electricity Distribution", licenceArea: "South Wales" },
  SA: { operator: "National Grid Electricity Distribution", licenceArea: "South Wales" },
  NP: { operator: "National Grid Electricity Distribution", licenceArea: "South Wales" },
  B: { operator: "National Grid Electricity Distribution", licenceArea: "West Midlands" },
  CV: { operator: "National Grid Electricity Distribution", licenceArea: "West Midlands" },
  WV: { operator: "National Grid Electricity Distribution", licenceArea: "West Midlands" },
  DY: { operator: "National Grid Electricity Distribution", licenceArea: "West Midlands" },
  WS: { operator: "National Grid Electricity Distribution", licenceArea: "West Midlands" },
  DE: { operator: "National Grid Electricity Distribution", licenceArea: "East Midlands" },
  LE: { operator: "National Grid Electricity Distribution", licenceArea: "East Midlands" },
  NG: { operator: "National Grid Electricity Distribution", licenceArea: "East Midlands" },
  NN: { operator: "National Grid Electricity Distribution", licenceArea: "East Midlands" },
  // Northern Powergrid
  DH: { operator: "Northern Powergrid", licenceArea: "North East" },
  DL: { operator: "Northern Powergrid", licenceArea: "North East" },
  NE: { operator: "Northern Powergrid", licenceArea: "North East" },
  SR: { operator: "Northern Powergrid", licenceArea: "North East" },
  TS: { operator: "Northern Powergrid", licenceArea: "North East" },
  BD: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  HD: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  HG: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  HU: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  HX: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  LS: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  S: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  WF: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  YO: { operator: "Northern Powergrid", licenceArea: "Yorkshire" },
  // Electricity North West
  BB: { operator: "Electricity North West", licenceArea: "North West" },
  BL: { operator: "Electricity North West", licenceArea: "North West" },
  CA: { operator: "Electricity North West", licenceArea: "North West" },
  FY: { operator: "Electricity North West", licenceArea: "North West" },
  LA: { operator: "Electricity North West", licenceArea: "North West" },
  M: { operator: "Electricity North West", licenceArea: "North West" },
  OL: { operator: "Electricity North West", licenceArea: "North West" },
  PR: { operator: "Electricity North West", licenceArea: "North West" },
  // SP Energy Networks
  L: { operator: "SP Energy Networks", licenceArea: "SP Manweb" },
  CH: { operator: "SP Energy Networks", licenceArea: "SP Manweb" },
  LL: { operator: "SP Energy Networks", licenceArea: "SP Manweb" },
  WA: { operator: "SP Energy Networks", licenceArea: "SP Manweb" },
  WN: { operator: "SP Energy Networks", licenceArea: "SP Manweb" },
  G: { operator: "SP Energy Networks", licenceArea: "SP Distribution" },
  KA: { operator: "SP Energy Networks", licenceArea: "SP Distribution" },
  ML: { operator: "SP Energy Networks", licenceArea: "SP Distribution" },
  PA: { operator: "SP Energy Networks", licenceArea: "SP Distribution" },
  // SSEN — North Scotland
  AB: { operator: "Scottish and Southern Electricity Networks", licenceArea: "North Scotland" },
  IV: { operator: "Scottish and Southern Electricity Networks", licenceArea: "North Scotland" },
  PH: { operator: "Scottish and Southern Electricity Networks", licenceArea: "North Scotland" },
  KW: { operator: "Scottish and Southern Electricity Networks", licenceArea: "North Scotland" },
};

const NATIONAL_DEFAULT = { operator: "National Grid Electricity Distribution", licenceArea: "Unmapped area" };

function extractPostcodeArea(postcode: string): string {
  const match = postcode.trim().toUpperCase().match(/^([A-Z]{1,2})\d/);
  return match ? match[1] : "";
}

/**
 * DNO connection rules: UK domestic solar installs up to 3.68kW (16A)
 * per phase can typically go ahead under a simple G98 notification.
 * Larger single-phase systems, and most systems with battery export or
 * commercial scale, need a full G99 application with DNO approval before
 * connection — which is what typicalApprovalWeeks reflects.
 */
export function getDnoInfo(address: AddressIntel): DnoInfo {
  const area = extractPostcodeArea(address.postcode);
  const match = DNO_BY_POSTCODE_AREA[area] ?? NATIONAL_DEFAULT;

  return {
    licenceArea: match.licenceArea,
    operator: match.operator,
    singlePhaseExportLimitKw: 3.68,
    g98NotificationOnly: true, // set per-scenario in engine.ts once system size is known
    typicalApprovalWeeks: 2,
  };
}
