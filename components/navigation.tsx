import Link from "next/link"
import { currentUser } from "@/lib/mock-data"
import NavigationClient from "@/components/navigation-client"

export default function Navigation() {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Breezy
          </Link>

          <NavigationClient user={currentUser} />
        </div>
      </div>
    </nav>
  )
}
