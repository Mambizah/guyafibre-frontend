import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { Leaf, Map, ShieldCheck, Zap, Users, Gift, CheckCircle2 } from "lucide-react"

export const metadata: Metadata = {
  title: "À Propos — GUYA FIBRE",
  description: "Découvrez l'histoire et les valeurs de GUYA FIBRE, entreprise guyanaise spécialisée dans la fibre optique fondée par Shivaro Alasa.",
}

const strengths = [
  {
    icon: Leaf,
    title: "Expertise climatique tropicale",
    description: "Nos techniciens connaissent parfaitement les contraintes du milieu tropical guyanais : humidité élevée, chaleur intense, rayonnements UV et végétation qui reprend vite ses droits. Nos installations sont conçues pour durer dans ces conditions.",
  },
  {
    icon: Map,
    title: "Interventions en zones difficiles",
    description: "L'intérieur de la Guyane est accessible uniquement par pirogue ou par voie aérienne. Notre équipe maîtrise la logistique et les contraintes de ces interventions exceptionnelles, avec le matériel adapté transporté sur plusieurs jours si nécessaire.",
  },
  {
    icon: ShieldCheck,
    title: "Personnel certifié",
    description: "Tous nos techniciens sont habilités et régulièrement formés aux normes fibre optique, aux procédures de soudure laser et aux règles de sécurité sur chantier. Nos certifications garantissent la qualité et la conformité de chaque installation.",
  },
  {
    icon: Zap,
    title: "Réactivité locale",
    description: "Contrairement aux prestataires basés en métropole, nos équipes sont déjà sur place en Guyane. Nous pouvons intervenir rapidement, sans délais de déplacement intercontinental, ce qui est crucial en cas de panne ou d'urgence.",
  },
  {
    icon: Users,
    title: "Approche globale",
    description: "Nous sommes votre interlocuteur unique de la phase d'étude jusqu'à la mise en service et au suivi de maintenance. Pas de sous-traitance, pas de morcellement des responsabilités : une seule équipe, une seule référence.",
  },
  {
    icon: Gift,
    title: "Devis gratuit et personnalisé",
    description: "Chaque projet fibre est différent. Nous étudions votre situation spécifique — type de terrain, distance, volume, contraintes réglementaires — et vous proposons un devis sur mesure, sans engagement de votre part.",
  },
]

