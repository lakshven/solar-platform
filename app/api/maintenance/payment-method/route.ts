// app/api/maintenance/payment-method/route.ts
import { NextResponse } from "next/server";
import { requireCustomer } from "@/lib/referral/guards";
import { createAdminClient } from "@/lib/supabase/admin";

const CARD_NUMBER_REGEX = /^\d{13,19}$/;
const EXPIRY_REGEX = /^(0[1-9]|1[0-2])\/(\d{2})$/;
const CVV_REGEX = /^\d{3}$/;

function passesLuhnCheck(value: string) {
  let sum = 0;
  let doubleDigit = false;

  for (let index = value.length - 1; index >= 0; index -= 1) {
    let digit = Number(value[index]);
    if (doubleDigit) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    doubleDigit = !doubleDigit;
  }

  return sum % 10 === 0;
}

export async function PUT(request: Request) {
  const result = await requireCustomer();
  if ("error" in result) return result.error;

  const { customer } = result;

  let body: { cardNumber?: string; expiry?: string; cvv?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  const rawCardNumber = (body.cardNumber ?? "").replace(/\s+/g, "");
  const expiry = body.expiry ?? "";
  const cvv = body.cvv ?? "";

  if (!CARD_NUMBER_REGEX.test(rawCardNumber) || !passesLuhnCheck(rawCardNumber)) {
    return NextResponse.json(
      { error: "Please enter a valid card number." },
      { status: 400 }
    );
  }

  const expiryMatch = EXPIRY_REGEX.exec(expiry);

  if (!expiryMatch) {
    return NextResponse.json(
      { error: "Please enter a valid expiry date (MM/YY)." },
      { status: 400 }
    );
  }

  if (!CVV_REGEX.test(cvv)) {
    return NextResponse.json(
      { error: "Please enter a valid 3-digit security code." },
      { status: 400 }
    );
  }

  const expiryMonth = Number(expiryMatch[1]);
  const expiryYear = 2000 + Number(expiryMatch[2]);
  const expiryDate = new Date(expiryYear, expiryMonth, 0, 23, 59, 59);

  if (expiryDate < new Date()) {
    return NextResponse.json(
      { error: "Your card has expired." },
      { status: 400 }
    );
  }

  /*
   * Demo-only: this never stores (or even sees, in a real
   * integration) a full card number. A real setup exchanges raw card
   * details for a token/payment-method-id from your provider (e.g.
   * Stripe Elements + `stripe.paymentMethods.create`) directly in the
   * browser, and only that token — never the PAN — reaches this
   * route. We keep the last 4 digits here purely so the UI has
   * something real to display, mirroring what a real integration
   * would show.
   */
  const last4 = rawCardNumber.slice(-4);
  const expMonth = expiryMonth;
  const expYear = expiryYear;

  const admin = createAdminClient();

  const { error } = await admin.from("payment_methods").upsert(
    {
      customer_id: customer.id,
      brand: "Card",
      last4,
      exp_month: expMonth,
      exp_year: expYear,
      is_default: true,
    },
    { onConflict: "customer_id" }
  );

  if (error) {
    console.error("Payment method upsert error:", error);
    return NextResponse.json(
      { error: "Unable to save your payment method. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, last4, expMonth, expYear });
}