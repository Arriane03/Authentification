"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import LoginForm from "@/components/login-form"
import { useI18n } from "@/hooks/use-i18n"

export default function LoginPage() {
  const { t } = useI18n()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">Breezy</h1>
          <p className="text-gray-600 dark:text-gray-400">Bienvenue sur votre réseau social</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("auth.login")}</CardTitle>
            <CardDescription>Entrez votre email et mot de passe pour accéder à votre compte</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Pas encore de compte ?{" "}
                <Link href="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">
                  {t("auth.signup")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
