import type { Metadata } from "next";
import type { ReactNode } from "react";

// Defense in depth alongside robots.ts's Disallow: /admin/ — an actual
// noindex meta tag protects against indexing even if something external
// links to an admin URL despite the crawl directive.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
