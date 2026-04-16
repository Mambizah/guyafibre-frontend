import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"

export default function MentionsLegalesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen brand-dark-bg pt-32 pb-20">
        <div className="container-wide px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-8">
              Mentions Légales
            </h1>

            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  1. Informations légales
                </h2>
                <div className="bg-[oklch(0.18_0.025_250)] rounded-lg p-6 border border-[oklch(0.25_0.025_250)]">
                  <p className="text-gray-300 mb-3"><strong className="text-white">Raison sociale :</strong> GUYA FIBRE SARL</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">Siège social :</strong> 12 Rue des Palmiers, 97320 Saint-Laurent-du-Maroni, Guyane française</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">SIRET :</strong> 123 456 789 00012</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">Capital social :</strong> 10 000 EUR</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">Téléphone :</strong> +594 6 94 00 00 00</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">Email :</strong> contact@guyafibre.com</p>
                  <p className="text-gray-300"><strong className="text-white">Directeur de publication :</strong> [Nom du directeur]</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  2. Hébergement
                </h2>
                <div className="bg-[oklch(0.18_0.025_250)] rounded-lg p-6 border border-[oklch(0.25_0.025_250)]">
                  <p className="text-gray-300 mb-3"><strong className="text-white">Hébergeur :</strong> Vercel Inc.</p>
                  <p className="text-gray-300 mb-3"><strong className="text-white">Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</p>
                  <p className="text-gray-300"><strong className="text-white">Site web :</strong> https://vercel.com</p>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  3. Propriété intellectuelle
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, graphismes) 
                  est la propriété exclusive de GUYA FIBRE ou de ses partenaires et est protégé 
                  par les lois françaises et internationales relatives à la propriété intellectuelle.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Toute reproduction, représentation, modification, publication, transmission, 
                  dénaturation, totale ou partielle du site ou de son contenu, par quelque 
                  procédé que ce soit, et sur quelque support que ce soit est interdite sans 
                  autorisation préalable écrite de GUYA FIBRE.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  4. Protection des données personnelles
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Conformément au Règlement Général sur la Protection des Données (RGPD) et à 
                  la loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de 
                  rectification, de suppression et d&apos;opposition aux données personnelles vous concernant.
                </p>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Les données collectées via les formulaires de contact et de demande de devis 
                  sont uniquement utilisées pour traiter vos demandes et ne sont jamais transmises 
                  à des tiers sans votre consentement.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Pour exercer vos droits, contactez-nous à : <a href="mailto:rgpd@guyafibre.com" className="text-[oklch(0.65_0.13_180)] hover:underline">rgpd@guyafibre.com</a>
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  5. Cookies
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  Ce site utilise des cookies pour améliorer l&apos;expérience utilisateur et 
                  analyser le trafic. En continuant à naviguer sur ce site, vous acceptez 
                  l&apos;utilisation de cookies conformément à notre politique de confidentialité.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Vous pouvez configurer votre navigateur pour refuser les cookies, mais 
                  certaines fonctionnalités du site pourraient ne plus être disponibles.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  6. Responsabilité
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  GUYA FIBRE s&apos;efforce de fournir des informations exactes et à jour sur ce site. 
                  Toutefois, nous ne pouvons garantir l&apos;exactitude, la complétude ou l&apos;actualité 
                  des informations diffusées.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  GUYA FIBRE décline toute responsabilité pour tout dommage direct ou indirect 
                  résultant de l&apos;utilisation de ce site ou de l&apos;impossibilité d&apos;y accéder.
                </p>
              </section>

              <section>
                <h2 className="font-display text-2xl font-semibold text-white mb-4 border-b border-[oklch(0.25_0.025_250)] pb-2">
                  7. Droit applicable
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  Les présentes mentions légales sont régies par le droit français. 
                  En cas de litige, et après échec de toute tentative de recherche d&apos;une 
                  solution amiable, les tribunaux français seront seuls compétents.
                </p>
              </section>

              <p className="text-gray-500 text-sm mt-12 pt-6 border-t border-[oklch(0.25_0.025_250)]">
                Dernière mise à jour : Janvier 2024
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
