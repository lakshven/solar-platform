// app/api/maintenance/mine/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";

export async function GET() {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  const { data: solarSystem, error: solarSystemError } = await supabase
    .from("solar_systems")
    .select("*")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (solarSystemError) {
    console.error("Solar system lookup error:", solarSystemError);
    return NextResponse.json(
      { error: "Unable to load your system details." },
      { status: 500 }
    );
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from("maintenance_subscriptions")
    .select("*")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Unable to load your maintenance plan." },
      { status: 500 }
    );
  }

  let visits: Record<string, unknown>[] = [];
  let payments: Record<string, unknown>[] = [];

  if (subscription) {
    const [{ data: visitRows, error: visitsError }, { data: paymentRows, error: paymentsError }] =
      await Promise.all([
        supabase
          .from("service_visits")
          .select("*")
          .eq("subscription_id", subscription.id)
          .order("scheduled_date", { ascending: true }),
        supabase
          .from("maintenance_payments")
          .select("*")
          .eq("subscription_id", subscription.id)
          .order("created_at", { ascending: false }),
      ]);

    if (visitsError) {
      console.error("Service visits lookup error:", visitsError);
      return NextResponse.json(
        { error: "Unable to load your visit history." },
        { status: 500 }
      );
    }

    if (paymentsError) {
      console.error("Maintenance payments lookup error:", paymentsError);
      return NextResponse.json(
        { error: "Unable to load your payment history." },
        { status: 500 }
      );
    }

    visits = visitRows ?? [];
    payments = paymentRows ?? [];
  }

  const { data: rewards, error: rewardsError } = await supabase
    .from("referral_rewards")
    .select("*")
    .eq("customer_id", customer.id)
    .eq("status", "available");

  if (rewardsError) {
    console.error("Rewards lookup error:", rewardsError);
    return NextResponse.json(
      { error: "Unable to load your rewards." },
      { status: 500 }
    );
  }

  const todayIso = new Date().toISOString().slice(0, 10);

  const upcomingVisit =
    visits.find(
      (v) => v.status === "scheduled" && (v.scheduled_date as string) >= todayIso
    ) ?? null;

  const pastVisits = visits.filter((v) => v.status === "completed").reverse();

  return NextResponse.json({
    solarSystem: solarSystem ?? null,
    subscription: subscription ?? null,
    upcomingVisit,
    pastVisits,
    payments,
    availableRewards: rewards ?? [],
  });
}