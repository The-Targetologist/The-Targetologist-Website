import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

// Only 600 (Footer's "font-heading font-semibold") and 700 (the global
// h1-h6 rule in globals.css) are actually used anywhere in the codebase —
// verified via grep, not assumed. 800 was being downloaded on every page
// load for nothing.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Root-level defaults. Per-page canonical/OG/Twitter metadata is built by
// lib/seo.ts's pageMetadata() on every marketing page (Phase 11, per
// docs/12-seo-and-url-strategy.md) — these are just the site-wide
// fallbacks/base config every page inherits.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://thetargetologist.com"),
  title: {
    default: "The Targetologist – Precision Marketing that Delivers",
    template: "%s - The Targetologist",
  },
  description:
    "Targetologist helps operators turn scattered lead generation, manual follow-ups, and disconnected tools into a structured system that produces consistent client acquisition.",
  openGraph: {
    siteName: "The Targetologist – Precision Marketing that Delivers",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

// Header/Footer live in app/(marketing)/layout.tsx, not here — the /admin
// section (Phase 8) needs its own chrome, not the public marketing nav.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
