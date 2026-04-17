'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/i18n/context'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()

  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/apropos', label: t('nav.about') },
    {
      href: '/services',
      label: t('nav.services'),
      children: [
        { href: '/services#etudes', label: t('services.studies') },
        { href: '/services#deploiement', label: t('services.deployment') },
        { href: '/services#raccordement', label: t('services.connection') },
        { href: '/services#maintenance', label: t('services.maintenance') },
        { href: '/services#entreprises', label: t('services.enterprise') },
      ],
    },
    { href: '/offres', label: t('nav.offers') },
    { href: '/projets', label: t('nav.projects') },
    { href: '/contact', label: t('nav.contact') },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border'
          : 'bg-background/80 backdrop-blur-sm'
      )}
    >
      <div className="container-wide flex items-center justify-between h-16 md:h-20 px-4 md:px-8 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            {/* Logo - always visible, no filter needed since logo has dark text on light bg */}
            <Image
              src="/images/logo.jpg"
              alt="GUYA FIBRE"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="flex items-center gap-1 px-3 py-2 text-foreground hover:text-primary transition-colors">
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div className="absolute left-0 top-full hidden group-hover:block bg-card border border-border rounded-lg shadow-lg min-w-48 overflow-hidden">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 text-foreground transition-colors',
                  pathname === link.href
                    ? 'text-primary font-semibold'
                    : 'hover:text-primary'
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/devis"
            className="px-5 py-2.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
          >
            Prise de contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Menu mobile"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-background border-t border-border">
          <nav className="flex flex-col px-4 py-4 space-y-2">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href} className="space-y-2">
                  <button className="w-full text-left px-3 py-2 text-foreground font-medium hover:text-primary transition-colors">
                    {link.label}
                  </button>
                  <div className="pl-4 space-y-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'block px-3 py-2 text-foreground transition-colors rounded',
                    pathname === link.href
                      ? 'text-primary font-semibold bg-primary/10'
                      : 'hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="mt-4 pt-4 border-t border-border flex flex-col gap-3 px-4 pb-4">
            <div className="flex items-center justify-between">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <Link
              href="/devis"
              className="w-full py-3 bg-primary text-primary-foreground text-sm font-semibold rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              Prise de contact
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}