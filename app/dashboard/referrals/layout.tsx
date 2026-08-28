import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Referrals — BrightGrid Energy",
};

export default function ReferralsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}