"use client";

// components/dashboard/reschedule-dialog.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarClock, CheckCircle2, Loader2 } from "lucide-react";
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

const TIME_SLOTS = ["09:00", "11:00", "13:00", "15:00"];

export function RescheduleDialog({
  subscriptionId,
  currentDate,
  currentTime,
}: {
  subscriptionId: string;
  currentDate: string; // ISO date, e.g. "2027-09-15"
  currentTime?: string; // "HH:MM", one of TIME_SLOTS
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(currentDate);
  const [time, setTime] = useState(
    currentTime && TIME_SLOTS.includes(currentTime) ? currentTime : TIME_SLOTS[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const minDate = new Date().toISOString().split("T")[0];

  async function handleReschedule() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/maintenance/reschedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subscriptionId, newDate: date, newTime: time }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not reschedule.");
      setSuccess(true);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setSuccess(false);
          setError(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">
          <CalendarClock className="h-4 w-4" /> Reschedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        {success ? (
          <div className="flex flex-col items-center py-4 text-center">
            <CheckCircle2 className="h-10 w-10 text-leaf" />
            <h3 className="mt-3 font-display text-lg font-medium">Rescheduled</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Your next visit is now set for{" "}
              {new Date(date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              at {time}.
            </p>
            <Button className="mt-5" onClick={() => setOpen(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Reschedule your service visit</DialogTitle>
              <DialogDescription>
                Choose a new date and time — you can rebook up until our stated
                cutoff.
              </DialogDescription>
            </DialogHeader>

            {error && (
              <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                {error}
              </p>
            )}

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reschedule-date">New date</Label>
                <Input
                  id="reschedule-date"
                  type="date"
                  min={minDate}
                  className="mt-1.5"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="reschedule-time">Time slot</Label>
                <select
                  id="reschedule-time"
                  className="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
                Cancel
              </Button>
              <Button variant="accent" onClick={handleReschedule} disabled={loading}>
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Confirm new date
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}