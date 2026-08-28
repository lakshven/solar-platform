import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { runAdvancedQuote } from "@/lib/quoting/engine";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Json } from "@/types/database";

const calculatorInputSchema = z.object({
  postcode: z.string().min(2).max(10),
  propertyType: z.enum(["detached", "semi-detached", "terraced", "bungalow", "flat"]),
  annualUsageKwh: z.coerce.number().positive().max(50000),
  currentTariffPencePerKwh: z.coerce.number().positive().max(100),
  roofSuitability: z.enum(["excellent", "good", "limited", "unknown"]),
  hasExistingSolar: z.boolean(),
  existingSolarKwp: z.coerce.number().optional(),
  hasExistingBattery: z.boolean(),
  vehicle: z.enum(["none", "phev", "ev"]),
  annualMileage: z.coerce.number().optional(),
  heatingSystem: z.enum(["gas-boiler", "oil-boiler", "electric", "heat-pump", "other"]),
  priorities: z.array(z.enum(["lower-bills", "energy-independence", "sustainability", "backup-power"])),
  // Optional contact details — present once the user asks for their detailed quote.
  fullName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  requestedScenarioId: z.string().optional(),
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

  const parsed = calculatorInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", issues: parsed.error.issues }, { status: 400 });
  }

  const {
    fullName,
    email,
    phone,
    marketingOptIn,
    requestedScenarioId,
    ...input
  } = parsed.data;

  // Runs all seven intelligence layers: satellite roof geometry, real
  // postcode + irradiance + DNO/tariff lookups, dynamic system design,
  // priority-weighted scenario ranking, economics, explainability, and
  // lead scoring. See lib/quoting/engine.ts.
  let result;

  try {
    result = await runAdvancedQuote(input);
  } catch (error) {
    console.error("Advanced quote calculation failed:", error);
    return NextResponse.json(
      { error: "Unable to calculate your savings right now. Please try again." },
      { status: 502 }
    );
  }

  // Persisting is best-effort: the quote always returns to the browser
  // even if Supabase is unreachable, so the tool keeps working.
  try {
    const supabase = createAdminClient();
    let leadId: string | null = null;

    if (email) {
      const { data: lead, error: leadError } = await supabase
        .from("leads")
        .insert({
          source: "check-your-savings",
          full_name: fullName ?? null,
          email,
          phone: phone ?? null,
          postcode: input.postcode,
          marketing_opt_in: marketingOptIn ?? false,
          // Straight from the lead-intelligence layer, so your lead list
          // is sortable by hottest opportunity the moment it lands.
          lead_score: result.leadIntelligence.leadScore,
          lead_tier: result.leadIntelligence.tier,
          bundle_score: result.leadIntelligence.bundleScore,
          predicted_revenue: result.leadIntelligence.predictedRevenue,
          notes: [
            requestedScenarioId
              ? `Requested scenario: ${requestedScenarioId}`
              : null,
            ...result.leadIntelligence.signals,
          ]
            .filter(Boolean)
            .join(" · "),
        })
        .select("id")
        .single();

      if (leadError) {
        console.error("Calculator lead persistence failed:", leadError);
      }

      leadId = lead?.id ?? null;
    }

    const { error: submissionError } = await supabase
      .from("calculator_submissions")
      .insert({
      lead_id: leadId,
      input: input as unknown as Json,
      scenarios: result.scenarios as unknown as Json,
      recommended_scenario: result.recommendedScenarioId,
      current_annual_bill: result.currentAnnualBill,
      address: result.address as unknown as Json,
      satellite: result.satellite as unknown as Json,
      location_intelligence: result.location as unknown as Json,
      explainability: result.explainability as unknown as Json,
      lead_intelligence: result.leadIntelligence as unknown as Json,
      confidence_score: result.explainability.confidenceScore,
      lead_score: result.leadIntelligence.leadScore,
      predicted_revenue: result.leadIntelligence.predictedRevenue,
      });

    if (submissionError) {
      console.error(
        "Calculator submission persistence failed:",
        submissionError
      );
    }
  } catch (err) {
    console.error("Supabase persistence failed (non-fatal):", err);
  }

  return NextResponse.json(result);
}
