"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { currentUser, mockComments } from "@/lib/mock-data"
import ReportButton from "@/components/report-button"
import type { Comment } from "@/types"
import { useI18n } from "@/hooks/use-i18n"

interface CommentSectionProps {
  postId: string
}

interface CommentItemProps {
  comment: Comment
  onReply: (parentId: string, content: string) => void
  level?: number
}

function CommentItem({ comment, onReply, level = 0 }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useI18n()

  const handleReply = async () => {
    if (!replyContent.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onReply(comment.id, replyContent.trim())
      setReplyContent("")
      setShowReplyForm(false)
    } catch (error) {
      console.error("Error adding reply:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return t('time.now')
    if (diffInMinutes < 60) return t('time.minutes', { count: diffInMinutes })
    if (diffInMinutes < 1440) return t('time.hours', { count: Math.floor(diffInMinutes / 60) })
    return t('time.days', { count: Math.floor(diffInMinutes / 1440) })
  }

  return (
    <div className={`${level > 0 ? "ml-8 border-l-2 border-gray-100 dark:border-gray-700 pl-4" : ""}`}>
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-sm">{comment.author.name}</span>
              <span className="text-gray-500 text-sm">@{comment.author.username}</span>
              <span className="text-gray-500 text-sm">·</span>
              <span className="text-gray-500 text-sm">{formatTime(comment.createdAt)}</span>
            </div>
            {/* Fx20. Signalement de contenu */}
            <ReportButton contentType="comment" contentId={comment.id} />
          </div>
          <p className="text-sm text-gray-900 dark:text-gray-100 mt-1">{comment.content}</p>

          <div className="flex items-center space-x-4 mt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowReplyForm(!showReplyForm)}
              className="text-gray-500 hover:text-blue-600 p-0 h-auto"
            >
              {t("comment.reply")}
            </Button>
          </div>

          {/* Fx8. Répondre à un commentaire */}
          {showReplyForm && (
            <div className="mt-3 space-y-2">
              <Textarea
                placeholder={t("comment.write")}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                className="min-h-[60px] resize-none"
                maxLength={280}
              />
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {280 - replyContent.length} {t("post.charactersLeft")}
                </span>
                <div className="space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setShowReplyForm(false)}>
                    {t("common.cancel")}
                  </Button>
                  <Button onClick={handleReply} disabled={!replyContent.trim() || isSubmitting} size="sm">
                    {isSubmitting ? t("comment.sending") : t("comment.reply")}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Réponses imbriquées */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} onReply={onReply} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { t } = useI18n()

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      // TODO: Remplacer par l'appel API
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
        author: currentUser,
      }
      setComments((prev) => [newCommentObj, ...prev])
      setNewComment("")
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReply = async (parentId: string, content: string) => {
    // TODO: Remplacer par l'appel API
    const newReply: Comment = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      author: currentUser,
      parentId,
    }

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          }
        }
        return comment
      }),
    )
  }

  return (
    <div className="space-y-4">
      {/* Fx7. Répondre à un post */}
      <div className="flex space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Textarea
            placeholder={t("comment.write")}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px] resize-none"
            maxLength={280}
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500">
              {280 - newComment.length} {t("post.charactersLeft")}
            </span>
            <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting} size="sm">
              {isSubmitting ? t("comment.sending") : t("post.comment")}
            </Button>
          </div>
        </div>
      </div>

      {/* Liste des commentaires */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-4">
            <span className="text-gray-500">{t("comment.noComments")}</span>
          </div>
        ) : (
          comments.map((comment) => <CommentItem key={comment.id} comment={comment} onReply={handleReply} />)
        )}
      </div>
    </div>
  )
}
