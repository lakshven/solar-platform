import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const staffResult = await requireStaff();
  if ("error" in staffResult) return staffResult.error;

  const { id } = await params;

  let body: { maintenanceSessionId?: string };

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const admin = createAdminClient();

  const { data: reward, error: fetchError } = await admin
    .from("referral_rewards")
    .select("id, status, expires_at")
    .eq("id", id)
    .maybeSingle();

  if (fetchError || !reward) {
    return NextResponse.json(
      { error: "Reward not found." },
      { status: 404 }
    );
  }

  if (reward.status === "redeemed") {
    return NextResponse.json(
      { error: "This reward has already been redeemed." },
      { status: 409 }
    );
  }

  if (
    reward.status === "expired" ||
    (reward.expires_at && new Date(reward.expires_at) < new Date())
  ) {
    return NextResponse.json(
      { error: "This reward has expired." },
      { status: 409 }
    );
  }

  const { data: updated, error: updateError } = await admin
    .from("referral_rewards")
    .update({
      status: "redeemed",
      redeemed_at: new Date().toISOString(),
      maintenance_session_id: body.maintenanceSessionId ?? null,
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    console.error("Reward redemption error:", updateError);
    return NextResponse.json(
      { error: "Unable to redeem reward." },
      { status: 500 }
    );
  }

  return NextResponse.json({ reward: updated });
}