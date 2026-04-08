
  create table "public"."coins" (
    "symbol" text not null,
    "name" text,
    "icon" text,
    "color" text,
    "price" double precision,
    "networks" text[] not null default '{}'::text[]
      );


alter table "public"."coins" enable row level security;


  create table "public"."deposit_sessions" (
    "id" text not null,
    "user_id" uuid not null,
    "coin" text not null,
    "pay_address" text not null,
    "pay_amount" double precision,
    "pay_currency" text,
    "status" text not null default 'pending'::text,
    "created_at" timestamp with time zone default now()
      );


alter table "public"."deposit_sessions" enable row level security;


  create table "public"."notifications" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "text" text not null,
    "time" timestamp with time zone default now(),
    "read" boolean default false
      );


alter table "public"."notifications" enable row level security;


  create table "public"."profiles" (
    "id" uuid not null default gen_random_uuid(),
    "name" text,
    "email" text,
    "phone" text,
    "country" text,
    "created_at" timestamp with time zone not null default now(),
    "is_admin" boolean default false
      );


alter table "public"."profiles" enable row level security;


  create table "public"."staking_plans" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "min_deposit" bigint not null,
    "max_deposit" bigint,
    "daily_profit" numeric,
    "apr" numeric,
    "duration_days" integer,
    "referral_bonus" numeric,
    "notes" text[],
    "created_at" timestamp with time zone default now()
      );


alter table "public"."staking_plans" enable row level security;


  create table "public"."staking_positions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "amount" bigint,
    "earned" bigint,
    "apy" bigint,
    "lock_days" bigint,
    "days_left" bigint,
    "progress" bigint,
    "created_at" timestamp with time zone,
    "plan_id" uuid,
    "status" text default 'active'::text,
    "end_date" timestamp with time zone
      );


alter table "public"."staking_positions" enable row level security;


  create table "public"."swap_rates" (
    "from_coin" text not null,
    "to_coin" text not null,
    "rate" double precision
      );


alter table "public"."swap_rates" enable row level security;


  create table "public"."transactions" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "type" text,
    "coin" text,
    "amount" double precision,
    "usd" bigint,
    "from_addr" text,
    "hash" text,
    "status" text,
    "direction" text,
    "created_at" timestamp with time zone default now(),
    "metadata" jsonb,
    "gateway" text,
    "session_id" text
      );


alter table "public"."transactions" enable row level security;


  create table "public"."wallets" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "symbol" text,
    "amount" double precision,
    "usd_value" bigint,
    "price" double precision,
    "change_pct" double precision,
    "created_at" timestamp with time zone,
    "address" text not null default 'poly_7f3a9c1b2d8e4f'::text
      );


alter table "public"."wallets" enable row level security;

CREATE UNIQUE INDEX coins_pkey ON public.coins USING btree (symbol);

CREATE UNIQUE INDEX deposit_sessions_pkey ON public.deposit_sessions USING btree (id);

CREATE UNIQUE INDEX notifications_pkey ON public.notifications USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX staking_plans_pkey ON public.staking_plans USING btree (id);

CREATE UNIQUE INDEX staking_positions_pkey ON public.staking_positions USING btree (id);

CREATE UNIQUE INDEX swap_rates_pkey ON public.swap_rates USING btree (from_coin, to_coin);

CREATE UNIQUE INDEX transactions_pkey ON public.transactions USING btree (id);

CREATE UNIQUE INDEX wallets_address_key ON public.wallets USING btree (address);

CREATE UNIQUE INDEX wallets_pkey ON public.wallets USING btree (id);

alter table "public"."coins" add constraint "coins_pkey" PRIMARY KEY using index "coins_pkey";

alter table "public"."deposit_sessions" add constraint "deposit_sessions_pkey" PRIMARY KEY using index "deposit_sessions_pkey";

alter table "public"."notifications" add constraint "notifications_pkey" PRIMARY KEY using index "notifications_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."staking_plans" add constraint "staking_plans_pkey" PRIMARY KEY using index "staking_plans_pkey";

alter table "public"."staking_positions" add constraint "staking_positions_pkey" PRIMARY KEY using index "staking_positions_pkey";

