"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import ConversationList from "@/components/conversation-list"
import ChatWindow from "@/components/chat-window"
import type { Conversation, PrivateMessage } from "@/types/messages"
import type { User } from "@/types"
import { useI18n } from "@/hooks/use-i18n"

interface MessagesClientProps {
  initialConversations: Conversation[]
  initialMessages: PrivateMessage[]
  users: { [key: string]: User }
}

export default function MessagesClient({ initialConversations, initialMessages, users }: MessagesClientProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [messages, setMessages] = useState<PrivateMessage[]>(initialMessages)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { t } = useI18n()

  // Fx4. Détection responsive
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleSendMessage = (
    conversationId: string,
    content: string,
    type: "text" | "image" | "video" = "text",
    mediaUrl?: string,
  ) => {
    const newMessage: PrivateMessage = {
      id: Date.now().toString(),
      content,
      createdAt: new Date().toISOString(),
      senderId: "user-1", // Current user
      receiverId: conversations.find((c) => c.id === conversationId)?.participants.find((p) => p !== "user-1") || "",
      read: false,
      type,
      mediaUrl,
    }

    setMessages((prev) => [...prev, newMessage])

    // Update conversation
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, lastMessage: newMessage, updatedAt: new Date().toISOString() } : conv,
      ),
    )
  }

  const handleMessageDeleted = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, isDeleted: true, deletedAt: new Date().toISOString() } : msg,
      ),
    )
  }

  const getConversationMessages = (conversationId: string) => {
    return messages.filter((msg) => {
      const conversation = conversations.find((c) => c.id === conversationId)
      if (!conversation) return false
      return conversation.participants.includes(msg.senderId) && conversation.participants.includes(msg.receiverId)
    })
  }

  // Fx4. Vue mobile : soit liste, soit chat
  if (isMobile) {
    return (
      <div className="h-screen">
        {!selectedConversation ? (
          // Liste des conversations en mobile
          <Card className="h-full rounded-none border-0">
            <CardHeader className="border-b border-gray-200 dark:border-gray-700">
              <CardTitle>{t("messages.title")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ConversationList
                conversations={conversations}
                users={users}
                selectedConversation={selectedConversation}
                onSelectConversation={setSelectedConversation}
              />
            </CardContent>
          </Card>
        ) : (
          // Chat en plein écran mobile
          <ChatWindow
            conversation={conversations.find((c) => c.id === selectedConversation)!}
            messages={getConversationMessages(selectedConversation)}
            users={users}
            onSendMessage={(content, type, mediaUrl) =>
              handleSendMessage(selectedConversation, content, type, mediaUrl)
            }
            onMessageDeleted={handleMessageDeleted}
            onBack={() => setSelectedConversation(null)}
            isMobile={true}
          />
        )}
      </div>
    )
  }

  // Vue desktop : split view
  return (
    <div className="flex h-screen">
      {/* Liste des conversations */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="border-b border-gray-200 dark:border-gray-700">
            <CardTitle>{t("messages.title")}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ConversationList
              conversations={conversations}
              users={users}
              selectedConversation={selectedConversation}
              onSelectConversation={setSelectedConversation}
            />
          </CardContent>
        </Card>
      </div>

      {/* Fenêtre de chat */}
      <div className="flex-1">
        {selectedConversation ? (
          <ChatWindow
            conversation={conversations.find((c) => c.id === selectedConversation)!}
            messages={getConversationMessages(selectedConversation)}
            users={users}
            onSendMessage={(content, type, mediaUrl) =>
              handleSendMessage(selectedConversation, content, type, mediaUrl)
            }
            onMessageDeleted={handleMessageDeleted}
            isMobile={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">{t("messages.noConversations")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
