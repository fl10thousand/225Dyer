import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" className="relative w-40 h-16">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Point%20225%20logo-LKcypsRjfsV9RMUq3MFRB9KhJAjuZi.png"
            alt="Point225"
            fill
            className="object-contain"
          />
        </Link>
        <Link href="https://www.225-dyer.com" target="_blank" rel="noopener noreferrer">
          <Button className="bg-[#FF8200] hover:bg-[#FF8200]/90 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#FF8200] focus:ring-opacity-50 animate-pulse-orange">
            <MessageCircle className="w-5 h-5 mr-2" />
            Chat with Us
          </Button>
        </Link>
      </div>
    </header>
  )
}
