import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Real, indexed WordPress pages at /automation/ and /advertisement/
      // (discovered during Phase 13 QA — thetargetologist.com/automation
      // and /advertisement both resolve to real, distinct content, not
      // 404s) now live under /services/*. Both with and without trailing
      // slash, since the WordPress site canonicalizes to trailing-slash
      // URLs. See docs/12-seo-and-url-strategy.md and
      // docs/PROJECT_STATE.md.
      { source: "/automation", destination: "/services/automation", permanent: true },
      { source: "/automation/", destination: "/services/automation", permanent: true },
      { source: "/advertisement", destination: "/services/advertisement", permanent: true },
      { source: "/advertisement/", destination: "/services/advertisement", permanent: true },
    ];
  },
};

export default nextConfig;
