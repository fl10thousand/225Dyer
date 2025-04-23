import type React from "react"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import { Header } from "@/components/header"
import { FooterDisclaimer } from "@/components/footer-disclaimer"
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "225 Dyer Street",
  description: "Your premier workspace in the heart of Providence, Rhode Island.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} pt-24`}>
        <Header />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
          {children}
        </Suspense>
        <FooterDisclaimer />
        <Analytics />
      </body>
    </html>
  )
}
