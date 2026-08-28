import { MapPin, Zap, PlugZap } from "lucide-react";
import type { LocationIntelligence } from "@/lib/quoting/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function LocationIntelligenceCard({ location }: { location: LocationIntelligence }) {
  const tariff = location.availableTariffs.find((t) => t.id === location.recommendedTariffId) ?? location.availableTariffs[0];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-volt" />
        <h3 className="font-display text-lg font-medium">Your location</h3>
      </div>

      <p className="mt-2 text-sm text-muted-foreground">
        {location.address.resolved ? `${location.address.adminDistrict}, ${location.address.region}` : "Postcode not fully resolved — using a UK-average location"}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Zap className="h-3 w-3" /> Irradiance
          </p>
          <p className="mt-0.5 font-display text-lg font-medium">{location.irradiance.annualKwhPerKwp} kWh/kWp/yr</p>
          <Badge variant="outline" className="mt-1 text-[10px]">
            {location.irradiance.source === "pvgis" ? "Satellite-derived" : "Regional estimate"}
          </Badge>
        </div>

        <div>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <PlugZap className="h-3 w-3" /> Grid operator
          </p>
          <p className="mt-0.5 font-display text-lg font-medium">{location.dno.licenceArea}</p>
          <p className="mt-1 text-xs text-muted-foreground">{location.dno.operator}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Recommended tariff</p>
          <p className="mt-0.5 font-display text-lg font-medium">{tariff.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {tariff.importRateOffPeakPence ? `${tariff.importRateOffPeakPence}p off-peak / ${tariff.importRatePeakPence}p peak` : `${tariff.importRatePeakPence}p/kWh flat`}
          </p>
        </div>
      </div>

      <p className="mt-5 text-xs text-muted-foreground">
        Systems up to {location.dno.singlePhaseExportLimitKw}kW per phase typically proceed under a simple grid
        notification; larger systems need a full application, usually approved within {location.dno.typicalApprovalWeeks}{" "}
        weeks in the {location.dno.licenceArea} area.
      </p>
    </Card>
  );
}
