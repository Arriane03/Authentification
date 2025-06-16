'use client';

import { useState } from 'react';

import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      console.log(res);
      setError('Email ou mot de passe incorrec');
    } else {
      // Redirige vers la page d'accueil après login réussi
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Bienvenue sur Breezy </h2>
        <p className="text-center text-sm text-gray-500">Connecte-toi ou inscris-toi pour continuer</p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-center">{error}</div>
        )}

        {/* Formulaire email / mot de passe */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Adresse e-mail</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ex: toi@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <span className="text-gray-400 text-sm">ou</span>
        </div>

        {/* Bouton Google */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-medium text-gray-700">Continuer avec Google</span>
        </button>

        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{' '}
          <Link href="/signup" className="text-indigo-600 hover:underline font-semibold">
            S’inscrire
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-4">
          <Link href="/forgot-password" className="hover:underline">
            Mot de passe oublié ?
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400 mt-6">
          En continuant, tu acceptes nos CGU et politique de confidentialité.
        </p>
      </div>
    </div>
  );
}