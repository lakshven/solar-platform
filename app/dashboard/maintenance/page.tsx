// app/maintenance/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { Sun, Wrench, Calendar, Gift, Receipt, CreditCard, AlertCircle } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { RescheduleDialog } from "@/components/dashboard/reschedule-dialog";
import { UnsubscribeDialog } from "@/components/dashboard/unsubscribe-dialog";
import { ChangeFrequencyDialog } from "@/components/dashboard/change-frequency-dialog";
import { PaymentMethodDialog } from "@/components/dashboard/payment-method-dialog";
import { ResubscribeButton } from "@/components/dashboard/resubscribe-button";

export const metadata = { title: "My Maintenance — BrightGrid Energy" };

type Visit = {
  id: string;
  scheduled_date: string;
  scheduled_time: string | null;
  status: string;
};

type Payment = {
  id: string;
  service_visit_id: string | null;
  amount: number;
  currency: string;
  status: string;
  paid_at: string | null;
  created_at: string;
};

const frequencyLabels: Record<string, string> = {
  quarterly: "Every 3 months",
  biannual: "Every 6 months",
  annual: "Once a year",
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatCurrency(amount: number, currency: string) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(
    amount
  );
}

export default async function MyMaintenancePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/maintenance");
  }

  const { data: customer } = await supabase
    .from("customers")
    .select("id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!customer) {
    redirect("/dashboard");
  }

  const { data: solarSystem } = await supabase
    .from("solar_systems")
    .select("*")
    .eq("customer_id", customer.id)
    .maybeSingle();

  const { data: subscription } = await supabase
    .from("maintenance_subscriptions")
    .select("*")
    .eq("customer_id", customer.id)
    .maybeSingle();

  const { data: paymentMethod } = await supabase
    .from("payment_methods")
    .select("last4, exp_month, exp_year")
    .eq("customer_id", customer.id)
    .maybeSingle();

  let visits: Visit[] = [];
  let payments: Payment[] = [];

  if (subscription) {
    const [{ data: visitRows }, { data: paymentRows }] = await Promise.all([
      supabase
        .from("service_visits")
        .select("id, scheduled_date, scheduled_time, status")
        .eq("subscription_id", subscription.id)
        .order("scheduled_date", { ascending: true }),
      supabase
        .from("maintenance_payments")
        .select("id, service_visit_id, amount, currency, status, paid_at, created_at")
        .eq("subscription_id", subscription.id)
        .order("created_at", { ascending: false }),
    ]);

    visits = (visitRows ?? []) as Visit[];
    payments = (paymentRows ?? []) as Payment[];
  }

  const { data: rewards } = await supabase
    .from("referral_rewards")
    .select("id")
    .eq("customer_id", customer.id)
    .eq("status", "available");

  const availableRewardCount = rewards?.length ?? 0;

  const todayIso = new Date().toISOString().slice(0, 10);
  const upcomingVisit =
    visits.find((v) => v.status === "scheduled" && v.scheduled_date >= todayIso) ??
    null;
  const pastVisits = visits.filter((v) => v.status === "completed").reverse();

  const outstandingPayment = payments
    .filter((p) => p.status === "pending")
    .sort((a, b) => a.created_at.localeCompare(b.created_at))[0];

  if (!subscription) {
    return (
      <Card className="max-w-lg p-6 text-center">
        <Wrench className="mx-auto h-8 w-8 text-muted-foreground" />
        <h3 className="mt-3 font-display text-lg font-medium">
          No maintenance plan yet
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Home Energy Care keeps your system running at its best with regular
          cleaning and checks.
        </p>
      </Card>
    );
  }

  return (
    <div className="max-w-lg space-y-6">
      {/* Outstanding payment */}
      {outstandingPayment && (
        <Card className="border-amber-200 bg-amber-50 p-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" />
              <div>
                <p className="text-sm font-medium text-amber-900">
                  Payment due for your maintenance visit
                </p>
                <p className="mt-1 text-sm text-amber-800">
                  {availableRewardCount > 0
                    ? "You have a free reward available — it'll be applied automatically, no charge."
                    : `${formatCurrency(outstandingPayment.amount, outstandingPayment.currency)} due.`}
                </p>
              </div>
            </div>

            <Button asChild variant="accent" className="flex-shrink-0">
              <Link
                href={`/dashboard/maintenance/pay/${outstandingPayment.service_visit_id}?amount=${outstandingPayment.amount}&currency=${outstandingPayment.currency}`}
              >
                {availableRewardCount > 0 ? "Apply reward" : "Pay now"}
              </Link>
            </Button>
          </div>
        </Card>
      )}

      {/* Your system */}
      {solarSystem && (
        <Card className="p-6">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <span className="text-sm font-medium">Your solar system</span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-muted-foreground">Capacity</p>
              <p className="mt-1 font-display text-lg font-medium">
                {solarSystem.capacity_kw} kW
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Panels</p>
              <p className="mt-1 font-display text-lg font-medium">
                {solarSystem.panel_count ?? "—"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Installed</p>
              <p className="mt-1 font-medium">
                {formatDate(solarSystem.install_date)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Inverter</p>
              <p className="mt-1 font-medium">
                {solarSystem.inverter_type ?? "—"}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Subscription */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Home Energy Care</span>
          <Badge variant={subscription.status === "active" ? "leaf" : "outline"}>
            {subscription.status === "active" ? "Active" : subscription.status}
          </Badge>
        </div>

        <div className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Cleaning frequency</span>
            <span className="font-medium">
              {frequencyLabels[subscription.frequency] ?? subscription.frequency}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Price per visit</span>
            <span className="font-medium">
              {formatCurrency(subscription.price_amount, subscription.price_currency)}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Next service</span>
            <span className="font-display text-lg font-medium">
              {formatDate(subscription.next_service_date)}
              {subscription.next_service_time
                ? ` · ${subscription.next_service_time}`
                : ""}
            </span>
          </div>
        </div>

        {availableRewardCount > 0 && (
          <div className="mt-4 flex items-start gap-2 rounded-md bg-green-50 p-3 text-sm text-green-800">
            <Gift className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>
              You have{" "}
              {availableRewardCount === 1
                ? "a free maintenance reward"
                : `${availableRewardCount} free maintenance rewards`}{" "}
              — it&apos;ll be applied automatically to your next visit instead of
              being charged.
            </span>
          </div>
        )}
      </Card>

      {/* Manage your plan — every subscription action lives here */}
      <Card className="p-6">
        <h2 className="font-display text-lg font-medium">Manage your plan</h2>

        {subscription.status === "active" ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {upcomingVisit && (
              <RescheduleDialog
                subscriptionId={subscription.id}
                currentDate={upcomingVisit.scheduled_date}
                currentTime={upcomingVisit.scheduled_time ?? undefined}
              />
            )}
            <ChangeFrequencyDialog currentFrequency={subscription.frequency} />
            <PaymentMethodDialog hasCard={!!paymentMethod} />
            <UnsubscribeDialog />
          </div>
        ) : (
          <div className="mt-4">
            <p className="mb-3 text-sm text-muted-foreground">
              Your plan was cancelled
              {subscription.cancelled_at
                ? ` on ${formatDate(subscription.cancelled_at)}`
                : ""}
              . Resubscribe to start scheduling visits again.
            </p>
            <ResubscribeButton />
          </div>
        )}

        <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
          <CreditCard className="h-4 w-4" />
          {paymentMethod ? (
            <span>
              Card ending {paymentMethod.last4} · expires{" "}
              {String(paymentMethod.exp_month).padStart(2, "0")}/
              {String(paymentMethod.exp_year).slice(-2)}
            </span>
          ) : (
            <span>No payment method saved yet.</span>
          )}
        </div>
      </Card>

      {/* Past visits */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-2 p-6 pb-4">
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">Past visits</span>
        </div>

        <div className="divide-y">
          {pastVisits.length === 0 && (
            <p className="px-6 pb-6 text-sm text-muted-foreground">
              No completed visits yet.
            </p>
          )}

          {pastVisits.map((visit) => {
            const payment = payments.find((p) => p.service_visit_id === visit.id);

            return (
              <div key={visit.id} className="flex items-center justify-between p-6 py-4">
                <div>
                  <p className="text-sm font-medium">
                    {formatDate(visit.scheduled_date)}
                  </p>
                  {visit.scheduled_time && (
                    <p className="text-xs text-muted-foreground">
                      {visit.scheduled_time}
                    </p>
                  )}
                </div>
                <p className="text-sm capitalize text-muted-foreground">
                  {payment
                    ? payment.status === "waived"
                      ? "Free (reward)"
                      : payment.status
                    : "—"}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Payment history */}
      <Card className="overflow-hidden p-0">
        <div className="flex items-center gap-2 p-6 pb-4">
          <Receipt className="h-4 w-4" />
          <span className="text-sm font-medium">Payment history</span>
        </div>

        <div className="divide-y">
          {payments.length === 0 && (
            <p className="px-6 pb-6 text-sm text-muted-foreground">
              No payments yet.
            </p>
          )}

          {payments.map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-6 py-4">
              <div>
                <p className="text-sm font-medium">
                  {payment.status === "waived"
                    ? "Free (reward applied)"
                    : formatCurrency(payment.amount, payment.currency)}
                </p>
                <p className="text-xs capitalize text-muted-foreground">
                  {payment.status}
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-muted-foreground">
                  {formatDate(payment.paid_at ?? payment.created_at)}
                </p>

                {payment.status === "pending" && payment.service_visit_id && (
                  <Button asChild variant="outline" className="mt-1 h-7 px-2 text-xs">
                    <Link
                      href={`/dashboard/maintenance/pay/${payment.service_visit_id}?amount=${payment.amount}&currency=${payment.currency}`}
                    >
                      Pay now
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}