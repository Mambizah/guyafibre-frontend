"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"

export type Locale = "fr" | "en" | "es" | "pt" | "nl" | "gcr"

export interface Language {
  code: Locale
  name: string
  nativeName: string
  flag: string
  flagCode: string
  countryCode: string
}

export const languages: Language[] = [
  { code: "fr", name: "French", nativeName: "Français", flag: "fr", flagCode: "FR", countryCode: "+594" },
  { code: "en", name: "English", nativeName: "English", flag: "gb", flagCode: "GB", countryCode: "+44" },
  { code: "es", name: "Spanish", nativeName: "Español", flag: "es", flagCode: "ES", countryCode: "+34" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "br", flagCode: "BR", countryCode: "+55" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "nl", flagCode: "NL", countryCode: "+31" },
  { code: "gcr", name: "Guianese Creole", nativeName: "Kréyòl Gwiyanè", flag: "gf", flagCode: "GF", countryCode: "+594" },
]

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
  currentLanguage: Language
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("guyafibre-locale") as Locale
    if (saved && languages.some(l => l.code === saved)) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("guyafibre-locale", newLocale)
    document.documentElement.lang = newLocale === "gcr" ? "fr" : newLocale
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: unknown = translations[locale]
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k]
    }
    return (value as string) || key
  }

  const currentLanguage = languages.find(l => l.code === locale) || languages[0]

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, currentLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translations
const translations: Record<Locale, Record<string, unknown>> = {
  fr: {
    nav: {
      home: "Accueil",
      about: "À Propos",
      services: "Services",
      offers: "Offres",
      projects: "Réalisations",
      contact: "Contact",
      quote: "Prise de contact",
    },
    hero: {
      badge: "En Guyane française — Intervention sur tout le territoire",
      title: "Connecter la Guyane d'aujourd'hui et de demain",
      subtitle: "Entreprise spécialisée dans le déploiement et la maintenance de réseaux fibre optique — zones urbaines, rurales et sites isolés de l'intérieur guyanais.",
      cta: "Demander un prise de contact",
      ctaSecondary: "Nos services",
    },
    stats: {
      projects: "Projets réalisés",
      clients: "Clients satisfaits",
      availability: "Disponibilité",
      km: "Km de fibre déployée",
    },
    services: {
      title: "Nos Services",
      subtitle: "Des solutions complètes pour tous vos besoins en fibre optique",
      studies: "Études & Ingénierie",
      studiesDesc: "Conception et dimensionnement de réseaux, études de faisabilité, relevés terrain.",
      deployment: "Déploiement",
      deploymentDesc: "Travaux de génie civil, tirage de câbles, pose d'infrastructures optiques.",
      connection: "Raccordement",
      connectionDesc: "Installation FTTH/FTTO, soudure fibre, mise en service client.",
      maintenance: "Maintenance",
      maintenanceDesc: "Dépannage, réflectométrie, intervention rapide 24/7.",
      enterprise: "Solutions Entreprises",
      enterpriseDesc: "Réseaux dédiés, liaisons professionnelles, haute disponibilité.",
    },
    about: {
      badge: "Qui sommes-nous ?",
      title: "Une entreprise guyanaise au cœur",
      titleHighlight: "du terrain",
      description1: "GUYA FIBRE est une entreprise guyanaise spécialisée dans la conception, le déploiement et la maintenance de réseaux fibre optique.",
      description2: "Nos techniciens certifiés maîtrisent les contraintes uniques du terrain guyanais.",
      climate: "Expertise climatique",
      climateDesc: "Maîtrise des contraintes tropicales : humidité, chaleur, UV et végétation dense.",
      terrain: "Zones difficiles",
      terrainDesc: "Interventions en forêt amazonienne, en pirogue sur les fleuves et sur sites isolés.",
      certified: "Personnel certifié",
      certifiedDesc: "Techniciens habilités, formés aux normes fibre optique et sécurité chantier.",
      reactive: "Réactivité locale",
      reactiveDesc: "Équipes basées en Guyane, mobilisables rapidement.",
      global: "Approche globale",
      globalDesc: "Un seul interlocuteur de l'étude jusqu'à la mise en service.",
      freeQuote: "Prise de contact",
      freeQuoteDesc: "Chaque projet est étudié individuellement, sans engagement.",
      founderName: "Shivaro Alasa",
      founderRole: "Dirigeant & Fondateur",
      founderBio: "Passionné de réseaux et de terrain guyanais, Shivaro a fondé GUYA FIBRE avec la mission de connecter chaque coin de la Guyane.",
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Notre équipe est à votre disposition",
      name: "Nom complet",
      email: "Email",
      phone: "Téléphone",
      subject: "Sujet",
      message: "Message",
      send: "Envoyer",
      address: "Adresse",
      hours: "Horaires",
    },
    footer: {
      description: "Expert en déploiement et maintenance de réseaux fibre optique en Guyane française.",
      quickLinks: "Liens rapides",
      legalNotice: "Mentions légales",
      privacy: "Confidentialité",
      rights: "Tous droits réservés",
    },
    common: {
      learnMore: "En savoir plus",
      callUs: "Appelez-nous",
      emailUs: "Écrivez-nous",
      ourLocation: "Notre adresse",
      loading: "Chargement...",
      success: "Succès !",
      error: "Erreur",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      services: "Services",
      offers: "Offers",
      projects: "Projects",
      contact: "Contact",
      quote: "Contact Request",
    },
    hero: {
      badge: "In French Guiana — Operating throughout the territory",
      title: "Connecting French Guiana today and tomorrow",
      subtitle: "Company specializing in the deployment and maintenance of fiber optic networks — urban, rural and remote areas of French Guiana.",
      cta: "Request a contact request",
      ctaSecondary: "Our services",
    },
    stats: {
      projects: "Projects completed",
      clients: "Satisfied clients",
      availability: "Availability",
      km: "Km of fiber deployed",
    },
    services: {
      title: "Our Services",
      subtitle: "Complete solutions for all your fiber optic needs",
      studies: "Studies & Engineering",
      studiesDesc: "Network design and sizing, feasibility studies, field surveys.",
      deployment: "Deployment",
      deploymentDesc: "Civil works, cable pulling, optical infrastructure installation.",
      connection: "Connection",
      connectionDesc: "FTTH/FTTO installation, fiber splicing, customer activation.",
      maintenance: "Maintenance",
      maintenanceDesc: "Troubleshooting, reflectometry, 24/7 rapid response.",
      enterprise: "Enterprise Solutions",
      enterpriseDesc: "Dedicated networks, professional links, high availability.",
    },
    about: {
      badge: "Who are we?",
      title: "A Guianese company at the heart of",
      titleHighlight: "the field",
      description1: "GUYA FIBRE is a Guianese company specializing in the design, deployment and maintenance of fiber optic networks.",
      description2: "Our certified technicians master the unique constraints of Guianese terrain.",
      climate: "Climate expertise",
      climateDesc: "Mastery of tropical constraints: humidity, heat, UV and dense vegetation.",
      terrain: "Difficult areas",
      terrainDesc: "Interventions in the Amazon forest, by pirogue on rivers and remote sites.",
      certified: "Certified staff",
      certifiedDesc: "Authorized technicians, trained in fiber optic standards and site safety.",
      reactive: "Local reactivity",
      reactiveDesc: "Teams based in French Guiana, quickly mobilizable.",
      global: "Global approach",
      globalDesc: "A single contact from study to commissioning.",
      freeQuote: "Free quote",
      freeQuoteDesc: "Each project is studied individually, without commitment.",
      founderName: "Shivaro Alasa",
      founderRole: "Director & Founder",
      founderBio: "Passionate about networks and Guianese terrain, Shivaro founded GUYA FIBRE with the mission of connecting every corner of French Guiana.",
    },
    contact: {
      title: "Contact Us",
      subtitle: "Our team is at your disposal",
      name: "Full name",
      email: "Email",
      phone: "Phone",
      subject: "Subject",
      message: "Message",
      send: "Send",
      address: "Address",
      hours: "Hours",
    },
    footer: {
      description: "Expert in deployment and maintenance of fiber optic networks in French Guiana.",
      quickLinks: "Quick Links",
      legalNotice: "Legal Notice",
      privacy: "Privacy",
      rights: "All rights reserved",
    },
    common: {
      learnMore: "Learn more",
      callUs: "Call us",
      emailUs: "Email us",
      ourLocation: "Our address",
      loading: "Loading...",
      success: "Success!",
      error: "Error",
    },
  },
  es: {
    nav: {
      home: "Inicio",
      about: "Nosotros",
      services: "Servicios",
      offers: "Ofertas",
      projects: "Proyectos",
      contact: "Contacto",
      quote: "Solicitud de contacto",
    },
    hero: {
      badge: "En la Guayana Francesa — Operando en todo el territorio",
      title: "Conectando la Guayana Francesa hoy y mañana",
      subtitle: "Empresa especializada en el despliegue y mantenimiento de redes de fibra óptica — zonas urbanas, rurales y remotas de la Guayana Francesa.",
      cta: "Solicitar contacto",
      ctaSecondary: "Nuestros servicios",
    },
    stats: {
      projects: "Proyectos realizados",
      clients: "Clientes satisfechos",
      availability: "Disponibilidad",
      km: "Km de fibra desplegada",
    },
    services: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones completas para todas sus necesidades de fibra óptica",
      studies: "Estudios e Ingeniería",
      studiesDesc: "Diseño y dimensionamiento de redes, estudios de viabilidad, relevamientos de campo.",
      deployment: "Despliegue",
      deploymentDesc: "Obras civiles, tendido de cables, instalación de infraestructura óptica.",
      connection: "Conexión",
      connectionDesc: "Instalación FTTH/FTTO, empalme de fibra, activación de clientes.",
      maintenance: "Mantenimiento",
      maintenanceDesc: "Solución de problemas, reflectometría, respuesta rápida 24/7.",
      enterprise: "Soluciones Empresariales",
      enterpriseDesc: "Redes dedicadas, enlaces profesionales, alta disponibilidad.",
    },
    about: {
      badge: "¿Quiénes somos?",
      title: "Una empresa guyanesa en el corazón del",
      titleHighlight: "terreno",
      description1: "GUYA FIBRE es una empresa guyanesa especializada en el diseño, despliegue y mantenimiento de redes de fibra óptica.",
      description2: "Nuestros técnicos certificados dominan las limitaciones únicas del terreno guyanés.",
      climate: "Experiencia climática",
      climateDesc: "Dominio de las limitaciones tropicales: humedad, calor, rayos UV y vegetación densa.",
      terrain: "Zonas difíciles",
      terrainDesc: "Intervenciones en el bosque amazónico, en piragua por los ríos y sitios remotos.",
      certified: "Personal certificado",
      certifiedDesc: "Técnicos autorizados, capacitados en normas de fibra óptica y seguridad.",
      reactive: "Reactividad local",
      reactiveDesc: "Equipos basados en la Guayana, rápidamente movilizables.",
      global: "Enfoque global",
      globalDesc: "Un solo contacto desde el estudio hasta la puesta en marcha.",
      freeQuote: "Solicitud de contacto",
      freeQuoteDesc: "Cada proyecto se estudia individualmente, sin compromiso.",
      founderName: "Shivaro Alasa",
      founderRole: "Director y Fundador",
      founderBio: "Apasionado por las redes y el terreno guyanés, Shivaro fundó GUYA FIBRE con la misión de conectar cada rincón de la Guayana.",
    },
    contact: {
      title: "Contáctenos",
      subtitle: "Nuestro equipo está a su disposición",
      name: "Nombre completo",
      email: "Correo electrónico",
      phone: "Teléfono",
      subject: "Asunto",
      message: "Mensaje",
      send: "Enviar",
      address: "Dirección",
      hours: "Horarios",
    },
    footer: {
      description: "Experto en despliegue y mantenimiento de redes de fibra óptica en Guayana Francesa.",
      quickLinks: "Enlaces rápidos",
      legalNotice: "Aviso legal",
      privacy: "Privacidad",
      rights: "Todos los derechos reservados",
    },
    common: {
      learnMore: "Más información",
      callUs: "Llámenos",
      emailUs: "Escríbanos",
      ourLocation: "Nuestra dirección",
      loading: "Cargando...",
      success: "¡Éxito!",
      error: "Error",
    },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      services: "Serviços",
      offers: "Ofertas",
      projects: "Projetos",
      contact: "Contato",
      quote: "Solicitação de contato",
    },
    hero: {
      badge: "Na Guiana Francesa — Atuando em todo o território",
      title: "Conectando a Guiana Francesa hoje e amanhã",
      subtitle: "Empresa especializada na implantação e manutenção de redes de fibra óptica — áreas urbanas, rurais e remotas da Guiana Francesa.",
      cta: "Solicitar contato",
      ctaSecondary: "Nossos serviços",
    },
    stats: {
      projects: "Projetos realizados",
      clients: "Clientes satisfeitos",
      availability: "Disponibilidade",
      km: "Km de fibra implantada",
    },
    services: {
      title: "Nossos Serviços",
      subtitle: "Soluções completas para todas as suas necessidades de fibra óptica",
      studies: "Estudos e Engenharia",
      studiesDesc: "Projeto e dimensionamento de redes, estudos de viabilidade, levantamentos de campo.",
      deployment: "Implantação",
      deploymentDesc: "Obras civis, passagem de cabos, instalação de infraestrutura óptica.",
      connection: "Conexão",
      connectionDesc: "Instalação FTTH/FTTO, fusão de fibra, ativação do cliente.",
      maintenance: "Manutenção",
      maintenanceDesc: "Solução de problemas, reflectometria, resposta rápida 24/7.",
      enterprise: "Soluções Empresariais",
      enterpriseDesc: "Redes dedicadas, links profissionais, alta disponibilidade.",
    },
    about: {
      badge: "Quem somos?",
      title: "Uma empresa guianense no coração do",
      titleHighlight: "campo",
      description1: "GUYA FIBRE é uma empresa guianense especializada no projeto, implantação e manutenção de redes de fibra óptica.",
      description2: "Nossos técnicos certificados dominam as restrições únicas do terreno guianense.",
      climate: "Expertise climática",
      climateDesc: "Domínio das restrições tropicais: umidade, calor, raios UV e vegetação densa.",
      terrain: "Áreas difíceis",
      terrainDesc: "Intervenções na floresta amazônica, de piroga pelos rios e locais remotos.",
      certified: "Equipe certificada",
      certifiedDesc: "Técnicos autorizados, treinados em padrões de fibra óptica e segurança.",
      reactive: "Reatividade local",
      reactiveDesc: "Equipes baseadas na Guiana, rapidamente mobilizáveis.",
      global: "Abordagem global",
      globalDesc: "Um único contato do estudo ao comissionamento.",
      freeQuote: "Solicitação de contato",
      freeQuoteDesc: "Cada projeto é estudado individualmente, sem compromisso.",
      founderName: "Shivaro Alasa",
      founderRole: "Diretor e Fundador",
      founderBio: "Apaixonado por redes e pelo terreno guianense, Shivaro fundou a GUYA FIBRE com a missão de conectar cada canto da Guiana.",
    },
    contact: {
      title: "Contate-nos",
      subtitle: "Nossa equipe está à sua disposição",
      name: "Nome completo",
      email: "E-mail",
      phone: "Telefone",
      subject: "Assunto",
      message: "Mensagem",
      send: "Enviar",
      address: "Endereço",
      hours: "Horários",
    },
    footer: {
      description: "Especialista em implantação e manutenção de redes de fibra óptica na Guiana Francesa.",
      quickLinks: "Links rápidos",
      legalNotice: "Aviso legal",
      privacy: "Privacidade",
      rights: "Todos os direitos reservados",
    },
    common: {
      learnMore: "Saiba mais",
      callUs: "Ligue para nós",
      emailUs: "Escreva para nós",
      ourLocation: "Nosso endereço",
      loading: "Carregando...",
      success: "Sucesso!",
      error: "Erro",
    },
  },
  nl: {
    nav: {
      home: "Home",
      about: "Over ons",
      services: "Diensten",
      offers: "Aanbiedingen",
      projects: "Projecten",
      contact: "Contact",
      quote: "Gratis offerte",
    },
    hero: {
      badge: "In Frans-Guyana — Actief in het hele grondgebied",
      title: "Frans-Guyana vandaag en morgen verbinden",
      subtitle: "Bedrijf gespecialiseerd in de uitrol en onderhoud van glasvezelnetwerken — stedelijke, landelijke en afgelegen gebieden van Frans-Guyana.",
      cta: "Vraag een gratis offerte aan",
      ctaSecondary: "Onze diensten",
    },
    stats: {
      projects: "Voltooide projecten",
      clients: "Tevreden klanten",
      availability: "Beschikbaarheid",
      km: "Km glasvezel uitgerold",
    },
    services: {
      title: "Onze Diensten",
      subtitle: "Complete oplossingen voor al uw glasvezelbehoeften",
      studies: "Studies & Engineering",
      studiesDesc: "Netwerkontwerp en dimensionering, haalbaarheidsstudies, veldonderzoeken.",
      deployment: "Uitrol",
      deploymentDesc: "Civiele werken, kabeltrekken, installatie van optische infrastructuur.",
      connection: "Aansluiting",
      connectionDesc: "FTTH/FTTO installatie, glasvezellassen, klantactivering.",
      maintenance: "Onderhoud",
      maintenanceDesc: "Probleemoplossing, reflectometrie, 24/7 snelle respons.",
      enterprise: "Zakelijke Oplossingen",
      enterpriseDesc: "Dedicated netwerken, professionele verbindingen, hoge beschikbaarheid.",
    },
    about: {
      badge: "Wie zijn wij?",
      title: "Een Guyanese bedrijf in het hart van het",
      titleHighlight: "veld",
      description1: "GUYA FIBRE is een Guyanese bedrijf gespecialiseerd in het ontwerp, de uitrol en het onderhoud van glasvezelnetwerken.",
      description2: "Onze gecertificeerde technici beheersen de unieke beperkingen van het Guyanese terrein.",
      climate: "Klimaat expertise",
      climateDesc: "Beheersing van tropische beperkingen: vochtigheid, hitte, UV en dichte vegetatie.",
      terrain: "Moeilijke gebieden",
      terrainDesc: "Interventies in het Amazone-bos, per pirogue op rivieren en afgelegen locaties.",
      certified: "Gecertificeerd personeel",
      certifiedDesc: "Bevoegde technici, opgeleid in glasvezelnormen en veiligheid.",
      reactive: "Lokale reactiviteit",
      reactiveDesc: "Teams gevestigd in Guyana, snel inzetbaar.",
      global: "Globale aanpak",
      globalDesc: "Eén aanspreekpunt van studie tot inbedrijfstelling.",
      freeQuote: "Gratis offerte",
      freeQuoteDesc: "Elk project wordt individueel bestudeerd, zonder verplichting.",
      founderName: "Shivaro Alasa",
      founderRole: "Directeur & Oprichter",
      founderBio: "Gepassioneerd door netwerken en het Guyanese terrein, richtte Shivaro GUYA FIBRE op met de missie om elke hoek van Guyana te verbinden.",
    },
    contact: {
      title: "Neem contact op",
      subtitle: "Ons team staat voor u klaar",
      name: "Volledige naam",
      email: "E-mail",
      phone: "Telefoon",
      subject: "Onderwerp",
      message: "Bericht",
      send: "Versturen",
      address: "Adres",
      hours: "Openingstijden",
    },
    footer: {
      description: "Expert in uitrol en onderhoud van glasvezelnetwerken in Frans-Guyana.",
      quickLinks: "Snelle links",
      legalNotice: "Juridische kennisgeving",
      privacy: "Privacy",
      rights: "Alle rechten voorbehouden",
    },
    common: {
      learnMore: "Meer informatie",
      callUs: "Bel ons",
      emailUs: "Mail ons",
      ourLocation: "Ons adres",
      loading: "Laden...",
      success: "Succes!",
      error: "Fout",
    },
  },
  gcr: {
    nav: {
      home: "Lakai",
      about: "Kiyès nou yé",
      services: "Sèrvis",
      offers: "Ofri",
      projects: "Travay",
      contact: "Kontakté nou",
      quote: "Devi gratis",
    },
    hero: {
      badge: "An Lagwiyàn fransèz — Nou ka travay toupatou",
      title: "Nou ka konèkté Lagwiyàn jòdi épi dimen",
      subtitle: "Antrepriz spésyalizé dan mété épi antrétyenn rézo fib optik — zonn vil, kanpay épi koté izolé an Lagwiyàn.",
      cta: "Mandé on devi gratis",
      ctaSecondary: "Sèrvis nou",
    },
    stats: {
      projects: "Travay réalizé",
      clients: "Klyan satisfé",
      availability: "Disponibilité",
      km: "Km fib mété",
    },
    services: {
      title: "Sèrvis Nou",
      subtitle: "Solisyon konplé pou tout bézwen fib optik ou",
      studies: "Étid épi Enjènyri",
      studiesDesc: "Konsépsyon rézo, étid fèzabilité, relevé tèren.",
      deployment: "Déplwayman",
      deploymentDesc: "Travay jéni sivil, tiraj kab, poz enfrastrikti optik.",
      connection: "Rakorèman",
      connectionDesc: "Instalasyon FTTH/FTTO, soudaj fib, miz an sèrvis.",
      maintenance: "Antrétyenn",
      maintenanceDesc: "Dépannaj, réfléktométri, entèrvansyon rapid 24/7.",
      enterprise: "Solisyon pou Biznis",
      enterpriseDesc: "Rézo dédyé, lyézon profèsyonèl, disponibilité wo.",
    },
    about: {
      badge: "Kiyès nou yé?",
      title: "On antrepriz lagwiyanèz an kè",
      titleHighlight: "tèren-la",
      description1: "GUYA FIBRE sé on antrepriz lagwiyanèz spésyalizé dan konsépsyon, déplwayman épi antrétyenn rézo fib optik.",
      description2: "Téknisyen sèrtifyé nou ka mètrize kontrent inik tèren lagwiyanè.",
      climate: "Ekspètiz klima",
      climateDesc: "Mètrize kontrent tropikal: imidité, chalè, UV épi végétasyon dans.",
      terrain: "Zonn difisil",
      terrainDesc: "Entèrvansyon an forè amazonyen, an pirog sou larivyè épi koté izolé.",
      certified: "Pèsonèl sèrtifyé",
      certifiedDesc: "Téknisyen abilité, formé pou nom fib optik épi sékirité chantye.",
      reactive: "Réaktivité lokal",
      reactiveDesc: "Lékip bazé an Lagwiyàn, mobilizab vitman.",
      global: "Aproch global",
      globalDesc: "On sèl entèrlokitè dépi létid jiska miz an sèrvis.",
      freeQuote: "Devi gratis",
      freeQuoteDesc: "Chak projé étidyé individyèlman, san angajman.",
      founderName: "Shivaro Alasa",
      founderRole: "Dirijan épi Fondatè",
      founderBio: "Pasyoné rézo épi tèren lagwiyanè, Shivaro fondé GUYA FIBRE pou konèkté chak kwen Lagwiyàn.",
    },
    contact: {
      title: "Kontakté Nou",
      subtitle: "Lékip nou ka réponn ou",
      name: "Non konplé",
      email: "Imèl",
      phone: "Téléfòn",
      subject: "Sijé",
      message: "Mésaj",
      send: "Voyé",
      address: "Adrès",
      hours: "Ouvèti",
    },
    footer: {
      description: "Spésyalis an déplwayman épi antrétyenn rézo fib optik an Lagwiyàn fransèz.",
      quickLinks: "Lyenn rapid",
      legalNotice: "Mansyon légal",
      privacy: "Konfidansyalité",
      rights: "Tout drwa rézèrvé",
    },
    common: {
      learnMore: "Plis enfòmasyon",
      callUs: "Rélé nou",
      emailUs: "Ékri nou",
      ourLocation: "Adrès nou",
      loading: "Ka chajé...",
      success: "Byen fèt!",
      error: "Érrè",
    },
  },
}