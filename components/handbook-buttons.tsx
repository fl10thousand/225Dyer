'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'

export function HandbookButtons() {
  const [isLoading, setIsLoading] = useState(false)

  const handleDownload = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/download-handbook')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Download failed')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = "225-Dyer-Tenant-Handbook.pdf"
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading handbook:', error)
      alert('Failed to download the handbook. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button 
      className="bg-[#FF8200] hover:bg-[#FF8200]/90 flex items-center gap-2"
      onClick={handleDownload}
      disabled={isLoading}
    >
      <Download className="h-4 w-4" />
      {isLoading ? 'Downloading...' : 'Download Handbook'}
    </Button>
  )
}
