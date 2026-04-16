"use client"

import Link from "next/link"
import Image from "next/image"
import { Phone, Mail, MapPin, ExternalLink } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function Footer() {
  const { t } = useLanguage()

  const services = [
    { href: "/services#etudes", labelKey: "services.studies" },
    { href: "/services#deploiement", labelKey: "services.deployment" },
    { href: "/services#raccordement", labelKey: "services.connection" },
    { href: "/services#maintenance", labelKey: "services.maintenance" },
    { href: "/services#entreprises", labelKey: "services.enterprise" },
  ]

  const legal = [
    { href: "/", labelKey: "nav.home" },
    { href: "/apropos", labelKey: "nav.about" },
    { href: "/mentions-legales", labelKey: "footer.legalNotice" },
    { href: "/politique-confidentialite", labelKey: "footer.privacy" },
  ]

  return (
    <footer className="bg-secondary dark:bg-card text-foreground border-t border-border">
      <div className="container-wide px-4 md:px-8 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Column 1 — Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo.jpg"
                alt="GUYA FIBRE"
                width={160}
                height={56}
                className="h-12 w-auto object-contain dark:brightness-100 brightness-0"
              />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Column 2 — Services */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("nav.services")}
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(s.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Liens */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-3">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t(l.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-5 font-display">
              {t("nav.contact")}
            </h3>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="tel:+594694435484"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground block">Guyane (+594)</span>
                    <span className="font-medium text-foreground">06 94 43 54 84</span>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@guyafibre.com"
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <span>contact@guyafibre.com</span>
                </a>
              </li>
              <li>
                <Link
                  href="/localisation"
                  className="flex items-start gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="block text-foreground">Saint-Laurent-du-Maroni</span>
                    <span className="text-xs text-muted-foreground">Guyane française</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Animated Logo Banner */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="relative overflow-hidden rounded-xl border border-primary/30 bg-gradient-to-r from-muted via-card to-muted p-6">
            {/* Animated glow effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -inset-[100%] animate-[spin_8s_linear_infinite] bg-gradient-conic from-primary/20 via-transparent to-primary/20" />
            </div>
            <div className="absolute inset-[1px] rounded-xl bg-card" />
            
            {/* Content */}
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="absolute -inset-2 bg-primary/20 rounded-xl blur-xl animate-pulse" />
                  <Image
                    src="/images/logo.jpg"
                    alt="GUYA FIBRE"
                    width={180}
                    height={64}
                    className="relative h-14 w-auto object-contain dark:brightness-100 brightness-0"
                  />
                </div>
                <div className="hidden md:block h-12 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
                <div className="text-center md:text-left">
                  <p className="text-lg font-display font-bold text-foreground">
                    Experts Fibre Optique
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Guyane Française depuis 2018
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <a
                  href="tel:+594694435484"
                  className="flex items-center gap-3 px-5 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
                >
                  <Phone className="w-4 h-4" />
                  <span className="hidden sm:inline">+594 694 43 54 84</span>
                  <span className="sm:hidden">{t("common.callUs")}</span>
                </a>
                <Link
                  href="/devis"
                  className="flex items-center gap-2 px-5 py-3 rounded-lg border border-primary text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
                >
                  {t("nav.quote")}
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Fiber decoration line */}
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <p className="text-sm text-muted-foreground text-center md:mx-8">
            &copy; 2026 GUYA FIBRE — SAS. {t("footer.rights")}.
          </p>
          <div className="hidden md:block h-px flex-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
        </div>
      </div>
    </footer>
  )
}
