import { NextResponse } from "next/server";
import { requireStaff } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

const VALID_STATUSES = new Set([
  "pending",
  "contacted",
  "booked",
  "installation_completed",
  "cancelled",
  // "reward_issued" is set automatically by the DB trigger once
  // installation_completed fires — staff shouldn't set it directly.
]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const staffResult = await requireStaff();
  if ("error" in staffResult) return staffResult.error;

  const { id } = await params;

  let body: { status?: string; installationId?: string; notes?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const status = body.status ?? "";

  if (!VALID_STATUSES.has(status)) {
    return NextResponse.json(
      { error: "Invalid status." },
      { status: 400 }
    );
  }

  const now = new Date().toISOString();
  const update: Record<string, unknown> = { status };

  if (status === "contacted") update.contacted_at = now;
  if (status === "booked") update.booked_at = now;

  if (status === "installation_completed") {
    update.installation_completed_at = now;

    if (body.installationId) {
      update.installation_id = body.installationId;
    }
  }

  if (body.notes !== undefined) {
    update.notes = body.notes;
  }

  const admin = createAdminClient();

  const { data: referral, error } = await admin
    .from("referrals")
    .update(update)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Referral status update error:", error);
    return NextResponse.json(
      { error: "Unable to update referral." },
      { status: 500 }
    );
  }

  return NextResponse.json({ referral });
}