import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { CheckCircle2, ArrowRight, Phone } from "lucide-react"

export const metadata: Metadata = {
  title: "Nos Offres — GUYA FIBRE",
  description: "Découvrez nos packs de services fibre optique pour particuliers, entreprises et collectivités en Guyane.",
}

const offers = [
  {
    id: "starter",
    name: "Raccordement",
    badge: "Particuliers",
    price: "Sur devis",
    description: "Pour les particuliers souhaitant se raccorder à la fibre optique (FTTH).",
    features: [
      "Visite technique préalable gratuite",
      "Tirage du câble jusqu'à la prise optique",
      "Pose de la PTO et installation ONT",
      "Mise en service et tests OTDR",
      "Bon de recette signé",
      "Assistance à la première connexion",
    ],
    cta: "Demander un devis",
    highlight: false,
  },
  {
    id: "pro",
    name: "Entreprise",
    badge: "PME & Entreprises",
    price: "Sur devis",
    description: "Pour les entreprises nécessitant une liaison FTTO dédiée avec garanties de service.",
    features: [
      "Étude de faisabilité et ingénierie",
      "Fibre dédiée non mutualisée",
      "Équipements professionnels inclus",
      "Documentation technique complète",
      "Tests et mesures certifiés",
      "Contrat de maintenance inclus (1 an)",
      "Astreinte technique 7j/7",
    ],
    cta: "Demander un devis",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Territoire",
    badge: "Collectivités & Opérateurs",
    price: "Sur devis",
    description: "Pour les projets d'envergure : déploiement territorial, smart city et contrats d'astreinte.",
    features: [
      "Étude complète APS / APD / DOE",
      "Gestion SIG et cartographie géoréférencée",
      "Déploiement multi-sites clé en main",
      "Génie civil et réseaux aériens",
      "Contrat de maintenance longue durée",
      "Interventions zones isolées incluses",
      "Reporting et suivi de projet dédié",
    ],
    cta: "Nous contacter",
    highlight: false,
  },
]

const comparaisonData = [
  { feature: "Étude de faisabilité", starter: false, pro: true, enterprise: true },
  { feature: "Visite technique gratuite", starter: true, pro: true, enterprise: true },
  { feature: "Déploiement réseau", starter: false, pro: false, enterprise: true },
  { feature: "Fibre dédiée", starter: false, pro: true, enterprise: true },
  { feature: "Documentation DOE", starter: false, pro: true, enterprise: true },
  { feature: "Maintenance incluse", starter: false, pro: true, enterprise: true },
  { feature: "Astreinte 7j/7", starter: false, pro: true, enterprise: true },
  { feature: "Zones isolées", starter: false, pro: false, enterprise: true },
]

export default function OffresPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-[oklch(0.13_0.025_250)]">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/70 font-medium mb-6">
              Tarification
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 text-balance">
              Des offres adaptées à chaque projet
            </h1>
            <p className="text-white/60 text-lg leading-relaxed text-pretty">
              Chaque projet fibre est unique. Nos offres s&apos;adaptent à votre situation, de la résidence individuelle au déploiement territorial. Devis gratuit, sans engagement.
            </p>
          </div>
        </section>

        {/* Offers grid */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-2xl p-8 flex flex-col ${
                    offer.highlight
                      ? "bg-[oklch(0.13_0.025_250)] border-2 border-[oklch(0.65_0.13_180/0.5)] shadow-xl shadow-[oklch(0.65_0.13_180/0.15)] relative overflow-hidden"
                      : "bg-white border border-border"
                  }`}
                >
                  {offer.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[oklch(0.65_0.13_180)]" />
                  )}
                  {offer.highlight && (
                    <div className="absolute top-5 right-5 bg-[oklch(0.65_0.13_180)] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recommandé
                    </div>
                  )}

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5 w-fit ${
                    offer.highlight ? "bg-white/10 text-white/80" : "bg-muted text-muted-foreground"
                  }`}>
                    {offer.badge}
                  </div>

                  <h2 className={`font-display text-2xl font-bold mb-2 ${offer.highlight ? "text-white" : "text-foreground"}`}>
                    {offer.name}
                  </h2>
                  <div className={`text-xl font-bold mb-3 ${offer.highlight ? "text-[oklch(0.65_0.13_180)]" : "text-[oklch(0.50_0.13_180)]"}`}>
                    {offer.price}
                  </div>
                  <p className={`text-sm leading-relaxed mb-7 ${offer.highlight ? "text-white/60" : "text-muted-foreground"}`}>
                    {offer.description}
                  </p>

                  <ul className="flex flex-col gap-3 mb-8 flex-1">
                    {offer.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${offer.highlight ? "text-[oklch(0.65_0.13_180)]" : "text-[oklch(0.65_0.13_180)]"}`} />
                        <span className={offer.highlight ? "text-white/80" : "text-foreground/80"}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={offer.id === "enterprise" ? "/contact" : "/devis"}
                    className={`flex items-center justify-center gap-2 py-3.5 rounded-lg font-semibold text-sm transition-colors ${
                      offer.highlight
                        ? "bg-[oklch(0.65_0.13_180)] text-white hover:bg-[oklch(0.58_0.13_180)]"
                        : "border border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    {offer.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                Comparatif des offres
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-muted-foreground">Fonctionnalité</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Raccordement</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-[oklch(0.50_0.13_180)] bg-[oklch(0.65_0.13_180/0.05)]">Entreprise</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-foreground">Territoire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparaisonData.map((row, i) => (
                      <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-muted/30"}>
                        <td className="px-6 py-3.5 text-sm text-foreground">{row.feature}</td>
                        <td className="px-6 py-3.5 text-center">
                          {row.starter ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                        </td>
                        <td className="px-6 py-3.5 text-center bg-[oklch(0.65_0.13_180/0.03)]">
                          {row.pro ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          {row.enterprise ? <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] mx-auto" /> : <span className="text-muted-foreground/30 text-lg">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Info block */}
        <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted/50 border-y border-border">
          <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-bold text-lg text-foreground mb-1">Tarification sur mesure</h3>
              <p className="text-sm text-muted-foreground">
                Chaque projet est étudié individuellement. Contactez-nous pour obtenir un devis personnalisé adapté à votre terrain et vos besoins.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="tel:0694435484"
                className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                Nous appeler
              </a>
              <Link
                href="/devis"
                className="flex items-center gap-2 px-5 py-2.5 bg-[oklch(0.65_0.13_180)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
              >
                Devis gratuit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
