"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Home, Moon, Sun, LogOut, UserIcon, MessageCircle } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import Notifications from "@/components/notifications"
import type { User } from "@/types"
import LanguageSelector from "@/components/language-selector"
import { useI18n } from "@/hooks/use-i18n"

interface NavigationClientProps {
  user: User
}

export default function NavigationClient({ user }: NavigationClientProps) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()

  const handleLogout = () => {
    // TODO: Remplacer par la logique de déconnexion backend
    console.log("Déconnexion")
  }

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        <Link
          href="/"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Home size={20} />
          <span>{t("nav.home")}</span>
        </Link>
        <Link
          href="/messages"
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <MessageCircle size={20} />
          <span>{t("nav.messages")}</span>
        </Link>
        <Link
          href={`/profile/${user.id}`}
          className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <UserIcon size={20} />
          <span>{t("nav.profile")}</span>
        </Link>
      </div>

      {/* Notifications */}
      <Notifications />

      {/* Language Selector */}
      <LanguageSelector />

      {/* Theme Toggle */}
      <Button variant="ghost" size="sm" onClick={toggleTheme}>
        {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
      </Button>

      {/* User Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem asChild>
            <Link href={`/profile/${user.id}`} className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Mon Profil</span>
            </Link>
          </DropdownMenuItem>
          {/* Mobile Navigation Items */}
          <div className="md:hidden">
            <DropdownMenuItem asChild>
              <Link href="/" className="flex items-center">
                <Home className="mr-2 h-4 w-4" />
                <span>Accueil</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/messages" className="flex items-center">
                <MessageCircle className="mr-2 h-4 w-4" />
                <span>{t("nav.messages")}</span>
              </Link>
            </DropdownMenuItem>
          </div>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("nav.logout")}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
