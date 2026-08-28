// app/api/maintenance/resubscribe/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

const FREQUENCY_MONTHS: Record<string, number> = {
  quarterly: 3,
  biannual: 6,
  annual: 12,
};

export async function POST() {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  const { data: subscription, error: subscriptionError } = await supabase
    .from("maintenance_subscriptions")
    .select("id, status, frequency")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Unable to resubscribe. Please try again." },
      { status: 500 }
    );
  }

  if (!subscription) {
    return NextResponse.json(
      { error: "No maintenance plan found." },
      { status: 404 }
    );
  }

  if (subscription.status === "active") {
    return NextResponse.json(
      { error: "Your plan is already active." },
      { status: 409 }
    );
  }

  const months = FREQUENCY_MONTHS[subscription.frequency] ?? 6;
  const nextDate = new Date();
  nextDate.setMonth(nextDate.getMonth() + months);
  const nextDateIso = nextDate.toISOString().slice(0, 10);

  const admin = createAdminClient();

  const { error: reactivateError } = await admin
    .from("maintenance_subscriptions")
    .update({
      status: "active",
      cancelled_at: null,
      next_service_date: nextDateIso,
    })
    .eq("id", subscription.id);

  if (reactivateError) {
    console.error("Resubscribe error:", reactivateError);
    return NextResponse.json(
      { error: "Unable to resubscribe. Please try again." },
      { status: 500 }
    );
  }

  /*
   * The auto-scheduling trigger only fires when a visit is marked
   * completed, so resuming from "cancelled" needs its own visit
   * inserted here — this also fires the pending-payment trigger, so
   * a payment row appears for it automatically too.
   */
  const { error: visitInsertError } = await admin.from("service_visits").insert({
    subscription_id: subscription.id,
    customer_id: customer.id,
    scheduled_date: nextDateIso,
    status: "scheduled",
  });

  if (visitInsertError) {
    console.error("Resubscribe visit creation error:", visitInsertError);
    return NextResponse.json(
      { error: "Unable to resubscribe. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, nextServiceDate: nextDateIso });
}