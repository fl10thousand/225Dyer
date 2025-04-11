import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/my-trips/", "/profile/"],
    },
    sitemap: "https://daytrips.ai/sitemap.xml",
  }
}
