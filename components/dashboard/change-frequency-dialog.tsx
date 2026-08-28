"use client";

import { API_URL } from "@/lib/api-url";

// components/dashboard/change-frequency-dialog.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Settings2 } from "lucide-react";
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

const OPTIONS = [
  { value: "quarterly", label: "Every 3 months" },
  { value: "biannual", label: "Every 6 months" },
  { value: "annual", label: "Once a year" },
];

export function ChangeFrequencyDialog({
  currentFrequency,
}: {
  currentFrequency: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [frequency, setFrequency] = useState(currentFrequency);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/maintenance/frequency`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ frequency }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not update your plan.");
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
        <Button variant="outline">
          <Settings2 className="h-4 w-4" /> Change frequency
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>How often should we visit?</DialogTitle>
          <DialogDescription>
            This applies from your next scheduled visit onward.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="mt-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="mt-4 space-y-2">
          {OPTIONS.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 rounded-md border border-input p-3 text-sm has-[:checked]:border-foreground"
            >
              <input
                type="radio"
                name="frequency"
                value={option.value}
                checked={frequency === option.value}
                onChange={() => setFrequency(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="accent" onClick={handleSave} disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}