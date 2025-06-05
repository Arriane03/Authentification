import type { PrivateMessage, Conversation } from "@/types/messages"

export const mockMessages: PrivateMessage[] = [
  {
    id: "msg-1",
    content: "Salut ! Comment ça va ?",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    senderId: "user-2",
    receiverId: "user-1",
    read: false,
    type: "text",
  },
  {
    id: "msg-2",
    content: "Ça va bien merci ! Et toi ?",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    senderId: "user-1",
    receiverId: "user-2",
    read: true,
    type: "text",
  },
  {
    id: "msg-3",
    content: "Regarde cette vidéo !",
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    senderId: "user-2",
    receiverId: "user-1",
    read: false,
    type: "video",
    mediaUrl: "/placeholder-video.mp4",
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    participants: ["user-1", "user-2"],
    lastMessage: mockMessages[2],
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
  {
    id: "conv-2",
    participants: ["user-1", "user-3"],
    lastMessage: {
      id: "msg-4",
      content: "À bientôt !",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      senderId: "user-3",
      receiverId: "user-1",
      read: true,
      type: "text",
    },
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
]
