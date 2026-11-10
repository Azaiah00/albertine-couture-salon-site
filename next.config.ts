import type { NextConfig } from "next";

/**
 * Public address used for link previews (og:image), canonicals and the sitemap.
 * Priority: NEXT_PUBLIC_SITE_URL (set it to the real domain at launch) →
 * Netlify's built-in URL (the site's primary address, set automatically on every
 * Netlify build) → the demo fallback in src/lib/site.ts.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "";
const siteHost = siteUrl ? new URL(siteUrl).host : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: { NEXT_PUBLIC_SITE_URL: siteUrl },
  poweredByHeader: false,
  devIndicators: false,
  images: { unoptimized: true },
  /**
   * One link only: every other Netlify address for this site — deploy previews, branch
   * deploys and unique deploy URLs (<id>--<site>.netlify.app) — redirects to the main
   * address, so a forwarded or copied link always lands on the same site.
   */
  async redirects() {
    if (!siteHost.endsWith(".netlify.app")) return [];
    const site = siteHost.replace(/\.netlify\.app$/, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `.+--${site}\\.netlify\\.app` }],
        destination: `https://${siteHost}/:path*`,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
