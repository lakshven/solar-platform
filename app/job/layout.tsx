"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

const TABS = [
  { href: "/job", label: "Home" },
  { href: "/job/maintenance", label: "Maintenance" },
  { href: "/job/referrals", label: "Referrals" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="container mt-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">Employee dashboard</p>
          <h1 className="mt-2 font-display text-3xl font-medium">
            Welcome back
          </h1>
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="rounded-full px-4 py-2 text-sm font-medium hover:bg-secondary"
          >
            {t.label}
          </Link>
        ))}
      </nav>

      <div className="mt-8">{children}</div>
    </div>
  );
}