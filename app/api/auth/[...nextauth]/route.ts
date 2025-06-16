import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Email ou mot de passe invalide");
        }

        const isValidPassword = await compare(
          credentials.password,
          user.password
        );

        if (!isValidPassword) {
          throw new Error("Email ou mot de passe invalide");
        }

        // Return user object without password
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
