'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Un lien de réinitialisation a été envoyé à ton adresse e-mail.');
      } else {
        setMessage(data.error || "Une erreur est survenue.");
      }
    } catch (err) {
      setMessage("Erreur réseau. Réessaie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Mot de passe oublié</h1>
        <p className="text-sm text-gray-500">Entre ton email pour recevoir un lien de réinitialisation.</p>

        <input
          type="email"
          required
          placeholder="ton.email@exemple.com"
          className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-xl hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? 'Envoi en cours...' : 'Envoyer le lien'}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}