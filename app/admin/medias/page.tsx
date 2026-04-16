"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Upload,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Search,
  Folder,
  X,
  Download,
} from "lucide-react"
import mediasApi, { Media } from "@/lib/api/medias.api"
import { toast } from "sonner"

const FOLDERS = ["general", "services", "projets", "hero", "about"]

export default function AdminMediasPage() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [filterFolder, setFilterFolder] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [mediaToDelete, setMediaToDelete] = useState<Media | null>(null)

  const fetchMedias = useCallback(async () => {
    try {
      const params: any = {}
      if (filterFolder !== "all") params.folder = filterFolder
      const response = await mediasApi.findAll(params)
      setMedias(response.data || response)
    } catch (error) {
      toast.error("Erreur lors du chargement des médias")
    } finally {
      setIsLoading(false)
    }
  }, [filterFolder])

  useEffect(() => {
    fetchMedias()
  }, [fetchMedias])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return

    setUploading(true)
    try {
      for (const file of files) {
        await mediasApi.upload(file, filterFolder === "all" ? "general" : filterFolder)
      }
      toast.success(`${files.length} fichier(s) uploadé(s) avec succès`)
      fetchMedias()
    } catch (error) {
      toast.error("Erreur lors de l'upload")
    } finally {
      setUploading(false)
      e.target.value = ""
    }
  }

  const handleDelete = async () => {
    if (!mediaToDelete) return

    try {
      await mediasApi.delete(mediaToDelete.id)
      toast.success("Fichier supprimé")
      setDeleteDialogOpen(false)
      setMediaToDelete(null)
      fetchMedias()
    } catch (error) {
      toast.error("Erreur lors de la suppression")
    }
  }

  const confirmDelete = (media: Media) => {
    setMediaToDelete(media)
    setDeleteDialogOpen(true)
  }

  const filteredMedias = medias.filter(media =>
    media.originalName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
            Médiathèque
          </h1>
          <p className="text-muted-foreground">
            Gérez les images et fichiers du site
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filterFolder} onValueChange={setFilterFolder}>
            <SelectTrigger className="w-[150px]">
              <Folder className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous</SelectItem>
              {FOLDERS.map((folder) => (
                <SelectItem key={folder} value={folder}>
                  {folder}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-[200px]"
            />
          </div>
          <div>
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
            <label htmlFor="file-upload">
              <Button asChild disabled={uploading}>
                <span>
                  {uploading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="mr-2 h-4 w-4" />
                  )}
                  Upload
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredMedias.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun fichier trouvé</p>
            <p className="text-sm text-muted-foreground mt-1">
              Upload vos premières images
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredMedias.map((media) => (
            <Card
              key={media.id}
              className="overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={() => setSelectedMedia(media)}
            >
              <div className="aspect-square relative bg-muted">
                {media.mimeType.startsWith("image/") ? (
                  <img
                    src={media.url}
                    alt={media.originalName}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardContent className="p-2">
                <p className="text-xs truncate font-medium">{media.originalName}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(media.size)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent className="max-w-3xl">
          {selectedMedia && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedMedia.originalName}</DialogTitle>
                <DialogDescription>
                  Détails du fichier
                </DialogDescription>
              </DialogHeader>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  {selectedMedia.mimeType.startsWith("image/") ? (
                    <img
                      src={selectedMedia.url}
                      alt={selectedMedia.originalName}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <ImageIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-muted-foreground">Nom original</Label>
                    <p className="font-medium">{selectedMedia.originalName}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <p className="font-medium">{selectedMedia.mimeType}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Taille</Label>
                    <p className="font-medium">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Dossier</Label>
                    <p className="font-medium">{selectedMedia.folder}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">URL</Label>
                    <div className="flex gap-2">
                      <Input value={selectedMedia.url} readOnly className="text-xs" />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => navigator.clipboard.writeText(selectedMedia.url)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setSelectedMedia(null)
                    confirmDelete(selectedMedia)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer le fichier</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