alter table "public"."swap_rates" add constraint "swap_rates_pkey" PRIMARY KEY using index "swap_rates_pkey";

alter table "public"."transactions" add constraint "transactions_pkey" PRIMARY KEY using index "transactions_pkey";

alter table "public"."wallets" add constraint "wallets_pkey" PRIMARY KEY using index "wallets_pkey";

alter table "public"."notifications" add constraint "notifications_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."notifications" validate constraint "notifications_user_id_fkey";

alter table "public"."staking_positions" add constraint "staking_positions_plan_id_fkey" FOREIGN KEY (plan_id) REFERENCES public.staking_plans(id) not valid;

alter table "public"."staking_positions" validate constraint "staking_positions_plan_id_fkey";

alter table "public"."wallets" add constraint "wallets_address_key" UNIQUE using index "wallets_address_key";

grant delete on table "public"."coins" to "anon";

grant insert on table "public"."coins" to "anon";

grant references on table "public"."coins" to "anon";

grant select on table "public"."coins" to "anon";

grant trigger on table "public"."coins" to "anon";

grant truncate on table "public"."coins" to "anon";

grant update on table "public"."coins" to "anon";

grant delete on table "public"."coins" to "authenticated";

grant insert on table "public"."coins" to "authenticated";

grant references on table "public"."coins" to "authenticated";

grant select on table "public"."coins" to "authenticated";

grant trigger on table "public"."coins" to "authenticated";

grant truncate on table "public"."coins" to "authenticated";

grant update on table "public"."coins" to "authenticated";

grant delete on table "public"."coins" to "postgres";

grant insert on table "public"."coins" to "postgres";

grant references on table "public"."coins" to "postgres";

grant select on table "public"."coins" to "postgres";

grant trigger on table "public"."coins" to "postgres";

grant truncate on table "public"."coins" to "postgres";

grant update on table "public"."coins" to "postgres";

grant delete on table "public"."coins" to "service_role";

grant insert on table "public"."coins" to "service_role";

grant references on table "public"."coins" to "service_role";

grant select on table "public"."coins" to "service_role";

grant trigger on table "public"."coins" to "service_role";

grant truncate on table "public"."coins" to "service_role";

grant update on table "public"."coins" to "service_role";

grant delete on table "public"."deposit_sessions" to "anon";

grant insert on table "public"."deposit_sessions" to "anon";

grant references on table "public"."deposit_sessions" to "anon";

grant select on table "public"."deposit_sessions" to "anon";

grant trigger on table "public"."deposit_sessions" to "anon";

grant truncate on table "public"."deposit_sessions" to "anon";

grant update on table "public"."deposit_sessions" to "anon";

grant delete on table "public"."deposit_sessions" to "authenticated";

grant insert on table "public"."deposit_sessions" to "authenticated";

grant references on table "public"."deposit_sessions" to "authenticated";

grant select on table "public"."deposit_sessions" to "authenticated";

grant trigger on table "public"."deposit_sessions" to "authenticated";

grant truncate on table "public"."deposit_sessions" to "authenticated";

grant update on table "public"."deposit_sessions" to "authenticated";

grant delete on table "public"."deposit_sessions" to "postgres";

grant insert on table "public"."deposit_sessions" to "postgres";

grant references on table "public"."deposit_sessions" to "postgres";

grant select on table "public"."deposit_sessions" to "postgres";

grant trigger on table "public"."deposit_sessions" to "postgres";

grant truncate on table "public"."deposit_sessions" to "postgres";

grant update on table "public"."deposit_sessions" to "postgres";

grant delete on table "public"."deposit_sessions" to "service_role";

grant insert on table "public"."deposit_sessions" to "service_role";

grant references on table "public"."deposit_sessions" to "service_role";

grant select on table "public"."deposit_sessions" to "service_role";

grant trigger on table "public"."deposit_sessions" to "service_role";

grant truncate on table "public"."deposit_sessions" to "service_role";

grant update on table "public"."deposit_sessions" to "service_role";

grant delete on table "public"."notifications" to "anon";

grant insert on table "public"."notifications" to "anon";

grant references on table "public"."notifications" to "anon";

grant select on table "public"."notifications" to "anon";

