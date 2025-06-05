export interface UserStatus {
  id: string
  status: "active" | "suspended" | "banned"
  reason?: string
  suspendedUntil?: string
  moderatorId?: string
  createdAt: string
}

export interface ModerationAction {
  id: string
  type: "suspend" | "ban" | "unban"
  userId: string
  moderatorId: string
  reason: string
  duration?: number // en jours pour suspension
  createdAt: string
}
