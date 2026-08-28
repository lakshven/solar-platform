import { redirect } from "next/navigation";
import { Briefcase, CalendarClock, CheckCircle2, Wallet } from "lucide-react";

import { Card } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "My Dashboard — BrightGrid Energy" };

type Job = {
  id: string;
  customer_name: string;
  address: string | null;
  job_type: string;
  status: string;
  scheduled_date: string | null;
  completed_at: string | null;
};

type Payment = {
  id: string;
  amount: number;
  status: string;
  paid_at: string | null;
  created_at: string;
  job_id: string | null;
};

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(amount);
}

export default async function EmployeeDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/dashboard/employee");
  }

  const { data: employee } = await supabase
    .from("employees")
    .select("id, full_name, job_title, status")
    .eq("user_id", user.id)
    .maybeSingle();

  /*
   * No matching employees row — this account isn't an employee.
   * Send them to the regular customer dashboard instead of
   * showing an empty/broken page.
   */
  if (!employee) {
    redirect("/dashboard");
  }

  const [{ data: upcomingJobs }, { data: pastJobs }, { data: payments }] =
    await Promise.all([
      supabase
        .from("jobs")
        .select(
          "id, customer_name, address, job_type, status, scheduled_date, completed_at"
        )
        .eq("employee_id", employee.id)
        .in("status", ["scheduled", "in_progress"])
        .order("scheduled_date", { ascending: true }),

      supabase
        .from("jobs")
        .select(
          "id, customer_name, address, job_type, status, scheduled_date, completed_at"
        )
        .eq("employee_id", employee.id)
        .eq("status", "completed")
        .order("completed_at", { ascending: false })
        .limit(10),

      supabase
        .from("payments")
        .select("id, amount, status, paid_at, created_at, job_id")
        .eq("employee_id", employee.id)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const upcoming = (upcomingJobs ?? []) as Job[];
  const completed = (pastJobs ?? []) as Job[];
  const paymentHistory = (payments ?? []) as Payment[];

  const totalPaid = paymentHistory
    .filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  const totalPending = paymentHistory
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
      <div className="container max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-medium">
              {employee.full_name.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {employee.job_title}
              {employee.status !== "active" && (
                <span className="ml-2 rounded-full bg-secondary px-2 py-0.5 text-xs font-medium capitalize">
                  {employee.status}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span className="text-sm">Jobs completed</span>
            </div>
            <p className="mt-2 font-display text-2xl font-medium">
              {completed.length}
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarClock className="h-4 w-4" />
              <span className="text-sm">Upcoming jobs</span>
            </div>
            <p className="mt-2 font-display text-2xl font-medium">
              {upcoming.length}
            </p>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Wallet className="h-4 w-4" />
              <span className="text-sm">Paid to date</span>
            </div>
            <p className="mt-2 font-display text-2xl font-medium">
              {formatCurrency(totalPaid)}
            </p>
            {totalPending > 0 && (
              <p className="mt-1 text-xs text-muted-foreground">
                {formatCurrency(totalPending)} pending
              </p>
            )}
          </Card>
        </div>

        {/* Upcoming jobs */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-lg font-medium">
            <CalendarClock className="h-5 w-5" />
            Upcoming installations
          </h2>

          <Card className="mt-3 divide-y p-0">
            {upcoming.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">
                Nothing scheduled yet. New jobs assigned to you will show up
                here.
              </p>
            )}

            {upcoming.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-2 p-5"
              >
                <div>
                  <p className="text-sm font-medium">{job.customer_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.job_type}
                    {job.address ? ` · ${job.address}` : ""}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {formatDate(job.scheduled_date)}
                  </p>
                  <p className="text-xs capitalize text-muted-foreground">
                    {job.status.replace("_", " ")}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>

        {/* Past jobs */}
        <div className="mt-8">
          <h2 className="flex items-center gap-2 font-display text-lg font-medium">
            <Briefcase className="h-5 w-5" />
            Jobs you've completed
          </h2>

          <Card className="mt-3 divide-y p-0">
            {completed.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">
                Completed jobs will appear here once they're marked done.
              </p>
            )}

            {completed.map((job) => (
              <div
                key={job.id}
                className="flex flex-wrap items-center justify-between gap-2 p-5"
              >
                <div>
                  <p className="text-sm font-medium">{job.customer_name}</p>
                  <p className="text-sm text-muted-foreground">
                    {job.job_type}
                    {job.address ? ` · ${job.address}` : ""}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {formatDate(job.completed_at)}
                </p>
              </div>
            ))}
          </Card>
        </div>

        {/* Payment history */}
        <div className="mt-8 mb-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-medium">
            <Wallet className="h-5 w-5" />
            Payment history
          </h2>

          <Card className="mt-3 divide-y p-0">
            {paymentHistory.length === 0 && (
              <p className="p-5 text-sm text-muted-foreground">
                No payments recorded yet.
              </p>
            )}

            {paymentHistory.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-wrap items-center justify-between gap-2 p-5"
              >
                <p className="text-sm font-medium">
                  {formatCurrency(Number(payment.amount))}
                </p>
                <div className="text-right">
                  <p className="text-sm capitalize text-muted-foreground">
                    {payment.status}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(payment.paid_at ?? payment.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
  );
}