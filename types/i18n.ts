export type Language = "fr" | "en" | "es" | "de"

export interface TranslationKeys {
  // Navigation
  "nav.home": string
  "nav.profile": string
  "nav.messages": string
  "nav.logout": string
  // Auth
  "auth.login": string
  "auth.signup": string
  "auth.email": string
  "auth.password": string
  "auth.confirmPassword": string
  "auth.name": string
  "auth.username": string
  "auth.loginButton": string
  "auth.signupButton": string
  "auth.loggingIn": string
  "auth.signingUp": string
  "auth.loginFailed": string
  "auth.welcomeMessage": string

  // Posts
  "post.whatsNew": string
  "post.publish": string
  "post.publishing": string
  "post.charactersLeft": string
  "post.addTags": string
  "post.addImage": string
  "post.addVideo": string
  "post.like": string
  "post.comment": string
  "post.share": string

  // Comments
  "comment.write": string
  "comment.reply": string
  "comment.cancel": string
  "comment.sending": string
  "comment.noComments": string
  // Messages
  "messages.title": string
  "messages.newMessage": string
  "messages.typeMessage": string
  "messages.send": string
  "messages.noConversations": string
  "messages.back": string
  "messages.deleted": string
  "messages.deleteMessage": string
  "messages.confirmDelete": string
  "messages.deleteError": string

  // Moderation
  "moderation.deletePost": string
  "moderation.confirmDeletePost": string
  "moderation.postDeleted": string
  "moderation.reason": string
  "moderation.deleteReason": string
  "admin.suspend": string
  "admin.ban": string
  "admin.unban": string
  "admin.reason": string
  "admin.duration": string

  // Notifications
  "notifications.title": string
  "notifications.markAllRead": string
  "notifications.noNotifications": string
  // Common
  "common.loading": string
  "common.error": string
  "common.success": string
  "common.cancel": string
  "common.confirm": string
  "common.delete": string
  "common.edit": string
  "common.save": string
  "common.close": string
  "common.yes": string
  "common.no": string

  // Follow
  "follow.followed": string
  "follow.unfollowed": string
  "follow.followedDescription": string
  "follow.unfollowedDescription": string

  // Upload
  "upload.fileTooLarge": string

  // Time
  "time.now": string
}
