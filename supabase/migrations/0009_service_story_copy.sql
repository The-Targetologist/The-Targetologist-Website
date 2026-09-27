-- Expands the "problem this solves" copy on both service pages from a
-- single terse paragraph into a short multi-paragraph narrative (business
-- owner request, 2026-09-27: "explain a story, more lines"). Paragraphs
-- are separated by a blank line; ServicePageLayout splits on that to
-- render each as its own <p>. Original, not copied from any reference.

update services set
  problem_statement = 'Most B2B service businesses don''t lose deals because they can''t generate leads. They lose them in the gap between a lead coming in and someone actually following up.

A prospect fills out a form on a Tuesday. Nobody sees it until Thursday. By then they''ve already booked with someone else, or they''ve simply gone cold waiting for a reply that never came.

Multiply that across every channel you use, ads, referrals, LinkedIn, and the pattern repeats. Your CRM has the data, but nobody trusts it enough to run the business from it. The result is a business that feels busy but can''t point to a reliable number of booked calls each month.'
where slug = 'automation';

update services set
  problem_statement = 'Running ads without a system behind them is a common trap. Spend goes up, impressions climb, and the dashboard looks busy, but the phone doesn''t ring any more often than before.

The problem usually isn''t the platform. It''s that the campaign was built to win clicks, not conversations. A cold audience gets shown an ad, clicks once, and disappears into a CRM nobody follows up with.

We build campaigns the other way around, starting from who actually buys from you, and making sure every click has somewhere real to go once they''ve clicked. The goal isn''t more traffic. It''s more of the right conversations with the right accounts.'
where slug = 'advertisement';
