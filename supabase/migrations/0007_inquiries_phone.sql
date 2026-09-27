-- Adds a phone field to the lead form (business owner request, 2026-09-27).
alter table inquiries add column if not exists phone text;
