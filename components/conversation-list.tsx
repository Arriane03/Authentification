"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { Conversation } from "@/types/messages"
import type { User } from "@/types"
import { useI18n } from "@/hooks/use-i18n"

interface ConversationListProps {
  conversations: Conversation[]
  users: { [key: string]: User }
  selectedConversation: string | null
  onSelectConversation: (conversationId: string) => void
}

export default function ConversationList({
  conversations,
  users,
  selectedConversation,
  onSelectConversation,
}: ConversationListProps) {
  const { t } = useI18n()
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return t("time.now")
    if (diffInHours < 24) return `${diffInHours}h`
    return date.toLocaleDateString()
  }

  const getOtherParticipant = (conversation: Conversation) => {
    const otherUserId = conversation.participants.find((p) => p !== "user-1")
    return otherUserId ? users[otherUserId] : null
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {conversations.map((conversation) => {
        const otherUser = getOtherParticipant(conversation)
        if (!otherUser) return null

        return (
          <div
            key={conversation.id}
            className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
              selectedConversation === conversation.id ? "bg-blue-50 dark:bg-blue-900/20" : ""
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12">
                <AvatarImage src={otherUser.avatar || "/placeholder.svg"} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">{otherUser.name}</p>
                  <div className="flex items-center space-x-2">
                    {conversation.unreadCount > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500">{formatTime(conversation.updatedAt)}</span>
                  </div>
                </div>

                {conversation.lastMessage && (
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conversation.lastMessage.type === "text"
                      ? conversation.lastMessage.content
                      : conversation.lastMessage.type === "image"
                        ? "📷 Image"
                        : "🎥 Vidéo"}
                  </p>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
