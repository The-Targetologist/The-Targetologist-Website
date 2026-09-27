-- Removes em dashes from seeded copy already live in the database
-- (0002/0003 applied earlier) per the business owner's copy-tone request
-- (2026-09-27): plain periods/commas throughout, no em dashes. The
-- 0004 migration's own em dashes were fixed by editing that file directly
-- since it had never been applied yet; these rows were already live and
-- need a real UPDATE.

update services set
  problem_statement = 'Running ads without a system behind them means leads land in an inbox and go nowhere. Spend goes up, but pipeline doesn''t move with it. The goal isn''t more clicks. It''s more of the right conversations with the right accounts.'
where slug = 'advertisement';

update process_steps set
  description = 'Every conversation lands in one place. Nothing tracked in someone''s inbox or a spreadsheet.'
where title = 'Centralized CRM' and service_id is null;

update faqs set
  answer = 'We work primarily in GoHighLevel and can integrate with tools you already use via Zapier. Happy to talk through what fits your current setup on a call.'
where question = 'Do you use our existing CRM or move us to GoHighLevel?';

update faqs set
  answer = 'No. Automation handles the repetitive follow-up and routing so your team can focus on actual conversations. It doesn''t replace the conversations themselves.'
where question = 'Will this replace my sales team?';

update faqs set
  answer = 'Google, Meta, and LinkedIn, matched to where your target accounts actually spend attention, not run everywhere by default.'
where question = 'Which ad platforms do you manage?';

update faqs set
  answer = 'Yes. Ad leads connect directly into the same automation system, so follow-up starts immediately instead of sitting in a spreadsheet.'
where question = 'Do the leads go straight into a CRM?';
