import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Verifies the request is from a signed-in user with a `customers`
 * row, and returns that row alongside a session-scoped Supabase
 * client (so subsequent reads are still governed by RLS).
 */
export async function requireCustomer() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      ),
    } as const;
  }

  const { data: customer, error } = await supabase
    .from("customers")
    .select("id, full_name, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("requireCustomer lookup error:", error);
    return {
      error: NextResponse.json(
        { error: "Unable to verify your account." },
        { status: 500 }
      ),
    } as const;
  }

  if (!customer) {
    return {
      error: NextResponse.json(
        { error: "This action is only available to customer accounts." },
        { status: 403 }
      ),
    } as const;
  }

  return { supabase, user, customer } as const;
}

/**
 * Verifies the request is from an active employee. This is a
 * baseline "is staff" check, not a permissions system — anyone
 * active in `employees` can call staff referral endpoints. If you
 * need finer-grained roles (e.g. only ops can mark installs
 * complete), add a role/permission column to `employees` and check
 * it here.
 */
export async function requireStaff() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      error: NextResponse.json(
        { error: "Please sign in." },
        { status: 401 }
      ),
    } as const;
  }

  const { data: employee, error } = await supabase
    .from("employees")
    .select("id, status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    console.error("requireStaff lookup error:", error);
    return {
      error: NextResponse.json(
        { error: "Unable to verify your account." },
        { status: 500 }
      ),
    } as const;
  }

  if (!employee || employee.status !== "active") {
    return {
      error: NextResponse.json(
        { error: "Staff access required." },
        { status: 403 }
      ),
    } as const;
  }

  return { supabase, user, employee } as const;
}