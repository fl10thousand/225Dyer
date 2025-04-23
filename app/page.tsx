import { HeroSection } from "@/components/hero-section"
import { QuickActions } from "@/components/quick-actions"
import { BuildingAmenities } from "@/components/building-amenities"

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <QuickActions />
      <BuildingAmenities />
    </div>
  )
}
