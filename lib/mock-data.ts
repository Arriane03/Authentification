import type { User, Post, Comment, Notification } from "@/types"

// Utilisateurs simulés pour le développement
export const mockUsers: { [key: string]: User } = {
  "user-1": {
    id: "user-1",
    username: "johndoe",
    name: "John Doe",
    email: "john@example.com",
    bio: "Frontend developer working on Breezy 🚀",
    avatar: "/placeholder.svg?height=80&width=80",
    followersCount: 156,
    followingCount: 89,
  },
  "user-2": {
    id: "user-2",
    username: "alice",
    name: "Alice Martin",
    email: "alice@example.com",
    bio: "Designer & React enthusiast ✨",
    avatar: "/placeholder.svg?height=80&width=80",
    followersCount: 234,
    followingCount: 123,
    isFollowing: false,
  },
  "user-3": {
    id: "user-3",
    username: "bob",
    name: "Bob Wilson",
    email: "bob@example.com",
    bio: "Full-stack developer 💻",
    avatar: "/placeholder.svg?height=80&width=80",
    followersCount: 89,
    followingCount: 156,
    isFollowing: true,
  },
}

// Posts simulés
export const mockPosts: Post[] = [
  {
    id: "post-1",
    content: "Découverte d'une nouvelle librairie React incroyable ! 🚀",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    author: mockUsers["user-2"],
    likesCount: 12,
    commentsCount: 3,
    isLiked: false,
    tags: ["react", "javascript", "frontend"],
  },
  {
    id: "post-2",
    content: "Belle journée pour coder ! ☀️",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    author: mockUsers["user-3"],
    likesCount: 8,
    commentsCount: 1,
    isLiked: true,
    tags: ["coding", "motivation"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "post-3",
    content: "Travail sur Breezy, ça avance bien ! 💪",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    author: mockUsers["user-1"],
    likesCount: 15,
    commentsCount: 4,
    isLiked: false,
    tags: ["breezy", "development"],
  },
]

// Commentaires simulés
export const mockComments: Comment[] = [
  {
    id: "comment-1",
    content: "Super post ! 👍",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    author: mockUsers["user-2"],
    replies: [
      {
        id: "comment-2",
        content: "Je suis d'accord avec toi Alice !",
        createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
        parentId: "comment-1",
        author: mockUsers["user-3"],
      },
    ],
  },
]

// Notifications simulées
export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "like",
    message: "Alice a aimé votre post",
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    read: false,
    relatedUser: mockUsers["user-2"],
  },
  {
    id: "notif-2",
    type: "follow",
    message: "Bob a commencé à vous suivre",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    relatedUser: mockUsers["user-3"],
  },
  {
    id: "notif-3",
    type: "mention",
    message: "Charlie vous a mentionné dans un commentaire",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    read: true,
    relatedUser: {
      id: "user-4",
      username: "charlie",
      name: "Charlie Brown",
      email: "charlie@example.com",
      avatar: "/placeholder.svg?height=32&width=32",
      followersCount: 0,
      followingCount: 0,
    },
  },
  {
    id: "notif-4",
    type: "message" as any,
    message: "Nouveau message de Bob",
    createdAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    read: false,
    relatedUser: mockUsers["user-3"],
  },
]

// Utilisateur actuel simulé (sera remplacé par l'auth backend)
export const currentUser = mockUsers["user-1"]
