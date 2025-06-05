export type UserRole = "user" | "moderator" | "admin"

export interface PostModerationState {
  isDeleted: boolean
  deletedAt?: string
  deletedBy?: string
  reason?: string
}
