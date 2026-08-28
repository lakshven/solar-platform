// app/api/maintenance/reschedule/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_REGEX = /^\d{2}:\d{2}$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function PATCH(request: Request) {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  let body: { subscriptionId?: string; newDate?: string; newTime?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const { subscriptionId, newDate, newTime } = body;

  if (typeof subscriptionId !== "string" || !UUID_REGEX.test(subscriptionId)) {
    return NextResponse.json(
      { error: "A valid subscription is required." },
      { status: 400 }
    );
  }

  if (typeof newDate !== "string" || !DATE_REGEX.test(newDate)) {
    return NextResponse.json(
      { error: "A valid date is required." },
      { status: 400 }
    );
  }

  if (newTime !== undefined && !TIME_REGEX.test(newTime)) {
    return NextResponse.json(
      { error: "Please choose a valid time." },
      { status: 400 }
    );
  }

  const todayIso = new Date().toISOString().slice(0, 10);

  if (newDate < todayIso) {
    return NextResponse.json(
      { error: "Please choose a date in the future." },
      { status: 400 }
    );
  }

  // Ownership check via the session-scoped client (RLS-backed).
  const { data: subscription, error: subscriptionError } = await supabase
    .from("maintenance_subscriptions")
    .select("id, status")
    .eq("id", subscriptionId)
    .eq("customer_id", customer.id)
    .maybeSingle();

  if (subscriptionError) {
    console.error("Subscription lookup error:", subscriptionError);
    return NextResponse.json(
      { error: "Unable to reschedule. Please try again." },
      { status: 500 }
    );
  }

  if (!subscription) {
    return NextResponse.json(
      { error: "Subscription not found." },
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

  const { data: visit, error: visitError } = await admin
    .from("service_visits")
    .select("id")
    .eq("subscription_id", subscriptionId)
    .eq("status", "scheduled")
    .order("scheduled_date", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (visitError) {
    console.error("Upcoming visit lookup error:", visitError);
    return NextResponse.json(
      { error: "Unable to reschedule. Please try again." },
      { status: 500 }
    );
  }

  if (visit) {
    const { error: updateVisitError } = await admin
      .from("service_visits")
      .update({ scheduled_date: newDate, scheduled_time: newTime ?? null })
      .eq("id", visit.id);

    if (updateVisitError) {
      console.error("Visit reschedule error:", updateVisitError);
      return NextResponse.json(
        { error: "Unable to reschedule. Please try again." },
        { status: 500 }
      );
    }
  }

  const { error: updateSubscriptionError } = await admin
    .from("maintenance_subscriptions")
    .update({ next_service_date: newDate, next_service_time: newTime ?? null })
    .eq("id", subscriptionId);

  if (updateSubscriptionError) {
    console.error("Subscription reschedule error:", updateSubscriptionError);
    return NextResponse.json(
      { error: "Unable to reschedule. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}