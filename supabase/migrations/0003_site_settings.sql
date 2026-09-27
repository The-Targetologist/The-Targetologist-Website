-- Site settings — singleton row (contact info, booking/lead-routing
-- links). Not in the original docs/09-content-and-database-model.md
-- schema, but required by docs/10-admin-panel.md ("Site settings: contact
-- info, social links"). Added as its own migration rather than editing
-- 0001_init.sql after the fact. Seeded with the real values already used
-- in lib/constants/site.ts (pulled from thetargetologist.com 2026-09-23).

create table site_settings (
  id boolean primary key default true,
  contact_email text not null,
  contact_phone text not null,
  address_line1 text not null,
  address_city text not null,
  address_state text not null,
  address_zip text not null,
  address_country text not null,
  calendly_url text not null,
  ghl_form_embed_src text not null,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id)
);

alter table site_settings enable row level security;

create policy "public read site settings"
  on site_settings for select
  using (true);

insert into site_settings (
  id, contact_email, contact_phone,
  address_line1, address_city, address_state, address_zip, address_country,
  calendly_url, ghl_form_embed_src
) values (
  true, 'contact@thetargetologist.com', '+1 (561) 872-8812',
  '1489 W. Palmetto Park Rd Suite 500', 'Boca Raton', 'FL', '33486', 'USA',
  'https://calendly.com/hamza-thetargetologist/30min',
  'https://api.leadconnectorhq.com/widget/form/eKPuw8kt9cepL7XDQCLt'
)
on conflict (id) do nothing;
