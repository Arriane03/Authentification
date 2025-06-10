import { PrismaClient } from '@prisma/client';

declare global {
  // Pour éviter l'erreur de redéclaration dans Next.js
  var prisma: PrismaClient | undefined;
}

export const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;