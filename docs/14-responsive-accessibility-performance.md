# Responsive, Accessibility & Performance

## Responsive
Desktop, tablet, and mobile each considered intentionally — not just shrunk. Particular attention to: header/nav collapse behavior, the 2-service card layout on mobile (stacked, not cramped), process-step numbering on small screens, FAQ accordions, booking form/embed responsiveness (the GHL embed's own responsiveness should be verified, not assumed).

## Accessibility
Semantic HTML, proper heading hierarchy, alt text on all images, sufficient color contrast (especially important given the "confident, direct" dark-leaning tone — verify contrast ratios don't drop below WCAG AA), keyboard-navigable nav and forms, accessible accordion (FAQ) behavior.

## Performance
Next.js image optimization, lazy loading below the fold, minimal client-side JS, server components where appropriate, optimized fonts, efficient Supabase queries. The GHL/Calendly embeds are third-party scripts — load them appropriately (deferred/lazy where possible) so they don't block initial page load.
