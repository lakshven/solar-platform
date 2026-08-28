"use client";

import { API_URL } from "@/lib/api-url";

// components/dashboard/payment-method-dialog.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export function PaymentMethodDialog({ hasCard }: { hasCard: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/maintenance/payment-method`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cardNumber, expiry, cvv }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not save your card.");
      setOpen(false);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      router.refresh();
    } catch (e2) {
      setError(e2 instanceof Error ? e2.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleCardNumberChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 19);
    setCardNumber(digits.replace(/(.{4})/g, "$1 ").trim());
  }

  function handleExpiryChange(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    setExpiry(digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <CreditCard className="h-4 w-4" /> {hasCard ? "Update card" : "Add card"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>
              {hasCard ? "Update payment method" : "Add a payment method"}
            </DialogTitle>
            <DialogDescription>
              Used for visits that aren&apos;t covered by a free maintenance
              reward.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <p className="mt-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-4 space-y-4">
            <div>
              <Label htmlFor="pm-card-number">Card number</Label>
              <Input
                id="pm-card-number"
                inputMode="numeric"
                placeholder="4242 4242 4242 4242"
                autoComplete="cc-number"
                maxLength={23}
                className="mt-1.5"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <Label htmlFor="pm-expiry">Expiry (MM/YY)</Label>
              <Input
                id="pm-expiry"
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
              <Label htmlFor="pm-cvv">Security code</Label>
              <Input
                id="pm-cvv"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                maxLength={3}
                pattern="[0-9]{3}"
                className="mt-1.5"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                required
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={loading}>
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Save card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}