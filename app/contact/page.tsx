"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  MessageCircle,
  CheckCircle2,
  Navigation,
  Car,
  Plane
} from "lucide-react"
import { toast } from "sonner"
import { contactApi, CreateContactRequest } from "@/lib/api/contact.api"

const contactInfo = [
  {
    icon: MapPin,
    title: "Adresse",
    content: "12 Rue des Palmiers",
    subcontent: "97320 Saint-Laurent-du-Maroni, Guyane française",
  },
  {
    icon: Phone,
    title: "Téléphone",
    content: "+594 6 94 00 00 00",
    subcontent: "Lun-Ven: 8h-18h | Sam: 8h-12h",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@guyafibre.com",
    subcontent: "Réponse sous 24h",
  },
  {
    icon: Clock,
    title: "Horaires",
    content: "Lundi - Vendredi: 8h - 18h",
    subcontent: "Samedi: 8h - 12h",
  },
]

const directions = [
  {
    icon: Car,
    title: "En voiture",
    description: "Depuis Cayenne, prendre la RN1 direction Saint-Laurent. À l'entrée de la ville, tourner à droite après le rond-point du port. Notre local se trouve à 200m sur la gauche.",
    time: "2h30 depuis Cayenne",
  },
  {
    icon: Plane,
    title: "En avion",
    description: "Atterrissage à l'aéroport de Saint-Laurent-du-Maroni. Nous sommes à 10 minutes en voiture du centre-ville. Service de navette disponible sur demande.",
    time: "45min depuis Cayenne",
  },
  {
    icon: Navigation,
    title: "Coordonnées GPS",
    description: "Latitude: 5.5026° N, Longitude: 54.0333° W. Entrez ces coordonnées dans votre GPS pour un guidage précis.",
    time: "Navigation GPS",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const submitData: CreateContactRequest = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        subject: formData.subject,
        message: formData.message,
      }
      
      await contactApi.create(submitData)
      setIsSubmitted(true)
    } catch (error: any) {
      const message = error.response?.data?.message || "Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer."
      toast.error(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen brand-dark-bg">
        {/* Header */}
        <section className="pt-32 pb-16 px-4 md:px-8">
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[oklch(0.65_0.13_180)]/10 border border-[oklch(0.65_0.13_180)]/30 mb-6">
                <MessageCircle className="w-4 h-4 text-[oklch(0.65_0.13_180)]" />
                <span className="text-[oklch(0.65_0.13_180)] text-sm font-medium">Contactez-nous</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 text-balance">
                Une question ? Parlons-en !
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed">
                Notre équipe est disponible pour répondre à toutes vos questions 
                et vous accompagner dans vos projets fibre optique.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="pb-12 px-4 md:px-8">
          <div className="container-wide">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-[oklch(0.18_0.025_250)] border-[oklch(0.25_0.025_250)]">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-[oklch(0.65_0.13_180)]/10 flex items-center justify-center mb-4">
                      <info.icon className="w-6 h-6 text-[oklch(0.65_0.13_180)]" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-white mb-1">
                      {info.title}
                    </h3>
                    <p className="text-white font-medium">{info.content}</p>
                    <p className="text-gray-500 text-sm mt-1">{info.subcontent}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Map & Form Section */}
        <section className="pb-20 px-4 md:px-8">
          <div className="container-wide">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Map */}
              <div className="space-y-6">
                <Card className="bg-[oklch(0.18_0.025_250)] border-[oklch(0.25_0.025_250)] overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-[4/3] relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31784.77654619841!2d-54.05!3d5.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d155a4c4e2c1a1b%3A0x1234567890abcdef!2sSaint-Laurent-du-Maroni%2C%20French%20Guiana!5e0!3m2!1sen!2sfr!4v1710000000000!5m2!1sen!2sfr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="absolute inset-0"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Directions */}
                <Card className="bg-[oklch(0.18_0.025_250)] border-[oklch(0.25_0.025_250)]">
                  <CardContent className="p-6">
                    <h3 className="font-display text-xl font-semibold text-white mb-6">
                      Comment nous trouver
                    </h3>
                    <div className="space-y-6">
                      {directions.map((dir, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="w-10 h-10 rounded-lg bg-[oklch(0.65_0.13_180)]/10 flex items-center justify-center flex-shrink-0">
                            <dir.icon className="w-5 h-5 text-[oklch(0.65_0.13_180)]" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-white">{dir.title}</h4>
                              <span className="text-xs px-2 py-0.5 rounded-full bg-[oklch(0.75_0.16_65)]/10 text-[oklch(0.75_0.16_65)]">
                                {dir.time}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm leading-relaxed">
                              {dir.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button 
                      asChild
                      className="w-full mt-6 bg-[oklch(0.65_0.13_180)] hover:bg-[oklch(0.55_0.13_180)] text-white"
                    >
                      <a 
                        href="https://www.google.com/maps/dir//Saint-Laurent-du-Maroni,+French+Guiana" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <Navigation className="w-4 h-4 mr-2" />
                        Ouvrir dans Google Maps
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card className="bg-[oklch(0.18_0.025_250)] border-[oklch(0.25_0.025_250)]">
                <CardContent className="p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-[oklch(0.65_0.13_180)]/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-[oklch(0.65_0.13_180)]" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">
                        Message envoyé !
                      </h3>
                      <p className="text-gray-400 mb-6">
                        Nous vous répondrons dans les plus brefs délais.
                      </p>
                      <Button 
                        onClick={() => setIsSubmitted(false)}
                        variant="outline"
                        className="border-[oklch(0.65_0.13_180)] text-[oklch(0.65_0.13_180)]"
                      >
                        Envoyer un autre message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-2xl font-semibold text-white mb-6">
                        Envoyez-nous un message
                      </h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Nom complet *</label>
                            <Input 
                              required
                              value={formData.name}
                              onChange={e => setFormData({...formData, name: e.target.value})}
                              className="bg-[oklch(0.13_0.025_250)] border-[oklch(0.25_0.025_250)] text-white"
                              placeholder="Votre nom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Email *</label>
                            <Input 
                              type="email"
                              required
                              value={formData.email}
                              onChange={e => setFormData({...formData, email: e.target.value})}
                              className="bg-[oklch(0.13_0.025_250)] border-[oklch(0.25_0.025_250)] text-white"
                              placeholder="votre@email.com"
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Téléphone</label>
                            <Input 
                              type="tel"
                              value={formData.phone}
                              onChange={e => setFormData({...formData, phone: e.target.value})}
                              className="bg-[oklch(0.13_0.025_250)] border-[oklch(0.25_0.025_250)] text-white"
                              placeholder="+594 6 94 00 00 00"
                            />
                          </div>
                          <div>
                            <label className="block text-sm text-gray-400 mb-2">Sujet *</label>
                            <Input 
                              required
                              value={formData.subject}
                              onChange={e => setFormData({...formData, subject: e.target.value})}
                              className="bg-[oklch(0.13_0.025_250)] border-[oklch(0.25_0.025_250)] text-white"
                              placeholder="Objet de votre message"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">Message *</label>
                          <Textarea 
                            required
                            rows={6}
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            className="bg-[oklch(0.13_0.025_250)] border-[oklch(0.25_0.025_250)] text-white resize-none"
                            placeholder="Décrivez votre demande..."
                          />
                        </div>
                        <Button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[oklch(0.65_0.13_180)] hover:bg-[oklch(0.55_0.13_180)] text-white h-12"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                              Envoi en cours...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 mr-2" />
                              Envoyer le message
                            </>
                          )}
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
