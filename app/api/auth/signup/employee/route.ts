import { NextResponse } from "next/server";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

const JOB_TITLES = new Set([
  "Solar Installer",
  "Lead Installer",
  "Electrician",
  "Site Surveyor",
  "Project Manager",
  "Warehouse / Logistics",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    fullName?: string;
    email?: string;
    password?: string;
    jobTitle?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const fullName = body.fullName?.trim() ?? "";
  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const jobTitle = body.jobTitle ?? "";

  /*
   * Server-side validation.
   *
   * The client already checks these, but never trust the client.
   */
  if (!fullName) {
    return NextResponse.json(
      { error: "Please fill this field: Full name" },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Please use a valid email address." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  if (!JOB_TITLES.has(jobTitle)) {
    return NextResponse.json(
      { error: "Please select a valid job title." },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.error("Missing Supabase env vars for employee signup.");
    return NextResponse.json(
      { error: "Unable to create your account. Please try again later." },
      { status: 500 }
    );
  }

  /*
   * Create the auth user with the anon-key client so the normal
   * signup + email-confirmation flow runs exactly like it does
   * for customers. `role: "employee"` in user_metadata lets the
   * login page (and RLS policies, if you want) tell employees and
   * customers apart without a second lookup.
   */
  const authClient = createSupabaseClient(url, anonKey);

  const { data, error: signUpError } = await authClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role: "employee",
      },
      emailRedirectTo: `${new URL(request.url).origin}/auth/confirm`,
    },
  });

  if (signUpError) {
    console.error("Employee signup error:", signUpError);

    const message = signUpError.message?.toLowerCase() ?? "";

    if (
      signUpError.status === 429 ||
      signUpError.code === "over_email_send_rate_limit"
    ) {
      return NextResponse.json(
        {
          error:
            "Too many signup attempts. Please wait a few minutes and try again.",
        },
        { status: 429 }
      );
    }

    if (message.includes("already registered") || message.includes("exists")) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: "Unable to create your account. Please try again." },
      { status: 500 }
    );
  }

  if (!data.user) {
    return NextResponse.json(
      { error: "Unable to create your account. Please try again." },
      { status: 500 }
    );
  }

  /*
   * Insert the employee profile row with the admin (service-role)
   * client so this succeeds regardless of RLS — a brand-new,
   * not-yet-confirmed user has no session to write with anyway.
   *
   * Adjust the `status` default to "pending" here if you want an
   * admin to approve new hires before they show up on schedules.
   */
  const admin = createAdminClient();

  const { error: profileError } = await admin.from("employees").insert({
    user_id: data.user.id,
    full_name: fullName,
    job_title: jobTitle,
    status: "active",
  });

  if (profileError) {
    console.error("Employee profile insert error:", profileError);

    /*
     * The auth user now exists without a matching employees row.
     * Rather than leaving an orphaned account, clean it up so the
     * person can safely try signing up again.
     */
    await admin.auth.admin.deleteUser(data.user.id);

    return NextResponse.json(
      { error: "Unable to create your account. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}