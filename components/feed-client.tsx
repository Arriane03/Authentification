"use client"

import { useState, useEffect } from "react"
import CreatePost from "@/components/create-post"
import Post from "@/components/post"
import TagSearch from "@/components/tag-search"
import { Card, CardContent } from "@/components/ui/card"
import type { Post as PostType } from "@/types"
import { useI18n } from "@/hooks/use-i18n"

interface FeedClientProps {
  initialPosts: PostType[]
}

export default function FeedClient({ initialPosts }: FeedClientProps) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts)
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>(initialPosts)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { t } = useI18n()

  useEffect(() => {
    if (selectedTags.length === 0) {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post) =>
        post.tags?.some((tag) =>
          selectedTags.some((selectedTag) => tag.toLowerCase().includes(selectedTag.toLowerCase())),
        ),
      )
      setFilteredPosts(filtered)
    }
  }, [posts, selectedTags])

  const handlePostCreated = (newPost: PostType) => {
    setPosts((prev) => [newPost, ...prev])
  }

  const handleTagsChange = (tags: string[]) => {
    setSelectedTags(tags)
  }

  const handlePostUpdate = (updatedPost: PostType) => {
    setPosts((prev) => prev.map((post) => (post.id === updatedPost.id ? updatedPost : post)))
  }

  return (
    <>
      <div className="z-10 sticky top-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 p-4 space-y-4">
        <h1 className="text-xl font-bold">{t("nav.home")}</h1>

        {/* Fx13. Recherche par tags */}
        <Card>
          <CardContent className="p-4">
            <TagSearch onTagsChange={handleTagsChange} placeholder={t("post.addTags")} />
          </CardContent>
        </Card>
      </div>

      {/* Fx3. Publication de messages courts */}
      <CreatePost onPostCreated={handlePostCreated} />

      {/* Fx5. Flux chronologique */}
      <div>
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            {selectedTags.length > 0 ? (
              <>
                <p className="text-gray-500">Aucun post trouvé avec ces tags.</p>
                <p className="text-gray-500 text-sm mt-2">Essayez avec d'autres mots-clés !</p>
              </>
            ) : (
              <>
                <p className="text-gray-500">Aucun post dans votre fil.</p>
                <p className="text-gray-500 text-sm mt-2">Suivez des utilisateurs pour voir leurs posts !</p>
              </>
            )}
          </div>
        ) : (
          filteredPosts.map((post) => <Post key={post.id} post={post} onPostUpdate={handlePostUpdate} />)
        )}
      </div>
    </>
  )
}
