-- Seed data mirroring the interim static content previously in
-- lib/content/*.ts (real content adapted from the live site and
-- docs/01-project-brief.md — not fabricated). Fixed UUIDs + ON CONFLICT DO
-- NOTHING make this idempotent and safe to re-run. Run after 0001_init.sql.
--
-- No testimonials seeded — none exist with permission_confirmed yet. Do
-- not add placeholder testimonials here; see
-- docs/16-claude-project-rules.md rule 4.

insert into services (id, name, slug, one_line_value_prop, problem_statement, how_we_do_it, whats_included, status)
values
  (
    'a0000000-0000-0000-0000-000000000001',
    'Automation',
    'automation',
    'CRM integration, consistent follow-up, and connected booking systems — so leads stop falling through the cracks.',
    'Leads come in from multiple channels, but nothing connects. Follow-up depends on someone remembering to send it. Your CRM has the data, but it isn''t set up to actually work for you. The result: qualified leads go cold before they ever get a real conversation.',
    'Audit your current lead flow and CRM setup, build integrated workflows in GoHighLevel and Zapier, launch automated nurture sequences, then optimize based on response and conversion data.',
    'CRM setup and integration (GoHighLevel)
Automated lead nurture sequences (email and SMS)
Workflow builds connecting your lead sources and CRM (Zapier)
Booking and follow-up system connection, end to end',
    'published'
  ),
  (
    'a0000000-0000-0000-0000-000000000002',
    'Advertisement',
    'advertisement',
    'Targeted LinkedIn and paid ad campaigns built for B2B service businesses — precision targeting over vanity click volume.',
    'Running ads without a system behind them means leads land in an inbox and go nowhere. Spend goes up, but pipeline doesn''t move with it. The goal isn''t more clicks — it''s more of the right conversations with the right accounts.',
    'Audit your offer, audience, and target accounts, build and launch campaigns across Google, Meta, and LinkedIn, test creative and targeting against account fit, then optimize and scale what converts.',
    'Campaign strategy and account targeting
Ad creation and management across Google, Meta, and LinkedIn
Ongoing optimization based on conversion data, not vanity metrics
Direct connection into your CRM and automation system, so leads are followed up immediately',
    'published'
  )
on conflict (id) do nothing;

insert into process_steps (id, service_id, step_number, title, description, sub_tags)
values
  ('c0000000-0000-0000-0000-000000000001', null, 1, 'Lead Sources', 'LinkedIn, paid ads, and referrals feed into one system instead of scattering across tools.', null),
  ('c0000000-0000-0000-0000-000000000002', null, 2, 'Centralized CRM', 'Every conversation lands in one place — nothing tracked in someone''s inbox or a spreadsheet.', null),
  ('c0000000-0000-0000-0000-000000000003', null, 3, 'Automated Nurturing', 'Consistent follow-up runs on its own, so no lead goes cold from a missed reply.', null),
  ('c0000000-0000-0000-0000-000000000004', null, 4, 'Booking System → Revenue', 'Qualified conversations convert into booked calls, and booked calls convert into revenue.', null),

  ('c0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000001', 1, 'Audit', 'Review your current lead flow, CRM setup, and where follow-up breaks down.', null),
  ('c0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000001', 2, 'Build', 'Set up CRM integrations and automation workflows in GoHighLevel and Zapier.', null),
  ('c0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000001', 3, 'Launch', 'Turn on automated nurture sequences across email and SMS.', null),
  ('c0000000-0000-0000-0000-000000000014', 'a0000000-0000-0000-0000-000000000001', 4, 'Optimize', 'Refine sequences and workflows based on response and conversion data.', null),

  ('c0000000-0000-0000-0000-000000000021', 'a0000000-0000-0000-0000-000000000002', 1, 'Audit & Strategy', 'Review your offer, audience, and target accounts before spending a dollar.', null),
  ('c0000000-0000-0000-0000-000000000022', 'a0000000-0000-0000-0000-000000000002', 2, 'Build & Launch', 'Set up campaigns across Google, Meta, and LinkedIn.', null),
  ('c0000000-0000-0000-0000-000000000023', 'a0000000-0000-0000-0000-000000000002', 3, 'Target & Test', 'Test creative and targeting against real account fit, not just click volume.', null),
  ('c0000000-0000-0000-0000-000000000024', 'a0000000-0000-0000-0000-000000000002', 4, 'Optimize & Scale', 'Double down on what''s converting, cut what isn''t.', null)
on conflict (id) do nothing;

insert into industry_categories (id, name, slug, description)
values
  ('b0000000-0000-0000-0000-000000000001', 'Healthcare & Medical Services', 'healthcare-medical-services', null),
  ('b0000000-0000-0000-0000-000000000002', 'Recruitment & Staffing', 'recruitment-staffing', null),
  ('b0000000-0000-0000-0000-000000000003', 'Apparel & Retail', 'apparel-retail', null),
  ('b0000000-0000-0000-0000-000000000004', 'Home Services', 'home-services', null),
  ('b0000000-0000-0000-0000-000000000005', 'B2B Agencies', 'b2b-agencies', null)
on conflict (id) do nothing;

insert into faqs (id, service_id, question, answer, sort_order)
values
  ('d0000000-0000-0000-0000-000000000001', 'a0000000-0000-0000-0000-000000000001', 'Do you use our existing CRM or move us to GoHighLevel?', 'We work primarily in GoHighLevel and can integrate with tools you already use via Zapier — happy to talk through what fits your current setup on a call.', 1),
  ('d0000000-0000-0000-0000-000000000002', 'a0000000-0000-0000-0000-000000000001', 'How long does it take to get a system live?', 'It depends on the complexity of your current setup. We''ll give you a clear timeline after auditing your existing CRM and lead flow.', 2),
  ('d0000000-0000-0000-0000-000000000003', 'a0000000-0000-0000-0000-000000000001', 'Will this replace my sales team?', 'No. Automation handles the repetitive follow-up and routing so your team can focus on actual conversations — it doesn''t replace the conversations themselves.', 3),

  ('d0000000-0000-0000-0000-000000000011', 'a0000000-0000-0000-0000-000000000002', 'Which ad platforms do you manage?', 'Google, Meta, and LinkedIn — matched to where your target accounts actually spend attention, not run everywhere by default.', 1),
  ('d0000000-0000-0000-0000-000000000012', 'a0000000-0000-0000-0000-000000000002', 'Do you require a minimum ad spend?', 'We''ll talk through your budget and goals on the strategy call and tell you honestly whether paid ads make sense for your business right now.', 2),
  ('d0000000-0000-0000-0000-000000000013', 'a0000000-0000-0000-0000-000000000002', 'Do the leads go straight into a CRM?', 'Yes — ad leads connect directly into the same automation system, so follow-up starts immediately instead of sitting in a spreadsheet.', 3)
on conflict (id) do nothing;
