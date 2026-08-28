import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const accessToken = body.access_token;
    const refreshToken = body.refresh_token;

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        {
          error: "Invalid confirmation tokens.",
        },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error || !data.user) {
      console.error(
        "Email confirmation failed:",
        error
      );

      return NextResponse.json(
        {
          error:
            "This confirmation link is invalid or has expired.",
        },
        { status: 400 }
      );
    }

    const user = data.user;

    // Supabase has now authenticated the confirmed user.
    // Synchronise the customer record.
    const { error: customerError } = await supabase
      .from("customers")
      .update({
        email_verified: true,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", user.id);

    if (customerError) {
      console.error(
        "Failed to update customer verification:",
        customerError
      );

      return NextResponse.json(
        {
          error:
            "Your email was confirmed, but we could not update your customer profile.",
        },
        { status: 500 }
      );
    }

    const { data: employee } = await supabase
      .from("employees")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      destination: employee ? "/job" : "/dashboard",
    });
  } catch (error) {
    console.error(
      "Confirmation API error:",
      error
    );

    return NextResponse.json(
      {
        error: "Unable to confirm your email.",
      },
      { status: 500 }
    );
  }
}