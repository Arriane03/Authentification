import type { Language, TranslationKeys } from "@/types/i18n"

const translations: Record<Language, TranslationKeys> = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.profile": "Profil",
    "nav.messages": "Messages",
    "nav.logout": "Déconnexion",    // Auth
    "auth.login": "Connexion",
    "auth.signup": "Inscription",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.name": "Nom complet",
    "auth.username": "Nom d'utilisateur",
    "auth.loginButton": "Se connecter",
    "auth.signupButton": "Créer un compte",
    "auth.loggingIn": "Connexion en cours...",
    "auth.signingUp": "Création du compte...",
    "auth.loginFailed": "Échec de la connexion",
    "auth.welcomeMessage": "Bienvenue sur Breezy !",

    // Posts
    "post.whatsNew": "Quoi de neuf ?",
    "post.publish": "Publier",
    "post.publishing": "Publication...",
    "post.charactersLeft": "caractères",
    "post.addTags": "Ajouter des tags (optionnel)...",
    "post.addImage": "Ajouter une image",
    "post.addVideo": "Ajouter une vidéo",
    "post.like": "J'aime",
    "post.comment": "Commenter",
    "post.share": "Partager",

    // Comments
    "comment.write": "Écrivez un commentaire...",
    "comment.reply": "Répondre",
    "comment.cancel": "Annuler",
    "comment.sending": "Envoi...",
    "comment.noComments": "Aucun commentaire",

    // Messages
    "messages.title": "Messages",
    "messages.newMessage": "Nouveau message",
    "messages.typeMessage": "Tapez votre message...",
    "messages.send": "Envoyer",
    "messages.noConversations": "Aucune conversation",
    "messages.back": "Retour",
    "messages.deleted": "Message supprimé",    
    "messages.deleteMessage": "Supprimer le message",
    "messages.confirmDelete": "Êtes-vous sûr de vouloir supprimer ce message ?",
    "messages.deleteError": "Erreur lors de la suppression du message",

    // Moderation
    "moderation.deletePost": "Supprimer le post",
    "moderation.confirmDeletePost": "Êtes-vous sûr de vouloir supprimer ce post ?",
    "moderation.postDeleted": "Post supprimé par la modération",
    "moderation.reason": "Raison de la suppression",
    "moderation.deleteReason": "Veuillez indiquer la raison de la suppression",
    "admin.suspend": "Suspendre",
    "admin.ban": "Bannir",
    "admin.unban": "Débannir",
    "admin.reason": "Raison",
    "admin.duration": "Durée (jours)",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.markAllRead": "Tout marquer lu",
    "notifications.noNotifications": "Aucune notification",    
    
    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.confirm": "Confirmer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.save": "Sauvegarder",
    "common.close": "Fermer",
    "common.yes": "Oui",
    "common.no": "Non",

    // Follow
    "follow.followed": "Suivi",
    "follow.unfollowed": "Ne plus suivre",
    "follow.followedDescription": "Vous suivez maintenant cet utilisateur",
    "follow.unfollowedDescription": "Vous ne suivez plus cet utilisateur",

    // Upload
    "upload.fileTooLarge": "Le fichier est trop volumineux",

    // Time
    "time.now": "maintenant",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.profile": "Profile",
    "nav.messages": "Messages",
    "nav.logout": "Logout",    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Full Name",
    "auth.username": "Username",
    "auth.loginButton": "Sign In",
    "auth.signupButton": "Create Account",
    "auth.loggingIn": "Signing in...",
    "auth.signingUp": "Creating account...",
    "auth.loginFailed": "Login failed",
    "auth.welcomeMessage": "Welcome to Breezy!",

    // Posts
    "post.whatsNew": "What's happening?",
    "post.publish": "Post",
    "post.publishing": "Posting...",
    "post.charactersLeft": "characters",
    "post.addTags": "Add tags (optional)...",
    "post.addImage": "Add image",
    "post.addVideo": "Add video",
    "post.like": "Like",
    "post.comment": "Comment",
    "post.share": "Share",

    // Comments
    "comment.write": "Write a comment...",
    "comment.reply": "Reply",
    "comment.cancel": "Cancel",
    "comment.sending": "Sending...",
    "comment.noComments": "No comments",

    // Messages
    "messages.title": "Messages",
    "messages.newMessage": "New message",
    "messages.typeMessage": "Type your message...",
    "messages.send": "Send",
    "messages.noConversations": "No conversations",
    "messages.back": "Back",
    "messages.deleted": "Message deleted",
    "messages.deleteMessage": "Delete message",
    "messages.confirmDelete": "Are you sure you want to delete this message?",
    "messages.deleteError": "Error deleting message",

    // Moderation
    "moderation.deletePost": "Delete post",
    "moderation.confirmDeletePost": "Are you sure you want to delete this post?",
    "moderation.postDeleted": "Post deleted by moderation",
    "moderation.reason": "Deletion reason",
    "moderation.deleteReason": "Please provide a reason for deletion",
    "admin.suspend": "Suspend",
    "admin.ban": "Ban",
    "admin.unban": "Unban",
    "admin.reason": "Reason",
    "admin.duration": "Duration (days)",

    // Notifications
    "notifications.title": "Notifications",
    "notifications.markAllRead": "Mark all as read",
    "notifications.noNotifications": "No notifications",
    
    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.save": "Save",
    "common.close": "Close",
    "common.yes": "Yes",
    "common.no": "No",

    // Follow
    "follow.followed": "Following",
    "follow.unfollowed": "Unfollow",
    "follow.followedDescription": "You are now following this user",
    "follow.unfollowedDescription": "You are no longer following this user",

    // Upload
    "upload.fileTooLarge": "File is too large",

    // Time
    "time.now": "now",
  },
  es: {
    // Navigation
    "nav.home": "Inicio",
    "nav.profile": "Perfil",
    "nav.messages": "Mensajes",
    "nav.logout": "Cerrar sesión",    
    
    // Auth
    "auth.login": "Iniciar sesión",
    "auth.signup": "Registrarse",
    "auth.email": "Correo electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar contraseña",
    "auth.name": "Nombre completo",
    "auth.username": "Nombre de usuario",
    "auth.loginButton": "Iniciar sesión",
    "auth.signupButton": "Crear cuenta",
    "auth.loggingIn": "Iniciando sesión...",
    "auth.signingUp": "Creando cuenta...",
    "auth.loginFailed": "Error de conexión",
    "auth.welcomeMessage": "¡Bienvenido a Breezy!",

    // Posts
    "post.whatsNew": "¿Qué está pasando?",
    "post.publish": "Publicar",
    "post.publishing": "Publicando...",
    "post.charactersLeft": "caracteres",
    "post.addTags": "Agregar etiquetas (opcional)...",
    "post.addImage": "Agregar imagen",
    "post.addVideo": "Agregar video",
    "post.like": "Me gusta",
    "post.comment": "Comentar",
    "post.share": "Compartir",

    // Comments
    "comment.write": "Escribe un comentario...",
    "comment.reply": "Responder",
    "comment.cancel": "Cancelar",
    "comment.sending": "Enviando...",
    "comment.noComments": "Sin comentarios",

    // Messages
    "messages.title": "Mensajes",
    "messages.newMessage": "Nuevo mensaje",
    "messages.typeMessage": "Escribe tu mensaje...",
    "messages.send": "Enviar",
    "messages.noConversations": "Sin conversaciones",
    "messages.back": "Volver",
    "messages.deleted": "Mensaje eliminado",
    "messages.deleteMessage": "Eliminar mensaje",
    "messages.confirmDelete": "¿Estás seguro de que quieres eliminar este mensaje?",
    "messages.deleteError": "Error al eliminar mensaje",

    // Moderation
    "moderation.deletePost": "Eliminar publicación",
    "moderation.confirmDeletePost": "¿Estás seguro de que quieres eliminar esta publicación?",
    "moderation.postDeleted": "Publicación eliminada por moderación",
    "moderation.reason": "Razón de eliminación",
    "moderation.deleteReason": "Por favor proporciona una razón para la eliminación",
    "admin.suspend": "Suspender",
    "admin.ban": "Banear",
    "admin.unban": "Desbanear",
    "admin.reason": "Razón",
    "admin.duration": "Duración (días)",

    // Notifications
    "notifications.title": "Notificaciones",
    "notifications.markAllRead": "Marcar todo como leído",
    "notifications.noNotifications": "Sin notificaciones",
    
    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.cancel": "Cancelar",
    "common.confirm": "Confirmar",
    "common.delete": "Eliminar",
    "common.edit": "Editar",
    "common.save": "Guardar",
    "common.close": "Cerrar",
    "common.yes": "Sí",
    "common.no": "No",

    // Follow
    "follow.followed": "Siguiendo",
    "follow.unfollowed": "Dejar de seguir",
    "follow.followedDescription": "Ahora sigues a este usuario",
    "follow.unfollowedDescription": "Ya no sigues a este usuario",

    // Upload
    "upload.fileTooLarge": "El archivo es demasiado grande",

    // Time
    "time.now": "ahora",
  },
  de: {
    // Navigation
    "nav.home": "Startseite",
    "nav.profile": "Profil",
    "nav.messages": "Nachrichten",
    "nav.logout": "Abmelden",
    
    // Auth
    "auth.login": "Anmelden",
    "auth.signup": "Registrieren",
    "auth.email": "E-Mail",
    "auth.password": "Passwort",
    "auth.confirmPassword": "Passwort bestätigen",
    "auth.name": "Vollständiger Name",
    "auth.username": "Benutzername",
    "auth.loginButton": "Anmelden",
    "auth.signupButton": "Konto erstellen",
    "auth.loggingIn": "Anmeldung läuft...",
    "auth.signingUp": "Konto wird erstellt...",
    "auth.loginFailed": "Anmeldung fehlgeschlagen",
    "auth.welcomeMessage": "Willkommen bei Breezy!",

    // Posts
    "post.whatsNew": "Was ist los?",
    "post.publish": "Posten",
    "post.publishing": "Wird gepostet...",
    "post.charactersLeft": "Zeichen",
    "post.addTags": "Tags hinzufügen (optional)...",
    "post.addImage": "Bild hinzufügen",
    "post.addVideo": "Video hinzufügen",
    "post.like": "Gefällt mir",
    "post.comment": "Kommentieren",
    "post.share": "Teilen",

    // Comments
    "comment.write": "Kommentar schreiben...",
    "comment.reply": "Antworten",
    "comment.cancel": "Abbrechen",
    "comment.sending": "Wird gesendet...",
    "comment.noComments": "Keine Kommentare",

    // Messages
    "messages.title": "Nachrichten",
    "messages.newMessage": "Neue Nachricht",
    "messages.typeMessage": "Nachricht eingeben...",
    "messages.send": "Senden",
    "messages.noConversations": "Keine Unterhaltungen",
    "messages.back": "Zurück",
    "messages.deleted": "Nachricht gelöscht",
    "messages.deleteMessage": "Nachricht löschen",
    "messages.confirmDelete": "Sind Sie sicher, dass Sie diese Nachricht löschen möchten?",
    "messages.deleteError": "Fehler beim Löschen der Nachricht",

    // Moderation
    "moderation.deletePost": "Beitrag löschen",
    "moderation.confirmDeletePost": "Sind Sie sicher, dass Sie diesen Beitrag löschen möchten?",
    "moderation.postDeleted": "Beitrag von Moderation gelöscht",
    "moderation.reason": "Löschungsgrund",
    "moderation.deleteReason": "Bitte geben Sie einen Grund für die Löschung an",
    "admin.suspend": "Sperren",
    "admin.ban": "Bannen",
    "admin.unban": "Entsperren",
    "admin.reason": "Grund",
    "admin.duration": "Dauer (Tage)",

    // Notifications
    "notifications.title": "Benachrichtigungen",
    "notifications.markAllRead": "Alle als gelesen markieren",
    "notifications.noNotifications": "Keine Benachrichtigungen",
    
    // Common
    "common.loading": "Lädt...",
    "common.error": "Fehler",
    "common.success": "Erfolg",
    "common.cancel": "Abbrechen",
    "common.confirm": "Bestätigen",
    "common.delete": "Löschen",
    "common.edit": "Bearbeiten",
    "common.save": "Speichern",
    "common.close": "Schließen",
    "common.yes": "Ja",
    "common.no": "Nein",

    // Follow
    "follow.followed": "Folgen",
    "follow.unfollowed": "Entfolgen",
    "follow.followedDescription": "Sie folgen diesem Benutzer jetzt",
    "follow.unfollowedDescription": "Sie folgen diesem Benutzer nicht mehr",

    // Upload
    "upload.fileTooLarge": "Datei ist zu groß",

    // Time
    "time.now": "jetzt",
  },
}

export function getTranslations(language: Language): TranslationKeys {
  return translations[language] || translations.fr
}

export function getCurrentLanguage(): Language {
  if (typeof window === "undefined") return "fr"
  return (localStorage.getItem("language") as Language) || "fr"
}

export function setLanguage(language: Language): void {
  if (typeof window === "undefined") return
  localStorage.setItem("language", language)
}
