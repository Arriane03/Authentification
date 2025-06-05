"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/hooks/use-i18n"
import type { UserRole } from "@/types/moderation"

interface PostDeleteButtonProps {
  postId: string
  currentUserRole: UserRole
  onPostDeleted: (postId: string, reason: string) => void
}

export default function PostDeleteButton({ postId, currentUserRole, onPostDeleted }: PostDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const { t } = useI18n()

  // Seuls les modérateurs et admins peuvent voir ce bouton
  if (currentUserRole !== "moderator" && currentUserRole !== "admin") {
    return null
  }

  const handleDelete = async () => {
    if (!reason.trim()) {
      toast({
        title: t("common.error"),
        description: t("moderation.deleteReason"),
        variant: "destructive",
      })
      return
    }

    setIsDeleting(true)
    try {
      // TODO: DELETE /api/posts/:id
      console.log(`Deleting post ${postId} with reason: ${reason}`)

      onPostDeleted(postId, reason.trim())

      toast({
        title: t("common.success"),
        description: t("moderation.postDeleted"),
      })

      setIsOpen(false)
      setReason("")
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Erreur lors de la suppression du post",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("moderation.deletePost")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">{t("moderation.confirmDeletePost")}</p>

          <div>
            <Label htmlFor="reason">{t("moderation.reason")}</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={t("moderation.deleteReason")}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting || !reason.trim()}>
              {isDeleting ? t("common.loading") : t("common.delete")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
