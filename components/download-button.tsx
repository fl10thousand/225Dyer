"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function DownloadButton() {
  return (
    <Link
      href="https://zquyeqrtcl79zjs6.public.blob.vercel-storage.com/Parking%20app-BmdVu95Q5LYXmwfx1I860pNEUVGR0t.pdf"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button className="bg-[#FF8200] hover:bg-[#FF8200]/90 flex items-center gap-2">
        <Download className="h-4 w-4" />
        Download Parking Application
      </Button>
    </Link>
  )
}
