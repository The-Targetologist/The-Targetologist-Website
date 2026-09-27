-- The Targetologist — initial schema
-- Per docs/09-content-and-database-model.md. Blog and inquiries tables are
-- intentionally omitted: blog is out of scope for this rebuild, and the
-- decision on file is to keep the existing GHL form embed rather than a
-- native form (see docs/PROJECT_STATE.md, resolved 2026-09-23).

create type content_status as enum ('draft', 'published', 'archived');

create table services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  one_line_value_prop text,
  problem_statement text,
  how_we_do_it text,
  whats_included text,
  status content_status not null default 'draft',
  created_at timestamptz not null default now()
);

create table process_steps (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade, -- null = homepage general process
  step_number int not null,
  title text not null,
  description text,
  sub_tags text[]
);

create table industry_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  related_service_ids uuid[]
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  industry_category_id uuid references industry_categories(id) on delete set null,
  quote text not null,
  client_name text,
  client_company text,
  permission_confirmed boolean not null default false,
  created_at timestamptz not null default now()
);

create table faqs (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references services(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order int not null default 0
);

-- Gates admin access: being an authenticated Supabase user is not enough.
create table admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table services enable row level security;
alter table process_steps enable row level security;
alter table industry_categories enable row level security;
alter table testimonials enable row level security;
alter table faqs enable row level security;
alter table admin_users enable row level security;

-- Public reads scoped to published content only. Writes are service-role
-- only (no insert/update/delete policies) until admin auth ships in Phase 8.
create policy "public read published services"
  on services for select
  using (status = 'published');

create policy "public read process steps of published services"
  on process_steps for select
  using (
    service_id is null
    or exists (select 1 from services s where s.id = process_steps.service_id and s.status = 'published')
  );

create policy "public read industry categories"
  on industry_categories for select
  using (true);

-- Row-level select is open; the client_name/client_company permission gate
-- is enforced by the frontend query/render layer, not RLS. See
-- docs/09-content-and-database-model.md and docs/16-claude-project-rules.md.
create policy "public read testimonials"
  on testimonials for select
  using (true);

create policy "public read faqs of published services"
  on faqs for select
  using (
    service_id is null
    or exists (select 1 from services s where s.id = faqs.service_id and s.status = 'published')
  );

create policy "users can check own admin status"
  on admin_users for select
  using (auth.uid() = id);
