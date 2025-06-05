import { mockConversations, mockMessages } from "@/lib/mock-messages"
import { mockUsers } from "@/lib/mock-data"
import MessagesClient from "@/components/messages-client"

export default function MessagesPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-gray-900 border-x border-gray-200 dark:border-gray-700 min-h-screen">
        <MessagesClient initialConversations={mockConversations} initialMessages={mockMessages} users={mockUsers} />
      </div>
    </div>
  )
}
