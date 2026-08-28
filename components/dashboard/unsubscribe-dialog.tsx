"use client";

import { API_URL } from "@/lib/api-url";

// components/dashboard/unsubscribe-dialog.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export function UnsubscribeDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUnsubscribe() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/maintenance/unsubscribe`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not cancel your plan.");
      setOpen(false);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Unsubscribe</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cancel Home Energy Care?</DialogTitle>
          <DialogDescription>
            This cancels any upcoming visits immediately and stops future
            billing. You can resubscribe any time.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="mt-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-2 flex items-start gap-2 rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>You&apos;ll lose your next scheduled visit if you cancel now.</span>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Keep my plan
          </Button>
          <Button variant="accent" onClick={handleUnsubscribe} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Confirm cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}