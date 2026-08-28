import { Compass, Sun } from "lucide-react";
import type { SatelliteAnalysis } from "@/lib/quoting/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function azimuthToCompass(deg: number): string {
  const points = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return points[Math.round(deg / 45) % 8];
}

export function RoofAnalysisCard({ satellite }: { satellite: SatelliteAnalysis }) {
  if (satellite.facets.length === 0) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-solar" />
          <h3 className="font-display text-lg font-medium">Roof analysis</h3>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Flats typically don&apos;t have exclusive roof access — a survey will confirm what&apos;s actually possible for your building.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="h-4 w-4 text-solar" />
          <h3 className="font-display text-lg font-medium">Roof analysis</h3>
        </div>
        <Badge variant="outline" className="text-[11px]">
          {satellite.source === "google-solar-api" ? "Satellite imagery" : "Modelled estimate"}
        </Badge>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Usable area" value={`${satellite.totalUsableAreaSqm}m²`} />
        <Stat label="Max capacity" value={`${satellite.maxInstallableKwp}kWp`} />
        <Stat label="Best orientation" value={`${azimuthToCompass(satellite.bestFacetAzimuth)} (${satellite.bestFacetAzimuth}°)`} icon={Compass} />
        <Stat label="Avg. shading" value={`${Math.round(satellite.averageShadingPct * 100)}%`} />
      </div>

      <div className="mt-5 space-y-2">
        {satellite.facets.map((facet) => (
          <div key={facet.id} className="flex items-center justify-between rounded-lg bg-secondary px-4 py-2.5 text-sm">
            <span className="font-medium">{facet.label}</span>
            <span className="text-muted-foreground">
              {facet.areaSqm}m² · {azimuthToCompass(facet.azimuthDegrees)}-facing · {facet.pitchDegrees}° pitch
              {facet.usable ? ` · up to ${facet.maxKwp}kWp` : " · not usable"}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: string; icon?: typeof Compass }) {
  return (
    <div>
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        {Icon && <Icon className="h-3 w-3" />}
        {label}
      </p>
      <p className="mt-0.5 font-display text-lg font-medium">{value}</p>
    </div>
  );
}
