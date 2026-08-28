import Link from "next/link";
import Image from "next/image";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { href: "/solar", label: "Solar" },
      { href: "/battery", label: "Battery Storage" },
      { href: "/ev-charging", label: "EV Charging" },
    ],
  },
  {
    title: "Business",
    links: [
      { href: "/commercial", label: "Commercial Solar" },
      { href: "/commercial#farms", label: "Solar for Farms" },
      { href: "/commercial#landlords", label: "Landlords & Portfolios" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/reviews", label: "Reviews" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/60">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center">
              <Image
                src="/logo.svg"
                alt="BrightGrid Energy"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="ml-2 font-display text-lg font-semibold">BrightGrid</span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              Solar, battery, EV charging and heat pumps for homes and businesses across London, Surrey
              and the South East — sized around your energy use, not a sales target.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} BrightGrid Energy Ltd. All rights reserved.</p>
          <p>Finance is provided by third-party finance partners, subject to status. BrightGrid is a credit broker, not a lender.</p>
        </div>
      </div>
    </footer>
  );
}
