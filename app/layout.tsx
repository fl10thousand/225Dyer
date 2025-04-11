import { Analytics } from "@vercel/analytics/react"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"
import SupabaseProvider from "@/components/supabase-provider"
import DebugAuthState from "@/components/debug-auth-state"
import Link from "next/link"
import { Facebook, Linkedin } from "lucide-react"
import { getDefaultOgImageUrl } from "@/lib/og-utils"

const inter = Inter({ subsets: ["latin"] })

// Get the site URL from environment variable or use default
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai"

export const metadata: Metadata = {
  title: "DayTrips.ai – AI-Powered Day Trip Generator",
  description:
    "Let our AI plan your perfect day trip, anywhere in the world. Discover adventures, book experiences, and travel smarter.",
  keywords: [
    "day trips",
    "AI trip planner",
    "travel deals",
    "viator",
    "hotel booking",
    "car rentals",
    "personalized itineraries",
    "travel planning",
  ],
  authors: [{ name: "DayTrips.ai" }],
  creator: "DayTrips.ai",
  publisher: "DayTrips.ai",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "DayTrips.ai – AI-Powered Day Trip Generator",
    description:
      "Let our AI plan your perfect day trip, anywhere in the world. Discover adventures, book experiences, and travel smarter.",
    siteName: "DayTrips.ai",
    images: [
      {
        url: getDefaultOgImageUrl(),
        width: 1200,
        height: 630,
        alt: "Road with map on dashboard – AI Day Trip Generator background",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DayTrips.ai – AI-Powered Day Trip Generator",
    description:
      "Let our AI plan your perfect day trip, anywhere in the world. Discover adventures, book experiences, and travel smarter.",
    images: [getDefaultOgImageUrl()],
    creator: "@daytripsai",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    // Add your verification codes if you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9175109932696652"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <SupabaseProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pb-28 relative" aria-labelledby="main-heading">
                <h1 id="main-heading" className="sr-only">
                  DayTrips.ai - AI-Powered Day Trip Generator
                </h1>
                {/* JSON-LD structured data for better SEO */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "WebSite",
                      name: "DayTrips.ai",
                      url: process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai",
                      potentialAction: {
                        "@type": "SearchAction",
                        target: {
                          "@type": "EntryPoint",
                          urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai"}/?search={search_term_string}`,
                        },
                        "query-input": "required name=search_term_string",
                      },
                      description:
                        "AI-powered day trip planner that creates personalized itineraries based on your preferences",
                      publisher: {
                        "@type": "Organization",
                        name: "DayTrips.ai",
                        logo: {
                          "@type": "ImageObject",
                          url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://daytrips.ai"}/logo.png`,
                        },
                      },
                    }),
                  }}
                />
                {children}
                <div className="clear-both"></div> {/* This ensures floated elements don't cause overlap */}
              </main>
              {/* Footer section with social media icons */}
              <footer className="border-t py-6 md:py-8 relative z-10">
                <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
                  <p className="text-center text-sm text-muted-foreground md:text-left">
                    &copy; {new Date().getFullYear()} DayTrips.ai. All rights reserved.
                  </p>
                  <div className="flex items-center gap-6">
                    <div className="flex gap-4">
                      <a
                        href="https://www.facebook.com/profile.php?id=61573998728499"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/106901997/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <Link href="/about" className="hover:text-foreground transition-colors">
                        About
                      </Link>
                      <Link href="/terms" className="hover:text-foreground transition-colors">
                        Terms and Conditions
                      </Link>
                      <Link href="/disclaimer" className="hover:text-foreground transition-colors">
                        Disclaimer
                      </Link>
                      <Link href="/faq" className="hover:text-foreground transition-colors">
                        FAQ
                      </Link>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
            <Toaster />
            <Analytics />
            {process.env.NODE_ENV !== "production" && <DebugAuthState />}
          </SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'