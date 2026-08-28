import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = { title: "My Maintenance — BrightGrid Energy" };

export default function MyMaintenancePage() {
  // Demo state — wire this to `maintenance_subscriptions` + `service_visits`
  // for the signed-in customer's property, same pattern as My Energy.
  const nextService = "15 September 2027";

  return (
    <Card className="max-w-lg p-6">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Home Energy Care</span>
        <Badge variant="leaf">Active</Badge>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm text-muted-foreground">Next service</span>
        <span className="font-display text-lg font-medium">{nextService}</span>
      </div>
    </Card>
  );
}
