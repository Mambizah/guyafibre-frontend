import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    initials: "MJ",
    name: "Marie-Josèphe L.",
    role: "Directrice d'école",
    company: "Maripasoula",
    rating: 5,
    quote:
      "L'équipe GUYA FIBRE a connecté notre école en arrivant par pirogue. Un travail rapide, propre et professionnel malgré les conditions d'accès difficiles. Nos élèves ont maintenant une connexion fiable pour leurs cours.",
  },
  {
    initials: "KR",
    name: "Kevin R.",
    role: "Gérant PME",
    company: "Kourou",
    rating: 5,
    quote:
      "Liaison FTTO ultra-stable pour nos bureaux. L'équipe a su s'adapter à notre bâtiment ancien et tout a été installé dans les délais. La réactivité locale est un vrai avantage par rapport aux prestataires métropole.",
  },
  {
    initials: "CT",
    name: "Collectivité Territoriale",
    role: "Commune de Mana",
    company: "Guyane",
    rating: 5,
    quote:
      "Partenaire fiable sur l'ensemble du projet d'infrastructure communale. Respect des délais contractuels, documentation technique impeccable et suivi post-installation exemplaire. Nous recommandons GUYA FIBRE.",
  },
]

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
            Avis clients
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Ce que disent nos clients
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed text-pretty">
            Des particuliers, entreprises et collectivités de toute la Guyane nous font confiance.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-card rounded-2xl border border-border p-7 flex flex-col gap-5 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-primary/5 transition-all duration-200"
            >
              <Quote className="w-8 h-8 text-primary/40" aria-hidden="true" />

              <blockquote className="text-sm text-foreground/80 leading-relaxed flex-1 text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-display text-sm shrink-0">
                  {t.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {t.role} — {t.company}
                  </div>
                </div>
                <div className="flex gap-0.5" role="img" aria-label={`${t.rating} étoiles sur 5`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                  ))}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
