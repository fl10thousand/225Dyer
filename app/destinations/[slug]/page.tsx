import { slugToTitleCase } from "@/lib/utils"
import { SocialShareButtons } from "@/components/social-share-buttons"

export default function DestinationPage({ params }: { params: { slug: string } }) {
  const destinationName = slugToTitleCase(params.slug)

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{destinationName} Day Trips</h1>
        <SocialShareButtons destination={destinationName} />
      </div>
      <p>Discover day trips in {destinationName}.</p>
    </div>
  )
}
