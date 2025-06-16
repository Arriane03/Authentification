import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';

// /app/api/auth/signup/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
  }

  // Vérifie si l'utilisateur existe déjà
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ message: "Cet e-mail est déjà utilisé" }, { status: 400 });
  }

  // Hasher le mot de passe
  const hashedPassword = await hash(password, 10);

  // Créer l'utilisateur
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: "Utilisateur créé avec succès" }, { status: 201 });
}
