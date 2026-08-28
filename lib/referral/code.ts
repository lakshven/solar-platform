import { createAdminClient } from "@/lib/supabase/admin";

// No 0/O/1/I — avoids codes that are ambiguous when read aloud or typed.
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
const SEGMENT_LENGTH = 6;
const MAX_ATTEMPTS = 8;

function randomSegment(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);

  let out = "";
  for (let i = 0; i < length; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/**
 * Generates a referral code like "BG-7K4RTQ", retrying on the rare
 * collision. This is now a permanent, reusable code that lives on
 * customers.referral_code — one per customer, shared with as many
 * people as they like — not a single-use code per invitee.
 */
export async function generateUniqueReferralCode(): Promise<string> {
  const admin = createAdminClient();

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const code = `BG-${randomSegment(SEGMENT_LENGTH)}`;

    const { data, error } = await admin
      .from("customers")
      .select("id")
      .eq("referral_code", code)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return code;
    }
  }

  throw new Error(
    "Unable to generate a unique referral code after several attempts."
  );
}