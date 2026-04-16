import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { InteractiveMap } from "@/components/interactive-map"
import { MapPin } from "lucide-react"

export const metadata = {
  title: "Localisation — GUYA FIBRE | Comment nous trouver",
  description: "Retrouvez GUYA FIBRE à Saint-Laurent-du-Maroni, Guyane française. Itinéraire, coordonnées GPS et informations pratiques pour nous rendre visite.",
}

export default function LocalisationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen brand-dark-bg">
        {/* Header */}
        <section className="pt-32 pb-12 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.65_0.13_180)]/10 border border-[oklch(0.65_0.13_180)]/30 mb-6">
                <MapPin className="w-4 h-4 text-[oklch(0.65_0.13_180)]" />
                <span className="text-[oklch(0.65_0.13_180)] text-sm font-medium">Notre localisation</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                Venez nous rencontrer
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Notre équipe vous accueille du lundi au samedi à Saint-Laurent-du-Maroni. 
                Retrouvez toutes les informations pour nous rejoindre facilement.
              </p>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide max-w-4xl">
            <InteractiveMap />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
