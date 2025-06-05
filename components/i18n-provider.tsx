"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Language } from "@/types/i18n"
import { getCurrentLanguage } from "@/lib/i18n"

interface I18nContextType {
  language: Language
  forceUpdate: () => void
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")
  const [updateKey, setUpdateKey] = useState(0)

  useEffect(() => {
    setLanguage(getCurrentLanguage())

    const handleLanguageChange = (event: CustomEvent<Language>) => {
      setLanguage(event.detail)
      setUpdateKey((prev) => prev + 1)
    }

    window.addEventListener("languageChanged", handleLanguageChange as EventListener)
    return () => window.removeEventListener("languageChanged", handleLanguageChange as EventListener)
  }, [])

  const forceUpdate = () => setUpdateKey((prev) => prev + 1)

  return (
    <I18nContext.Provider value={{ language, forceUpdate }} key={updateKey}>
      {children}
    </I18nContext.Provider>
  )
}

export const useI18nContext = () => {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18nContext must be used within I18nProvider")
  }
  return context
}
