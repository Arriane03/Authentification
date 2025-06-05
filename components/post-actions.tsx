"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle } from "lucide-react"
import type { Post } from "@/types"
import CommentSection from "./comment-section"
import { useI18n } from "@/hooks/use-i18n"

interface PostActionsProps {
  post: Post
}

export default function PostActions({ post }: PostActionsProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [likesCount, setLikesCount] = useState(post.likesCount)
  const [showComments, setShowComments] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useI18n()

  const handleLike = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // TODO: Remplacer par l'appel API
      if (isLiked) {
        setIsLiked(false)
        setLikesCount((prev) => prev - 1)
      } else {
        setIsLiked(true)
        setLikesCount((prev) => prev + 1)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center space-x-6 mt-3">
        {/* Fx6. Liker un post */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isLoading}
          className={`flex items-center space-x-2 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 ${
            isLiked ? "text-red-600" : "text-gray-500"
          }`}
          title={t("post.like")}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
          <span className="text-sm">{likesCount}</span>
        </Button>

        {/* Fx7. Répondre à un post */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 p-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-500"
          title={t("post.comment")}
        >
          <MessageCircle size={16} />
          <span className="text-sm">{post.commentsCount}</span>
        </Button>
      </div>

      {/* Fx7. Répondre à un post + Fx8. Répondre à un commentaire */}
      {showComments && (
        <div className="mt-4">
          <CommentSection postId={post.id} />
        </div>
      )}
    </>
  )
}
