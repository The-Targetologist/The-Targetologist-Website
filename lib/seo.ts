import type { Metadata } from "next";

// Real site name pulled from the live WordPress site's og:site_name
// (thetargetologist.com, 2026-09-23) — see docs/12-seo-and-url-strategy.md.
export const SITE_NAME = "The Targetologist – Precision Marketing that Delivers";

/**
 * Builds canonical + OpenGraph + Twitter metadata consistently across
 * every page. `title.template` in the root layout only rewrites the
 * document <title> — it does NOT propagate to openGraph.title/
 * twitter.title (verified against node_modules/next/dist/docs), so this
 * builds the full resolved title string explicitly for those fields.
 */
export function pageMetadata({
  title,
  description,
  path,
  isHome = false,
}: {
  title: string;
  description: string;
  path: string;
  isHome?: boolean;
}): Metadata {
  const fullTitle = isHome ? title : `${title} - The Targetologist`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
