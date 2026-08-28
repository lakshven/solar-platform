# BrightGrid Energy — solar, battery, EV & heat pump platform

A Next.js 14 (App Router) + TypeScript + Tailwind CSS site built around a
functioning "Check Your Savings" calculator, backed by Supabase.

## Stack

- **Next.js 14** (App Router, Server Components + Route Handlers)
- **TypeScript**
- **Tailwind CSS** with a custom design-token palette (charcoal / warm white / solar
  yellow / leaf green / electric blue) — see `tailwind.config.ts` and `app/globals.css`
- **shadcn/ui-style components** (Button, Card, Input, Select, Tabs, Progress, Badge…) —
  hand-rolled in `components/ui/` on Radix primitives, same conventions as the shadcn CLI
- **Supabase** (`@supabase/supabase-js` + `@supabase/ssr`) for leads, calculator
  submissions, customers, installations, maintenance, referrals, and the customer dashboard
- **Zod** for API input validation
- **lucide-react** icons

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase project values
npm run dev
```

Open http://localhost:3000.

## Supabase setup

1. Create a project at supabase.com.
2. In the SQL editor, run `supabase/schema.sql` — it creates every table, enum,
   index, RLS policy and the `energy_summary_last_30_days` view described below.
3. Copy your project URL, anon key and service-role key into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

4. (Optional) Once your schema is live, regenerate fully-typed database types:

```bash
npx supabase gen types typescript --project-id <your-project-ref> > types/database.ts
```

`types/database.ts` currently ships hand-written types for the tables the
front end queries directly (`leads`, `calculator_submissions`,
`commercial_enquiries`, `case_studies`) — enough to type-check the app without
Supabase CLI access. Regenerate for full coverage once you're connected.

## What's wired up end-to-end

- **`lib/calculator/engine.ts`** — the pricing/savings model, deliberately kept
  separate from the UI (per the design brief) so your costs, grants and tariff
  assumptions can change without touching any component. All figures live in
  the `ASSUMPTIONS` object at the top of the file — review these with your
  commercial team before using them in a live quote.
- **`app/check-your-savings/page.tsx`** → **`components/calculator/calculator.tsx`**
  — a real multi-step form that posts to `/api/calculate-savings`, gets back
  all seven scenarios, and lets the visitor compare them before requesting a
  detailed quote (which saves a lead + calculator submission to Supabase).
- **`app/api/calculate-savings/route.ts`** — validates input with Zod, runs the
  engine, and best-effort persists a `leads` + `calculator_submissions` row.
  The calculator result is always returned to the browser even if Supabase is
  unreachable, so the tool never breaks for the visitor.
- **`app/api/leads/route.ts`** — generic lead capture for commercial/farm/
  landlord enquiries, referrals, and contact forms.
- **`supabase/schema.sql`** — full data model: leads, calculator_submissions,
  properties, customers, quotes, finance_applications, installations,
  installation_components, energy_readings (+ a 30-day summary view),
  maintenance_subscriptions, service_visits, referrals, commercial_enquiries,
  case_studies — with RLS so anonymous visitors can only ever *insert* leads/
  calculator runs, and signed-in customers can only ever read their own data.
- **`app/dashboard/*`** — My Energy, My Maintenance, My Referrals, My Upgrades.
  These query Supabase for the signed-in customer (via `auth.getUser()`) and
  fall back to clearly-marked demo data if no session/property exists yet, so
  the pages are useful to look at before auth is fully wired into your flow.

## What's marketing content, not wired to a backend yet

The product pages (Solar, Battery, EV Charging, Heat Pumps, Commercial, Home
Energy Care, How It Works, About, Case Studies, FAQs) are real, finished
pages built from your content brief — but their "Request an assessment" /
"Refer a friend" buttons are presentational. Wire them to `POST /api/leads`
(already built) with the appropriate `source` value, the same way the
calculator's quote form does.

## Design system

Reusable content blocks live in `components/shared/`: `PageHero`, `InfoGrid`,
`FaqList`, `CtaBanner`, `EnergyCard`. Every product page composes these, so
changing the look of "the CTA at the bottom of every page" is a one-file edit.

## Still to build for a production launch

- Supabase Auth wiring (magic link or password) for the customer dashboard
- An admin/CRM view over leads, quotes and installations (service-role only —
  see `lib/supabase/server.ts` → `createServiceClient()`, never expose that
  key to the browser)
- Real finance-partner integration and FCA-reviewed copy on financing pages
- Real imagery (your own installation photography, licensed stock, or
  AI-generated hero images per the visual-direction brief)
- A CMS or admin UI for `case_studies` instead of editing the table directly
