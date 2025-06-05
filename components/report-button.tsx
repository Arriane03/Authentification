"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Flag, MoreHorizontal } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ReportButtonProps {
  contentType: "post" | "comment"
  contentId: string
  className?: string
}

export default function ReportButton({ contentType, contentId, className }: ReportButtonProps) {
  const { toast } = useToast()
  const [isReported, setIsReported] = useState(false)

  const handleReport = (reason: string) => {
    // Simulation du signalement
    console.log(`Signalement: ${contentType} ${contentId} pour: ${reason}`)

    setIsReported(true)
    toast({
      title: "Contenu signalé",
      description: `Ce ${contentType === "post" ? "post" : "commentaire"} a été signalé pour: ${reason}`,
    })
  }

  if (isReported) {
    return (
      <Button variant="ghost" size="sm" disabled className={className}>
        <Flag size={16} className="text-red-500" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className={className}>
          <MoreHorizontal size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleReport("Contenu inapproprié")}>
          <Flag className="mr-2 h-4 w-4" />
          Contenu inapproprié
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleReport("Spam")}>
          <Flag className="mr-2 h-4 w-4" />
          Spam
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleReport("Harcèlement")}>
          <Flag className="mr-2 h-4 w-4" />
          Harcèlement
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleReport("Fausses informations")}>
          <Flag className="mr-2 h-4 w-4" />
          Fausses informations
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
