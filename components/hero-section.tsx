"use client"

import Link from "next/link"
import { MapPin, ArrowRight, ChevronDown } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Section d'accueil"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        role="img"
        aria-label="Technicien fibre optique en intervention en Guyane"
      />
      {/* Dark overlays */}
      <div className="absolute inset-0 bg-[oklch(0.13_0.025_250/0.78)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.13_0.025_250/0.6)] via-transparent to-transparent" />

      {/* Animated fiber lines decoration */}
      <svg
        className="absolute right-0 top-0 h-full w-1/2 opacity-10 pointer-events-none hidden lg:block"
        viewBox="0 0 600 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <path
            key={i}
            d={`M${600 - i * 30} 0 Q${400 - i * 20} 400 ${500 - i * 25} 800`}
            stroke="oklch(0.65 0.13 180)"
            strokeWidth="1"
            fill="none"
            style={{ opacity: 1 - i * 0.06 }}
          />
        ))}
      </svg>

      {/* Content */}
      <div className="relative z-10 container-wide px-4 md:px-8 lg:px-16 py-32 pt-40">
        <div className="max-w-3xl">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-sm text-white/80 mb-8">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{t("hero.badge")}</span>
          </div>

          {/* Main title */}
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl text-pretty">
            {t("hero.subtitle")}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/devis"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 text-base"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/50 transition-all duration-200 text-base"
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-white/50">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              150+ {t("stats.projects").toLowerCase()}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              98% {t("stats.clients").toLowerCase()}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {t("common.learnMore")}
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#stats"
        aria-label="Défiler vers le bas"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 hover:text-white/70 transition-colors"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </a>
    </section>
  )
}
