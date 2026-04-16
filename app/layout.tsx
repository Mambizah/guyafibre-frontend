import type { Metadata } from 'next'
import { Space_Grotesk, Plus_Jakarta_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/lib/i18n/context'
import { ThemeCustomProvider } from '@/lib/theme-custom'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GUYA FIBRE — Experts Fibre Optique en Guyane',
  description: 'Entreprise guyanaise spécialisée dans le déploiement, la maintenance et les études de réseaux fibre optique. Intervention sur toute la Guyane — zones urbaines, rurales et isolées.',
  keywords: 'fibre optique, FTTH, FTTO, Guyane, déploiement fibre, maintenance réseau, Saint-Laurent-du-Maroni',
  openGraph: {
    title: 'GUYA FIBRE — Experts Fibre Optique en Guyane',
    description: 'Déploiement et maintenance de réseaux fibre optique sur tout le territoire guyanais.',
    type: 'website',
    locale: 'fr_FR',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeCustomProvider>
            <LanguageProvider>
              {children}
            </LanguageProvider>
          </ThemeCustomProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <Toaster />
      </body>
    </html>
  )
}
