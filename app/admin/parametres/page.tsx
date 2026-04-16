'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ThemePaletteCustomizer } from '@/components/theme-palette-customizer'
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  Bell,
  Shield,
  Palette,
  Server,
} from 'lucide-react'

export default function AdminSettingsPage() {
  const [companySettings, setCompanySettings] = useState({
    name: 'GUYA FIBRE SARL',
    email: 'contact@guyafibre.com',
    phone: '+594 6 94 43 54 84',
    address: '12 Rue des Palmiers',
    city: 'Saint-Laurent-du-Maroni',
    postalCode: '97320',
    siret: '123 456 789 00012',
    website: 'www.guyafibre.com',
  })

  const [seoSettings, setSeoSettings] = useState({
    title: 'GUYA FIBRE — Experts Fibre Optique en Guyane',
    description:
      'Entreprise guyanaise spécialisée dans le déploiement, la maintenance et les études de réseaux fibre optique.',
    keywords:
      'fibre optique, FTTH, FTTO, Guyane, déploiement fibre, maintenance réseau',
  })

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.example.com',
    smtpPort: '587',
    smtpUser: 'noreply@guyafibre.com',
    notificationEmail: 'contact@guyafibre.com',
    sendCopyToClient: true,
    autoResponse: true,
  })

  const [notifications, setNotifications] = useState({
    newQuote: true,
    quoteResponse: true,
    urgentQuote: true,
    weeklyReport: false,
  })

  const handleSave = () => {
    alert('Paramètres sauvegardés avec succès!')
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-foreground">Paramètres</h1>
        <p className="text-muted-foreground">
          Configurez les paramètres de votre application et personnalisez l&apos;apparence du site
        </p>
      </div>

      <Tabs defaultValue="appearance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Apparence</span>
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden sm:inline">Entreprise</span>
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">SEO</span>
          </TabsTrigger>
          <TabsTrigger value="email" className="gap-2">
            <Mail className="h-4 w-4" />
            <span className="hidden sm:inline">Emails</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                Personnalisation des couleurs
              </CardTitle>
              <CardDescription>
                Choisissez une palette de couleurs pour personnaliser l&apos;apparence du site
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ThemePaletteCustomizer />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Informations de l&apos;entreprise
              </CardTitle>
              <CardDescription>Mettez à jour les détails de votre entreprise</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l&apos;entreprise</Label>
                  <Input
                    id="company-name"
                    value={companySettings.name}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-siret">SIRET</Label>
                  <Input
                    id="company-siret"
                    value={companySettings.siret}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, siret: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-email" className="flex items-center gap-1">
                    <Mail className="h-4 w-4" /> Email principal
                  </Label>
                  <Input
                    id="company-email"
                    type="email"
                    value={companySettings.email}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-phone" className="flex items-center gap-1">
                    <Phone className="h-4 w-4" /> Téléphone
                  </Label>
                  <Input
                    id="company-phone"
                    value={companySettings.phone}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-address" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> Adresse
                </Label>
                <Input
                  id="company-address"
                  value={companySettings.address}
                  onChange={(e) =>
                    setCompanySettings({ ...companySettings, address: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-city">Ville</Label>
                  <Input
                    id="company-city"
                    value={companySettings.city}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, city: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-postal">Code postal</Label>
                  <Input
                    id="company-postal"
                    value={companySettings.postalCode}
                    onChange={(e) =>
                      setCompanySettings({ ...companySettings, postalCode: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="company-website" className="flex items-center gap-1">
                  <Globe className="h-4 w-4" /> Site web
                </Label>
                <Input
                  id="company-website"
                  value={companySettings.website}
                  onChange={(e) =>
                    setCompanySettings({ ...companySettings, website: e.target.value })
                  }
                />
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Paramètres SEO
              </CardTitle>
              <CardDescription>Configurez les métadonnées pour le référencement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo-title">Titre de la page</Label>
                <Input
                  id="seo-title"
                  value={seoSettings.title}
                  onChange={(e) => setSeoSettings({ ...seoSettings, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo-description">Description</Label>
                <Textarea
                  id="seo-description"
                  value={seoSettings.description}
                  onChange={(e) =>
                    setSeoSettings({ ...seoSettings, description: e.target.value })
                  }
                  className="min-h-24"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seo-keywords">Mots-clés (séparés par des virgules)</Label>
                <Textarea
                  id="seo-keywords"
                  value={seoSettings.keywords}
                  onChange={(e) => setSeoSettings({ ...seoSettings, keywords: e.target.value })}
                  className="min-h-20"
                />
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email Settings */}
        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Paramètres email
              </CardTitle>
              <CardDescription>Configurez l&apos;envoi d&apos;emails et les notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Hôte SMTP</Label>
                  <Input
                    id="smtp-host"
                    value={emailSettings.smtpHost}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpHost: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Port</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) =>
                      setEmailSettings({ ...emailSettings, smtpPort: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="smtp-user">Utilisateur SMTP</Label>
                <Input
                  id="smtp-user"
                  value={emailSettings.smtpUser}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUser: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notification-email">Email de notification</Label>
                <Input
                  id="notification-email"
                  type="email"
                  value={emailSettings.notificationEmail}
                  onChange={(e) =>
                    setEmailSettings({ ...emailSettings, notificationEmail: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg border border-border">
                <Label htmlFor="send-copy" className="cursor-pointer">
                  Envoyer une copie au client
                </Label>
                <Switch
                  id="send-copy"
                  checked={emailSettings.sendCopyToClient}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, sendCopyToClient: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between py-2 px-3 bg-secondary rounded-lg border border-border">
                <Label htmlFor="auto-response" className="cursor-pointer">
                  Réponse automatique
                </Label>
                <Switch
                  id="auto-response"
                  checked={emailSettings.autoResponse}
                  onCheckedChange={(checked) =>
                    setEmailSettings({ ...emailSettings, autoResponse: checked })
                  }
                />
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Préférences de notifications
              </CardTitle>
              <CardDescription>Configurez les notifications que vous souhaitez recevoir</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  {
                    id: 'newQuote',
                    label: 'Nouvelles demandes de devis',
                    description: 'Recevoir une notification à chaque nouvelle demande',
                  },
                  {
                    id: 'quoteResponse',
                    label: 'Réponses aux devis',
                    description: 'Recevoir une notification quand un client répond',
                  },
                  {
                    id: 'urgentQuote',
                    label: 'Devis urgents',
                    description: 'Recevoir une notification pour les demandes prioritaires',
                  },
                  {
                    id: 'weeklyReport',
                    label: 'Rapport hebdomadaire',
                    description: 'Recevoir un résumé hebdomadaire',
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between p-3 rounded-lg border border-border bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.id as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({
                          ...notifications,
                          [item.id]: checked,
                        })
                      }
                    />
                  </div>
                ))}
              </div>

              <Button onClick={handleSave} className="w-full md:w-auto gap-2">
                <Save className="h-4 w-4" />
                Sauvegarder les modifications
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