const timeline = [
  { year: "2023", title: "Fondation de GUYA FIBRE", desc: "Création de l'entreprise à Saint-Laurent-du-Maroni par Shivaro Alasa, avec une première équipe de techniciens certifiés." },
  { year: "2023", title: "Premiers déploiements", desc: "Réalisation des premiers chantiers de déploiement FTTH sur les communes de l'ouest guyanais." },
  { year: "2024", title: "Extension vers Cayenne", desc: "Développement de notre présence dans la capitale et signature de contrats avec des opérateurs nationaux." },
  { year: "2024", title: "Interventions en zones isolées", desc: "Connexion de premiers villages amérindiens de l'intérieur, accessibles uniquement par pirogue." },
  { year: "2025", title: "150+ installations réalisées", desc: "Franchissement du cap des 150 installations complètes et 98% de satisfaction client." },
  { year: "2026", title: "Développement continu", desc: "Poursuite du déploiement territorial et développement de nouvelles offres pour collectivités et opérateurs." },
]

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Page Hero */}
        <section className="pt-32 pb-20 px-4 md:px-8 lg:px-16 bg-[oklch(0.13_0.025_250)]">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/70 font-medium mb-6">
                  À propos
                </div>
                <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                  Connecter la Guyane,{" "}
                  <span className="text-[oklch(0.65_0.13_180)]">un fibre à la fois</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed mb-6 text-pretty">
                  GUYA FIBRE est une entreprise guyanaise spécialisée dans la conception, le déploiement et la maintenance de réseaux fibre optique sur l&apos;ensemble du territoire de la Guyane française.
                </p>
                <p className="text-white/60 leading-relaxed text-pretty">
                  Fondée en 2023 par Shivaro Alasa, notre entreprise s&apos;est donné une mission : apporter une connectivité fibre de qualité à chaque Guyanais, qu&apos;il habite en centre-ville ou dans un village isolé accessible uniquement par pirogue.
                </p>
              </div>
              <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                <Image
                  src="/images/hero-bg.jpg"
                  alt="Technicien GUYA FIBRE en intervention"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.13_0.025_250/0.4)] to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[oklch(0.65_0.13_180/0.1)] rounded-full text-sm text-[oklch(0.50_0.13_180)] font-medium mb-5 border border-[oklch(0.65_0.13_180/0.2)]">
                  Notre mission
                </div>
                <h2 className="font-display text-3xl font-bold text-foreground mb-5 text-balance">
                  Un seul interlocuteur, de l&apos;étude à la maintenance
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-5 text-pretty">
                  GUYA FIBRE est convaincu que la qualité d&apos;un déploiement fibre tient autant à la maîtrise technique qu&apos;à la connaissance du terrain local. C&apos;est pourquoi nous avons constitué une équipe entièrement basée en Guyane, formée aux spécificités de l&apos;environnement tropical et des zones difficiles d&apos;accès.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
                  Notre approche globale signifie que vous avez un seul point de contact pour l&apos;intégralité de votre projet : étude de faisabilité, plans, travaux, raccordement, tests et maintenance. Cette cohérence garantit la qualité et simplifie la gestion de votre projet.
                </p>
                <ul className="flex flex-col gap-3">
                  {["Intervention sur tout le territoire guyanais", "Expertise unique des terrains tropicaux difficiles", "Techniciens certifiés et régulièrement formés", "Devis gratuit, sans engagement"].map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-foreground/80">
                      <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Founder */}
              <div className="bg-[oklch(0.13_0.025_250)] rounded-2xl p-8 text-white">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-full bg-[oklch(0.65_0.13_180)] flex items-center justify-center text-white font-bold font-display text-xl shrink-0">
                    SA
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold text-white">Shivaro Alasa</div>
                    <div className="text-[oklch(0.65_0.13_180)] text-sm font-medium mb-2">Dirigeant & Fondateur</div>
                    <div className="text-white/50 text-xs">GUYA FIBRE · Saint-Laurent-du-Maroni</div>
                  </div>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  Ingénieur réseaux passionné par le territoire guyanais, Shivaro a fondé GUYA FIBRE avec une conviction forte : la Guyane mérite une infrastructure numérique à la hauteur de ses ambitions, des centres-villes aux villages les plus reculés.
                </p>
                <p className="text-white/60 text-sm leading-relaxed">
                  Sa connaissance approfondie du terrain local et son expertise technique lui permettent de proposer des solutions adaptées aux contraintes uniques de chaque projet guyanais.
                </p>
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-balance">
                Pourquoi choisir GUYA FIBRE ?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {strengths.map((s) => {
                  const Icon = s.icon
                  return (
                    <div key={s.title} className="p-6 bg-white rounded-xl border border-border hover:border-[oklch(0.65_0.13_180/0.3)] hover:shadow-md transition-all duration-200 group">
                      <div className="w-11 h-11 rounded-lg bg-[oklch(0.65_0.13_180/0.1)] flex items-center justify-center mb-4 group-hover:bg-[oklch(0.65_0.13_180/0.15)] transition-colors">
                        <Icon className="w-5 h-5 text-[oklch(0.50_0.13_180)]" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-padding bg-[oklch(0.13_0.025_250)]">
          <div className="container-wide">
            <div className="text-center max-w-xl mx-auto mb-14">
              <h2 className="font-display text-3xl font-bold text-white mb-4 text-balance">
                Notre parcours
              </h2>
              <p className="text-white/60 leading-relaxed text-pretty">
                Depuis notre fondation en 2023, nous n&apos;avons cessé de croître et d&apos;étendre notre présence sur tout le territoire guyanais.
              </p>
            </div>
            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-[88px] top-0 bottom-0 w-px bg-[oklch(0.65_0.13_180/0.25)] hidden md:block" aria-hidden="true" />
              <div className="flex flex-col gap-8">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-8 items-start">
                    <div className="w-20 shrink-0 text-right hidden md:block">
                      <span className="text-sm font-bold text-[oklch(0.65_0.13_180)] font-display">{item.year}</span>
                    </div>
                    <div className="hidden md:flex items-start pt-1">
                      <div className="w-3 h-3 rounded-full bg-[oklch(0.65_0.13_180)] border-2 border-[oklch(0.13_0.025_250)] relative z-10 mt-0.5" />
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="md:hidden text-xs font-bold text-[oklch(0.65_0.13_180)] mb-1">{item.year}</div>
                      <h3 className="font-display font-semibold text-white mb-1.5">{item.title}</h3>
                      <p className="text-sm text-white/50 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
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
