# QA & Launch

## Pre-launch checklist
- All real contact info (phone, email, address) verified accurate and matching current WordPress site
- Privacy Policy and Terms carried forward accurately from the existing site (real legal text, not regenerated)
- Calendly booking link verified working
- GHL form embed (or native replacement) verified actually delivering leads into the correct pipeline — test submission end-to-end before cutover
- No named client testimonials without `permission_confirmed = true`
- No fabricated stats anywhere (client counts, revenue figures, etc.)
- 301 redirects configured for any URL path that changed from the WordPress site
- Sitemap.xml and robots.txt correct
- Mobile/tablet/desktop QA pass

## Launch / DNS cutover
This is a **live site migration**, not a greenfield launch — unlike Mian Tayyab Steel. Plan the DNS cutover carefully:
1. Deploy and fully verify the new site on its Vercel URL first
2. Point the custom domain (thetargetologist.com) to Vercel only once fully verified
3. Keep the old WordPress site accessible (or backed up) for a period after cutover in case rollback is needed
4. Monitor for broken inbound links/404s in the days after cutover
