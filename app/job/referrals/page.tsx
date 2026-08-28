import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata = { title: "My Referrals — BrightGrid Energy" };

export default function MyReferralsPage() {
  return (
    <Card className="max-w-lg p-6">
      <h3 className="font-display text-lg font-medium">Know someone who wants solar?</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Refer someone you know and receive £250 of solar maintenance once their installation is completed.
      </p>
      <Button variant="accent" className="mt-5">Refer a friend</Button>
      <p className="mt-4 text-xs text-muted-foreground">
        Backed by the <code className="rounded bg-secondary px-1 py-0.5">referrals</code> table — insert a row on
        submit, and update its <code className="rounded bg-secondary px-1 py-0.5">status</code> as the referral
        progresses through booking, completion, and reward issuance.
      </p>
    </Card>
  );
}
