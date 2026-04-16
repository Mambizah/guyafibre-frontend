import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"

export function CTABanner() {
  return (
    <section
      className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden"
      style={{
        background: "oklch(0.13 0.025 250)",
        backgroundImage: "url('/images/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[oklch(0.13_0.025_250/0.88)]" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, oklch(0.65 0.13 180 / 0.4), transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 container-wide text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
          Besoin d&apos;un réseau fibre{" "}
          <span className="text-primary">fiable et performant</span> ?
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto text-pretty">
          Nos experts vous proposent une solution adaptée à votre terrain et votre budget. Devis gratuit et sans engagement.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/devis"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
          >
            Demander un devis gratuit
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="tel:0694435484"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200"
          >
            <Phone className="w-5 h-5" />
            06 94 43 54 84
          </a>
        </div>
      </div>
    </section>
  )
}
