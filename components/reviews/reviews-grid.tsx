"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReviewCard } from "./review-card";
import { REVIEWS } from "@/lib/reviews-data";

const FILTERS = [
  { value: "all", label: "All" },
  { value: "Solar", label: "Solar" },
  { value: "Battery", label: "Battery" },
  { value: "EV", label: "EV" },
  { value: "HP", label: "Heat Pump" },
  { value: "Commercial", label: "Commercial & Farms" },
];

function matches(system: string, filter: string) {
  if (filter === "all") return true;
  if (filter === "EV") return system.includes("EV");
  if (filter === "HP") return system.includes("HP") || system.toLowerCase().includes("heat pump");
  if (filter === "Commercial") return system.includes("Farm") || system.includes("Portfolio") || system.includes("Commercial");
  return system.includes(filter);
}

export function ReviewsGrid() {
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => REVIEWS.filter((r) => matches(r.system, filter)), [filter]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.value ? "border-primary bg-primary text-primary-foreground" : "border-input hover:bg-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <ReviewCard review={r} className="w-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <p className="mt-10 text-sm text-muted-foreground">No reviews in this category yet.</p>}
    </div>
  );
}
