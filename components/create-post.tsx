"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { currentUser } from "@/lib/mock-data"
import TagInput from "@/components/tag-input"
import ImageUpload from "@/components/image-upload"
import VideoUpload from "@/components/video-upload"
import { useI18n } from "@/hooks/use-i18n"
import type { Post } from "@/types"

interface CreatePostProps {
  onPostCreated?: (post: Post) => void
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
  const { t } = useI18n()
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageSelect = (file: File | null) => {
    setSelectedImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setImagePreview(null)
    }
  }

  const handleVideoSelect = (file: File | null) => {
    setSelectedVideo(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = () => setVideoPreview(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      setVideoPreview(null)
    }
  }

  const handleSubmit = async () => {
    if ((!content.trim() && !selectedImage && !selectedVideo) || isSubmitting) return

    setIsSubmitting(true)
    try {
      // TODO: Remplacer par l'appel API
      const newPost: Post = {
        id: Date.now().toString(),
        content: content.trim(),
        createdAt: new Date().toISOString(),
        author: currentUser,
        likesCount: 0,
        commentsCount: 0,
        isLiked: false,
        tags: tags.length > 0 ? tags : undefined,
        image: imagePreview || undefined,
        video: videoPreview || undefined,
      }

      onPostCreated?.(newPost)
      setContent("")
      setTags([])
      setSelectedImage(null)
      setImagePreview(null)
      setSelectedVideo(null)
      setVideoPreview(null)
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalLength = content.length
  const isOverLimit = totalLength > 280

  return (
    <Card className="border-0 border-b border-gray-200 dark:border-gray-700 rounded-none">
      <CardContent className="p-4">
        <div className="flex space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatar || "/placeholder.svg"} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-4">            <Textarea
              placeholder={t("post.whatsNew")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-none resize-none text-lg placeholder:text-gray-500 focus-visible:ring-0"
              maxLength={280}
            />

            {/* Fx18. Upload d'images */}
            <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview} />

            {/* Fx19. Upload de vidéos */}
            <VideoUpload onVideoSelect={handleVideoSelect} currentVideo={videoPreview} />

            {/* Fx12. Ajout de tags */}
            <div>
              <TagInput tags={tags} onTagsChange={setTags} placeholder={t("post.addTags")} maxTags={5} />
            </div>

            <div className="flex justify-between items-center">
              <span className={`text-sm ${isOverLimit ? "text-red-500" : "text-gray-500"}`}>
                {280 - totalLength} {t("post.charactersLeft")}
              </span>
              <Button
                onClick={handleSubmit}
                disabled={(!content.trim() && !selectedImage && !selectedVideo) || isSubmitting || isOverLimit}
                className="rounded-full px-6"
              >
                {isSubmitting ? t("post.publishing") : t("post.publish")}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
