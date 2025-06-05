"use client"

import { useState, useEffect } from "react"
import type { Language, TranslationKeys } from "@/types/i18n"
import { getTranslations, getCurrentLanguage, setLanguage } from "@/lib/i18n"

export function useI18n() {
  const [language, setCurrentLanguage] = useState<Language>("fr")
  const [translations, setTranslations] = useState<TranslationKeys>(getTranslations("fr"))
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLanguage = getCurrentLanguage()
    setCurrentLanguage(savedLanguage)
    setTranslations(getTranslations(savedLanguage))
    setIsLoaded(true)
  }, [])

  const changeLanguage = (newLanguage: Language) => {
    setCurrentLanguage(newLanguage)
    setTranslations(getTranslations(newLanguage))
    setLanguage(newLanguage)

    // Force re-render of the entire app
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: newLanguage }))
  }

  const t = (key: keyof TranslationKeys): string => {
    return translations[key] || key
  }

  return { language, changeLanguage, t, isLoaded }
}
