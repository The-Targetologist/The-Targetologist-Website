import { ImageResponse } from "next/og";

// The live WordPress site has no real dedicated OG share image (no
// og:image meta tag — social platforms would've fallen back to a generic
// 200x200 Rank Math default). Rather than invent a fake product photo,
// generate a branded card from real copy and real brand tokens — same
// navy/accent palette as app/globals.css, same real tagline used
// site-wide. More specific opengraph-image files (if ever added under a
// route) take precedence over this default per Next.js convention.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "The Targetologist – Precision Marketing that Delivers";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0b1f3a",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7aa2f7",
          }}
        >
          The Targetologist
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 62,
            fontWeight: 700,
            color: "#ffffff",
            lineHeight: 1.15,
            maxWidth: 920,
          }}
        >
          We Build Revenue Systems for B2B Service Businesses
        </div>
        <div style={{ display: "flex", marginTop: 32, fontSize: 26, color: "#c7cedb" }}>
          No hacks. No random outreach. Just systems that convert.
        </div>
      </div>
    ),
    { ...size }
  );
}
