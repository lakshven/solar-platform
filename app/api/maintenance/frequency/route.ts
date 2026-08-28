// app/api/maintenance/frequency/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_FREQUENCIES = new Set(["quarterly", "biannual", "annual"]);

export async function PATCH(request: Request) {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  let body: { frequency?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  if (!body.frequency || !VALID_FREQUENCIES.has(body.frequency)) {
    return NextResponse.json(
      { error: "Please choose a valid frequency." },
      { status: 400 }
    );
  }

  const { data: subscription, error: subscriptionError } = await supabase
    .from("maintenance_subscriptions")
    .select("id, status")
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Unable to update your plan. Please try again." },
      { status: 500 }
    );
  }

  if (!subscription) {
    return NextResponse.json(
      { error: "No maintenance plan found." },
      { status: 404 }
    );
  }

  if (subscription.status !== "active") {
    return NextResponse.json(
      { error: "This subscription isn't active." },
      { status: 409 }
    );
  }

  const admin = createAdminClient();

  /*
   * This only changes the cadence used the next time a visit is
   * marked completed (see schedule_next_service_visit() in
   * supabase/schema-maintenance.sql) — it doesn't move the visit
   * that's already scheduled. If you want the change to apply
   * immediately, also update the upcoming service_visits row here.
   */
  const { error: updateError } = await admin
    .from("maintenance_subscriptions")
    .update({ frequency: body.frequency })
    .eq("id", subscription.id);

  if (updateError) {
    console.error("Frequency update error:", updateError);
    return NextResponse.json(
      { error: "Unable to update your plan. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}