"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays } from "lucide-react"
import Post from "@/components/post"
import FollowButton from "@/components/follow-button"
import type { User, Post as PostType } from "@/types"
import ModerationPanel from "@/components/moderation-panel"
import { userRoles } from "@/lib/mock-admin"
import { useI18n } from "@/hooks/use-i18n"

interface ProfileClientProps {
  user: User
  posts: PostType[]
  isOwnProfile: boolean
}

export default function ProfileClient({ user: initialUser, posts, isOwnProfile }: ProfileClientProps) {
  const [user, setUser] = useState(initialUser)
  const [activeTab, setActiveTab] = useState("posts")
  const { t } = useI18n()

  const currentUserRole = userRoles["user-1"] || "user" // Current user role

  const handleFollowChange = (isFollowing: boolean) => {
    setUser((prev) => ({
      ...prev,
      isFollowing,
      followersCount: isFollowing ? prev.followersCount + 1 : prev.followersCount - 1,
    }))
  }

  return (
    <>
      {/* Header */}
      <div className="sticky top-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 p-4 z-10">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="text-sm text-gray-500">{posts.length} posts</p>
      </div>

      {/* Fx10/11. Profil utilisateur avec infos */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          {/* Fx9. Suivre ou se faire suivre */}
          {!isOwnProfile && (
            <div className="space-y-2">
              <FollowButton
                userId={user.id}
                isFollowing={user.isFollowing || false}
                onFollowChange={handleFollowChange}
              />
              <ModerationPanel user={user} currentUserRole={currentUserRole} />
            </div>
          )}

          {isOwnProfile && (
            <Button variant="outline" size="sm">
              {t("common.edit")} le profil
            </Button>
          )}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>

          {user.bio && <p className="text-gray-900 dark:text-gray-100">{user.bio}</p>}

          <div className="flex items-center space-x-4 text-gray-500 text-sm">
            <div className="flex items-center space-x-1">
              <CalendarDays size={16} />
              <span>Rejoint en mars 2024</span>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm">
            <div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{user.followingCount}</span>
              <span className="text-gray-500 ml-1">Abonnements</span>
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-gray-100">{user.followersCount}</span>
              <span className="text-gray-500 ml-1">Abonnés</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="flex">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "posts"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("replies")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "replies"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            Réponses
          </button>
          <button
            onClick={() => setActiveTab("likes")}
            className={`flex-1 py-4 text-center font-medium ${
              activeTab === "likes"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            J'aime
          </button>
        </div>
      </div>

      {/* Fx4. Affichage des messages sur le profil */}
      <div>
        {activeTab === "posts" && (
          <>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  {isOwnProfile ? "Vous n'avez encore rien publié." : `${user.name} n'a encore rien publié.`}
                </p>
              </div>
            ) : (
              posts.map((post) => <Post key={post.id} post={post} />)
            )}
          </>
        )}

        {activeTab === "replies" && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucune réponse pour le moment.</p>
          </div>
        )}

        {activeTab === "likes" && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun post aimé pour le moment.</p>
          </div>
        )}
      </div>
    </>
  )
}
