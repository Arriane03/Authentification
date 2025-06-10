// pages/api/auth/reset-password-email.ts

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' });
  }

  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ error: 'Email et token requis' });
  }

  try {
    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

    await resend.emails.send({
      from: 'Breezy <noreply@breezy.resend.dev>', // Modifie si tu as un vrai domaine
      to: [email],
      subject: 'Réinitialisation de ton mot de passe Breezy',
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2>Réinitialisation de mot de passe</h2>
          <p>Tu as demandé à réinitialiser ton mot de passe.</p>
          <p>Clique sur le bouton ci-dessous pour définir un nouveau mot de passe :</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background: #6366f1; color: white; border-radius: 5px; text-decoration: none;">Réinitialiser mon mot de passe</a>
          <p>Si tu n’as pas fait cette demande, ignore simplement cet email.</p>
          <p>— L’équipe Breezy</p>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Email envoyé avec succès' });
  } catch (error) {
    console.error('Erreur d’envoi email :', error);
    return res.status(500).json({ error: 'Erreur lors de l’envoi de l’email' });
  }
}