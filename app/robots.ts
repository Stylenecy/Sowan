import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL || "https://sowan.id";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/room/", "/feedback", "/feedback-mentor"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
