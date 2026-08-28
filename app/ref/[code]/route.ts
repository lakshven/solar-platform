import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

const REFERRAL_COOKIE = "brightgrid_referral";

export async function GET(
  request: NextRequest,
  { params }: { params: { code: string } }
) {
  const code = params.code.trim().toUpperCase();
  const admin = createAdminClient();

  const { data: customer, error } = await admin
    .from("customers")
    .select("id, referral_code, referral_clicks, referral_first_clicked_at")
    .eq("referral_code", code)
    .maybeSingle();

  if (error) {
    console.error("Referral code lookup error:", error);
    return NextResponse.json(
      { error: "Unable to process this referral link." },
      { status: 500 }
    );
  }

  if (!customer) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  const now = new Date().toISOString();
  const { error: clickError } = await admin
    .from("customers")
    .update({
      referral_clicks: (customer.referral_clicks ?? 0) + 1,
      referral_first_clicked_at: customer.referral_first_clicked_at ?? now,
      referral_last_clicked_at: now,
    })
    .eq("id", customer.id);

  if (clickError) {
    console.error("Referral click update error:", clickError);
  }

  const response = NextResponse.redirect(
    new URL(`/signup?ref=${encodeURIComponent(code)}`, request.url)
  );

  response.cookies.set(REFERRAL_COOKIE, code, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  return response;
}