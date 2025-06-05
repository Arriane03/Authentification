"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post as PostType } from "@/types"
import type { UserRole } from "@/types/moderation"
import PostActions from "./post-actions"
import ReportButton from "./report-button"
import PostDeleteButton from "./post-delete-button"
import { userRoles } from "@/lib/mock-admin"
import { useI18n } from "@/hooks/use-i18n"

interface PostProps {
  post: PostType
  onPostUpdate?: (updatedPost: PostType) => void
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "maintenant"
  if (diffInHours < 24) return `${diffInHours}h`
  if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}j`
  return date.toLocaleDateString()
}

export default function Post({ post, onPostUpdate }: PostProps) {
  const [currentPost, setCurrentPost] = useState(post)
  const currentUserRole = (userRoles["user-1"] as UserRole) || "user"
  const { t } = useI18n()

  const handlePostDeleted = (postId: string, reason: string) => {
    const updatedPost: PostType = {
      ...currentPost,
      isDeleted: true,
      deletedAt: new Date().toISOString(),
      deletedBy: "user-1", // Current moderator
      deletionReason: reason,
    }
    setCurrentPost(updatedPost)
    onPostUpdate?.(updatedPost)
  }

  // Si le post est supprimé, afficher le placeholder
  if (currentPost.isDeleted) {
    return (
      <Card className="border-0 border-b border-gray-200 dark:border-gray-700 rounded-none opacity-60">
        <CardContent className="p-4">
          <div className="flex space-x-3">
            <Avatar className="h-10 w-10 grayscale">
              <AvatarImage src={currentPost.author.avatar || "/placeholder.svg"} alt={currentPost.author.name} />
              <AvatarFallback>{currentPost.author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 text-gray-500">
                <span className="font-semibold">{currentPost.author.name}</span>
                <span>@{currentPost.author.username}</span>
                <span>·</span>
                <span className="text-sm">{formatDate(currentPost.createdAt)}</span>
              </div>

              <div className="mt-2">
                <p className="text-gray-500 italic">{t("moderation.postDeleted")}</p>
                {currentPost.deletionReason && (
                  <p className="text-xs text-gray-400 mt-1">Raison : {currentPost.deletionReason}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 border-b border-gray-200 dark:border-gray-700 rounded-none">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Link href={`/profile/${currentPost.author.id}`}>
            <Avatar className="h-10 w-10">
              <AvatarImage src={currentPost.author.avatar || "/placeholder.svg"} alt={currentPost.author.name} />
              <AvatarFallback>{currentPost.author.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Link
                  href={`/profile/${currentPost.author.id}`}
                  className="font-semibold text-gray-900 dark:text-gray-100 hover:underline"
                >
                  {currentPost.author.name}
                </Link>
                <span className="text-gray-500">@{currentPost.author.username}</span>
                <span className="text-gray-500">·</span>
                <span className="text-gray-500 text-sm">{formatDate(currentPost.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-1">
                {/* Fx1. Bouton suppression pour modérateurs */}
                <PostDeleteButton
                  postId={currentPost.id}
                  currentUserRole={currentUserRole}
                  onPostDeleted={handlePostDeleted}
                />
                {/* Fx20. Signalement de contenu */}
                <ReportButton contentType="post" contentId={currentPost.id} />
              </div>
            </div>

            <div className="mt-2">
              <p className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap">{currentPost.content}</p>
            </div>

            {/* Fx18. Upload d'images */}
            {currentPost.image && (
              <div className="mt-3">
                <Image
                  src={currentPost.image || "/placeholder.svg"}
                  alt="Image du post"
                  width={500}
                  height={300}
                  className="rounded-lg max-h-80 w-full object-cover"
                />
              </div>
            )}

            {/* Fx19. Affichage des vidéos */}
            {currentPost.video && (
              <div className="mt-3">
                <video src={currentPost.video} controls className="rounded-lg max-h-80 w-full object-cover" />
              </div>
            )}

            {/* Fx12. Ajout de tags */}
            {currentPost.tags && currentPost.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {currentPost.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Fx6. Liker un post + Fx7. Répondre à un post */}
            <PostActions post={currentPost} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
