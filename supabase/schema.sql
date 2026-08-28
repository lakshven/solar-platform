-- =========================================================================
-- BrightGrid Energy — Supabase schema
-- Run in the Supabase SQL editor, or `supabase db push` with this as a
-- migration. Written to be idempotent (safe to re-run).
-- =========================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- Enums
-- ---------------------------------------------------------------------
do $$ begin
  create type property_type as enum ('detached','semi-detached','terraced','bungalow','flat','commercial','farm');
exception when duplicate_object then null; end $$;

do $$ begin
  create type heating_system as enum ('gas-boiler','oil-boiler','electric','heat-pump','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type vehicle_type as enum ('none','phev','ev');
exception when duplicate_object then null; end $$;

do $$ begin
  create type energy_priority as enum ('lower-bills','energy-independence','sustainability','backup-power');
exception when duplicate_object then null; end $$;

do $$ begin
  create type scenario_id as enum (
    'solar','solar-battery','solar-battery-phev','solar-battery-ev',
    'solar-battery-ata-hp','solar-battery-atw-hp','complete-home-energy'
  );
exception when duplicate_object then null; end $$;

alter type scenario_id add value if not exists 'solar';
alter type scenario_id add value if not exists 'solar-battery';
alter type scenario_id add value if not exists 'solar-battery-phev';
alter type scenario_id add value if not exists 'solar-battery-ev';
alter type scenario_id add value if not exists 'solar-battery-ata-hp';
alter type scenario_id add value if not exists 'solar-battery-atw-hp';
alter type scenario_id add value if not exists 'complete-home-energy';

do $$ begin
  create type lead_status as enum ('new','contacted','quoted','converted','lost');
exception when duplicate_object then null; end $$;

do $$ begin
  create type lead_source as enum ('check-your-savings','existing-solar-battery','commercial','farm','landlord','referral','contact-form','other');
exception when duplicate_object then null; end $$;

do $$ begin
  create type quote_status as enum ('draft','sent','accepted','declined','expired');
exception when duplicate_object then null; end $$;

do $$ begin
  create type installation_status as enum ('survey','design','approvals','scheduled','in-progress','commissioned','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type system_component as enum ('solar','battery','ev-charger','heat-pump-ata','heat-pump-atw');
exception when duplicate_object then null; end $$;

do $$ begin
  create type maintenance_plan as enum ('essential','complete');
exception when duplicate_object then null; end $$;

do $$ begin
  create type service_visit_status as enum ('scheduled','completed','missed','rescheduled','cancelled');
exception when duplicate_object then null; end $$;

do $$ begin
  create type referral_status as enum ('pending','installation-booked','installation-completed','reward-issued','expired');
exception when duplicate_object then null; end $$;

alter type referral_status add value if not exists 'contacted';
alter type referral_status add value if not exists 'booked';
alter type referral_status add value if not exists 'installation_completed';
alter type referral_status add value if not exists 'reward_issued';
alter type referral_status add value if not exists 'cancelled';

do $$ begin
  create type finance_app_status as enum ('submitted','approved','declined','withdrawn');
exception when duplicate_object then null; end $$;

-- ---------------------------------------------------------------------
-- Customers (extends Supabase auth.users — one row per authenticated portal user)
-- ---------------------------------------------------------------------
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  email text not null unique,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.customers
  add column if not exists email_normalized text;

alter table public.customers
  add column if not exists email_verified boolean not null default false;

alter table public.customers
  add column if not exists referral_code text unique;

alter table public.customers
  add column if not exists referral_clicks integer not null default 0;

alter table public.customers
  add column if not exists referral_first_clicked_at timestamptz;

alter table public.customers
  add column if not exists referral_last_clicked_at timestamptz;

create unique index if not exists idx_customers_referral_code
  on public.customers(referral_code)
  where referral_code is not null;

-- ---------------------------------------------------------------------
-- Properties — a physical site (residential, commercial, farm) belonging
-- to a lead and/or a customer once converted.
-- ---------------------------------------------------------------------
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  address_line1 text,
  address_line2 text,
  city text,
  postcode text not null,
  property_type property_type not null default 'detached',
  roof_suitability text,
  existing_solar boolean not null default false,
  existing_solar_kwp numeric(5,2),
  existing_battery boolean not null default false,
  heating_system heating_system not null default 'gas-boiler',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Leads — anyone who has engaged (calculator, contact form, commercial
-- enquiry, farm enquiry, landlord portfolio, referral) but not yet a
-- paying customer.
-- ---------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  source lead_source not null default 'check-your-savings',
  status lead_status not null default 'new',
  full_name text,
  email text,
  phone text,
  postcode text,
  property_id uuid references public.properties(id) on delete set null,
  referred_by_referral_id uuid, -- fk added after referrals table exists
  marketing_opt_in boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.leads
  add column if not exists lead_score numeric(5,2);

alter table public.leads
  add column if not exists lead_tier text;

alter table public.leads
  add column if not exists bundle_score numeric(5,2);

alter table public.leads
  add column if not exists predicted_revenue numeric(12,2);

create index if not exists idx_leads_status on public.leads(status);
create index if not exists idx_leads_created_at on public.leads(created_at desc);

-- ---------------------------------------------------------------------
-- Calculator submissions — every run of "Check Your Savings", storing
-- both the raw input and the computed scenario results as JSONB so the
-- pricing engine (lib/calculator/engine.ts) can evolve independently.
-- ---------------------------------------------------------------------
create table if not exists public.calculator_submissions (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  input jsonb not null,
  scenarios jsonb not null,
  recommended_scenario scenario_id,
  current_annual_bill numeric(10,2),
  created_at timestamptz not null default now()
);

alter table public.calculator_submissions
  add column if not exists address jsonb;

alter table public.calculator_submissions
  add column if not exists satellite jsonb;

alter table public.calculator_submissions
  add column if not exists location_intelligence jsonb;

alter table public.calculator_submissions
  add column if not exists explainability jsonb;

alter table public.calculator_submissions
  add column if not exists lead_intelligence jsonb;

alter table public.calculator_submissions
  add column if not exists confidence_score numeric(5,2);

alter table public.calculator_submissions
  add column if not exists lead_score numeric(5,2);

alter table public.calculator_submissions
  add column if not exists predicted_revenue numeric(12,2);

create index if not exists idx_calc_submissions_lead on public.calculator_submissions(lead_id);

-- ---------------------------------------------------------------------
-- Quotes — a formal, priced proposal generated from (or independent of)
-- a calculator submission, sent to a lead/customer.
-- ---------------------------------------------------------------------
create table if not exists public.quotes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  calculator_submission_id uuid references public.calculator_submissions(id) on delete set null,
  scenario scenario_id not null,
  components system_component[] not null default '{}',
  price numeric(10,2) not null,
  estimated_annual_saving numeric(10,2),
  finance_monthly_estimate numeric(10,2),
  status quote_status not null default 'draft',
  valid_until date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Finance applications — tracking only. BrightGrid is never the lender;
-- the actual credit agreement lives with the finance partner.
-- ---------------------------------------------------------------------
create table if not exists public.finance_applications (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references public.quotes(id) on delete cascade,
  provider_name text not null,
  amount numeric(10,2) not null,
  term_months integer not null,
  status finance_app_status not null default 'submitted',
  provider_reference text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Installations — the physical job once a quote is accepted.
-- ---------------------------------------------------------------------
create table if not exists public.installations (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references public.quotes(id) on delete set null,
  customer_id uuid not null references public.customers(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  status installation_status not null default 'survey',
  scheduled_date date,
  completed_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Individual system components fitted as part of an installation.
create table if not exists public.installation_components (
  id uuid primary key default gen_random_uuid(),
  installation_id uuid not null references public.installations(id) on delete cascade,
  component system_component not null,
  make text,
  model text,
  capacity_kwp numeric(6,2), -- solar
  capacity_kwh numeric(6,2), -- battery
  warranty_years integer,
  installed_at date,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Energy readings — feeds "My Energy" dashboard. One row per
-- day (or interval) per property.
-- ---------------------------------------------------------------------
create table if not exists public.energy_readings (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  reading_date date not null,
  solar_generated_kwh numeric(8,2) default 0,
  home_consumption_kwh numeric(8,2) default 0,
  battery_charge_kwh numeric(8,2) default 0,
  battery_discharge_kwh numeric(8,2) default 0,
  ev_charged_kwh numeric(8,2) default 0,
  grid_imported_kwh numeric(8,2) default 0,
  grid_exported_kwh numeric(8,2) default 0,
  estimated_saving_gbp numeric(8,2) default 0,
  co2_reduction_kg numeric(8,2) default 0,
  created_at timestamptz not null default now(),
  unique (property_id, reading_date)
);

create index if not exists idx_energy_readings_property_date on public.energy_readings(property_id, reading_date desc);

-- ---------------------------------------------------------------------
-- Maintenance — "Home Energy Care" subscriptions and visits.
-- ---------------------------------------------------------------------
create table if not exists public.maintenance_subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  property_id uuid not null references public.properties(id) on delete cascade,
  plan maintenance_plan not null default 'essential',
  price_per_year numeric(8,2) not null,
  active boolean not null default true,
  started_at date not null default current_date,
  next_service_date date,
  reschedule_cutoff_days integer not null default 5,
  created_at timestamptz not null default now()
);

create table if not exists public.service_visits (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.maintenance_subscriptions(id) on delete cascade,
  scheduled_date date not null,
  status service_visit_status not null default 'scheduled',
  engineer_notes text,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Referral programme
-- ---------------------------------------------------------------------
create table if not exists public.referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_customer_id uuid not null references public.customers(id) on delete cascade,
  referred_lead_id uuid references public.leads(id) on delete set null,
  referred_name text,
  referred_email text,
  reward_value_gbp numeric(8,2) not null default 250,
  status referral_status not null default 'pending',
  expires_at date,
  reward_issued_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.referrals
  add column if not exists referral_code text;

alter table public.referrals
  add column if not exists discount_amount numeric(8,2) not null default 300;

alter table public.referrals
  add column if not exists discount_currency text not null default 'GBP';

alter table public.referrals
  add column if not exists discount_applied boolean not null default false;

alter table public.referrals
  add column if not exists discount_applied_at timestamptz;

alter table public.referrals
  add column if not exists installation_id uuid references public.installations(id) on delete set null;

alter table public.referrals
  add column if not exists contacted_at timestamptz;

alter table public.referrals
  add column if not exists booked_at timestamptz;

alter table public.referrals
  add column if not exists installation_completed_at timestamptz;

alter table public.referrals
  add column if not exists reward_issued boolean not null default false;

alter table public.referrals
  add column if not exists notes text;

alter table public.referrals
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_referrals_referral_code
  on public.referrals(referral_code);

create table if not exists public.referral_clicks (
  id uuid primary key default gen_random_uuid(),
  referral_id uuid not null references public.referrals(id) on delete cascade,
  session_id text,
  user_agent text,
  ip_hash text,
  clicked_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.referral_rewards (
  id uuid primary key default gen_random_uuid(),
  referral_id uuid not null unique references public.referrals(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  reward_type text not null default 'FREE_MAINTENANCE',
  status text not null default 'pending',
  maintenance_sessions integer not null default 1,
  issued_at timestamptz,
  redeemed_at timestamptz,
  expires_at timestamptz,
  maintenance_session_id uuid,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.issue_referral_reward(p_referral_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  reward_id uuid;
  referrer_id uuid;
begin
  select referrer_customer_id
    into referrer_id
    from public.referrals
   where id = p_referral_id
     and status in ('installation_completed', 'installation-completed');

  if referrer_id is null then
    raise exception 'Referral is not eligible for a reward';
  end if;

  insert into public.referral_rewards (
    referral_id, customer_id, reward_type, status, issued_at
  ) values (
    p_referral_id, referrer_id, 'FREE_MAINTENANCE', 'available', now()
  )
  on conflict (referral_id) do update
    set updated_at = now()
  returning id into reward_id;

  update public.referrals
     set reward_issued = true,
         reward_issued_at = now(),
         status = 'reward_issued',
         updated_at = now()
   where id = p_referral_id;

  return reward_id;
end;
$$;

alter table public.referrals
  add column if not exists referred_user_id uuid references public.customers(id) on delete set null;

create index if not exists idx_referrals_referred_user_id
  on public.referrals(referred_user_id);

alter table public.leads
  add constraint leads_referred_by_referral_id_fkey
  foreign key (referred_by_referral_id) references public.referrals(id) on delete set null;

-- ---------------------------------------------------------------------
-- Commercial / farm assessment requests (kept separate from residential
-- leads since the qualifying questions differ — see doc: "prioritise
-- farm consumption, export, or a combination?").
-- ---------------------------------------------------------------------
create table if not exists public.commercial_enquiries (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid references public.leads(id) on delete cascade,
  business_type text, -- warehouse | farm | office | retail | hotel | industrial | portfolio
  site_postcode text,
  annual_consumption_kwh numeric(12,2),
  roof_or_land_area_sqm numeric(10,2),
  priority text, -- 'consumption' | 'export' | 'combination'
  number_of_properties integer default 1, -- landlord portfolios
  notes text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Case studies (content/CMS-lite — editable via Supabase table editor
-- or a future admin UI, rendered on the public case studies page)
-- ---------------------------------------------------------------------
create table if not exists public.case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null, -- homeowner | existing-solar | ev | heat-pump | farm | landlord
  summary text,
  system_size_kwp numeric(6,2),
  battery_size_kwh numeric(6,2),
  annual_saving_gbp numeric(8,2),
  cover_image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- Employees — staff profiles, assigned jobs, and payment history.
-- Employee writes are handled by trusted server code using the service
-- role; the dashboard only reads rows belonging to the signed-in employee.
-- ---------------------------------------------------------------------
create table if not exists public.employees (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  full_name text not null,
  job_title text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create unique index if not exists employees_user_id_key
  on public.employees(user_id);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid references public.employees(id) on delete set null,
  customer_name text not null,
  address text,
  job_type text not null default 'Installation',
  status text not null default 'scheduled',
  scheduled_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists jobs_employee_id_idx on public.jobs(employee_id);
create index if not exists jobs_status_idx on public.jobs(status);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  employee_id uuid not null references public.employees(id) on delete cascade,
  job_id uuid references public.jobs(id) on delete set null,
  amount numeric(10,2) not null,
  status text not null default 'pending',
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists payments_employee_id_idx on public.payments(employee_id);

-- =========================================================================
-- Row Level Security
-- =========================================================================
alter table public.customers enable row level security;
alter table public.properties enable row level security;
alter table public.leads enable row level security;
alter table public.calculator_submissions enable row level security;
alter table public.quotes enable row level security;
alter table public.finance_applications enable row level security;
alter table public.installations enable row level security;
alter table public.installation_components enable row level security;
alter table public.energy_readings enable row level security;
alter table public.maintenance_subscriptions enable row level security;
alter table public.service_visits enable row level security;
alter table public.referrals enable row level security;
alter table public.referral_clicks enable row level security;
alter table public.referral_rewards enable row level security;
alter table public.commercial_enquiries enable row level security;
alter table public.case_studies enable row level security;
alter table public.employees enable row level security;
alter table public.jobs enable row level security;
alter table public.payments enable row level security;

-- Public, unauthenticated flows: anyone can create a lead or run the
-- calculator anonymously (this is the whole point of "Check Your
-- Savings"). Inserts only — no read/update/delete from the client.
create policy "anyone can submit a lead" on public.leads
  for insert to anon, authenticated with check (true);

create policy "anyone can submit a calculator run" on public.calculator_submissions
  for insert to anon, authenticated with check (true);

create policy "anyone can submit a commercial enquiry" on public.commercial_enquiries
  for insert to anon, authenticated with check (true);

-- Published case studies are public read-only content.
create policy "published case studies are public" on public.case_studies
  for select to anon, authenticated using (published = true);

-- Everything below is customer-portal data: a signed-in customer may
-- only ever see rows that belong to them.
create policy "customers read own row" on public.customers
  for select to authenticated using (auth.uid() = user_id);

create policy "customers update own row" on public.customers
  for update to authenticated using (auth.uid() = user_id);

create policy "customers read own properties" on public.properties
  for select to authenticated using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "customers read own quotes" on public.quotes
  for select to authenticated using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "customers read own installations" on public.installations
  for select to authenticated using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "customers read own installation components" on public.installation_components
  for select to authenticated using (
    installation_id in (
      select i.id from public.installations i
      join public.customers c on c.id = i.customer_id
      where c.user_id = auth.uid()
    )
  );

create policy "customers read own energy readings" on public.energy_readings
  for select to authenticated using (
    property_id in (
      select p.id from public.properties p
      join public.customers c on c.id = p.customer_id
      where c.user_id = auth.uid()
    )
  );

create policy "customers read own maintenance" on public.maintenance_subscriptions
  for select to authenticated using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "customers read own service visits" on public.service_visits
  for select to authenticated using (
    subscription_id in (
      select ms.id from public.maintenance_subscriptions ms
      join public.customers c on c.id = ms.customer_id
      where c.user_id = auth.uid()
    )
  );

create policy "customers manage own referrals" on public.referrals
  for all to authenticated using (
    referrer_customer_id in (select id from public.customers where user_id = auth.uid())
  ) with check (
    referrer_customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "customers read own referral rewards" on public.referral_rewards
  for select to authenticated using (
    customer_id in (select id from public.customers where user_id = auth.uid())
  );

create policy "employees read own profile" on public.employees
  for select to authenticated using (auth.uid() = user_id);

create policy "employees read own jobs" on public.jobs
  for select to authenticated using (
    employee_id in (
      select id from public.employees where user_id = auth.uid()
    )
  );

create policy "employees read own payments" on public.payments
  for select to authenticated using (
    employee_id in (
      select id from public.employees where user_id = auth.uid()
    )
  );

-- Note: staff/admin access (CRM views across all leads, quotes, etc.)
-- should go through the service-role key from trusted server code only
-- (see lib/supabase/server.ts -> createServiceClient), never the anon
-- key, and ideally through a separate internal app with its own auth.

-- =========================================================================
-- Helpful view for the "My Energy" dashboard
-- =========================================================================
create or replace view public.energy_summary_last_30_days as
select
  property_id,
  sum(solar_generated_kwh) as solar_generated_kwh,
  sum(home_consumption_kwh) as home_consumption_kwh,
  sum(grid_imported_kwh) as grid_imported_kwh,
  sum(grid_exported_kwh) as grid_exported_kwh,
  sum(estimated_saving_gbp) as estimated_saving_gbp,
  sum(co2_reduction_kg) as co2_reduction_kg
from public.energy_readings
where reading_date >= (current_date - interval '30 days')
group by property_id;
