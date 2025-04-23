'use client'

import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react'
import { useState } from 'react'

export function HandbookDownload() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/download-handbook')
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || `HTTP error! status: ${response.status}`)
      }
      
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/pdf')) {
        throw new Error('Received invalid content type')
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
      setError(`Failed to download the handbook: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button 
        className="bg-[#FF8200] hover:bg-[#FF8200]/90 flex items-center gap-2"
        onClick={handleDownload}
        disabled={isLoading}
      >
        <Download className="h-4 w-4" />
        {isLoading ? 'Downloading...' : 'Download Handbook'}
      </Button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}
