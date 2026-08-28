import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";

export async function GET() {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { supabase, customer } = result;

  const { data: customerRow, error: customerError } = await supabase
    .from("customers")
    .select(
      "referral_code, referral_clicks, referral_first_clicked_at, referral_last_clicked_at"
    )
    .eq("id", customer.id)
    .single();

  if (customerError) {
    console.error("Referral link lookup error:", customerError);
    return NextResponse.json(
      { error: "Unable to load your referral link." },
      { status: 500 }
    );
  }

  const { data: referrals, error: referralsError } = await supabase
    .from("referrals")
    .select("*")
    .eq("referrer_customer_id", customer.id)
    .order("created_at", { ascending: false });

  if (referralsError) {
    console.error("Referral list error:", referralsError);
    return NextResponse.json(
      { error: "Unable to load your referrals." },
      { status: 500 }
    );
  }

  const { data: rewards, error: rewardsError } = await supabase
    .from("referral_rewards")
    .select("*")
    .eq("customer_id", customer.id)
    .order("created_at", { ascending: false });

  if (rewardsError) {
    console.error("Referral rewards list error:", rewardsError);
    return NextResponse.json(
      { error: "Unable to load your rewards." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    link: customerRow.referral_code
      ? {
          code: customerRow.referral_code,
          clicks: customerRow.referral_clicks,
          firstClickedAt: customerRow.referral_first_clicked_at,
          lastClickedAt: customerRow.referral_last_clicked_at,
        }
      : null,
    referrals: referrals ?? [],
    rewards: rewards ?? [],
  });
}