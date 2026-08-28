import type { AddressIntel, IrradianceData } from "./types";
import { unstable_cache } from "next/cache";

// kWh generated per kWp per year for a well-oriented, unshaded system,
// by broad UK region — used only if PVGIS is unreachable. Derived from
// long-run UK solar resource averages; the south of England receives
// meaningfully more usable irradiance than northern Scotland.
const REGIONAL_FALLBACK_KWH_PER_KWP: Record<string, number> = {
  London: 980,
  "South East": 990,
  Southern: 1000,
  "South West": 990,
  "South Wales": 970,
  "East Midlands": 940,
  "West Midlands": 930,
  Eastern: 960,
  Yorkshire: 900,
  "North West": 890,
  "North East": 870,
  "SP Manweb": 900,
  "SP Distribution": 850,
  "North Scotland": 820,
};

const UK_AVERAGE_FALLBACK = 930;

interface PvgisResponse {
  outputs?: {
    totals?: {
      fixed?: {
        E_y?: number; // annual energy production, kWh, for the requested peakpower (we request 1kWp)
      };
    };
  };
}

/**
 * Real irradiance-driven generation estimate via PVGIS (Photovoltaic
 * Geographical Information System), the EU Joint Research Centre's free,
 * no-key solar resource API — the same underlying data source many
 * commercial solar calculators use. Requests the annual yield of a
 * notional 1kWp system at the resolved coordinates, with realistic
 * system losses, then scales linearly by each scenario's actual kWp
 * later in the engine. Falls back to a UK regional lookup table if the
 * API is unreachable.
 */
const cachedPvgisLookup = unstable_cache(
  async (latitude: number, longitude: number, region: string, resolved: boolean): Promise<IrradianceData> => {
    if (resolved) {
      try {
        const url = new URL("https://re.jrc.ec.europa.eu/api/v5_2/PVcalc");
        url.searchParams.set("lat", latitude.toString());
        url.searchParams.set("lon", longitude.toString());
        url.searchParams.set("peakpower", "1");
        url.searchParams.set("loss", "14");
        url.searchParams.set("outputformat", "json");

        const res = await fetch(url.toString(), { next: { revalidate: 604800 } });

        if (res.ok) {
          const data: PvgisResponse = await res.json();
          const annual = data.outputs?.totals?.fixed?.E_y;
          if (typeof annual === "number" && annual > 300 && annual < 1400) {
            return { annualKwhPerKwp: Math.round(annual), source: "pvgis" };
          }
        }
      } catch {
        // Fall through to the regional lookup.
      }
    }

    const fallback = REGIONAL_FALLBACK_KWH_PER_KWP[region] ?? UK_AVERAGE_FALLBACK;
    return { annualKwhPerKwp: fallback, source: "regional-lookup" };
  },
  ["irradiance-lookup"],
  { revalidate: 604800 }
);

export async function getIrradiance(address: AddressIntel, region: string): Promise<IrradianceData> {
  return cachedPvgisLookup(address.latitude, address.longitude, region, address.resolved);
}
