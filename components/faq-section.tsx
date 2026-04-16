import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"

const faqs = [
  {
    q: "Quelle est la différence entre FTTH et FTTO ?",
    a: "Le FTTH (Fiber To The Home) désigne le raccordement fibre jusqu'au domicile des particuliers. Le FTTO (Fiber To The Office) est une offre dédiée aux entreprises, avec des garanties de débit et de disponibilité supérieures, une fibre dédiée non mutualisée et une documentation technique complète.",
  },
  {
    q: "Intervenez-vous dans les zones isolées de l'intérieur guyanais ?",
    a: "Oui, c'est l'une de nos spécialités. Nos équipes sont habituées aux interventions en forêt amazonienne, accessibles uniquement par pirogue ou hélicoptère. Nous maîtrisons les contraintes logistiques et climatiques particulières à ces environnements.",
  },
  {
    q: "Quelle est la durée d'une installation fibre ?",
    a: "La durée varie selon la complexité du projet. Pour un raccordement résidentiel simple, comptez une demi-journée à une journée. Pour un déploiement réseau ou un projet d'entreprise, la durée est définie lors de l'étude de faisabilité. Nous respectons les délais contractuels.",
  },
  {
    q: "Proposez-vous un service de maintenance après l'installation ?",
    a: "Absolument. Nous proposons des contrats de maintenance préventive avec inspections périodiques, contrôles OTDR et rapports de visite. Notre astreinte technique 7j/7 garantit une intervention rapide en cas de panne, y compris dans les zones isolées.",
  },
  {
    q: "Comment obtenir un devis gratuit ?",
    a: "Remplissez notre formulaire de demande de devis en ligne, ou contactez-nous par téléphone ou email. Nous étudions chaque projet individuellement et vous proposons une solution adaptée à vos besoins et à votre terrain, sans engagement de votre part.",
  },
  {
    q: "Travaillez-vous avec des opérateurs et des collectivités ?",
    a: "Oui, nous intervenons aussi bien pour des opérateurs télécom que pour des collectivités territoriales et des entreprises privées. Nous réalisons des projets de toutes envergures, des raccordements individuels aux déploiements de plusieurs dizaines de kilomètres.",
  },
]

export function FAQSection() {
  return (
    <section className="section-padding bg-muted dark:bg-secondary">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left — header */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
              Questions fréquentes
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Vos questions, nos réponses
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 text-pretty">
              Vous ne trouvez pas la réponse à votre question ? N&apos;hésitez pas à nous contacter directement.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-card transition-colors"
            >
              Poser une question
            </Link>
          </div>

          {/* Right — accordion */}
          <div>
            <Accordion type="single" collapsible className="flex flex-col gap-2">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border rounded-xl px-5 overflow-hidden data-[state=open]:border-primary/30"
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground text-left py-4 hover:no-underline hover:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
