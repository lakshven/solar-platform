import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { generateUniqueReferralCode } from "@/lib/referral/code";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST() {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  /*
   * The link is permanent and reusable, so "creating" one is
   * idempotent — if the customer already has a code, just hand it
   * back instead of generating a new one.
   */
  const { data: existing, error: existingError } = await supabase
    .from("customers")
    .select("referral_code")
    .eq("id", customer.id)
    .single();

  if (existingError) {
    console.error("Referral link lookup error:", existingError);
    return NextResponse.json(
      { error: "Unable to load your referral link. Please try again." },
      { status: 500 }
    );
  }

  if (existing.referral_code) {
    return NextResponse.json({ referralCode: existing.referral_code });
  }

  let referralCode: string;

  try {
    referralCode = await generateUniqueReferralCode();
  } catch (err) {
    console.error("Referral code generation failed:", err);
    return NextResponse.json(
      { error: "Unable to create your referral link. Please try again." },
      { status: 500 }
    );
  }

  const admin = createAdminClient();

  const { data: updated, error: updateError } = await admin
    .from("customers")
    .update({ referral_code: referralCode })
    .eq("id", customer.id)
    .select("referral_code")
    .single();

  if (updateError) {
    console.error("Referral link creation error:", {
      code: updateError.code,
      message: updateError.message,
      details: updateError.details,
      hint: updateError.hint,
      customerId: customer.id,
    });
    return NextResponse.json(
      { error: "Unable to create your referral link. Please try again." },
      { status: 500 }
    );
  }

  if (!updated?.referral_code) {
    console.error("Referral link update returned no code:", {
      customerId: customer.id,
      generatedCode: referralCode,
    });
    return NextResponse.json(
      { error: "Unable to create your referral link. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ referralCode: updated.referral_code });
}