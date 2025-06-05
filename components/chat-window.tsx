"use client"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Send, ImageIcon, VideoIcon, ArrowLeft } from "lucide-react"
import Image from "next/image"
import type { Conversation, PrivateMessage } from "@/types/messages"
import type { User } from "@/types"
import ImageUpload from "@/components/image-upload"
import VideoUpload from "@/components/video-upload"
import MessageDeleteButton from "@/components/message-delete-button"
import { useI18n } from "@/hooks/use-i18n"

interface ChatWindowProps {
  conversation: Conversation
  messages: PrivateMessage[]
  users: { [key: string]: User }
  onSendMessage: (content: string, type?: "text" | "image" | "video", mediaUrl?: string) => void
  onMessageDeleted?: (messageId: string) => void
  onBack?: () => void // Pour le mode mobile
  isMobile?: boolean
}

export default function ChatWindow({
  conversation,
  messages,
  users,
  onSendMessage,
  onMessageDeleted,
  onBack,
  isMobile = false,
}: ChatWindowProps) {
  const [newMessage, setNewMessage] = useState("")
  const [showImageUpload, setShowImageUpload] = useState(false)
  const [showVideoUpload, setShowVideoUpload] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [localMessages, setLocalMessages] = useState<PrivateMessage[]>(messages)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()

  const otherUser = users[conversation.participants.find((p) => p !== "user-1") || ""]

  useEffect(() => {
    setLocalMessages(messages)
  }, [messages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [localMessages])

  const handleMessageDeleted = (messageId: string) => {
    setLocalMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isDeleted: true, deletedAt: new Date().toISOString() } : msg,
      ),
    )
    onMessageDeleted?.(messageId)
  }

  const handleSendText = () => {
    if (!newMessage.trim()) return
    onSendMessage(newMessage.trim())
    setNewMessage("")
  }

  const handleSendImage = () => {
    if (!selectedImage || !imagePreview) return
    onSendMessage("", "image", imagePreview)
    setSelectedImage(null)
    setImagePreview(null)
    setShowImageUpload(false)
  }

  const handleSendVideo = () => {
    if (!selectedVideo || !videoPreview) return
    onSendMessage("", "video", videoPreview)
    setSelectedVideo(null)
    setVideoPreview(null)
    setShowVideoUpload(false)
  }

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="h-full rounded-none border-0 flex flex-col">
      {/* Header */}
      <CardHeader className="border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="flex items-center space-x-3">
          {/* Fx4. Bouton retour pour mobile */}
          {isMobile && onBack && (
            <Button variant="ghost" size="sm" onClick={onBack} className="mr-2">
              <ArrowLeft size={20} />
            </Button>
          )}
          <Avatar className="h-10 w-10">
            <AvatarImage src={otherUser?.avatar || "/placeholder.svg"} alt={otherUser?.name} />
            <AvatarFallback>{otherUser?.name?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{otherUser?.name}</h3>
            <p className="text-sm text-gray-500">@{otherUser?.username}</p>
          </div>
        </div>
      </CardHeader>

      {/* Messages */}
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {localMessages.map((message) => {
          const isOwn = message.senderId === "user-1"
          const sender = users[message.senderId]

          return (
            <div key={message.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex space-x-2 max-w-xs lg:max-w-md group ${isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                {!isOwn && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender?.avatar || "/placeholder.svg"} alt={sender?.name} />
                    <AvatarFallback>{sender?.name?.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}

                <div
                  className={`rounded-lg p-3 relative ${
                    isOwn ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  {/* Fx2. Bouton suppression pour l'auteur */}
                  {isOwn && !message.isDeleted && (
                    <div className="absolute -top-2 -right-2">
                      <MessageDeleteButton messageId={message.id} onMessageDeleted={handleMessageDeleted} />
                    </div>
                  )}

                  {/* Fx2. Affichage message supprimé */}
                  {message.isDeleted ? (
                    <p className="text-sm italic opacity-60">{t("messages.deleted")}</p>
                  ) : (
                    <>
                      {message.type === "text" && <p className="text-sm">{message.content}</p>}

                      {message.type === "image" && message.mediaUrl && (
                        <div className="space-y-2">
                          <Image
                            src={message.mediaUrl || "/placeholder.svg"}
                            alt="Image partagée"
                            width={200}
                            height={150}
                            className="rounded object-cover"
                          />
                          {message.content && <p className="text-sm">{message.content}</p>}
                        </div>
                      )}

                      {message.type === "video" && message.mediaUrl && (
                        <div className="space-y-2">
                          <video
                            src={message.mediaUrl}
                            controls
                            className="rounded max-w-full h-auto"
                            style={{ maxHeight: "200px" }}
                          />
                          {message.content && <p className="text-sm">{message.content}</p>}
                        </div>
                      )}
                    </>
                  )}

                  <p className={`text-xs mt-1 ${isOwn ? "text-blue-100" : "text-gray-500"}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
        <div ref={messagesEndRef} />
      </CardContent>

      {/* Upload sections */}
      {showImageUpload && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <ImageUpload onImageSelect={handleImageSelect} currentImage={imagePreview} />
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="ghost" onClick={() => setShowImageUpload(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSendImage} disabled={!selectedImage}>
              {t("messages.send")}
            </Button>
          </div>
        </div>
      )}

      {showVideoUpload && (
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <VideoUpload onVideoSelect={handleVideoSelect} currentVideo={videoPreview} />
          <div className="flex justify-end space-x-2 mt-3">
            <Button variant="ghost" onClick={() => setShowVideoUpload(false)}>
              {t("common.cancel")}
            </Button>
            <Button onClick={handleSendVideo} disabled={!selectedVideo}>
              {t("messages.send")}
            </Button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowImageUpload(!showImageUpload)
              setShowVideoUpload(false)
            }}
          >
            <ImageIcon size={20} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowVideoUpload(!showVideoUpload)
              setShowImageUpload(false)
            }}
          >
            <VideoIcon size={20} />
          </Button>
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={t("messages.typeMessage")}
            onKeyDown={(e) => e.key === "Enter" && handleSendText()}
            className="flex-1"
          />
          <Button onClick={handleSendText} disabled={!newMessage.trim()}>
            <Send size={16} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
