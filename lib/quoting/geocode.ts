import type { AddressIntel } from "./types";
import { unstable_cache } from "next/cache";

// UK national centroid — used only if a postcode can't be resolved, so the
// rest of the engine always has coordinates to work with. Confidence
// scoring (see explainability.ts) reflects this by marking the address as
// unresolved rather than silently pretending it's accurate.
const FALLBACK: AddressIntel = {
  postcode: "",
  latitude: 52.3555,
  longitude: -1.1743,
  region: "England",
  adminDistrict: "Unknown",
  resolved: false,
};

interface PostcodesIoResult {
  status: number;
  result: {
    postcode: string;
    latitude: number;
    longitude: number;
    region: string | null;
    admin_district: string | null;
    country: string;
  } | null;
}

/**
 * Real UK postcode lookup via postcodes.io — free, no API key, no rate
 * limit for reasonable use. Returns coordinates and administrative
 * region, which feed the irradiance, DNO, and satellite-simulation
 * layers below. Falls back to a UK-average location (flagged as
 * unresolved) if the postcode is invalid or the service is unreachable,
 * so a bad postcode degrades quote confidence rather than breaking the
 * whole calculator.
 */
const cachedPostcodeLookup = unstable_cache(
  async (postcode: string, rawPostcode: string): Promise<AddressIntel> => {
    if (postcode.length < 5) {
      return { ...FALLBACK, postcode: rawPostcode };
    }

    try {
      const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`, {
        next: { revalidate: 86400 },
      });

      if (!res.ok) {
        return { ...FALLBACK, postcode: rawPostcode };
      }

      const data: PostcodesIoResult = await res.json();

      if (data.status !== 200 || !data.result) {
        return { ...FALLBACK, postcode: rawPostcode };
      }

      return {
        postcode: data.result.postcode,
        latitude: data.result.latitude,
        longitude: data.result.longitude,
        region: data.result.region ?? data.result.country,
        adminDistrict: data.result.admin_district ?? "Unknown",
        resolved: true,
      };
    } catch {
      return { ...FALLBACK, postcode: rawPostcode };
    }
  },
  ["postcode-lookup"],
  { revalidate: 86400 }
);

export async function geocodePostcode(rawPostcode: string): Promise<AddressIntel> {
  const postcode = rawPostcode.trim().toUpperCase().replace(/\s+/g, "");
  return cachedPostcodeLookup(postcode, rawPostcode);
}
