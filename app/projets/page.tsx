"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { CTABanner } from "@/components/cta-banner"
import { MapPin, Calendar, ArrowRight, Loader2 } from "lucide-react"

export default function ProjetsPage() {
  const [projects, setProjects] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterTag, setFilterTag] = useState("Tous")

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'
      const response = await fetch(`${API_URL}/api/realisations`)
      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || data)
      } else {
        setProjects(getDefaultProjects())
      }
    } catch {
      setProjects(getDefaultProjects())
    } finally {
      setIsLoading(false)
    }
  }

  const getDefaultProjects = () => [
    {
      id: "ftth-cayenne",
      slug: "ftth-cayenne",
      titleFr: "Déploiement FTTH — Cayenne Centre",
      location: "Cayenne",
      date: "2024",
      scope: "1 200 prises raccordées",
      descFr: "Déploiement complet d'un réseau FTTH dans le centre-ville de Cayenne.",
      tags: ["FTTH", "Génie civil", "Soudure", "Urbain"],
      images: ["/images/project-cayenne.jpg"],
      client: "Opérateur national",
    },
    {
      id: "lycee-melkior",
      slug: "lycee-melkior",
      titleFr: "Réseau fibre — Lycée Melkior-Garré",
      location: "Cayenne",
      date: "2024",
      scope: "Câblage inter-bâtiments 10 Gbps",
      descFr: "Installation d'un réseau fibre optique complet reliant les différents bâtiments du lycée.",
      tags: ["FTTO", "Éducation", "Infra réseau", "Câblage"],
      images: ["/images/project-lycee.jpg"],
      client: "Collectivité régionale",
    },
    {
      id: "communes-ouest",
      slug: "communes-ouest",
      titleFr: "Extension réseau — Communes Ouest",
      location: "Saint-Laurent-du-Maroni",
      date: "2023",
      scope: "45 km de fibre aérienne",
      descFr: "Extension du réseau de fibre aérienne sur 45 km reliant plusieurs communes de l'ouest guyanais.",
      tags: ["Aérien", "Zone rurale", "Tirage", "Longue distance"],
      images: ["/images/project-rural.jpg"],
      client: "Opérateur régional",
    },
    {
      id: "maintenance-operateur",
      slug: "maintenance-operateur",
      titleFr: "Contrat de maintenance — Opérateur national",
      location: "Toute la Guyane",
      date: "2023 — présent",
      scope: "Astreinte 24/7 sur tout le territoire",
      descFr: "Contrat d'astreinte et de maintenance préventive pour un réseau fibre couvrant l'ensemble du territoire.",
      tags: ["Maintenance", "OTDR", "Urgence", "7j/7"],
      images: ["/images/project-maintenance.jpg"],
      client: "Opérateur national",
    },
  ]

  const allTags = ["Tous", ...new Set(projects.flatMap((p) => p.tags || []))]

  const filteredProjects = filterTag === "Tous"
    ? projects
    : projects.filter((p) => (p.tags || []).includes(filterTag))

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

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : getDefaultProjects()

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 px-4 md:px-8 lg:px-16 bg-[oklch(0.13_0.025_250)]">
          <div className="container-wide">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-sm text-white/70 font-medium mb-6">
                Portfolio
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-5 text-balance">
                Nos réalisations en Guyane
              </h1>
              <p className="text-white/60 text-lg leading-relaxed text-pretty">
                De Cayenne aux villages les plus isolés, découvrez les projets fibre que nous avons réalisés.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {[
                { value: "150+", label: "Projets réalisés" },
                { value: "45 km", label: "Fibre aérienne" },
                { value: "1200+", label: "Prises raccordées" },
                { value: "7j/7", label: "Astreinte active" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="font-display text-2xl font-bold text-[oklch(0.65_0.13_180)] mb-1">{stat.value}</div>
                  <div className="text-xs text-white/50">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding bg-background">
          <div className="container-wide">
            <div className="flex flex-wrap gap-2 mb-10">
              <span className="text-xs font-semibold text-muted-foreground mr-2 self-center">Filtrer :</span>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilterTag(tag)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                    filterTag === tag
                      ? "bg-[oklch(0.65_0.13_180)] text-white"
                      : "bg-muted text-muted-foreground hover:bg-[oklch(0.65_0.13_180/0.1)] hover:text-[oklch(0.45_0.13_180)]"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayProjects.map((project: any) => (
                <article
                  key={project.id || project.slug}
                  className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-black/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={project.images?.[0] || "/images/project-default.jpg"}
                      alt={project.titleFr || project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {(project.tags || []).slice(0, 3).map((tag: string) => (
                        <span key={tag} className="text-[10px] font-semibold bg-black/50 backdrop-blur-sm text-white px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[oklch(0.65_0.13_180)]" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[oklch(0.65_0.13_180)]" />
                        {project.date}
                      </span>
                      {project.client && (
                        <span className="ml-auto text-[oklch(0.50_0.13_180)] font-medium">{project.client}</span>
                      )}
                    </div>

                    <h2 className="font-display text-xl font-bold text-foreground mb-2">
                      {project.titleFr || project.title}
                    </h2>

                    <div className="text-sm font-semibold text-[oklch(0.50_0.13_180)] mb-3">{project.scope}</div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.descFr || project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 lg:px-16 bg-muted/50 border-y border-border">
          <div className="container-wide text-center max-w-xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-foreground mb-3 text-balance">
              Votre projet sera notre prochaine réalisation
            </h2>
            <p className="text-muted-foreground mb-6 text-pretty">
              Que ce soit en zone urbaine ou dans les sites les plus isolés, nous avons l&apos;expertise pour connecter votre infrastructure.
            </p>
            <Link
              href="/devis"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[oklch(0.65_0.13_180)] text-white font-semibold rounded-lg hover:bg-[oklch(0.58_0.13_180)] transition-colors"
            >
              Démarrer mon projet
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        <CTABanner />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
