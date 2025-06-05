export interface PrivateMessage {
  id: string
  content: string
  createdAt: string
  senderId: string
  receiverId: string
  read: boolean
  type: "text" | "image" | "video"
  mediaUrl?: string
  isDeleted?: boolean
  deletedAt?: string
}

export interface Conversation {
  id: string
  participants: string[]
  lastMessage?: PrivateMessage
  unreadCount: number
  updatedAt: string
}
