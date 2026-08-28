import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatGBP(value: number, opts: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
    ...opts,
  }).format(value);
}

export function formatKwh(value: number) {
  return `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(value)} kWh`;
}
