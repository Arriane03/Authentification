import { mockUsers, mockPosts, currentUser } from "@/lib/mock-data"
import ProfileClient from "@/components/profile-client"
import { notFound } from "next/navigation"

interface ProfilePageProps {
  params: {
    userId: string
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { userId } = await params
  const user = mockUsers[userId]

  if (!user) {
    notFound()
  }

  // Filtrer les posts de l'utilisateur
  const userPosts = mockPosts.filter((post) => post.author.id === userId)
  const isOwnProfile = currentUser.id === userId

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700 min-h-screen">
        <ProfileClient user={user} posts={userPosts} isOwnProfile={isOwnProfile} />
      </div>
    </div>
  )
}
