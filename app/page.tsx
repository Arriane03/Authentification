import { mockPosts } from "@/lib/mock-data"
import FeedClient from "@/components/feed-client"

export default function HomePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700 min-h-screen">
        <FeedClient initialPosts={mockPosts} />
      </div>
    </div>
  )
}
