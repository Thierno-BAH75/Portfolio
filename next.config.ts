import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Covers de projets en SVG (remplacés plus tard par de vraies captures
    // au même chemin) : SVG local, sandboxé sans script pour éviter tout XSS.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
