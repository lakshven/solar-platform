-- Maintenance schema. Run after supabase/schema.sql.

do $$ begin
  create type maintenance_frequency as enum ('quarterly', 'biannual', 'annual');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type subscription_status as enum ('active', 'paused', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type visit_status as enum ('scheduled', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type maintenance_payment_status as enum ('pending', 'paid', 'waived', 'failed');
exception when duplicate_object then null;
end $$;

create table if not exists public.solar_systems (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  capacity_kw numeric(6, 2) not null,
  panel_count integer,
  inverter_type text,
  install_date date,
  address text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists solar_systems_customer_id_key
  on public.solar_systems(customer_id);

create table if not exists public.maintenance_subscriptions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  solar_system_id uuid references public.solar_systems(id) on delete set null,
  status subscription_status not null default 'active',
  frequency maintenance_frequency not null default 'biannual',
  price_amount numeric(10, 2) not null default 89,
  price_currency text not null default 'GBP',
  next_service_date date,
  next_service_time text,
  payment_provider_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  cancelled_at timestamptz
);

create unique index if not exists maintenance_subscriptions_customer_id_key
  on public.maintenance_subscriptions(customer_id);

create table if not exists public.service_visits (
  id uuid primary key default gen_random_uuid(),
  subscription_id uuid not null references public.maintenance_subscriptions(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  employee_id uuid references public.employees(id) on delete set null,
  scheduled_date date not null,
  scheduled_time text,
  status visit_status not null default 'scheduled',
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_visits_subscription_idx
  on public.service_visits(subscription_id);
create index if not exists service_visits_customer_idx
  on public.service_visits(customer_id);

create table if not exists public.maintenance_payments (
  id uuid primary key default gen_random_uuid(),
  service_visit_id uuid references public.service_visits(id) on delete set null,
  subscription_id uuid not null references public.maintenance_subscriptions(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  amount numeric(10, 2) not null,
  currency text not null default 'GBP',
  status maintenance_payment_status not null default 'pending',
  reward_id uuid references public.referral_rewards(id) on delete set null,
  payment_reference text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create unique index if not exists maintenance_payments_service_visit_id_key
  on public.maintenance_payments(service_visit_id)
  where service_visit_id is not null;
create index if not exists maintenance_payments_subscription_idx
  on public.maintenance_payments(subscription_id);
create index if not exists maintenance_payments_customer_idx
  on public.maintenance_payments(customer_id);

create table if not exists public.payment_methods (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  brand text not null default 'Card',
  last4 text not null,
  exp_month integer not null,
  exp_year integer not null,
  is_default boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists payment_methods_customer_id_key
  on public.payment_methods(customer_id);

alter table public.payment_methods enable row level security;

create policy "Customers can read their own payment method"
  on public.payment_methods for select
  using (customer_id in (select id from public.customers where user_id = auth.uid()));

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists solar_systems_set_updated_at on public.solar_systems;
create trigger solar_systems_set_updated_at
  before update on public.solar_systems
  for each row execute function public.set_updated_at();

drop trigger if exists maintenance_subscriptions_set_updated_at on public.maintenance_subscriptions;
create trigger maintenance_subscriptions_set_updated_at
  before update on public.maintenance_subscriptions
  for each row execute function public.set_updated_at();

drop trigger if exists service_visits_set_updated_at on public.service_visits;
create trigger service_visits_set_updated_at
  before update on public.service_visits
  for each row execute function public.set_updated_at();

drop trigger if exists payment_methods_set_updated_at on public.payment_methods;
create trigger payment_methods_set_updated_at
  before update on public.payment_methods
  for each row execute function public.set_updated_at();

create or replace function public.create_pending_payment_for_visit()
returns trigger as $$
declare
  v_subscription public.maintenance_subscriptions%rowtype;
begin
  select * into v_subscription
  from public.maintenance_subscriptions
  where id = new.subscription_id;

  insert into public.maintenance_payments (
    service_visit_id, subscription_id, customer_id, amount, currency, status
  )
  values (
    new.id, new.subscription_id, new.customer_id,
    v_subscription.price_amount, v_subscription.price_currency, 'pending'
  )
  on conflict (service_visit_id) where service_visit_id is not null do nothing;

  return new;
end;
$$ language plpgsql;

drop trigger if exists service_visits_create_payment on public.service_visits;
create trigger service_visits_create_payment
  after insert on public.service_visits
  for each row execute function public.create_pending_payment_for_visit();

create or replace function public.schedule_next_service_visit()
returns trigger as $$
declare
  v_subscription public.maintenance_subscriptions%rowtype;
  v_interval interval;
  v_next_date date;
begin
  if new.status = 'completed' and old.status is distinct from 'completed' then
    select * into v_subscription
    from public.maintenance_subscriptions
    where id = new.subscription_id;

    if v_subscription.status = 'active' then
      v_interval := case v_subscription.frequency
        when 'quarterly' then interval '3 months'
        when 'biannual' then interval '6 months'
        when 'annual' then interval '12 months'
        else interval '6 months'
      end;

      v_next_date := (new.scheduled_date + v_interval)::date;

      insert into public.service_visits (
        subscription_id, customer_id, scheduled_date, scheduled_time, status
      )
      values (
        new.subscription_id, new.customer_id, v_next_date, new.scheduled_time, 'scheduled'
      );

      update public.maintenance_subscriptions
      set next_service_date = v_next_date,
          next_service_time = new.scheduled_time
      where id = new.subscription_id;
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists service_visits_schedule_next on public.service_visits;
create trigger service_visits_schedule_next
  after update on public.service_visits
  for each row execute function public.schedule_next_service_visit();

alter table public.solar_systems enable row level security;
alter table public.maintenance_subscriptions enable row level security;
alter table public.service_visits enable row level security;
alter table public.maintenance_payments enable row level security;

create policy "Customers can read their own solar system"
  on public.solar_systems for select
  using (customer_id in (select id from public.customers where user_id = auth.uid()));

create policy "Customers can read their own subscription"
  on public.maintenance_subscriptions for select
  using (customer_id in (select id from public.customers where user_id = auth.uid()));

create policy "Customers can read their own service visits"
  on public.service_visits for select
  using (customer_id in (select id from public.customers where user_id = auth.uid()));

create policy "Customers can read their own maintenance payments"
  on public.maintenance_payments for select
  using (customer_id in (select id from public.customers where user_id = auth.uid()));
