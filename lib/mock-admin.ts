import type { UserStatus, ModerationAction } from "@/types/admin"
import type { UserRole } from "@/types/moderation"

export const mockUserStatuses: UserStatus[] = [
  {
    id: "status-1",
    status: "suspended",
    reason: "Spam répété",
    suspendedUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    moderatorId: "user-1",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

export const mockModerationActions: ModerationAction[] = [
  {
    id: "action-1",
    type: "suspend",
    userId: "user-4",
    moderatorId: "user-1",
    reason: "Spam répété",
    duration: 7,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
]

// Simuler les rôles utilisateur
export const userRoles: Record<string, UserRole> = {
  "user-1": "moderator",
  "user-2": "user",
  "user-3": "user",
}
