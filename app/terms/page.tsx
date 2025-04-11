import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Terms and Conditions | DayTrips.ai",
  description: "Terms and conditions for using DayTrips.ai services",
}

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Terms and Conditions</h1>
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="space-y-6">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing or using DayTrips.ai, you agree to be bound by these Terms and Conditions and all applicable
              laws and regulations. If you do not agree with any of these terms, you are prohibited from using or
              accessing this site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">2. Use of Service</h2>
            <p className="text-muted-foreground">
              DayTrips.ai provides an AI-powered service that generates personalized day trip itineraries based on user
              preferences. The service is provided "as is" and "as available" without any warranties, expressed or
              implied.
            </p>
            <p className="text-muted-foreground">
              We reserve the right to modify, suspend, or discontinue the service at any time without notice. We shall
              not be liable to you or any third party for any modification, suspension, or discontinuance of the
              service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">3. User Accounts</h2>
            <p className="text-muted-foreground">
              Some features of DayTrips.ai may require registration and the creation of a user account. You are
              responsible for maintaining the confidentiality of your account information, including your password, and
              for all activity that occurs under your account.
            </p>
            <p className="text-muted-foreground">
              You agree to notify us immediately of any unauthorized use of your account or any other breach of
              security. We will not be liable for any loss that you may incur as a result of someone else using your
              account, either with or without your knowledge.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. User Content</h2>
            <p className="text-muted-foreground">
              Users may have the ability to submit content, including but not limited to preferences, reviews, and
              feedback. By submitting content to DayTrips.ai, you grant us a worldwide, non-exclusive, royalty-free
              license to use, reproduce, adapt, publish, translate, and distribute your content in any existing or
              future media.
            </p>
            <p className="text-muted-foreground">
              You represent and warrant that your content does not violate any third-party rights, including copyright,
              trademark, privacy, or other personal or proprietary rights, and does not contain any material that is
              harmful, offensive, or otherwise objectionable.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">5. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The DayTrips.ai service, including but not limited to its logo, design, text, graphics, and AI-generated
              content, is owned by DayTrips.ai and is protected by copyright, trademark, and other intellectual property
              laws.
            </p>
            <p className="text-muted-foreground">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
              republish, download, store, or transmit any of the material on our website, except as incidental to normal
              web browsing or as expressly permitted in writing by DayTrips.ai.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">6. Prohibited Activities</h2>
            <p className="text-muted-foreground">
              You agree not to use DayTrips.ai for any purpose that is unlawful or prohibited by these Terms. Prohibited
              activities include, but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>
                Using the service for any illegal purpose or in violation of any local, state, national, or
                international law
              </li>
              <li>
                Attempting to interfere with, compromise the system integrity or security, or decipher any transmissions
                to or from the servers running the service
              </li>
              <li>Using the service to collect or harvest personal data about other users</li>
              <li>
                Impersonating another person or entity, or falsely stating or otherwise misrepresenting your affiliation
                with a person or entity
              </li>
              <li>
                Using automated means, including spiders, robots, crawlers, or data mining tools, to download data from
                the service
              </li>
              <li>Uploading or transmitting viruses, malware, or other types of malicious software</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">7. Third-Party Links and Services</h2>
            <p className="text-muted-foreground">
              DayTrips.ai may contain links to third-party websites or services that are not owned or controlled by
              DayTrips.ai. We have no control over, and assume no responsibility for, the content, privacy policies, or
              practices of any third-party websites or services.
            </p>
            <p className="text-muted-foreground">
              You acknowledge and agree that DayTrips.ai shall not be responsible or liable, directly or indirectly, for
              any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any
              such content, goods, or services available on or through any such websites or services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">8. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              In no event shall DayTrips.ai, its directors, employees, partners, agents, suppliers, or affiliates be
              liable for any indirect, incidental, special, consequential, or punitive damages, including without
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              <li>Reliance on AI-generated itineraries or recommendations</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">9. Governing Law</h2>
            <p className="text-muted-foreground">
              These Terms shall be governed and construed in accordance with the laws of [Jurisdiction], without regard
              to its conflict of law provisions. Any legal action or proceeding relating to your access to or use of the
              service shall be instituted in the courts of [Jurisdiction].
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision
              is material, we will provide at least 30 days' notice prior to any new terms taking effect. What
              constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="text-muted-foreground">
              By continuing to access or use our service after any revisions become effective, you agree to be bound by
              the revised terms. If you do not agree to the new terms, you are no longer authorized to use the service.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">11. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at support@daytrips.ai.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
