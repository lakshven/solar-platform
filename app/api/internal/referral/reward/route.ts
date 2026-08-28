import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(
  request: NextRequest
) {
  try {
    const expectedSecret =
      process.env.BRIGHTGRID_INTERNAL_API_SECRET;

    if (!expectedSecret) {
      console.error(
        "BRIGHTGRID_INTERNAL_API_SECRET is missing"
      );

      return NextResponse.json(
        {
          error:
            "Server configuration error.",
        },
        { status: 500 }
      );
    }

    const suppliedSecret =
      request.headers.get(
        "x-brightgrid-internal-secret"
      );

    if (
      !suppliedSecret ||
      suppliedSecret !==
        expectedSecret
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    const body =
      await request.json();

    const referralId =
      typeof body.referralId ===
      "string"
        ? body.referralId.trim()
        : "";

    if (!referralId) {
      return NextResponse.json(
        {
          error:
            "referralId is required.",
        },
        { status: 400 }
      );
    }

    const admin =
      createAdminClient();

    const {
      data: rewardId,
      error,
    } = await admin.rpc(
      "issue_referral_reward",
      {
        p_referral_id:
          referralId,
      }
    );

    if (error) {
      console.error(
        "Referral reward issuance failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Unable to issue referral reward.",
          code: "REWARD_ISSUE_FAILED",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      rewardId,
    });
  } catch (error) {
    console.error(
      "Referral reward API error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}