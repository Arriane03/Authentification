"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/hooks/use-i18n"

interface MessageDeleteButtonProps {
  messageId: string
  onMessageDeleted: (messageId: string) => void
}

export default function MessageDeleteButton({ messageId, onMessageDeleted }: MessageDeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { toast } = useToast()
  const { t } = useI18n()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // TODO: DELETE /api/messages/:id
      console.log(`Deleting message ${messageId}`)

      onMessageDeleted(messageId)

      toast({
        title: t("common.success"),
        description: t("messages.deleted"),
      })

      setIsOpen(false)
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("messages.deleteError"),
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal size={12} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setIsOpen(true)} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          {t("messages.deleteMessage")}
        </DropdownMenuItem>
      </DropdownMenuContent>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("messages.deleteMessage")}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">{t("messages.confirmDelete")}</p>

            <div className="flex justify-end space-x-2">
              <Button variant="ghost" onClick={() => setIsOpen(false)}>
                {t("common.cancel")}
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? t("common.loading") : t("common.delete")}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
