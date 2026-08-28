"use client";

import { API_URL } from "@/lib/api-url";

// components/dashboard/resubscribe-button.tsx

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ResubscribeButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleResubscribe() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_URL}/api/maintenance/resubscribe`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not resubscribe.");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {error && (
        <p className="mb-2 rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
          {error}
        </p>
      )}
      <Button variant="accent" onClick={handleResubscribe} disabled={loading}>
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        <RotateCcw className="h-4 w-4" />
        Resubscribe
      </Button>
    </div>
  );
}