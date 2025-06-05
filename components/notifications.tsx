"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Heart, MessageCircle, UserPlus, AtSign, MessageCircleIcon as MessageCircle2 } from "lucide-react"
import { mockNotifications } from "@/lib/mock-data"
import type { Notification } from "@/types"
import { useI18n } from "@/hooks/use-i18n"

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useI18n()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (notificationId: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "like":
        return <Heart size={16} className="text-red-500" />
      case "comment":
        return <MessageCircle size={16} className="text-blue-500" />
      case "follow":
        return <UserPlus size={16} className="text-green-500" />
      case "mention":
        return <AtSign size={16} className="text-purple-500" />
      case "message":
        return <MessageCircle2 size={16} className="text-blue-500" />
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "maintenant"
    if (diffInMinutes < 60) return `${diffInMinutes}m`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`
    return `${Math.floor(diffInMinutes / 1440)}j`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-80 p-0" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">{t("notifications.title")}</CardTitle>
              {unreadCount > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                  {t("notifications.markAllRead")}
                </Button>
              )}
            </div>
          </CardHeader>

          <CardContent className="p-0 max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">{t("notifications.noNotifications")}</div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer border-b border-gray-100 dark:border-gray-700 ${
                      !notification.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">{getNotificationIcon(notification.type)}</div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          {notification.relatedUser && (
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={notification.relatedUser.avatar || "/placeholder.svg"}
                                alt={notification.relatedUser.name}
                              />
                              <AvatarFallback className="text-xs">
                                {notification.relatedUser.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <p className="text-sm text-gray-900 dark:text-gray-100">{notification.message}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{formatTime(notification.createdAt)}</p>
                      </div>

                      {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
