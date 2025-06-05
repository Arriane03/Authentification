export interface User {
  id: string
  username: string
  name: string
  email: string
  bio?: string
  avatar?: string
  followersCount: number
  followingCount: number
  isFollowing?: boolean
}

export interface Post {
  id: string
  content: string
  createdAt: string
  author: User
  likesCount: number
  commentsCount: number
  isLiked: boolean
  tags?: string[]
  image?: string
  video?: string
  isDeleted?: boolean
  deletedAt?: string
  deletedBy?: string
  deletionReason?: string
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  author: User
  replies?: Comment[]
  parentId?: string
}

export interface Notification {
  id: string
  type: "like" | "comment" | "follow" | "mention" | "message"
  message: string
  createdAt: string
  read: boolean
  relatedUser?: User
  relatedPost?: Post
}

export type Theme = "light" | "dark"
