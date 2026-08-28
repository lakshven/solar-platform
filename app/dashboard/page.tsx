import { Sun, BatteryCharging, Car, Flame, Zap, Wallet, Leaf } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { EnergyCard } from "@/components/shared/energy-card";
import { formatGBP, formatKwh } from "@/lib/utils";

export const metadata = { title: "My Energy — BrightGrid Energy" };

// Demo fallback so the page renders meaningfully before auth + a real
// property are wired up. Swap this for a real query once you have a
// signed-in customer's property_id (see the query below, commented out).
const DEMO = {
  solar_generated_kwh: 612,
  home_consumption_kwh: 388,
  grid_imported_kwh: 96,
  grid_exported_kwh: 220,
  estimated_saving_gbp: 142,
  co2_reduction_kg: 74,
};

export default async function MyEnergyPage() {
  let summary = DEMO;

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: customer } = await supabase.from("customers").select("id").eq("user_id", user.id).single();
      if (customer) {
        const { data: property } = await supabase
          .from("properties")
          .select("id")
          .eq("customer_id", customer.id)
          .limit(1)
          .single();

        if (property) {
          const { data: energySummary } = await supabase
            .from("energy_summary_last_30_days")
            .select("*")
            .eq("property_id", property.id)
            .single();
          if (energySummary) summary = energySummary as unknown as typeof DEMO;
        }
      }
    }
  } catch {
    // Not signed in, or Supabase not configured yet — demo data covers it.
  }

  return (
    <div>
      <p className="text-sm text-muted-foreground">Last 30 days</p>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <EnergyCard icon={Sun} label="Solar generation" value={formatKwh(summary.solar_generated_kwh)} accent="solar" />
        <EnergyCard icon={Zap} label="Home used" value={formatKwh(summary.home_consumption_kwh)} accent="default" />
        <EnergyCard icon={BatteryCharging} label="Grid imported" value={formatKwh(summary.grid_imported_kwh)} accent="volt" />
        <EnergyCard icon={Leaf} label="Grid exported" value={formatKwh(summary.grid_exported_kwh)} accent="leaf" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <EnergyCard icon={Wallet} label="Estimated saving" value={formatGBP(summary.estimated_saving_gbp)} accent="default" />
        <EnergyCard icon={Leaf} label="CO₂ reduction" value={`${summary.co2_reduction_kg} kg`} accent="leaf" />
        <EnergyCard icon={Car} label="EV charging" value="Connect a charger" accent="volt" />
        <EnergyCard icon={Flame} label="Heat pump" value="Not installed" accent="default" />
      </div>
      <p className="mt-6 text-xs text-muted-foreground">
        Figures come from <code className="rounded bg-secondary px-1 py-0.5">energy_summary_last_30_days</code>, a view over{" "}
        <code className="rounded bg-secondary px-1 py-0.5">energy_readings</code>. Populate that table from your inverter/monitoring
        provider&apos;s webhook or a scheduled sync job.
      </p>
    </div>
  );
}
