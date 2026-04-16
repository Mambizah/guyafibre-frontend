"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Filter,
  Download,
  Eye,
  Mail,
  Phone,
  FileText,
  MoreHorizontal,
  MapPin,
  Calendar,
  User,
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import devisApi, { Devis } from "@/lib/api/devis.api"
import { toast } from "sonner"

interface DevisWithDetails extends Devis {
  services?: string[]
  address?: string
  description?: string
  urgency?: string
}

const statusConfig: Record<string, { label: string; icon: typeof Clock; color: string; textColor: string }> = {
  new: { label: "Nouveau", icon: AlertCircle, color: "bg-blue-500", textColor: "text-blue-500" },
  pending: { label: "En attente", icon: Clock, color: "bg-amber-500", textColor: "text-amber-500" },
  "in-progress": { label: "En cours", icon: Clock, color: "bg-violet-500", textColor: "text-violet-500" },
  in_progress: { label: "En cours", icon: Clock, color: "bg-violet-500", textColor: "text-violet-500" },
  completed: { label: "Terminé", icon: CheckCircle2, color: "bg-emerald-500", textColor: "text-emerald-500" },
  accepted: { label: "Accepté", icon: CheckCircle2, color: "bg-emerald-500", textColor: "text-emerald-500" },
  rejected: { label: "Refusé", icon: XCircle, color: "bg-red-500", textColor: "text-red-500" },
  // Uppercase variants from backend
  NEW: { label: "Nouveau", icon: AlertCircle, color: "bg-blue-500", textColor: "text-blue-500" },
  PENDING: { label: "En attente", icon: Clock, color: "bg-amber-500", textColor: "text-amber-500" },
  IN_PROGRESS: { label: "En cours", icon: Clock, color: "bg-violet-500", textColor: "text-violet-500" },
  COMPLETED: { label: "Terminé", icon: CheckCircle2, color: "bg-emerald-500", textColor: "text-emerald-500" },
  ACCEPTED: { label: "Accepté", icon: CheckCircle2, color: "bg-emerald-500", textColor: "text-emerald-500" },
  REJECTED: { label: "Refusé", icon: XCircle, color: "bg-red-500", textColor: "text-red-500" },
  QUOTE_SENT: { label: "Devis envoyé", icon: FileText, color: "bg-cyan-500", textColor: "text-cyan-500" },
  CANCELLED: { label: "Annulé", icon: XCircle, color: "bg-gray-500", textColor: "text-gray-500" },
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount)
}

export default function AdminDevisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedQuote, setSelectedQuote] = useState<DevisWithDetails | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)
  const [devis, setDevis] = useState<Devis[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDevis = async () => {
      try {
        const data = await devisApi.findAll()
        setDevis(data)
      } catch (error) {
        console.error("Failed to fetch devis:", error)
        toast.error("Erreur lors du chargement des devis")
      } finally {
        setIsLoading(false)
      }
    }
    fetchDevis()
  }, [])

  const handleStatusChange = async (devisId: string, newStatus: string) => {
    try {
      await devisApi.updateStatus(devisId, { status: newStatus })
      setDevis(devis.map(d => d.id === devisId ? { ...d, status: newStatus } : d))
      toast.success("Statut mis à jour")
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
    }
  }

  const filteredQuotes = devis.filter((quote) => {
    const matchesSearch = 
      quote.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (quote.services || []).join(' ').toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const openDetail = (quote: Devis) => {
    setSelectedQuote(quote as DevisWithDetails)
    setDetailOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Demandes de devis
          </h1>
          <p className="text-muted-foreground">
            Gérez toutes les demandes de devis reçues
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total", value: devis.length, color: "bg-primary" },
          { label: "Nouveaux", value: devis.filter(q => q.status === "new").length, color: "bg-blue-500" },
          { label: "En cours", value: devis.filter(q => q.status === "in-progress" || q.status === "pending").length, color: "bg-violet-500" },
          { label: "Terminés", value: devis.filter(q => q.status === "completed" || q.status === "accepted").length, color: "bg-emerald-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${stat.color}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>)}

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Rechercher par client, ID ou service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="new">Nouveau</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                  <SelectItem value="in-progress">En cours</SelectItem>
                  <SelectItem value="completed">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Localisation</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQuotes.map((quote) => {
                const status = statusConfig[quote.status as keyof typeof statusConfig] || statusConfig.new
                return (
                  <TableRow key={quote.id} className="cursor-pointer hover:bg-muted/50" onClick={() => openDetail(quote)}>
                    <TableCell className="font-medium">{quote.reference}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{quote.clientName}</p>
                        {quote.company && (
                          <p className="text-xs text-muted-foreground">{quote.company}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{quote.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {quote.location}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{formatAmount(quote.estimatedAmount)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${status.textColor}`}>
                        <status.icon className="mr-1 h-3 w-3" />
                        {status.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{formatDate(quote.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetail(quote)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="mr-2 h-4 w-4" />
                            Envoyer email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Phone className="mr-2 h-4 w-4" />
                            Appeler
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            Générer PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedQuote && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-display text-xl">
                    Devis {selectedQuote.reference}
                  </DialogTitle>
                  <Badge variant="secondary" className={statusConfig[selectedQuote.status as keyof typeof statusConfig]?.textColor || "text-muted-foreground"}>
                    {statusConfig[selectedQuote.status as keyof typeof statusConfig]?.label || selectedQuote.status}
                  </Badge>
                </div>
                <DialogDescription>
                  Reçu le {formatDate(selectedQuote.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Client Info */}
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Client
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="font-semibold">{selectedQuote.clientName}</p>
                      {selectedQuote.company && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          {selectedQuote.company}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">Contact</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1">
                      <p className="text-sm flex items-center gap-2">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {selectedQuote.clientEmail}
                      </p>
                      <p className="text-sm flex items-center gap-2">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {selectedQuote.clientPhone}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Location */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Adresse d&apos;intervention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedQuote.address || selectedQuote.location}</p>
                  </CardContent>
                </Card>

                {/* Services */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Services demandés</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{selectedQuote.service}</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Description */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Description du projet</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{selectedQuote.description}</p>
                  </CardContent>
                </Card>

                {/* Amount */}
                {/* Amount */}
                <div className="flex items-center justify-between rounded-lg bg-muted p-4">
                  <span className="font-medium">Montant estimé</span>
                  <span className="text-2xl font-bold text-primary">{formatAmount(selectedQuote.estimatedAmount)}</span>
                </div>

                {/* Status Change */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Changer le statut
                  </label>
                  <Select 
                    value={selectedQuote.status} 
                    onValueChange={(newStatus) => handleStatusChange(selectedQuote.id, newStatus)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nouveau</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                      <SelectItem value="in-progress">En cours</SelectItem>
                      <SelectItem value="accepted">Accepté</SelectItem>
                      <SelectItem value="rejected">Refusé</SelectItem>
                      <SelectItem value="completed">Terminé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Response */}
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-2 block">
                    Réponse au client
                  </label>
                  <Textarea 
                    placeholder="Écrivez votre réponse ici..."
                    rows={3}
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setDetailOpen(false)}>
                  Fermer
                </Button>
                <Button variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Générer PDF
                </Button>
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Envoyer réponse
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
