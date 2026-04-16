"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"
import { useLanguage } from "@/lib/i18n/context"

export function ContactSection() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${form.name} — GUYA FIBRE`)
    const body = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\n\nMessage:\n${form.message}`
    )
    window.location.href = `mailto:contact@guyafibre.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — form */}
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="font-display text-2xl font-bold text-foreground mb-2">
              {t("contact.title")}
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              {t("contact.subtitle")}
            </p>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
                <CheckCircle className="w-14 h-14 text-primary" />
                <h3 className="font-display font-semibold text-foreground">{t("common.success")}</h3>
                <p className="text-sm text-muted-foreground">Votre client email s&apos;est ouvert avec votre message.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-sm text-primary hover:underline"
                >
                  {t("contact.send")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-sm font-medium text-foreground">
                      {t("contact.name")} <span className="text-destructive" aria-hidden>*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={t("contact.name")}
                      className="px-4 py-3 text-sm border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-phone" className="text-sm font-medium text-foreground">
                      {t("contact.phone")}
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="06 xx xx xx xx"
                      className="px-4 py-3 text-sm border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-email" className="text-sm font-medium text-foreground">
                    {t("contact.email")} <span className="text-destructive" aria-hidden>*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className="px-4 py-3 text-sm border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-sm font-medium text-foreground">
                    {t("contact.message")} <span className="text-destructive" aria-hidden>*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={t("contact.message")}
                    className="px-4 py-3 text-sm border border-input rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground text-sm font-semibold rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  {t("contact.send")}
                </button>
              </form>
            )}
          </div>

          {/* Right — info */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full text-sm text-primary font-medium mb-5 border border-primary/20">
                {t("contact.title")}
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4 text-balance">
                {t("contact.subtitle")}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-pretty">
                {t("footer.description")}
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <a
                href="tel:0694435484"
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{t("contact.phone")}</div>
                  <div className="font-semibold text-foreground">06 94 43 54 84</div>
                </div>
              </a>

              <a
                href="mailto:contact@guyafibre.com"
                className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{t("contact.email")}</div>
                  <div className="font-semibold text-foreground">contact@guyafibre.com</div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-5 bg-card rounded-xl border border-border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{t("contact.address")}</div>
                  <div className="font-semibold text-foreground">Saint-Laurent-du-Maroni</div>
                  <div className="text-sm text-muted-foreground">Guyane française</div>
                </div>
              </div>
            </div>

            {/* Intervention territory */}
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-5">
              <div className="text-sm font-semibold text-primary mb-1">{t("common.ourLocation")}</div>
              <p className="text-sm text-muted-foreground">
                Toute la Guyane française — zones urbaines, rurales et sites isolés de l&apos;intérieur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
