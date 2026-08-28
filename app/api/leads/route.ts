import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const leadSchema = z.object({
  source: z.enum([
    "check-your-savings",
    "existing-solar-battery",
    "commercial",
    "farm",
    "landlord",
    "referral",
    "contact-form",
    "other",
  ]),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  postcode: z.string().optional(),
  notes: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Request body must be valid JSON." },
      { status: 400 }
    );
  }

  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const { fullName, marketingOptIn, ...rest } = parsed.data;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .insert({
      ...rest,
      full_name: fullName,
      marketing_opt_in: marketingOptIn ?? false,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Failed to save lead:", error);
    return NextResponse.json({ error: "Could not save your details right now." }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}
