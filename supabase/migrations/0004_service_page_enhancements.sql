-- Adds two fields discovered missing during Phase 13 QA when the real
-- live /automation/ and /advertisement/ pages were found (not part of the
-- original docs/09-content-and-database-model.md schema, same pattern as
-- 0003_site_settings.sql). `tagline` is a punchy hero headline distinct
-- from the short `name` label (used in nav/ServiceCard) and the
-- one-sentence `one_line_value_prop`. `why_it_works` is a benefit-bullet
-- list, same shape as `whats_included`.
--
-- Also updates existing service content with real copy pulled from the
-- live pages (reviewed with the business owner 2026-09-23), merged with
-- the existing data-driven process/FAQ content rather than replacing it.

alter table services add column if not exists tagline text;
alter table services add column if not exists why_it_works text;

update services set
  tagline = 'Automation Built for B2B Growth',
  one_line_value_prop = 'We connect your CRM, follow-ups, and booking flow into one system, so no lead falls through the cracks.',
  whats_included = 'CRM Integration: every lead source synced into one pipeline (GoHighLevel)
Automated Follow-Up: timely, personalized outreach sequences (email and SMS)
Booking Automation: calendar sync with instant confirmations
Workflow builds connecting ad platforms and forms to your CRM (Zapier)',
  why_it_works = 'No lead ever falls through the cracks
Follow-ups sent automatically, every time
Save 10+ hours a week on manual admin
One dashboard for your entire pipeline'
where slug = 'automation';

update services set
  tagline = 'Advertisement That Actually Converts',
  one_line_value_prop = 'We manage LinkedIn and paid ad campaigns built specifically for B2B service businesses, targeting the right accounts, not just clicks.',
  whats_included = 'LinkedIn Ads: account-based targeting for decision-makers
Google Search Ads: high-intent keyword campaigns
Meta (Facebook/Instagram) campaign management
Retargeting and weekly performance reporting',
  why_it_works = 'Precise B2B targeting, not just clicks
Campaigns built around your sales cycle
Transparent weekly reporting
No wasted spend on the wrong audience'
where slug = 'advertisement';
