// lib/payments/provider.ts
export type ChargeResult =
  | { success: true; reference: string }
  | { success: false; error: string };

/**
 * Minimal payment provider adapter.
 *
 * This mock always succeeds, so the booking → charge → reward
 * pipeline is fully testable end-to-end without a real processor
 * configured. Every route in app/api/maintenance only depends on the
 * `ChargeResult` shape above, so swapping this out for a real
 * provider means changing this one function and nothing else.
 *
 * To wire up Stripe, for example:
 *
 *   const intent = await stripe.paymentIntents.create({
 *     amount: Math.round(params.amount * 100),
 *     currency: params.currency.toLowerCase(),
 *     description: params.description,
 *     metadata: { customerId: params.customerId },
 *     confirm: true,
 *     ...
 *   });
 *
 *   return intent.status === "succeeded"
 *     ? { success: true, reference: intent.id }
 *     : { success: false, error: "Payment could not be confirmed." };
 */
export async function charge(params: {
  amount: number;
  currency: string;
  customerId: string;
  description: string;
}): Promise<ChargeResult> {
  console.log("[mock payment] charging", params);

  return { success: true, reference: `mock_${crypto.randomUUID()}` };
}