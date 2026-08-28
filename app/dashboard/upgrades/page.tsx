import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UPGRADES = [
  { title: "Your current system could benefit from a battery.", href: "/battery/existing-solar" },
  { title: "Your EV could be charged using more of your solar.", href: "/ev-charging" },
  { title: "A heat pump could be considered based on your current system.", href: "/heat-pumps" },
];

export const metadata = { title: "My Upgrades — BrightGrid Energy" };

export default function MyUpgradesPage() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {UPGRADES.map((u) => (
        <Card key={u.title} className="flex flex-col justify-between p-6">
          <p className="font-medium">{u.title}</p>
          <Button asChild variant="outline" className="mt-5 w-fit">
            <Link href={u.href}>Explore</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
