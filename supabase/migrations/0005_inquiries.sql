-- Native lead-capture form replacing the GHL iframe embed on Contact, and
-- added to Home too (business owner request, 2026-09-27). Matches the
-- table already anticipated in docs/09-content-and-database-model.md
-- ("inquiries -- if a native contact form is built instead of/alongside
-- the GHL embed") — fields updated to match the actual form fields
-- specified now (name/email/company/website/challenge), superseding that
-- doc's original rough sketch (phone/message/service_interest), same
-- pattern as other doc supersessions already recorded in
-- docs/PROJECT_STATE.md.
--
-- Submissions are always durably stored here regardless of webhook
-- status — nothing is lost while INQUIRY_WEBHOOK_URL is unconfigured.
-- webhook_sent_at tracks whether/when a submission was forwarded once a
-- webhook URL is provided.

create table inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  website text,
  challenge text,
  status text not null default 'new',
  webhook_sent_at timestamptz,
  created_at timestamptz not null default now()
);

alter table inquiries enable row level security;

-- No select/insert policies for anon/public — the submission Server
-- Action uses the service-role client directly (bypasses RLS), and only
-- admin queries (also service-role) ever read this table. Matches the
-- "writes are service-role only" pattern used throughout this schema.