grant trigger on table "public"."notifications" to "anon";

grant truncate on table "public"."notifications" to "anon";

grant update on table "public"."notifications" to "anon";

grant delete on table "public"."notifications" to "authenticated";

grant insert on table "public"."notifications" to "authenticated";

grant references on table "public"."notifications" to "authenticated";

grant select on table "public"."notifications" to "authenticated";

grant trigger on table "public"."notifications" to "authenticated";

grant truncate on table "public"."notifications" to "authenticated";

grant update on table "public"."notifications" to "authenticated";

grant delete on table "public"."notifications" to "postgres";

grant insert on table "public"."notifications" to "postgres";

grant references on table "public"."notifications" to "postgres";

grant select on table "public"."notifications" to "postgres";

grant trigger on table "public"."notifications" to "postgres";

grant truncate on table "public"."notifications" to "postgres";

grant update on table "public"."notifications" to "postgres";

grant delete on table "public"."notifications" to "service_role";

grant insert on table "public"."notifications" to "service_role";

grant references on table "public"."notifications" to "service_role";

grant select on table "public"."notifications" to "service_role";

grant trigger on table "public"."notifications" to "service_role";

grant truncate on table "public"."notifications" to "service_role";

grant update on table "public"."notifications" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "postgres";

grant insert on table "public"."profiles" to "postgres";

grant references on table "public"."profiles" to "postgres";

grant select on table "public"."profiles" to "postgres";

grant trigger on table "public"."profiles" to "postgres";

grant truncate on table "public"."profiles" to "postgres";

grant update on table "public"."profiles" to "postgres";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

grant delete on table "public"."staking_plans" to "anon";

grant insert on table "public"."staking_plans" to "anon";

grant references on table "public"."staking_plans" to "anon";

grant select on table "public"."staking_plans" to "anon";

grant trigger on table "public"."staking_plans" to "anon";

grant truncate on table "public"."staking_plans" to "anon";

grant update on table "public"."staking_plans" to "anon";

grant delete on table "public"."staking_plans" to "authenticated";

grant insert on table "public"."staking_plans" to "authenticated";

grant references on table "public"."staking_plans" to "authenticated";

grant select on table "public"."staking_plans" to "authenticated";

grant trigger on table "public"."staking_plans" to "authenticated";

grant truncate on table "public"."staking_plans" to "authenticated";

grant update on table "public"."staking_plans" to "authenticated";

grant delete on table "public"."staking_plans" to "postgres";

grant insert on table "public"."staking_plans" to "postgres";

grant references on table "public"."staking_plans" to "postgres";

grant select on table "public"."staking_plans" to "postgres";

grant trigger on table "public"."staking_plans" to "postgres";

grant truncate on table "public"."staking_plans" to "postgres";

grant update on table "public"."staking_plans" to "postgres";

grant delete on table "public"."staking_plans" to "service_role";

grant insert on table "public"."staking_plans" to "service_role";

grant references on table "public"."staking_plans" to "service_role";

grant select on table "public"."staking_plans" to "service_role";

grant trigger on table "public"."staking_plans" to "service_role";

grant truncate on table "public"."staking_plans" to "service_role";

grant update on table "public"."staking_plans" to "service_role";

grant delete on table "public"."staking_positions" to "anon";

grant insert on table "public"."staking_positions" to "anon";

grant references on table "public"."staking_positions" to "anon";

grant select on table "public"."staking_positions" to "anon";

grant trigger on table "public"."staking_positions" to "anon";

grant truncate on table "public"."staking_positions" to "anon";

grant update on table "public"."staking_positions" to "anon";

grant delete on table "public"."staking_positions" to "authenticated";

grant insert on table "public"."staking_positions" to "authenticated";

grant references on table "public"."staking_positions" to "authenticated";

grant select on table "public"."staking_positions" to "authenticated";

grant trigger on table "public"."staking_positions" to "authenticated";

grant truncate on table "public"."staking_positions" to "authenticated";

grant update on table "public"."staking_positions" to "authenticated";

grant delete on table "public"."staking_positions" to "postgres";

grant insert on table "public"."staking_positions" to "postgres";

grant references on table "public"."staking_positions" to "postgres";

