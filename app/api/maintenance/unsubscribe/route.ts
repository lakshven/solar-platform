// app/api/maintenance/unsubscribe/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  const { data: subscription, error: subscriptionError } = await supabase
    .from("maintenance_subscriptions")
    .select("id, status, payment_provider_subscription_id")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Unable to cancel your plan. Please try again." },
      { status: 500 }
    );
  }

  if (!subscription) {
    return NextResponse.json(
      { error: "No maintenance plan found." },
      { status: 404 }
    );
  }

  if (subscription.status === "cancelled") {
    return NextResponse.json(
      { error: "This plan is already cancelled." },
      { status: 409 }
    );
  }

  /*
   * If you wire up a real payment provider's recurring subscription
   * (see lib/payments/provider.ts), cancel it here too, e.g.:
   *
   *   if (subscription.payment_provider_subscription_id) {
   *     await stripe.subscriptions.cancel(subscription.payment_provider_subscription_id);
   *   }
   */

  const admin = createAdminClient();

  const { error: cancelError } = await admin
    .from("maintenance_subscriptions")
    .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
    .eq("id", subscription.id);

  if (cancelError) {
    console.error("Subscription cancel error:", cancelError);
    return NextResponse.json(
      { error: "Unable to cancel your plan. Please try again." },
      { status: 500 }
    );
  }

  // Cancel any visits that were still scheduled — the trigger that
  // auto-books the *next* visit only fires on a completed visit, so
  // this just clears out ones that hadn't happened yet.
  const { error: cancelVisitsError } = await admin
    .from("service_visits")
    .update({ status: "cancelled" })
    .eq("subscription_id", subscription.id)
    .eq("status", "scheduled");

  if (cancelVisitsError) {
    console.error("Visit cancellation error:", cancelVisitsError);
    // Non-fatal — the subscription is already cancelled, which is
    // the part that actually stops future billing/scheduling.
  }

  return NextResponse.json({ success: true });
}