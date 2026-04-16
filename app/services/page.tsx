"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react"
import { Compass, HardHat, Home, Zap, Server, Settings } from "lucide-react"
import * as Icons from "lucide-react"

const ICON_MAP: Record<string, any> = {
  Compass,
  HardHat,
  Home,
  Zap,
  Server,
  Settings,
  Wifi: Icons.Wifi,
  PenTool: Icons.PenTool,
  Wrench: Icons.Wrench,
}

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const response = await fetch(`${API_URL}/api/services-content`)
      if (response.ok) {
        const data = await response.json()
        setServices(data)
      } else {
        setServices(getDefaultServices())
      }
    } catch {
      setServices(getDefaultServices())
    } finally {
      setIsLoading(false)
    }
  }

  const getDefaultServices = () => [
    {
      id: "etudes",
      slug: "etudes",
      number: "01",
      icon: "Compass",
      titleFr: "Études & Ingénierie",
      descFr: "Avant tout déploiement, nous réalisons une analyse complète du terrain, de la réglementation et des contraintes techniques pour garantir la faisabilité du projet.",
      features: ["Études de faisabilité FTTH / FTTO", "Conception de réseaux", "Gestion SIG et cartographie", "Rapports techniques documentés"],
      image: "/images/service-etudes.jpg",
    },
    {
      id: "deploiement",
      slug: "deploiement",
      number: "02",
      icon: "HardHat",
      titleFr: "Déploiement de Réseaux",
      descFr: "Du génie civil au raccordement optique, nos équipes assurent l'intégralité du déploiement avec le matériel adapté aux conditions spécifiques du terrain guyanais.",
      features: ["Génie civil et tranchées", "Réseaux aériens", "Tirage de fibre et soudure", "Installation des boîtiers"],
      image: "/images/service-deploiement.jpg",
    },
    {
      id: "raccordement",
      slug: "raccordement",
      number: "03",
      icon: "Home",
      titleFr: "Raccordement Clients",
      descFr: "Du PBO jusqu'à l'abonné, nous assurons une mise en service soignée, testée et validée avec remise d'un bon de recette signé.",
      features: ["FTTH particuliers", "FTTO entreprises", "Tests et mesures OTDR", "Assistance à la connexion"],
      image: "/images/service-raccordement.jpg",
    },
    {
      id: "maintenance",
      slug: "maintenance",
      number: "04",
      icon: "Zap",
      titleFr: "Maintenance & Dépannage",
      descFr: "La continuité de service est garantie grâce à une maintenance préventive rigoureuse et une capacité d'intervention rapide.",
      features: ["Maintenance préventive", "Localisation de pannes", "Astreinte 7j/7", "Contrats de maintenance"],
      image: "/images/service-maintenance.jpg",
    },
    {
      id: "entreprises",
      slug: "entreprises",
      number: "05",
      icon: "Server",
      titleFr: "Solutions Entreprises",
      descFr: "Nous accompagnons les acteurs publics et privés dans leurs projets d'infrastructure numérique.",
      features: ["Réseaux LAN/WAN", "Aménagement numérique", "Partenariats collectivités", "Accompagnement global"],
      image: "/images/service-entreprises.jpg",
    },
  ]

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </>
    )
  }

  const displayServices = services.length > 0 ? services : getDefaultServices()

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-[oklch(0.13_0.025_250)]">
          <div className="container-wide text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/70 font-medium mb-6">
              Nos prestations
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 text-balance">
              Services fibre optique en Guyane
            </h1>
            <p className="text-white/60 text-lg leading-relaxed text-pretty">
              De l&apos;étude de faisabilité à la maintenance long terme, GUYA FIBRE couvre l&apos;intégralité de la chaîne de valeur des réseaux fibre, avec une expertise unique adaptée au terrain guyanais.
            </p>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide flex flex-col gap-20">
            {displayServices.map((service: any, index: number) => {
              const IconComponent = ICON_MAP[service.icon] || Compass
              const isEven = index % 2 === 1
              return (
                <article
                  key={service.id || service.slug}
                  id={service.slug}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? "lg:flex-row-reverse" : ""}`}
                >
                  <div className={isEven ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex items-center gap-2 bg-[oklch(0.65_0.13_180)] text-white text-xs font-bold px-3 py-1.5 rounded-md">
                        <span>{service.number}</span>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">
                      {service.titleFr || service.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-pretty">
                      {service.descFr || service.description}
                    </p>
                    <ul className="flex flex-col gap-3 mb-7">
                      {(service.features || []).map((f: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.13_180)] shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/devis"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.65_0.13_180)] text-white text-sm font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
                    >
                      Demander un devis
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className={`relative rounded-2xl overflow-hidden h-72 lg:h-96 ${isEven ? "lg:order-1" : ""}`}>
                    <Image
                      src={service.image || "/images/service-default.jpg"}
                      alt={service.titleFr || service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
