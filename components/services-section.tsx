"use client"

import Image from "next/image"
import Link from "next/link"
import { Compass, HardHat, Home, Zap, Server, CheckCircle2, ArrowRight } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

const services = [
  {
    id: "etudes",
    number: "01",
    icon: Compass,
    titleKey: "services.studies",
    descKey: "services.studiesDesc",
    features: ["Études de faisabilité FTTH / FTTO", "Conception et plans APS / APD / DOE", "Cartographie SIG géoréférencée", "Dossiers réglementaires DT / DICT"],
    image: "/images/service-etudes.jpg",
    benefit: "Conception optimisée",
  },
  {
    id: "deploiement",
    number: "02",
    icon: HardHat,
    titleKey: "services.deployment",
    descKey: "services.deploymentDesc",
    features: ["Génie civil : tranchées, fourreaux, chambres", "Réseaux aériens sur poteaux", "Tirage de fibre et soudure par fusion", "Installation PBO / BPE / PM"],
    image: "/images/service-deploiement.jpg",
    benefit: "Infrastructure durable",
  },
  {
    id: "raccordement",
    number: "03",
    icon: Home,
    titleKey: "services.connection",
    descKey: "services.connectionDesc",
    features: ["FTTH particuliers : PTO, ONT, mise en service", "FTTO entreprises : fibre dédiée", "Tests et mesures OTDR", "Validation finale et bon de recette"],
    image: "/images/service-raccordement.jpg",
    benefit: "Mise en service rapide",
  },
  {
    id: "maintenance",
    number: "04",
    icon: Zap,
    titleKey: "services.maintenance",
    descKey: "services.maintenanceDesc",
    features: ["Inspections périodiques et contrôles OTDR", "Localisation de pannes par réflectométrie", "Diagnostic des équipements actifs", "Interventions d'urgence 7j/7"],
    image: "/images/service-maintenance.jpg",
    benefit: "Disponibilité garantie",
  },
  {
    id: "entreprises",
    number: "05",
    icon: Server,
    titleKey: "services.enterprise",
    descKey: "services.enterpriseDesc",
    features: ["Réseaux d'infrastructure interne", "Smart city et projets territoriaux", "Infrastructures publiques", "Accompagnement sur mesure"],
    image: "/images/service-entreprises.jpg",
    benefit: "Sur mesure",
  },
]

export function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
            {t("nav.services")}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            {t("services.title")}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.id}
                id={service.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {/* Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-2.5 py-1 rounded-md">
                      <span>{service.number}</span>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">{t(service.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{t(service.descKey)}</p>

                  <ul className="flex flex-col gap-2 mb-5 flex-1">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Benefit badge */}
                  <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                    <span className="text-xs text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {service.benefit}
                    </span>
                    <Link
                      href="/devis"
                      className="flex items-center gap-1 text-xs font-semibold text-primary hover:gap-2 transition-all"
                    >
                      {t("nav.quote")} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}

          {/* CTA card */}
          <div className="bg-secondary dark:bg-card rounded-2xl p-8 flex flex-col items-start justify-between border border-border">
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3 text-balance">
                Un projet fibre en Guyane ?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("contact.subtitle")}
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <Link
                href="/devis"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                {t("nav.quote")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-colors"
              >
                {t("common.learnMore")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
