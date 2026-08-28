"use client";

// app/dashboard/maintenance/pay/[visitId]/page.tsx

import { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, CreditCard, Gift, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function PayServiceVisitPage() {
  const params = useParams<{ visitId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();

  const displayAmount = searchParams.get("amount");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ waived: boolean; amount: number } | null>(
    null
  );

  /*
   * Demo-only card fields. These are never sent anywhere — only the
   * visit id is posted below, and the server decides the actual
   * amount and whether a reward applies. Swap this form for your
   * payment provider's hosted fields (e.g. Stripe Elements) before
   * handling real cards; see lib/payments/provider.ts.
   */
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  function handleCardNumberChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    setCardNumber(digits.match(/.{1,4}/g)?.join(" ") ?? "");
  }

  function handleExpiryChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiry(
      digits.length > 2
        ? `${digits.slice(0, 2)}/${digits.slice(2)}`
        : digits
    );
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/maintenance/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceVisitId: params.visitId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment failed. Please try again.");
      }

      setResult({ waived: data.waived, amount: data.amount });
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <Card className="max-w-md p-8 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-leaf" />

        <h1 className="mt-4 font-display text-xl font-medium">
          {result.waived ? "Reward applied" : "Payment complete"}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {result.waived
            ? "This visit was free — one of your maintenance rewards covered it."
            : `We've charged £${result.amount.toFixed(2)} for this visit.`}
        </p>

        <Button className="mt-6" onClick={() => router.push("/maintenance")}>
          Back to maintenance
        </Button>
      </Card>
    );
  }

  return (
    <Card className="max-w-md p-8">
      <h1 className="font-display text-xl font-medium">Pay for your visit</h1>

      <p className="mt-1 text-sm text-muted-foreground">
        {displayAmount
          ? `Amount due: £${displayAmount}`
          : "We'll confirm the exact amount before charging you."}
      </p>

      <div className="mt-4 flex items-start gap-2 rounded-md bg-muted p-3 text-sm text-muted-foreground">
        <Gift className="mt-0.5 h-4 w-4 flex-shrink-0" />
        <span>
          If you have a free maintenance reward available, it&apos;s applied
          automatically — you won&apos;t be charged.
        </span>
      </div>

      <form onSubmit={handlePay} className="mt-6 space-y-4">
        {error && (
          <p className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <div>
          <Label htmlFor="cardNumber">Card number</Label>
          <Input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            placeholder="4242 4242 4242 4242"
            autoComplete="cc-number"
            maxLength={23}
            spellCheck={false}
            className="mt-1.5"
            value={cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            required
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiry">Expiry</Label>
            <Input
              id="expiry"
              type="text"
              inputMode="numeric"
              placeholder="MM/YY"
              autoComplete="cc-exp"
              maxLength={5}
              className="mt-1.5"
              value={expiry}
              onChange={(e) => handleExpiryChange(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <Label htmlFor="cvc">CVC</Label>
            <Input
              id="cvc"
              type="text"
              inputMode="numeric"
              placeholder="123"
              autoComplete="cc-csc"
              maxLength={3}
              pattern="[0-9]{3}"
              className="mt-1.5"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
              required
              disabled={loading}
            />
          </div>
        </div>

        <Button type="submit" variant="accent" className="w-full" disabled={loading}>
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          <CreditCard className="h-4 w-4" />
          {loading ? "Processing..." : "Pay now"}
        </Button>
      </form>
    </Card>
  );
}