grant select on table "public"."staking_positions" to "postgres";

grant trigger on table "public"."staking_positions" to "postgres";

grant truncate on table "public"."staking_positions" to "postgres";

grant update on table "public"."staking_positions" to "postgres";

grant delete on table "public"."staking_positions" to "service_role";

grant insert on table "public"."staking_positions" to "service_role";

grant references on table "public"."staking_positions" to "service_role";

grant select on table "public"."staking_positions" to "service_role";

grant trigger on table "public"."staking_positions" to "service_role";

grant truncate on table "public"."staking_positions" to "service_role";

grant update on table "public"."staking_positions" to "service_role";

grant delete on table "public"."swap_rates" to "anon";

grant insert on table "public"."swap_rates" to "anon";

grant references on table "public"."swap_rates" to "anon";

grant select on table "public"."swap_rates" to "anon";

grant trigger on table "public"."swap_rates" to "anon";

grant truncate on table "public"."swap_rates" to "anon";

grant update on table "public"."swap_rates" to "anon";

grant delete on table "public"."swap_rates" to "authenticated";

grant insert on table "public"."swap_rates" to "authenticated";

grant references on table "public"."swap_rates" to "authenticated";

grant select on table "public"."swap_rates" to "authenticated";

grant trigger on table "public"."swap_rates" to "authenticated";

grant truncate on table "public"."swap_rates" to "authenticated";

grant update on table "public"."swap_rates" to "authenticated";

grant delete on table "public"."swap_rates" to "postgres";

grant insert on table "public"."swap_rates" to "postgres";

grant references on table "public"."swap_rates" to "postgres";

grant select on table "public"."swap_rates" to "postgres";

grant trigger on table "public"."swap_rates" to "postgres";

grant truncate on table "public"."swap_rates" to "postgres";

grant update on table "public"."swap_rates" to "postgres";

grant delete on table "public"."swap_rates" to "service_role";

grant insert on table "public"."swap_rates" to "service_role";

grant references on table "public"."swap_rates" to "service_role";

grant select on table "public"."swap_rates" to "service_role";

grant trigger on table "public"."swap_rates" to "service_role";

grant truncate on table "public"."swap_rates" to "service_role";

grant update on table "public"."swap_rates" to "service_role";

grant delete on table "public"."transactions" to "anon";

grant insert on table "public"."transactions" to "anon";

grant references on table "public"."transactions" to "anon";

grant select on table "public"."transactions" to "anon";

grant trigger on table "public"."transactions" to "anon";

grant truncate on table "public"."transactions" to "anon";

grant update on table "public"."transactions" to "anon";

grant delete on table "public"."transactions" to "authenticated";

grant insert on table "public"."transactions" to "authenticated";

grant references on table "public"."transactions" to "authenticated";

grant select on table "public"."transactions" to "authenticated";

grant trigger on table "public"."transactions" to "authenticated";

grant truncate on table "public"."transactions" to "authenticated";

grant update on table "public"."transactions" to "authenticated";

grant delete on table "public"."transactions" to "postgres";

grant insert on table "public"."transactions" to "postgres";

grant references on table "public"."transactions" to "postgres";

grant select on table "public"."transactions" to "postgres";

grant trigger on table "public"."transactions" to "postgres";

grant truncate on table "public"."transactions" to "postgres";

grant update on table "public"."transactions" to "postgres";

grant delete on table "public"."transactions" to "service_role";

grant insert on table "public"."transactions" to "service_role";

grant references on table "public"."transactions" to "service_role";

grant select on table "public"."transactions" to "service_role";

grant trigger on table "public"."transactions" to "service_role";

grant truncate on table "public"."transactions" to "service_role";

grant update on table "public"."transactions" to "service_role";

grant delete on table "public"."wallets" to "anon";

grant insert on table "public"."wallets" to "anon";

grant references on table "public"."wallets" to "anon";

grant select on table "public"."wallets" to "anon";

grant trigger on table "public"."wallets" to "anon";

grant truncate on table "public"."wallets" to "anon";

grant update on table "public"."wallets" to "anon";

grant delete on table "public"."wallets" to "authenticated";

grant insert on table "public"."wallets" to "authenticated";

