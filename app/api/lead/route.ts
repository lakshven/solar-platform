import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      source,
      siteType,
      interests,
      name,
      company,
      role,
      email,
      phone,
      address,
      sites,
      consumption,
      message,
    } = body;

    // Basic validation
    if (!name || !company || !email) {
      return NextResponse.json(
        {
          success: false,
          error: "Name, company and email are required.",
        },
        { status: 400 }
      );
    }

    // Save lead to Supabase
    const { data, error } = await supabase
      .from("lead")
      .insert({
        source: source || "commercial_assessment",
        site_type: siteType || null,
        interests: interests || [],
        name,
        company,
        role: role || null,
        email,
        phone: phone || null,
        address: address || null,
        number_of_sites: sites ? Number(sites) : null,
        annual_consumption: consumption || null,
        message: message || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save your request.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error("API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong while submitting the form.",
      },
      { status: 500 }
    );
  }
}