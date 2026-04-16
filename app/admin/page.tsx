"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FileText,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Eye,
  Calendar,
  MapPin,
  Phone,
  Loader2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { getDashboardData, DashboardData } from "@/lib/api/stats.api"

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  new: { label: "Nouveau", variant: "default" },
  pending: { label: "En attente", variant: "secondary" },
  "in-progress": { label: "En cours", variant: "outline" },
  completed: { label: "Terminé", variant: "secondary" },
  accepted: { label: "Accepté", variant: "default" },
  rejected: { label: "Refusé", variant: "destructive" },
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(hours / 24)
  
  if (hours < 1) return "À l'instant"
  if (hours < 24) return `Il y a ${hours}h`
  if (days === 1) return "Hier"
  if (days < 7) return `Il y a ${days} jours`
  return date.toLocaleDateString("fr-FR")
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardData = await getDashboardData()
        setData(dashboardData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const stats = data ? [
    {
      title: "Demandes ce mois",
      value: data.stats.totalDevisThisMonth.toString(),
      change: "+12%",
      trend: "up" as const,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "En attente",
      value: data.stats.pendingDevis.toString(),
      change: "-5%",
      trend: "down" as const,
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Clients actifs",
      value: data.stats.activeClients.toString(),
      change: "+8%",
      trend: "up" as const,
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Revenus estimés",
      value: formatAmount(data.stats.monthlyRevenue),
      change: `${data.stats.monthlyChange >= 0 ? "+" : ""}${data.stats.monthlyChange}%`,
      trend: data.stats.monthlyChange >= 0 ? "up" as const : "down" as const,
      icon: DollarSign,
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
  ] : []

  const upcomingInterventions = data?.upcomingInterventions || [
  { client: "Mairie de Cayenne", service: "FTTH - 50 prises", date: "18 Avr 2026", technician: "Jean-Marc" },
  { client: "Centre Commercial", service: "Maintenance trimestrielle", date: "20 Avr 2026", technician: "Sophie" },
  { client: "Lycée Melkior-Garré", service: "Dépannage réseau", date: "22 Avr 2026", technician: "Jean-Marc" },
]

const recentQuotes = data?.recentDevis.map(devis => ({
    id: devis.reference,
    client: devis.clientName,
    company: devis.company,
    service: devis.service,
    location: devis.location,
    date: formatDate(devis.createdAt),
    status: devis.status,
    amount: formatAmount(devis.estimatedAmount),
  })) || []

  const topServices = data?.topServices.map(s => ({
    name: s.serviceName,
    count: s.count,
    percentage: s.percentage,
  })) || []

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Tableau de bord
          </h1>
          <p className="text-muted-foreground">
            Bienvenue ! Voici un aperçu de votre activité.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Ce mois
          </Button>
          <Button size="sm" asChild>
            <Link href="/admin/devis">
              <FileText className="mr-2 h-4 w-4" />
              Voir les devis
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                }`}>
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Quotes */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Demandes de devis récentes</CardTitle>
              <CardDescription>Les 5 dernières demandes reçues</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/devis">Voir tout</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentQuotes.map((quote) => (
                <div
                  key={quote.id}
                  className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-foreground">{quote.client}</span>
                      {quote.company && (
                        <span className="text-xs text-muted-foreground">({quote.company})</span>
                      )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <span>{quote.service}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {quote.location}
                      </span>
                      <span>•</span>
                      <span>{quote.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{quote.amount}</p>
                    <Badge variant={statusConfig[quote.status].variant} className="mt-1">
                      {statusConfig[quote.status].label}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Voir détails
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="mr-2 h-4 w-4" />
                        Contacter
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Générer PDF
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Top Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services les plus demandés</CardTitle>
              <CardDescription>Répartition ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topServices.map((service) => (
                  <div key={service.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-foreground">{service.name}</span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {service.count} ({service.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${service.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Interventions */}
          <Card>
            <CardHeader>
              <CardTitle>Interventions à venir</CardTitle>
              <CardDescription>Planification des prochains jours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingInterventions.map((intervention, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{intervention.client}</p>
                      <p className="text-sm text-muted-foreground">{intervention.service}</p>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {intervention.date}
                        <span>•</span>
                        {intervention.technician}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-emerald-500/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">92</p>
                <p className="text-sm text-muted-foreground">Devis traités ce mois</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-amber-500/10 p-3">
                <AlertCircle className="h-6 w-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Urgents à traiter</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">73%</p>
                <p className="text-sm text-muted-foreground">Taux de conversion</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
