"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, Ban, Clock } from "lucide-react"
import type { User } from "@/types"
import type { ModerationAction } from "@/types/admin"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/hooks/use-i18n"

interface ModerationPanelProps {
  user: User
  currentUserRole: string
}

export default function ModerationPanel({ user, currentUserRole }: ModerationPanelProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState<"suspend" | "ban" | "unban">("suspend")
  const [reason, setReason] = useState("")
  const [duration, setDuration] = useState("7")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const { t } = useI18n()

  // Seuls les modérateurs peuvent voir ce panel
  if (currentUserRole !== "moderator") {
    return null
  }

  const handleSubmit = async () => {
    if (!reason.trim()) {
      toast({
        title: t("common.error"),
        description: "Veuillez fournir une raison",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // TODO: Remplacer par l'appel API
      const moderationAction: ModerationAction = {
        id: Date.now().toString(),
        type: action,
        userId: user.id,
        moderatorId: "user-1", // Current moderator
        reason: reason.trim(),
        duration: action === "suspend" ? Number.parseInt(duration) : undefined,
        createdAt: new Date().toISOString(),
      }

      console.log("Moderation action:", moderationAction)

      toast({
        title: t("common.success"),
        description: `Utilisateur ${action === "suspend" ? "suspendu" : action === "ban" ? "banni" : "débanni"}`,
      })

      setIsOpen(false)
      setReason("")
      setDuration("7")
    } catch (error) {
      toast({
        title: t("common.error"),
        description: "Erreur lors de l'action de modération",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-orange-600 border-orange-200 hover:bg-orange-50">
          <Shield size={16} className="mr-2" />
          Modération
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Actions de modération - {user.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="action">Action</Label>
            <Select value={action} onValueChange={(value: "suspend" | "ban" | "unban") => setAction(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suspend">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-yellow-500" />
                    {t("admin.suspend")}
                  </div>
                </SelectItem>
                <SelectItem value="ban">
                  <div className="flex items-center">
                    <Ban size={16} className="mr-2 text-red-500" />
                    {t("admin.ban")}
                  </div>
                </SelectItem>
                <SelectItem value="unban">
                  <div className="flex items-center">
                    <Shield size={16} className="mr-2 text-green-500" />
                    {t("admin.unban")}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {action === "suspend" && (
            <div>
              <Label htmlFor="duration">{t("admin.duration")}</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 jour</SelectItem>
                  <SelectItem value="3">3 jours</SelectItem>
                  <SelectItem value="7">7 jours</SelectItem>
                  <SelectItem value="14">14 jours</SelectItem>
                  <SelectItem value="30">30 jours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="reason">{t("admin.reason")}</Label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Expliquez la raison de cette action..."
              className="min-h-[80px]"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting || !reason.trim()}>
              {isSubmitting ? "Traitement..." : t("common.confirm")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
