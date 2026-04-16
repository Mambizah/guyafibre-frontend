"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Eye,
  Trash2,
  Loader2,
  Search,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  CheckCircle,
  Clock,
  Filter,
} from "lucide-react"
import contactApi, { Contact } from "@/lib/api/contact.api"
import { toast } from "sonner"

export default function AdminContactPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchContacts()
  }, [filter, page])

  const fetchContacts = async () => {
    setIsLoading(true)
    try {
      const params: any = { page, limit: 20 }
      if (filter === "unread") params.search = "isRead:false"
      
      const response = await contactApi.findAll(params)
      setContacts(response.data || response)
      setTotalPages(response.meta?.totalPages || 1)
    } catch (error) {
      toast.error("Erreur lors du chargement des messages")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkAsRead = async (contact: Contact) => {
    try {
      await contactApi.markAsRead(contact.id)
      toast.success("Message marqué comme lu")
      fetchContacts()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour")
    }
  }

  const handleDelete = async (contact: Contact) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return

    try {
      await contactApi.remove(contact.id)
      toast.success("Message supprimé")
      setDetailOpen(false)
      fetchContacts()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const openDetail = async (contact: Contact) => {
    setSelectedContact(contact)
    setDetailOpen(true)
    if (!contact.isRead) {
      handleMarkAsRead(contact)
    }
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const unreadCount = contacts.filter(c => !c.isRead).length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Messages de contact
          </h1>
          <p className="text-muted-foreground">
            Gérez les messages reçus via le formulaire de contact
          </p>
        </div>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="text-sm px-3 py-1">
            {unreadCount} message(s) non lu(s)
          </Badge>
        )}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground mr-2">Filtrer:</span>
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => { setFilter("all"); setPage(1); }}
            >
              Tous
            </Button>
            <Button
              size="sm"
              variant={filter === "unread" ? "default" : "outline"}
              onClick={() => { setFilter("unread"); setPage(1); }}
            >
              Non lus
            </Button>
            <Button
              size="sm"
              variant={filter === "read" ? "default" : "outline"}
              onClick={() => { setFilter("read"); setPage(1); }}
            >
              Lus
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : contacts.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Aucun message trouvé</p>
            </div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12"></TableHead>
                    <TableHead>Référence</TableHead>
                    <TableHead>Nom</TableHead>
                    <TableHead>Sujet</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow
                      key={contact.id}
                      className={!contact.isRead ? "bg-primary/5" : ""}
                    >
                      <TableCell>
                        {!contact.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{contact.reference}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{contact.name}</div>
                        <div className="text-xs text-muted-foreground">{contact.email}</div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">
                        {contact.subject}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(contact.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openDetail(contact)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Voir détails
                            </DropdownMenuItem>
                            {!contact.isRead && (
                              <DropdownMenuItem onClick={() => handleMarkAsRead(contact)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Marquer comme lu
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDelete(contact)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 p-4 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {page} / {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl">
          {selectedContact && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Badge variant="outline">{selectedContact.reference}</Badge>
                  {!selectedContact.isRead && (
                    <Badge variant="default">Non lu</Badge>
                  )}
                </DialogTitle>
                <DialogDescription>
                  Reçu le {formatDate(selectedContact.createdAt)}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedContact.phone}</span>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-1">{selectedContact.subject}</h3>
                </div>

                <div className="bg-muted rounded-lg p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">
                    {selectedContact.message}
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Répondre par email
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedContact)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
