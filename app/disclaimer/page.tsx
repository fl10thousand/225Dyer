import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Disclaimer | DayTrips.ai",
  description: "Legal disclaimer and terms of use for DayTrips.ai",
}

export default function DisclaimerPage() {
  return (
    <div className="container py-12 md:py-24">
      <Button variant="ghost" asChild className="mb-8 group">
        <Link href="/" className="flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>
      </Button>

      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Disclaimer</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Information Accuracy</h2>
            <p className="text-muted-foreground">
              The information provided by DayTrips.ai is for general informational and entertainment purposes only.
              While we strive to provide accurate and up-to-date information, we make no representations or warranties
              of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or
              availability of the information, products, services, or related graphics contained on the website.
            </p>
            <p className="text-muted-foreground">
              Any reliance you place on such information is therefore strictly at your own risk. Travel information,
              including but not limited to opening hours, prices, and availability of attractions, may change without
              notice. We recommend verifying all information directly with the relevant venues before planning your
              trip.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">AI-Generated Content</h2>
            <p className="text-muted-foreground">
              DayTrips.ai uses artificial intelligence to generate travel itineraries and recommendations. While our AI
              models are trained on extensive data, they may occasionally produce inaccurate, incomplete, or outdated
              information. We do not guarantee that AI-generated itineraries will be perfect or suitable for all users
              in all circumstances.
            </p>
            <p className="text-muted-foreground">
              Users should exercise their own judgment when following AI-generated recommendations and should always
              prioritize their safety, comfort, and personal preferences when traveling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">External Links and Affiliate Relationships</h2>
            <p className="text-muted-foreground">
              Our website may contain links to external websites or services that are not provided or maintained by
              DayTrips.ai. We do not guarantee the accuracy or reliability of information on these external sites.
            </p>
            <p className="text-muted-foreground">
              DayTrips.ai may have affiliate relationships with third-party services, including but not limited to
              travel booking platforms, tour operators, and accommodation providers. We may receive compensation for
              referring users to these services. This compensation does not influence our recommendations, but users
              should be aware of these relationships when making purchasing decisions.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event will DayTrips.ai, its owners, employees, or affiliates be liable for any loss or damage
              including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever
              arising from loss of data or profits arising out of, or in connection with, the use of this website or the
              use of any AI-generated itineraries or recommendations.
            </p>
            <p className="text-muted-foreground">
              DayTrips.ai is not responsible for any injuries, damages, or losses incurred during travel activities
              suggested by our platform. Users are responsible for their own safety and well-being while traveling.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Changes to This Disclaimer</h2>
            <p className="text-muted-foreground">
              We may update this disclaimer from time to time. We will notify users of any changes by posting the new
              disclaimer on this page. Users are advised to review this disclaimer periodically for any changes.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this disclaimer, please contact us at support@daytrips.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
