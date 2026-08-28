// app/api/maintenance/pay/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";
import { charge } from "@/lib/payments/provider";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  let body: { serviceVisitId?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { serviceVisitId } = body;

  if (typeof serviceVisitId !== "string" || !UUID_REGEX.test(serviceVisitId)) {
    return NextResponse.json(
      { error: "A service visit is required." },
      { status: 400 }
    );
  }

  // Ownership check via the session-scoped client.
  const { data: visit, error: visitError } = await supabase
    .from("service_visits")
    .select("id, subscription_id, customer_id")
    .eq("id", serviceVisitId)
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (visitError) {
    console.error("Visit lookup error:", visitError);
    return NextResponse.json(
      { error: "Unable to process this payment. Please try again." },
      { status: 500 }
    );
  }

  if (!visit) {
    return NextResponse.json(
      { error: "Service visit not found." },
      { status: 404 }
    );
  }

  if (!UUID_REGEX.test(visit.subscription_id)) {
    console.error("Invalid subscription ID on service visit:", visit.id);
    return NextResponse.json(
      { error: "Subscription not found." },
      { status: 404 }
    );
  }

  const admin = createAdminClient();

  const { data: existingPayment, error: existingPaymentError } = await admin
    .from("maintenance_payments")
    .select("id, status")
    .eq("service_visit_id", visit.id)
    .maybeSingle();

  if (existingPaymentError) {
    console.error("Existing payment lookup error:", existingPaymentError);
    return NextResponse.json(
      { error: "Unable to process this payment. Please try again." },
      { status: 500 }
    );
  }

  if (existingPayment && ["paid", "waived"].includes(existingPayment.status)) {
    return NextResponse.json(
      { error: "This visit has already been paid for." },
      { status: 409 }
    );
  }

  const { data: subscription, error: subscriptionError } = await admin
    .from("maintenance_subscriptions")
    .select("id, price_amount, price_currency")
    .eq("id", visit.subscription_id)
    .single();

  if (subscriptionError || !subscription) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Subscription not found." },
      { status: 404 }
    );
  }

  /*
   * Automatically apply a free-maintenance reward if the customer
   * has one available. This is what makes a completed referral skip
   * the next charge on its own — no code to enter, nothing for the
   * customer to remember. Oldest reward first, so nothing sits
   * unused indefinitely if more than one is available.
   */
  const { data: reward, error: rewardError } = await admin
    .from("referral_rewards")
    .select("id")
    .eq("customer_id", customer.id)
    .eq("status", "available")
    .order("issued_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (rewardError) {
    console.error("Reward lookup error:", rewardError);
    return NextResponse.json(
      { error: "Unable to process this payment. Please try again." },
      { status: 500 }
    );
  }

  if (reward) {
    const { error: waivedPaymentError } = await admin
      .from("maintenance_payments")
      .upsert(
        {
          service_visit_id: visit.id,
          subscription_id: subscription.id,
          customer_id: customer.id,
          amount: subscription.price_amount,
          currency: subscription.price_currency,
          status: "waived",
          reward_id: reward.id,
          paid_at: new Date().toISOString(),
        },
        { onConflict: "service_visit_id" }
      );

    if (waivedPaymentError) {
      console.error("Waived payment upsert error:", waivedPaymentError);
      return NextResponse.json(
        { error: "Unable to process this payment. Please try again." },
        { status: 500 }
      );
    }

    const { error: redeemError } = await admin
      .from("referral_rewards")
      .update({
        status: "redeemed",
        redeemed_at: new Date().toISOString(),
        maintenance_session_id: visit.id,
      })
      .eq("id", reward.id);

    if (redeemError) {
      // The payment is already recorded as waived — log this for
      // manual reconciliation rather than telling the customer their
      // free visit failed.
      console.error("Reward redemption error:", redeemError);
    }

    return NextResponse.json({ waived: true, amount: 0 });
  }

  const chargeResult = await charge({
    amount: subscription.price_amount,
    currency: subscription.price_currency,
    customerId: customer.id,
    description: "BrightGrid maintenance visit",
  });

  const { error: paymentUpsertError } = await admin
    .from("maintenance_payments")
    .upsert(
      {
        service_visit_id: visit.id,
        subscription_id: subscription.id,
        customer_id: customer.id,
        amount: subscription.price_amount,
        currency: subscription.price_currency,
        status: chargeResult.success ? "paid" : "failed",
        payment_reference: chargeResult.success ? chargeResult.reference : null,
        paid_at: chargeResult.success ? new Date().toISOString() : null,
      },
      { onConflict: "service_visit_id" }
    );

  if (paymentUpsertError) {
    console.error("Payment upsert error:", paymentUpsertError);
    return NextResponse.json(
      { error: "Unable to process this payment. Please try again." },
      { status: 500 }
    );
  }

  if (!chargeResult.success) {
    return NextResponse.json(
      { error: chargeResult.error || "Payment failed. Please try again." },
      { status: 402 }
    );
  }

  return NextResponse.json({ waived: false, amount: subscription.price_amount });
}