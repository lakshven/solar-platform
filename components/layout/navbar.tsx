"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/battery", label: "Battery" },
  { href: "/ev-charging", label: "EV Charging" },
  { href: "/operations", label: "Operations" },
  { href: "/blog", label: "Blog" },
];

const COMMERCIAL_LINKS = [
  {
    href: "/commercial",
    label: "Commercial overview",
    description: "Solar, batteries, EV charging & PPAs",
  },
  {
    href: "/warehouse",
    label: "Warehouses",
    description: "Large roofs, logistics & distribution",
  },
  {
    href: "/school",
    label: "Schools & trusts",
    description: "Energy solutions across education estates",
  },
  {
    href: "/industrial",
    label: "Industrial",
    description: "High-demand industrial energy systems",
  },
  {
    href: "/retail",
    label: "Retail & car parks",
    description: "Solar car parks, EV charging & batteries",
  },
  {
    href: "/farms",
    label: "Farms",
    description: "Agricultural solar, storage & energy",
  },
  {
    href: "/portfolio",
    label: "Property portfolios",
    description: "One energy strategy across multiple sites",
  },
  {
    href: "/commercial/ppa",
    label: "Commercial PPA",
    description: "Explore funded solar & long-term energy",
  },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [commercialOpen, setCommercialOpen] = useState(false);
  const pathname = usePathname();

  const isCommercialActive =
    pathname === "/commercial" ||
    pathname.startsWith("/commercial/");

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="container flex h-18 items-center justify-between py-3">
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-semibold"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo.svg"
            alt="BrightGrid Energy"
            width={32}
            height={32}
            priority
            className="h-8 w-8 object-contain"
          />
          BrightGrid
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.slice(0, 3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
                pathname === link.href &&
                  "bg-secondary text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}

          {/* COMMERCIAL DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setCommercialOpen(true)}
            onMouseLeave={() => setCommercialOpen(false)}
          >
            <button
              type="button"
              onClick={() =>
                setCommercialOpen((value) => !value)
              }
              className={cn(
                "flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
                isCommercialActive &&
                  "bg-secondary text-foreground"
              )}
            >
              Commercial

              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform",
                  commercialOpen && "rotate-180"
                )}
              />
            </button>

            {commercialOpen && (
              <div className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-3">
                <div className="overflow-hidden rounded-2xl border border-border bg-background p-3 shadow-2xl">
                  {/* HEADER */}
                  <div className="mb-2 flex items-center justify-between rounded-xl bg-secondary/60 px-4 py-3">
                    <div>
                      <p className="font-display text-sm font-semibold">
                        Commercial energy
                      </p>

                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Energy infrastructure designed around your site.
                      </p>
                    </div>

                    <Link
                      href="/commercial"
                      onClick={() => setCommercialOpen(false)}
                      className="flex items-center gap-1 text-xs font-medium hover:underline"
                    >
                      Overview
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>

                  {/* LINKS */}
                  <div className="grid grid-cols-2 gap-1">
                    {COMMERCIAL_LINKS.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setCommercialOpen(false)}
                        className={cn(
                          "group rounded-xl p-3.5 transition-colors hover:bg-secondary",
                          pathname === link.href &&
                            "bg-secondary"
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-medium">
                              {link.label}
                            </p>

                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              {link.description}
                            </p>
                          </div>

                          <ArrowRight className="mt-0.5 size-3.5 shrink-0 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* BOTTOM CTA */}
                  <div className="mt-2 border-t border-border pt-3">
                    <Link
                      href="/retail/assessment"
                      onClick={() => setCommercialOpen(false)}
                      className="flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <span>
                        Request Assessment
                      </span>

                      <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* REMAINING LINKS */}
          {NAV_LINKS.slice(3).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground",
                pathname === link.href &&
                  "bg-secondary text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* DESKTOP ACTIONS */}
        <div className="hidden lg:block">
          <div className="flex gap-2">
            <Button asChild variant="accent">
              <Link href="/request-assessment">
                Request Assessment
              </Link>
            </Button>

            <Button asChild variant="outline">
              <Link href="/login">
                Sign in
              </Link>
            </Button>

            <Button asChild variant="default">
              <Link href="/signup">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className="rounded-full p-2 hover:bg-secondary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {/* NORMAL LINKS */}
            {NAV_LINKS.slice(0, 3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-medium hover:bg-secondary",
                  pathname === link.href &&
                    "bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* MOBILE COMMERCIAL ACCORDION */}
            <div className="rounded-xl">
              <button
                type="button"
                onClick={() =>
                  setCommercialOpen((value) => !value)
                }
                className={cn(
                  "flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-medium transition-colors hover:bg-secondary",
                  isCommercialActive &&
                    "bg-secondary"
                )}
              >
                <span>Commercial</span>

                <ChevronDown
                  className={cn(
                    "size-4 transition-transform",
                    commercialOpen && "rotate-180"
                  )}
                />
              </button>

              {commercialOpen && (
                <div className="mt-1 space-y-1 rounded-xl bg-secondary/40 p-2">
                  {COMMERCIAL_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => {
                        setOpen(false);
                        setCommercialOpen(false);
                      }}
                      className={cn(
                        "group flex items-center justify-between rounded-lg px-3 py-3 transition-colors hover:bg-background",
                        pathname === link.href &&
                          "bg-background"
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {link.label}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {link.description}
                        </p>
                      </div>

                      <ArrowRight className="size-4 shrink-0 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* OPERATIONS + BLOG */}
            {NAV_LINKS.slice(3).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3 py-3 text-sm font-medium hover:bg-secondary",
                  pathname === link.href &&
                    "bg-secondary"
                )}
              >
                {link.label}
              </Link>
            ))}

            {/* SAVINGS */}
            <Button
              asChild
              variant="accent"
              className="mt-3 h-11 rounded-xl"
            >
              <Link
                href="/request-assessment"
                onClick={() => setOpen(false)}
              >
                Request Assessment
              </Link>
            </Button>

            {/* ACCOUNT ACTIONS */}
            <div className="mt-1 grid grid-cols-2 gap-2">
              <Button
                asChild
                variant="outline"
                className="rounded-xl"
              >
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              </Button>

              <Button
                asChild
                variant="default"
                className="rounded-xl"
              >
                <Link
                  href="/signup"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-1.5"
                >
                  Sign Up
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}