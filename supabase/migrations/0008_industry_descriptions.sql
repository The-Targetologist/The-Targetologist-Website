-- Adds a one-line description per industry so IndustryCard can show a
-- real, honest description alongside its icon, matching the reference
-- landing page's "Who This Is For" card structure (business owner
-- request, 2026-09-27) — wording is our own, not copied, and describes
-- the real service categories already confirmed in
-- docs/01-project-brief.md, not fabricated specifics.

update industry_categories set description = 'Route patient and buyer enquiries into a clear pipeline with timely follow-up.' where slug = 'healthcare-medical-services';
update industry_categories set description = 'Keep candidate and client pipelines moving without chasing every lead by hand.' where slug = 'recruitment-staffing';
update industry_categories set description = 'Capture enquiries from every channel and re-engage past customers.' where slug = 'apparel-retail';
update industry_categories set description = 'Turn missed calls and web form fills into booked appointments automatically.' where slug = 'home-services';
update industry_categories set description = 'Turn referrals and inbound interest into a predictable flow of discovery calls.' where slug = 'b2b-agencies';
