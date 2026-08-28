import Link from "next/link";

const TABS = [
  { href: "/admin", label: "Energy" },
  { href: "/admin/maintenance", label: "Maintenance" },
  { href: "/admin/referrals", label: "Referrals" },
  { href: "/admin/upgrades", label: "Upgrades" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <div className="container mt-10">
        <p className="eyebrow">Admin dashboard</p>
        <h1 className="mt-2 font-display text-3xl font-medium">Welcome back</h1>

        <nav className="mt-6 flex flex-wrap gap-2 border-b border-border pb-4">
          {TABS.map((t) => (
            <Link key={t.href} href={t.href} className="rounded-full px-4 py-2 text-sm font-medium hover:bg-secondary">
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="mt-8">{children}</div>
      </div>
  );
}