grant references on table "public"."wallets" to "authenticated";

grant select on table "public"."wallets" to "authenticated";

grant trigger on table "public"."wallets" to "authenticated";

grant truncate on table "public"."wallets" to "authenticated";

grant update on table "public"."wallets" to "authenticated";

grant delete on table "public"."wallets" to "postgres";

grant insert on table "public"."wallets" to "postgres";

grant references on table "public"."wallets" to "postgres";

grant select on table "public"."wallets" to "postgres";

grant trigger on table "public"."wallets" to "postgres";

grant truncate on table "public"."wallets" to "postgres";

grant update on table "public"."wallets" to "postgres";

grant delete on table "public"."wallets" to "service_role";

grant insert on table "public"."wallets" to "service_role";

grant references on table "public"."wallets" to "service_role";

grant select on table "public"."wallets" to "service_role";

grant trigger on table "public"."wallets" to "service_role";

grant truncate on table "public"."wallets" to "service_role";

grant update on table "public"."wallets" to "service_role";


  create policy "Allow authenticated users to read coins"
  on "public"."coins"
  as permissive
  for select
  to authenticated
using (true);



  create policy "Allow public read access"
  on "public"."coins"
  as permissive
  for select
  to public
using (true);



  create policy "Allow service role to manage coins"
  on "public"."coins"
  as permissive
  for all
  to service_role
using (true)
with check (true);



  create policy "Service role can insert deposit sessions"
  on "public"."deposit_sessions"
  as permissive
  for insert
  to public
with check (true);



  create policy "Service role can update deposit sessions"
  on "public"."deposit_sessions"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "Users can view their own deposit sessions"
  on "public"."deposit_sessions"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Service role can insert notifications"
  on "public"."notifications"
  as permissive
  for insert
  to service_role
with check (true);



  create policy "Users can read their own notifications"
  on "public"."notifications"
  as permissive
  for select
  to authenticated
using ((auth.uid() = user_id));



  create policy "Users can update their own notifications"
  on "public"."notifications"
  as permissive
  for update
  to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Enable insert for users based on user_id"
  on "public"."profiles"
  as permissive
  for insert
  to public
with check ((id = auth.uid()));



  create policy "Enable users to view their own data only"
  on "public"."profiles"
  as permissive
  for select
  to authenticated
using ((( SELECT auth.uid() AS uid) = id));



  create policy "profiles_update_own"
  on "public"."profiles"
  as permissive
  for update
  to authenticated
using ((id = auth.uid()))
with check ((id = auth.uid()));



  create policy "Admins can modify staking plans"
  on "public"."staking_plans"
  as permissive
  for all
  to public
using ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.is_admin = true)))))
with check ((EXISTS ( SELECT 1
   FROM public.profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.is_admin = true)))));



  create policy "Anyone can read staking plans"
  on "public"."staking_plans"
  as permissive
  for select
  to public
using (true);



  create policy "No client writes to staking plans"
  on "public"."staking_plans"
  as permissive
  for all
  to authenticated
using (false)
with check (false);



  create policy "Users can create their own staking positions"
  on "public"."staking_positions"
  as permissive
  for insert
  to public
with check ((user_id = auth.uid()));



  create policy "Users can read their own staking positions"
  on "public"."staking_positions"
  as permissive
  for select
  to public
using ((user_id = auth.uid()));



  create policy "Users can update their own staking positions"
  on "public"."staking_positions"
  as permissive
  for update
  to public
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



  create policy "SELECT policy"
  on "public"."transactions"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Service role can insert transactions"
  on "public"."transactions"
  as permissive
  for insert
  to public
with check (true);



  create policy "Service role can update wallets"
  on "public"."wallets"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "wallets_insert_own"
  on "public"."wallets"
  as permissive
  for insert
  to authenticated
with check ((user_id = auth.uid()));



  create policy "wallets_select_own"
  on "public"."wallets"
  as permissive
  for select
  to authenticated
using ((user_id = auth.uid()));



  create policy "wallets_update_own"
  on "public"."wallets"
  as permissive
  for update
  to authenticated
using ((user_id = auth.uid()))
with check ((user_id = auth.uid()));



