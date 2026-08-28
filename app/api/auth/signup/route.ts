import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const referralCookieName = "brightgrid_referral";
const referralCodeRegex = /^BG-[A-Z0-9]{6}$/;

function createAuthClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase environment variables");
  }

  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!fullName) {
      return NextResponse.json({ error: "Please fill this field: Full name", code: "FULL_NAME_REQUIRED" }, { status: 400 });
    }
    if (!email) {
      return NextResponse.json({ error: "Please fill this field: Email", code: "EMAIL_REQUIRED" }, { status: 400 });
    }
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Please use a valid email address.", code: "INVALID_EMAIL" }, { status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters.", code: "PASSWORD_TOO_SHORT" }, { status: 400 });
    }

    const cookieValue = request.cookies.get(referralCookieName)?.value ?? null;
    const normalizedCode = cookieValue?.trim().toUpperCase() ?? null;
    const referralCode = normalizedCode && referralCodeRegex.test(normalizedCode)
      ? normalizedCode
      : null;
    const admin = createAdminClient();

    const { data: existingCustomer, error: customerLookupError } = await admin
      .from("customers")
      .select("id")
      .eq("email_normalized", email)
      .maybeSingle();

    if (customerLookupError) {
      console.error("Customer lookup failed:", customerLookupError);
      return NextResponse.json({ error: "Unable to check your account.", code: "CUSTOMER_LOOKUP_FAILED" }, { status: 500 });
    }
    if (existingCustomer) {
      return NextResponse.json({ error: "An account already exists with this email. Please log in.", code: "ACCOUNT_EXISTS" }, { status: 409 });
    }

    let referrerCustomer: { id: string; email: string; email_normalized: string | null } | null = null;
    if (referralCode) {
      const { data, error } = await admin
        .from("customers")
        .select("id, email, email_normalized")
        .eq("referral_code", referralCode)
        .maybeSingle();

      if (error) {
        console.error("Referral owner lookup failed:", error);
        return NextResponse.json({ error: "Unable to process this referral.", code: "REFERRAL_LOOKUP_FAILED" }, { status: 500 });
      }
      if (!data) {
        return NextResponse.json({ error: "This referral link is no longer valid.", code: "REFERRAL_NOT_FOUND" }, { status: 400 });
      }
      if ((data.email_normalized ?? data.email).trim().toLowerCase() === email) {
        return NextResponse.json({ error: "You cannot use your own referral link.", code: "SELF_REFERRAL" }, { status: 400 });
      }
      referrerCustomer = data;
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!siteUrl) {
      return NextResponse.json({ error: "Server configuration error.", code: "SITE_URL_MISSING" }, { status: 500 });
    }

    const supabase = createAuthClient();
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${siteUrl.replace(/\/$/, "")}/auth/confirm`,
      },
    });

    if (authError || !authData.user) {
      console.error("Supabase signup failed:", authError);
      return NextResponse.json({ error: "Unable to create your account. Please try again.", code: "SIGNUP_FAILED" }, { status: 400 });
    }

    const { data: customer, error: customerError } = await admin
      .from("customers")
      .upsert({
        user_id: authData.user.id,
        full_name: fullName,
        email,
        email_normalized: email,
        updated_at: new Date().toISOString(),
      }, { onConflict: "user_id" })
      .select("id")
      .single();

    if (customerError || !customer) {
      console.error("Customer provisioning failed:", customerError);
      return NextResponse.json({ error: "Your account was created, but we couldn't create your customer profile.", code: "CUSTOMER_PROVISIONING_FAILED" }, { status: 500 });
    }

    if (referrerCustomer && referralCode) {
      const { data: referral, error: referralError } = await admin
        .from("referrals")
        .insert({
          referrer_customer_id: referrerCustomer.id,
          referred_user_id: customer.id,
          referred_name: fullName,
          referred_email: email,
          referral_code: referralCode,
          status: "pending",
          discount_amount: 300,
          discount_currency: "GBP",
          discount_applied: false,
        })
        .select("id")
        .single();

      if (referralError || !referral) {
        console.error("Referral record creation failed:", referralError);
        return NextResponse.json({ error: "Your account was created, but we couldn't record the referral.", code: "REFERRAL_CREATE_FAILED" }, { status: 500 });
      }
    }

    const response = NextResponse.json({
      success: true,
      requiresEmailConfirmation: !authData.session,
      referralClaimed: Boolean(referrerCustomer),
      referralCode,
      message: "Account created. Please check your email to confirm your account.",
    }, { status: 201 });

    if (referralCode) {
      response.cookies.set(referralCookieName, "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 0,
        expires: new Date(0),
        path: "/",
      });
    }

    return response;
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again.", code: "INTERNAL_ERROR" }, { status: 500 });
  }
}