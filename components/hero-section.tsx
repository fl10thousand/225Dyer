import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative h-[500px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5657.jpg-5mD0STFW0zblqyIQgajScmQyghc9vR.jpeg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF8200] to-[#FF8200]/60" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-white mb-4">
            Welcome to
            <br />
            225 Dyer Street
          </h1>
          <p className="text-xl text-white mb-8">Your premier workspace in the heart of Providence, Rhode Island.</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="secondary" className="bg-white text-[#FF8200] hover:bg-white/90">
              <Link href="/resources">View Resources</Link>
            </Button>
            <Button asChild variant="secondary" className="bg-white text-[#FF8200] hover:bg-white/90">
              <Link href="https://app.buildingengines.com/geofire/login" target="_blank" rel="noopener noreferrer">
                Submit Work Order
              </Link>
            </Button>
            <Button asChild variant="secondary" className="bg-white text-[#FF8200] hover:bg-white/90">
              <Link href="https://kiosk.kaiterra.com/2QRDZ8I1ZMVMM39Z" target="_blank" rel="noopener noreferrer">
                Indoor Air Quality
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
