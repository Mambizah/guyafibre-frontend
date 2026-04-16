import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Shield, Lock, Eye, Database, Mail, Clock } from "lucide-react"

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 md:px-8 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6">
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Protection des données</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
                Politique de Confidentialité
              </h1>
              <p className="text-muted-foreground text-lg">
                Dernière mise à jour : Janvier 2026
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto space-y-12">
              
              {/* Introduction */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Lock className="w-6 h-6 text-primary" />
                  Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  GUYA FIBRE SAS, société par actions simplifiée au capital de 10 000 euros, 
                  immatriculée au RCS de Cayenne, s&apos;engage à protéger la vie privée des 
                  utilisateurs de son site internet et de ses services. Cette politique de 
                  confidentialité décrit comment nous collectons, utilisons et protégeons vos 
                  données personnelles conformément au Règlement Général sur la Protection 
                  des Données (RGPD).
                </p>
              </div>

              {/* Données collectées */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Database className="w-6 h-6 text-primary" />
                  Données collectées
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Nous collectons les données personnelles suivantes :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Données d&apos;identification</strong> : nom, prénom, adresse email, numéro de téléphone</li>
                    <li><strong>Données professionnelles</strong> : nom de l&apos;entreprise, fonction, adresse postale</li>
                    <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées</li>
                    <li><strong>Données de projet</strong> : descriptions de projets, documents techniques fournis</li>
                  </ul>
                </div>
              </div>

              {/* Finalités */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-primary" />
                  Finalités du traitement
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Vos données sont utilisées pour :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Répondre à vos demandes de devis et de contact</li>
                    <li>Établir et gérer la relation commerciale</li>
                    <li>Améliorer nos services et notre site internet</li>
                    <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
                    <li>Respecter nos obligations légales et réglementaires</li>
                  </ul>
                </div>
              </div>

              {/* Durée de conservation */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  Durée de conservation
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Vos données sont conservées pendant :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Demandes de contact</strong> : 3 ans à compter du dernier contact</li>
                    <li><strong>Données clients</strong> : durée de la relation commerciale + 5 ans</li>
                    <li><strong>Données de navigation</strong> : 13 mois maximum</li>
                    <li><strong>Documents contractuels</strong> : 10 ans (obligation légale)</li>
                  </ul>
                </div>
              </div>

              {/* Droits */}
              <div className="bg-card rounded-2xl border border-border p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary" />
                  Vos droits
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Droit d&apos;accès</strong> : obtenir confirmation du traitement de vos données</li>
                    <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                    <li><strong>Droit à l&apos;effacement</strong> : demander la suppression de vos données</li>
                    <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
                    <li><strong>Droit d&apos;opposition</strong> : vous opposer au traitement de vos données</li>
                    <li><strong>Droit de limitation</strong> : limiter le traitement de vos données</li>
                  </ul>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-8">
                <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <Mail className="w-6 h-6 text-primary" />
                  Contact
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Pour exercer vos droits ou pour toute question relative à la protection 
                    de vos données personnelles, vous pouvez nous contacter :
                  </p>
                  <ul className="space-y-2">
                    <li><strong>Email</strong> : rgpd@guyafibre.com</li>
                    <li><strong>Courrier</strong> : GUYA FIBRE - Service RGPD, Saint-Laurent-du-Maroni, 97320 Guyane française</li>
                    <li><strong>Téléphone</strong> : +594 694 43 54 84</li>
                  </ul>
                  <p className="mt-4">
                    Vous pouvez également introduire une réclamation auprès de la CNIL 
                    (Commission Nationale de l&apos;Informatique et des Libertés) si vous estimez 
                    que vos droits n&apos;ont pas été respectés.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
