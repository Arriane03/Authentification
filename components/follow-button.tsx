"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useI18n } from "@/hooks/use-i18n"

interface FollowButtonProps {
  userId: string
  isFollowing: boolean
  onFollowChange?: (isFollowing: boolean) => void
}

export default function FollowButton({ userId, isFollowing: initialIsFollowing, onFollowChange }: FollowButtonProps) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { t } = useI18n()

  const handleToggleFollow = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      // Simulation du follow/unfollow
      const newFollowState = !isFollowing
      setIsFollowing(newFollowState)
      onFollowChange?.(newFollowState)

      toast({
        title: newFollowState ? t("follow.followed") : t("follow.unfollowed"),
        description: newFollowState ? t("follow.followedDescription") : t("follow.unfollowedDescription"),
      })
    } catch (error) {
      console.error("Error toggling follow:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={isLoading}
      variant={isFollowing ? "outline" : "default"}
      size="sm"
      className={isFollowing ? "hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20" : ""}
    >
      {isLoading ? t("common.loading") : isFollowing ? t("follow.unfollowed") : t("follow.followed")}
    </Button>
  )
}
